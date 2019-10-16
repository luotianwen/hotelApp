<template>
	<view class="page">
		<view  >
			<view v-for="(product,index) in productList" :key="index">
				<view style="float:left; width: 25%; border:1px;">
					<view>
						<image v-if="renderImage" :src="product.image" style="height: 120px;width: 120px;"></image>
					</view>
				</view>
				<view style="float:left; width: 75%; border:1px;">
					<view style="margin-top: 1rem;margin-left: 1rem;padding-left: 0.8rem;">2019-09-02 22 22 22</view>
 
					<view style="margin-top: 0.1rem;margin-left: 1rem;">
						<span style=" color: #3E3A39;font-size:10px;">4444</span>
					</view>
					<view style="margin-top: 1rem;margin-left: 1rem;">
						<p style="color: #3E3A39;">555</p>
					</view>
					<view style="margin-top: 0.1rem;margin-left: 1rem;">
						<p style="color: #3E3A39;">4444</p>
					</view>
				</view>

			</view>
			<!-- <ul id="list" class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in productList">
				<div style="float:left; width:25%; border:1px;">
					<div>
						<img :src="item.image" style="height: 120px;width: 120px;" />
					</div>
				</div>
				<div style="float:left; width: 50%; border:1px;">
					<div style="margin-top: 1rem;margin-left: 1rem;">
						<p style="color: #3E3A39;">{{item.title}}</p>
					</div>
					<div style="margin-top: 0.1rem;margin-left: 1rem;">
						<img src="images/other/redian.png" style="width: 10px;height: 10px;">
						<span style=" color: #3E3A39;font-size:10px;">4444</span>
					</div>
					<div style="margin-top: 1rem;margin-left: 1rem;">
						<p style="color: #3E3A39;">555</p>
					</div>
					<div style="margin-top: 0.1rem;margin-left: 1rem;">
						<p style="color: #3E3A39;">4444</p>
					</div>
				</div> 
				<div style="float:left; width: 25%; border:1px;margin-bottom: 0.5rem;margin-top: 0.5rem; ">
					<div style="margin-top: 5rem;margin-left: 1rem;float:left;" v-on:click="sc(item)">
						<img :src="item.title == 1 ? 'images/other/sc01.png' : 'images/other/sc02.png'" style="width: 21px;height: 21px;">
					</div>
					<div style="margin-top: 5rem;margin-left: 1rem;float:left;" v-on:click="callMobile(item.tel)">
						<img src="images/other/dh01.png" style="width: 21px;height: 21px;">
					</div>
				</div>
			</li>
		</ul> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				title: 'product-list',
				productList: [],
				renderImage: false
			};
		},
		methods: {
			loadData(action = 'add') {
				const data = [{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
						title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
						originalPrice: 9999,
						favourPrice: 8888,
						tip: '自营'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
						title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
						originalPrice: 3499,
						favourPrice: 3399,
						tip: '优惠'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
						originalPrice: 12999,
						favourPrice: 10688,
						tip: '秒杀'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg',
						title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
						originalPrice: 999,
						favourPrice: 958,
						tip: '秒杀'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg',
						title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
						originalPrice: 8888,
						favourPrice: 8288,
						tip: '优惠'
					},
					{
						image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg',
						title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
						originalPrice: 2899,
						favourPrice: 2799,
						tip: '自营'
					}
				];

				if (action === 'refresh') {
					this.productList = [];
				}

				data.forEach(item => {
					this.productList.push(item);
				});
			}
		},

		onPullDownRefresh() {
			this.loadData('refresh');
			// 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onReachBottom() {
			this.loadData();
		},
		onLoad() {
			this.loadData();
			setTimeout(() => {
				this.renderImage = true;
			}, 300);
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul {
		font-size: 30upx;
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}
</style>

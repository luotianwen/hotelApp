<template>
	<view id="goodsList">

		<!-- <div class="goodsList-cent clearfix">
	
			<view v-for="(value,key) in productList" :key="key" @click="goGoodDetail(value)" class="goodsList-list">
				<image class="follow-centImg" :src="value.image"></image>
	
				<view class="goodsList-listh6">ss</view>
				<view class="goodsList-listp">销量： ss</view>
				<view class="goodsList-listp">售价：¥ss</view>
			</view>
	
		</div>
	 -->

		<view class="goodsList-cent clearfix">
			<view v-for="(product,index) in productList" :key="index" class="goodsList-list">
				<image v-if="renderImage" :src="product.image" class="follow-centImg"></image>
				<view class="goodsList-listh6">漏登人员</view>
				<view class="goodsList-listp">2019.9.25 17:20</view>
				<view class="goodsList-listp"><button  type="primary"     >处理</button>
				</view>

			</view>

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
				}];

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
					showCancel: this.forcedLogin,
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
	.active {
		color: #558ef0;
	}
 

	.button-sp-area {
		margin: 0 auto;
		width: 60%;
	}

	.mini-btn {
		margin-right: 10upx;
	}

	.goodsList-cent {
		margin-top: 1upx;
		padding: 35upx 0 24upx;
		background: #fff;
		font-size: 0;
	}

	.goodsList-list {
		display: block;
		position: relative;
		/* margin-bottom: 35upx; */
		padding: 0 35upx 0 35upx;
		height: 270upx;
		font-size: 0;
	}

	.goodsList-list .follow-centImg {
		position: absolute;
		top: 0;
		left: 35upx;
		width: 240upx;
		height: 240upx;
		background-position: center center;
		background-size: cover;
	}

	.goodsList-listh6 {
		padding-left: 250upx;
		/* padding-top: 6upx; */
		font-size: 30upx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		white-space: inherit;
	}

	 

	.goodsList-listp {
		padding-left: 250upx;
		margin: 20upx 0;
		font-size: 30upx;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>

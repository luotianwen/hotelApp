<template>
	<view id="goodsList">

		<view class="goodsList-cent clearfix">
			<view v-for="(product,index) in productList" :key="index" class="goodsList-list">
				<image :src="product.pto" class="follow-centImg"></image>
				<view class="goodsList-listh6">漏登人员</view>
				<view class="goodsList-listp">{{product.createDate}}</view>
				<view class="goodsList-listp">
					<button type="warn" v-if="product.state==0" @tap="doit(product,1)">处理</button>
					<button type="primary" v-if="product.state==1&&product.self==1" @tap="doit(product,2)">已处理</button>
					<button type="default" v-if="(product.state==1||product.state==2)&&product.self==2">{{product.updateName}}在处理中</button>
					<button type="primary" v-if="product.state==2&&product.self==1" @tap="doit(product,3)">已完成</button>
					<button type="default" v-if="product.state==3">{{product.updateName}}已处理完成</button>

				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				title: 'product-list',
				productList: [],
				pageNo: 1,
				provider: [],
				renderImage: false
			};
		},
		methods: {
			doit(product, state1) {
				var waiting = plus.nativeUI.showWaiting();
				uni.request({
					url: service.logupdateUrl(),
					data: {
						"name": service.getUsers().name,
						"uid": service.getUsers().id,
						"logId": product.id,
						"state": state1
					},
					dataType: 'text',
					complete: function() {
						waiting.close();
					},
					success: (d) => {
						var datas = JSON.parse(d.data);
						if (datas.code == 1) {

							product.state = state1;
							plus.nativeUI.toast('操作成功');
							//this.loadData('refresh');
						} else if (datas.code == 0) {
							uni.showToast({
								icon: 'none',
								title: datas.msg,
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: "操作失败或者网络异常!",
							});
						}
					},
					fail: function() {
						plus.nativeUI.toast("网络异常!");
					}
				});
			},
			loadData(action = 'add') {


				if (action === 'refresh') {
					this.pageNo = 1;
					this.productList = [];
					console.log("执行了刷新")
				}
				uni.showLoading({
					title: '加载中...'
				})
				console.log(JSON.stringify(service.getUsers()));
				uni.request({
					url: service.getbaojingUrl(),
					data: {
						"hid": service.getUsers().hid,
						"pageNo": this.pageNo
					},
					dataType: 'text',
					complete: function() {
						uni.hideLoading();
					},
					success: (d) => {
						var datas = JSON.parse(d.data);
						if (datas.code == 1) {
							if (datas.data.count > 0) {
								datas.data.list.forEach(item => {
									item.pto = item.pto.replace(/\r\n/g, "");
									item.self = 2;
									if (item.updateName == service.getUsers().name) {
										item.self = 1;
									}

									this.productList.push(item);
								});
							} else {
								uni.showToast({
									title: "没有数据"
								})
							}
						} else if (datas.code == 0) {
							uni.showToast({
								icon: 'none',
								title: datas.msg,
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: "登录失败或者网络异常!",
							});
						}
					},
					fail: function() {
						plus.nativeUI.toast("网络异常!");
					}
				});

			},
			login() {
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
		},

		onPullDownRefresh() {
			this.loadData('refresh');
			// 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onReachBottom() {
			this.pageNo++;
			this.loadData();
		},
		onShow() {
			if (!this.hasLogin) {

				this.login()
			}
		},
		onLoad() {
			if (this.hasLogin) {
				this.pageNo = 1;
				this.loadData();

			}
			uni.getProvider({
				service: "push",
				success: (e) => {
					console.log("success", e);
					this.provider = e.provider;
					console.log("开启推送");
					uni.subscribePush({
						provider: this.provider[0],
						success: (e) => {
							console.log("已开启push接收");
							console.log('success:' + JSON.stringify(e));
						}
					});
					uni.onPush({
						provider: this.provider[0],
						success: (e) => {
							console.log("开始监听透传数据");
						},
						callback: (e) => {

							console.log("接收到透传数据");

							console.log(JSON.stringify(e.data));
							this.loadData('refresh');
						}
					});
				},
				fail: (e) => {
					console.log("获取推送通道失败", e);
				}
			});


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

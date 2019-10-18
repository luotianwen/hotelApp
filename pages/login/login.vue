<template>
	<view class="content">
		<div style="margin: 0 auto; text-align: center;width:18rem;margin-top: 1.5rem;margin-bottom: 1.5rem;">
			<img src="static/img/logo.png" height="50px" />
		</div>
		<view class="input-group">

			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<!--  <navigator url="../reg/reg">注册账号</navigator>
            <text>|</text> -->
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>

	</view>
</template>
<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			bindLogin() {

				if (this.account.length < 11) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 11 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

				var waiting = plus.nativeUI.showWaiting();
				uni.request({
					url: service.getLoginUrl(),
					data: {
						"name": this.account,
						"pwd": this.password
					},
					dataType: 'text',
					method: 'POST',
					complete: function() {
						waiting.close();
					},
					success: (d) => {
						console.log(JSON.stringify(d));
						if (d.data.code == 1) {
							plus.nativeUI.toast('登录成功');
							service.addUser(d.data.data);
							this.toMain(this.account);
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

			toMain(userName) {
				this.login(userName);

				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {

		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 20upx;
	}
</style>

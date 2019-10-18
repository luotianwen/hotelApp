<template>
    <view class="content">
        <view class="btn-row">
			<view style="text-align: center;" v-if="hasLogin" > sssss</view>
			<view style="text-align: center;" v-if="!hasLogin"> 请先登录</view>
            <button style="margin-top: 20upx;"  v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button style="margin-top: 20upx;"  v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
			<button style="margin-top: 20upx;"   type="default" @tap="about">关于我们</button>
			<button style="margin-top: 20upx;"   type="default" @tap="feedback">反馈</button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },onLoad() {
        	if (!this.hasLogin) {
        		uni.showModal({
        			title: '未登录',
        			content: '您未登录，需要登录后才能继续',
        			 
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
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
			about(){
				uni.navigateTo({
				    url: '/pages/main/about'
				});
			},
			feedback(){
				this.navigateFlag = true;
				uni.navigateTo({
				    url: '/platforms/app-plus/feedback/feedback'
				});
				setTimeout(() => {
				    this.navigateFlag = false;
				}, 200)
				return false;
			},
				
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        }
    }
</script>

<style>

</style>

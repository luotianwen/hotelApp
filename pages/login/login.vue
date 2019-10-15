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
	<script src="js/common.js"></script>
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
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length < 5) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
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
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    account: this.account,
                    password: this.password
                };
				var waiting = plus.nativeUI.showWaiting();
				mui.ajax(getLoginUrl(), {
					data: data,
					type: 'POST',
					dataType: 'json', //服务器返回json格式数据
					timeout: 15000, //15秒超时
					success: function(d) {
							waiting.close();
							 
							if (data.status == 0) {
								plus.nativeUI.toast(data.msg);
								service.addUser(data);
							    this.toMain(this.account);
							} else {
							    uni.showToast({
							        icon: 'none',
							        title: '用户账号或密码不正确',
							    });
							}
					},
					error: function(xhr, type, errorThrown) {
						waiting.close();
						plus.nativeUI.toast("网络异常!");
					} 
				});
               /* const validUser = service.getUsers().some(function (user) {
                    return data.account === user.account && data.password === user.password;
                }); */
               
            },
           
            toMain(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
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

<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row">
                <text class="title">原密码：</text>
                <m-input type="text" focus clearable v-model="opwd" placeholder="请输入原密码"></m-input>
            </view>
			<view class="input-row">
			    <text class="title">新密码：</text>
			    <m-input type="text"   clearable v-model="npwd" placeholder="请输入新密码"></m-input>
			</view>
			<view class="input-row">
			    <text class="title">确认：</text>
			    <m-input type="text"   clearable v-model="qpwd" placeholder="请输入确认密码"></m-input>
			</view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">提交</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                opwd: '',
				 npwd: '',
				  qpwd: ''
            }
        },
        methods: {
            findPassword() {
                
                if (this.opwd.length <6 ) {
                    uni.showToast({
                        icon: 'none',
                        title: '原密码不合法',
                    });
                    return;
                }
                if (this.npwd.length <6 ) {
                    uni.showToast({
                        icon: 'none',
                        title: '新密码不合法',
                    });
                    return;
                }
                if (this.npwd!=this.qpwd) {
                    uni.showToast({
                        icon: 'none',
                        title: '新密码和确认密码不相同',
                    });
                    return;
                }
				var waiting = plus.nativeUI.showWaiting();
				uni.request({
					url: service.logforgetUrl(),
					data: {
						"id":service.getUsers().id,
						"opwd": this.opwd,
						"pwd": this.npwd
					},
					dataType: 'text',
					complete: function() {
						waiting.close();
					},
					success: (d) => {
						var datas = JSON.parse(d.data);
						if (datas.code == 1) {
							plus.nativeUI.toast('修改成功');
							 uni.reLaunch({
							 	url: '/pages/login/login',
							 });
							 
						} else if (datas.code == 0) {
							uni.showToast({
								icon: 'none',
								title: datas.msg,
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: " 失败或者网络异常!",
							});
						}
					},
					fail: function() {
						plus.nativeUI.toast("网络异常!");
					}
				});
				
            }
        }
    }
</script>

<style>

</style>

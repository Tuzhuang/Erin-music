<template>
	<view class="phone-password">
		<p class="title">账号密码登录</p>
		<view class="password-con">
			<input type="text" v-model="password" placeholder="输入密码">
		</view>
		<p :class="['login',{'comp':password.length}]" @click="loginIn">立即登录</p>
		<view class="forget-pwd" @click="forgetPwd">
			<p>忘记密码</p>
			<img src="/static/images/pages/phoneLogin/right-arrow.svg" class="arrow-icon" />
		</view>
	</view>
</template>

<script>
	import $http from '@/api/login.js';
	import {
		mapMutations
	} from 'vuex';
	export default {
		props: {
			isInCompon: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				password: ""
			}
		},
		methods: {
			...mapMutations(["setLoginToken", "setUserInfo"]),
			forgetPwd() {
				this.$emit('update:isInCompon', false);
				this.$emit('forgetPwd');
			},
			async loginIn() {
				console.log('先不要调接口')
				return;
				let obj = {
					phone: '15893336752',
					password: 'gui15893336752'
				}
				let res = await $http.login(obj);
				if (res && res.code == 200) {
					console.log('res', res)
					this.setLoginToken(res.token);
					// 保存用户登录信息
					this.setUserInfo(res.profile);
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone-password {
		padding-top: 10rpx;
		box-sizing: border-box;

		.title {
			font-size: 30rpx;
			color: #fff;
		}

		.password-con {
			width: 100%;
			height: 70rpx;
			border-bottom: 1px solid #212121;
			font-size: 28rpx;
			color: #fff;
			display: flex;
			align-items: center;
			margin-top: 20rpx;
		}

		.login {
			width: 100%;
			height: 70rpx;
			background: linear-gradient(to right, #562b2a, #521814);
			border-radius: 70rpx;
			margin-top: 80rpx;
			font-size: 28rpx;
			color: #8b645f;
			text-align: center;
			line-height: 70rpx;
			transition: .2s;

			&.comp {
				background: linear-gradient(to right, #f3605b, #e83c2a);
				color: #fff;
			}
		}

		.forget-pwd {
			width: 160rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			color: #7d7d7d;
			margin: 50rpx auto;

			.arrow-icon {
				width: 28rpx;
				height: 60rpx;
			}
		}
	}
</style>

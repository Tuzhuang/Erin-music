<template>
	<view class="port-page">
		<p class="exper">不想登录？那就立即体验吧</p>
		<image class="logo-img" src="/static/images/pages/portPage/logo.png"></image>
		<view class="login-con">
			<view class="phone-login">手机号登录</view>
			<view class="wx-login">微信登录</view>
			<view class="agreement">
				<view :class="['round',isAgree?'active':'']" @click="agree">
					<img v-if="isAgree" class="tick-icon" src="/static/images/pages/portPage/tick.png">
				</view>
				<view class="agree">
					<span class="left" @click="agree">同意</span>
					<span class="item-agree" @click="agreeCheck">服务条款</span>、
					<span class="item-agree" @click="agreeCheck">隐私政策</span>、
					<span class="item-agree" @click="agreeCheck">中国认证服务协议</span>
				</view>
			</view>
		</view>
		<view class="login-type">
			<view class="item" v-for="item in loginType" :key="item">
				<image :src="'/static/images/pages/portPage/'+item+'.png'" class="type-img"></image>
			</view>
		</view>
		<popup ref="popup" :isPopup.sync="isAgreeShow" height="340" bgColor="#282828" @update:changePopup="changePopup">
			<view slot="content" class="service-agree">
				<p class="title">服务协议和隐私政策等指引</p>
				<view class="desc">
					<span class="text">进入下一步前，请先阅读并同意网易云音乐的</span>
					<span class="agree">《服务条款》</span>、
					<span class="agree">《隐私政策》</span>
				</view>
				<view class="btn-con">
					<p class="btn" @click="agreeCont('no')">不同意</p>
					<p class="btn" @click="agreeCont('yes')">同意并继续</p>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/popup.vue';
	export default {
		components: {
			popup: popup
		},
		data() {
			return {
				loginType: ["wechart", "qq", "weibo", "yi"],
				isAgree: false,
				isAgreeShow: false,
			}
		},
		methods: {
			agree() {
				console.log('1234567')
				this.isAgreeShow = true;
			},
			agreeCheck() {
				console.log('0000')
			},
			changePopup() {
				this.isAgreeShow = false;
			},
			agreeCont(type) {
				this.isAgree = type == 'yes' ? true : false;
				this.isAgreeShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.port-page {
		width: 100vw;
		height: 100vh;
		background-color: #c73e2c;
		padding-top: 200rpx;
		box-sizing: border-box;
		position: relative;

		.exper {
			font-size: 24rpx;
			color: #f4ac9d;
			position: absolute;
			right: 28rpx;
			top: 200rpx;
			font-size: 26rpx;
		}

		.logo-img {
			width: 150rpx;
			height: 150rpx;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.login-con {
			width: 100%;
			position: absolute;
			top: 1000rpx;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;

			.phone-login,
			.wx-login {
				width: 70%;
				height: 80rpx;
				border-radius: 80rpx;
				background-color: #fff;
				margin: 0 auto;
				font-size: 30rpx;
				color: #dc4542;
				line-height: 80rpx;
				border: 1px solid transparent;

				&.wx-login {
					margin-top: 40rpx;
					border-color: #fff;
					color: #fff;
					background-color: #c73e2c;
				}
			}

			.agreement {
				height: 40rpx;
				margin-top: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.round {
					width: 24rpx;
					height: 24rpx;
					border: 1px solid #eb8d7c;
					border-radius: 50%;
					margin-right: 10rpx;

					&.active {
						background-color: rgba(#fff, .1);
						position: relative;

						.tick-icon {
							width: 18rpx;
							height: 12rpx;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}
				}

				.agree {
					font-size: 26rpx;
					height: 28rpx;
					color: #e88678;
					display: flex;
					align-items: center;
					vertical-align: middle;

					.left {
						margin-right: 10rpx;
					}

					.item-agree {
						color: #e8d7cf;
						margin-right: 4rpx;
					}
				}
			}
		}

		.login-type {
			width: 500rpx;
			display: flex;
			justify-content: space-between;
			position: absolute;
			bottom: 120rpx;
			left: 50%;
			transform: translateX(-50%);

			.item {
				width: 80rpx;
				height: 80rpx;
				background-color: #fff;
				border-radius: 50%;
				overflow: hidden;
			}

			.type-img {
				width: 80rpx;
				height: 80rpx;
				transform: scale(1.1);
			}
		}

		.service-agree {
			padding: 20rpx 40rpx 30rpx;
			box-sizing: border-box;

			.title {
				font-size: 30rpx;
				color: #fff;
				text-align: center;
			}

			.desc {
				margin-top: 20rpx;
				font-size: 22rpx;
				line-height: 36rpx;
				color: #e3e3e3;
				text-align: center;

				.agree {
					color: #6578a7;
				}
			}

			.btn-con {
				display: flex;
				justify-content: space-around;
				margin-top: 40rpx;

				.btn {
					width: 44%;
					height: 70rpx;
					border: 1px solid #404040;
					border-radius: 60rpx;
					font-size: 28rpx;
					color: #ffffff;
					text-align: center;
					line-height: 70rpx;

					&:last-child {
						border-color: #404040;
						background: #eb4d44;
					}
				}
			}
		}
	}
</style>

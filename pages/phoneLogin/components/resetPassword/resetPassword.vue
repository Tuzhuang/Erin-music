<template>
	<view class="reset-password">
		<p class="title">重设密码</p>
		<p class="pwd-tips">请设置登录密码，需8-20位字符，必须包含字母/数字/字符中两种以上组合</p>
		<view class="reset-con">
			<view class="reset-phone">
				<p>+86</p>
				<input type="text" v-model="resetPhone" class="phone-input" placeholder="请输入要重设密码的手机号">
			</view>
			<view class="reset-pwd">
				<input type="text" v-model="resetPassword" placeholder="请输入重设密码">
			</view>
		</view>
		<p :class="['next',{'comp':resetPassword.length}]" @click="next">下一步</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				resetPhone: "13800138000",
				resetPassword: "",
			}
		},
		mounted() {},
		methods: {
			next() {
				if (!this.resetPassword.length) return;
				console.log('请求接口')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reset-password {
		padding-top: 10rpx;
		box-sizing: border-box;

		.title {
			font-size: 30rpx;
			color: #fff;
		}

		.pwd-tips {
			font-size: 22rpx;
			line-height: 30rpx;
			color: #6c6c6c;
			margin-top: 20rpx;
		}

		.reset-con {
			width: 100%;
			margin-top: 40rpx;

			.reset-phone,
			.reset-pwd {
				height: 80rpx;
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #fff;
				border-bottom: 1px solid #2a2a2a;
				padding-top: 10rpx;
				box-sizing: border-box;

				.phone-input {
					margin-left: 10rpx;
				}

				// .reset-phone {
				// 	display: flex;
				// 	align-items: center;
				// }
			}
		}

		.next {
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
	}
</style>

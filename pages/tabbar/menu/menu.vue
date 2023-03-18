<template>
	<view class="menu">
		<view class="menu-con">
			<view class="user-info">
				<img class="avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
				<img class="avatar" v-else src="/static/images/pages/found/avatar.png">
				<p class="username" @click="login">{{userInfo.nickname || '立即登录'}}</p>
				<img class="arrow" src="/static/images/pages/found/arrow_fff.png">
				<img class="scan" src="/static/images/pages/found/scan.svg">
			</view>
			<view class="plate">
				<view class="item-con">
					<!-- <img class="icon" src=""> -->
					<p class="title">消息中心</p>
					<img class="more-icon" src="/static/images/pages/phoneLogin/right-arrow.svg">
				</view>
				<p class="tips">下面的部分我还没有想好要写一些什么东西，就请期待吧~</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['userInfo'],
		data() {
			return {

			}
		},
		created() {
			console.log('userInfo', this.userInfo);
		},
		methods: {
			login() {
				uni.reLaunch({
					url: '/pages/portPage/portPage'
				})
			}
		}
	}
</script>

<style lang="scss">
	.menu {
		.menu-con {
			.user-info {
				width: 100%;
				height: 80rpx;
				padding: 0 10rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				position: relative;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
				}

				.username {
					font-size: 32rpx;
					color: #fff;
				}

				.arrow {
					width: 30rpx;
					height: 30rpx;
				}

				.scan {
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 0;
				}
			}
		}

		.plate {
			width: 100%;
			background: #202020;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			margin-top: 30rpx;

			.item-con {
				width: 100%;
				height: 70rpx;
				border-bottom: 1px solid #2f2f2f;
				display: flex;
				align-items: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}

				.title {
					font-size: 30rpx;
					color: #fff;
				}

				.more-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.tips {
				color: #fff;
				margin-top: 40rpx;
			}
		}
	}
</style>

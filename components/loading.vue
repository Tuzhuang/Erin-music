<template>
	<view :class="['loading']" v-if="isShow" catchtouchmove>
		<view class="load-bg">
			<view class="load-item">
				<view class="item one"></view>
				<view class="item two"></view>
				<view class="item three"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
			}
		},
		methods: {
			show() {
				this.isShow = true;
			},
			hide() {
				this.isShow = false;
			}
		}
	}
</script>

<style lang="scss">
	.loading {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .4);
		z-index: 100;
		transition: .4s;

		.load-bg {
			width: 100rpx;
			height: 100rpx;
			background: #fff;
			border-radius: 50%;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			justify-content: center;
			align-items: center;

			.load-item {
				width: 50rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.item {
					width: 8rpx;
					background: #fe1531;
					border-radius: 6rpx;

					&.one {
						animation: itemOne infinite 1s;
					}

					&.two {
						height: 30rpx;
					}

					&.three {
						animation: itemThree infinite 1s;
					}
				}
			}
		}

		@keyframes itemOne {
			0% {
				height: 10rpx;
			}

			50% {
				height: 50rpx;
			}

			100% {
				height: 10rpx;
			}
		}

		@keyframes itemThree {
			0% {
				height: 50rpx;
			}

			50% {
				height: 10rpx;
			}

			100% {
				height: 50rpx;
			}
		}
	}
</style>

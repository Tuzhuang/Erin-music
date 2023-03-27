<template>
	<view :class="['loading',{mask:isMask}]" v-if="isShow" catchtouchmove>
		<view class="load-bg">
			<view class="load-item">
				<view class="item one"></view>
				<view class="item two"></view>
				<view class="item three"></view>
				<view class="item four"></view>
			</view>
			<p class="load-text">正在加载...</p>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isMask: {
				type: Boolean,
				default: true
			}
		},
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
		z-index: 100;
		transition: .4s;

		&.mask {
			background: rgba(0, 0, 0, .4);
		}

		.load-bg {
			width: 200rpx;
			height: 100rpx;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.load-item {
				width: 22rpx;
				display: flex;
				justify-content: space-around;
				align-items: flex-end;
				height: 50rpx;

				.item {
					width: 4rpx;
					background: #eb4d45;
					border-radius: 2rpx;
					height: 30rpx;

					&.one {
						animation: load-move infinite linear alternate .7s;
					}

					&.two {
						animation: load-move infinite linear alternate-reverse .5s;
					}

					&.three {
						animation: load-move infinite linear alternate .6s;
					}

					&.four {
						animation: load-move infinite linear alternate-reverse .4s;
					}
				}
			}

			.load-text {
				font-size: 22rpx;
				color: #666;
				margin-top: 20rpx;
			}
		}

		@keyframes load-move {
			from {
				height: 30rpx;
			}

			to {
				height: 10rpx;
			}
		}
	}
</style>

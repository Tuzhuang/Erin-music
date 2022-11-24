<template>
	<view class="top-bar" :style="{background:bgColor}">
		<view class="left">
			<view class="menu" @click="openMenu">
				<p class="one"></p>
				<p class="two"></p>
				<p class="three"></p>
			</view>
		</view>
		<!-- 中间插槽内容 -->
		<view class="content">
			<slot name="content"></slot>
		</view>
		<!-- 右侧插槽内容 -->
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			bgColor: {
				type: String,
				default: 'transparent'
			}
		},
		methods: {
			openMenu() {
				this.$emit("openMenuShow", true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-bar {
		width: 100%;
		height: 100rpx;
		padding: 0 10rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 99;
		transition: .2s;

		.left {
			width: 70rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			padding-left: 10rpx;
			box-sizing: border-box;

			.menu {
				width: 70rpx;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.one,
				.two,
				.three {
					height: 6rpx;
					background-color: #808080;
					border-radius: 20rpx;
					margin-bottom: 12rpx;

					&:last-child {
						margin-bottom: 0;
					}
				}

				.one {
					width: 25rpx;
				}

				.two {
					width: 35rpx;
				}

				.three {
					width: 50rpx;
				}
			}
		}

		.content {
			flex: 1;
			height: 100%;
			margin: 0 20rpx;
		}

		.right {
			width: 60rpx;
			height: 100%;
		}
	}
</style>

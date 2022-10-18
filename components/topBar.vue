<template>
	<view class="top-bar">
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
		background-color: #171515;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.left {
			width: 70rpx;
			height: 100%;
			display: flex;
			justify-content: center;

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

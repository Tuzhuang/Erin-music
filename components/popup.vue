<template>
	<view class="popup">
		<view :class="['mask',!isPopup?'hide':'']" @click="hidePopup">
			<view class="content" :style="{height:height+'rpx',bottom:isPopup?'0':-height+'rpx',background:bgColor}" @click.stop>
				<slot name="content">
					<view></view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup",
		props: {
			// 是否展示弹出层
			isPopup: {
				type: Boolean,
				default: false
			},
			// 内容高度
			height: {
				type: String,
				default: '200'
			},
			bgColor: {
				type: String,
				default: "#fff"
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			hidePopup() {
				this.$emit("update:changePopup");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		.mask {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 99;
			background: rgba(#000, .4);
			transition: .5s;

			&.hide {
				background: transparent;
				z-index: -1;
			}

			.content {
				width: 100%;
				background-color: #000;
				border-top-left-radius: 50rpx;
				border-top-right-radius: 50rpx;
				position: absolute;
				bottom: 0;
				transition: .3s;
				z-index: 99;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>

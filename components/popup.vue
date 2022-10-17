<template>
	<view class="popup">
		<view :class="['mask',{'hide':!isPopup}]" @click="hidePopup">
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
		/**
		 * isPopup  是否展示弹出层
		 * height  高度
		 * bgColor  背景色
		 * 
		 * @hidePopup 隐藏弹出层
		 */
		props: {
			isPopup: {
				type: Boolean,
				default: false
			},
			height: {
				type: String,
				default: '200'
			},
			bgColor: {
				type: String,
				default: "#fff"
			}
		},
		methods: {
			hidePopup() {
				this.$emit("update:isPopup",false);
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
				border-top-left-radius: 40rpx;
				border-top-right-radius: 40rpx;
				overflow: hidden;
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

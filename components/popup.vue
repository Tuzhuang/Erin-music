<template>
	<view class="popup">
		<view :class="['mask',{'hide':!isPopup}]" @click="hidePopup">
			<!-- <view class="content"
				:style="{width:width+'%',height:height+'rpx',left:isPopup?'0':-width+'%',bottom:isPopup?'0':-height+'rpx',background:bgColor}"
				@click.stop> -->
			<view class="content" :style="[styleObj]" @click.stop>
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
		 * width  宽度 传入百分比
		 * height  高度
		 * bgColor  背景色
		 * mode  弹出方向 top right bottom left
		 * 
		 * @hidePopup 隐藏弹出层
		 */
		props: {
			isPopup: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '100'
			},
			height: {
				type: String,
				default: '100'
			},
			bgColor: {
				type: String,
				default: "#fff"
			},
			mode: {
				type: String,
				default: 'bottom'
			}
		},
		computed: {
			styleObj() {
				let obj = {
					width: this.width + '%',
					height: this.height + '%',
					background: this.bgColor,
				}
				// 根据弹出位置设置不同的动画
				switch (this.mode) {
					case 'top':
						obj.top = this.isPopup ? '0' : -this.height + '%';
						obj.borderBottomLeftRadius = '30rpx';
						obj.borderBottomRightRadius = '30rpx';
						break;
					case 'right':
						obj.right = this.isPopup ? '0' : -this.width + '%';
						obj.borderTopLeftRadius = '30rpx';
						obj.borderBottomLeftRadius = '30rpx';
						break;
					case 'bottom':
						obj.bottom = this.isPopup ? '0' : -this.height + '%'
						obj.borderTopLeftRadius = '30rpx';
						obj.borderTopRightRadius = '30rpx';
						break;
					case 'left':
						obj.left = this.isPopup ? '0' : -this.width + '%'
						obj.borderTopRightRadius = '30rpx';
						obj.borderBottomRightRadius = '30rpx';
						break;
				}
				return obj;
			}
		},
		methods: {
			hidePopup() {
				this.$emit("update:isPopup", false);
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
				// border-top-left-radius: 40rpx;
				// border-top-right-radius: 40rpx;
				overflow: hidden;
				position: absolute;
				// bottom: 0;
				transition: .3s;
				z-index: 99;
				padding: 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>

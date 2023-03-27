<template>
	<view class="popup">
		<!-- :catchtouchmove="isPopup?true:false" @touchmove.stop.prevent="handle" -->
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
		 * isPadding 是否默认20像素的padding内缩
		 * isRadius 是否展示圆角
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
			},
			isPadding: {
				type: Boolean,
				default: true
			},
			isRadius: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			styleObj() {
				let obj = {
					width: this.width + '%',
					height: this.height + '%',
					background: this.bgColor,
					padding: this.isPadding ? '20rpx' : '0',
				}
				// 根据弹出位置设置不同的动画
				switch (this.mode) {
					case 'top':
						obj.top = this.isPopup ? '0' : -this.height + '%';
						obj.borderBottomLeftRadius = this.isRadius ? '30rpx' : '0';
						obj.borderBottomRightRadius = this.isRadius ? '30rpx' : '0';
						break;
					case 'right':
						obj.right = this.isPopup ? '0' : -this.width + '%';
						obj.borderTopLeftRadius = this.isRadius ? '30rpx' : '0';
						obj.borderBottomLeftRadius = this.isRadius ? '30rpx' : '0';
						break;
					case 'bottom':
						obj.bottom = this.isPopup ? '0' : -this.height + '%'
						obj.borderTopLeftRadius = this.isRadius ? '30rpx' : '0';
						obj.borderTopRightRadius = this.isRadius ? '30rpx' : '0';
						break;
					case 'left':
						obj.left = this.isPopup ? '0' : -this.width + '%'
						obj.borderTopRightRadius = this.isRadius ? '30rpx' : '0';
						obj.borderBottomRightRadius = this.isRadius ? '30rpx' : '0';
						break;
				}
				return obj;
			}
		},
		methods: {
			// 此方法不用写任何代码，主要是为了解决控制台的警告的
			handle() {},
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
			z-index: 999;
			background: rgba(#000, .4);
			transition: .3s;

			&.hide {
				background: transparent;
				z-index: -1;
			}

			.content {
				width: 100%;
				background-color: #000;
				overflow: hidden;
				position: absolute;
				transition: .3s;
				z-index: 999;
				// padding: 20rpx;
				box-sizing: border-box;
			}
		}
	}
</style>

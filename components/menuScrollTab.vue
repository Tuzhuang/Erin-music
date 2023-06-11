<template>
	<view class="menu-scroll-tab">
		<scroll-view scroll-x="true" class="menu-name-con" :scroll-left="scrollLeft" scroll-with-animation>
			<view class="menu-name-item" @click="curMenuNameI=index" v-for="(item,index) in menuNames" :key="index">
				<p class="menu-name">{{item.label}}</p>
			</view>
			<!-- 滑块 -->
			<view class="slide-box" :style="{'left':10+70*(curMenuNameI)+'px'}">
				<view class="slide" :style="{'width':slideWidth+'px'}"></view>
			</view>
		</scroll-view>
		<swiper class="menu-con-swiper" :current="curMenuNameI" duration="300" @change="menuContChange"
			@transition="menuContTrans" @animationfinish="transEnd">
			<swiper-item class="menu-con-swiper-item" v-for="(item,index) in menuNames" :key="index">
				<view class="menu-content">
					<!-- <p>{{item.label}}</p> -->
					<slot :name="item.value"></slot>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		throttle
	} from '@/utils/timeDelay.js';
	export default {
		name: "menu-scroll-tab",
		props: {
			menuNames: {
				type: Array,
				default: () => [{
					label: '占位1',
					value: 'zhanwei1'
				}, {
					label: '占位2',
					value: 'zhanwei2'
				}]
			}
		},
		data() {
			return {
				curMenuNameI: 0, // 当前选中tabs
				scrollLeft: 0,
				slideWidth: 16, // 滑块宽度
			};
		},
		watch: {
			curMenuNameI: {
				handler(val) {
					if (val > this.menuNames.length - 5) {
						this.scrollLeft = this.menuNames.length * 100;
					} else if (val > 2) {
						this.scrollLeft = val * 50;
					} else {
						this.scrollLeft = 0;
					}
					// 把值传给父组件
					this.$emit('curMenuIndex', val);
				},
				immediate: true
			}
		},
		methods: {
			// 轮播图内容改变时
			menuContChange(e) {
				console.log('current改变了');
				this.curMenuNameI = e.detail.current;
			},
			// 轮播图滑动中
			menuContTrans: throttle(function(e) {
				// console.log('e', e.detail.dx)

			}, 100),
			// 动画结束
			transEnd(e) {
				// console.log('动画结束', e)
			}
		}
	}
</script>

<style lang="scss">
	.menu-scroll-tab {
		width: 100%;
		height: calc(100vh - 160rpx);

		.menu-name-con {
			white-space: nowrap;
			width: 100%;
			height: 60rpx;
			display: flex;
			align-items: center;
			position: relative;
			margin-bottom: 20rpx;

			.menu-name-item {
				display: inline-block;
				width: 50px;
				height: 100%;
				margin: 0 10px;
				box-sizing: border-box;
				text-align: center;
				line-height: 50rpx;
				// background-color: skyblue;

				.menu-name {
					font-size: 28rpx;
					color: #d2d2d2;
				}
			}

			.slide-box {
				width: 50px;
				height: 7rpx;
				position: absolute;
				top: 50rpx;
				left: 10px;
				display: flex;
				justify-content: center;
				transition: .7s;


				.slide {
					width: 32rpx;
					height: 7rpx;
					border-radius: 20rpx;
					background: linear-gradient(to right, #ec5044, #e27f86);
					transition: .5s;
					// position: absolute;
					// left: 50%;
					// transform: translateX(-50%);

					&.active {
						width: 48rpx;
					}
				}
			}
		}

		.menu-con-swiper {
			height: 100%;
			// margin-top: 20rpx;

			.menu-con-swiper-item {
				width: 100%;
				height: 100%;

				.menu-content {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>

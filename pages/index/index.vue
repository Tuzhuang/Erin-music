<template>
	<view class="index-home">
		<!-- 发现页面 -->
		<found v-if="curTabBar=='found'" :isHomeBarBg="homeBarBg"></found>

		<view :class="['bottom-box',{hide:!isBtPlayShow}]">
			<!-- 底部的播放栏 -->
			<bottom-play @openPlayPage="openPlayPage"></bottom-play>
			<!-- 底部标签栏 -->
			<view class="tab-bar">
				<view class="item-bar" @click="switchBar('found')">
					<view :class="['icon-con',{'active':curTabBar=='found'}]">
						<img :class="['bar-icon',{'active':curTabBar=='found'}]"
							src="/static/images/pages/tabbar/found.png">
					</view>
					<p :class="['title',{'active':curTabBar=='found'}]">发现</p>
				</view>
				<view class="item-bar" @click="switchBar('podcast')">
					<view :class="['icon-con',{'active':curTabBar=='podcast'}]">
						<img :class="['bar-icon',{'active':curTabBar=='podcast'}]"
							src="/static/images/pages/tabbar/podcast.png">
					</view>
					<p :class="['title',{'active':curTabBar=='podcast'}]">播客</p>
				</view>
				<view class="item-bar" @click="switchBar('mine')">
					<view :class="['icon-con',{'active':curTabBar=='mine'}]">
						<img :class="['bar-icon',{'active':curTabBar=='mine'}]"
							src="/static/images/pages/tabbar/mine.png">
					</view>
					<p :class="['title',{'active':curTabBar=='mine'}]">我的</p>
				</view>
				<view class="item-bar" @click="switchBar('focuson')">
					<view :class="['icon-con','focuson',{'active':curTabBar=='focuson'}]">
						<img :class="['bar-icon','focuson',{'active':curTabBar=='focuson'}]"
							src="/static/images/pages/tabbar/cng.png">
					</view>
					<p :class="['title',{'active':curTabBar=='focuson'}]">关注</p>
				</view>
				<view class="item-bar" @click="switchBar('cloudVill')">
					<view :class="['icon-con','cloud',{'active':curTabBar=='cloudVill'}]">
						<img v-if="curTabBar!='cloudVill'"
							:class="['bar-icon','cloud',{'active':curTabBar=='cloudVill'}]"
							src="/static/images/pages/tabbar/cloud_vill.png" />
						<img v-else :class="['bar-icon','cloud',{'active':curTabBar=='cloudVill'}]"
							src="/static/images/pages/tabbar/cloud_vill_active.png" />
					</view>
					<p :class="['title',{'active':curTabBar=='cloudVill'}]">云村</p>
				</view>
			</view>
		</view>
		<!-- 音乐播放详情页 :catchtouchmove="true" -->
		<play-detail :class="['play-detail-page',{show:isPlayDetail}]" @backMusicInfo="backMusicInfo" catchtouchmove>
		</play-detail>
	</view>
</template>

<script>
	import found from '@/pages/tabbar/found/found.vue'
	import bottomPlay from './components/bottomPlay.vue'
	import playDetail from '@/pages/playDetail/playDetail.vue'
	export default {
		components: {
			found,
			bottomPlay,
			playDetail
		},
		data() {
			return {
				curTabBar: 'found',
				homeBarBg: false, // 判断首页的时候当往下滚动的时候就展示背景色
				isBtPlayShow: true, // 是否展示底部的tabbar和播放栏
				isPlayDetail: false, // 是否展示音乐播放详情页
			}
		},
		methods: {
			switchBar(barName) {
				this.curTabBar = barName;
			},
			openPlayPage() {
				this.isBtPlayShow = false;
				this.isPlayDetail = true;
			},
			backMusicInfo() {
				this.isBtPlayShow = true;
				this.isPlayDetail = false;
			}
		},
		onPageScroll(e) {
			if (this.curTabBar == 'found') {
				if (e.scrollTop > 0) {
					this.homeBarBg = true;
				} else {
					this.homeBarBg = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-home {
		.bottom-box {
			width: 100%;
			position: fixed;
			bottom: 0;
			transition: .3s;

			&.hide {
				bottom: -260rpx;
			}
		}

		.tab-bar {
			width: 100%;
			// position: fixed;
			// bottom: 0;
			height: 160rpx;
			display: flex;
			justify-content: space-around;
			background: rgba(#0d0d0d, .5);
			padding-top: 16rpx;
			box-sizing: border-box;
			backdrop-filter: blur(20px);

			.item-bar {
				.icon-con {
					width: 60rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					transition: .2s;
					border-radius: 50%;

					.bar-icon {
						width: 60rpx;
						height: 60rpx;
						transition: .2s;

						&.focuson {
							transform: scale(1.1);
							position: absolute;
							left: 1rpx;
						}

						&.active {
							transform: scale(.7);
						}
					}

					&.active {
						background: linear-gradient(to bottom, #c1413b, #a93b36);
						border-radius: 50%;
					}

					&.focuson.active,
					&.cloud.active {
						background: #fff;
					}
				}

				.title {
					font-size: 24rpx;
					color: #3e3e3f;
					text-align: center;
					margin-top: 10rpx;
					transition: .4s;

					&.active {
						color: #cc453e;
					}
				}
			}
		}

		.play-detail-page {
			width: 100%;
			position: fixed;
			bottom: -100vh;
			transition: .3s;
			z-index: -1;
			transition-delay: .1s;

			&.show {
				bottom: 0;
				z-index: 99;
			}
		}

	}
</style>

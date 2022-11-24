<template>
	<view class="found">
		<top-bar class="tab-bar" :bgColor="isHomeBarBg?'#171515':''" @openMenuShow="openMenuShow">
			<view class="search-con" slot="content">
				<view class="search-bar">
					<img class="search-icon" src="/static/images/pages/found/search.svg">
					<p class="tip-text">大家都在搜 毛不易</p>
				</view>
			</view>
			<view class="gene-song-con" slot="right">
				<img class="song-icon" src="/static/images/pages/found/gene_song.png">
			</view>
		</top-bar>

		<view class="banner-con">
			<view class="banner">
				<swiper class="swiper" circular indicator-dots indicator-color="#d5d5d6"
					indicator-active-color="#ffffff" autoplay interval="2500" duration="1000" @change="bannerChange">
					<swiper-item class="swiper-item" v-for="(item,index) in bannerList" :key="index">
						<image :src="item" class="banner-img" />
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="banner-bg" v-show="!isHomeBarBg" :style="{backgroundImage:'url('+bannerList[curBannerIdx]+')'}">
		</view>
		<scroll-view scroll-x>
			<view class="sub-menu">
				<view class="sub-item" v-for="(item,index) in subMenu" :key="index">
					<view class="icon-con">
						<img :class="['icon',{'big':[4,5,6].includes(index)}]"
							:src="'/static/images/pages/found/'+item.icon+'.png'" alt="图片无法展示噢~">
						<tetx class="day" v-if="index==0">{{curDay}}</tetx>
					</view>
					<p class="sub-tit">{{item.name}}</p>
				</view>

			</view>
		</scroll-view>
		<view class="line"></view>
		<view class="recommend">
			<view class="top-con">
				<h2 class="title">推荐歌单</h2>
				<view class="more-con">
					<text class="more">更多</text>
					<img class="more-icon" src="/static/images/pages/found/arrow_fff.png" alt="">
				</view>
			</view>
		</view>

		<!-- 点击菜单左侧菜单弹出层 -->
		<popup :isPopup.sync="menuShow" mode="left" width="80" bgColor="#151515">
			<view slot="content">
				<leftMenu :userInfo.sync="userInfo" />
			</view>
		</popup>
		<loading ref="loading" />
	</view>
</template>

<script>
	import topBar from '@/components/topBar.vue';
	import popup from '@/components/popup.vue';
	import loading from '@/components/loading.vue';
	import leftMenu from '@/pages/tabbar/menu/menu.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			isHomeBarBg: { // tabbar是否展示背景色
				type: Boolean,
				default: false
			}
		},
		components: {
			topBar,
			popup,
			loading,
			leftMenu,
		},
		data() {
			return {
				menuShow: false,
				bannerList: [
					"https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2021/08/12/184/ias_67f14f070915b4a91b6ba98698c35d3c_1135x545_85.jpg",
					"https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/09/07/171/ias_5650bb3a31a524d231ad162e6bba8c5e_1135x545_85.jpg",
					"https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/09/24/45/ias_b51fe08570913f541d489768bbb307a4_1135x545_85.jpg",
					"https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/10/27/150/ias_1bd44839bfd63ed49d233f8a2ff64d27_1135x545_85.jpg",
					"https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/10/21/130/ias_f0f74d36980fbc8835667fe291773d7b_1135x545_85.jpg",
					"https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/09/07/169/ias_80c6070fb28ff034b7c7a73702069146_1135x545_85.jpg",
				],
				curBannerIdx: 0,
				subMenu: [{
						icon: 'recom',
						name: '每日推荐',
					},
					{
						icon: 'private',
						name: '私人FM',
					},
					{
						icon: 'playlist',
						name: '歌单',
					},
					{
						icon: 'leader',
						name: '排行榜',
					},
					{
						icon: 'songmeet',
						name: '一歌一遇',
					},
					{
						icon: 'album',
						name: '数字专辑',
					},
					{
						icon: 'audiobook',
						name: '有声书',
					},
					{
						icon: 'cd',
						name: '关注新歌',
					},
					{
						icon: 'birthday',
						name: '生日专区',
					},
				],
				curDay: new Date().getDate(), // 当前日期
			}
		},
		computed: {
			...mapState(["userInfo"]),
		},
		methods: {
			openMenuShow(val) {
				console.log('val', val)
				this.menuShow = true;
			},
			bannerChange(e) {
				this.curBannerIdx = e.detail.current;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.found {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 160rpx;
		padding-top: 100rpx;
		box-sizing: border-box;
		background: #0e0e0e;

		.tab-bar {
			width: 100%;

			.search-con {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;

				.search-bar {
					width: 100%;
					height: 66%;
					background-color: #232221;
					border-radius: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.search-icon {
						width: 28rpx;
						height: 28rpx;
						margin-right: 10rpx;
					}

					.tip-text {
						font-size: 26rpx;
						color: #363535;
					}
				}

			}

			.gene-song-con {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.song-icon {
					width: 60rpx;
					height: 60rpx;
					filter: brightness(60%);
				}
			}
		}

		.banner-con {
			height: 310rpx;
			padding-top: 0rpx;
			overflow: hidden;
			position: sticky;
			z-index: 10;

			.banner {
				width: 100%;
				height: 288rpx;

				.swiper-item {
					padding: 0 20rpx;
					box-sizing: border-box;
				}

				.banner-img {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
		}

		.banner-bg {
			width: 100%;
			height: 240rpx;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			// z-index: -1;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			transition: .5s;
			filter: blur(60px);
		}

		.sub-menu {
			width: 100%;
			height: 180rpx;
			display: flex;
			margin-top: -10rpx;

			.sub-item {
				width: 150rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 0 30rpx;

				.icon-con {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background: #2a1919;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;

					.icon {
						width: 70rpx;
						height: 70rpx;

						&.big {
							width: 90rpx;
							height: 90rpx;
						}
					}

					.day {
						font-size: 22rpx;
						font-weight: 600;
						color: #2a1919;
						position: absolute;
						top: 44rpx;
					}
				}

				.sub-tit {
					font-size: 24rpx;
					color: #cbcbcb;
					margin-top: 10rpx;
				}
			}
		}

		.line {
			width: 100%;
			height: 1rpx;
			background: #292929;
		}

		.recommend {
			padding: 20rpx 30rpx;
			box-sizing: border-box;

			.top-con {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;

				.title {
					font-size: 30rpx;
				}

				.more-con {
					padding: 10rpx 20rpx;
					border: 1px solid #404040;
					border-radius: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.more {
						font-size: 22rpx;

					}

					.more-icon {
						width: 24rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
</style>

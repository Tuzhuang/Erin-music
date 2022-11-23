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
		<!-- 点击菜单左侧弹出层 -->
		<popup :isPopup.sync="menuShow" mode="left" width="80" bgColor="#151515">
			<view class="menu-con" slot="content">
				<view class="user-info">
					<img class="avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl">
					<img class="avatar" v-else src="/static/images/pages/found/avatar.png">
					<p class="username">{{userInfo.nickname || '立即登录'}}</p>
					<img class="arrow" src="/static/images/pages/found/arrow_fff.png">
					<img class="scan" src="/static/images/pages/found/scan.svg">
				</view>
				<view class="plate">
					<view class="item-con">
						<img class="icon" src="">
						<p class="title">消息中心</p>
						<img class="more-icon" src="/static/images/pages/phoneLogin/right-arrow.svg">
					</view>
					<p class="tips">下面的部分我还没有想好要写一些什么东西，就请期待吧~</p>
				</view>
			</view>
		</popup>
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
		<view class="sub-menu">
			
		</view>

	</view>
</template>

<script>
	import topBar from '@/components/topBar.vue';
	import popup from '@/components/popup.vue';
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
			popup
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
			}
		},
		computed: {
			...mapState(["userInfo"]),
			isRollTop() {
				console.log()
			}
		},
		created() {
			
		},
		methods: {
			openMenuShow(val) {
				console.log('val', val)
				this.menuShow = true;
			},
			bannerChange(e) {
				this.curBannerIdx = e.detail.current;
			}
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

		.menu-con {
			.user-info {
				width: 100%;
				height: 80rpx;
				padding: 0 10rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				position: relative;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
				}

				.username {
					font-size: 32rpx;
					color: #fff;
				}

				.arrow {
					width: 30rpx;
					height: 30rpx;
				}

				.scan {
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 0;
				}
			}
		}

		.plate {
			width: 100%;
			background: #202020;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			margin-top: 30rpx;

			.item-con {
				width: 100%;
				height: 70rpx;
				border-bottom: 1px solid #2f2f2f;
				display: flex;
				align-items: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}

				.title {
					font-size: 30rpx;
					color: #fff;
				}

				.more-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}

			.tips {
				color: #fff;
				margin-top: 40rpx;
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

		


	}
</style>

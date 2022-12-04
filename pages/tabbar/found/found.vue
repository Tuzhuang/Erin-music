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

		<view class="top-card">
			<view class="banner-con">
				<view class="banner">
					<swiper class="swiper" circular indicator-dots indicator-color="#d5d5d6"
						indicator-active-color="#ffffff" autoplay interval="2500" duration="1000"
						@change="e=>curBannerIdx=e.detail.current">
						<swiper-item class="swiper-item" v-for="(item,index) in bannerList" :key="index">
							<image :src="item" class="banner-img" />
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="banner-bg" v-show="!isHomeBarBg"
				:style="{backgroundImage:'url('+bannerList[curBannerIdx]+')'}">
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
				<!-- 最外层的view只用于设置层级，以展示加载更多提示 -->
				<view style="position: sticky;z-index: 20;">
					<scroll-view scroll-x lower-threshold="-100" @scrolltolower="recomRightMore">
						<view class="recom-con">
							<!-- 循环 -->
							<view class="roll-con" @click="recomRoll">
								<swiper class="roll-swiper" autoplay interval="2500" duration="600" vertical circular
									easing-function="easeInOutCubic" @change="e=>curRecomI=e.detail.current">
									<swiper-item v-for="(item,index) in bannerList" :key="index">
										<image :src="item" :class="['bg-img','narrow',{ampli:curRecomI==index}]" alt=""
											mode="aspectFill" />
										<img src="/static/images/pages/found/infinite.png" class="infin-icon" alt="">
									</swiper-item>
								</swiper>
								<p class="desc" style="margin-top:8rpx;">{{curRecomI}}0年代经典歌曲 开车必抖腿|蹦迪专场|节奏感带上</p>
							</view>
							<view class="recom-item" v-for="(item,index) in bannerList" :key="index">
								<image :src="item" class="bg-img" alt="" mode="aspectFill" />
								<img v-if="index==0" src="/static/images/pages/found/mini_logo.png" class="logo-icon"
									alt="">
								<view class="play-count">
									<img src="/static/images/pages/found/triangle.svg" class="triangle" alt="">
									<text class="count">134.4 亿</text>
								</view>
								<p class="desc">90年代经典歌曲 开车必抖腿|蹦迪专场|节奏感带上</p>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<view class="recom-more">
					<image class="left-more" src="/static/images/pages/found/left_round.svg" mode=""></image>
					<text class="more-text">左滑更多</text>
				</view>
			</view>
		</view>

		<view class="song-card">
			<view class="top-con">
				<image src="/static/images/pages/found/refresh.png" class="refresh-icon"></image>
				<text class="title">轻音，远离纷扰，感受内心,轻音，远离纷扰，感受内心</text>
				<view class="play-con">
					<image src="/static/images/pages/found/play.png" class="play-icon"></image>
					<text class="play-text">播放</text>
				</view>
			</view>
			<swiper class="song-swiper" duration="300" previous-margin="30rpx" next-margin="30rpx">
				<swiper-item class="song-item" v-for="(item,index) in 3" :key="index">
					<view class="song-con" v-for="(item,index) in songList" :key="index">
						<image class="left-img" :src="item.icon" mode="aspectFill"></image>
						<view class="item-con">
							<p class="song-name">{{item.name}}<span class="sing-name">- {{item.sing}}</span></p>
							<p class="tag">{{item.tag}}</p>
						</view>
						<image class="video-play" src="/static/images/pages/found/video_play.png" mode=""></image>
						<view class="bottom-line" v-if="index!==2"></view>
					</view>
				</swiper-item>
			</swiper>
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
				curRecomI: 0, // 推荐歌单纵轴循环下标
				songList: [{
						icon: 'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/09/07/171/ias_5650bb3a31a524d231ad162e6bba8c5e_1135x545_85.jpg',
						name: "寂静之空",
						sing: "棱镜乐队",
						tag: "昨日十万播放"
					},
					{
						icon: 'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/09/24/45/ias_b51fe08570913f541d489768bbb307a4_1135x545_85.jpg',
						name: "撒野",
						sing: "凯瑟毛",
						tag: "百万红心"
					},
					{
						icon: 'https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/09/07/169/ias_80c6070fb28ff034b7c7a73702069146_1135x545_85.jpg',
						name: "最后一页",
						sing: "王泽克",
						tag: "百万红心"
					},
				],
			}
		},
		computed: {
			...mapState(["userInfo"]),
		},
		methods: {
			openMenuShow(val) {
				this.menuShow = true;
			},
			recomRoll() {
				console.log('当前', this.curRecomI);
			},
			recomRightMore(){
				this.$refs.loading.show();
				setTimeout(()=>{
					this.$refs.loading.hide();
				},1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.found {
		width: 100%;
		min-height: 100vh;
		padding-bottom: 240rpx;
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

		.top-card {
			background: #151515;
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
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
			height: 380rpx;
			padding: 20rpx 0;
			box-sizing: border-box;
			position: relative;

			.top-con {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #fff;
				padding: 0 30rpx;
				box-sizing: border-box;

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

			.recom-con {
				width: 100%;
				height: 290rpx;
				margin: 20rpx 30rpx 0;
				display: flex;
				margin-right: 30rpx !important;

				.roll-con {
					width: 100%;
					height: 100%;
					margin-right: 20rpx;

					.roll-swiper {
						width: 200rpx;
						height: 200rpx;
						border-radius: 20rpx;
						overflow: hidden;
						position: relative;
						pointer-events: none;
					}
				}

				.recom-item {
					min-width: 200rpx;
					height: 290rpx;
					margin-right: 20rpx;
					position: relative;

					&:last-child {
						padding-right: 30rpx;
						.play-count {
							right: 38rpx;
						}
					}

					.logo-icon {
						position: absolute;
						top: 10rpx;
						left: 10rpx;
						z-index: 2;
						width: 32rpx;
						height: 32rpx;
						padding: 2rpx;
						border-radius: 50%;
						background: rgba(#fff, .5);
					}

					.play-count {
						padding: 4rpx 12rpx;
						background: rgba(0, 0, 0, .2);
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						position: absolute;
						top: 10rpx;
						right: 8rpx;
						z-index: 2;

						.triangle {
							width: 16rpx;
							height: 16rpx;
						}

						.count {
							font-size: 16rpx;
							color: #fff;
							margin-left: 2rpx;
						}
					}
				}

				.bg-img {
					width: 100%;
					height: 200rpx;
					border-radius: 20rpx;
					transition: transform .6s;

					&.narrow {
						transform: scale(.8);
					}

					&.ampli {
						transform: scale(1);
					}
				}

				.infin-icon {
					position: absolute;
					top: 4rpx;
					right: 12rpx;
					z-index: 2;
					width: 42rpx;
					height: 38rpx;
				}

				.desc {
					font-size: 24rpx;
					line-height: 34rpx;
					color: #fff;
					overflow: hidden;
					text-overflow: ellipsis; // text-overflow css3的属性，当文本溢出时，显示省略号
					display: -webkit-box;
					-webkit-line-clamp: 2; // 设置两行文字溢出
					-webkit-box-orient: vertical;
					transition: .6s;
				}
			}
			// 加载更多
			.recom-more {
				position: absolute;
				right: 80rpx;
				top: 126rpx;
				z-index: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.left-more {
					width: 34rpx;
					height: 34rpx;
				}
				.more-text {
					font-size: 20rpx;
					color: #515151;
					writing-mode: vertical-lr; 
					margin-top: 6rpx;
				}
			}
		}

		.song-card {
			background: #151515;
			border-radius: 20rpx;
			margin-top: 20rpx;
			padding: 30rpx 0;
			box-sizing: border-box;

			.top-con {
				display: flex;
				align-items: center;
				padding: 0 30rpx;
				box-sizing: border-box;

				.refresh-icon {
					width: 38rpx;
					height: 30rpx;
				}

				.title {
					font-size: 28rpx;
					font-weight: 600;
					color: #fff;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					padding: 0 20rpx;
				}

				.play-con {
					display: flex;
					align-items: center;
					padding: 10rpx 20rpx;
					border: 1px solid #404040;
					border-radius: 50rpx;

					.play-icon {
						width: 16rpx;
						height: 16rpx;
					}

					.play-text {
						font-size: 22rpx;
						color: #fff;
						white-space: nowrap;
						margin-left: 10rpx;
					}
				}
			}

			.song-swiper {
				margin-top: 16rpx;
				height: 320rpx;

				.song-item {
					padding-right: 30rpx;
					box-sizing: border-box;

					.song-con {
						display: flex;
						align-items: center;
						padding: 10rpx 0;
						box-sizing: border-box;
						position: relative;

						.left-img {
							width: 90rpx;
							height: 90rpx;
							border-radius: 16rpx;
						}

						.item-con {
							flex: 1;
							padding: 0 20rpx;
							box-sizing: border-box;

							.song-name {
								font-size: 28rpx;
								color: #fff;

								.sing-name {
									font-size: 20rpx;
									color: #5d5d5d;
									margin-left: 10rpx;
								}
							}

							.tag {
								display: inline;
								font-size: 16rpx;
								color: #d87845;
								padding: 4rpx 8rpx;
								border-radius: 6rpx;
								background: #1f1a17;
							}
						}

						.video-play {
							width: 100rpx;
							height: 100rpx;
							position: absolute;
							right: -10rpx;
						}

						.bottom-line {
							position: absolute;
							width: calc(100% - 110rpx);
							height: 1rpx;
							background-color: #2f2f2f;
							bottom: 0;
							right: 0;
						}
					}
				}
			}
		}
	}
</style>

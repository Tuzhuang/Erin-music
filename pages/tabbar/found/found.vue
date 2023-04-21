<template>
	<view class="found">
		<scroll-view :scroll-y="isfoundScroll" class="found-scroll" @scroll="foundScroll">
			<top-bar class="tab-bar" :bgColor="isHomeBarBg?'#171515':'transparent'" @openMenuShow="openMenuShow">
				<view class="search-con" slot="content" @click="toSearchDetail">
					<view class="search-bar">
						<img class="search-icon" src="/static/images/pages/found/search.svg">
						<p class="tip-text">大家都在搜 {{searchSugges}}</p>
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
								<image :src="item.pic" class="banner-img" />
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="banner-bg" v-if="!isHomeBarBg&&bannerList.length"
					:style="{backgroundImage:'url('+bannerList[curBannerIdx].pic+')'}">
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
									<swiper class="roll-swiper" autoplay interval="4000" duration="600" vertical
										circular easing-function="easeInOutCubic"
										@change="e=>curRecomI=e.detail.current">
										<swiper-item v-for="(item,index) in swPlayList" :key="index">
											<image :src="item.picUrl"
												:class="['bg-img','narrow',{ampli:curRecomI==index}]" alt=""
												mode="aspectFill" />
											<view class="play-count">
												<img src="/static/images/pages/found/play.png" class="triangle" alt="">
												<text class="count">{{item.playCount | numUnit}}</text>
											</view>
											<image src="/static/images/pages/found/play.png" class="play-icon"></image>
										</swiper-item>
									</swiper>
									<p class="desc" style="margin-top:8rpx;">{{swPlayList[curRecomI].name}}</p>
								</view>
								<view class="recom-item" v-for="(item,index) in playList" :key="index">
									<image :src="item.picUrl" class="bg-img" alt="" mode="aspectFill" />
									<view class="play-count">
										<img src="/static/images/pages/found/play.png" class="triangle" alt="">
										<text class="count">{{item.playCount | numUnit}}</text>
									</view>
									<image src="/static/images/pages/found/play.png" class="play-icon"></image>
									<p class="desc">{{item.name}}</p>
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
					<view @click="refreshSongs" style="display:flex;align-items: center;max-width:70%;">
						<image src="/static/images/pages/found/refresh.png"
							:class="['refresh-icon',{'refreshing':isRefresh}]"></image>
						<text :class="['title',{'isRefreshing':isRefresh}]">{{recomPlayName}}</text>
					</view>
					<view class="play-con">
						<image src="/static/images/pages/found/play.png" class="play-icon"></image>
						<text class="play-text">播放</text>
					</view>
				</view>
				<swiper :class="['song-swiper',{'isRefreshing':isRefresh}]" duration="300" previous-margin="30rpx"
					next-margin="30rpx">
					<swiper-item class="song-item" v-for="(it,i) in 3" :key="i">
						<view :class="['song-con',{'click-animate':curSongId==item.id}]"
							v-for="(item,index) in recomSongs[i]" :key="index" @click="getSongUrl(item)">
							<image class="left-img" :src="item.al.picUrl" mode="aspectFill"></image>
							<view class="item-con">
								<view class="song-box">
									<p class="song-name">{{item.name}}</p>
									<p class="sing-name">- {{item.ar.map(it=>it.name).join(' & ')}}</p>
								</view>
								<p class="tag" v-if="item.name!==item.al.name">{{item.al.name}}</p>
								<p class="tag" v-else>
									超{{String(item.id).slice(-2)}}%人{{String(item.id).slice(-2)%2==0?'播放':'收藏'}}</p>
							</view>
							<image class="video-play" src="/static/images/pages/found/video_play.png" mode=""></image>
							<view class="bottom-line" v-if="index!==2"></view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 排行榜 -->
			<view class="rank-list">
				<view class="top-con">
					<view class="left-title">
						<text class="title">排行榜</text>
						<image class="arrow-right" src="/static/images/pages/found/arrow_fff.png" mode=""></image>
					</view>
					<image class="more-icon" src="/static/images/pages/found/more-dian.svg" mode=""></image>
				</view>
				<swiper class="rank-swiper" duration="300" previous-margin="30rpx" next-margin="20rpx">
					<swiper-item class="rank-item" v-for="(item,index) in rankDataDetail" :key="index">
						<view class="swiper-box">
							<view class="rank-tit-con">
								<view class="left-con">
									<p class="title">{{item.name}}</p>
									<image class="arrow-right" src="/static/images/pages/found/arrow_fff.png" mode="">
									</image>
								</view>
								<p class="rank-tag">{{item.updateFrequency}}</p>
							</view>
							<view :class="['rank-info-item',{'click-animate':curSongId==it.id}]"
								v-for="(it,i) in item.list" :key="i" @click="getSongUrl(it)">
								<image class="song-avatar" :src="it.al.picUrl" mode="" />
								<span :class="['rank-num',{'two':i==1,'three':i==2}]">{{i+1}}</span>
								<view class="song-detail">
									<p class="song-name">{{it.name}}</p>
									<p class="sing-name" v-if="it.ar.length">{{it.ar.map(v=>v.name).join(' & ')}}</p>
								</view>
								<p class="state new-up" v-if="it.v%4==0">新晋</p>
								<p class="state" v-else>{{it.v%3==1?'霸榜':it.v%3==2?'热门':'飙升'}}</p>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<view class="zhanwei">

			</view>


			<!-- 点击菜单左侧菜单弹出层 -->
			<popup :isPopup.sync="menuShow" mode="left" width="80" bgColor="#151515">
				<view slot="content">
					<leftMenu :userInfo.sync="userInfo" />
				</view>
			</popup>
			<!-- <loading ref="loading" /> -->
		</scroll-view>
	</view>
</template>

<script>
	import $httpHome from '@/api/home.js';
	import $httpSongInfo from '@/api/songInfo.js'
	import $httpSearch from '@/api/search.js';
	import topBar from '@/components/topBar.vue';
	import popup from '@/components/popup.vue';
	import loading from '@/components/loading.vue';
	import leftMenu from '../menu/menu.vue';
	import {
		subMenu
	} from '@/utils/dataJson.js';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';

	export default {
		props: {
			// 判断当前页面是否可滚动
			isfoundScroll: {
				type: Boolean,
				default: true,
			},
			isHomeBarBg: { // tabbar是否展示背景色
				type: Boolean,
				default: false
			},
			isRender: {
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
				// isPageScroll: true, // 当前页面是否可滚动
				// isHomeBarBg: false, // 顶部背景色是否为固定色 tabbar是否展示背景色
				searchSugges: "",
				menuShow: false,
				bannerList: [],
				curBannerIdx: 0,
				subMenu: subMenu,
				curDay: new Date().getDate(), // 当前日期
				curRecomI: 0, // 推荐歌单纵轴循环下标
				swPlayList: [], // 滚动推荐歌单
				playList: [],
				recomSongs: [], // 推荐音乐
				recomPlayName: "", // 推荐单个歌单名字
				// tagList:['昨日万人播放','十万红心','粉丝推荐'],
				isRefresh: false, // 是否刷新中状态
				rankList: [], // 排行榜
				rankDataDetail: [],
				curPlayObj: {}, // 当前播放歌曲信息
				curSongId: "", // 当前点击音乐的id
			}
		},
		computed: {
			...mapState(["userInfo"]),
		},
		watch:{
			isfoundScroll(newVal){
				console.log('达能前还能滑动嘛',newVal);
			}
		},
		onLoad() {
			console.log('页面渲染')

		},
		created() {
			this.getSearchDefault();
			this.getBanner();
			this.getplayList();
			this.getNewSongs();
			this.getRankList();
		},
		filters: {
			// 次数单位
			numUnit(val) {
				let num = Number(val);
				if (num > 999 && num < 5000) {
					return '999+';
				} else if (num > 5000 && num < 10000) {
					return '5000+'
				} else if (num > 10000 && num < 100000000) {
					return (num / 10000).toFixed(1) + ' 万'
				} else if (num > 100000000) {
					return (num / 100000000).toFixed(1) + ' 亿';
				} else {
					return num;
				}
			}
		},
		methods: {
			...mapMutations("found", ["setRankList"]),
			...mapMutations('songDetail', ['setCurPlaySongInfo', 'setCurPlayTime', 'setSongCommentObj']),
			...mapActions("songDetail", ["getSongComments"]),
			openMenuShow() {
				// console.log('val',val);
				this.menuShow = true;
			},
			// 判断当前页面是否滚动
			foundScroll(e) {
				console.log('当前页面滚动了', e.detail.scrollTop)
				// 当前滑出距离大于0的时候就把顶部背景色设置为固定色
				// if (e.detail.scrollTop > 0) {
				// 	this.isHomeBarBg = true;
				// } else {
				// 	this.isHomeBarBg = false;
				// }
			},
			recomRoll() {
				console.log('当前', this.curRecomI);
			},
			recomRightMore() {
				this.$refs.loading.show();
				setTimeout(() => {
					this.$refs.loading.hide();
				}, 4000)
			},
			// 获取默认搜索关键词
			async getSearchDefault() {
				let res = await $httpSearch.searchDefault();
				if (res && res.code == 200) {
					this.searchSugges = res.data.showKeyword;
				}
			},
			async getBanner() {
				let res = await $httpHome.banner(2);
				if (res && res.code == 200) {
					this.bannerList = res.banners;
				}
			},
			async getplayList() {
				let res = await $httpHome.personalized(10);
				if (res && res.code === 200) {
					this.swPlayList = res.result.filter((it, i) => i < 4);
					this.playList = res.result.filter((it, i) => i > 3);
				}
			},
			async getNewSongs() {
				// 先获取推荐歌单的名字再根据歌单获取相应的歌曲
				let playData = await $httpHome.personalized(1);
				if (playData && playData.code == 200) {
					this.recomPlayName = playData.result[0].name;
				}
				let res = await $httpHome.byIdSongs({
					id: playData.result[0].id,
					limit: 9
				});
				if (res && res.code == 200) {
					// 防止数据缓存
					this.recomSongs = [];
					// 将一维数组转成二维数组
					for (let i = 3; i <= res.songs.length; i + 3) {
						this.recomSongs.push(JSON.parse(JSON.stringify(res.songs.splice(0, i))));
					}
				}
			},
			// 刷新歌单
			async refreshSongs() {
				this.isRefresh = true;
				await this.getNewSongs();
				this.isRefresh = false;
			},
			// 获取所有排行榜
			async getRankList() {
				let res = await $httpHome.toplist();
				if (res && res.code == 200) {
					// 保存所有排行榜信息
					this.setRankList(res.list);
					this.rankList = res.list.filter((it, i) => i < 4);
				}
				this.rankList.forEach(async (it, i) => {
					let resp = await $httpHome.rankDetail(it.id);
					if (resp && resp.code == 200) {
						this.rankDataDetail.push({
							name: it.name,
							updateFrequency: it.updateFrequency,
							list: resp.playlist.tracks.filter((v, idx) => idx < 3)
						});
					}
				})
				console.log('rankDataDetail', this.rankDataDetail);
			},
			// 获取音乐详情url
			async getSongUrl(obj) {
				this.curSongId = obj.id;
				console.log(obj);
				let res = await $httpSongInfo.songUrl({
					id: obj.id
				});
				console.log('res', res);
				if (res && res.code == 200) {
					this.curPlayObj = res.data[0];
					// 保存当前播放歌曲信息
					let songObj = {
						id: obj.id,
						songName: obj.name,
						picUrl: obj.al.picUrl,
						singName: obj.ar.map(it => it.name).join(' & '),
						songUrl: res.data[0].url,
						// 因为获取的时间是毫秒单位，所以要转换为秒单位
						songTime: ~~(res.data[0].time / 1000)
					}
					// 获取歌曲评论
					this.getSongComments({
						id: obj.id
					});
					this.setCurPlaySongInfo(songObj);
					// 切换音乐的时候重置播放秒数
					this.setCurPlayTime(0);
					// 调用播放音乐
					this.bus.$emit('onPlaySong', res.data[0].url);
				}
			},
			// 跳转到
			toSearchDetail() {
				uni.navigateTo({
					url: '/pages/searchPage/searchPage'
				})
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
		// overflow-y: hidden;

		// background: #1b1b23;
		.found-scroll {
			height: 100%;
			// overflow: hidden;
		}

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
			filter: blur(40px);
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
						// color: #2a1919;
						color: #bab9bc;
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
				color: #e8e8e8;
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
						height: 200rpx;
						border-radius: 20rpx;
						overflow: hidden;
						pointer-events: none;
						margin-right: 0;
					}
				}

				// 共用一个样式
				.recom-item,
				.roll-swiper {
					min-width: 200rpx;
					height: 290rpx;
					margin-right: 20rpx;
					position: relative;

					&:last-child {
						padding-right: 30rpx;

						.play-count {
							right: 44rpx;
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
						display: flex;
						align-items: center;
						position: absolute;
						top: 10rpx;
						right: 14rpx;
						z-index: 2;

						.triangle {
							width: 10rpx;
							height: 10rpx;
							margin-right: 4rpx;
						}

						.count {
							font-size: 18rpx;
							color: #fff;
							margin-left: 2rpx;
						}
					}

					.play-icon {
						position: absolute;
						top: 158rpx;
						right: 14rpx;
						width: 32rpx;
						height: 32rpx;
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
					width: 30rpx;
					height: 30rpx;
				}

				.refreshing {
					transform: rotate(720deg);
					transition: 1.2s;
				}

				.title {
					flex: 1;
					font-size: 30rpx;
					color: #e8e8e8;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					padding: 0 16rpx;
					opacity: 1;
					transition: 1.2s;
				}

				.isRefreshing {
					opacity: 0;
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
				opacity: 1;
				transition: 1.2s;

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

							image {
								width: 100%;
								height: 100%;
							}
						}

						.item-con {
							width: 76%;
							padding: 0 20rpx;
							box-sizing: border-box;

							.song-box {
								width: 100%;
								display: flex;
								align-items: center;
							}

							.song-name,
							.sing-name {
								font-size: 28rpx;
								color: #fff;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.sing-name {
								font-size: 20rpx;
								color: #5d5d5d;
								margin-left: 10rpx;
							}

							.tag {
								max-width: 90%;
								display: inline-block;
								font-size: 16rpx;
								// color: #d87845;
								color: #ce463f;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								margin-top: 12rpx;
								padding: 4rpx 8rpx;
								border-radius: 6rpx;
								// background: #1f1a17;
								background: #2f1f26;
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

			.isRefreshing {
				opacity: 0;
			}
		}

		// 排行榜
		.rank-list {
			background: #151515;
			border-radius: 20rpx;
			margin-top: 20rpx;
			padding: 30rpx 0;
			box-sizing: border-box;

			.top-con {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				box-sizing: border-box;

				.left-title {
					.title {
						font-size: 30rpx;
						color: #e8e8e8;
					}

					.arrow-right {
						width: 28rpx;
						height: 28rpx;
						vertical-align: middle;
					}
				}

				.more-icon {
					width: 28rpx;
					height: 28rpx;
				}
			}

			.rank-swiper {
				width: 100%;
				height: 310rpx;
				margin-top: 30rpx;

				.rank-item {
					padding-right: 20rpx;
					box-sizing: border-box;

					.swiper-box {
						height: 100%;
						padding: 10rpx 20rpx;
						box-sizing: border-box;
						border-radius: 20rpx;
						background: #26252e;
					}

					.rank-tit-con {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 10rpx;

						.left-con {
							width: 70%;
							display: flex;
							align-items: center;

							.title {
								max-width: 90%;
								font-size: 28rpx;
								color: #fff;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.arrow-right {
								width: 24rpx;
								height: 24rpx;
								margin-top: 4rpx;
							}
						}

						.rank-tag {
							font-size: 20rpx;
							color: #7f7f84;
						}
					}

					.rank-info-item {
						display: flex;
						align-items: center;
						position: relative;
						height: 80rpx;

						.song-avatar {
							width: 70rpx;
							height: 70rpx;
							border-radius: 10rpx;
						}

						.rank-num {
							width: 50rpx;
							text-align: center;
							line-height: 70rpx;
							font-size: 30rpx;
							color: #c69e4a; // #787f9f  #bb7d56
							font-weight: 600;

							&.two {
								color: #787f9f;
							}

							&.three {
								color: #bb7d56;
							}
						}

						.song-detail {
							.song-name {
								font-size: 26rpx;
								color: #e9e9e9;
							}

							.sing-name {
								font-size: 20rpx;
								color: #a09fa3;
							}
						}

						.state {
							font-size: 18rpx;
							color: #eb4d45;
							position: absolute;
							right: 10rpx;

							&.new-up {
								color: #66b892;
							}
						}
					}
				}
			}
		}

		.zhanwei {
			width: 100%;
			height: 300rpx;
			// background-color: pink;
		}

		// 点击音乐的时候点击效果
		.click-animate {
			animation: click-move .4s;
		}

		@keyframes click-move {
			from {
				transform: scale(.95);
			}

			to {
				transform: scale(1);
			}
		}
	}
</style>

<!-- 综合页面 -->
<template>
	<view class="compre">
		<scroll-view class="compre-scroll" scroll-y lower-threshold="200">
			<!-- 单曲 -->
			<view class="single-con" v-show="singleTotal">
				<view class="top-tit">
					<p class="title">单曲</p>
					<view class="play-con">
						<image class="play-icon" src="/static/images/pages/found/play.png"></image>
						<p class="text">播放</p>
					</view>
				</view>
				<single slot="single" limit="8" @onTotalCount="val=>singleTotal=val" />
				<view class="more-info" v-if="singleTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{singleTotal}}首单曲</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 歌单 -->
			<view class="song-list-con" v-show="songListTotal">
				<view class="top-tit">
					<p class="title">歌单</p>
				</view>
				<songList slot="songList" limit="5" @onTotalCount="val=>songListTotal=val" />
				<view class="more-info" v-if="songListTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{songListTotal}}个歌单</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 视频 -->
			<view class="video-page-con" v-show="videoListTotal">
				<view class="top-tit">
					<p class="title">视频</p>
				</view>
				<view class="video-item-con" v-for="item in videoList" :key="item.id">
					<view class="video-con">
						<image class="image-cover" :src="item.cover"></image>
						<image class="play-icon" src="/static/images/pages/found/play.png"></image>
					</view>
					<view class="mv-info">
						<p class="mv-name">{{item.name}}</p>
						<p class="mv-desc">
							{{formatTime(item.duration)}}，by
							{{item.artistName}}，播放{{Number((item.playCount/10000).toFixed(1))}}万次
						</p>
					</view>
				</view>
				<view class="more-info" v-if="videoListTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{videoListTotal}}个视频</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 专辑 -->
			<view class="album-con" v-show="albumTotal">
				<view class="top-tit">
					<p class="title">专辑</p>
				</view>
				<album limit="3" @onTotalCount="val=>albumTotal=val" />
				<view class="more-info" v-if="albumTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{albumTotal}}个专辑</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 单曲推荐 -->
			<view class="single-recomm-con" v-show="singleRecommTotal">
				<view class="top-tit">
					<p class="title">单曲推荐</p>
					<view class="play-con">
						<image class="play-icon" src="/static/images/pages/found/play.png"></image>
						<p class="text">播放全部</p>
					</view>
				</view>
				<view class="sing-item" v-for="(item) in singleRecommList" :key="item.id">
					<view class="left-info">
						<p class="song-name">{{item.name}}</p>
						<view class="song-info">
							<view v-if="item.originCoverType==1" class="tag origin">原唱</view>
							<view v-if="item.privilege.maxBrLevel=='lossless'" class="tag quality">超清母带</view>
							<view v-if="item.privilege.maxBrLevel=='exhigh'" class="tag quality">沉浸声</view>
							<p class="sing-name">{{item.artists.map(it=>it.name).join('&')}} - {{item.album.name}}</p>
						</view>
						<view v-if="item.originCoverType==1||item.originSongSimpleData" class="origin-singer">
							<view v-if="item.version%3==0" class="tag">
								曾经爱听
							</view>
							<p class="origin-info">
								<span>{{item.originCoverType==2?'原唱：'+item.originSongSimpleData.artists[0].name:''}}</span>
								<i v-if="item.originCoverType!=1&&item.alia[0]" class="line"></i>
								<span v-if="item.alia[0]">{{item.alia[0]}}</span>
							</p>
						</view>
					</view>
					<view class="right-info" v-if="item.mvid">
						<image class="video-play-icon" src="/static/images/pages/found/video_play.png"></image>
					</view>
				</view>
				<view class="more-info" v-if="singleRecommTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{singleRecommTotal}}首单曲</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 播客 -->
			<view class="podcast-con" v-show="podcastTotal">
				<view class="top-tit">
					<p class="title">播客</p>
				</view>
				<view class="podcast-item" v-for="item in podcastList" :key="item.id">
					<view class="left-avatar">
						<view class="bg-img"></view>
						<image class="avatar" :src="item.picUrl"></image>
					</view>
					<view class="info-con">
						<p class="title">{{item.name}}</p>
						<view class="desc-con">
							<p v-if="item.category" class="tag">{{item.category}}</p>
							<p class="desc">{{item.programCount}}个声音，播放{{(item.playCount/10000).toFixed(1)}}万次，by
								{{item.dj.nickname}}
							</p>
						</view>
						<p class="desc">{{item.desc}}</p>
					</view>
					<view class="score" v-if="item.subCount%1==0">
						<p>{{randomScore()}}</p>
						<span class="text">分</span>
					</view>
				</view>
				<view class="more-info" v-if="podcastTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{podcastTotal}}个播单</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 艺人 -->
			<view class="singer-con" v-show="singerTotal">
				<view class="top-tit">
					<p class="title">艺人</p>
				</view>
				<singer slot="singer" limit="3" @onTotalCount="val=>singerTotal=val" />
				<view class="more-info" v-if="singerTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{singerTotal}}个歌手</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<loading ref="loading" :isMask="false" mode="top" />
	</view>
</template>

<script>
	import loading from '@/components/loading.vue';
	import single from './single.vue';
	import songList from './songList.vue';
	import album from './album.vue';
	import singer from './singer.vue';
	import $httpSearch from '@/api/search.js';
	export default {
		data() {
			return {
				singleTotal: 0, // 单曲总条数
				songListTotal: 0, // 歌单总条数
				videoList: [],
				videoListTotal: 0,
				albumTotal: 0, // 专辑总条数
				podcastList: [],
				singleRecommList: [], // 单曲推荐
				singleRecommTotal: 0,
				podcastTotal: 0, // 播客总条数
				singerTotal: 0, // 艺人总条数
			}
		},
		components: {
			loading,
			single,
			songList,
			album,
			singer
		},
		mounted() {
			// 判断当前是否展示加载动画
			if (this.singleTotal + this.songListTotal == 0) {
				this.$refs.loading.show();
			} else {
				this.$refs.loading.hide();
			}
			this.getVideoList();
			this.getpodcastList();
			this.getSingleRecommList();
		},
		computed: {
			isLoadingShow() {
				return this.singleTotal + this.songListTotal;
			}
		},
		watch: {
			// 判断当前是否展示加载动画
			isLoadingShow: {
				handler(val) {
					if (val == 0) {
						this.$refs.loading.show();
					} else {
						this.$refs.loading.hide();
					}
				},
			}
		},
		methods: {
			// 去单曲页面
			toSinglePage() {
				// this.$emit('curPageIndex', 1)
			},
			// 获取视频列表
			async getVideoList() {
				let res = await $httpSearch.search({
					keywords: '起风了',
					limit: 5,
					type: 1004
				})
				if (res && res.code == 200) {
					this.videoList = res.result.mvs;
					this.videoListTotal = res.result.mvCount;
				}
			},
			// 时间转换格式
			formatTime(val) {
				let totalSec = parseInt(val / 1000);
				let minute = parseInt(totalSec / 60);
				let second = totalSec - minute * 60;
				return `${('0'+minute).slice(-2)}:${('0'+second).slice(-2)}`;
			},
			// 获取单曲推荐信息
			async getSingleRecommList() {
				let res = await $httpSearch.curSongResem(1330348068);
				console.log('res', res);
				if (res && res.code == 200) {
					this.singleRecommList = res.songs.slice(0, 7);
					this.singleRecommTotal = res.songs.length;
				}
			},
			// 获取播客列表信息
			async getpodcastList() {
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					limit: 3,
					type: 1009
				})
				if (res && res.code == 200) {
					this.podcastList = res.result.djRadios.slice(0, 3);
					this.podcastTotal = res.result.djRadiosCount;
				}
			},
			// 随机生成7分以上的评分
			randomScore() {
				let num = Math.random() * 10;
				if (num > 9) {
					return num.toFixed(1);
				}
				return this.randomScore();
			},
		}
	}
</script>

<style lang="scss">
	.compre {
		width: 100%;
		height: 100%;
		padding: 20rpx;
		padding-top: 0;
		box-sizing: border-box;
		background: #151515;

		.compre-scroll {
			height: 100%;
		}

		.single-con,
		.song-list-con,
		.video-page-con,
		.album-con,
		.single-recomm-con,
		.podcast-con,
		.singer-con {
			width: 100%;
			background: #212121;
			border-radius: 20rpx;
			margin-bottom: 20rpx;

			.top-tit {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #303030;
				padding: 20rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				margin-bottom: 10rpx;

				.title {
					font-size: 30rpx;
					color: #fdfdfd;
					font-weight: bold;
				}

				.play-con {
					border: 1rpx solid #484848;
					border-radius: 50rpx;
					display: flex;
					align-items: center;
					padding: 8rpx 16rpx;

					.play-icon {
						width: 16rpx;
						height: 16rpx;
						margin-right: 10rpx;
					}

					.text {
						font-size: 22rpx;
						color: #fcfcfc;
					}
				}
			}

			.more-info {
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 10rpx;
				border-top: 1rpx solid #303030;

				.more-text {
					font-size: 24rpx;
					color: #656565;
					margin-right: 0rpx;
				}

				.img-box {
					width: 30rpx;
					height: 30rpx;
					display: flex;
					overflow: hidden;

					.more-icon {
						width: 30rpx;
						height: 30rpx;
						filter: drop-shadow(30rpx 0 #656565);
						transform: translateX(-100%);
					}
				}
			}
		}

		.song-list-con {

			.top-tit {
				border-bottom: none;
				margin-bottom: 0;
			}
		}

		.video-page-con {
			.top-tit {
				border-bottom: none;
				margin-bottom: 0;
			}

			.video-item-con {
				padding: 0 20rpx;
				padding-bottom: 20rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
			}

			.video-con {
				min-width: 250rpx;
				height: 150rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;
				position: relative;

				.image-cover {
					width: 100%;
					height: 100%;
				}

				.play-icon {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.mv-info {
				flex: 1;
				margin-top: 10rpx;
				overflow: hidden;

				.mv-name {
					font-size: 32rpx;
					color: #f8f8f8;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box; //使用自适应布局
					-webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
					-webkit-box-orient: vertical;
				}

				.mv-desc {
					font-size: 24rpx;
					color: #626262;
					margin-top: 14rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.album-con {
			.top-tit {
				border-bottom: none;
				margin-bottom: 0;
			}
		}

		.single-recomm-con {
			.top-tit {}

			.sing-item {
				width: 100%;
				height: 110rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #303030;
				padding: 0rpx 20rpx;
				box-sizing: border-box;

				&:first-of-type {
					padding-top: 0;
				}

				&:last-of-type {
					// border-bottom: none;
					border-color: red !important;
				}

				.left-info {
					max-width: 80%;

					.song-name {
						font-size: 30rpx;
						color: #fefefe;
					}

					.song-info {
						display: flex;
						align-items: center;
						margin: 4rpx 0;
						height: 28rpx;

						.tag {
							font-size: 18rpx;
							padding: 0rpx 4rpx;
							border-radius: 6rpx;
							margin-right: 10rpx;
							white-space: nowrap;

							&.origin {
								background: #f9463e;
								color: #ffeeef;
							}

							&.quality {
								border: 1rpx solid #c3a366;
								color: #c3a366;
							}
						}

						.sing-name {
							font-size: 26rpx;
							color: #696a65;
							white-space: nowrap;
						}
					}

					.origin-singer {
						display: flex;
						align-items: center;
						margin-top: 8rpx;

						.tag {
							font-size: 20rpx;
							color: #de845b;
							font-weight: bold;
							background: rgba(#de845b, .2);
							padding: 2rpx 4rpx;
							border-radius: 8rpx;
							margin-right: 10rpx;
							white-space: nowrap;
						}

						.origin-info {
							width: 100%;
							font-size: 24rpx;
							color: #60605e;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							display: flex;
							align-items: center;

							.line {
								display: block;
								width: 1px;
								height: 16rpx;
								background: #656565;
								margin: 4rpx 10rpx 0;
							}

							span {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}
					}
				}

				.right-info {
					display: flex;
					align-items: center;
					position: relative;
					left: 20rpx;

					.video-play-icon {
						width: 120rpx;
						height: 110rpx;
					}
				}
			}
		}

		.podcast-con {
			.top-tit {
				border-bottom: none;
				margin-bottom: 0;
			}

			.podcast-item {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.left-avatar {
					min-width: 120rpx;
					min-height: 140rpx;
					position: relative;

					.bg-img {
						width: 100rpx;
						height: 100rpx;
						border-radius: 10rpx;
						background: #2c2c2c;
						position: absolute;
						top: 0rpx;
						left: 10rpx;
					}

					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 10rpx;
						position: absolute;
						top: 8rpx;
					}
				}

				.info-con {
					width: 100%;
					margin: 0 20rpx;
					overflow: hidden;

					.title {
						font-size: 32rpx;
						color: #e8e8e8;
					}

					.desc-con {
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						.tag {
							font-size: 20rpx;
							color: #8691af;
							padding: 0 4rpx;
							border: 1rpx solid #363441;
							border-radius: 6rpx;
							margin-right: 10rpx;
							white-space: nowrap;
						}

						.desc {
							font-size: 24rpx;
							color: #5d5d5d;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.desc {
						font-size: 24rpx;
						color: #5d5d5d;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.score {
					width: 80rpx;
					height: 80rpx;
					font-size: 32rpx;
					color: #ee834b;
					font-weight: bold;
					display: flex;
					align-items: center;

					.text {
						font-weight: normal;
						font-size: 16rpx;
						margin-top: 14rpx;
						margin-left: 4rpx;
					}
				}
			}
		}

		.singer-con {
			.top-tit {
				border-bottom: none;
				margin-bottom: 0;
			}
		}
	}
</style>

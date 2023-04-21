<template>
	<view class="play-detail">
		<!-- 背景图 -->
		<image class="bg-img" :src="curPlaySongInfo.picUrl" mode="aspectFill" />
		<view class="detail-con">
			<view class="top-box">
				<image @click="back" class="back-icon" src="/static/images/pages/found/arrow_fff.png" mode="" />
				<view class="song-info">
					<p class="name">{{curPlaySongInfo.songName}}</p>
					<view class="singer">
						<p>{{curPlaySongInfo.singName}}</p>
						<p class="follow">关注</p>
					</view>
				</view>
				<image class="share" src="/static/images/pages/play/share.png" mode="" />
			</view>
			<!-- 播放状态 转盘 -->
			<view @click="isAlbumShow=!isAlbumShow">
				<view :class="['album-conta',{'album-conta-hide':!isAlbumShow}]">
					<image :class="['rod',{pause:isPause}]" src="/static/images/pages/play/gmk.png" mode="" />
					<view :class="['music-con',{'pause-animate':isPause}]">
						<image class="bg-disc" src="/static/images/pages/play/music_disc.png" mode="" />
						<image class="music-img" :src="curPlaySongInfo.picUrl" mode="aspectFill" />
					</view>
					<view class="opera-con">
						<view class="item-icon">
							<image class="opera-icon" src="/static/images/pages/play/hollow.png" mode="" />
							<image class="opera-icon" v-show="false" src="/static/images/pages/play/solid.png"
								mode="" />
						</view>
						<view class="item-icon">
							<image class="opera-icon" src="/static/images/pages/play/excep.png" mode="" />
							<text class="count">999+</text>
						</view>
						<view class="item-icon">
							<image class="opera-icon" src="/static/images/pages/play/emoji.png" mode="" />
						</view>
						<view class="item-icon" @click.stop="openComments">
							<image class="opera-icon" src="/static/images/pages/play/comment.png" mode="" />
							<text class="count">{{songCommTotal}}</text>
						</view>
						<view class="item-icon">
							<image class="opera-icon" src="/static/images/pages/play/more.png" mode="" />
						</view>
					</view>
				</view>
				<!-- 歌词信息 -->
				<view :class="['lyrics-con',{'lyrics-con-hide':isAlbumShow}]">
					<lyricsDetail :isReadyOK="isRenderLyrCom"></lyricsDetail>
				</view>
			</view>


			<!-- 播放条 -->
			<view class="play-bar" v-if="curPlaySongInfo.songTime">
				<play-bar :sliderMax="curPlaySongInfo.songTime" v-model="currentPlayTime"></play-bar>
			</view>
			<view class="play-opera">
				<view class="play-order" @click="checkPlayMode">
					<image class="mode-icon" :src="'/static/images/pages/play/'+playModes[curPlayMode].icon+'.png'"
						:alt="playModes[curPlayMode].name" mode="" />
				</view>
				<view class="control-play">
					<image @click="kaiqi" class="prev-icon" src="/static/images/pages/play/prev_song.png" mode="" />
					<view :class="['control',{play:!isPause}]" @click="checkPause">
						<image class="contr-icon" v-show="!isPause" src="/static/images/pages/play/play_icon.png"
							mode="" />
						<image class="contr-icon" v-show="isPause" src="/static/images/pages/play/suspend_icon.png"
							mode="" />
					</view>
					<image @click="guanbi" class="next-icon" src="/static/images/pages/play/next_song.png" mode="" />
				</view>
				<image class="play-menu" src="/static/images/pages/play/play_menu.png" mode="" />
			</view>
		</view>

		<!-- 歌曲评论详情:isRenderOk="isCommentsShow" -->
		<popup :isPopup.sync="isCommentsShow" :isPadding="false" :isRadius="false" bgColor="#0f0f0f">
			<songComments slot="content" @toBack="onOffComm" />
		</popup>

	</view>
</template>

<script>
	import playBar from '@/components/playBar.vue';
	import popup from '@/components/popup.vue';
	import songComments from './pages/songComments.vue';
	import lyricsDetail from './components/lyricsDetail.vue';
	import {
		playModes
	} from '@/utils/dataJson.js';
	import {
		mapState,
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		components: {
			playBar,
			popup,
			songComments,
			lyricsDetail
		},
		props: ["isRenderOk"],
		data() {
			return {
				isPause: true, // 是否暂停播放
				playModes: playModes,
				curPlayMode: 0, // 当前循环模式,
				currentPlayTime: null, // 当前音乐播放秒数
				isCommentsShow: false, // 是否展示评论区
				songCommTotal: 0, // 评论总条数
				isAlbumShow: true, // 是否展示专辑图片（默认不展示歌词）
				isRenderLyrCom: false, // 是否可以渲染歌词页面
			}
		},
		computed: {
			...mapState('songDetail', ["curPlaySongInfo", "curPlayTime", "songCommentObj"]),
			...mapGetters("songDetail", ["newCommentsList", "hotCommentsList"]),
		},
		watch: {
			isRenderOk(val) {
				if (val && this.curPlaySongInfo.id) {
					this.isRenderLyrCom = true;
					console.log('页面这才开始触发')
				}
			},
			"curPlaySongInfo.songState": {
				handler(newVal) {
					this.isPause = newVal == 'pause' ? true : false;
				},
				deep: true
			},
			curPlayTime: {
				handler(val) {
					this.currentPlayTime = ~~val;
				},
				immediate: true,
			},
			// 评论数
			"songCommentObj.total": {
				handler(val) {
					if (val > 999 && val <= 5000) {
						this.songCommTotal = '999+';
					} else if (val > 5000 && val <= 10000) {
						this.songCommTotal = '5k+';
					} else if (val > 10000 && val <= 50000) {
						this.songCommTotal = '1w+';
					} else if (val > 50000 && val <= 100000) {
						this.songCommTotal = '5w+';
					} else if (val > 100000) {
						this.songCommTotal = '10w+';
					} else {
						this.songCommTotal = val;
					}
				},
				immediate: true,
				deep: true
			}
		},

		methods: {
			...mapMutations('songDetail', ["deleteSongComments"]),
			...mapActions("songDetail", ["getSongComments"]),
			back() {
				this.$emit("backMusicInfo");
			},
			// 切换播放模式
			checkPlayMode() {
				this.curPlayMode++;
				if (this.curPlayMode > 4) {
					this.curPlayMode = 0;
				}
			},
			timeupdate(e) {
				console.log(e)
			},
			checkPause() {
				this.isPause = !this.isPause;
				if (!this.isPause) {
					// 播放
					this.bus.$emit('onPlaySong', this.curPlaySongInfo.songUrl);
				} else {
					// 暂停
					this.bus.$emit('onPauseSong');
				}
			},
			// 播放音乐
			playSong() {
				this.audio.src = curPlaySongInfo.songUrl;
			},
			// 打开评论区
			async openComments() {
				// 获取最新评论前先清除旧的评论
				// await this.deleteSongComments();
				// await this.getSongComments({});
				this.isCommentsShow = true;
			},
			// 关闭评论区
			onOffComm() {
				// 清空评论信息（以便防止数据错乱，以及下次更新最新评论）
				this.deleteSongComments();
				console.log('评论清空完成', this.songCommentObj)
				this.isCommentsShow = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.play-detail {
		width: 100%;
		height: 100vh;
		background: #383838;

		.detail-con {
			height: 100vh;
			position: sticky;
			z-index: 50;
		}

		.bg-img {
			width: 100vw;
			height: 100vh;
			// backdrop-filter: blur(10px);
			filter: blur(160px);
			position: absolute;
			z-index: 0;

		}

		.top-box {
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;

			.back-icon {
				width: 44rpx;
				height: 44rpx;
				transform: rotate(90deg);
			}

			.song-info {
				text-align: center;

				.name {
					font-size: 26rpx;
					color: #fff;
				}

				.singer {
					font-size: 22rpx;
					color: #c9c9c9;
					margin-top: 6rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.follow {
						font-size: 14rpx;
						color: #dedcdb;
						padding: 3rpx 6rpx;
						border-radius: 5rpx;
						background: rgba(#dedcdb, .4);
						margin-left: 6rpx;
					}
				}
			}

			.share {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.album-conta {
			opacity: 1;
			transition: .2s;

			&-hide {
				opacity: 0;
				height: 0;
			}
		}

		.rod {
			width: 204rpx;
			height: 358rpx;
			position: absolute;
			left: 46%;
			top: 5%;
			// transform: translateX(-16%);
			z-index: 50;
			margin-top: 20rpx;
			transition: .6s;
			transform-origin: 34rpx 30rpx;
			transform: rotate(-2deg);

			&.pause {
				transform: rotate(-30deg);
			}
		}

		.music-con {
			width: 620rpx;
			height: 620rpx;
			border-radius: 50%;
			background: rgba(#eee, .4);
			border: 1px solid #ccc;
			position: relative;
			margin: 220rpx auto 170rpx;
			transform: rotate(0deg);
			animation: musicRotate 20s infinite;
			animation-timing-function: linear;
			animation-fill-mode: backwards;

			&.pause-animate {
				animation-play-state: paused;
			}

			.bg-disc {
				width: 600rpx;
				height: 600rpx;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 10;
			}

			.music-img {
				width: 500rpx;
				height: 500rpx;
				border-radius: 50%;
				overflow: hidden;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		.opera-con {
			width: 100%;
			height: 70rpx;
			display: flex;
			justify-content: space-around;

			.item-icon {
				width: 70rpx;
				height: 70rpx;
				position: relative;

				.opera-icon {
					width: 100%;
					height: 100%;
				}

				.count {
					position: absolute;
					top: 7rpx;
					left: 46rpx;
					font-size: 18rpx;
					color: #e4e1db;
				}
			}
		}

		.lyrics-con {
			height: calc(100vh - 380rpx);
			// margin-top: 30rpx;
			position: relative;
			top: -200rpx;
			z-index: 99;
			opacity: 1;
			transition: .4s;

			// background-color: pink;
			&-hide {
				opacity: 0;
				height: 0;
				top: 200rpx;
				transition: 0s;
			}
		}

		.play-bar {
			width: 100%;
			height: 40rpx;
			// background: #fff;
			position: absolute;
			bottom: 200rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
		}

		.play-opera {
			width: 100%;
			height: 180rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			position: absolute;
			bottom: 20rpx;

			.play-order .mode-icon,
			.play-menu {
				width: 80rpx;
				height: 80rpx;
			}

			.control-play {
				width: 340rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.prev-icon,
				.next-icon {
					width: 60rpx;
					height: 60rpx;
				}

				.control {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					border: 2px solid #e6e4e3; // 播放的时候 #d2cfcc
					display: flex;
					justify-content: center;
					align-items: center;
					transition: .4s;

					&.play {
						border-color: #d2cfcc;
					}

					.contr-icon {
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
		}

		// 开始播放的时候专辑图片转动
		@keyframes musicRotate {
			0% {
				transform: rotate(0deg);
			}

			100% {
				transform: rotate(360deg);
			}
		}

	}
</style>

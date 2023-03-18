<template>
	<view class="play-detail">
		<!-- 背景图 -->
		<image class="bg-img" :src="curPlaySongInfo.picUrl" mode="aspectFill"></image>
		<view class="detail-con">
			<view class="top-box">
				<image @click="back" class="back-icon" src="/static/images/pages/found/arrow_fff.png" mode=""></image>
				<view class="song-info">
					<p class="name">{{curPlaySongInfo.songName}}</p>
					<view class="singer">
						<p>{{curPlaySongInfo.singName}}</p>
						<p class="follow">关注</p>
					</view>
				</view>
				<image class="share" src="/static/images/pages/play/share.png" mode=""></image>
			</view>
			<image :class="['rod',{pause:isPause}]" src="/static/images/pages/play/gmk.png" mode=""></image>
			<view :class="['music-con',{'pause-animate':isPause}]">
				<image class="bg-disc" src="/static/images/pages/play/music_disc.png" mode=""></image>
				<image class="music-img" :src="curPlaySongInfo.picUrl" mode="aspectFill"></image>
			</view>
			<view class="opera-con">
				<view class="item-icon">
					<image class="opera-icon" src="/static/images/pages/play/hollow.png" mode=""></image>
					<image class="opera-icon" v-show="false" src="/static/images/pages/play/solid.png" mode=""></image>
				</view>
				<view class="item-icon">
					<image class="opera-icon" src="/static/images/pages/play/excep.png" mode=""></image>
					<text class="count">999+</text>
				</view>
				<view class="item-icon">
					<image class="opera-icon" src="/static/images/pages/play/emoji.png" mode=""></image>
				</view>
				<view class="item-icon" @click="openComments">
					<image class="opera-icon" src="/static/images/pages/play/comment.png" mode=""></image>
					<text class="count">{{songCommTotal}}</text>
				</view>
				<view class="item-icon">
					<image class="opera-icon" src="/static/images/pages/play/more.png" mode=""></image>
				</view>
			</view>
			<!-- 播放条 -->
			<view class="play-bar" v-if="curPlaySongInfo.songTime">
				<play-bar :sliderMax="curPlaySongInfo.songTime" v-model="currentPlayTime"></play-bar>
			</view>
			<view class="play-opera">
				<view class="play-order" @click="checkPlayMode">
					<image class="mode-icon" :src="'/static/images/pages/play/'+playModes[curPlayMode].icon+'.png'"
						:alt="playModes[curPlayMode].name" mode=""></image>
				</view>
				<view class="control-play">
					<image @click="kaiqi" class="prev-icon" src="/static/images/pages/play/prev_song.png" mode="">
					</image>
					<view :class="['control',{play:!isPause}]" @click="checkPause">
						<image class="contr-icon" v-show="!isPause" src="/static/images/pages/play/play_icon.png"
							mode=""></image>
						<image class="contr-icon" v-show="isPause" src="/static/images/pages/play/suspend_icon.png"
							mode=""></image>
					</view>
					<image @click="guanbi" class="next-icon" src="/static/images/pages/play/next_song.png" mode="">
					</image>
				</view>
				<image class="play-menu" src="/static/images/pages/play/play_menu.png" mode=""></image>
			</view>
		</view>

		<!-- 歌曲评论详情 -->
		<popup :isPopup.sync="isCommentsShow" bgColor="#151515">
			<songComments slot="content"></songComments>
		</popup>
	</view>
</template>

<script>
	import playBar from '@/components/playBar.vue';
	import popup from '@/components/popup.vue';
	import songComments from './pages/songComments.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			playBar,
			popup,
			songComments,
		},
		data() {
			return {
				isPause: true, // 是否暂停播放
				playModes: [{
						name: "循环播放",
						icon: "cycle_mode"
					},
					{
						name: "顺序播放",
						icon: "order_mode"
					},
					{
						name: "随机播放",
						icon: "random_mode"
					},
					{
						name: "单曲播放",
						icon: "single_mode"
					},
					{
						name: "心动模式",
						icon: "cardiac_mode"
					},
				],
				curPlayMode: 0, // 当前循环模式,
				currentPlayTime: null, // 当前音乐播放秒数
				isCommentsShow: true, // 是否展示评论区
				
			}
		},

		created() {},
		computed: {
			...mapState('songDetail', ["curPlaySongInfo", "curPlayTime", "songCommentObj"]),
			songCommTotal() {
				return this.songCommentObj.total > 999 ? '999+' : this.songCommentObj.total;
			}
		},
		watch: {
			"curPlaySongInfo.songState": {
				handler(newVal) {
					this.isPause = newVal == 'pause' ? true : false;
				},
				immediate: true,
				deep: true
			},
			curPlayTime: {
				handler(val) {
					this.currentPlayTime = val;
				},
				immediate: true,
				deep: true
			}
		},

		methods: {
			back() {
				this.$emit("backMusicInfo")
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
				console.log('curPlaySongInfo.songUrl', curPlaySongInfo.songUrl)
				this.audio.src = curPlaySongInfo.songUrl;
			},
			// 打开评论区
			openComments(){
				this.isCommentsShow = true;
			}
		}
	}
</script>

<style lang="scss">
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

		.rod {
			width: 204rpx;
			height: 358rpx;
			position: absolute;
			left: 46%;
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

		.play-bar {
			width: 100%;
			height: 40rpx;
			// background: #fff;
			margin-top: 50rpx;
			position: absolute;
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

<template>
	<view class="play-detail">
		<!-- 背景图 -->
		<image class="bg-img"
			src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/106020/2021/1108/166/f2e64941-3755-4f4f-af1e-26f15c32165b_420_531.jpg"
			mode="aspectFill"></image>
		<view class="detail-con">
			<view class="top-box">
				<image @click="back" class="back-icon" src="/static/images/pages/found/arrow_fff.png" mode=""></image>
				<view class="song-info">
					<p class="name">我叫长安，你叫故里</p>
					<view class="singer">
						<text>汪小敏/张小海</text>
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
				<image class="share" src="/static/images/pages/play/share.png" mode=""></image>
			</view>
			<image :class="['rod',{pause:isPause}]" src="/static/images/pages/play/gmk.png" mode=""></image>
			<view class="music-con">
				<image class="bg-disc" src="/static/images/pages/play/music_disc.png" mode=""></image>
				<image class="music-img"
					src="https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/616774/2022/0902/182/3cec49ed-b95f-4251-9657-95cb4f34b1bb_420_531.jpg"
					mode="aspectFill"></image>
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
				<view class="item-icon">
					<image class="opera-icon" src="/static/images/pages/play/comment.png" mode=""></image>
					<text class="count">631</text>
				</view>
				<view class="item-icon">
					<image class="opera-icon" src="/static/images/pages/play/more.png" mode=""></image>
				</view>
			</view>
			<!-- 播放条 -->
			<view class="play-bar">
				<play-bar></play-bar>
			</view>
			<view class="play-opera">
				<view class="play-order" @click="checkPlayMode">
					<image class="mode-icon" :src="'/static/images/pages/play/'+playModes[curPlayMode].icon+'.png'"
						:alt="playModes[curPlayMode].name" mode=""></image>
				</view>
				<view class="control-play">
					<image class="prev-icon" src="/static/images/pages/play/prev_song.png" mode=""></image>
					<view :class="['control',{play:!isPause}]" @click="checkPause">
						<image class="contr-icon" v-show="!isPause" src="/static/images/pages/play/play_icon.png"
							mode=""></image>
						<image class="contr-icon" v-show="isPause" src="/static/images/pages/play/suspend_icon.png"
							mode=""></image>
					</view>
					<image class="next-icon" src="/static/images/pages/play/next_song.png" mode=""></image>
				</view>
				<image class="play-menu" src="/static/images/pages/play/play_menu.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import playBar from '@/components/playBar.vue'
	export default {
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
				curPlayMode: 0,
				audio: null, // 播放变量
			}
		},
		components: {
			playBar,
		},
		mounted() {
			this.audio = uni.createInnerAudioContext();
			this.audio.src = '';
			// audio.onPlay(() => {
			//   console.log('开始播放');
			// });
			// audio.onError((res) => {
			//   console.log(res.errMsg);
			//   console.log(res.errCode);
			// });
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
				console.log('this.audio', this.audio)
				this.isPause = !this.isPause;
				if (!this.isPause) {
					this.audio.play();
				} else {
					this.audio.pause();
				}
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
			backdrop-filter: blur(10px);
			filter: blur(50px);
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

					.more-icon {
						width: 30rpx;
						height: 30rpx;
						margin-left: -2rpx;
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
			left: 50%;
			transform: translateX(-10%);
			z-index: 50;
			margin-top: 20rpx;
			transition: .6s;
			transform-origin: 22rpx 62rpx;

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
			background: #fff;
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
	}
</style>

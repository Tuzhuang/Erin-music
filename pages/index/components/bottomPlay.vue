<template>
	<view :class="['bottom-play',{hide:!curPlaySongInfo.songUrl}]">
		<view class="play-con" @click="openPlayMod">
			<view class="left-disc">
				<image class="disc-icon" src="/static/images/pages/play/bt_disc.png" mode=""></image>
				<image class="song-img" :src="curPlaySongInfo.picUrl" mode="aspectFill"></image>
			</view>
			<view class="song-name">
				<p class="name">{{curPlaySongInfo.songName}}</p>
				<span class="split">-</span>
				<text class="singer">{{curPlaySongInfo.singName}}</text>
			</view>
			<view class="right-box">
				<circleProgreBar class="circle-progre" />
				<view class="play-menu" @click.stop="openPlayList">
					<image class="menu-icon" src="/static/images/pages/play/play_menu.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import circleProgreBar from '@/components/circleProgreBar.vue';

	export default {
		props: ["isReadyOk"],
		components: {
			circleProgreBar
		},
		data() {
			return {
				innerAudioContext: null, // 播放器dom
			}
		},
		created() {
			// 创建播放器实例
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.autoplay = true; // 自动播放
			this.innerAudioContext.obeyMuteSwitch = false; // 静音状态依旧播放声音
			// 播放音乐
			this.bus.$on('onPlaySong', value => {
				this.playSong(value);
			});
			// 暂停音乐
			this.bus.$on('onPauseSong', () => {
				this.pauseSong();
			});
			// 从某个位置开始播放音乐
			this.bus.$on('onToTimePlay', value => {
				this.toTimePlay(value);
			});
			// 当音乐播放的时候触发的方法
			this.innerAudioContext.onPlay(() => {
				this.setCurPlaySongInfo({
					...this.curPlaySongInfo,
					songState: 'play'
				});
			});
			// 当音乐暂停播放的时候触发的方法
			this.innerAudioContext.onPause(() => {
				console.log('暂停');
				this.setCurPlaySongInfo({
					...this.curPlaySongInfo,
					songState: 'pause'
				});
				// this.innerAudioContext.offTimeUpdate();
			});
			// 音乐加载完毕准备播放会触发的方法
			this.innerAudioContext.onCanplay(() => {
				// 这个打印必须要执行，不然就会出问题，离谱！！！
				console.log('当前播放状态', this.innerAudioContext.paused)
				this.$nextTick(() => {
					this.getPlayCurTime();
				})
			})
		},
		computed: {
			...mapState('songDetail', ["curPlaySongInfo", 'curPlayTime']),
		},
		methods: {
			...mapMutations('songDetail', ['setCurPlaySongInfo', 'setCurPlayTime']),
			openPlayMod() {
				this.$emit('openPlayPage');
			},
			openPlayList() {
				console.log('openPlayList不会下去')
			},
			// 开始播放音乐
			playSong(url) {
				this.innerAudioContext.src = url;
				// 重新播放音乐的时候判断下当前音乐是否播放结束，如果结束的话就要将当前已播放时间清零
				if (this.curPlaySongInfo.songTime == this.curPlayTime) {
					this.setCurPlayTime(0);
				}
				// 判断一下如果有上次记录的时间，就从上次记录的时间开始播放
				if (this.curPlayTime) {
					this.toTimePlay(this.curPlayTime);
				}
				this.innerAudioContext.play();
			},
			// 暂停播放音乐
			pauseSong() {
				this.innerAudioContext.pause();
			},
			// 从某个位置开始播放音乐
			toTimePlay(val) {
				this.innerAudioContext.seek(+val);
			},
			getPlayCurTime() {
				this.innerAudioContext.onTimeUpdate(() => {
					// 保存当前音乐播放的秒数
					this.setCurPlayTime(this.innerAudioContext.currentTime.toFixed(2));
				})

			}
		},
		onUnload() {
			console.log('页面卸载')
		}
	}
</script>

<style lang="scss">
	.bottom-play {
		width: 100%;
		height: 80rpx;
		position: relative;
		bottom: 0rpx;
		transition: .5s;
		border-bottom: 1rpx solid rgba(#ccc, .1);

		&.hide {
			bottom: -200rpx;
		}

		.play-con {
			width: 100%;
			height: 100%;
			// background: rgba(#0d0d0d, .6);
			background: rgba(#212026, .6);
			backdrop-filter: blur(20px);
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			bottom: -4rpx;

			.left-disc {
				width: 80rpx;
				height: 80rpx;
				position: relative;

				.disc-icon {
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -48%);
				}

				.song-img {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%, -48%);
				}
			}

			.song-name {
				display: flex;
				align-items: flex-end;
				margin-left: 20rpx;
				max-width: 60%;


				.name,
				.singer {
					font-size: 24rpx;
					color: #fff;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.split,
				.singer {
					font-size: 20rpx;
					color: #5d5d5d;
				}

				.singer {
					flex: 1;
				}

				.split {
					padding: 0 10rpx;
				}
			}

			.right-box {
				flex: 1;
				height: 100%;
				display: flex;
				justify-content: flex-end;

				.play-menu {
					width: 80rpx;
					height: 80rpx;

					.menu-icon {
						width: 70rpx;
						height: 70rpx;
					}
				}
			}
		}
	}
</style>

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
			<view class="play-menu" @click.stop="openPlayList">
				<image class="menu-icon" src="/static/images/pages/play/play_menu.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				innerAudioContext: null, // 播放器
				songTimer: null, // 当前播放时间的timerId
			}
		},
		created() {
			// 创建播放器实例
			this.innerAudioContext = uni.createInnerAudioContext();
			// 播放音乐
			this.bus.$on('onPlaySong', value => {
				console.log('value', value);
				this.playSong(value);
			})
			// 暂停音乐
			this.bus.$on('onPauseSong', () => {
					console.log('触发暂停音乐');
					this.pauseSong();
				}),
				// 从某个位置开始播放音乐
				this.bus.$on('onToTimePlay', value => {
					this.toTimePlay(value);
				})
		},
		computed: {
			...mapState('songDetail', ["curPlaySongInfo", 'curPlayTime']),
		},
		watch: {
			curPlayTime: {
				handler(newVal, oldVal) {
					if (typeof newVal != 'number' || typeof oldVal != 'number') return;
					// 此处的作用主要是当音乐进度条更新的时候触发新的计时器，并且旧时间不等于歌曲总时长
					if (newVal - oldVal != 1) {
						clearInterval(this.songTimer);
						// 判断一下播放条更新前是播放状态还是暂停状态，如果是播放状态的话就开启计时器继续播放
						if (this.curPlaySongInfo.songState == 'play') {
							this.openTimer(newVal);
						}
					}
					// 还要判断下当当前音乐播放完毕的时候就要停止计时器
					if (newVal == this.curPlaySongInfo.songTime) {
						console.log('音乐播放完毕');
						this.pauseSong();
					}
				},
				immediate: true,
				deep: true
			}
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
				// 更新播放时间的时候要重新触发一下该方法
				this.toTimePlay(this.curPlayTime);
				this.innerAudioContext.play();
				this.innerAudioContext.onPlay(() => {
					console.log('播放');
					this.setCurPlaySongInfo({
						...this.curPlaySongInfo,
						songState: 'play'
					});
					// 开启定时器读秒
					this.openTimer(this.curPlayTime);
				})
			},
			// 暂停播放音乐
			pauseSong() {
				this.innerAudioContext.pause();
				this.innerAudioContext.onPause(() => {
					console.log('暂停');
					this.setCurPlaySongInfo({
						...this.curPlaySongInfo,
						songState: 'pause'
					});
					// 暂停计时器
					clearInterval(this.songTimer);
				})
			},
			// 开启一个定时器来注饰当前播放音乐的进度
			openTimer(startTime) {
				if (this.songTimer) {
					clearInterval(this.songTimer);
				}
				this.songTimer = setInterval(() => {
					startTime++; // 当前播放时间
					this.setCurPlayTime(startTime);
				}, 1000)
			},
			// 从某个位置开始播放音乐
			toTimePlay(val) {
				console.log('出发了几次')
				this.innerAudioContext.seek(val);
				this.innerAudioContext.onSeeked(() => {
					console.log('进度更新成功')
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

				.name {
					font-size: 24rpx;
					color: #fff;
				}

				.split,
				.singer {
					font-size: 20rpx;
					color: #5d5d5d;
				}

				.split {
					padding: 0 10rpx;
				}
			}

			.play-menu {
				width: 80rpx;
				height: 80rpx;
				position: absolute;
				right: 0;

				.menu-icon {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="circle-progre-bar" @click.stop="triggerState">
		<canvas canvas-id="progress" style="width: 40px;height: 40px;"></canvas>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				ctx: null,
				width: 1, //进度条宽度
				r: 12, //半径
				x: 20, //圆心x轴坐标
				y: 20, //圆心y轴坐标
				startAngle: -Math.PI / 2, //起始角度，12点钟方向
				count: 0, // 圆分成几份 （每首歌曲的时间 秒数）
				curNum: 0, // 当前绘制到第几份了
				songTimer: null, // 计时器ID
			};
		},
		onReady() {
			this.ctx = uni.createCanvasContext('progress', this); //获取canvas的上下文对象
			// 初次先调用一次
			this.drawProgress();
			this.curNum = 0; //设置初始值为0
			// 设置总秒数
			this.count = this.curPlaySongInfo.songTime;
		},
		computed: {
			...mapState("songDetail", ["curPlaySongInfo", "curPlayTime"])
		},
		watch: {
			// 监听当前的播放状态（是否在播放中）
			"curPlaySongInfo.songState": {
				handler(val) {
					if (val == 'play') {
						// 绘制播放按钮
						this.drawPlayBtn();
						this.count = this.curPlaySongInfo.songTime;
						this.songTimer = setInterval(() => {
							this.curNum = this.curPlayTime;
							this.curNum += 1;
							if (this.curNum > this.count) {
								clearInterval(this.songTimer);
							}
							this.drawProgress(); //更新进度条画布
						}, 1000);
					} else if (val == 'pause') {
						// 绘制暂停按钮
						this.drawPauseBtn();
						clearInterval(this.songTimer);
					}
				},
				deep: true,

			}
		},
		methods: {
			drawProgress() {
				const endAngle = (2 * Math.PI / this.count) * this.curNum + this.startAngle; //终止角度

				//清除上一次的画布
				this.ctx.clearRect(0, 0, 40, 40);

				// 绘制背景圆环
				this.setBgCircle();

				if (this.curPlaySongInfo.songState == 'play') {
					// 绘制暂停按钮
					this.drawPauseBtn();
				} else if (this.curPlaySongInfo.songState == 'pause') {
					// 绘制播放按钮
					this.drawPlayBtn();
				}

				//绘制进度圆环
				this.ctx.beginPath();
				this.ctx.arc(this.x, this.y, this.r, this.startAngle, endAngle, false);
				this.ctx.lineWidth = this.width;
				this.ctx.strokeStyle = '#e0e0e0'; //进度圆环颜色
				this.ctx.stroke();
				this.ctx.closePath();

				this.ctx.draw(); //更新画布
			},
			// 绘制背景圆环
			setBgCircle() {
				this.ctx.beginPath();
				this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
				this.ctx.lineWidth = this.width;
				this.ctx.strokeStyle = '#626166'; //背景圆环颜色
				this.ctx.stroke();
				this.ctx.closePath();
			},
			// 绘制播放按钮
			drawPlayBtn() {
				this.ctx.beginPath();
				// var height = 200 * Math.sin(Math.PI / 3); //计算等边三角形的高
				let bian = 10;
				this.ctx.moveTo(17, 15);
				this.ctx.lineTo(17, 25);
				this.ctx.lineTo(bian * Math.sin(Math.PI / 3) + 17, 20);
				this.ctx.fillStyle = '#fff';
				this.ctx.lineJoin = 'round';
				this.ctx.fill();
				this.ctx.closePath();
			},
			// 绘制暂停按钮
			drawPauseBtn() {
				this.ctx.beginPath();
				this.ctx.moveTo(17, 16);
				this.ctx.lineTo(19, 16);
				this.ctx.lineTo(19, 24);
				this.ctx.lineTo(17, 24);
				this.ctx.fillStyle = '#e8e8e9';
				this.ctx.lineCap = 'round';
				this.ctx.fill();
				this.ctx.closePath();

				this.ctx.beginPath();
				this.ctx.moveTo(21, 16);
				this.ctx.lineTo(23, 16);
				this.ctx.lineTo(23, 24);
				this.ctx.lineTo(21, 24);
				this.ctx.fillStyle = '#e8e8e9';
				this.ctx.lineCap = 'round';
				this.ctx.fill();
				this.ctx.closePath();
			},
			triggerState() {
				if (this.curPlaySongInfo.songState == 'play') {
					// 暂停音乐
					this.bus.$emit('onPauseSong');
					clearInterval(this.songTimer)
				} else if (this.curPlaySongInfo.songState == 'pause') {
					// 开始播放音乐
					this.bus.$emit('onPlaySong', this.curPlaySongInfo.songUrl);
					this.songTimer = setInterval(() => {
						this.curNum = this.curPlayTime;
						this.curNum += 1;
						if (this.curNum > this.count) {
							clearInterval(this.songTimer);
						}
						this.drawProgress(); //更新进度条画布
					}, 1000);
				}
			}
		},
	};
</script>

<style lang="scss">
	.circle-progre-bar {}
</style>

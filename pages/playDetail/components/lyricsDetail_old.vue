<template>
	<view class="lyrics">
		<view class="tigger-menu" @click="goto">

		</view>
		<scroll-view class="lyr-scroll" scroll-y @scroll="scrollChange" @touchmove="touchMove"
			:scroll-top="scrollTopDist" scroll-with-animation>
			<p :class="['lyr-item',{'cur-row':curScrollBlock==i+1}]" v-for="(item,i) in lyrList" :key="i">
				{{item.words}}
			</p>
			<view class="after"></view>
		</scroll-view>
		<!-- 播放控制条 -->
		<view :class="['control-bar',{'control-bar-hide':!isScrollIng}]">
			<image class="play-icon" src="/static/images/pages/play/suspend_icon.png" mode="" />
			<p class="line"></p>
			<p class="cur-time">{{lyrList[curScrollBlock-1].oldTime}}</p>
		</view>

	</view>
</template>

<script>
	import $httpSongInfo from '@/api/songInfo.js';
	import {
		mapState
	} from 'vuex';
	export default {
		props: ["isReadyOK"],
		data() {
			return {
				lyrList: [],
				curScrollBlock: 1, // 当前滚动歌词到第几行了
				scrollTop: null, // 最新的滚动距离
				oldScrollTop: null, // 旧的滚动距离
				scrollTopDist: null, // 当滑动停止时应该滚动的距离
				isScrollIng: false, // 当前是否在滑动中
				lyrHeightList: [], // 每行的歌词高度列表
			}
		},
		computed: {
			...mapState("songDetail", ["curPlaySongInfo", "currentTime"]),
		},
		watch: {
			isReadyOK: {
				handler(newVal) {
					// 判断当前页面是否开始加载
					if (newVal) {
						this.getLyrics();
					}
				},
				immediate: true
			},
			scrollTop(newVal, oldVal) {
				setTimeout(() => {
					if (this.scrollTop == newVal) {
						// console.log('滑动停止了');
						this.oldScrollTop = newVal;
						//  指针位置复位到中心
						this.resetCenter();
						this.isScrollIng = false;
					}
				}, 500)
			},
			currentTime(newVal) {
				console.log(newVal, 'newVal')
				if (newVal) {
					// 判断如果歌词只有一行的情况下，应该是纯音乐，没有歌词就没必要滚动
					this.$nextTick(() => {
						if (this.lyrList.length > 1) {
							this.autoLyrScroll(newVal);
						}
					})
				}
			}
		},
		methods: {
			// 获取歌词
			async getLyrics() {
				let res = await $httpSongInfo.lyric(this.curPlaySongInfo.id);
				// let res = await $httpSongInfo.lyric(1403318151);
				console.log('res', res.lrc.lyric.split('\n'))
				if (res && res.code == 200) {
					let result = [];
					if (res.klyric?.lyric) {
						result = res.klyric.lyric;
					} else {
						result = res.lrc.lyric;
					}
					//解析数据
					this.lyrList = result.split('\n').map(item => {
						if (!item) return;
						let parse = item.split(']');
						let parTime = parse[0].substring(1).split(':');
						return {
							time: +parTime[0] * 60 + +parTime[1],
							words: parse[1],
							oldTime: parse[0].substring(1).split('.')[0]
						}
					}).filter(it => it);
					// 获取每行歌词的高度
					this.$nextTick(() => {
						if (this.lyrList.length > 1) {
							this.getLyrItemHeight();
						}
					})
				}

			},
			// 指针复位，指在当前歌词的中心位置
			resetCenter() {
				// 当滚动停止时，让指针停留在歌词中央
				let sum = this.lyrHeightList.filter((it, i) => i < this.curScrollBlock - 1).reduce((pre,
						cur) => pre + cur
					.height, 0);
				// 指针指向当前行的高度的一半
				let curRow = this.lyrHeightList[this.curScrollBlock - 1].height / 2;
				// console.log(sum + this.lyrHeightList[this.curScrollBlock - 1].height / 2, curScrollTop)
				this.scrollTopDist = sum + curRow - 20; // 减15是因为在第一行默认加了15像素，需要减掉
			},
			// 获取当前指针指向的位置
			getPointLocat(curScrollTop) {
				let scrollBlock = Math.round(curScrollTop / 40); // 结果为 当前行数 - 1
				// 上一行歌词的高度
				let prevHeight = this.lyrHeightList[scrollBlock]?.height;
				// 上上一行歌词的高度
				let prevPreHeight = this.lyrHeightList[scrollBlock - 1]?.height;
				// 当前行之前的歌词标签dom高度列表
				let arr = this.lyrHeightList.filter((it, idx) => idx <= scrollBlock);
				// 累加当前行之前的高度总和
				let count = arr.reduce((pre, cur) => pre + cur.height, 0);
				// console.log('count', count, count - prevHeight, curScrollTop + 15, scrollBlock);

				// 判断当前滚出距离是否在当前行高度区间内，如果在的话就正常加一
				if (curScrollTop + 20 > count - prevHeight && curScrollTop < count) {
					this.curScrollBlock = scrollBlock + 1;
					// 如果当前滚出去的距离小于上一行之前的高度累加和就进入
				} else if (curScrollTop + 20 < count - prevHeight) {
					// 如果当前滚出去距离在上一行的高度区间内的话就等于当前scrollBlock获取的值，否则就减一
					if (curScrollTop + 20 > count - prevPreHeight - prevHeight) {
						// console.log('0000', curScrollTop + 15, count - prevPreHeight - prevHeight, count - prevHeight)
						this.curScrollBlock = scrollBlock;
					} else {
						this.curScrollBlock = scrollBlock - 1;
					}
				} else {
					// 判断当是最后一行的时候就直接赋值（或者其他情况）
					this.curScrollBlock = scrollBlock;
				}

			},
			// 歌词滚动的时候触发
			scrollChange(e) {
				// 判断当前滚动的距离有没有大于50像素，如果大于的话才展示指针
				if (~~e.detail.scrollTop - ~~this.oldScrollTop > 50) {
					this.isScrollIng = true;
				}
				this.scrollTop = e.detail.scrollTop; // 判断滑动结束时用
				// 调用滚动时高亮选中行方法
				this.getPointLocat(e.detail.scrollTop);
			},
			goto() {
				this.scrollTop = 300
			},
			// 获取每行歌词的高度
			getLyrItemHeight() {
				wx.createSelectorQuery().in(this).selectAll('.lyr-item').boundingClientRect(rect => {
					console.log('rect', rect)
					this.lyrHeightList = rect.map((it, i) => {
						return {
							row: i + 1,
							height: ~~it.height
						}
					})
					this.$nextTick(() => {
						if (this.lyrHeightList.length > 1) {
							this.autoLyrScroll(this.currentTime);
						}
					})
				}).exec();
			},
			// 让歌词随着音乐播放滚动
			autoLyrScroll(val) {
				console.log('歌词滚动触发了没')
				this.curScrollBlock = this.lyrList.findIndex((it, i) => it.time > val);
				this.resetCenter();
			},
			touchMove() {
				console.log('手指滑动了')
			}
		}
	}
</script>

<style lang="scss">
	.lyrics {
		height: 100%;
		overflow-y: scroll;
		position: relative;

		// z-index: 10;
		.tigger-menu {
			width: 100%;
			height: 120rpx;
			background-color: pink;
		}


		.lyr-scroll {
			height: calc(100% - 120rpx);
			// height: 100%;
			// background-color: skyblue;
			// padding: 400rpx 0;
			// box-sizing: border-box;
			// padding-top: 300rpx;

			// &::before,
			// &::after {
			// 	content: '';
			// 	position: absolute;
			// 	z-index: 99;
			// 	width: 100%;
			// 	height: 200rpx;
			// 	// background: rgba(#ccc, .6);
			// 	// background: linear-gradient(to top, transparent, #7d7d7c) // opacity: 0;
			// }

			// &::after {
			// 	bottom: 0;
			// 	// background: linear-gradient(to bottom, transparent, #ccc)
			// }

			.lyr-item {
				font-size: 30rpx;
				line-height: 60rpx;
				text-align: center;
				min-height: 40px;
				color: #ddd;
				opacity: .6;
				position: relative;
				z-index: 10;
				transition: .2s;
				display: flex;
				align-items: center;
				justify-content: center;
				// white-space: nowrap;
				padding: 10rpx 40rpx;
				box-sizing: border-box;

				&:first-child {
					margin-top: calc(7 * 40px);
				}

				// 当前播放行歌词
				&.cur-row {
					font-size: 34rpx;
					line-height: 60rpx;
					color: #fff;
					opacity: 1;
				}
			}

			.after {
				height: calc(8 * 40px + 20px);
			}


		}

		.control-bar {
			width: 100%;
			height: 1rpx;
			display: flex;
			align-items: center;
			position: absolute;
			// 120rpx是顶部菜单的高度  8是距离顶部8行歌词  60rpx是一行歌词的高度 30rpx是要居中所以减半
			top: calc(120rpx + 8 * 40px - 20px);
			// top: 0;
			padding: 0 10rpx;
			box-sizing: border-box;
			transition: .3s;

			&-hide {
				opacity: 0;
			}

			.play-icon {
				width: 40rpx;
				height: 40rpx;
				color: #a3a0a0;
				opacity: .4;
			}

			.line {
				flex: 1;
				height: 2rpx;
				background: rgba(#ccc, .3);
				margin: 0 10rpx;
			}

			.cur-time {
				font-size: 22rpx;
				color: #ccc;
				opacity: .6;
			}
		}

	}
</style>

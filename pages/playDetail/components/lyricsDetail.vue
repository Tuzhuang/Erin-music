<template>
	<view class="lyrics">
		<view class="tigger-menu">

		</view>
		<view class="lyr-container">
			<view class="lyr-content" :style="{transform: 'translateY('+ -lyrScrollDist+'px)'}">
				<p :class="['lyr-item',{'cur-row':index+1==curLyrBlock,'opacity-4':[curLyrBlock+5,curLyrBlock-4].includes(index+1),'opacity-2':(index+1>=curLyrBlock+6)||(index+1<=curLyrBlock-5)}]"
					v-for="(item,index) in lyrList" :key="index">
					{{item.words}}
				</p>
			</view>
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
				lyrHeightList: [], // 每行的歌词高度列表
				curLyrBlock: -1, // 当前需要高亮的歌词行
				lyrScrollDist: 0, // 当前歌曲播放时，歌词需要滚动的距离
			}
		},
		computed: {
			...mapState("songDetail", ["curPlaySongInfo", "curPlayTime"]),
		},
		watch: {
			isReadyOK: {
				handler(newVal) {
					// 判断当前页面是否开始加载
					if (newVal) {
						this.getLyrics();
						console.log('歌词页面也可以触发了');
					}
				},
				immediate: true
			},
			curPlayTime: {
				handler(newVal) {
					if (newVal) {
						// 找出当前第几句歌词需要高亮
						this.findIndexLyr(newVal);
					}
				},
				immediate: true
			}
		},
		methods: {
			// 获取歌词
			async getLyrics() {
				let res = await $httpSongInfo.lyric(this.curPlaySongInfo.id);
				if (res && res.code == 200) {
					//解析数据
					this.lyrList = res.lrc.lyric.split('\n').map(item => {
						if (!item) return;
						let parse = item.split(']');
						let parTime = parse[0].substring(1).split(':');
						return {
							time: +parTime[0] * 60 + +parTime[1],
							words: parse[1],
						}
					}).filter(it => it);
					// 获取每行歌词的高度
					if (this.lyrList.length > 1) {
						this.getLyrItemHeight();
					}
				}
			},
			// 找出当前歌曲播放位置应该高亮哪一句歌词
			findIndexLyr(time) {
				// 获取当前播放的时间应该是第几行歌词高亮
				this.curLyrBlock = this.lyrList.findIndex(it => it.time > +time);
				if (this.curLyrBlock < 0) return;
				// 需要获取前面歌词的总高度
				if (this.lyrHeightList.length == 0) {
					this.getLyrItemHeight();
					return;
				}
				let totalHeight = this.lyrHeightList.filter((it, i) => i < this.curLyrBlock - 1)
					.reduce((pre,
							cur) => pre + cur
						.height, 0);
				// 当前高亮显示行高度的一半
				let curRowH = this.lyrHeightList[this.curLyrBlock].height / 2;
				if (time == 0) {
					this.lyrScrollDist = 0;
				}
				this.lyrScrollDist = totalHeight + curRowH; // 等于前面的高度加上当前行一半的高度
			},
			// 获取每行歌词的高度
			getLyrItemHeight() {
				wx.createSelectorQuery().in(this).selectAll('.lyr-item').boundingClientRect(rect => {
					this.lyrHeightList = rect.map((it, i) => {
						return {
							row: i + 1,
							height: ~~it.height
						}
					})
				}).exec();
			},
		}
	}
</script>

<style lang="scss">
	.lyrics {
		height: 100%;
		display: flex;
		flex-direction: column;

		// z-index: 10;
		.tigger-menu {
			width: 100%;
			height: 120rpx;
			background-color: white;
		}


		.lyr-container {
			flex: 1;
			overflow: hidden;

			.lyr-content {
				height: 100%;
				padding-top: calc(6 * 40px);
				padding-bottom: calc(5 * 40px);
				transition: all .3s;
			}

			.lyr-item {
				font-size: 30rpx;
				line-height: 50rpx;
				text-align: center;
				min-height: 40px;
				color: #ddd;
				opacity: .6;
				z-index: 10;
				transition: .3s;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10rpx 40rpx;
				box-sizing: border-box;

				// 当前播放行歌词
				&.cur-row {
					// font-size: 34rpx;
					padding: 10rpx 100rpx;
					transform: scale(1.2);
					line-height: 50rpx;
					color: #fff;
					opacity: 1;
				}

				// 当前行歌词往前往后歌词渐渐透明
				&.opacity-4 {
					opacity: .3;
				}

				&.opacity-2 {
					opacity: .1;
				}
			}
		}
	}
</style>

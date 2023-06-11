<!-- 视频页面 -->
<template>
	<view class="video-page">
		<scroll-view class="videos-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad"
			@scroll="changeVideoScroll">
			<view class="sub-menu-con" v-for="item in videoList" :key="item.id">
				<view class="video-con">
					<!-- 当前要做一个判断，默认用image图片来展示，等到需要自动播放视频时再切换成video标签 -->
					<image class="image-cover" v-if="!item.isPlayVideo" :src="item.cover"></image>
					<video v-else class="video-cover" id="videoId" muted object-fit="contain" :show-progress="false"
						:src="curVideoPlaySrc" :poster="item.cover" :show-center-play-btn="false" :show-play-btn="false"
						:show-fullscreen-btn="false" :controls="false"></video>
					<p class="time">{{formatTime(item.duration)}}</p>
				</view>
				<view class="mv-info">
					<p class="mv-name">{{item.name}}</p>
					<p class="author">{{item.artistName}}</p>
					<p class="play-count">{{Number((item.playCount/10000).toFixed(1))}}万播放</p>
				</view>
			</view>
			<view class="loader" v-if="totalCount==videoList.length">
				没有更多信息啦~
			</view>
		</scroll-view>
		<loading ref="loading" :isMask="false" mode="top" />
	</view>
</template>

<script>
	import $httpSearch from '@/api/search.js';
	import loading from '@/components/loading.vue';
	import {
		debounce
	} from '@/utils/timeDelay.js'
	export default {
		data() {
			return {
				videoList: [],
				totalCount: 1,
				videoContext: null,
				curPlayVideoNum: 0, // 当前第几个视频需要自动播放
				curVideoPlaySrc: null, // 当前视频播放url地址
				isPending: false, // 当前是否正在请求中
				curPage: 0, // 当前页码偏移量
			}
		},
		components: {
			loading,
		},
		async mounted() {
			await this.getVideoList();
			this.changePlayNum(); // 默认让第一个视频自动播放
		},
		watch: {
			// 当前需要播放视频的下标
			curPlayVideoNum: {
				handler(val) {
					this.changePlayNum();
				},
			}
		},
		methods: {
			async getVideoList(type) {
				if (this.videoList.length == 0) {
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					type: 1004
				})
				if (this.videoList.length == 0) {
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.totalCount = res.result.mvCount;
					this.videoList = res.result.mvs.map((it, i) => {
						it.isPlayVideo = false;
						if (i == 0) { // 默认让第一个视频先自动播放
							it.isPlayVideo = true;
						}
						return it;
					});
				}
			},
			// 时间转换格式
			formatTime(val) {
				let totalSec = parseInt(val / 1000);
				let minute = parseInt(totalSec / 60);
				let second = totalSec - minute * 60;
				return `${('0'+minute).slice(-2)}:${('0'+second).slice(-2)}`;
			},
			// 获取mv播放地址
			async getMvUrl(mvId) {
				let res = await $httpSearch.mvUrl({
					id: mvId
				});
				if (res && res.code == 200) {
					this.curVideoPlaySrc = res.data.url;
					this.$nextTick(() => {
						this.videoContext = wx.createVideoContext('videoId', this);
						this.videoContext.play();
					})
				}
			},
			// 当列表滚动时
			changeVideoScroll: debounce(function(e) {
				this.curPlayVideoNum = Math.round(e.detail.scrollTop / 120); // 120是单个盒子的高度，单位px
			}, 100),
			// 加载更多
			moreLoad() {
				if (this.isPending || this.totalCount == this.videoList.length) return;
				this.curPage += 30;
				this.getVideoList();
			},
			// 筛选出当前需要自动播放的视频，并请求接口自动播放
			async changePlayNum() {
				this.videoList = this.videoList.filter((it, i) => {
					it.isPlayVideo = false;
					if (i == this.curPlayVideoNum) {
						it.isPlayVideo = true;
					}
					return it;
				})

				let mvId = this.videoList[this.curPlayVideoNum].id;
				// // 调用获取mv播放地址的方法
				await this.getMvUrl(mvId);
			}
		}
	}
</script>

<style lang="scss">
	.video-page {
		width: 100%;
		height: 100%;

		.videos-scroll {
			height: 100%;
		}

		.sub-menu-con {
			display: flex;
			align-items: flex-start;
			padding: 20rpx;
			padding-bottom: 10rpx;
			box-sizing: border-box;

			&:first-of-type {
				padding-top: 0;
			}

			.video-con {
				width: 350rpx;
				height: 200rpx;
				margin-right: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;
				position: relative;

				.image-cover,
				.video-cover {
					width: 100%;
					height: 100%;
				}

				.time {
					position: absolute;
					right: 15rpx;
					bottom: 10rpx;
					font-size: 24rpx;
					color: #edf0f0;
				}
			}

			.mv-info {
				flex: 1;
				margin-top: 10rpx;

				.mv-name {
					font-size: 32rpx;
					color: #f8f8f8;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box; //使用自适应布局
					-webkit-line-clamp: 2; //设置超出行数，要设置超出几行显示省略号就把这里改成几
					-webkit-box-orient: vertical;
				}

				.author,
				.play-count {
					font-size: 24rpx;
					color: #626262;
					margin-top: 16rpx;
				}

				.play-count {
					color: #616161;
					margin-top: 4rpx;
				}
			}
		}

	}
</style>

<!-- 歌单页面 -->
<template>
	<view class="song-list">
		<scroll-view class="list-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<view class="list-item" v-for="(item,index) in songList" :key="item.id">
				<view class="left-img">
					<view class="bg-cover"></view>
					<image class="cover-img" :src="item.coverImgUrl"></image>
				</view>
				<view class="info-con">
					<p class="title">{{item.name}}</p>
					<p class="detail">{{item.trackCount}}首音乐 by
						{{item.creator.nickname}}，播放{{item.playCount|playCount}}万次
					</p>
					<p class="desc" v-if="item.description">{{item.description}}</p>
				</view>
				<view class="score" v-if="item.trackCount%2==0">
					<p class="fract">{{randomScore()}}</p>
					<span class="text">分</span>
				</view>
			</view>
			<view class="loader" v-if="totalCount==songList.length">
				没有更多信息啦~
			</view>
		</scroll-view>
		<loading ref="loading" :isMask="false" mode="top" />
	</view>
</template>

<script>
	import $httpSearch from '@/api/search.js';
	import loading from '@/components/loading.vue';
	export default {
		data() {
			return {
				songList: [],
				isPending: false, // 当前是否正在请求中
				curPage: 0, // 当前页
				totalCount: 1,
			}
		},
		components: {
			loading,
		},
		mounted() {
			this.getSongList();
		},
		filters: {
			playCount(val) {
				return (val / 10000).toFixed(1);
			}
		},
		methods: {
			// 获取歌单列表
			async getSongList() {
				if (this.songList.length == 0) {
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					type: 1000
				})
				if (this.songList.length == 0) {
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.totalCount = res.result.playlistCount;
					this.songList = this.songList.concat(res.result.playlists);
				}
			},
			// 随机生成7分以上的评分
			randomScore() {
				let num = Math.random() * 10;
				if (num > 7) {
					return num.toFixed(1);
				}
				return this.randomScore();
			},
			// 加载更多
			moreLoad() {
				if (this.isPending || this.totalCount == this.songList.length) return;
				this.curPage += 30;
				this.getSongList();
			}
		}
	}
</script>

<style lang="scss">
	.song-list {
		width: 100%;
		height: 100%;
		padding: 20rpx;
		padding-top: 0;
		box-sizing: border-box;

		.list-scroll {
			height: 100%;
		}

		.list-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;

			.left-img {
				min-width: 100rpx;
				min-height: 120rpx;
				position: relative;
				// margin-right: 20rpx;

				.bg-cover {
					width: 88rpx;
					height: 90rpx;
					border-radius: 20rpx;
					background-color: #282c2b;
					position: absolute;
					top: 0;
					left: 8rpx;
				}

				.cover-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 20rpx;
					position: absolute;
					top: 8rpx;
				}
			}

			.info-con {
				width: 100%;
				height: 100%;
				font-size: 24rpx;
				color: #656567;
				margin: 0 20rpx;
				white-space: nowrap;
				overflow: hidden;


				.title {
					width: 100%;
					font-size: 30rpx;
					color: #fcfcfc;
					// white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.desc,
				.detail {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.score {
				min-width: 90rpx;
				min-height: 90rpx;
				color: #e6e6e6;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.fract {
					font-size: 36rpx;
					font-weight: bold;
				}

				.text {
					font-size: 18rpx;
					margin-left: 4rpx;
					margin-top: 14rpx;
				}
			}
		}
	}
</style>

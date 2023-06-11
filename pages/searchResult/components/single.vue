<!-- 单曲页面 -->
<template>
	<view class="single">
		<scroll-view class="single-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<view class="sing-item" v-for="(item) in songList" :key="item.id">
				<view class="left-info">
					<p class="song-name">{{item.name}}</p>
					<view class="song-info">
						<view v-if="item.originCoverType==1" class="tag origin">原唱</view>
						<view v-if="item.privilege.maxBrLevel=='lossless'" class="tag quality">超清母带</view>
						<view v-if="item.privilege.maxBrLevel=='exhigh'" class="tag quality">沉浸声</view>
						<p class="sing-name">{{item.ar | singsName}} - {{item.al.name}}</p>
					</view>
					<view v-if="item.originCoverType==1||item.originSongSimpleData" class="origin-singer">
						<view v-if="item.version%3==0" class="tag">
							曾经爱听
						</view>
						<p class="origin-info">
							<span>{{item.originCoverType==2?'原唱：'+item.originSongSimpleData.artists[0].name:''}}</span>
							<i v-if="item.originCoverType!=1&&item.alia[0]" class="line"></i>
							<span v-if="item.alia[0]">{{item.alia[0]}}</span>
						</p>
					</view>
				</view>
				<view class="right-info" v-if="item.mv">
					<image class="video-play-icon" src="/static/images/pages/found/video_play.png"></image>
				</view>
			</view>
			<view class="loader" v-if="totalCount==songList.length">
				没有更多信息啦~
			</view>
		</scroll-view>
		<loading ref="loading" mode="top" :isMask="false" />
	</view>
</template>

<script>
	import $httpSearch from '@/api/search.js';
	import loading from '@/components/loading.vue';
	export default {
		data() {
			return {
				songList: [],
				curPage: 0, // 当前页数
				isPending: false, // 当前是否正在请求中
				totalCount: 1, // 总条数
			}
		},
		components: {
			loading,
		},
		mounted() {
			this.getSongData();
		},
		filters: {
			singsName(val) {
				return val.map(it => it.name).join(' / ');
			}
		},
		methods: {
			async getSongData() {
				// 开启等待动画
				if (this.songList.length == 0) {
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage
				});
				if (this.songList.length == 0) {
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.totalCount = res.result.songCount;
					this.songList = this.songList.concat(res.result.songs);
				}
			},
			// 加载更多
			moreLoad() {
				if (this.isPending || this.totalCount == this.songList.length) return;
				this.curPage += 30;
				this.getSongData();
			}
		}
	}
</script>

<style lang="scss">
	.single {
		width: 100%;
		height: 100%;
		padding: 20rpx;
		padding-top: 0;
		box-sizing: border-box;

		.single-scroll {
			height: 100%;
		}

		.sing-item {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #303030;
			padding: 10rpx 0;
			box-sizing: border-box;

			&:first-of-type {
				padding-top: 0;
			}

			.left-info {
				max-width: 80%;

				.song-name {
					font-size: 30rpx;
					color: #fefefe;
				}

				.song-info {
					display: flex;
					align-items: center;
					margin: 4rpx 0;
					height: 28rpx;

					.tag {
						font-size: 18rpx;
						padding: 0rpx 4rpx;
						border-radius: 6rpx;
						margin-right: 10rpx;
						white-space: nowrap;

						&.origin {
							background: #f9463e;
							color: #ffeeef;
						}

						&.quality {
							border: 1rpx solid #c3a366;
							color: #c3a366;
						}
					}

					.sing-name {
						font-size: 26rpx;
						color: #696a65;
						white-space: nowrap;
					}
				}

				.origin-singer {
					display: flex;
					align-items: center;
					margin-top: 8rpx;

					.tag {
						font-size: 20rpx;
						color: #de845b;
						font-weight: bold;
						background: rgba(#de845b, .2);
						padding: 2rpx 4rpx;
						border-radius: 8rpx;
						margin-right: 10rpx;
						white-space: nowrap;
					}

					.origin-info {
						width: 100%;
						font-size: 24rpx;
						color: #60605e;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						display: flex;
						align-items: center;

						.line {
							display: block;
							width: 1px;
							height: 16rpx;
							background: #656565;
							margin: 4rpx 10rpx 0;
						}

						span {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}

			.right-info {
				display: flex;
				align-items: center;
				position: relative;
				left: 20rpx;

				.video-play-icon {
					width: 120rpx;
					height: 120rpx;
				}
			}
		}
	}
</style>

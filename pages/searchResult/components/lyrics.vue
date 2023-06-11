<!-- 歌词页面 -->
<template>
	<view class="lyrics">
		<scroll-view class="lyrics-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<view class="lyrics-item" v-for="item in lyricsList" :key="item.id">
				<view class="top-con">
					<view class="play-icon">

					</view>
					<view class="detail-con">
						<p class="name">{{item.name}}</p>
						<view class="desc-con">
							<p class="tag origin" v-if="item.originCoverType==1">原唱</p>
							<p class="tag quality" v-if="item.privilege.maxBrLevel=='exhigh'">沉浸声</p>
							<p class="tag quality" v-if="item.privilege.maxBrLevel=='lossless'">超清母带</p>
							<p class='desc'>{{item.ar.map(it=>it.name).join('/')}}-{{item.al.name}}</p>
						</view>
						<p class="origin-info">原唱:买辣椒也用券</p>
					</view>
					<view class="video-play">
						<image class="video-icon" src="/static/images/pages/found/video_play.png" mode=""></image>
					</view>
				</view>
				<view class="lyrics-info">
					<p class="word-icon">词</p>
					<view class="lyrics-con">
						<view class="lyr-con" :style="{'max-height':(item.isMoreShow?item.lyrics.length:3)*22+'px'}">
							<p class="lyr-item" v-for="(it,i) in item.lyrics" :key="i" v-html="it"></p>
						</view>
						<view class="expand" @click="expandLyr(item)">
							<p>{{!item.isMoreShow?'展开歌词':'收起歌词'}}</p>
							<image :class="['arrow-icon',{put:item.isMoreShow}]"
								src="/static/images/pages/play/arrow_more.svg" mode="">
							</image>
						</view>
					</view>
				</view>
			</view>
			<view class="loader" v-if="totalCount==lyricsList.length">没有更多信息啦~</view>
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
				lyricsList: [],
				curPage: 0,
				isPending: false,
				totalCount: 1
			}
		},
		components: {
			loading,
		},
		mounted() {
			this.getLyricsList();
		},
		methods: {
			async getLyricsList() {
				if (this.lyricsList.length == 0) {
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					type: 1006
				});
				if (this.lyricsList.length == 0) {
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.totalCount = res.result.songCount;
					this.lyricsList = this.lyricsList.concat(res.result.songs.map(it => {
						// 设置高亮颜色
						it.lyrics = it.lyrics.map(val => {
							if (val.indexOf('<b>') != -1) {
								return val.replace('<b>', '<b style="color:#5a78a0">');
							}
							return val;
						})
						it.isMoreShow = false;
						return it;
					}));
				}
			},
			expandLyr(item) {
				item.isMoreShow = !item.isMoreShow;
			},
			// 加载更多
			moreLoad() {
				if (this.isPending || this.totalCount == this.lyricsList.length) return;
				this.curPage += 30;
				this.getLyricsList();
			}
		}
	}
</script>

<style lang="scss">
	.lyrics {
		width: 100%;
		height: 100%;

		.lyrics-scroll {
			height: 100%;
		}

		.lyrics-item {
			padding: 20rpx;
			padding-bottom: 0;
			box-sizing: border-box;

			&:first-of-type {
				padding-top: 0;
			}

			.top-con {
				display: flex;
				align-items: center;

				.play-icon {
					width: 32rpx;
					height: 32rpx;
					background: pink;
					margin-right: 20rpx;
				}

				.detail-con {
					flex: 1;
					overflow: hidden;

					.name {
						font-size: 30rpx;
						color: #f9f9f9;
					}

					.desc-con {
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						.tag {
							font-size: 20rpx;
							padding: 0 2rpx;
							white-space: nowrap;
							margin-right: 10rpx;

							&.origin {
								border-radius: 4rpx;
								background: #2d1618;
								color: #c45351;
							}

							&.quality {
								border: 1rpx solid #5a553d;
								border-radius: 6rpx;
								color: #cfaf6d;
								font-size: 16rpx;
							}
						}

						.desc {
							font-size: 24rpx;
							color: #a0a0a0;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}

					.origin-info {
						font-size: 24rpx;
						color: #a6a6a6;
						margin-top: 4rpx;
					}
				}

				.video-play {
					width: 100rpx;
					height: 100rpx;

					.video-icon {
						width: 100%;
						height: 100%;
						position: relative;
						right: -20rpx;
					}
				}
			}

			.lyrics-info {
				width: 100%;
				display: flex;
				align-items: flex-start;
				margin-top: 20rpx;

				.word-icon {
					width: 34rpx;
					height: 34rpx;
					font-size: 24rpx;
					font-weight: bold;
					color: #131313;
					background: #767676;
					border-radius: 6rpx;
					text-align: center;
					line-height: 34rpx;
					margin-right: 20rpx;
					margin-top: 8rpx;
				}

				.lyrics-con {
					flex: 1;
					border-bottom: 1rpx solid #303030;
					padding-bottom: 30rpx;

					.lyr-con {
						max-height: calc(44rpx * 3);
						overflow: hidden;
						transition: .3s;
					}

					.lyr-item {
						height: 44rpx;
						font-size: 28rpx;
						color: #cecece;
						line-height: 44rpx;
					}

					.expand {
						display: flex;
						align-items: center;
						font-size: 22rpx;
						color: #636363;
						margin-top: 16rpx;

						.arrow-icon {
							width: 32rpx;
							height: 32rpx;
							margin-left: 6rpx;
							transform: rotate(90deg);

							&.put {
								transform: rotate(-90deg);
							}
						}
					}
				}
			}
		}

	}
</style>

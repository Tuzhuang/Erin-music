<!-- 播客页面 -->
<template>
	<view class="podcast">
		<scroll-view class="podcast-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<view class="podcast-item" v-for="item in podcastList" :key="item.id">
				<view class="left-avatar">
					<view class="bg-img"></view>
					<image class="avatar" :src="item.picUrl"></image>
				</view>
				<view class="info-con">
					<p class="title">{{item.name}}</p>
					<view class="desc-con">
						<p v-if="item.category" class="tag">{{item.category}}</p>
						<p class="desc">{{item.programCount}}个声音，播放{{(item.playCount/10000).toFixed(1)}}万次，by
							{{item.dj.nickname}}
						</p>
					</view>
					<p class="desc">{{item.desc}}</p>
				</view>
				<view class="score" v-if="item.subCount%2==0">
					<p>{{randomScore()}}</p>
					<span class="text">分</span>
				</view>
			</view>
			<view v-if="totalCount==podcastList.length" class="loader">没有更多信息啦~</view>
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
				podcastList: [],
				curPage: 0,
				isPending: false, // 是否正在请求中
				totalCount: 1,
			}
		},
		components: {
			loading,
		},
		mounted() {
			this.getpodcastList();
		},
		methods: {
			async getpodcastList() {
				if (this.podcastList.length == 0) {
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					type: 1009
				})
				if (this.podcastList.length == 0) {
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.podcastList = res.result.djRadios;
					this.totalCount = res.result.djRadiosCount;
				}
			},
			// 随机生成7分以上的评分
			randomScore() {
				let num = Math.random() * 10;
				if (num > 8) {
					return num.toFixed(1);
				}
				return this.randomScore();
			},
			// 加载更多
			moreLoad() {
				if (this.isPending || this.totalCount == this.podcastList.length) return;
				this.curPage += 30;
				this.getpodcastList();
			}
		}
	}
</script>

<style lang="scss">
	.podcast {
		width: 100%;
		height: 100%;
		padding: 20rpx;
		padding-top: 0;
		box-sizing: border-box;

		.podcast-scroll {
			height: 100%;
		}

		.podcast-item {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;

			.left-avatar {
				min-width: 120rpx;
				min-height: 140rpx;
				position: relative;

				.bg-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx;
					background: #2c2c2c;
					position: absolute;
					top: 0rpx;
					left: 10rpx;
				}

				.avatar {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					position: absolute;
					top: 8rpx;
				}
			}

			.info-con {
				width: 100%;
				margin: 0 20rpx;
				overflow: hidden;

				.title {
					font-size: 32rpx;
					color: #e8e8e8;
				}

				.desc-con {
					display: flex;
					align-items: center;
					margin-top: 10rpx;

					.tag {
						font-size: 20rpx;
						color: #8691af;
						padding: 0 4rpx;
						border: 1rpx solid #363441;
						border-radius: 6rpx;
						margin-right: 10rpx;
						white-space: nowrap;
					}

					.desc {
						font-size: 24rpx;
						color: #5d5d5d;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.desc {
					font-size: 24rpx;
					color: #5d5d5d;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.score {
				width: 80rpx;
				height: 80rpx;
				font-size: 38rpx;
				color: #e7e7e7;
				font-weight: bold;
				display: flex;
				align-items: center;

				.text {
					font-weight: normal;
					font-size: 20rpx;
					margin-top: 14rpx;
					margin-left: 4rpx;
				}
			}
		}
	}
</style>

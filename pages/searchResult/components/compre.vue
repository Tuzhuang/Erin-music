<!-- 综合页面 -->
<template>
	<view class="compre">
		<scroll-view class="compre-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<!-- 单曲 -->
			<view class="single-con" v-if="singleList.length">
				<view class="top-tit">
					<p class="title">单曲</p>
					<view class="play-con">
						<image class="play-icon" src="/static/images/pages/found/play.png"></image>
						<p class="text">播放</p>
					</view>
				</view>
				<view class="content-item" v-for="(item) in singleList" :key="item.id">
					<view class="left-info">
						<p class="song-name">{{item.name}}</p>
						<view class="song-info">
							<view v-if="item.originCoverType==1" class="tag origin">原唱</view>
							<view v-if="item.privilege.maxBrLevel=='lossless'" class="tag quality">超清母带</view>
							<view v-if="item.privilege.maxBrLevel=='exhigh'" class="tag quality">沉浸声</view>
							<p class="sing-name">{{formatSingsName(item.ar)}} - {{item.al.name}}</p>
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
				<view class="more-info" v-if="singleTotal" @click="toSinglePage">
					<p class="more-text">查看全部{{singleTotal}}首单曲</p>
					<view class="img-box">
						<image class="more-icon" src="/static/images/pages/play/arrow_more.svg" mode=""></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<loading :isMask="false" mode="top" />
	</view>
</template>

<script>
	import loading from '@/components/loading.vue';
	import $httpSearch from '@/api/search.js';
	export default {
		data() {
			return {
				singleList: [], // 单曲信息
				singleTotal: 0,
			}
		},
		components: {
			loading,
		},
		mounted() {
			this.getSingleInfo();
		},
		methods: {
			// 获取单曲信息
			async getSingleInfo() {
				let res = await $httpSearch.search({
					keywords: '起风了',
					limit: 8
				});
				console.log('res', res)
				if (res && res.code == 200) {
					this.singleTotal = res.result.songCount;
					this.singleList = res.result.songs;
				}
			},
			formatSingsName(val) {
				if (val.length) {
					return val.map(it => it.name).join('&');
				}
				return;
			},
			// 去单曲页面
			toSinglePage() {
				// this.$emit('curPageIndex', 1)
			}
		}
	}
</script>

<style lang="scss">
	.compre {
		width: 100%;
		height: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		background: #151515;

		.compre-scroll {
			height: 100%;
		}

		.single-con {
			width: 100%;
			background: #212121;
			border-radius: 20rpx;
			padding: 20rpx;
			padding-bottom: 10rpx;
			box-sizing: border-box;

			.top-tit {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #303030;
				padding-bottom: 20rpx;

				.title {
					font-size: 30rpx;
					color: #fdfdfd;
					font-weight: bold;
				}

				.play-con {
					border: 1rpx solid #484848;
					border-radius: 50rpx;
					display: flex;
					align-items: center;
					padding: 8rpx 16rpx;

					.play-icon {
						width: 16rpx;
						height: 16rpx;
						margin-right: 10rpx;
					}

					.text {
						font-size: 22rpx;
						color: #fcfcfc;
					}
				}
			}


			.content-item {
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

			.more-info {

				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 10rpx;

				.more-text {
					font-size: 24rpx;
					color: #656565;
					margin-right: 0rpx;
				}

				.img-box {
					width: 30rpx;
					height: 30rpx;
					display: flex;
					overflow: hidden;

					.more-icon {
						width: 30rpx;
						height: 30rpx;
						filter: drop-shadow(30rpx 0 #656565);
						transform: translateX(-100%);
					}
				}
			}
		}
	}
</style>

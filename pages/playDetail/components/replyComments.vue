<template>
	<view class="reply-comments">
		<p class="title">回复（{{totalCount}}）</p>
		<view class="user-info">
			<image class="avatar" :src="mainCommObj.user.avatarUrl" mode="aspectFill" />
			<view class="info">
				<p class="song-name">{{mainCommObj.user.nickname}}</p>
				<p class="time">{{mainCommObj.timeStr}} {{mainCommObj.ipLocation.location}}</p>
			</view>
		</view>
		<p class="comm-cont">{{mainCommObj.content}}</p>
		<view class="block"></view>
		<view class="reply-content">
			<p class="reply-tit">全部回复 {{totalCount}}</p>
			<scroll-view class="reply-scroll" id="reply-scroll" :style="'height:calc(100vh - '+scrollViewTop+'px)'"
				scroll-y="true" :show-scrollbar="true" lower-threshold="200" @scrolltolower="loadMore">
				<view class="reply-item" v-for="(item,index) in replyComments" :key="index">
					<view class="user-con">
						<view class="user-info">
							<image class="avatar" :src="item.user.avatarUrl" mode="aspectFill" />
							<view class="info">
								<p class="song-name">{{item.user.nickname}}</p>
								<p class="time">{{item.timeStr}} {{item.ipLocation.location}}</p>
							</view>
						</view>
						<view class="give-con">
							<p class="give-count">{{item.likedCount}}</p>
							<image class="give" src="/static/images/pages/play/give.png" mode=""></image>
						</view>
					</view>
					<p class="comments">{{item.content}}</p>
					<view class="sub-main-comm" v-if="mainCommObj.commentId!=item.beReplied[0].beRepliedCommentId">
						<p class="sub-main-content">
							<span class="sub-main-name">@{{item.beReplied[0].user.nickname}}</span>
							：{{item.beReplied[0].content}}
						</p>
					</view>
					<view class="line"></view>
				</view>
				<!-- 暂无数据 -->
				<p v-if="!hasMore" class="not-data">评论已经全部加载完毕啦~</p>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import $httpSongInfo from '@/api/songInfo.js';
	import {
		mapState
	} from 'vuex';
	export default {
		name: "replyComments",
		props: ['isRenderOk', "params"],
		data() {
			return {
				mainCommObj: {}, // 主题评论信息
				replyComments: [],
				totalCount: 0,
				pageNo: 1, // 当前页码
				isLoadMore: false, // 是否正在请求分页数据
				hasMore: true, // 是否还有分页数据
				scrollViewTop: 0, // scroll-view组件距离顶部的top值
			}
		},
		computed: {
			...mapState('songDetail', ['curPlaySongInfo'])
		},
		watch: {
			// 当前组件已渲染完成
			async isRenderOk(val) {
				if (val) {
					this.pageNo = 1;
					await this.getFloorComments();

				}
			}
		},
		methods: {
			async getFloorComments() {
				let res = await $httpSongInfo.floorComments({
					parentId: this.params.commentId,
					songId: this.curPlaySongInfo.id,
					type: '0',
					// 如果不是第一页的时候就要添加分页需要的字段
					time: this.pageNo == 1 ? '' : this.replyComments[this.replyComments.length - 1].time,
				})
				if (res && res.code == 200) {
					// 判断一下是第一页的时候就重新渲染数据
					if (this.pageNo == 1) {
						this.totalCount = res.data.totalCount;
						this.mainCommObj = res.data.ownerComment;
						this.replyComments = res.data.comments;
					} else {
						this.replyComments = this.replyComments.concat(res.data.comments);
					}
					this.hasMore = res.data.hasMore;
					// 获取当前scrollView标签相对于视图顶部的距离  注：小程序中在组件中获取不到一定要记得加 .in(this)
					this.$nextTick(() => {
						wx.createSelectorQuery().in(this).select('#reply-scroll').boundingClientRect(rect => {
							this.scrollViewTop = ~~rect.top;
						}).exec();
					})
				}
			},
			// 加载更多
			loadMore() {
				// 判断当前没有下一页数据的话就return
				if (!this.hasMore) return;
				if (this.isLoadMore) return;
				this.isLoadMore = true;
				this.pageNo++;
				this.getFloorComments();
				this.isLoadMore = false;
			}
		}
	}
</script>

<style lang="scss">
	//  
	.reply-comments {
		.title {
			text-align: center;
			height: 40rpx;
			font-size: 32rpx;
			color: #fff;
		}

		.user-info {
			height: 100rpx;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 100%;
			}

			.info {
				margin-left: 20rpx;

				.song-name {
					font-size: 22rpx;
					color: #d4d4d4;
				}

				.time {
					font-size: 20rpx;
					color: #989898;
					margin-top: 6rpx;
				}
			}
		}

		.comm-cont {
			font-size: 28rpx;
			line-height: 42rpx;
			color: #fff;
			margin-top: 10rpx;
		}

		.block {
			width: 120%;
			height: 14rpx;
			background-color: #232323;
			position: relative;
			left: -20rpx;
			margin-top: 20rpx;
		}

		.reply-content {
			// height: 100%;

			.reply-tit {
				font-size: 28rpx;
				color: #fff;
				height: 60rpx;
				line-height: 60rpx;
			}


			// .reply-scroll {
			// 	// max-height: calc(100vh - 600rpx);
			// 	// height: 100%;
			// 	// background-color: pink;
			// 	// padding-bottom: 200rpx;
			// 	// box-sizing: border-box;
			// }

			.reply-item {
				.user-con {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.user-info {
						height: 80rpx;
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						.avatar {
							width: 70rpx;
							height: 70rpx;
							border-radius: 100%;
						}

						.info {
							margin-left: 20rpx;

							.song-name {
								font-size: 22rpx;
								color: #d4d4d4;
							}

							.time {
								font-size: 20rpx;
								color: #989898;
								margin-top: 6rpx;
							}
						}
					}

					.give-con {
						display: flex;
						align-items: center;

						.give-count {
							font-size: 24rpx;
							color: #9e9e9e;
							margin-top: 4rpx;
						}

						.give {
							width: 40rpx;
							height: 40rpx;
							margin-left: 10rpx;
						}
					}
				}

				.comments {
					font-size: 26rpx;
					line-height: 42rpx;
					color: #fff;
					margin-top: 10rpx;
					margin-left: 90rpx;
				}

				.sub-main-comm {
					width: calc(100% - 90rpx);
					margin-left: 90rpx;
					border-left: 4rpx solid #3c3c3c;
					margin-top: 15rpx;
					padding: 8rpx 0 8rpx 10rpx;
					box-sizing: border-box;

					.sub-main-content {
						font-size: 24rpx;
						color: #b3b3b3;

						.sub-main-name {
							color: #90b8e2;
						}
					}
				}

				.line {
					width: 100%;
					height: 1rpx;
					background: #303030;
					margin-left: 90rpx;
					margin-top: 20rpx;
				}
			}
		}

		.not-data {
			height: 100rpx;
			font-size: 24rpx;
			color: #b3b3b3;
			text-align: center;
			margin-top: 80rpx;
		}
	}
</style>

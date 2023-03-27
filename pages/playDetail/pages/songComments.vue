<template>
	<view class="song-comments" slot="comments">
		<view class="top-con">
			<view class="top-bar">
				<image class="back" @click="back" src="/static/images/pages/found/arrow_fff.png" mode=""></image>
				<p class="comm-count">评论（{{commentsTotal}}）</p>
				<image @click="top" class="share-icon" src="/static/images/pages/play/share.png" mode=""></image>
			</view>
			<view class="song-info">
				<view class="left-avatar">
					<image class="disc-icon" src="/static/images/pages/play/bt_disc.png" mode=""></image>
					<image class="song-img" :src="curPlaySongInfo.picUrl" mode="aspectFill">
					</image>
				</view>
				<p class="song-name">{{curPlaySongInfo.songName}}</p>
				<p class="sing-name">- {{curPlaySongInfo.singName}}</p>
			</view>
		</view>
		<view class="comments-info">
			<view class="comm-menu">
				<p class="title">评论区</p>
				<view class="screen">
					<p v-for="(val,i) in commentsTypes" :key="i" :class="['it',{active:curCommType==val.value}]"
						@click="onCommType(val.value)">{{val.label}}</p>
				</view>
			</view>
			<scroll-view class="comments-list" scroll-y="true" lower-threshold="200" @scrolltolower="loadMore">
				<view class="comm-item" v-for="(item,index) in commentsData" :key="index">
					<view class="comm-user-info">
						<image class="avatar" :src="item.user.avatarUrl" mode="aspectFill"></image>
						<view class="right">
							<view class="detail">
								<p class="name">{{item.user.nickname}}</p>
								<p class="time">{{item.timeStr}} {{item.ipLocation.location}}</p>
							</view>
							<view class="give">
								<p class="count">{{item.likedCount==0?'':item.likedCount}}</p>
								<image class="icon" src="/static/images/pages/play/give.png" mode=""></image>
								<!-- <image class="icon" src="/static/images/pages/play/give_active.png" mode=""></image> -->
							</view>
						</view>
					</view>
					<view class="comm-content">
						{{item.content}}
					</view>
					<view class="reply-comm" v-if="item.replyCount!=0" @click="openReply(item)">
						<p class="reply-count">{{item.replyCount}}条回复</p>
						<image class="reply-icon" src="/static/images/pages/play/blue-arrow.svg" mode=""></image>
					</view>
					<p class="split-line"></p>
				</view>
				<!-- 评论加载完毕，没有 -->
			</scroll-view>

		</view>
		<!-- 回复评论 -->
		<popup :isPopup.sync="isReplyCommShow" bgColor="#272727" height="90">
			<replyComments slot="content" :isRenderOk="isReplyCommShow" :params="curFloorComments" />
		</popup>
		<loading ref="loading" :isMask="false"></loading>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters
	} from 'vuex';
	import $httpSongInfo from '@/api/songInfo.js';
	import loading from '@/components/loading.vue';
	import popup from '@/components/popup.vue';
	import replyComments from '../components/replyComments.vue';;
	export default {
		name: "songComments",
		components: {
			loading,
			popup,
			replyComments
		},
		props: ['isRenderOk'],
		data() {
			return {
				commentsTypes: [{
					label: "推荐",
					value: 'recom'
				}, {
					label: "最热",
					value: 'hot'
				}, {
					label: "最新",
					value: 'new'
				}],
				curCommType: 'recom', // new hot
				commentsData: [],
				isLoadMore: false, // 是否加载更多,防止触发多次
				curPage: 1, // 当前页码
				scrollTop: 0,
				isReplyCommShow: false, // 是否打开回复评论
				curFloorComments: null, // 当前需要回复的评论信息
			}
		},
		computed: {
			...mapState("songDetail", ["curPlaySongInfo", "songCommentObj"]),
			...mapGetters("songDetail", ["hotCommentsList", "newCommentsList", "commentsTotal"]),
		},
		watch: {
			// 当评论对象改变的时候，重新渲染数据
			songCommentObj: {
				handler() {
					this.commentsData = this.songCommentObj.comments;
				},
				immediate: true,
				deep: true
			},
			// 切换评论类型的时候
			curCommType: {
				handler(val) {
					this.onCommType(val);
				},
				deep: true
			},
			// 判断页面是否渲染完成
			isRenderOk(val) {
				if (val) { // 渲染完成之后调用获取默认评论的方法
					this.onCommType('recom');
				}
			}
		},
		methods: {
			...mapActions('songDetail', ["getSongComments"]),
			back() {
				this.$emit('toBack');
			},
			// 上拉加载更多评论
			async loadMore() {
				if (this.isLoadMore) return;
				this.isLoadMore = true;
				this.curPage++;
				// 获取更多评论信息
				await this.getSongComments({
					pageNo: this.curPage,
					cursor: this.curCommType == 'new' && this.curPage != 1 ? this.commentsData[this
						.commentsData.length - 1].time : '', // 详细判断条件可看接口封装处
				})
				this.isLoadMore = false;
			},
			// 切换评论类型
			async onCommType(val) {
				this.curCommType = val;
				this.curPage = 1;
				this.commentsData = [];
				if (!this.commentsData.length) {
					this.$refs.loading.show();
					await this.getSongComments({
						sortType: val == 'recom' ? '1' : val == 'hot' ? '2' : '3'
					})
					this.$refs.loading.hide();
					this.commentsData = this.songCommentObj.comments;
				}
			},
			// 打开回复评论
			openReply(obj) {
				this.curFloorComments = obj;
				this.isReplyCommShow = true;
			},
			top(val) {
				// uni.navigateTo({
				// 	url: "/pages/searchDetail/searchDetail"
				// })
				
			}
		}
	}
</script>

<style lang="scss">
	.song-comments {
		width: 100%;
		height: 100%;

		.top-con {
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: #151515;

			.top-bar {
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.back {
					transform: rotate(180deg);
					width: 50rpx;
					height: 50rpx;
				}

				.comm-count {
					font-size: 32rpx;
					color: #fff;
				}

				.share-icon {
					width: 46rpx;
					height: 46rpx;
				}
			}

			.song-info {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				.left-avatar {
					width: 80rpx;
					height: 80rpx;
					position: relative;

					.disc-icon,
					.song-img {
						width: 80rpx;
						height: 80rpx;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}

					.song-img {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}

				.song-name {
					font-size: 24rpx;
					color: #f0f0f0;
					margin-left: 10rpx;
				}

				.sing-name {
					font-size: 18rpx;
					color: #bfbfbf;
					margin-left: 6rpx;
				}
			}
		}

		.comments-info {
			margin-top: 20rpx;
			background-color: #151515;

			.comm-menu {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 60rpx;
				font-size: 26rpx;
				padding: 0 20rpx;
				box-sizing: border-box;

				.title {
					color: #fff;
				}

				.screen {
					display: flex;
					align-items: center;
					margin-right: -20rpx;

					.it {
						padding: 0 20rpx;
						border-right: 1px solid #282828;
						color: #666;
						transition: .4s;

						&:last-child {
							border-right: 0;
						}

						&.active {
							color: #fff;
						}
					}

					.line {
						width: 2rpx;
						height: 30rpx;
						background-color: #282828;
						margin: 0 20rpx;
					}
				}
			}
		}

		.comments-list {
			height: calc(100vh - 250rpx);
		}

		.comm-item {
			padding: 0 20rpx;
			box-sizing: border-box;
			margin-top: 20rpx;

			.comm-user-info {
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}

				.right {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-left: 20rpx;

					.detail {
						.name {
							font-size: 24rpx;
							color: #d0d0d0;
						}

						.time {
							font-size: 16rpx;
							color: #585858;
							margin-top: 6rpx;
						}
					}

					.give {
						display: flex;
						align-items: center;

						.count {
							font-size: 24rpx;
							color: #666;
						}

						.icon {
							width: 40rpx;
							height: 40rpx;
							margin-left: 10rpx;
						}
					}
				}
			}

			.comm-content {
				font-size: 28rpx;
				line-height: 42rpx;
				letter-spacing: 0rpx;
				color: #f9f9f9;
				margin-left: 80rpx;
				margin-top: 10rpx;
			}

			.reply-comm {
				width: 100%;
				height: 20rpx;
				display: flex;
				align-items: center;
				margin-left: 80rpx;
				margin-top: 10rpx;

				.reply-count {
					font-size: 20rpx;
					color: #5778a5;
				}

				.reply-icon {
					width: 24rpx;
					height: 24rpx;
				}
			}

			.split-line {
				width: 100%;
				height: 1rpx;
				background-color: #262626;
				margin-left: 80rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>

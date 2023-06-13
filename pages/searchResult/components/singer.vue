<!-- 歌手页面 -->
<template>
	<view class="singer">
		<scroll-view class="singer-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<view class="singer-item" v-for="item in singerList" :key="item.id">
				<view class="left-con">
					<view class="avatar-con">
						<image class="cover-img" :src="item.img1v1Url"></image>
						<image v-if="item.accountId" class="logo-icon"
							src="/static/images/pages/searchResult/logo-singer.png"></image>
					</view>
					<p class="singer-name">{{item.name}}<span v-if="item.alias.length"
							class="real-name">（{{item.alias.join('&')}}）</span></p>
				</view>
				<view class="follow">
					<p class="focus">+ 关注</p>
				</view>
			</view>
			<view class="loader" v-if="totalCount==singerList.length">
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
		props: {
			limit: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				singerList: [],
				curPage: 0,
				isPending: false,
				totalCount: 1, // 总条数
			}
		},
		components: {
			loading
		},
		mounted() {
			this.getSingerList();
		},
		methods: {
			// 获取歌手列表
			async getSingerList() {
				if (this.singerList.length == 0 && !this.limit) {
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					limit: this.limit,
					type: 100
				})
				if (this.singerList.length == 0 && !this.limit) {
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.singerList = this.singerList.concat(res.result.artists);
					this.totalCount = res.result.artistCount;
					this.$emit('onTotalCount', this.totalCount);
				}
			},
			// 加载更多
			moreLoad() {
				if (this.isPending || this.singerList.length == this.totalCount) return;
				this.curPage += 30;
				this.getSingerList();
			}
		}
	}
</script>

<style lang="scss">
	.singer {
		width: 100%;
		height: 100%;

		.singer-scroll {
			height: 100%;
		}

		.singer-item {
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			&:first-of-type {
				padding-top: 0;
			}

			.left-con {
				display: flex;
				align-items: center;

				.avatar-con {
					width: 100rpx;
					height: 100rpx;
					position: relative;
					margin-right: 20rpx;

					.cover-img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}

					.logo-icon {
						width: 34rpx;
						height: 34rpx;
						position: absolute;
						right: 4rpx;
						bottom: 0;
					}
				}

				.singer-name {
					font-size: 28rpx;
					color: #d2d2d2;

					.real-name {
						color: #747474;
					}
				}
			}

			.follow {
				padding: 6rpx 14rpx;
				border-radius: 50rpx;
				border: 1rpx solid #7f2f2c;
				vertical-align: middle;
				.focus {
					font-size: 22rpx;
					color: #eb4d45;
				}
			}
		}


	}
</style>

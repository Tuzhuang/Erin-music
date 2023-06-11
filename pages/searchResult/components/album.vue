<!-- 专辑页面 -->
<template>
	<view class="album">
		<scroll-view class="album-scroll" scroll-y lower-threshold="200" @scrolltolower="moreLoad">
			<view class="album-item" v-for="item in albumList" :key="item.id">
				<view class="left-cover">
					<view class="bg-img">
					</view>
					<image class="cover" :src="item.picUrl"></image>
				</view>
				<view class="album-info">
					<p class="album-name">{{item.name}} <span v-if="item.alias.length"
							class="from">({{item.alias[0]}})</span></p>
					<p class="album-time">{{item.artist.name}} {{formatTime(item.publishTime)}}</p>
				</view>
			</view>
			<view class="loader" v-if="totalCount==albumList.length">
				没有更多信息啦~
			</view>
		</scroll-view>
		<loading ref="loading" :isMask="false" mode=top />
	</view>
</template>

<script>
	import $httpSearch from '@/api/search.js';
	import loading from '@/components/loading.vue';
	export default {
		data() {
			return {
				albumList: [],
				curPage: 0,
				isPending: false,
				totalCount: 1
			}
		},
		components:{
			loading,
		},
		mounted() {
			this.getAlbumList();
		},
		methods: {
			async getAlbumList() {
				if(this.albumList.length == 0){
					this.$refs.loading.show();
				}
				this.isPending = true;
				let res = await $httpSearch.search({
					keywords: '起风了',
					offset: this.curPage,
					type: 10
				})
				if(this.albumList.length == 0){
					this.$refs.loading.hide();
				}
				this.isPending = false;
				if (res && res.code == 200) {
					this.albumList = res.result.albums;
					this.totalCount = res.result.albumCount;
				}
			},
			// 处理年月日
			formatTime(time) {
				let date = new Date(time);
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				return `${year}-${month}-${day}`
			},
			moreLoad() {
				if (this.isPending || this.totalCount == this.albumList.length) return;
				this.curPage += 30;
				this.getAlbumList();
			}
		}
	}
</script>

<style lang="scss">
	.album {
		width: 100%;
		height: 100%;

		.album-scroll {
			height: 100%;
		}

		.album-item {
			padding: 20rpx;
			padding-bottom: 10rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			&:first-of-type {
				padding-top: 0;
			}

			.left-cover {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				position: relative;

				.bg-img {
					width: 100rpx;
					height: 100rpx;
					background: #232827;
					border-radius: 50%;
					position: absolute;
					top: -12rpx;
					left: 8rpx;
				}

				.cover {
					width: 110rpx;
					height: 110rpx;
					border-radius: 10rpx;
					position: absolute;
				}
			}

			.album-info {
				flex: 1;
				overflow: hidden;

				.album-name {
					font-size: 32rpx;
					color: #fefefe;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

					.from {
						color: #acacac;
					}
				}

				.album-time {
					font-size: 24rpx;
					color: #adadad;
					margin-top: 10rpx;
				}
			}
		}
	}
</style>

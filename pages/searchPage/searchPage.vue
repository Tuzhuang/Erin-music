<template>
	<view class="search-detail">
		<view class="search-con">
			<image class="emoj-icon" src="/static/images/pages/play/emoj-pig.png" />
			<view class="search-bar">
				<image class="search-icon" src="/static/images/pages/found/search.svg" />
				<input class="search" @input="searchInput" v-model="searchValue" @confirm="search"
					:placeholder="searchSugges" type="text" @keyup.enter="search" confirm-type="search">
				<view class="search-del" v-if="searchValue" @click="searchValue=''">
					<image class="search-del-icon" src="/static/images/pages/searchDetail/search-del.svg"></image>
				</view>
			</view>
			<p class="search-btn" @click="search">搜索</p>
		</view>
		<view v-if="searchValue" class="search-suggest">
			<view class="suggest-item" @click="clickSongName(item)" v-for="(item,index) in searchSuggestList"
				:key="index">
				<image class="search-icon" src="/static/images/pages/found/search.svg"></image>
				<p class="suggest-text">
					<span class="select">{{item.first}}</span>
					{{item.last}}
				</p>
			</view>
		</view>
		<!-- 当出现搜索建议的时候该盒子需要隐藏 -->
		<view v-else class="search-rele">
			<view class="category">
				<view class="type">
					<p class="label">歌手</p>
				</view>
				<view class="type">
					<p class="label">曲风</p>
				</view>
				<view class="type">
					<p class="label">专区</p>
				</view>
				<view class="type">
					<p class="label">识曲</p>
				</view>
			</view>
			<view class="search-history">
				<view class="top">
					<p class="title">搜索历史</p>
					<image class="del-icon" @click="delHistory" src="/static/images/pages/searchDetail/del.svg"></image>
				</view>
				<view class="history-con">
					<view :class="['his-list',{hide:!isMoreShow}]">
						<view v-for="(it,i) in searchHisList" :key="i">
							<p class="item his-item" @click="onHisItem(it)" v-if="it">{{it}}</p>
							<image v-if="!it && !isMoreShow" @click="isMoreShow=!isMoreShow" class="arrow-icon down"
								src="/static/images/pages/searchDetail/arrow-bottom.svg" />
						</view>
						<image v-if="isMoreShow" @click="isMoreShow=!isMoreShow" :class="['arrow-icon',{up:isMoreShow}]"
							src="/static/images/pages/searchDetail/arrow-bottom.svg" />
					</view>
				</view>
			</view>
			<view class="leaderboard">
				<swiper class="swiper-list" duration="1000" previous-margin="20rpx"
					:next-margin="boardList.length*20+20+'rpx'" acceleration>
					<!-- 热搜榜 -->
					<swiper-item class="board-item">
						<view class="board-container">
							<view class="top-con">
								<p class="title">热搜榜</p>
								<view class="play-auto">
									<image class="play-icon" src="/static/images/pages/found/play.png"></image>
									<p class="play">播放</p>
								</view>
							</view>
							<view class="cont-list" v-for="(it,i) in hotBoardList" :key="i">
								<p :class="['num',{'forward':i<3}]">{{i+1}}</p>
								<p :class="['content',{'forward':i<3}]">{{it.searchWord}}</p>
								<image class="type-icon" :src="it.iconUrl"></image>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="board-item" v-for="(item,index) in boardList" :key="index">
						<view class="board-container">
							<view class="top-con">
								<p class="title">{{item.name}}</p>
								<view class="play-auto">
									<image class="play-icon" src="/static/images/pages/found/play.png"></image>
									<p class="play">播放</p>
								</view>
							</view>
							<view class="cont-list" v-for="(it,i) in item.list" :key="i">
								<p :class="['num',{'forward':i<3}]">{{i+1}}</p>
								<p :class="['content',{'forward':i<3}]">{{it.name}}</p>
								<!-- <image class="type-icon" :src="it.al.picUrl"></image> -->
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>


		<view class="block">

		</view>
	</view>
</template>

<script>
	import $httpSearch from '@/api/search.js';
	import circleProgreBar from '@/components/circleProgreBar.vue';
	import {
		debounce
	} from '@/utils/timeDelay.js';
	// import $httpHome from '@/api/home.js';
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				searchSugges: "",
				searchValue: "",
				searchHisList: [],
				isMoreShow: false, // 是否展开更多搜索记录
				hotBoardList: [], // 热搜榜
				boardList: [{
						name: '民谣榜',
						id: 5059661515,
					}, {
						name: '听歌识曲榜',
						id: 6688069460,
					}, {
						name: '中文DJ榜',
						id: 6886768100
					}, {
						name: '网络热歌榜',
						id: 6723173524
					},
					{
						name: "潜力爆款榜",
						id: 5338990334
					},
					{
						name: "ACG VOCALOID榜",
						id: 3001890046
					},
					{
						name: "KTV唛榜",
						id: 21845217
					},
					{
						name: "ACG榜",
						id: 71385702
					},
					{
						name: "电音榜",
						id: 1978921795
					}
				],

				searchSuggestList: [], // 搜索建议数据
			}
		},
		components: {
			circleProgreBar
		},
		created() {
			this.getSearchDefault();
			// 当有搜索历史盒子展示的时候才开始计算
			if (!this.searchValue) {
				this.setExpandBtn();
			}
			this.getHotList();
			// 获取所有榜单信息
			for (let i = 0; i < this.boardList.length; i++) {
				this.getBoardList(this.boardList[i].id);
			}
		},

		computed: {
			...mapState("searchDetail", ["searchHistory"])
		},
		methods: {
			...mapMutations("searchDetail", ["setSearchHistory", "clearSearchHistory"]),
			// 获取搜索建议
			searchInput: debounce(async function() {
				let res = await $httpSearch.searchSuggest(this.searchValue);
				if (res && res.code == 200 && res.result.allMatch) {
					this.searchSuggestList = res.result.allMatch.map(it => {
						if (it.keyword.indexOf(this.searchValue) != -1) {
							return {
								first: it.keyword.substring(0, this.searchValue.length),
								last: it.keyword.substring(this.searchValue.length)
							}
						}
						return {
							first: "",
							last: it.keyword
						};
					});
				} else {
					this.searchSuggestList = [];
				}
			}),
			// 动态设置搜索结果展开按钮的位置
			setExpandBtn() {
				this.searchHisList = this.searchHistory;
				this.$nextTick(() => {
					// 获取父盒子的实际宽度
					let fathWidth = 0;
					wx.createSelectorQuery().in(this).select('.his-list').boundingClientRect(rect => {
						fathWidth = parseInt(rect.width);
					}).exec();

					// 获取每一个p标签的实际宽度
					wx.createSelectorQuery().in(this).selectAll('.his-item').boundingClientRect(rect => {
						let num = 0;
						// 判断第一行的p标签宽度是否会超出父盒子的宽度  (因为每个p标签有10像素的间距，所以要加上10)
						let index = rect.findIndex(it => (num += parseInt(it.width + 10)) >
							fathWidth - 50) // 60是图片的宽度，还要多余一点，样式比较好看
						this.searchHistory.splice(index + 0, 0, "");
					}).exec();
				})
			},
			// 获取默认搜索关键词
			async getSearchDefault() {
				let res = await $httpSearch.searchDefault();
				if (res && res.code == 200) {
					this.searchSugges = '我建议你搜索 ' + res.data.showKeyword;
				}
			},
			clickSongName(it) {
				this.searchValue = it.first + it.last;
				this.searchInput();
				this.search();
			},
			async search() {
				console.log(this.searchValue, '9999');
				uni.navigateTo({
					url: `/pages/searchResult/searchResult?search=${this.searchValue.trim()}`,

				})
				// if (this.searchValue.trim()) {
				// 	let res = await $httpSearch.search({
				// 		keywords: this.searchValue.trim(),
				// 		type: 1
				// 	})
				// 	console.log('res', res)
				// 	// 保存搜索历史  // 先去重
				// 	let arr = this.searchHistory.filter(it => it != this.searchValue).filter(val => val);
				// 	arr.unshift(this.searchValue);
				// 	this.setSearchHistory(arr.slice(0, 10)); // 只保留前十个记录
				// 	if (!this.searchValue) {
				// 		this.setExpandBtn();
				// 	}
				// 	if (res && res.code == 200) {}
				// }
			},
			// 清空搜索记录
			delHistory() {
				this.searchHisList = [];
				this.clearSearchHistory();
			},
			onHisItem(it) {
				this.searchValue = it;
				this.search();
			},
			// 获取热搜榜列表
			async getHotList() {
				let res = await $httpSearch.hotList();
				if (res && res.code == 200) {
					this.hotBoardList = res.data;
				}
			},
			// 获取榜单列表
			async getBoardList(id) {
				let res = await $httpSearch.boardSongs({
					id
				});
				if (res && res.code == 200) {
					this.boardList.forEach(it => {
						if (it.id == id) {
							this.$set(it, 'list', res.songs);
						}
					})
				}
			},

		}
	}
</script>

<style lang="scss">
	.search-detail {
		background: #1b1b25;
		min-height: 100vh;

		.search-con {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx;
			box-sizing: border-box;

			.emoj-icon {
				width: 50rpx;
				height: 50rpx;
				margin-right: 15rpx;
			}

			.search-bar {
				flex: 1;
				height: 60rpx;
				display: flex;
				align-items: center;
				background: #323137;
				border-radius: 40rpx;
				overflow: hidden;
				padding: 0 20rpx;
				box-sizing: border-box;

				.search-icon {
					width: 30rpx;
					height: 30rpx;
				}

				.search {
					width: 100%;
					height: 50rpx;
					margin-left: 10rpx;
					font-size: 26rpx;
					color: #fbfbfb;
					caret-color: #a2a2a3
				}

				.search-del {
					width: 50rpx;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin: 0 -10rpx 0 10rpx;

					.search-del-icon {
						width: 30rpx;
						height: 30rpx;
					}
				}
			}

			.search-btn {
				width: 50rpx;
				font-size: 24rpx;
				color: #fff;
				margin-left: 20rpx;
			}
		}

		.category {
			width: 100%;
			height: 100rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.type {
				width: 20%;
				text-align: center;

				.label {
					font-size: 24rpx;
					color: #bbbbbe;
				}
			}
		}

		.search-history {
			padding: 20rpx;
			box-sizing: border-box;

			.top {
				height: 50rpx;
				// background-color: pink;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.title {
					font-size: 26rpx;
					color: #f4f4f4;
				}

				.del-icon {
					width: 30rpx;
					height: 30rpx;
				}
			}

			.history-con {
				width: 100%;
				// background-color: skyblue;

				.his-list {
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					width: 94%;
					overflow: hidden;
					white-space: nowrap;
					overflow: hidden;
					// background-color: pink;

					&.hide {
						height: 50rpx;
					}

					.item {
						font-size: 24rpx;
						line-height: 30rpx;
						color: #d6d6d7;
						padding: 10rpx 20rpx;
						background: #32323a;
						border-radius: 50rpx;
						white-space: nowrap;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						max-width: 300rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.arrow-icon {
						width: 20rpx;
						height: 20rpx;
						padding: 14rpx;
						background: #32323a;
						border-radius: 100%;
						transition: .5s;
						margin-right: 20rpx;

						&.up {
							transform: rotate(180deg);
						}

						&.down {
							margin-right: 50rpx;
						}
					}
				}
			}
		}

		.leaderboard {
			height: 100%;

			.swiper-list {
				width: 100%;
				height: 1286rpx;
				margin-right: 20rpx;

				.board-item {
					height: 100%;
					padding-right: 20rpx;

					.board-container {
						width: 100%;
						height: 100%;
						border-radius: 16rpx;
						background-color: #32323a;
						padding: 20rpx;
						box-sizing: border-box;

						.top-con {
							display: flex;
							align-items: center;
							// height: 100rpx;
							padding-bottom: 20rpx;
							border-bottom: 1rpx solid #414149;

							.title {
								font-size: 28rpx;
								color: #f2f3f5;
								font-weight: bold;
								margin-right: 30rpx;
							}

							.play-auto {
								display: flex;
								align-items: center;
								padding: 4rpx 14rpx;
								border: 1rpx solid #3f3f47;
								background-color: #3d3d47;
								border-radius: 50rpx;

								.play-icon {
									width: 14rpx;
									height: 14rpx;
									margin-right: 10rpx;
								}

								.play {
									font-size: 20rpx;
									color: #d2d2dc;
								}
							}
						}

						.cont-list {
							height: 60rpx;
							display: flex;
							align-items: center;

							.num {
								width: 20rpx;
								font-size: 28rpx;
								color: #aeafb3;
								margin-right: 30rpx;

								&.forward {
									color: #f94942;
								}
							}

							.content {
								font-size: 24rpx;
								color: #f4f5f9;

								&.forward {
									font-weight: bold;
									font-size: 24rpx;
								}
							}

							.type-icon {
								width: 46rpx;
								height: 26rpx;
								margin-left: 20rpx;
							}
						}
					}
				}
			}
		}

		.search-suggest {
			width: 100%;
			padding-left: 20rpx;
			box-sizing: border-box;

			.suggest-item {
				height: 70rpx;
				display: flex;
				align-items: center;

				.search-icon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}

				.suggest-text {
					width: 100%;
					height: 100%;
					line-height: 70rpx;
					font-size: 24rpx;
					color: #f0f1f5;
					border-bottom: 1rpx solid #2e2e38;

					.select {
						color: #64646e;
					}
				}
			}
		}

		.block {
			height: 200rpx;
		}

	}
</style>

<template>
	<view class="search-result">
		<view class="search-con">
			<image class="emoj-icon" src="/static/images/pages/play/emoj-pig.png" />
			<view class="search-bar">
				<image class="search-icon" src="/static/images/pages/found/search.svg" />
				<input class="search" @input="searchInput" @focus="searchFocus" v-model="searchValue" @confirm="search"
					:placeholder="searchSugges" type="text" confirm-type="search">
				<view class="search-del" v-if="searchValue" @click="searchValue=''">
					<image class="search-del-icon" src="/static/images/pages/searchDetail/search-del.svg"></image>
				</view>
			</view>
			<p class="search-btn" @click="search">搜索</p>
		</view>
		<view v-if="searchValue" class="search-suggest">
			<view class="suggest-item" v-for="(item,index) in searchSuggestList" :key="index">
				<image class="search-icon" src="/static/images/pages/found/search.svg"></image>
				<p class="suggest-text">
					<span class="select">{{item.first}}</span>
					{{item.last}}
				</p>
			</view>
		</view>
		<!-- 滑动tab -->
		<view class="menu-scroll-con">
			<menuScrollTab :menuNames="menuNameList" @curMenuIndex="(val)=>curMenuValue=menuNameList[val].value">
				<compre slot="compre" v-if="curMenuValue=='compre'"  />
				<single slot="single" v-if="curMenuValue=='single'" />
				<songList slot="songList" v-if="curMenuValue=='songList'" />
				<videoPage slot="videoPage" v-if="curMenuValue=='videoPage'" />
				<singer slot="singer" v-if="curMenuValue=='singer'" />
				<podcast slot="podcast" v-if="curMenuValue=='podcast'" />
				<lyrics slot="lyrics" v-if="curMenuValue=='lyrics'" />
				<album slot="album" v-if="curMenuValue=='album'" />
			</menuScrollTab>
		</view>
	</view>
</template>s

<script>
	import $httpSearch from '@/api/search.js';
	import menuScrollTab from '@/components/menuScrollTab.vue';
	import compre from './components/compre.vue'; // 综合
	import single from './components/single.vue'; // 单曲
	import songList from './components/songList.vue'; // 歌单
	import videoPage from './components/videoPage.vue'; // 视频
	import singer from './components/singer.vue'; // 歌手
	import podcast from './components/podcast.vue'; // 播客
	import lyrics from './components/lyrics.vue'; // 歌词
	import album from './components/album.vue'; // 专辑
	export default {
		name: 'searchResult',
		data() {
			return {
				searchSugges: "",
				searchValue: "",
				searchSuggestList: [], // 搜索建议数据
				menuNameList: [{
						label: '综合',
						value: 'compre'
					}, {
						label: '单曲',
						value: 'single'
					}, {
						label: '歌单',
						value: 'songList'
					}, {
						label: '视频',
						value: 'videoPage'
					}, {
						label: '歌手',
						value: 'singer'
					}, {
						label: '播客',
						value: 'podcast'
					}, {
						label: '歌词',
						value: 'lyrics'
					}, {
						label: '专辑',
						value: 'album'
					},
					// {
					// 	label: '声音',
					// 	value: 'shengyin'
					// }, {
					// 	label: '话题',
					// 	value: 'huati'
					// }, {
					// 	label: '用户',
					// 	value: 'yonghu'
					// },
				],
				curMenuValue: "compre",
			}
		},
		components: {
			menuScrollTab,
			compre,
			single,
			songList,
			videoPage,
			singer,
			podcast,
			lyrics,
			album
		},
		onLoad(query) {
			console.log('query', query.search);
			this.searchValue = query.search;
		},
		created() {

		},
		methods: {
			// 监听输入框获取焦点的时候
			searchFocus() {
				console.log('获取焦点了');
				uni.navigateBack();
			},

			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll(e) {
				console.log('e', e)
			}
		}
	}
</script>

<style lang="scss">
	.search-result {
		background: #151515;
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
				background: #212121;
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



		.menu-scroll-con {
			background: #151515;
		}

		.loader {
			height: 200rpx;
			font-size: 26rpx;
			color: #333;
			text-align: center;
			line-height: 200rpx;
		}

	}
</style>

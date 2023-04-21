<template>
	<view class="search-detail">
		<view class="search-con">
			<image class="emoj-icon" src="/static/images/pages/play/emoj-pig.png" mode="" />
			<view class="search-bar">
				<image class="search-icon" src="/static/images/pages/found/search.svg" mode="" />
				<input class="search" v-model="searchValue" @confirm="search" :placeholder="searchSugges" type="text">
			</view>
			<p class="search-btn" @click="search">搜索</p>
		</view>
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
				<image class="del-icon" src="/static/images/pages/searchDetail/del.svg" mode=""></image>
			</view>
			<view class="history-con">
				<view :class="['his-list',{hide:!isMoreShow}]">
					<view v-for="(it,i) in searchHisList" :key="i">
						<p class="item his-item" @click="onHisItem(it)" v-if="it">{{it}}</p>
						<image v-if="!it && !isMoreShow" @click="isMoreShow=!isMoreShow" class="arrow-icon"
							src="/static/images/pages/searchDetail/arrow-bottom.svg" mode="" />

					</view>
					<image v-if="isMoreShow" @click="isMoreShow=!isMoreShow" :class="['arrow-icon',{up:isMoreShow}]"
						src="/static/images/pages/searchDetail/arrow-bottom.svg" mode="" />
				</view>
			</view>
		</view>
		<view class="box">
			<view class="cont">
				<p v-for="it in 100" :key="it">{{it}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	import $httpSearch from '@/api/search.js';
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
			}
		},
		created() {
			this.getSearchDefault();
			this.setExpandBtn();



		},
		computed: {
			...mapState("searchDetail", ["searchHistory"])
		},
		watch: {
			searchHistory() {
				// this.setExpandBtn();
			}
		},
		methods: {
			...mapMutations("searchDetail", ["setSearchHistory"]),
			// 动态设置搜索结果展开按钮的位置
			setExpandBtn() {
				this.searchHisList = this.searchHistory;
				this.$nextTick(() => {
					// 获取父盒子的实际宽度
					let fathWidth = 0;
					wx.createSelectorQuery().in(this).select('.his-list').boundingClientRect(rect => {
						fathWidth = rect.width;
						// console.log('rect', rect)
					}).exec();

					// 获取每一个p标签的实际宽度
					wx.createSelectorQuery().in(this).selectAll('.his-item').boundingClientRect(rect => {
						// console.log('rect', rect)
						let num = 0;
						// 判断第一行的p标签宽度是否会超出父盒子的宽度
						let index = rect.findIndex(it => (num += it.width) > fathWidth -
							80) // 60是图片的宽度，还要多余一点，样式比较好看
						// let index = rect.findIndex(it=>{
						// 	if(it.width+=num < fathWidth-60){

						// 	}
						// })
						// rect.forEach(item => {
						// 	console.log(item.width + 20);
						// })
						this.searchHistory.splice(index, 0, "")
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
			async search() {
				console.log(this.searchValue, '9999');
				if (this.searchValue.trim()) {
					let res = await $httpSearch.search({
						keywords: this.searchValue.trim(),
						type: 1
					})
					console.log('res', res)
					if (res && res.code == 200) {
						// 保存搜索历史  // 先去重
						let arr = this.searchHistory.filter(it => it != this.searchValue).filter(val => val);
						arr.unshift(this.searchValue);
						this.setSearchHistory(arr.slice(0, 10)); // 只保留前十个记录
						this.setExpandBtn();
					}
				}
			},
			onHisItem(it) {
				this.searchValue = it;
				this.search();
			}
		}
	}
</script>

<style lang="scss">
	.search-detail {
		background: #1b1b23;
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
				background: #323139;
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
					}
				}
			}
		}
		
		.box {
			width: 100%;
			height: 500rpx;
			border: 1px solid #000;
			overflow-y: scroll;
		}
		.cont {
			width: 100%;
			height: 1000px;
			background: skyblue;
		}
	}
</style>

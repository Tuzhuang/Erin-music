<template>
	<view class="found">
		<top-bar class="tab-bar" @openMenuShow="openMenuShow">
			<view class="search-con" slot="content">
				<view class="search-bar">
					<img class="search-icon" src="/static/images/pages/found/search.svg">
					<p class="tip-text">大家都在搜 毛不易</p>
				</view>
			</view>
			<view class="gene-song-con" slot="right">
				<img class="song-icon" src="/static/images/pages/found/gene_song.png">
			</view>
		</top-bar>
		<!-- 点击菜单左侧弹出层 -->
		<popup :isPopup.sync="menuShow" mode="left" width="80" bgColor="#151515">
			<view class="menu-con" slot="content">
				<view class="user-info">
					<img class="avatar" v-if="userInfoObj.avatarUrl" :src="userInfoObj.avatarUrl">
					<img class="avatar" v-else src="/static/images/pages/found/avatar.png">
					<p class="username">{{userInfoObj.nickname || '立即登录'}}</p>
					<img class="arrow" src="/static/images/pages/found/arrow_fff.png">
					<img class="scan" src="/static/images/pages/found/scan.svg">
				</view>
				<view class="plate">
					<view class="item-con">
						<img class="icon" src="">
						<p class="title">消息中心</p>
						<img class="more-icon" src="/static/images/pages/phoneLogin/right-arrow.svg">
					</view>
					<p class="tips">下面的部分我还没有想好要写一些什么东西，就请期待吧~</p>
				</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import topBar from '@/components/topBar.vue';
	import popup from '@/components/popup.vue';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			topBar,
			popup
		},
		data() {
			return {
				menuShow: true,
				userInfoObj:{}, // 用户信息
			}
		},
		computed:{
			...mapState(["userInfo"]),
		},
		created(){
			this.userInfoObj = JSON.parse(this.userInfo);
			console.log(JSON.parse(this.userInfo));
		},
		methods: {
			openMenuShow(val) {
				console.log('val', val)
				this.menuShow = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.found {
		// 	width: 100%;
		min-height: 100vh;
		padding: 100rpx 0 160rpx;
		box-sizing: border-box;

		.tab-bar {
			width: 100%;
			position: fixed;
			top: 0;

			.search-con {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;

				.search-bar {
					width: 100%;
					height: 66%;
					background-color: #232221;
					border-radius: 100rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.search-icon {
						width: 28rpx;
						height: 28rpx;
						margin-right: 10rpx;
					}

					.tip-text {
						font-size: 26rpx;
						color: #363535;
					}
				}

			}

			.gene-song-con {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.song-icon {
					width: 60rpx;
					height: 60rpx;
					filter: brightness(60%);
				}
			}
		}

		.menu-con {
			.user-info {
				width: 100%;
				height: 80rpx;
				padding: 0 10rpx;
				box-sizing: border-box;
				// background-color: skyblue;
				display: flex;
				align-items: center;
				position: relative;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
				}

				.username {
					font-size: 32rpx;
					color: #fff;
				}

				.arrow {
					width: 30rpx;
					height: 30rpx;
				}

				.scan {
					width: 60rpx;
					height: 60rpx;
					position: absolute;
					right: 0;
				}
			}
		}

		.plate {
			width: 100%;
			background: #202020;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			margin-top: 30rpx;

			.item-con {
				width: 100%;
				height: 70rpx;
				border-bottom: 1px solid #2f2f2f;
				display: flex;
				align-items: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}

				.title {
					font-size: 30rpx;
					color: #fff;
				}

				.more-icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.tips {
				color: #fff;
				margin-top: 40rpx;
			}
		}
	}
</style>

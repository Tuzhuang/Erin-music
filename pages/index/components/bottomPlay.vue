<template>
	<view class="bottom-play">
		<view class="play-con" @click="openPlay">
			<view class="left-disc">
				<image class="disc-icon" src="/static/images/pages/play/bt_disc.png" mode=""></image>
				<image class="song-img"
					src="https://h2.appsimg.com/a.appsimg.com/upload/brand/upcb/2022/10/27/150/ias_1bd44839bfd63ed49d233f8a2ff64d27_1135x545_85.jpg"
					mode="aspectFill"></image>
			</view>
			<view class="song-name">
				<p class="name">身骑白马</p>
				<span class="split">-</span>
				<text class="singer">汪小敏</text>
			</view>
			<view class="play-menu" @click.stop="openPlayList">
				<image class="menu-icon" src="/static/images/pages/play/play_menu.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			openPlay(){
				this.$emit('openPlayPage');
			},
			openPlayList(){
				console.log('openPlayList不会下去')
			}
		}
	}
</script>

<style lang="scss">
	.bottom-play {
		width: 100%;
		height: 80rpx;
		// position: fixed;
		// bottom: 160rpx;

		.play-con {
			width: 100%;
			height: 100%;
			background: rgba(#0d0d0d, .6);
			backdrop-filter: blur(20px);
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;

			.left-disc {
				width: 80rpx;
				height: 80rpx;
				position: relative;
				.disc-icon {
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%,-48%);
				}
				.song-img {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					position: absolute;
					top: 40%;
					left: 50%;
					transform: translate(-50%,-48%);
				}
			}
			.song-name {
				display: flex;
				align-items: flex-end;
				margin-left: 20rpx;
				.name {
					font-size: 24rpx;
					color: #fff;
				}
				.split,.singer {
					font-size: 20rpx;
					color: #5d5d5d;
				}
				.split {
					padding: 0 10rpx;
				}
			}
			.play-menu {
				width: 80rpx;
				height: 80rpx;
				position: absolute;
				right: 0;
				.menu-icon {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}
</style>

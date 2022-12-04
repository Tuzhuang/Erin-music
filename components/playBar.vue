<template>
	<view class="play-bar">
		<p class="start-time">00<span class="colon">:</span>00</p>
		<view class="progress">

		</view>
		<p class="end-time">05<span class="colon">:</span>20</p>
	</view>
</template>

<script>
	export default {
		name: "playBar",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.play-bar {
		width: 100%;
		height: 40rpx;
		display: flex;
		align-items: center;

		.start-time,
		.end-time {
			font-size: 20rpx;
			color: #ccc;
			white-space: nowrap;
			display: flex;
			.colon {
				display: block;
				margin: -2rpx 2rpx;
			}
		}

		.progress {
			width: 100%;
			height: 2px;
			background: #ccc;
			margin: 0 20rpx;
		}
	}
</style>

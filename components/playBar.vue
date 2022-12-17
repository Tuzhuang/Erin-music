<template>
	<view class="play-bar">
		<p class="start-time">00<span class="colon">:</span>00</p>
		<view class="slider-con">
			<slider class="slider" :value="slideValue" :backgroundColor="bgColor" block-size="12"
				:activeColor="activeColor" @change="sliderChange" @changing="sliderChanging" />
		</view>
		<p class="end-time">05<span class="colon">:</span>20</p>
	</view>
</template>

<script>
	export default {
		name: "playBar",
		props: {
			slideValue: {
				type: Number,
				default: 0
			},
			activeColor: {
				type: String,
				default: '#a78e88'
			},
			bgColor: {
				type: String,
				default: '#dbd4d3'
			},
		},
		data() {
			return {};
		},
		methods: {
			sliderChange(e) {
				console.log('e', e)
			},
			sliderChanging(e) {
				// console.log('event', e);
			}
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

		.slider-con {
			width: 100%;

			.slider {
				margin: 20rpx 20rpx;
			}
		}
	}
</style>

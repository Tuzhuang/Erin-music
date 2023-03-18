<template>
	<view class="play-bar">
		<p class="start-time">{{curMinute}}<span class="colon">:</span>{{curSecond}}</p>
		<view class="slider-con">
			<slider class="slider" :value="value" :backgroundColor="bgColor" block-size="12" :activeColor="activeColor"
				@change="sliderChange" @changing="sliderChanging" :max="sliderMax" />
		</view>
		<p class="end-time">{{maxMinute}}<span class="colon">:</span>{{maxSecond}}</p>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		name: "playBar",
		props: {
			// 当前滑块所处位置 语法糖
			value: {
				type: Number,
				default: 0
			},
			sliderMax: {
				type: Number,
				default: 100
			},
			activeColor: {
				type: String,
				default: '#a78e88'
				// default: 'transparent'
			},
			bgColor: {
				type: String,
				default: '#dbd4d3'
			},
		},
		data() {
			return {
				maxMinute: '00',
				maxSecond: '00',
				curMinute: '00', // 当前分秒
				curSecond: '00',
			};
		},
		created() {
			// if (this.sliderMax) {
				this.timeFormat(this.sliderMax);
			// }
		},
		computed: {
			...mapState('songDetail', ['curPlayTime']),
		},
		watch: {
			value: {
				handler(newVal) {
					// 将当前的时间传递给父组件
					this.$emit('input', +newVal);
					// 需要把当前的秒数处理成分秒格式
					if (newVal <= 59) {
						this.curMinute = '00';
						this.curSecond = ('0' + newVal).slice(-2);
					} else if (newVal > 59 && newVal / 60 > 0) {
						this.curMinute = ('0' + parseInt(newVal / 60)).slice(-2);
						this.curSecond = ('0' + (newVal - this.curMinute * 60)).slice(-2);
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			...mapMutations('songDetail', ['setCurPlayTime']),
			// 时间格式转换
			timeFormat(val) {
				this.maxMinute = ('0' + parseInt(val / 60)).slice(-2);
				this.maxSecond = ('0' + (val - this.maxMinute * 60)).slice(-2);
			},
			sliderChange(e) {
				console.log('e', e.detail.value);
				this.$emit('input', e.detail.value);
				this.setCurPlayTime(e.detail.value);
				// 点击哪个位置就从哪个位置开始播放音乐
				this.bus.$emit('onToTimePlay', e.detail.value);
			},
			sliderChanging(e) {
				console.log('event', e.detail.value);
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

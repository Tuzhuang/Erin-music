<template>
	<view class="search-detail">
		<p @click="kaiqi">我开启计时器</p>
		<p>{{num}}</p>
		<p @click="guanbi" style="margin-top:100rpx;">我关闭计时器</p>
		<slider :value="num" @change="sliderChange" show-value />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				num:0
			}
		},
		onHide(){
			clearInterval(this.timer);
		},
		methods: {
			kaiqi(){
				this.timer = setInterval(()=>{
					this.num++;
					console.log('num',this.num,this.timer);
				},1000)
			},
			guanbi(){
				clearInterval(this.timer);
				console.log('关闭',this.timer);
			}
		}
	}
</script>

<style lang="scss">
.search-detail {
	
}
</style>

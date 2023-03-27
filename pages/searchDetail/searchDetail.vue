<template>
	<view class="search-detail">
		<!-- <popup :isPopup="isPopup" mode="bottom" bgColor="pink"> -->
		<!-- <view v-if="isPopup==true"> -->
		<p @click="baocun">保存数据</p>
		<p @click="qingchu" style="margin-top:100rpx;">清除数据</p>
		<!-- <slider :value="num" @change="sliderChange" show-value /> -->
		<!-- <p>数据展示:{{JSON.stringify(duObj)}}</p> -->
		<p id="one" v-for="(item,index) in dataList" :key="index">数据展示:{{item.a}}--{{item.b}}</p>
		<!-- </view> -->
		<!-- </popup> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import popup from '@/components/popup.vue'
	export default {
		components: {
			popup
		},
		data() {
			return {
				isPopup: false
			}
		},
		computed: {
			...mapState(['duData']),
			dataList() {
				console.log('this.duData', this.duData)
				// if (this.duData.length) {
				return this.duData;
				// }
			}
		},
		created() {
			// setTimeout(()=>{
			// 	this.isPopup = true;
			// },100)
			wx.createSelectorQuery().select('#one').boundingClientRect(function(rect) {
				// rect.id // 节点的ID
				// rect.dataset // 节点的dataset
				// rect.left // 节点的左边界坐标
				// rect.right // 节点的右边界坐标
				// rect.top // 节点的上边界坐标
				// rect.bottom // 节点的下边界坐标
				// rect.width // 节点的宽度
				// rect.height // 节点的高度
				console.log('rect', rect)
			}).exec();
		},
		methods: {
			...mapMutations(['setDuData', 'removeDuData']),
			baocun() {
				let arr = [{
					a: 1,
					b: 2
				}, {
					a: 2,
					b: 3
				}, {
					a: 3,
					b: 4
				}, {
					a: 4,
					b: 5
				}];
				this.setDuData(arr);
				console.log('清空前', this.duData);
			},
			qingchu() {
				this.removeDuData();
				console.log('清空后', this.duData)
			}
		}
	}
</script>

<style lang="scss">
	.search-detail {}
</style>

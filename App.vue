<script>
	import {mapMutations} from 'vuex';
	export default {
		methods:{
			...mapMutations(['clearStoreData']),
		},
		onLaunch: function() {
			console.log('App Launch')
			// this.clearStoreData();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onUnload:function(){
			this.clearStoreData();
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.swiper {
		.wx-swiper-dot {
			width: 10rpx;
			height: 4rpx;
			border-radius: 10rpx;
			overflow: hidden;

			&-active {
				width: 20rpx;
				transition: .5s;
			}
		}
	}
	/* 解决安卓小程序滚动条的问题 */
	/* #ifdef MP-WEIXIN */
		::-webkit-scrollbar {
		    display: none;
		    width: 0 !important;
		    height: 0 !important;
		    -webkit-appearance: none;
		    background: transparent;
		    color: transparent;
		  }
	/* #endif */
</style>

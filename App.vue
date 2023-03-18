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
			console.log('curPlaySongInfo a', uni.getStorageSync('curPlaySongInfo'));
			console.log('curPlayTime a', uni.getStorageSync('curPlayTime'));
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
</style>

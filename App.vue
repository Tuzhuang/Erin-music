<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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

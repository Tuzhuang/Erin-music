<template>
	<view style="flex: 1; padding: 20rpx;">
		<canvas canvas-id="myCanvas" style="width: 500rpx; height: 500rpx;"></canvas>
	</view>
</template>

<script>
	export default {
		onReady() {
			const ctx = uni.createCanvasContext('myCanvas', this);



			ctx.beginPath();
			ctx.moveTo(50, 0);
			ctx.lineTo(60, 0);
			ctx.lineTo(60, 50) 
			ctx.lineTo(50, 50);
			ctx.closePath();
			ctx.fillStyle = 'red';
			ctx.fill();

			ctx.beginPath();
			ctx.moveTo(70, 0);
			ctx.lineTo(80, 0);
			ctx.lineTo(80, 50);
			ctx.lineTo(70, 50);
			ctx.closePath();

			//填充这个图形

			ctx.fillStyle = 'red';
			ctx.fill();

			ctx.draw();
		}
	}
</script>

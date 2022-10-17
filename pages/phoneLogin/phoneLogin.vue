<template>
	<view class="phone-login">
		<p class="title">登录体验更多精彩</p>
		<p class="desc">未注册手机号登录后将自动创建账号</p>
		<view class="phone-con">
			<view class="area-con">
				<p class="area-code">+86</p>
				<view class="triang"></view>
			</view>
			<view class="phone-mask" @click="phoneInput">
				<view class="phone">
					<p class="num" v-for="(item,index) in phone" :key="index">{{item}}</p>
					<p v-if="iskeyBoardShow" class="cursor-line"></p>
				</view>
			</view>
			<view class="clear" @click="clear">
				<img v-show="phone.length" class="clear-icon" src="/static/images/pages/phoneLogin/clear.svg" />
			</view>
		</view>
		<p :class="['next',{'comp':phone.length}]" @click="next">下一步</p>
		<keyBoard :isShow.sync="iskeyBoardShow" @boardItem="boardItem" />
		<!-- 输入密码 -->
		<popup :isPopup.sync="isValidcodeShow" height="1000" bgColor="#151515">
			<phone-validcode :isInCompon.sync="isValidcodeShow" @changeValidShow="iskeyBoardShow=true" slot="content" />
		</popup>
	</view>
</template>

<script>
	import keyBoard from '@/components/keyBoard.vue'
	import phoneValidcode from '@/pages/phoneLogin/components/phoneValidcode/phoneValidcode.vue'
	import popup from '@/components/popup.vue'
	export default {
		components: {
			keyBoard,
			phoneValidcode,
			popup
		},
		data() {
			return {
				phone: "1",
				iskeyBoardShow: false,
				isValidcodeShow: false
			}
		},
		methods: {
			next() {
				if (!this.phone.length) return;
				this.isValidcodeShow = true;
			},
			phoneInput() {
				this.iskeyBoardShow = true;
			},
			clear() {
				this.phone = "";
			},
			boardItem(val) {
				let obj = JSON.parse(val);
				if (obj.item.num) {
					this.phone += obj.item.num;
				}
				if (obj.index == 11) {
					this.phone = this.phone.slice(0, this.phone.length - 1);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.phone-login {
		min-height: 100vh;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #151515;

		.title {
			font-size: 30rpx;
			color: #fff;
		}

		.desc {
			font-size: 26rpx;
			color: #5e5e5e;
			margin-top: 8rpx;
		}

		.phone-con {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			height: 60rpx;
			border-bottom: 1px solid #202020;

			.area-con {
				display: flex;
				align-items: center;

				.area-code {
					font-size: 30rpx;
					color: #fff;
					margin-right: 10rpx;
				}

				.triang {
					width: 0px;
					height: 0px;
					border: 8rpx solid transparent;
					border-top-color: #fff;
					transform: translateY(50%);
				}
			}

			.phone-mask {
				flex: 1;
				height: 100%;
				position: relative;
				z-index: 10;
				display: flex;
				align-items: center;
			}

			.phone {
				font-size: 28rpx;
				margin-left: 20rpx;
				color: #fff;
				display: flex;
				align-items: center;
			}

			.cursor-line {
				width: 1px;
				height: 28rpx;
				background-color: #fff;
				margin-left: 2rpx;
				animation: cursor 800ms infinite;
			}

			.clear {
				width: 80rpx;
				height: 100%;
				text-align: right;

				.clear-icon {
					width: 30rpx;
					height: 100%;
				}
			}

		}

		.next {
			width: 100%;
			height: 70rpx;
			background: linear-gradient(to right, #562b2a, #521814);
			border-radius: 70rpx;
			margin-top: 80rpx;
			font-size: 28rpx;
			color: #8b645f;
			text-align: center;
			line-height: 70rpx;
			transition: .2s;

			&.comp {
				background: linear-gradient(to right, #f3605b, #e83c2a);
				color: #fff;
			}
		}


		@keyframes cursor {
			25% {
				background-color: #fff;
			}

			75% {
				background-color: #151515;
			}
		}
	}
</style>

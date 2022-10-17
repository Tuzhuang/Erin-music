<template>
	<view class="phone-validcode" slot="content">
		<p class="title">请输入验证码</p>
		<view class="valid-code">
			<p class="phone">已发送至 +86 158****6752</p>
			<img class="edit-icon" @click="editPhone" src="/static/images/pages/phoneLogin/edit.svg">
			<view class="count-down">
				<p @click="sendCode">重新发送</p>
				<p v-if="!isSendCode" class="count">{{count}}s</p>
			</view>
		</view>
		<view class="verification">
			<view :class="['item-code',{'have':code[index]}]" v-for="(item,index) in 6" :key="index"
				@click="isPwdBoard=true">
				<p>{{code[index]}}</p>
				<view class="line">
					<view :class="['progress']" :style="{width:code[index]?100+'%':''}"></view>
				</view>
			</view>
		</view>
		<view class="problem">
			<p>手机号已更换，无法接收短信?</p>
			<img class="arrow-icon" src="/static/images/pages/phoneLogin/right-arrow.svg">
		</view>
		<!-- 键盘 -->
		<keyBoard :isShow.sync="isPwdBoard" @boardItem="boardItem" />
	</view>
</template>

<script>
	import keyBoard from '@/components/keyBoard.vue'
	export default {
		props: {
			isInCompon: { // 是否展示当前页面
				type: Boolean,
				default: false,
			}
		},
		components: {
			keyBoard,
		},
		data() {
			return {
				count: 59,
				code: "",
				isPwdBoard: false, // 是否展示输入验证码的键盘
				isSendCode: true,
				countDownId: null, // 计时器
			}
		},
		created() {},
		computed: {
			// 进入输入密码组件的时候默认弹出键盘
			isKeyBoardShow: {
				get() {
					this.isPwdBoard = this.isInCompon;
				},
				set(val) {
					this.isPwdBoard = val;
				}
			}
		},
		watch: {
			isInCompon(newVal, oldVal) {
				if (newVal !== oldVal && this.isSendCode) {
					this.sendCode();
					return;
				}
			}
		},
		methods: {
			boardItem(val) {
				let obj = JSON.parse(val);
				if (obj.item.num) {
					this.code += obj.item.num;
				}
				if (obj.index == 11) {
					this.code = this.code.slice(0, this.code.length - 1);
				}
			},
			onCountDown() {
				clearInterval(this.countDownId);
				this.countDownId = setInterval(() => {
					if (this.count == 1) {
						this.isSendCode = true;
						clearInterval(this.countDownId);
					}
					this.count--;
				}, 1000)
			},
			sendCode() {
				if (!this.isSendCode) return;
				this.isSendCode = false;
				this.count = 59;
				this.onCountDown();
			},
			editPhone(){
				console.log('123');
				this.$emit('update:isInCompon',false);
				// 为了让本页面隐藏，并且让手机号输入键盘弹起
				this.$emit('changeValidShow');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.phone-validcode {
		padding-top: 10rpx;
		box-sizing: border-box;

		.title {
			font-size: 30rpx;
			color: #fff;
		}

		.valid-code {
			display: flex;
			align-items: center;
			height: 60rpx;
			margin-top: 20rpx;
			font-size: 24rpx;

			.phone {
				color: #666;
			}

			.edit-icon {
				width: 24rpx;
				height: 100%;
				margin-left: 10rpx;
			}

			.count-down {
				flex: 1;
				display: flex;
				align-items: center;
				color: #989898;
				justify-content: flex-end;

				.count {
					margin-left: 10rpx;
				}
			}
		}

		.verification {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.item-code {
				width: 14%;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				color: #fff;
				position: relative;

				.line {
					width: 100%;
					height: 1px;
					background-color: #242424;
					position: absolute;
					bottom: 0;

					.progress {
						width: 0rpx;
						height: 1px;
						background-color: #fff;
						left: 0;
						transition: .4s;
					}
				}
			}
		}

		.problem {
			height: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 60rpx;
			font-size: 24rpx;
			color: #7d7d7d;

			.arrow-icon {
				width: 28rpx;
				height: 100%;
				margin-left: 0rpx;
			}
		}
	}
</style>

<template>
	<view class="key-board">
		<view :class="['mask',{'hide':!isShow}]" @click="hideBoard">
			<view :class="['board',{'hide':!isShow}]" @click.stop>
				<view class="content">
					<view :class="['item',{'bgTrans':[9,11].includes(index),'colCnet':index==10}]"
						v-for="(item,index) in boards" :key="index" @click="keyupItem(item,index)">
						<p class="num">{{item.num}}</p>
						<p class="letter">{{item.letter}}</p>
						<img class="del-icon" v-if="index==11" src="/static/images/components/keyBoard/del.svg">
					</view>{{isShow}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "keyBoard",
		/**
		 * isShow  是否展示键盘
		 * 
		 * @boardItem  把点击的数字传出去
		 */
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				boards: [{
						num: '1',
						letter: ''
					},
					{
						num: '2',
						letter: 'ABC'
					},
					{
						num: '3',
						letter: 'DEF'
					},
					{
						num: '4',
						letter: 'GHI'
					},
					{
						num: '5',
						letter: 'JKL'
					},
					{
						num: '6',
						letter: 'MNO'
					},
					{
						num: '7',
						letter: 'PORS'
					},
					{
						num: '8',
						letter: 'TUV'
					},
					{
						num: '9',
						letter: 'WXYZ'
					},
					{},
					{
						num: '0',
						letter: ''
					},
					{},
				]
			};
		},
		methods: {
			hideBoard() {
				this.$emit('update:isShow', false);
			},
			keyupItem(item, index) {
				let obj = JSON.stringify({
					item,
					index
				});
				this.$emit('boardItem', obj);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.key-board {

		.mask {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 99;
			background-color: transparent;
			// background-color: pink;
			transition: .3s;

			&.hide {
				z-index: -1;
			}

			.board {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				background-color: #303030;
				padding: 10rpx;
				box-sizing: border-box;
				height: 500rpx;
				transition: .3s;

				&.hide {
					bottom: -500rpx;
				}
			}

		}



		.content {
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			.item {
				width: calc((100% - 30rpx) / 3);
				height: 100rpx;
				background-color: #6f6f6f;
				border-radius: 10rpx;
				margin-right: 15rpx;
				margin-bottom: 15rpx;
				text-align: center;
				padding: 6rpx;
				box-sizing: border-box;
				color: #fff;
				position: relative;

				&:nth-child(3n) {
					margin-right: 0;
				}

				&.bgTrans {
					background-color: transparent;
				}

				&.colCnet {
					line-height: 80rpx;
				}

				.num {
					font-size: 44rpx;
				}

				.letter {
					font-size: 18rpx;
					letter-spacing: 4rpx;
				}

				.del-icon {
					width: 76%;
					height: 56%;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}
		}

	}
</style>

<template>
	<view>
		<button @click="add">点击++</button>
	</view>
</template>

<script>
	export default {
		model: {
			prop: 'value',
			event: 'todo'
		},
		props: {
			value: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// num: this.value
			}
		},
		methods: {
			add() {
				this.$emit('todo', this.value + 1);
			}
		}
	}
</script>

<style>

</style>

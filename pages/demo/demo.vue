<template>
	<view class="content">
		<p>{{count}}</p>
		<child v-model="count" />
	</view>
</template>

<script>
	import child from './components/child.vue';
	export default {
		data() {
			return {
				count: 0,
			}
		},
		components: {
			child
		},
		methods: {}
	}
</script>

<style>

</style>

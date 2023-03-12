import {
	request
} from '@/utils/request.js';

export default {
	// 获取banner轮播
	async banner(type) {
		return await request({
			url: `/banner?type=${type}`,
		})
	},
	// 获取推荐歌单
	async personalized(limit) {
		return await request({
			url: `/personalized?limit=${limit}`
		})
	},
	// 推荐新音乐
	async newsong(limit) {
		return await request({
			url: `/personalized/newsong?limit=${limit}`
		})
	},
	// 根据歌单id查询歌曲
	async byIdSongs(data) {
		return await request({
			url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=0`
		})
	},
	// 获取所有榜单
	async toplist() {
		return await request({
			url: `/toplist`
		})
	},
	// 榜单的音乐列表
	async rankDetail(id){
		return await request({
			url:`/playlist/detail?id=${id}`
		}) 
	}
}

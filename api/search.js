import {
	request
} from '@/utils/request.js';

export default {
	// 默认搜索关键词
	async searchDefault() {
		return await request({
			url: `/search/default`
		})
	},
	// 搜索 type  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
	async search(data) {
		return await request({
			url: `/cloudsearch?keywords=${data.keywords}&limit=${data.limit||30}&type=${data.type||1}&offset=${data.offset||0}`,
		})
	},
	// 热搜列表
	async hotList() {
		return await request({
			url: `/search/hot/detail`
		})
	},
	// 获取榜单的详细歌曲列表
	async boardSongs(data) {
		return await request({
			url: `/playlist/track/all?id=${data.id}&limit=${data.limit||20}`
		})
	},
	// 搜索建议
	async searchSuggest(name) {
		return await request({
			url: `/search/suggest?keywords=${name}&type=mobile` // mobile的意思是返回移动端数据
		})
	},
	// 根据mvid获取mv播放地址
	async mvUrl(data) {
		return await request({
			url: `/mv/url?id=${data.id}&r=${data.r||720}`
		})
	}
}

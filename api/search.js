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
			url: `/cloudsearch?keywords=${data.keywords}&limit=${data.limit||''}&type=${data.type||1}`,
		})
	}
}

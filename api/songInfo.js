import {
	request
} from '@/utils/request.js';

export default {
	// 获取音乐url level音质: standard=>标准, higher=>较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
	async songUrl(data) {
		return await request({
			url: `/song/url/v1?id=${data.id}&level=${data.level||'standard'}`
		})
	},
	// 获取音乐歌词
	async lyric(id) {
		return await request({
			url: `/lyric?id=${id}`
		})
	},
	// 获取歌曲评论
	async songComment(data) {
		return await request({
			url: `/comment/music?id=${data.id}&limit=${data.limit}`
		})
	}
}

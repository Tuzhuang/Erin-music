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
	// 获取歌曲评论 不用了
	// async songComment(data) {
	// 	return await request({
	// 		url: `/comment/music?id=${data.id}&limit=${data.limit||20}&before=${data.before||''}`
	// 	})
	// },
	// 获取歌曲评论（新版） // 字段说明 type:0-歌曲、1-mv、2-歌单、3-专辑、4-电台节目  
	// sortType: 1-推荐排序、2-热度排序、3-时间排序     cursor:按照时间排序时除了第一页，其他页都要传入上一条数据的time
	async songComments(data) {
		return await request({
			url: `/comment/new?id=${data.id}&type=${data.type}&pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortType=${data.sortType}&cursor=${data.cursor}`
		})
	},
	// 楼层评论  type:0-歌曲、1-mv、2-歌单、3-专辑、4-电台节目
	async floorComments(data){
		return await request({
			url:`/comment/floor?parentCommentId=${data.parentId}&id=${data.songId}&type=${data.type}&time=${data.time}`
		})
	}
}

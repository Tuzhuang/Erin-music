import $httpSongInfo from '@/api/songInfo.js';
import storage from '@/utils/storage.js';

const state = {
	curPlaySongInfo: storage.getItem('curPlaySongInfo') || {}, // 当前播放音乐的详细信息
	curPlayTime: storage.getItem('curPlayTime') || 0, // 当前音乐播放到第几秒了
	songCommentObj: storage.getItem('songCommentObj') || {}, // 歌曲评论信息
}

const getters = {
	// 热门评论
	hotCommentsList: state => state.songCommentObj.hotComments || [],
	// 最新评论
	newCommentsList: state => state.songCommentObj.newComments || [],
	// 评论条数
	commentsTotal: state => state.songCommentObj.total || 0,
	// 当前秒数的取整
	curPlayTimeRound: state => ~~state.curPlayTime,

}

const mutations = {
	setCurPlaySongInfo(state, value) {
		state.curPlaySongInfo = value;
		storage.setItem('curPlaySongInfo', value);
	},
	setCurPlayTime(state, value) {
		state.curPlayTime = value;
		storage.setItem('curPlayTime', value);
	},
	setSongCommentObj(state, value) {
		state.songCommentObj = value;
		storage.setItem('songCommentObj', value);
	},
	// 清空评论数据
	deleteSongComments(state) {
		state.songCommentObj = {};
		storage.removeItem('songCommentObj');
	},
}

const actions = {
	async getSongComments({
		commit,
		state
	}, value) {
		let res = await $httpSongInfo.songComments({
			id: value.id || state.curPlaySongInfo.id,
			type: value.type || 0, // 评论的类型
			pageNo: value.pageNo || 1,
			pageSize: value.pageSize || 20,
			sortType: value.sortType || 2,
			cursor: value.cursor || ''
		})
		if (res && res.code == 200) {
			// 判断当页码不为1的时候就追加到原数组之后
			let oldComments = [];
			if (value.pageNo && value.pageNo != 1) {
				oldComments = JSON.parse(JSON.stringify(state.songCommentObj.comments));
			}
			let obj = {
				total: res.data.totalCount,
				comments: oldComments.concat(res.data.comments),
				hasMore: res.data.hasMore
			}
			commit('setSongCommentObj', obj);
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

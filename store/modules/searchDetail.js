import $httpSongInfo from '@/api/songInfo.js';
import storage from '@/utils/storage.js';

const state = {
	searchHistory: storage.getItem('searchHistory') || [], // 搜索历史
}

// const getters = {
// 	// 热门评论
// 	hotCommentsList: state => state.songCommentObj.hotComments || [],
// 	// 最新评论
// 	newCommentsList: state => state.songCommentObj.newComments || [],
// 	// 评论条数
// 	commentsTotal: state => state.songCommentObj.total || 0,

// }

const mutations = {
	setSearchHistory(state, value) {
		state.searchHistory = value;
		storage.setItem('searchHistory', value);
	},
	// 清空搜索历史记录
	clearSearchHistory(state) {
		state.searchHistory = [];
		storage.removeItem('searchHistory');
	}
}

// const actions = {
// 	async getSongComments({
// 		commit,
// 		state
// 	}, value) {
// 		let res = await $httpSongInfo.songComments({
// 			id: value.id || state.curPlaySongInfo.id,
// 			type: value.type || 0, // 评论的类型
// 			pageNo: value.pageNo || 1,
// 			pageSize: value.pageSize || 20,
// 			sortType: value.sortType || 2,
// 			cursor: value.cursor || ''
// 		})
// 		if (res && res.code == 200) {
// 			// 判断当页码不为1的时候就追加到原数组之后
// 			let oldComments = [];
// 			if (value.pageNo && value.pageNo != 1) {
// 				console.log('进到这里了吗', value.pageNo)
// 				oldComments = JSON.parse(JSON.stringify(state.songCommentObj.comments));
// 			}
// 			let obj = {
// 				total: res.data.totalCount,
// 				comments: oldComments.concat(res.data.comments),
// 				hasMore: res.data.hasMore
// 			}
// 			commit('setSongCommentObj', obj);
// 		}
// 	}
// }

export default {
	namespaced: true,
	state,
	// getters,
	mutations,
	// actions
}

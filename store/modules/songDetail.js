const state = {
	curPlaySongInfo: uni.getStorageSync('curPlaySongInfo') || {}, // 当前播放音乐的详细信息
	curPlayTime: uni.getStorageSync('curPlayTime') || 0, // 当前音乐播放到第几秒了
	songCommentObj: uni.getStorageSync('songCommentObj') || {}, // 歌曲评论信息
}

const mutations = {
	setCurPlaySongInfo(state, value) {
		state.curPlaySongInfo = value;
		uni.setStorageSync('curPlaySongInfo', value);
	},
	setCurPlayTime(state, value) {
		state.curPlayTime = value;
		uni.setStorageSync('curPlayTime', value);
	},
	setSongCommentObj(state, value) {
		state.songCommentObj = value;
		uni.setStorageSync('songCommentObj',value);
	}
}

export default {
	namespaced: true,
	state,
	mutations
}

const state = {
	rankList: uni.getStorageSync('rankList') || [], // 排行榜详情
}

const mutations = {
	setRankList(state, value) {
		state.rankList = value;
		uni.setStorageSync('rankList', value);
	}
}

export default {
	namespaced: true,
	state,
	mutations
}

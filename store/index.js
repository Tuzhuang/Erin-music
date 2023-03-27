import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import found from './modules/found.js';
import songDetail from './modules/songDetail.js';

export default new Vuex.Store({
	state: {
		loginToken: uni.getStorageSync('loginToken') || "",
		userInfo: uni.getStorageSync('userInfo') || {}, // 防止为空值
		duData: uni.getStorageInfoSync('duData') || [],
	},
	mutations: {
		setDuData(state, value) {
			console.log('stateValue', value)
			state.duData = value;
			uni.setStorageSync('duData', value);
		},
		removeDuData(state) {
			state.duData = [];
			uni.removeStorageSync('duData');
		},

		// 清空vuex中的数据
		clearStoreData(state) {
			state = {};
			console.log('清空数据', state)
			uni.clearStorageSync();
		},
		// 设置token
		setLoginToken(state, token) {
			state.loginToken = token;
			uni.setStorageSync('loginToken', token);
		},
		// 保存用户登录信息
		setUserInfo(state, info) {
			state.userInfo = info;
			uni.setStorageSync('userInfo', JSON.stringify(info));
		},

	},
	modules: {
		found,
		songDetail
	}
})

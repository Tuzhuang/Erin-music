import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginToken: uni.getStorageSync('loginToken') || "",
		userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {}, // 防止为空值
	},
	mutations: {
		// 设置token
		setLoginToken(state, token) {
			state.loginToken = token;
			uni.setStorageSync('loginToken', token);
		},
		// 保存用户登录信息
		setUserInfo(state, info) {
			state.userInfo = info;
			uni.setStorageSync('userInfo', JSON.stringify(info));
		}
	},
	modules: {

	}
})

// 操作本地数据  2023年3月29日01点36分

export default {
	// 保存数据
	setItem(label, value) {
		uni.setStorageSync(label, JSON.parse(JSON.stringify(value)));
	},
	// 获取数据
	getItem(label) {
		// if(uni.getStorageSync(label)){
		// 	return JSON.parse(uni.getStorageSync(label));
		// }else {
			return uni.getStorageSync(label);
		// }
	},
	// 删除某一项数据
	removeItem(label) {
		uni.removeStorageSync(label);
	},
	// 清空全部数据
	clearAll() {
		uni.clearStorageSync();
	}
}

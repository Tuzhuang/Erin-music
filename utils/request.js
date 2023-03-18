// 封装接口

const baseUrl = "http://192.168.1.160:3000";
// const baseUrl = "http://pgn3c6.natappfree.cc";
const request = options => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method || "GET",
			data: {...options.data,timestamp:new Date().getTime()} || {timestamp:new Date().getTime()},
			headers: { // 自定义请求头信息
				'Authoriztion': uni.getStorageSync('token')
			},
			success: res => {
				resolve(res.data);
			},
			fail: err => {
				console.log('err报错信息', err);
				reject(err);
			}
		})
	})
}
export {
	request
}

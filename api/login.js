import {
	request
} from '@/utils/request.js';

export default {
	async login(data) {
		return await request({
			url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
			method: "POST"
		})
	}
}

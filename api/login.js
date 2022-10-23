import {
	request
} from '@/utils/request.js';

export function login(data) {
	return request({
		url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
		method: "POST"
	})
}

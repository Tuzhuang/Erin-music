// 防抖函数
export const debounce = function(fn, delay = 300) { // 默认为300毫秒
	let timer;
	return function() {
		let args = arguments;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, args); // this指向vue
		}, delay);
	}
}

// 节流函数
export const throttle = function(fn, time = 100) {
	let last;
	let timer;
	let interval = time;
	return function() {
		const _this = this;
		const args = arguments;
		let now = +new Date();
		if (last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(function() {
				last = now;
				fn.apply(_this, args);
			}, interval);
		} else {
			last = now;
			fn.apply(_this, args);
		}
	}
}

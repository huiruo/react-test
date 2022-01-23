import * as Types from './types'

// 初始状态
export const counter = {
	count: 0,
	data: [],
}
export const user = {
	isLogin: false,
	dataArray: ['vue', 'react', 'node'],
}

export const reducer = (state:any, action:any) => {
	const { type, payload } = action
	switch (type) {
		case Types.EXAMPLE_TEST:
			return {
				...state,
				count: payload,
			}
		case Types.GETDATA:
			return {
				...state,
				data: payload,
			}
		case Types.ISLOGIN:
			return {
				...state,
				isLogin: payload,
			}
		default: {
			return state
		}
	}
}

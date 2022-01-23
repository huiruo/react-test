import * as Types from './types'

export const onChangeCount = (count:number) => ({
	type: Types.EXAMPLE_TEST,
	payload: count + 1,
})

const islogin = (payload:boolean) => ({
	type: Types.ISLOGIN,
	payload: payload,
})

export const login = () => {
	return islogin(true)
}

export const logout = () => {
	return islogin(false)
}

export const fetchData = (payload:any) => ({
	type: Types.GETDATA,
	payload: payload,
})

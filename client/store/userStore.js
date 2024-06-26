import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'

export const useUserStore = create(set => ({
	email: '',
	id: '',
	isActivated: false,

	login: async (email, password) => {
		try {
			const { data } = await axios.post(
				`${PREFIX}/api/login`,
				{
					email,
					password
				},
				{
					withCredentials: true
				}
			)
			set({
				email: data.user.email,
				id: data.user.id,
				isActivated: data.user.isActivated
			})
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	},

	registration: async (email, password) => {
		try {
			await axios.post(
				`${PREFIX}/api/registration`,
				{
					email,
					password
				},
				{
					withCredentials: true
				}
			)
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	},

	checkAuth: async () => {
		try {
			const { data } = await axios.get(`${PREFIX}/api/checkAuth`, {
				withCredentials: true
			})

			set({
				email: data.user.email,
				id: data.user.id,
				isActivated: data.user.isActivated
			})

			return true
		} catch (err) {
			set({
				email: '',
				id: '',
				isActivated: ''
			})

			return false
		}
	}
}))

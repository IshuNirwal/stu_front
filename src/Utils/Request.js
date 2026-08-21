import axios from 'axios';
import { getStorage } from './common';
import store from '../store/store';

class Request {
	constructor(dispatch, successFn, errorFn) {
		this.successFn = typeof successFn === 'function' ? successFn : () => {};
		this.errorFn = typeof errorFn === 'function' ? errorFn : () => {};
		this.dispatch = typeof dispatch === 'function' ? dispatch : () => {};
	}

	instance() {
		const headers = {
			"Content-Type": "application/json; charset=UTF-8",
			"Accept": "application/json",
		};

		const token = getStorage("token");
		if (token) {
			headers.Authtoken = token;
		} else {
			headers.Auth = "MjQ4ZmY5MGM0MmM2N2EyOTJlZWE0MTBiNGU2Y2Q2NzU=";
		}

		const instance = axios.create({
			baseURL: '',
			headers,
		});

		return instance;
	}

	/**
	 * GET Requests
	 * @param {string} url
	 * @param {object} params
	 */
	async get(url, params = {}) {
		try {
			const res = await this.instance().get(url, { params });
			const data = res.data ? res.data : null;
			const headers = res.headers ? res.headers : null;
			this.successFn(data, headers);
			return res;
		} catch (error) {
			this.errorFn(error);
			if (error?.response) {
				return error.response;
			}
		}
	}

	/**
	 * POST Requests
	 * @param {string} url
	 * @param {object} params
	 */
	async post(url, params = {}) {
		try {
			const res = await this.instance().post(url, params);
			const { data = {}, status } = res;
			this.successFn(data, status);
			return res;
		} catch (error) {
			this.errorFn(error);
			if (error?.response) {
				return error.response;
			}
		}
	}

	/**
	 * DELETE Requests
	 * @param {string} url
	 * @param {object} params
	 */
	async delete(url, params = {}) {
		try {
			const res = await this.instance().delete(url, { data: params });
			const { data = {}, status } = res;
			this.successFn(data, status);
			return res;
		} catch (error) {
			this.errorFn(error);
			if (error?.response) {
				return error.response;
			}
		}
	}
}

export default Request;



import axios from "axios";
import store from "../store";
const instance = axios.create({
    baseURL: "",
    timeout: 5000
});
// 添加请求拦截器
instance.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        // 在每次请求之前设置token
        config.headers["token"] = store.getters.getToken;
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 封装axios请求
/**
 *
 * @param {*} url
 * @param {*} params
 * @returns
 */
export const get = (url, params) => instance.get(url, { params });
/**
 *
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const post = (url, data) => instance.post(url, data);
/**
 *
 * @param {*} url
 * @param {*} data
 * @returns
 */
export const put = (url, data) => instance.put(url, data);
/**
 *
 * @param {*} url
 * @returns
 */
export const del = url => instance.delete(url);
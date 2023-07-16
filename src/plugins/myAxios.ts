// Set config defaults when creating the instance
import axios, {AxiosInstance} from "axios";


const myAxios = axios.create({
    // 线上地址 production  本地开发环境development
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:8081/api' : 'http://175.178.172.77/api'
    // baseURL: 'http://localhost:8081/api'
    // baseURL: 'http://175.178.172.77/api',
});


myAxios.defaults.withCredentials = true
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // console.log("发个请求")
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // console.log("收个请求")
    if (response.data.code === 40100) {
        const redirectUrl = window.location.href;
        // window.location.href = `/user/login`;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么

    return Promise.reject(error);
});

export default myAxios;

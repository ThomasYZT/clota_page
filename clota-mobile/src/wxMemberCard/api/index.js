/**
 * Created by Sasha on 2018/6/1.
 */
import api from './apiList';
import axios from 'axios';
import config from '@/config/index.js';
import common from '@/assets/js/common';

import { ajaxMethods } from '@/api/index.js'


const instance = axios.create({
    baseURL : config.HOST,
    validateStatus : function (status) {
        return status < 500;
    },
    headers : {
        // 跨域请求 这个配置不能少
        "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8",
        'Accept' : 'application/json'
    }
});

// 响应拦截器校验token，在每一个请求配置之后执行
instance.interceptors.response.use(function (response) {
    if (response.data.message === '请先登录') {
        common.loginOut();
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

//通过axios发送请求
export default {
    /**
     * 获取token参数
     */
    getToken () {
        return localStorage.getItem('token') ? localStorage.getItem('token') : '';
    },
    api : api,
    instance : instance,
    ...ajaxMethods
};
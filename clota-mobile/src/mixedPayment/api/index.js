
import api from './apiList.js';
import axios from 'axios';
import config from '@/config/index.js';

import { ajaxMethods } from '../../api/index.js';

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
    //不需要token的post请求
    postWithoutToken : ajaxMethods['postWithoutToken']
};

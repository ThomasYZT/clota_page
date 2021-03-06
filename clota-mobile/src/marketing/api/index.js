/**
 * Created by Sasha on 2018/6/1.
 */
import api from './apiList.js';
import axios from 'axios';
import config from '@/config/index.js';

import { ajaxMethods } from '../../api/index.js';
import store from "../../store";
import router from "../../router";

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
//不需要提示的code
let codeExclude = ['MK013','OD009','400','S018'];
// 响应拦截器校验token，在每一个请求配置之后执行
instance.interceptors.response.use(function (response) {
    if (response.data.message === '请先登录') {
        localStorage.removeItem('marketToken');
        router.push({
            name : 'marketingLogin',
            query : {
                companyCode : store.getters.companyCode
            }
        },() => {
            store.commit('marketUpdateUserInfo');
        });
    }
    //全局配置提示错误信息
    if (!response.data.success &&
        response.data.code &&
        response.data.code !== '300' &&
        response.data.code !== '100' &&
        !codeExclude.includes(response.data.code)) {
        store.dispatch('showToast','errorMsg.' + response.data.code);
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
        return localStorage.getItem('marketToken') ? localStorage.getItem('marketToken') : '';
    },
    api : api,
    instance : instance,
    ...ajaxMethods
};

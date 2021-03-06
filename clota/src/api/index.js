/**
 * Created by Sasha on 2018/6/1.
 */
import api from './apiList';
import axios from 'axios';
import querystring from 'querystring';
import config from '../config/index.js';
import common from '../assets/js/common';
import store from '../store/index';

let cancelTokenCollection = {};
let baseUrl = '';

//如果是开发环境则打开代理
if (process.env.NODE_ENV === 'development') {
    baseUrl = '';
} else {
    baseUrl = '';
}

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
    if (response.status !== 200) {
        store.dispatch('showErrToast','systemErr');
    } else {
        // if (response.data.code === '300') {
        //     store.dispatch('showErrToast','interfaceError');
        // }
        if (response.data.message === '请先登录') {
            common.loginOut();
        }
        return response;
    }
}, function (error) {
    if (error.toString() === 'Error: Network Error') {
        store.dispatch('showErrToast','networkError');
    } else {
        store.dispatch('showErrToast','systemErr');
    }
    return Promise.reject(error);
});

//通过axios发送请求
export default {
    /**
     * 获取token参数
     */
    getToken () {
        return sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    },
    /**
     * get 请求
     * @param urlKey 对应API 中的urlkey
     * @param paramObj  发送ajax 传递的参数对象
     * @param showLoading  是否显示加载中的图标
     * @returns {promise} 返回promise对象
     */
    get (urlKey, paramObj,showLoading = true) {
        let myConfig = {
            params : paramObj,
            headers : {
                token : this.getToken()
            }
        };
        if (showLoading) {
            store.commit('changePromisings','add');
        }
        return instance.get(baseUrl + api[urlKey], myConfig).then(res => {
            if (!res.data && typeof res.data === 'object' && !res.data.success) {
                console.warn(`接口名: ${api[urlKey]}, 错误信息: ${res.data.message}`);
            }
            return res.data;
        }).catch((err) => {
            console.error(`接口名: ${api[urlKey]}, 错误信息: `, err);
            // store.dispatch('showErrToast','systemErr');
        }).finally(() => {
            if (showLoading) {
                store.commit('changePromisings','del');
            }
        });
    },

    /**
     * post 请求
     * @param urlKey 对应API 中的urlkey
     * @param paramObj  发送ajax 传递的参数对象
     * @param config  请求头信息
     * @param showLoading  是否显示加载中的图标
     * @returns {promise} 返回promise对象
     */
    post (urlKey, paramObj, config = null,showLoading = true) {
        let myConfig = {
            cancelToken : new axios.CancelToken(function (cancel) {
                cancelTokenCollection[urlKey] = cancel;
            })
        };

        // 如果是登录，则不需要传递token
        if (urlKey !== 'login') {
            myConfig.headers = {
                token : this.getToken()
            };
        }

        if (showLoading) {
            store.commit('changePromisings','add');
        }

        if (config) {
            if (config.headers) {
                myConfig.headers = Object.assign(myConfig.headers, config.headers);
            }
        }
        let needStringify = myConfig.headers ? myConfig.headers['Content-Type'] !== 'application/json;charset-UTF-8' : true;
        return instance.post(baseUrl + api[urlKey], needStringify ? querystring.stringify(paramObj) : paramObj, myConfig).then(res => {
            if (!res.data && typeof res.data === 'object' && !res.data.success) {
                console.warn(`接口名: ${api[urlKey]}, 错误信息: ${res.data.message}`);
            }
            return res.data;
        }).catch((err) => {
            console.error(`接口名: ${api[urlKey]}, 错误信息: `, err);
            // store.dispatch('showErrToast','systemErr');
            return err;
        }).finally(() => {
            if (showLoading) {
                store.commit('changePromisings','del');
            }
        });
    },

    /**
     * export 导出
     * @param urlKey 对应API 中的urlkey
     * @param paramObj  传递的参数对象
     */
    export (urlKey, paramObj) {
        let token = this.getToken();
        return config.HOST + baseUrl + api[urlKey] + '?token=' + token + (paramObj ? '&' + querystring.stringify(paramObj) : '');
    },

    /**
     * 处理并发请求的助手函数
     * @param iterable  是一个可以迭代的参数如数组等
     */
    all (iterable) {
        return axios.all(iterable).then(
            axios.spread((...res) => {
                return res;
            })
        );
    },

    /**
     * 终止 ajax 请求， 如 xhr 的 abort 方法
     * @param urlKey 对应API 中的urlkey
     */
    cancel (urlKey) {
        if (!cancelTokenCollection[urlKey]) {
            return;
        }
        cancelTokenCollection[urlKey]();
    },
    /**
     * 上传文件
     * @param urlKey
     * @param paramObj
     * @returns {*|promise}
     */
    uploadFile : function (urlKey, paramObj) {
        let myConfig = {
            cancelToken : new axios.CancelToken(function (cancel) {
                cancelTokenCollection[urlKey] = cancel;
            }),
            headers : {
                token : this.getToken(),
                'Content-type' : 'multipart/form-data'
            }
        };
        return instance.post(baseUrl + api[urlKey], paramObj, myConfig).then(res => {
            if (!res.data && typeof res.data === 'object' && !res.data.success) {
                console.warn(`接口名: ${api[urlKey]}, 错误信息: ${res.data.message}`);
            }
            return res.data;
        }).catch((err) => {
            console.error(`接口名: ${api[urlKey]}, 错误信息: `, err);
            // store.dispatch('showErrToast','systemErr');
            return err;
        });
    },
};

/**
 * Created by Sasha on 2018/6/1.
 */
import axios from 'axios';
import querystring from 'querystring';
import config from '../config/index.js';
import store from '../store/index';


let cancelTokenCollection = {};
let baseUrl = '';

//如果是开发环境则打开代理
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'api';
} else {
    baseUrl = '';
}

//网络错误提示
function showNetWorkError (err) {
    if (err.toString() === 'Error: Network Error') {
        store.commit('updateShowNetworkError','netNotGood');
    } else {
        store.commit('updateShowNetworkError','systemError');
    }
}
export default {};
//通过axios发送请求
// export default {
//     /**
//      * 获取token参数
//      */
//     getToken () {
//         return localStorage.getItem('token') ? localStorage.getItem('token') : '';
//     },
//     /**
//      * get 请求
//      * @param urlKey 对应API 中的urlkey
//      * @param paramObj  发送ajax 传递的参数对象
//      * @returns {promise} 返回promise对象
//      */
//     get (urlKey, paramObj) {
//         let myConfig = {
//             params : paramObj,
//             headers : {
//                 token : this.getToken()
//             }
//         };
//         store.commit('changePromisings','add');
//         return instance.get(baseUrl + api[urlKey], myConfig).then(res => {
//             if (!res.data && typeof res.data === 'object' && !res.data.success) {
//                 console.warn(`接口名: ${api[urlKey]}, 错误信息: ${res.data.message}`);
//             }
//             return res.data;
//         }).catch((err) => {
//             showNetWorkError(err);
//             console.error(`接口名: ${api[urlKey]}, 错误信息: `, err);
//         }).finally(() => {
//             store.commit('changePromisings','del');
//         });
//     },
//
//     /**
//      * post 请求
//      * @param urlKey 对应API 中的urlkey
//      * @param paramObj  发送ajax 传递的参数对象
//      * @returns {promise} 返回promise对象
//      */
//     post (urlKey, paramObj, config = null) {
//         let myConfig = {
//             cancelToken : new axios.CancelToken(function (cancel) {
//                 cancelTokenCollection[urlKey] = cancel;
//             })
//         };
//
//         // 如果是登录，则不需要传递token
//         if (urlKey !== 'login' || urlKey !== 'getCode') {
//             myConfig.headers = {
//                 // token : this.getToken()
//                 token : '49dHB8a+Udm8vOOZPo826uY+tyWSu1RN/IIq4lrgIdvFk1gacT3xw2mNsn+Swf3MgkwqwmsaILPdp16CsJBc4NlhxRyz/oG1Tc+dDS+5hyE='
//             };
//         }
//
//         if (config) {
//             if (config.headers) {
//                 myConfig.headers = Object.assign(myConfig.headers, config.headers);
//             }
//         }
//         let needStringify = myConfig.headers ? myConfig.headers['Content-Type'] !== 'application/json;charset-UTF-8' : true;
//         store.commit('changePromisings','add');
//         return instance.post(baseUrl + api[urlKey], needStringify ? querystring.stringify(paramObj) : paramObj, myConfig).then(res => {
//             if (!res.data && typeof res.data === 'object' && !res.data.success) {
//                 console.warn(`接口名: ${api[urlKey]}, 错误信息: ${res.data.message}`);
//             }
//             return res.data;
//         }).catch((err) => {
//             showNetWorkError(err);
//             console.error(`接口名: ${api[urlKey]}, 错误信息: `, err);
//             return err;
//         }).finally(() => {
//             store.commit('changePromisings','del');
//         });
//     },
//
//     /**
//      * export 导出
//      * @param urlKey 对应API 中的urlkey
//      * @param paramObj  传递的参数对象
//      */
//     export (urlKey, paramObj) {
//         let token = this.getToken();
//         return config.HOST + baseUrl + api[urlKey] + '?token=' + token + (paramObj ? '&' + querystring.stringify(paramObj) : '');
//     },
//
//     /**
//      * 处理并发请求的助手函数
//      * @param iterable  是一个可以迭代的参数如数组等
//      */
//     all (iterable) {
//         return axios.all(iterable).then(
//             axios.spread((...res) => {
//                 return res;
//             })
//         );
//     },
//
//     /**
//      * 终止 ajax 请求， 如 xhr 的 abort 方法
//      * @param urlKey 对应API 中的urlkey
//      */
//     cancel (urlKey) {
//         if (!cancelTokenCollection[urlKey]) {
//             return;
//         }
//         cancelTokenCollection[urlKey]();
//     },
//     /**
//      * 上传文件
//      * @param urlKey
//      * @param paramObj
//      * @returns {*|promise}
//      */
//     uploadFile : function (urlKey, paramObj) {
//         let myConfig = {
//             cancelToken : new axios.CancelToken(function (cancel) {
//                 cancelTokenCollection[urlKey] = cancel;
//             }),
//             headers : {
//                 token : this.getToken(),
//                 'Content-type' : 'multipart/form-data'
//             }
//         };
//         store.commit('changePromisings','add');
//         return instance.post(baseUrl + api[urlKey], paramObj, myConfig).then(res => {
//             if (!res.data && typeof res.data === 'object' && !res.data.success) {
//                 console.warn(`接口名: ${api[urlKey]}, 错误信息: ${res.data.message}`);
//             }
//             return res.data;
//         }).catch((err) => {
//             showNetWorkError(err);
//             console.error(`接口名: ${api[urlKey]}, 错误信息: `, err);
//             return err;
//         }).finally(() => {
//             store.commit('changePromisings','del');
//         });
//     },
// };

export const ajaxMethods = {
    /**
     * get 请求
     * @param urlKey 对应API 中的urlkey
     * @param paramObj  发送ajax 传递的参数对象
     * @returns {promise} 返回promise对象
     */
    get (urlKey, paramObj) {
        let myConfig = {
            params : paramObj,
            headers : {
                token : this.getToken()
            }
        };
        store.commit('changePromisings','add');
        return this.instance.get(baseUrl + this.api[urlKey], myConfig).then(res => {
            if (!res.data && typeof res.data === 'object' && !res.data.success) {
                console.warn(`接口名: ${this.api[urlKey]}, 错误信息: ${res.data.message}`);
            }
            return res.data;
        }).catch((err) => {
            showNetWorkError(err);
            console.error(`接口名: ${this.api[urlKey]}, 错误信息: `, err);
        }).finally(() => {
            store.commit('changePromisings','del');
        });
    },
    /**
     * post 请求
     * @param urlKey 对应API 中的urlkey
     * @param paramObj  发送ajax 传递的参数对象
     * @param config
     * @returns {promise} 返回promise对象
     */
    post (urlKey, paramObj, config = null, showLoading = true) {
        let myConfig = {
            cancelToken : new axios.CancelToken(function (cancel) {
                cancelTokenCollection[urlKey] = cancel;
            })
        };

        // 如果是登录，则不需要传递token
        if (urlKey !== 'login' || urlKey !== 'getCode') {
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
        return this.instance.post(baseUrl + this.api[urlKey], needStringify ? querystring.stringify(paramObj) : paramObj, myConfig).then(res => {
            if (!res.data && typeof res.data === 'object' && !res.data.success) {
                console.warn(`接口名: ${this.api[urlKey]}, 错误信息: ${res.data.message}`);
            }
            return res.data;
        }).catch((err) => {
            showNetWorkError(err);
            console.error(`接口名: ${this.api[urlKey]}, 错误信息: `, err);
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
        return config.HOST + baseUrl + this.api[urlKey] + '?token=' + token + (paramObj ? '&' + querystring.stringify(paramObj) : '');
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
        store.commit('changePromisings','add');
        return this.instance.post(baseUrl + this.api[urlKey], paramObj, myConfig).then(res => {
            if (!res.data && typeof res.data === 'object' && !res.data.success) {
                console.warn(`接口名: ${this.api[urlKey]}, 错误信息: ${res.data.message}`);
            }
            return res.data;
        }).catch((err) => {
            showNetWorkError(err);
            console.error(`接口名: ${this.api[urlKey]}, 错误信息: `, err);
            return err;
        }).finally(() => {
            store.commit('changePromisings','del');
        });
    },
};

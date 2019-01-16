import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
// import ajax from '../api/index';
// import defaultsDeep from 'lodash/defaultsDeep';
import { memberState,memberGetters,memberMutations,memberActions } from '../member/store/index';
import { marketingState,marketingGetters,marketMutations,marketActions } from '../marketing/store/index';

Vue.use(Vuex);


export default new Vuex.Store({
    state : {
        //当前选择的语言
        lang : i18n.locale,
        //页面是否显示加载中
        isLoading : false,
        //当前正在加载中的接口个数
        promisings : 0,
        //随机数，用于更新组件
        hashKey : '',
        //显示网路错误提示框
        showNetworkError : false,
        //错误码
        errCode : '',
        //判断当前是否在微信当中打开
        isWeixin : null,
        //是否可以使用微信jsdk
        weixinIsConfiged : true,
        //公司id
        companyCode : '00000194',
        //来源信息，区分全民营销和会员系统
        sourceInfo : '',
        ...memberState,
        ...marketingState,
    },
    getters : {
        //来源信息
        sourceInfo : state => {
            let sourceInfo = localStorage.getItem('sourceInfo');
            if (state.sourceInfo) {
                return state.sourceInfo;
            } else {
                return sourceInfo;
            }
        },
        //公司id
        companyCode : state => {
            let companyCodeStored = localStorage.getItem('companyCode');
            if (state.companyCode) {
                return state.companyCode;
            } else {
                return companyCodeStored;
            }
            //
            // localStorage.setItem('companyCode',companyCode);
            // let companyCode = state.companyCode;
            // let url = location.href;
            // if (url.indexOf('?') !== -1) {
            //     let query = url.split("?")[1];
            //     let queryArr = query.split("&");
            //     queryArr.forEach(function (item) {
            //         let key = item.split("=")[0];
            //         let value = item.split("=")[1];
            //         if (key === 'companyCode') {
            //             companyCode = value;
            //         }
            //     });
            //     return companyCode;
            // } else {
            //     return companyCode;
            // }
        },
        //当前语言状态
        lang : state => {
            let lang = localStorage.getItem('lang');
            state.lang = lang ? lang : state.lang;
            return state.lang;
        },
        //是否显示页面加载中
        isLoading : state => {
            return state.isLoading;
        },
        hashKey : state => {
            return state.hashKey;
        },
        //是否显示网路错误提示框
        showNetworkError : state => {
            return state.showNetworkError;
        },
        //错误码
        errCode : state => {
            return state.errCode;
        },
        //判断当前是否在微信中打开
        isWeixin : state => {
            if (state.isWeixin === null) {
                let ua = navigator.userAgent.toLowerCase();
                state.isWeixin = ua.indexOf('micromessenger') !== -1;
            }
            return state.isWeixin;
        },
        //微信是否可以使用jsdk
        weixinIsConfiged : state => {
            return state.isWeixin && state.weixinIsConfiged;
        },
        ...memberGetters,
        ...marketingGetters,
    },
    mutations : {
        //设置语言
        setLang (state, lang) {
            //保存当前的语言状态
            localStorage.setItem('lang', lang);
            i18n.locale = state.lang = lang;
        },
        //改变是否加载中的状态
        changeLoadingStatus (state,loading) {
            state.isLoading = loading;
        },
        //更改请求中接口的个数
        changePromisings (state,type) {
            if (type === 'add') {
                state.promisings++;
            } else if (type === 'del') {
                state.promisings--;
            }
            if (state.promisings > 0) {
                state.isLoading = true;
            } else {
                setTimeout(() => {
                    state.isLoading = false;
                },100);
            }
        },
        //更新随机数
        updateHashKey (state) {
            state.hashKey = Math.random();
        },
        /**
         * 更新网络状态提示
         */
        updateShowNetworkError (state,status) {
            state.showNetworkError = status;
        },
        /**
         * 更新微信配置
         * @param state
         * @param status
         */
        updateWeixinConfig ( state,status) {
            state.weixinIsConfiged = status;
        },
        /**
         * 更新companyCode
         * @param state
         * @param companyCode
         */
        updateCompanyCode (state, companyCode) {
            state.companyCode = companyCode;
            localStorage.setItem('companyCode',companyCode);
        },
        /**
         * 更新source信息
         * @param state
         * @param sourceInfo
         */
        updateSourceInfo (state,sourceInfo) {
            state.sourceInfo = sourceInfo;
            localStorage.setItem('sourceInfo',sourceInfo);
        },
        ...memberMutations,
        ...marketMutations
    },
    actions : {
        ...memberActions,
        ...marketActions,
        /**
         * 获取位置信息
         * @param{Object} store
         */
        getLocation (store) {
            if (store.getters.isWeixin) {
                Vue.prototype.$weixin.getLocation({
                    success (res) {
                        console.log(res);
                    }
                });
            }
        },
        /**
         * vuex错误提示信息
         * @param{Object} store
         * @param{String} errCode 错误码
         */
        showToast (store, errCode) {
            store.state.errCode = errCode;
            setTimeout(() => {
                store.state.errCode = '';
            },100);
        },
    }
});


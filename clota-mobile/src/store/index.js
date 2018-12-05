import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import ajax from '../api/index';
import defaultsDeep from 'lodash/defaultsDeep';
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
        ...memberState,
        ...marketingState
    },
    getters : {
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
        ...memberMutations,
        ...marketMutations
    },
    actions : {
        ...memberActions,
        ...marketActions
    }
});


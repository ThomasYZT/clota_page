import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //当前选择的语言
        lang: i18n.locale,
        //用户信息
        userInfo : {},
        //会员卡信息
        cardInfo: {},
        //页面是否显示加载中
        isLoading : false,
        //当前正在加载中的接口个数
        promisings : 0,
        //随机数，用于更新组件
        hashKey : '',
        //是否显示键盘
        showKeyBoard : false,
        //显示网路错误提示框
        showNetworkError : false
    },
    getters: {
        //当前语言状态
        lang: state => {
            let lang = localStorage.getItem('lang');
            state.lang = lang ? lang : state.lang;
            return state.lang;
        },
        //用户信息
        userInfo : state => {
            return state.userInfo;
        },
        //会员卡信息
        cardInfo: state => {
            return state.cardInfo;
        },
        //是否显示页面加载中
        isLoading : state => {
            return state.isLoading;
        },
        hashKey : state => {
            return state.hashKey;
        },
        //是否显示键盘
        showKeyBoard : state => {
            return state.showKeyBoard;
        },
        //是否显示网路错误提示框
        showNetworkError : state => {
            return state.showNetworkError;
        }
    },
    mutations: {
        //设置语言
        setLang(state, lang) {
            //保存当前的语言状态
            localStorage.setItem('lang', lang);
            i18n.locale = state.lang = lang;
        },
        //改变是否加载中的状态
        changeLoadingStatus (state,loading){
            state.isLoading = loading;
        },
        //更改请求中接口的个数
        changePromisings (state,type){
            if(type === 'add'){
                state.promisings++;
            }else if(type === 'del'){
                state.promisings--;
            }
            if(state.promisings > 0){
                state.isLoading = true;
            }else{
                setTimeout(() => {
                    state.isLoading = false;
                },100);
            }
        },
        //更新随机数
        updateHashKey (state) {
            state.hashKey = Math.random();
        },
        //更改键盘状态
        updateKeyBoardStatus (state,status ){
            state.showKeyBoard = status;
        },
        /**
         * 更新用户信息
         */
        updateUserInfo ( state ) {
            //获取保存到本地的用户信息
            let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
            if(userInfo && Object.keys(userInfo).length > 0){
                state.userInfo = userInfo;
            }else{
                state.userInfo = {};
            }
        },
        /**
         * 更新会员卡信息
         * @param state
         */
        updateCardInfo ( state ) {
            //获取保存到本地的会用卡信息
            let cardInfo = localStorage.getItem('cardInfo') ? JSON.parse(localStorage.getItem('cardInfo')) : {};
            if(cardInfo && Object.keys(cardInfo).length > 0){
                state.cardInfo = cardInfo;
            }else{
                state.cardInfo = {};
            }
        },
        /**
         * 更新网络状态提示
         */
        updateShowNetworkError (state,status) {
            state.showNetworkError = status;
        }
    },
    actions: {
    }
});

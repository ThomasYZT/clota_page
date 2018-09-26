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
        showKeyBoard : false
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
                },200);
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
        //登陆设置用户信息
        setUserInfo ( state, data ) {
            state.userInfo = data;
        },
        //更新用户信息
        updateUserinfo( state, data ) {
            state.userInfo = Object.assign({}, state.userInfo, data)
        },
        //登陆设置用户会员卡信息
        setCardInfo ( state, data ) {
            state.cardInfo = data;
        },
        //更新用户会员卡信息
        updateCardInfo( state, data ) {
            state.cardInfo = Object.assign({}, state.cardInfo, data)
        }
    },
    actions: {
        setCardInfo: ({ commit }, data) => commit('setCardInfo', data),
        updateCardInfo: ({ commit }, data) => commit('updateCardInfo', data),
        setUserInfo: ({ commit }, data) => commit('setUserInfo', data),
        updateUserinfo: ({ commit }, data) => commit('updateUserinfo', data),
    }
});

import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import ajax from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        //当前选择的语言
        lang : i18n.locale,
        //用户信息
        userInfo : {},
        //会员卡信息
        cardInfo : {},
        //会员卡列表信息
        cardInfoList : {},
        //页面是否显示加载中
        isLoading : false,
        //当前正在加载中的接口个数
        promisings : 0,
        //随机数，用于更新组件
        hashKey : '',
        //是否显示键盘
        showKeyBoard : false,
        //显示网路错误提示框
        showNetworkError : false,
        //用户是否登陆
        isLogin : false,
        //公司id
        companyCode : '124',
        //companyCode : '1045244656750825472',
        //companyCode : '1037976274619994114' //肖邦景区
        //companyCode : '121321' //信鸥互联 测试环境
    },
    getters : {
        //当前语言状态
        lang : state => {
            let lang = localStorage.getItem('lang');
            state.lang = lang ? lang : state.lang;
            return state.lang;
        },
        //用户信息
        userInfo : state => {
            return state.userInfo;
        },
        //会员卡信息
        cardInfo : state => {
            return state.cardInfo;
        },
        //会员卡列表信息
        cardInfoList : state => {
            return state.cardInfoList;
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
        },
        //公司id
        companyCode : state => {
            return state.companyCode;
        },
        //是否登陆
        isLogin : state => {
            return state.isLogin;
        }
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
        //更改键盘状态
        updateKeyBoardStatus (state,status ) {
            state.showKeyBoard = status;
        },
        /**
         * 更新用户信息
         */
        updateUserInfo ( state, newUserInfo ) {
            //更新本地、vuex用户信息
            if (newUserInfo) {
                state.userInfo = newUserInfo;
                localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
            //获取保存到本地的用户信息，更新vuex
            } else {
                let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
                if (userInfo && Object.keys(userInfo).length > 0) {
                    state.userInfo = userInfo;
                } else {
                    state.userInfo = {};
                }
            }
        },
        /**
         * 更新会员卡信息
         * @param state
         */
        updateCardInfo ( state, newCardInfo ) {
            if (newCardInfo && Object.keys(newCardInfo).length > 0) {
                //设置当前会员卡信息
                state.cardInfo = newCardInfo;
                localStorage.setItem('cardInfo', JSON.stringify(newCardInfo));
            } else {
                let cardInfo = localStorage.getItem('cardInfo') && localStorage.getItem('cardInfo') !== 'undefined' ? JSON.parse(localStorage.getItem('cardInfo')) : {};
                if (cardInfo && Object.keys(cardInfo).length > 0) {
                    //更新vuex当前会用卡信息
                    state.cardInfo = cardInfo;
                } else {
                    //初始设置本地、vuex当前会员卡信息
                    state.cardInfo = state.cardInfoList[0];
                    localStorage.setItem('cardInfo', JSON.stringify(state.cardInfo));
                }
            }
        },
        /**
         * 更新会员卡列表信息
         * @param state
         */
        updateCardInfoList ( state, newCardInfoList ) {
            if (newCardInfoList && Object.keys(newCardInfoList).length > 0) {
                //设置本地、vuex卡列表信息
                state.cardInfoList = newCardInfoList;
                localStorage.setItem('cardInfoList', JSON.stringify(newCardInfoList));
            } else {
                //更新vuex卡列表信息
                let cardInfoList = localStorage.getItem('cardInfoList') ? JSON.parse(localStorage.getItem('cardInfoList')) : [];
                if (cardInfoList && Object.keys(cardInfoList).length > 0) {
                    state.cardInfoList = cardInfoList;
                } else {
                    state.cardInfoList = {};
                }
            }
        },
        /**
         * 更新登陆状态
         * @param state
         */
        updateLoginStatus ( state ) {
            let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
            if (userInfo && Object.keys(userInfo).length > 0) {
                state.isLogin = true;
            } else {
                state.isLogin = false;
            }
        },
        /**
         * 更新网络状态提示
         */
        updateShowNetworkError (state,status) {
            state.showNetworkError = status;
        },
        //更新公司编码
        updateCompanyCode (state,companyCode) {
            state.showNetworkError = companyCode;
        }
    },
    actions : {
        //获取会员卡列表
        getCardListInfo ({ state, commit, dispatch }) {
            return new Promise((resolve, reject) => {
                ajax.post('queryMemberCardList', {
                    memberId : state.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        let memberCardList = res.data ? res.data : [];
                        if (memberCardList.length > 0) {
                            //存储卡列表数据
                            commit('updateCardInfoList', memberCardList);
                            commit('updateCardInfo', memberCardList[0]);
                            resolve();
                        } else {
                            //会员卡列表数据为空
                            commit('updateCardInfoList', []);
                            commit('updateCardInfo', {});
                            dispatch('showToast', 'userHasNoCard');
                            reject();
                        }
                    } else {
                        commit('updateCardInfoList', []);
                        commit('updateCardInfo', {});
                        dispatch('showToast', 'getDataFailure');
                        reject();
                    }
                });
            })
        }
    },
    /**
     * vuex错误提示信息
     * @param store
     * @param msg
     */
    showToast (store, msg) {
        Vue.prototype.$vux.toast.text(i18n.messages[i18n.locale][msg]);
    }
});


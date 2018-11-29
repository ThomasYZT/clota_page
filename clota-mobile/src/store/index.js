import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/lang/lang.config';
import ajax from '../api/index';
import defaultsDeep from 'lodash/defaultsDeep';

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
        cardInfoList : [],
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
        companyCode : '10000059',
        //错误码
        errCode : '',
        //判断当前是否在微信当中打开
        isWeixin : null,
        //微信jsdk是否可以使用
        weixinIsConfiged : true
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
            let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
            if (!state.userInfo || Object.keys(state.userInfo).length < 1) {
                state.userInfo = userInfo;
            }
            return state.userInfo;
        },
        //会员卡信息
        cardInfo : state => {
            let cardInfo = localStorage.getItem('cardInfo') && localStorage.getItem('cardInfo') !== 'undefined' ? JSON.parse(localStorage.getItem('cardInfo')) : {};
            if (cardInfo && Object.keys(cardInfo).length > 0) {
                state.cardInfo = cardInfo;
            }
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
            let url = location.href;
            let companyCode = '';
            if (url.indexOf('?') !== -1) {
                let query = url.split("?")[1];
                let queryArr = query.split("&");
                queryArr.forEach(function (item) {
                    let key = item.split("=")[0];
                    let value = item.split("=")[1];
                    if (key === 'companyCode') {
                        companyCode = value;
                    }
                });
                if (companyCode) {
                    return companyCode;
                } else {
                    return state.companyCode;
                }
            } else {
                return state.companyCode;
            }
        },
        //是否登陆
        isLogin : state => {
            let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
            if (userInfo && Object.keys(userInfo).length > 0) {
                state.isLogin = true;
            } else {
                state.isLogin = false;
            }
            return state.isLogin;
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
         * @param{Object} state vuex中存储的信息
         * @param{Object} newUserInfo 用户信息
         */
        updateUserInfo ( state, newUserInfo ) {
            //更新本地、vuex用户信息
            if (newUserInfo && Object.keys(newUserInfo).length > 0) {
                state.userInfo = newUserInfo;
                localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
            } else {//获取保存到本地的用户信息，更新vuex
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
         * @param{Object} state
         * @param{Object} newCardInfo 会员卡信息
         */
        updateCardInfo ( state, newCardInfo ) {
            if (newCardInfo && Object.keys(newCardInfo).length > 0) {
                //设置当前会员卡信息
                state.cardInfo = newCardInfo;
                localStorage.setItem('cardInfo', JSON.stringify(newCardInfo));
                this.commit('updateUserInfo',defaultsDeep({ cardId : newCardInfo.id }, state.userInfo));
            } else {
                state.cardInfo = (state.cardInfoList && state.cardInfoList.length > 0) ? state.cardInfoList[0] : {};
                localStorage.setItem('cardInfo', JSON.stringify(state.cardInfo));
            }
        },
        /**
         * 更新会员卡列表信息
         * @param state
         * @param newCardInfoList
         */
        updateCardInfoList ( state, newCardInfoList ) {
            if (newCardInfoList && Object.keys(newCardInfoList).length > 0) {
                //设置本地、vuex卡列表信息
                state.cardInfoList = newCardInfoList;
                localStorage.setItem('cardInfoList', JSON.stringify(newCardInfoList));
            } else {
                state.cardInfoList = [];
                localStorage.setItem('cardInfoList', JSON.stringify(state.cardInfoList));
            }
            //更新了卡列表信息后，需要更新当前选择的卡信息
            let cardInfoList = state.cardInfoList;
            if ( cardInfoList && cardInfoList.length > 0 ) {
                if (this.getters.cardInfo && Object.keys(this.getters.cardInfo).length > 0 ) {
                    for (let i = 0,j = cardInfoList.length; i < j; i++ ) {
                        if (cardInfoList[i]['id'] === this.getters.cardInfo['id']) {
                            this.commit('updateCardInfo',cardInfoList[i]);
                            return;
                        }
                    }
                    this.commit('updateCardInfo',cardInfoList[0]);
                } else {
                    this.commit('updateCardInfo',cardInfoList[0]);
                }
            } else {
                this.commit('updateCardInfo',{});
            }
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
        }
    },
    actions : {
        //获取会员卡列表
        getCardListInfo ({ commit, dispatch }) {
            return new Promise((resolve, reject) => {
                ajax.post('queryMemberCardList', {
                    memberId : this.getters.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        let memberCardList = res.data ? res.data : [];
                        if (memberCardList.length > 0) {
                            //存储卡列表数据
                            commit('updateCardInfoList', memberCardList);
                            resolve();
                        } else {
                            //会员卡列表数据为空
                            commit('updateCardInfoList', []);
                            dispatch('showToast', 'userHasNoCard');
                            reject();
                        }
                    } else {
                        commit('updateCardInfoList', []);
                        dispatch('showToast', 'getDataFailure');
                        reject();
                    }
                }).catch(() => {
                    reject();
                });
            });
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



import defaultsDeep from 'lodash/defaultsDeep';
export const memberState = {
    //用户信息
    userInfo : {},
    //会员卡信息
    cardInfo : {},
    //会员卡列表信息
    cardInfoList : [],
    //当前正在加载中的接口个数
    promisings : 0,
    //随机数，用于更新组件
    hashKey : '',
    //是否显示键盘
    showKeyBoard : false,
    //用户是否登录
    isLogin : false,
    //错误码
    errCode : '',
    //会员配置信息
    memberConfigInfo : {},
    //微信配置信息
    wxMpSet : {}
};

export const memberGetters = {
    //用户信息
    userInfo : state => {
        let userInfo = {};
        try {
            userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        } catch (e) {
            console.error(e);
        }
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
        let cardInfoList = localStorage.getItem('cardInfoList') && localStorage.getItem('cardInfoList') !== 'undefined' ? JSON.parse(localStorage.getItem('cardInfoList')) : [];
        if (cardInfoList && Object.keys(cardInfoList).length > 0) {
            state.cardInfoList = cardInfoList;
        }
        return state.cardInfoList;
    },
    hashKey : state => {
        return state.hashKey;
    },
    //是否显示键盘
    showKeyBoard : state => {
        return state.showKeyBoard;
    },
    //是否登录
    isLogin : state => {
        let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        state.isLogin = userInfo && Object.keys(userInfo).length > 0;
        return state.isLogin;
    },
    //会员配置信息
    memberConfigInfo : state => {
        let memberConfigInfo = {};
        try {
            memberConfigInfo = localStorage.getItem('memberConfigInfo') ? JSON.parse(localStorage.getItem('memberConfigInfo')) : {};
        } catch (e) {
            memberConfigInfo = {};
        }
        if (state.memberConfigInfo && Object.keys(state.memberConfigInfo).length > 0) {
            return state.memberConfigInfo;
        } else {
            return memberConfigInfo;
        }
    },
    wxMpSet : state => {
        return state.wxMpSet;
    }
};

export const memberMutations = {
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
     * 更新会员配置信息
     * @param{Object} state
     * @param{Object} memberConfigInfo 会员配置信息
     */
    updateMemberConfig (state, memberConfigInfo) {
        localStorage.setItem('memberConfigInfo',JSON.stringify(memberConfigInfo));
        state.memberConfigInfo = memberConfigInfo;
    },
    /**
     * 更新微信配置信息
     * @param state
     * @param wxMpSet
     */
    updateWxMpSet (state, wxMpSet) {
        state.wxMpSet = wxMpSet;
    }
};

export const memberActions = {
    //获取会员配置信息
    getMemberConfigInfo ({ commit, dispatch }) {
        const ajax = require('../api/index').default;
        return new Promise((resolve,reject) => {
            ajax.post('getMemberServiceSetting',{
                serviceCode : 'member',
                orgId : this.getters.cardInfo.orgId,
            }).then(res => {
                if (res.success && res.data) {
                    if (res.data.cardType) {
                        //更新会员配置
                        commit('updateMemberConfig', res.data);
                        resolve();
                    } else {
                        reject('serviceError');
                    }
                } else {
                    reject();
                }
            });
        });
    },
    //获取会员卡列表
    getCardListInfo ({ commit, dispatch }) {
        const ajax = require('../api/index').default;
        dispatch('queryMemberWxMpSet');
        return Promise.all([
            new Promise((resolve, reject) => {
                ajax.post('queryMemberCardList', {
                    memberId : this.getters.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        let memberCardList = res.data ? res.data : [];
                        if (memberCardList.length > 0) {
                            //存储卡列表数据
                            commit('updateCardInfoList', memberCardList);
                            resolve(memberCardList);
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
            }),
            dispatch('getMemberConfigInfo'),
        ]);
    },
    //查询公众号配置信息
    queryMemberWxMpSet ({ commit }) {
        const ajax = require('../api/index').default;
        return new Promise((resolve, reject) => {
            ajax.post('queryMemberWxMpSet', {
                source : this.getters.sourceInfo
            }).then(res => {
                if (res.success) {
                    if (res.data) {
                        commit('updateWxMpSet', res.data);
                        resolve();
                    } else {
                        reject();
                    }
                } else {
                    reject();
                }
            }).catch(() => {
                reject();
            });
        });
    }
};

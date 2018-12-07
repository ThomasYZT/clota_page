
import ajax from "../../api";

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
    //用户是否登陆
    isLogin : false,
    //公司id
    companyCode : '',
    //错误码
    errCode : '',
    //companyCode : '1045244656750825472',
    //companyCode : '1037976274619994114' //肖邦景区
    //companyCode : '121321' //信鸥互联 测试环境
};

export const memberGetters = {
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
    hashKey : state => {
        return state.hashKey;
    },
    //是否显示键盘
    showKeyBoard : state => {
        return state.showKeyBoard;
    },
    //公司id
    companyCode : state => {
        return '10000059';
        let companyCode = '';
        if (!state.companyCode) {
            let url = location.href;
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
                return companyCode;
            } else {
                return companyCode;
            }
        }
    },
    //是否登陆
    isLogin : state => {
        let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        state.isLogin = userInfo && Object.keys(userInfo).length > 0;
        return state.isLogin;
    },
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
};

export const memberActions = {
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
    }
};

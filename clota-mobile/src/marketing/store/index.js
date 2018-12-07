

// import ajax from '../api/index';
// const ajax = require('../api/index');
import Vue from 'vue';
//全民营销state信息
export const marketingState = {
    marketing : {
        //公司名称
        companyName : '',
        //公司编码
        companyCode : '',
        //组织id
        orgId : '',
        //营销级别id
        levelId : '',
        //营销类别id
        typeId : '',
        //用户信息
        userInfo : {},
        //营销类别名称
        typeName : ''
    }
};
export const marketingGetters = {
    //公司名称
    companyName : state => {
        return state.marketing.companyName;
    },
    //公司编码
    marketINgCompanyCode : state => {
        return state.marketing.companyCode;
    },
    //组织id
    marketOrgId : state => {
        return state.marketing.orgId;
    },
    //营销级别id
    marketLevelId : state => {
        return state.marketing.levelId;
    },
    //营销类别id
    marketTypeId : state => {
        return state.marketing.typeId;
    },
    //营销系统token
    marketToken : state => {
        return localStorage.getItem('marketToken');
    },
    //用户信息
    marketUserInfo : state => {
        return state.marketing.userInfo;
    },
    //营销名称
    marketTypeName : state => {
        return state.marketing.typeName;
    }
};

export const marketMutations = {
    //更新token
    marketUpdateToken (state,token) {
        localStorage.setItem('marketToken',token);
    },
    //更新用户信息
    marketUpdateUserInfo (state,userInfo) {
        state.marketing.userInfo = userInfo;
    },
    //更新组织id
    marketUpdateOrgId (state,orgId) {
        state.marketing.orgId = orgId;
    },
    //更新levelId
    marketUpdateLevelId (state,levelId) {
        state.marketing.levelId = levelId;
    },
    //更新typeId
    marketUpdateTypeId (state,typeId) {
        state.marketing.typeId = typeId;
    },
    //更新营销名称
    marketUpdateTypeName (state,typeName) {
        state.marketing.typeName = typeName;
    },
    //更新公司名称
    marketUpdateCompanyName (state,companyName) {
        state.marketing.companyName = companyName;
    },
    //更新公司code
    marketUpdateCompanyCode (state,companyCode) {
        state.marketing.companyCode = companyCode;
    }
};

export const marketActions = {
    /**
     * 获取用户信息
     * @param{Function} commit vux的commit事件
     * @param{Function} dispatch vux的dispatch事件
     * @return{Promise} promise对象
     */
    marketGetUserInfo ({ commit, dispatch }) {
        const ajax = require('../api/index').default;
        return ajax.post('market_getUserInfo').then(res => {
            if (res.success) {
                commit('marketUpdateUserInfo',res.data ? res.data : {});
                return res.data;
            } else {
                commit('marketUpdateUserInfo',{});
                return {};
            }
        }).catch(() => {
            commit('marketUpdateUserInfo',{});
        });
    },
    /**
     * 获取登录信息
     * @param{Function} commit vux的commit事件
     * @param{Function} dispatch vux的dispatch事件
     * @return{Promise} promise对象
     */
    marketGetLoginData ({ commit,dispatch }) {
        const ajax = require('../api/index').default;
        return ajax.post('market_getLoginInfo').then(res => {
            if (res.success) {
                if (res.data && Object.keys(res.data).length > 0) {
                    commit('marketUpdateCompanyName',res.data.orgName);
                    commit('marketUpdateCompanyCode',res.data.orgCode);
                    commit('marketUpdateTypeId',res.data.marketTypeId);
                } else {
                    commit('marketUpdateCompanyName','');
                    commit('marketUpdateCompanyCode','');
                    commit('marketUpdateTypeId','');
                }
            } else {
                commit('marketUpdateCompanyName','');
                commit('marketUpdateCompanyCode','');
                commit('marketUpdateTypeId','');
            }
        });
    }
};

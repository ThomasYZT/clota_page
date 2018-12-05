

import ajax from '@/api/index';
//全民营销state信息
export const marketingState = {
    marketing : {
        //公司名称
        companyName : '广州长隆飞鸟乐园',
        //公司编码
        companyCode : '444',
        //组织id
        orgId : '1037976274619994113',
        //营销级别id
        levelId : '1067617391137132544',
        //营销类别id
        typeId : '1067616682551414784',
        //用户信息
        userInfo : {}
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
    }
};

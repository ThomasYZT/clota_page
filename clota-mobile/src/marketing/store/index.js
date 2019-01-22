

// import ajax from '../api/index';
// const ajax = require('../api/index');
import Vue from 'vue';
import qqMap from 'qqMap';
//全民营销state信息
export const marketingState = {
    marketing : {
        //公司名称
        companyName : '',
        //组织id
        orgId : '',
        //营销级别id
        levelId : '',
        //营销类别id
        typeId : '',
        //用户信息
        userInfo : {},
        //营销类别名称
        typeName : '',
        //地理位置信息
        locationInfo : '',
        //经度
        longitude : '',
        //纬度
        latitude : '',
        //是否正在获取位置信息
        isGettingLocation : false,
        //营销用户id
        marketUserId : '',
        //公司地址
        orgAddress : '',
        //是否需要获取位置信息
        needGetLocation : false
    }
};
export const marketingGetters = {
    //公司名称
    companyName : state => {
        if (state.marketing.companyName) {
            return state.marketing.companyName;
        } else {
            return localStorage.getItem('companyName');
        }
    },
    //组织id
    marketOrgId : state => {
        let orgId = localStorage.getItem('orgId') ? localStorage.getItem('orgId') : '';
        if ( state.marketing.orgId ) {
            return state.marketing.orgId;
        } else {
            return orgId;
        }
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
    },
    //地理位置信息
    marketLocationInfo : state => {
        return state.marketing.locationInfo;
    },
    //经度
    marketLongitude : state => {
        return state.marketing.longitude;
    },
    //纬度
    marketLatitude : state => {
        return state.marketing.latitude;
    },
    //是否正在获取位置信息
    marketIsGettingLocation : state => {
        return state.marketing.isGettingLocation;
    },
    //营销用户id
    marketUserId : state => {
        if (state.marketing.marketUserId) {
            return state.marketing.marketUserId;
        } else {
            return localStorage.getItem('marketingUserId') ? localStorage.getItem('marketingUserId') : '';
        }
    },
    //公司地址
    marketOrgAddress : state => {
        if (state.marketing.orgAddress) {
            return state.marketing.orgAddress;
        } else {
            return localStorage.getItem('marketOrgAddress');
        }
    },
    //是否需要获取位置信息
    marketNeedGetLocation : state => {
        return state.marketing.needGetLocation;
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
        localStorage.setItem('orgId',orgId);
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
        localStorage.setItem('companyName',companyName)
        state.marketing.companyName = companyName;
    },
    /**
     * 更新位置信息
     * @param{Object} state
     * @param{String} location
     * @param{float} longitude 经度
     * @param{float} latitude 纬度
     */
    updateLocationInfo (state,{ location,longitude,latitude }) {
        state.marketing.locationInfo = location;
        state.marketing.longitude = longitude;
        state.marketing.latitude = latitude;
    },
    //更新获取位置信息状态
    marketUpdateIsGettingLocation (state,status) {
        state.marketing.isGettingLocation = status;
    },
    //更新营销用户id
    marketUpdateMarketUserId (state,status) {
        localStorage.setItem('marketingUserId',status);
        state.marketing.marketUserId = status;
    },
    //更新公司地址
    marketUpdatOrgAddress (state,address) {
        localStorage.setItem('marketOrgAddress',address);
        state.marketing.orgAddress = address;
    },
    //更新是否需要获取位置信息
    marketUpdateMarketNeedGetLocation (state,needGetLocation) {
        state.marketing.needGetLocation = needGetLocation;
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
                    commit('updateCompanyCode',res.data.orgCode);
                    commit('marketUpdateTypeId',res.data.marketTypeId);
                    commit('marketUpdateMarketNeedGetLocation',res.data.setPosition);
                } else {
                    commit('marketUpdateCompanyName','');
                    commit('updateCompanyCode','');
                    commit('marketUpdateTypeId','');
                    commit('marketUpdateMarketNeedGetLocation','');
                }
            } else {
                commit('marketUpdateCompanyName','');
                commit('updateCompanyCode','');
                commit('marketUpdateTypeId','');
                commit('marketUpdateMarketNeedGetLocation','');
            }
        });
    },
    /**
     * 获取位置信息
     * @param{Object} store
     */
    marketGetLocation (store) {
        return new Promise((resolve,reject) => {
            //第一个参数是在腾讯地图申请的key（申请地址:https://lbs.qq.com/console/mykey.html）
            let geolocation = new qqMap.maps.Geolocation('RX7BZ-4ZBKR-XGHWI-WOFNG-CTENJ-ZIFNQ', 'mapqq');
            geolocation.getLocation((locationInfo) => {
                store.commit('updateLocationInfo',{
                    location : locationInfo.nation + locationInfo.province + locationInfo.city + locationInfo.addr,
                    longitude : locationInfo.lng,
                    latitude : locationInfo.lat,
                });
                setTimeout(() => {
                    store.commit('marketUpdateIsGettingLocation',false);
                },500);
                resolve(locationInfo);
            },(err) => {
                store.commit('updateLocationInfo',{
                    location : '',
                    longitude : '',
                    latitude : '',
                });
                setTimeout(() => {
                    store.commit('marketUpdateIsGettingLocation',false);
                    store.dispatch('showToast', 'getLocationErr');
                },500);
                reject(err);
            },{
                //是否在定位失败时给出提示引导用户打开授权或打开定位开关。（即将支持）
                failTipFlag : true
            });
        });
    },
};

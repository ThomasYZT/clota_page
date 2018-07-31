/**
 * Created by Sasha on 2018/6/1.
 */

const webpackConfig = require('../../config');
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import { Message } from 'iview';
import ajaxList from '@/api/ajaxList'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
        roleType: [],  //（角色类型。perf_hr : HR，perf_superior : 上级，perf_subordinate : 下级）
        // 组织架构树
        orgTree: {},
        // 员工列表
        employeeList: [],
        // 职位列表
        postList: [],
        // 通知列表
        bootList: [],
        // 未读消息数目
        noticeUnreadNum: 0,
        // 系统消息列表
        systemNoticeList: [],
    },
    getters: {
        // 部署到线上的相对根路径
        rootPath: state => {
            let nodeEnv = process.env.NODE_ENV === 'production' ? 'build' : 'dev';
            return webpackConfig[nodeEnv].assetsPublicPath + webpackConfig[nodeEnv].assetsSubDirectory
        },
        // 用户信息（包含账号信息 + 公司信息）
        userInfo: state => {
            return _.defaultsDeep({}, state.userInfo );
        },

        // 仅用户信息
        empInfo: state => {
            return _.defaultsDeep({}, state.userInfo && state.userInfo.empInfo ? state.userInfo.empInfo : {} );
        },

        // 当前账号对应公司信息
        companyInfo: state => {
            if(state.userInfo && state.userInfo.companys){
                return _.defaultsDeep({}, state.userInfo.companys.find( attr => { return attr.id == state.userInfo.empInfo.companyId}) );
            }else{
                return {}
            }
        },

        // 当前账号是否是超级管理员
        isAdministrator: (state, getters) => {
            return getters.companyInfo && getters.companyInfo.accountType === 'yes' ? true : false;
        },

        // 组织架构树
        orgTree: state => {
            return _.defaultsDeep({}, state.orgTree );
        },

        // 员工列表
        employeeList: state => {
            return _.defaultsDeep([], state.employeeList );
        },

        // 职位列表
        postList: state => {
            return _.defaultsDeep([], state.postList );
        },

        // 通知列表
        bootList: state => {
            return _.defaultsDeep([], state.bootList );
        },

        // 未读消息数目
        noticeUnreadNum: state => {
            return _.defaultsDeep([], state.noticeUnreadNum );
        },

        // 系统消息列表
        systemNoticeList: state => {
            return _.defaultsDeep([], state.systemNoticeList );
        },

    },
    mutations: {
        // 更新用户信息
        updateUserInfo( state, payload){
            localStorage.setItem('userInfo', JSON.stringify(payload));
            state.userInfo = payload;
            state.roleType = payload && payload.roleType ? payload.roleType : [];
        },

        // 更新组织架构树
        updateOrgTree( state, payload){
            state.orgTree = payload;
        },

        // 更新员工列表
        updateEmployeeList( state, payload){
            state.employeeList = payload;
        },

        // 更新职位列表
        updatePostList( state, payload){
            state.postList = payload;
        },

        // 更新通知列表
        updateBootList( state, payload){
            state.bootList = payload;
        },

        // 更新未读消息数目
        updateNoticeUnreadNum( state, payload){
            state.noticeUnreadNum = payload;
        },

        // 更新系统消息列表
        updateSystemNoticeList( state, payload){
            state.systemNoticeList = payload;
        },

    },
    actions: {
        // 更新用户信息
        getCurUsrInfo( {commit} ) {
            return ajaxList.getCurUsrInfo( param ).then( res => {
                if( res.success ){
                    commit( 'updateUserInfo', res.data );
                }else{
                    console.error('getCurUsrInfo: 获取用户信息失败 ', res);
                }
                return res
            });
        },

        // 更新组织架构树
        getOrgTree( {commit} ){
            return ajaxList.org.getOrgTree( ).then( res => {
                if( res.success ){
                    commit( 'updateOrgTree', res.data || {} );
                }else{
                    console.error('getOrgTree: 获取组织树失败 ', res);
                }
                return res;
            });
        },

        // 更新员工列表
        queryEmployeeList( {commit} ){
            return ajaxList.emp.queryEmployeeList( ).then( res => {
                if( res.success ){
                    commit( 'updateEmployeeList', res.data.modelList || [] );
                }else{
                    console.error('queryEmployeeList: 获取员工列表失败 ', res);
                }
                return res;
            });
        },

        // 更新职位列表
        queryPostList( {commit} ){
            return ajaxList.org.queryPostList( ).then( res => {
                if( res.success ){
                    commit( 'updatePostList', res.data.modelList || [] );
                }else{
                    console.error('queryPostList: 获取员工列表失败 ', res);
                }
                return res;
            });
        },

        // 更新未读消息数目
        queryNoticeUnreadNum( {commit} ){
            return ajaxList.kpi.getNoticeUnreadNum( ).then( res => {
                if( res.success ){
                    commit( 'updateNoticeUnreadNum', res.data || 0 );
                }else{
                    console.error('queryNoticeUnreadNum: 获取未读消息数目失败 ', res);
                }
                return res;
            });
        },

        // 更新系统消息列表
        querySystemNoticeList( {commit} ){
            return ajaxList.kpi.querySystemNotice( ).then( res => {
                if( res.success ){
                    commit( 'updateSystemNoticeList', res.data.list || [] );
                }else{
                    console.error('querySystemNoticeList: 获取系统消息列表失败 ', res);
                }
                return res;
            });
        }

    },
    modules: {

    }
});

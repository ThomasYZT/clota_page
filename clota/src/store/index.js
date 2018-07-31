/**
 * Created by Sasha on 2018/6/1.
 */

const webpackConfig = require('../../config');
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import { Message } from 'iview';
import ajaxList from '@/api/ajaxList'
import i18n from '../assets/js/lang.config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //左侧菜单是否收起
        menuIsPackUp : false,
        //当前选择的语言
        lang : i18n.locale,
      
        userInfo: null,
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
        //左侧菜单是否收起
        menuIsPackUp : state => {
            return state.menuIsPackUp;
        },
        //当前语言状态
        lang : state => {
            let lang = localStorage.getItem('lang');
            state.lang = lang ? lang : state.lang;
            return state.lang;
        }

    },
    mutations: {
        //更新左侧菜单是否收起
        updateMenuIsPackUp( state,payload ){
          state.menuIsPackUp = payload;
        },
        //设置语言
        setLang (state,lang) {
          localStorage.setItem('lang',lang);
          i18n.locale = state.lang = lang;
        }
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

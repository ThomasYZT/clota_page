/**
 * Created by Sasha on 2018/6/1.
 */

const webpackConfig = require('../../config');
import Vue from 'vue';
import Vuex from 'vuex';
import {defaultsDeep} from 'lodash';
import { Message } from 'iview';
import ajaxList from '@/api/ajaxList'
import i18n from '../assets/js/lang.config';
import routerClect from '../router/routerClect';
import router from '../router/index';

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
            let menuIsPackUp = localStorage.getItem('menuIsPackUp');
            if(menuIsPackUp){
              state.menuIsPackUp = (menuIsPackUp === 'true');
            }
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
          //保存当前菜单的展开收起状态
          localStorage.setItem('menuIsPackUp',payload);
          state.menuIsPackUp = payload;
        },
        //设置语言
        setLang (state,lang) {
          //保存当前的语言状态
          localStorage.setItem('lang',lang);
          i18n.locale = state.lang = lang;
        },
        //设置用户权限
        updateUserRight(state,data) {
            let routers = [];
            // for(let item in data){
            //     if(item in routerTest){
            //         routers.push(routerTest[item]);
            //     }
            // }
            for(let item in routerClect){
                let createRouter = defaultsDeep({},routerClect[item]);
                if(routerClect[item].children){
                    let children = [];
                    for(let child in routerClect[item].children){
                        children.push(routerClect[item].children[child]);
                    }
                    if(children.length > 0){
                        createRouter['children'] = children;
                    }
                }
                routers.push(createRouter);
            }
            console.log(routers)
            router.addRoutes(routers);
        },

    },
    actions: {
        // // 更新用户信息
        // getCurUsrInfo( {commit} ) {
        //     return ajaxList.getCurUsrInfo( param ).then( res => {
        //         if( res.success ){
        //             commit( 'updateUserInfo', res.data );
        //         }else{
        //             console.error('getCurUsrInfo: 获取用户信息失败 ', res);
        //         }
        //         return res
        //     });
        // },
        //获取用户权限信息
        getUserRight ({commit}) {
            commit('updateUserRight',{
              'partner' : 'allow'
            });
            // return ajaxList.getUserRight(param).then(res => {
            //   if(res.success) {
            //     commit('updateUserRight',res.data);
            //   }else{
            //     console.error('getUserRight：获取用户信息失败')
            //   }
            // });
        }

    },
    modules: {

    }
});

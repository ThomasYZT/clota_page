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
import {getFourRoute} from '../router/constRouter';

Vue.use(Vuex);

//子路由深度复制
const childDeepClone = (childrenList,data) => {
    let children = [];
    for(let child in childrenList){
        let router = childrenList[child];
        //判断路由的名称是否存在于权限接口当中，部分父路由没有直接指定名称，所以需要判断meta信息里面的_name对应的权限是否存在
        if((router.name && router.name in  data)
          || (router.meta && router.meta._name && router.meta._name in  data)){
          if(router.children){
            let children = childDeepClone(router.children,data);
            //配置没有匹配到路由的重定向页面
            children.push(getFourRoute({menuName : '404',lightMenu : router.meta._name,_name : router.meta._name}));
            if(children.length > 0){
              //静态路由当中没有保存重定向路由，所以需要给父路由添加重定向路由
              children.push({
                path : '',
                redirect : children[0].name ? children[0].name : children[0].meat._name
              });
              router['children'] = children;
            }else{
              router['children'] = [];
            }
          }
          children.push(router);
        }
    }
    return children;
};

export default new Vuex.Store({
    state: {
        //左侧菜单是否收起
        menuIsPackUp : false,
        //当前选择的语言
        lang : i18n.locale,
        //权限信息
        permissionInfo : [],

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
        },
        //一级菜单权限信息
        permissionInfo : state => {
            return state.permissionInfo;
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
        updatePermissionInfo(state,data) {
            let routers = childDeepClone(routerClect,data);
            router.addRoutes(routers);
            state.permissionInfo = JSON.parse(JSON.stringify(routers));
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
            commit('updatePermissionInfo',{
              'orgManage' : 'allow',
              'organization':'allow',
              'employee':'allow',
              'rolePermission':'allow',
              'partner' : 'allow',
              'channels' : 'allow',
              'saleChannelsGroup':'allow',
              'verificateGroup':'allow',
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

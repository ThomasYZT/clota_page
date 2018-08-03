

import Vue from 'vue';
import Vuex from 'vuex';
import i18n from '../assets/js/lang.config';
import {defaultsDeep} from 'lodash';
import router from '../router/index';
import routerClect from '../router/activeRoutes';
import {getFourRoute,getNoSubMenuRoute} from '../router/constRouter';
Vue.use(Vuex);
console.log(routerClect)

//子路由深度复制
const childDeepClone = (childrenList,data) => {
  let children = [];
  for(let child in childrenList){
    let router = defaultsDeep({},childrenList[child]);
    //判断路由的名称是否存在于权限接口当中，部分父路由没有直接指定名称，所以需要判断meta信息里面的_name对应的权限是否存在
    if((router.meta && router.meta._name && router.meta._name in  data)){
      if(router.children){
        let children = childDeepClone(router.children,data);
        //配置没有匹配到路由的重定向页面
        children.push(getFourRoute({menuName : '404',lightMenu : router.meta._name,_name : router.meta._name}));
        if(children.length > 1){
          //静态路由当中没有保存path为空的重定向路由，所以需要给父路由添加重定向路由
          children.push({
            path : '',
            redirect : children[0].name ? children[0].name : children[0].meat._name
          });
          router['children'] = children;
        }else{
          router['children'] = [getNoSubMenuRoute({menuName : 'noSubMenu',lightMenu : router.meta._name,_name : router.meta._name})];
        }
      }else if(!router.children && !router.name){
        router['children'] = [getNoSubMenuRoute({menuName : 'noSubMenu',lightMenu : router.meta._name,_name : router.meta._name})];
      }
      children.push(router);
    }
  }
  return children;
};

export default new Vuex.Store({
  state : {
    //当前选择的语言
    lang : i18n.locale,
    //权限信息
    permissionInfo : [],
  },
  getters : {
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
  mutations : {
    //设置用户权限
    updatePermissionInfo(state,data) {
      let routers = childDeepClone(routerClect,data);
      router.addRoutes(routers);
      state.permissionInfo = JSON.parse(JSON.stringify(routers));
    },
  },
  actions : {
    //获取用户权限信息
    getUserRight ({commit}) {
      commit('updatePermissionInfo',{
        'index' : 'allow',
        'lessee' : 'allow',
        'ISPinternet' : 'allow',
        'server' : 'allow',
      });
      // return ajaxList.getUserRight(param).then(res => {
      //   if(res.success) {
      //     commit('updateUserRight',res.data);
      //   }else{
      //     console.error('getUserRight：获取用户信息失败')
      //   }
      // });
    }
  }
});

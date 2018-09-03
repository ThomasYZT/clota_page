/**
 * Created by Sasha on 2018/6/1.
 */

//首页接口
import index from './modules/index';
//日志接口
import log from './modules/log';
//服务器接口
import server from './modules/server';
//套餐接口
import Package from './modules/package';
//系统接口
import system from './modules/system';
const apiList = {

    /*****************登录+获取用户信息公用接口****************/
    // 登录
    login: 'user/login.json',
    //登出
    logout : 'user/logout.json',
    //获取验证码
    getValidateCode : 'user/getValidateCode.json',
    //获取权限接口
    getPrivileges : 'user/getPrivileges.json',
    //首页接口
    ...index,
    //日志接口
    ...log,
    //服务器接口
    ...server,
    //套餐接口
    ...Package,
    //系统接口
    ...system,
};

export default apiList;

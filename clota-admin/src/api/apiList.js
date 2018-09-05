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
//系统接口
import order from './modules/order';
//租户接口
import lessee from './modules/lessee';
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
    //查询所有的运营后台客服
    querySysAccoutList : 'tenant/listSysAccount.json',
    //获取当前登录账户的信息
    getSysAccountByToken : 'user/getSysAccountByToken.json',
    //修改密码接口
    modifyPassword : 'user/modifyPassword.json',
    //修改账户信息
    update : 'user/update.json',
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
    //订单接口
    ...order,
    //租户接口
    ...lessee
};

export default apiList;

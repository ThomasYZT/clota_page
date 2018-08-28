/**
 * Created by Sasha on 2018/6/1.
 */

//首页接口
import index from './modules/index';
//会员信息接口
import info from './modules/info';
//组织架构接口
import org from './modules/org';

const apiList = {

    /*****************登录+获取用户信息公用接口****************/
    // 登录
    login: '/account/login',
    //获取菜单权限
    getPrivilege: '/account/getPrivilege',
    //首页接口
    ...index,
    //会员信息接口
    ...info,
    //组织架构接口
    ...org,

};

export default apiList;

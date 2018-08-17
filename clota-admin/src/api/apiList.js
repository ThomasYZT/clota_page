/**
 * Created by Sasha on 2018/6/1.
 */

//首页接口
import index from './modules/index';
const apiList = {

    /*****************登录+获取用户信息公用接口****************/
    // 登录
    login: 'user/login.json',
    //登出
    logout : 'user/logout.json',
    //首页接口
    ...index
};

export default apiList;

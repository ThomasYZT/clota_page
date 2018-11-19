/**
 * Created by Sasha on 2018/6/1.
 */

//首页接口
import index from './modules/index';
//会员信息接口
import info from './modules/info';
//组织架构接口
import org from './modules/org';
//系统设置接口
import sms from './modules/sms'
//产品中心接口
import product from './modules/product';
//个人中心接口
import account from './modules/account';
//财务管理接口
import finance from './modules/finance';
//预订单中心接口
import orderCenter from './modules/orderCenter';
//数据中心接口
import report from './modules/report';

const apiList = {

    /*****************登录+获取用户信息公用接口****************/
    // 登录
    login: '/account/login',
    //二次校验登录密码是否正确
    secondLogin: '/account/secondLogin',
    // 注册
    register: '/partner/signUp',
    //图片上传接口
    imgUpload: '/uploadFile',
    //获取菜单权限
    getPrivilege: '/account/getPrivilege',
    //获取第一个会员的注册时间
    getFirstMemberDate: '/member/getFirstMemberDate',
    //获取当前账户可用机构
    getManageOrgs: '/account/getManageOrgs',
    //首页接口
    ...index,
    //会员信息接口
    ...info,
    //组织架构接口
    ...org,
    //产品中心接口
    ...product,
    //系统设置接口
    ...sms,
    //个人中心接口
    ...account,
    //财务管理接口
    ...finance,
    //预定中心接口
    ...orderCenter,
    //数据中心接口
    ...report
};

export default apiList;

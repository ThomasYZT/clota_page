/**
 * 常量定义
 * @type {{}}
 */
export const configVariable = {
    //每页大小配置
    pageSizeConfig: [10, 20, 50],
    //默认每页大小
    pageDefaultSize: 10,
    //分页功能配置
    pageLayout : 'total, sizes, prev, pager, next, jumper'
};
//监控频率
//label对应的是语言配置文件的键值
export const listenRateEnum = [
    {
        label: 'minute',
        value: '5',
    },
    {
        label: 'minute',
        value: '10',
    },
    {
        label: 'minute',
        value: '15',
    },
    {
        label: 'minute',
        value: '20',
    },
    {
        label: 'minute',
        value: '30',
    },
    {
        label: 'minute',
        value: '60',
    }
];
//系统类型
export const systemTypeList = [
    {
        label: 'systemTypeInfo',
        value: '32',
    },
    {
        label: 'systemTypeInfo',
        value: '64',
    }
];

//节点类型
export const nodeList = [
    {
        label: 'company',//公司
        value: 'company'
    },
    {
        label: 'department',//部门
        value: 'department'
    },
    {
        label: 'scene',//景区
        value: 'scene'
    }
];

//款台类型
export const cashierType = [
    {
        label: 'verifyCashierType',//核销款台
        value: 'verifyCashierType'
    },
    {
        label: 'verifySaleType',//销售款台
        value: 'verifySaleType'
    },
    {
        label: 'verifySaleAndCashierType',//核销/销售一体款台
        value: 'verifySaleAndCashierType'
    },
];
//月份枚举
export const monthEnum = [
    {
        label : 'month',
        value : 1
    },
    {
        label : 'month',
        value : 2
    },
    {
        label : 'month',
        value : 3
    },
    {
        label : 'month',
        value : 4
    },
    {
        label : 'month',
        value : 5
    },
    {
        label : 'month',
        value : 6
    },
    {
        label : 'month',
        value : 7
    },
    {
        label : 'month',
        value : 8
    },
    {
        label : 'month',
        value : 9
    },
    {
        label : 'month',
        value : 10
    },
    {
        label : 'month',
        value : 11
    },
    {
        label : 'month',
        value : 12
    }
];
//订单类型
export const orderType = [
    {
        label : 'FIT',//散客
        value : 'FIT'
    },
    {
        label : 'team',//团队
        value : 'team'
    },
    {
        label : 'customer',//大客户
        value : 'customer'
    },
    {
        label : 'all',//全部
        value : 'all'
    }
];
//审核状态
export const auditStatus = [
    {
        label : 'audited',//已审核
        value : 'audited'
    },
    {
        label : 'notAudit',//未审核
        value : 'notAudit'
    },
    {
        label : 'all',//全部
        value : 'all'
    }
];
//支付状态
export const payStatus = [
    {
        label : 'prepaid',//已支付
        value : 'prepaid'
    },
    {
        label : 'unpaid',//未支付
        value : 'unpaid'
    },
    {
        label : 'all',//全部
        value : 'all'
    }
];
//核销状态
export const cashierStatus = [
    {
        label : 'cashiered',//已核销
        value : 'cashiered'
    },
    {
        label : 'unCashiered',//未核销
        value : 'unCashiered'
    },
    {
        label : 'all',//全部
        value : 'all'
    }
];

//退款状态
export const refundStatus = [
    {
        label : 'refunded',//已退
        value : 'refunded'
    },
    {
        label : 'waitAudit',//待审
        value : 'waitAudit'
    },
    {
        label : 'apply',//申请
        value : 'apply'
    },
    {
        label : 'all',//全部
        value : 'all'
    }
];

//是否同步
export const synchronizationStatus = [
    {
        label : 'synchronized',//已退
        value : 'synchronized'
    },
    {
        label : 'unsynchronize',//待审
        value : 'unsynchronize'
    },
    {
        label : 'all',//全部
        value : 'all'
    }
];

//下单渠道
export const orderChannels = [
    {
        label : 'all',//全部
        value : 'all'
    },
    {
        label : 'OTA',//OTA
        value : 'OTA'
    },
    {
        label : 'scene',//景区
        value : 'scene'
    },
    {
        label : 'distributor',//分销商
        value : 'distributor'
    },
    {
        label : 'custome',//自定义
        value : 'custome'
    },
    {
        label : 'travel',//旅行社
        value : 'travel'
    }
];

//业态类型
export const formatsStatus = [
    {
        label : 'ticket',//票类
        value : 'ticket'
    },
    {
        label : 'hotel',//酒店
        value : 'hotel'
    },
    {
        label : 'theater',//剧院
        value : 'theater'
    },
    {
        label : 'ticketPack',//套票
        value : 'ticketPack'
    }
];

//操作类型
export const operateType = [
    {
        label : 'login',//登录
        value : 'login'
    },
    {
        label : 'changePass',//修改密码
        value : 'changePass'
    },
    {
        label : 'resetPass',//重置密码
        value : 'resetPass'
    },
    {
        label : 'addLess',//新增租户
        value : 'addLess'
    },
    {
        label : 'changeLess',//修改租户
        value : 'changeLess'
    },
    {
        label : 'openedServices',//开通服务
        value : 'openedServices'
    },
    {
        label : 'changeServices',//修改服务
        value : 'changeServices'
    },
    {
        label : 'pauseServices',//暂停服务
        value : 'pauseServices'
    },
    {
        label : 'delayServices',//延期服务
        value : 'delayServices'
    },
    {
        label : 'addStaffAccount',//新增客服账号
        value : 'addStaffAccount'
    },
    {
        label : 'modifyStaffAccount',//修改客服账号
        value : 'modifyStaffAccount'
    },
    {
        label : 'delStaffAccount',//删除客服账号
        value : 'delStaffAccount'
    }
];

//服务操作类型
export const serviceOperateType = [
    {
        label : 'open',//开通
        value : 'normal'
    },
    {
        label : 'renew',//续订
        value : 'renew'
    },
    {
        label : 'pause',//暂停
        value : 'invalid'
    },
    {
        label : 'recover',//恢复
        value : 'recover'
    }
];

//发送状态
export const sendStatusList = [
    {
        label : 'success',//成功
        value : 'success'
    },
    {
        label : 'fail',//失败
        value : 'fail'
    },
];
//校验是否是ipv4地址
export const isIpv4 = function (val) {
    let reg = /(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/;
    return reg.test(val);
};
//校验是否为ipv6地址
export const isIpv6 = function (val) {
    let reg = /^([\\da-fA-F]{1,4}:){7}([\\da-fA-F]{1,4})$/;
    return reg.test(val);
};

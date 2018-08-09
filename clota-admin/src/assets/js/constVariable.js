/**
 * 常量定义
 * @type {{}}
 */
export const configVariable = {
    //每页大小配置
    pageSizeConfig: [10, 20, 50],
    //默认每页大小
    pageDefaultSize: 10,

};
//监控频率
//label对应的是语言配置文件的键值
export const listenRateEnum = [
    {
        label: 'minute',
        value: 5,
    },
    {
        label: 'minute',
        value: 10,
    },
    {
        label: 'minute',
        value: 15,
    },
    {
        label: 'minute',
        value: 20,
    },
    {
        label: 'minute',
        value: 30,
    },
    {
        label: 'minute',
        value: 60,
    }
];
//系统类型
export const systemTypeList = [
    {
        label: 'systemTypeInfo',
        value: 32,
    },
    {
        label: 'systemTypeInfo',
        value: 64,
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
    },
    {
        label: 'cashier',//款台
        value: 'cashier'
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


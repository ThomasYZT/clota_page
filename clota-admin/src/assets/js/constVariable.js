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
        lable : 'month',
        value : 1
    },
    {
        lable : 'month',
        value : 2
    },
    {
        lable : 'month',
        value : 3
    },
    {
        lable : 'month',
        value : 4
    },
    {
        lable : 'month',
        value : 5
    },
    {
        lable : 'month',
        value : 6
    },
    {
        lable : 'month',
        value : 7
    },
    {
        lable : 'month',
        value : 8
    },
    {
        lable : 'month',
        value : 9
    },
    {
        lable : 'month',
        value : 10
    },
    {
        lable : 'month',
        value : 11
    },
    {
        lable : 'month',
        value : 12
    }
];

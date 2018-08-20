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

//性别
export const genderEnum = [
    { name: 'male', desc: '男' },
    { name: 'female', desc: '女' },
];

//会员类型
export const vipStatusEnum = [
    { name: 'active', desc: '正式会员' },
    { name: 'potential', desc: '潜在会员' },
];

//会员状态
export const cardStatusEnum = [
    { name: 'frozen', desc: '已冻结' },
    { name: 'active', desc: '正常使用' },
];

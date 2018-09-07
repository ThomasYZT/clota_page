
//系统接口
export default {

    /***********************************账号***********************************/
    //查询角色信息列表
    'roleList' : 'role/list.json',
    //查询账户信息列表
    'userList' : 'user/list.json',
    //根据ID查询单个账户信息
    'getUser' : 'user/get.json',
    //新增账户信息
    'addUser' : 'user/add.json',
    //修改账户信息
    'updateUser' : 'user/update.json',
    //删除账户信息
    'deleteUser' : 'user/delete.json',
    //重置账户密码
    'resetPassword' : 'user/resetPassword.json',
    //启/停用账户信息
    'switchAccount' : 'user/switchAccount.json',


    /***********************************系统公告***********************************/
    //查询系统公告列表
    'noticeList' : 'notice/list.json',
    //根据ID查询单个系统公告
    'getNotice' : 'notice/get.json',
    //添加系统公告
    'addNotice' : 'notice/add.json',
    //修改系统公告
    'updateNotice' : 'notice/update.json',
    //启/停系统公告
    'switchNotice' : 'notice/switchNotice.json',


    /***********************************设置***********************************/
    //查询系统设置
    'getSetting' : 'setting/get.json',
    //修改系统设置
    'updateSetting' : 'setting/update.json',

    //查询计量单位列表
    'unitList' : 'unit/list.json',
    //根据名称查询计量单位
    'unitFindByName' : 'unit/findByName.json',
    //根据ID查询计量单位
    'getUnit' : 'unit/get.json',
    //添加计量单位
    'addUnit' : 'unit/add.json',
    //修改计量单位
    'updateUnit' : 'unit/update.json',
    //批量删除计量单位
    'deleteUnit' : 'unit/deleteBatch.json',
    //修改计量单位状态
    'switchUnit' : 'unit/switch.json',

    //查询节假日列表
    'holidayList' : 'holiday/list.json',
    //添加节假日
    'addHoliday' : 'holiday/add.json',
    //修改节假日
    'updateHoliday' : 'holiday/update.json',
    //批量删除节假日
    'deleteHoliday' : 'holiday/deleteBatch.json',

    //查询渠道信息列表
    'channelList' : 'channel/list.json',
    //根据ID查询渠道信息
    'getChannel' : 'channel/get.json',
    //添加渠道信息
    'addChannel' : 'channel/add.json',
    //修改渠道信息
    'updateChannel' : 'channel/update.json',
    //根据渠道名称获取渠道信息
    'channelByName' : 'channel/likeName.json',
    //删除渠道信息
    'deleteChannel' : 'channel/deleteBatch.json',
    //修改渠道信息状态
    'switchChannel' : 'channel/switch.json',


}

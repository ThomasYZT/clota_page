<template>
    <div class="new-employee-info">
        <Form ref="formValidate"
              :model="employee"
              :rules="ruleValidate"
              label-position="top">
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('departName')" prop="deptId"><!--部门名称-->
                    <Select v-model="employee.deptId" :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="item in enumData.department" :key="item.id"
                                :value="item.id">{{item.orgName}}
                        </Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('loginName')" prop="loginName"><!--登录名-->
                    <Input v-model.trim="employee.loginName" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('password')" prop="password"><!--密码-->
                    <Input type="password" v-model.trim="employee.password" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('name')" prop="nickName"><!--姓名-->
                    <Input v-model.trim="employee.nickName" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('telephone')" prop="phone"><!--电话-->
                    <Input v-model.trim="employee.phone" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('gender')" prop="sex"><!--性别-->
                    <Select v-model="employee.sex" :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="item in genderEnum" :key="item.name"
                                :value="item.name">{{$t(item.desc)}}
                        </Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('birthday')" prop="birthday"><!--生日-->
                    <Date-picker
                        type="date"
                        v-model="employee.birthday"
                        :options="dateOption"
                        format="yyyy-MM-dd"
                        :placeholder="$t('selectField', {msg: ''})"
                        @on-change="customValid($event, 'birthday')">
                    </Date-picker>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('nativePlace')" prop="nativePlace"><!--籍贯-->
                    <Select v-model="employee.provinceId" :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="item in enumData.nativePlace" :key="item.id"
                                :value="item.provinceid">{{item.province}}
                        </Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('nativeAddress')" prop="address"><!--籍贯地址-->
                    <Input v-model.trim="employee.address" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <!--空字段站位用-->
            <!--<div class="ivu-form-item-wrap"></div>-->
            <Form-item :label="$t('remark')" prop="descript" style="width: 845px;">
                <Input v-model.trim="employee.descript"
                       type="textarea"
                       :autosize="{minRows: 3,maxRows: 6}"
                       :placeholder="$t('inputField', {field: ''})" />
            </Form-item>
            <!--角色权限-->
            <!--<div class="ivu-form-item-wrap">-->
            <!--<Form-item :label="$t('rolePermission')" prop="privileges">
                <Select v-model="rolePrivileges" multiple @on-change="onChangeSelect">
                    <Option v-for="item in enumData.privileges" :key="item.id"
                            :value="item.id">{{ item.roleName }}
                    </Option>
                </Select>
            </Form-item>-->

            <Form-item class="privilege-wrap" :label="$t('rolePermission')" prop="privileges">

                <span class="text text-ellipsis" v-if="rolePrivileges.length != 0">{{roleNames}}</span>
                <Select :placeholder="rolePrivileges.length != 0 ? '' : $t('selectField', {msg: ''})">
                    <Option :value="''">
                        <div class="select-content" @click.stop="">
                            <div class="selectTop">
                                <Input class="search-classify-input"
                                       v-model.trim="roleKeyword"
                                       :placeholder="$t('搜索')"
                                       @on-enter="searchMatched"
                                       @on-click="searchMatched"
                                       icon="ios-search" />
                            </div>
                            <Checkbox-group v-model="rolePrivileges" @on-change="onChangeSelect">
                                <div :class="['select-group-item', {'active': item.id==activeGroupItem.id}]"
                                     v-for="(item,index) in matchedData" :key="index"
                                     @click="handleClickItem(item)">
                                    <Checkbox :label="item.id" @click.native.stop="">{{''}}</Checkbox>
                                    <span class="value text-ellipsis" v-w-title="item.roleName">{{item.roleName}}</span>
                                </div>

                            </Checkbox-group>
                            <div class="no-data" v-if="enumData.privileges.length == 0">暂无数据</div>
                            <div class="no-data" v-if="enumData.privileges.length != 0 && matchedData.length==0">暂无搜索结果</div>
                            <!--右侧内容-->
                            <div class="privilege-part">
                                <div class="part-1">
                                    <h4>景区权限</h4>
                                    <div class="part-content">
                                        <div :class="['part-author', {'active-author': item.orgId==activeRoleInOrg.orgId}]"
                                             v-for="(item,index) in roleInOrg" :key="index"
                                             @click="onActiveAuthor(item)">{{item.orgName}}
                                        </div>
                                        <p class="no-data" v-if="roleInOrg.length==0">暂无数据</p>
                                    </div>
                                </div>
                                <div class="part-2">
                                    <h4>菜单权限
                                        <span v-if="activeRoleInOrg.orgName">
                                            （<span class="title-desc text-ellipsis" v-w-title="activeRoleInOrg.orgName">{{activeRoleInOrg.orgName}}</span>）
                                        </span>
                                    </h4>
                                    <div class="part-content">
                                        <div :class="['part-author']"
                                             v-for="(item,index) in menuInRole" :key="index"
                                             @click="">{{$t(item.privCode)}}
                                        </div>
                                        <!--<div>menuInRole</div>-->
                                        <p class="no-data" v-if="menuInRole.length==0">暂无数据</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Option>
                </Select>
            </Form-item>
            <!--</div>-->
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('isStarted')" prop="status"><!--是否启用-->
                    <Checkbox v-model="employee.status" :true-value="'valid'" :false-value="'invalid'"></Checkbox>
                </Form-item>
            </div>
            <!--空字段站位用-->
            <!--<div class="ivu-form-item-wrap"></div>-->

        </Form>
    </div>
</template>

<script type="text/ecmascript-6">
    import ajax from '@/api/index';
    import MD5 from 'crypto-js/md5';
    import {genderEnum} from '@/assets/js/constVariable';
    import { validator } from 'klwk-ui';
    import map from 'lodash/map';

    export default {
        props: ['employeeInfo'],
        components: {},
        data () {

            var validateMethod = {

                mobile :  (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(new Error('请输入正确的手机号码'));
                    } else {
                        callback();
                    }
                },

                orgName : (rule, value, callback) => {
                    if (value && !this.employee.deptId) {
                        callback(new Error('该部门不存在'));
                    } else {
                        callback();
                    }
                },

                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                }
            };

            return {
                dateOption: {
                    disabledDate: function( value ){
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData: {
                    department: [],
                    nativePlace: [],
                    privileges: [],
                },
                employee: {
                    deptId: '',             // 部门
                    loginName: '',          // 登录名
                    password: '',
                    nickName: '',
                    phone: '',
                    sex: '',
                    birthday: '',
                    provinceId: '',
                    address: '',
                    descript: '',               // 备注
                    roleIds: '',            // 角色权限ids
                    status: 'valid',        // 是否启用 valid/invalid
                },
                // 勾选的角色权限
                rolePrivileges: [],
                // 搜索角色关键字
                roleKeyword: '',
                matchedData: [],
                // 性别
                genderEnum: genderEnum,
                // 旧密码
                oldPwd: '',
                // 当前点击active的角色权限下拉项
                activeGroupItem: {},
                // 当前点击查看的角色所包含的景区权限
                roleInOrg: [],
                // 角色下的菜单权限
                menuInRole: [],
                // 当前点击active的景区权限
                activeRoleInOrg: {},
                // 已勾选的角色名称
                roleNames: '',

                // 表单校验规则
                ruleValidate: {
                    deptId: [
                        { required: true, message: '请选择部门', trigger: 'change' },
                        { validator: validateMethod.orgName, trigger: 'change'}
                    ],
                    loginName: [
                        { required: true, message: '登录名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '登录名不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    nickName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '姓名不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    address: [
                        { type: 'string', max: 20, message: '籍贯地址不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    descript: [
                        { type: 'string', max: 100, message: '备注不能多于100个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],

                }
            }
        },
        watch: {
            /*'employee.sex' : function(newVal, oldVal){
                this.$refs.formValidate.validateField('sex');
            },
            'employee.orgName' : function(newVal, oldVal){
                this.$refs.formValidate.validateField('orgName');
            },*/
            employeeInfo: {
                handler: function (newVal, oldVal) {
                    if (this.isEdit && newVal.id) {
//                        this.employee = Object.assign(this.employee, newVal);
                        this.getEmployeeDetail(newVal.id);
                    }
                },
                immediate: true
            }
        },
        computed: {
            isEdit() {
                return this.$route.query.type && (this.$route.query.type == 'modify');
            }
        },

        methods: {

            // 手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid(data, field){
                this.employee.birthday = data;
                this.$nextTick(()=>{
                    this.$refs.formValidate.validateField( field );
                });
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.saveEmployee();
                    }
                })
            },


            init() {
                let fields = [
                    {apiKey: 'queryDepartments', dataKey: 'department'},
                    {apiKey: 'getProvinceList', dataKey: 'nativePlace'},
                    {apiKey: 'queryRoleList', dataKey: 'privileges'},
                ];
                fields.forEach((item, i) => {
                    this.getFieldInitData(item.apiKey, item.dataKey);
                });

//                this.getAllPrivilege();
            },
            /**
             * 获取部门名称、籍贯、角色权限 下拉列表数据
             * @params apiKey - 接口api
             * @params dataKey - enumData的key值
             **/
            getFieldInitData(apiKey, dataKey) {
                ajax.post(apiKey).then(res => {
                    if (res.success) {
                        this.enumData[dataKey] = res.data || [];
                        if (dataKey=='privileges') {
                            this.matchedData = JSON.parse(JSON.stringify(this.enumData[dataKey]));
                        }
                    }
                });
            },
            //
            getAllPrivilege() {
                ajax.post('getAllPrivilege', {
                    orgId: this.$store.state.manageOrgs.id
                }).then(res => {

                });
            },
            //新增员工接口
            saveEmployee( param ){
                var self = this;
                // 如果是编辑员工且密码未被修改过，那就不需要MD5加密
                if (self.oldPwd !== self.employee.password) {
                    this.employee.password = MD5(this.employee.password).toString();
                }
                // 生日日期格式化
                this.employee.birthday = new Date(this.employee.birthday).format('yyyy-MM-dd');

                ajax.post("addOrUpdateEmployee", this.employee).then(function (res) {
                    if(res.success){
                        self.$Message.success(self.isEdit ? self.$t('编辑员工成功！') : self.$t('新增员工成功！'));
                        self.$router.push({name: 'employee'});
                    }else{
                        self.$Message.warning( res.data.message ? res.data.message : '网络错误，请稍后重试' );
                    }
                }).catch(function (err) {
                    self.$Message.error('网络错误，请联系客服');
                });
            },
            /**
             * 多选角色权限
             * @param selections
             */
            onChangeSelect(selections) {
                this.employee.roleIds = selections.join(',');
                this.getChosen(selections);
            },
            /**
             * 获取员工信息详情 - 用于修改员工时数据回填
             * @params id  员工id
             */
            getEmployeeDetail(id) {
                ajax.post("findEmployeeDetail", {
                    employeeId: id
                }).then(res => {
                    if(res.success){
                        this.employee = Object.assign(this.employee, res.data || {});
                        this.rolePrivileges = map(this.employee.roles, 'id');   // 角色权限列表
                        this.$set(this.employee, 'roleIds', this.rolePrivileges.join(','));
                        this.roleNames = map(this.employee.roles || [], 'roleName').join(',');

                        this.oldPwd = this.employee.password;
                    }
                })
            },

            // 搜索匹配到的角色
            searchMatched() {
                this.matchedData = this.enumData.privileges.filter((roleItem, i) => {
                    return roleItem.roleName.includes(this.roleKeyword);
                });
            },
            /**
             * 获取角色
             */
            getChosen (val) {
                let professionText = [];
                val.forEach(item => {
                    this.enumData.privileges.forEach(child => {
                        if (child.id == item) {
                            professionText.push(child.roleName);
                        }
                    })
                });
                this.roleNames = professionText.join(',');
            },
            // 点击选择要查看的角色
            handleClickItem(roleItem) {
                this.activeGroupItem = roleItem;
                ajax.post('findRolePrivInOrg', {
                    roleId: roleItem.id
                }).then(res => {
                    if (res.success) {
                        this.roleInOrg = res.data || [];
                        // 清空菜单权限数据列表
                        this.menuInRole = [];
                        // 清空点击选择了的景区权限
                        this.activeRoleInOrg = {};
                    }
                });
            },
            // 点击选择要查看的景区权限
            onActiveAuthor(orgItem) {
                this.activeRoleInOrg = orgItem;
                this.menuInRole = orgItem.rolePrivModels;
            },


        },
        created() {
            this.init();
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';

    .text-ellipsis{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
    }

    .new-employee-info{
        width: 850px;
        height: 100%;
        margin: auto;
        background-color: #FFFFFF;
        /*border-radius: 4px;*/
        .ivu-input-icon{
            z-index: 2;
        }

        .ivu-form{
            padding-top: 40px;
            padding-bottom: 20px;
            /*text-align: center;*/
        }

        .ivu-form-item-wrap{
            position: relative;
            display: inline-block;
            /*min-width: 495px;*/
            /*padding-right: 55px;*/
            /*width: 40%;*/
            /*text-align: center;*/
            vertical-align: middle;
            &:nth-child(2n+1) {
                margin-right: 280px;
            }

            .btn-add-dept,
            .btn-add-position{
                position: absolute;
                left: calc(50% + 185px);
                top: 5px;
                font-size: 12px;
                color: #1875F0;
                letter-spacing: 0.75px;
                cursor: pointer;
            }
        }

        .ivu-form-item{
            width: 280px;
            /*margin: 0 auto 20px;*/
            text-align: left;

            .ivu-date-picker {
                display: block;
            }

            .ivu-select-selected-value,
            .ivu-input{
                font-size: 14px;
            }

            .ivu-select-item{
                font-size: 14px !important;
            }
        }

        .privilege-wrap {
            .text {
                position: absolute;
                z-index: 1;
                width: 280px;
                padding: 0 20px 0 10px;
                color: #333;
                pointer-events: none;
            }

            .ivu-select-dropdown {
                overflow: visible;
                max-height: 270px;
            }
            .ivu-select-item{
                padding: 7px 0;
                &:hover {
                    background: transparent;
                }
            }
            .select-content {
                overflow: auto;
                height: 255px;
                padding: 0 16px;

                .no-data {
                    margin-top: 100px;
                    text-align: center;
                    color: $color_E1E1E1;
                }
            }
            .privilege-part {
                position: absolute;
                left: 290px;
                top: -7px;
                width: 610px;
                height: 100%;
                background: #F5F7FA;
                border: 1px solid $color_E1E1E1;
                border-radius: 4px;
                cursor: default;

                .part-1, .part-2 {
                    float: left;
                    height: 100%;
                    >h4 {
                        margin: 13px 20px;
                        color: #333;
                    }
                }
                .part-1 {
                    width: 62%;
                    border-right: 1px dashed $color_E1E1E1;
                    .part-author {
                        cursor: pointer;
                    }
                }
                .part-2 {
                    width: 38%;
                    .title-desc {
                        display: inline-block;
                        max-width: 110px;
                        vertical-align: middle;
                    }
                }
                .part-content {
                    height: calc(100% - 50px);
                    position: relative;
                    overflow: auto;
                    margin: 0 3px 0 5px;
                }
                .part-author {
                    padding: 7px 15px;
                    &:hover {
                        background-color: $color_F5F7FA;
                    }

                    &.active-author {
                        color: $color_blue;
                    }
                }

            }

            .select-group-item {
                padding: 4px;
                .value {
                    display: inline-block;
                    max-width: 200px;
                    vertical-align: middle;
                }

                &:hover {
                    background-color: #fafafa;
                }
                &.active {
                    color: $color_blue;
                }
            }

        }

        .register-info-footer{
            padding: 30px 20px;
            text-align: center;

            .ivu-btn{
                width: 90px;
                height: 30px;
                padding: 4px 12px 3px;
                font-size: 12px;
                letter-spacing: 1.33px;
            }

            &.edit-footer .ivu-btn{
                width: 90px;
            }

            .ivu-btn-ghost{
                margin-left: 20px;
                color: #666666;
            }
        }

    }

</style>


<template>
    <div class="new-employee-info">
        <Form ref="formValidate"
              :model="employee"
              :rules="ruleValidate"
              label-position="top">
            <div class="ivu-form-item-wrap">
                <Form-item label=" 部门名称" prop="orgName">
                    <Select v-model="employee.idType" :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="item in enumData.empIDType" :key="item.name" :value="item.name">{{item.desc}}</Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="登录名" prop="loginName">
                    <Input v-model.trim="employee.name" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="密码" prop="psw">
                    <Input v-model.trim="employee.name" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="姓名" prop="name">
                    <Input v-model.trim="employee.name" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="电话" prop="mobile">
                    <Input v-model.trim="employee.mobile" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label=" 性别" prop="sex">
                    <Select v-model="employee.sex" :placeholder="$t('selectField', {msg: ''})">
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="生日" prop="birthday">
                    <Date-picker
                        type="date"
                        v-model="employee.birthday"
                        :options="dateOption"
                        :placeholder="$t('selectField', {msg: ''})"
                        @on-change="customValid($event, 'birthday')">
                    </Date-picker>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="籍贯" prop="nativePlace">
                    <Select v-model="employee.nativePlace" :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="item in enumData.empType" :key="item.name" :value="item.name">{{item.desc}}</Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="籍贯地址" prop="nativePlaceAddr">
                    <Input v-model.trim="employee.nativePlaceAddr" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <!--空字段站位用-->
            <!--<div class="ivu-form-item-wrap"></div>-->
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('remark')" prop="remark">
                    <Input v-model="employee.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('inputField', {field: ''})"></Input>
                </Form-item>
            </div>
            <!--角色权限-->
            <div class="ivu-form-item-wrap">
                <Form-item :label="$t('rolePermission')" prop="privileges">
                    <Select v-model="employee.privileges" multiple>
                        <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                        <Option :value="'haha'">{{'角色'}}</Option>
                    </Select>
                </Form-item>
            </div>
            <div class="ivu-form-item-wrap">
                <Form-item label="是否启用" prop="open">
                    <Checkbox v-model="employee.open"></Checkbox>
                </Form-item>
            </div>
            <!--空字段站位用-->
            <!--<div class="ivu-form-item-wrap"></div>-->

        </Form>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        props: ['employee-info'],
        components: {},
        data () {

            var validateMethod = {

                mobile :  (rule, value, callback) => {
                    /*if (!validator.isMobile(value)) {
                        callback(new Error('请输入正确的手机号码'));
                    } else {
                        callback();
                    }*/
                },

                orgName : (rule, value, callback) => {
                    if (value && !this.employee.orgId) {
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
                loading: false,
                dateOption: {
                    disabledDate: function( value ){
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData: {},
                employee: {
                    orgId: '',
                    orgName: '',
                    loginName: '',
                    psw: '',
                    name: '',
                    mobile: '',
                    sex: '',
                    birthday: '',
                    nativePlace: '',
                    nativePlaceAddr: '',
                    remark: '',
                    privileges: [],
                    open: true,
                },
                ruleValidate: {
                    orgName: [
                        { required: true, message: '请选择部门', trigger: 'change' },
                        { validator: validateMethod.orgName, trigger: 'change'}
                    ],
                    loginName: [
                        { required: true, message: '登录名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '登录名不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '姓名不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    psw: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '密码不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    nativePlaceAddr: [
                        { type: 'string', max: 20, message: '籍贯地址不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    remark: [
                        { type: 'string', max: 20, message: '备注不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],

                }
            }
        },
        watch: {
            'employee.sex' : function(newVal, oldVal){
                this.$refs.formValidate.validateField('sex');
            },
            'employee.orgName' : function(newVal, oldVal){
                this.$refs.formValidate.validateField('orgName');
            },
        },

        methods: {

            // 手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid(data, field){
                this.$nextTick(()=>{
                    this.$refs.formValidate.validateField( field );
                })
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.saveEmployee( param );
                    }
                })
            },

            //新增员工接口
            saveEmployee( param ){
                var self = this;
                self.loading = true;
                getData.post("saveEmployee", param).then(function (res) {
                    if(res.data.success){
                        self.employee.employeeId = res.data.data;
                        var data = {
                            step: 2,
                            employeeInfo:self.employee,
                            enumData:self.enumData,
                        };
                        self.$emit('show-step',data);
                    }else{
                        self.$Message.warning( res.data.message ? res.data.message : '网络错误，请稍后重试' );
                    }
                    self.loading = false;
                }).catch(function (err) {
                    self.loading = false;
                    self.$Message.error('网络错误，请联系客服');
                });
            }

        }
    }
</script>

<style lang="scss">

    .new-employee-info{
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        /*border-radius: 4px;*/
        overflow: auto;
        .ivu-input-icon{
            z-index: 2;
        }

        .ivu-form{
            padding-top: 5%;
            padding-bottom: 5%;
            text-align: center;
        }

        .ivu-form-item-wrap{
            position: relative;
            display: inline-block;
            min-width: 495px;
            padding-right: 55px;
            width: 40%;
            text-align: center;
            vertical-align: middle;

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
            width: 395px;
            margin: 0 auto 20px;
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


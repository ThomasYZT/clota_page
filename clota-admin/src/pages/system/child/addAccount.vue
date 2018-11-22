<!--新增账号-->

<template>
    <div class="add-account">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addAccount' : 'editAccount')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-account-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">

                <template v-if="type === 'add'">
                    <i-row class="yellow padding-bottom">默认密码为888888，请通知用户及时更改。</i-row>
                </template>
                <template v-else>
                    <p v-if="reset" class="yellow"> 密码已重置为888888，请及时修改。</p>
                    <span class="change-psw blue" @click="resetPassword">{{$t('resetPass')}}</span>
                </template>

                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('account')" prop="loginName">
                            <Input v-model.trim="formData.loginName"
                                   :disabled="type === 'add' ? false : true"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem :label="$t('name')" prop="nickName">
                            <Input v-model.trim="formData.nickName"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('mobile')" prop="phone">
                            <Input v-model.trim="formData.phone"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem :label="$t('mail')" prop="email">
                            <Input v-model.trim="formData.email"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                    <FormItem :label="$t('role')" prop="roleId">
                        <Select v-model="formData.roleId"
                                :placeholder="$t('selectField', {msg: ''})">
                            <Option v-for="item in roleList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.roleName }}
                            </Option>
                        </Select>
                    </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import { validator } from 'klwk-ui';
    import ajax from '@/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
        },
        data () {

            const validateMethod = {

                // 输入内容不合规则
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));
                    } else {
                        callback();
                    }
                }

            };

            //校验联系电话
            const validateMobile = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value)) {
                        callback();
                    } else {
                        callback(this.$t('formalError', { field : this.$t('phone') }));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', { 'msg' : this.$t('phone') }));
                }
            };
            //校验电子邮箱
            const validatmail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('formalError', { field : this.$t('email') }));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', { 'msg' : this.$t('email') }));
                }
            };
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('accountName'),
                        router : {
                            name : 'account'
                        }
                    }
                ],
                //表单数据
                formData : {
                    //账号
                    loginName : '',
                    //名字
                    nickName : '',
                    //联系电话
                    phone : '',
                    //邮箱
                    email : '',
                    //角色
                    roleId : '',
                },
                //表单校验规则
                ruleValidate : {
                    loginName : [
                        { required : true, message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('account') }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength', { field : this.$t('account'), length : 20 }), trigger : 'blur' },
                    ],
                    nickName : [
                        { required : true, message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('name') }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength', { field : this.$t('name'), length : 20 }), trigger : 'blur' },
                    ],
                    email : [
                        { required : true, validator : validatmail, trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { type : 'string', max : 100, message : this.$t('errorMaxLength', { field : this.$t('mail'), length : 100 }), trigger : 'blur' },
                    ],
                    phone : [
                        { required : true, validator : validateMobile, trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength', { field : this.$t('mobile'), length : 20 }), trigger : 'blur' },
                    ],
                    roleId : [
                        { required : true, message : this.$t('validateError.pleaseInput', { 'msg' : this.$t('role') }), trigger : 'change' },
                    ],
                },
                //角色列表
                roleList : [],
                //是否正在添加中
                addLoading : false,
                //账号操作类型
                type : '',
                //是否重置密码
                reset : false,
            };
        },
        created () {
            //查询角色列表
            this.queryRoleList();
        },
        methods : {

            /**
             * 查询角色列表
             */
            queryRoleList () {
                ajax.post('roleList', {}).then(res => {
                    if (res.status === 200) {
                        this.roleList = res.data || [];
                    } else {
                        this.roleList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 保存新增账户数据
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.addLoading = true;
                        if (this.type === 'add') {
                            console.log(this.formData);
                            this.addUser(this.formData);
                        } else {
                            let params = {
                                id : this.formData.id,
                                nickName : this.formData.nickName,
                                phone : this.formData.phone,
                                email : this.formData.email,
                                roleId : this.formData.roleId,
                            };
                            console.log(params);
                            this.updateUser(params);
                        }
                    }
                });
            },
            /**
             * 新增账户
             */
            addUser ( params ) {
                ajax.post('addUser', params).then(res => {
                    this.addLoading = false;
                    if (res.status === 200) {
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({ name : 'account' });
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 修改账户
             * @param params
             */
            updateUser ( params ) {
                ajax.post('updateUser', params).then(res => {
                    this.addLoading = false;
                    if (res.status === 200) {
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name : 'account' });
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 重置账户密码
             */
            resetPassword () {
                ajax.post('resetPassword', {
                    id : this.formData.id,
                }).then(res => {
                    if (res.status === 200) {
                        this.reset = true;
                        this.$Message.success(this.$t('resetPass') + this.$t('success'));
                    } else {
                        this.reset = false;
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$router.push({
                    name : 'account'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params.type) {
                    this.type = params.type;
                    this.formData = params.info ? params.info : { loginName : '',nickName : '',phone : '',email : '',roleId : '' };
                } else {
                    this.$router.push({
                        name : 'account'
                    });
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-account {
        @include block_outline();
        background: $color_f4f6f9;

        .add-account-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;
            }
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .ivu-btn-primary {
                margin-right: 18px;
            }
        }

        /deep/ .ivu-input-wrapper{
            width: 280px;
        }

        /deep/ .ivu-select{
            width: 280px;
        }

        .blue{
            color: $color_blue;
        }

        .padding-bottom{
            padding-bottom: 20px;
        }

        .yellow{
            color: $color_yellow;
            letter-spacing: 1px;
            padding-left: 6%
        }

        .change-psw{
            font-size: $font_size_14px;
            position: relative;
            left: 89%;
            display: inline-block;
            top: 27px;
            cursor: pointer;
            z-index: 1;
        }
    }
</style>

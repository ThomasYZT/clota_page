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
                    <i-row  class="yellow">默认密码为888888，请通知租户及时更改</i-row>
                </template>
                <template v-else>
                    <span class="change-psw blue">重置密码</span>
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
                    <FormItem :label="$t('role')">
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
    import {validator} from 'klwk-ui';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import ajax from '@/api/index';
    import defaultsDeep from 'lodash/defaultsDeep';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            cityPlugin
        },
        data() {
            //校验联系电话
            const validateMobile = (rule, value, callback) => {
                if (value) {
                    if (validator.isMobile(value) || validator.isTelephone(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.phoneError2'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('phone')}));
                }
            };
            //校验电子邮箱
            const validatmail = (rule, value, callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('validateError.emailError2'));
                    }
                } else {
                    callback(this.$t('validateError.pleaseInput', {'msg': this.$t('email')}))
                }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('accountName'),
                        router: {
                            name: 'account'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //账号
                    loginName: '',
                    //名字
                    nickName: '',
                    //联系电话
                    phone: '',
                    //邮箱
                    email: '',
                    //角色
                    roleId: '',
                },
                //表单校验规则
                ruleValidate: {
                    loginName : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('account')}), trigger: 'blur'},
                    ],
                    nickName : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('name')}), trigger: 'blur'},
                    ],
                    email: [
                        {required: false, validator: validatmail, trigger: 'blur'},
                    ],
                    phone : [
                        {required: true, validator: validateMobile, trigger: 'blur'},
                    ]
                },
                //角色列表
                roleList: [],
                //是否正在添加中
                addLoading: false,
                //账号操作类型
                type : ''
            }
        },
        created(){
            //查询列表
            this.queryRoleList();
        },
        methods: {

            /**
             * 查询账户信息列表
             */
            queryRoleList() {
                ajax.post('roleList', {}).then(res => {
                    this.roleList = res.data || [];
                });
            },
            /**
             * 保存新增账户数据
             */
            save() {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addLoading = false;
                        if (this.type === 'add') {
                            console.log(this.formData)
                            this.addUser(this.formData);
                        }else {
                            var params = {
                                id: this.formData.id,
                                nickName: this.formData.nickName,
                                phone: this.formData.phone,
                                email: this.formData.email,
                                roleId: this.formData.roleId,
                            };
                            console.log(params)
                            this.updateUser(params);
                        }
                    }
                });
            },
            /**
             * 新增账户
             */
            addUser( params ) {
                ajax.post('addUser', params).then(res => {
                    if(res.status === 200){
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({ name: 'account'});
                    }
                });
            },
            /**
             * 修改账户
             * @param params
             */
            updateUser( params ) {
                ajax.post('updateUser', params).then(res => {
                    if(res.status === 200){
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name: 'account'});
                    }
                });
            },
            /**
             * 修改账户密码
             */
            modifyPassword () {
                ajax.post('modifyPassword', {
                    loginName: this.formData.loginName,
                    oldPassword: '',
                    newPassword: '88888888',
                }).then(res => {
                    if(res.status === 200){
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name: 'account'});
                    }
                });
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'account'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type) {
                    this.type = params.type;
                    this.formData = params.info ? params.info : { loginName: '',nickName: '',phone: '',email: '',roleId: '' };
                }else{
                    this.$router.push({
                        name : 'account'
                    });
                }
            }
        },
    }
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

        .yellow{
            color: $color_yellow;
            letter-spacing: 1px;
            padding-bottom: 20px;
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

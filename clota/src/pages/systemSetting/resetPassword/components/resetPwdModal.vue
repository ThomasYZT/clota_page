<template>
    <!--重置密码-->
    <Modal
        v-model="visible"
        :title="'重置密码'"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--姓名-->
                <Form-item :label="$t('name')" prop="">
                    <span>{{formData.nickName | contentFilter}}</span>
                </Form-item>
                <!--登录名-->
                <Form-item :label="$t('登录名')" prop="">
                    <span>{{formData.loginName | contentFilter}}</span>
                </Form-item>
                <!--新密码-->
                <Form-item :label="$t('新密码')" prop="password">
                    <Input type="password" v-model.trim="formData.password" :placeholder="$t('inputField', {field: '密码'})" />
                </Form-item>
                <!--确认新密码-->
                <Form-item :label="$t('确认新密码')" prop="rePassword">
                    <Input type="password" v-model.trim="formData.rePassword" :placeholder="$t('请再次输入密码')" />
                </Form-item>
            </Form>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="confirm()" >{{$t('confirm')}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import MD5 from 'crypto-js/md5';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['row-data'],
        components: {
        },
        data () {
            let self = this;
            const validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
                // 校验再次输入的密码是否与新密码相同
                isEqNewPwd: (rule, value, callback) => {
                    if (value != self.formData.password) {
                        callback(new Error( this.$t('再次输入的密码与新密码不同') ));    // 输入的密码与新密码不同
                    } else {
                        callback();
                    }
                },
            };

            return {
                visible: false,
                //表单数据
                formData: {},
                //校验规则
                ruleValidate: {
                    password: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('新密码')}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                    ],
                    rePassword: [
                        { required: true, message: this.$t('请再次输入密码'), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateMethod.isEqNewPwd, trigger: 'blur' },
                    ],

                },
            }
        },
        watch: {

        },
        methods: {
            //显示模态框
            show ( data ) {
                if( data ){
                    this.formData = defaultsDeep(this.formData, data.item);
                    this.formData.accountId = data.item.id;
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){

                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {};

            },


            // 确定
            confirm () {
                this.resetPwd(this.formData);
            },

            // 重置密码
            resetPwd ( params ) {
                params.password = MD5(params.password).toString();
                ajax.post('resetAccountPassword', params).then((res) => {
                    if( res.success ) {
                        this.$Message.success(this.$t('操作成功',{'tip' : this.$t('add')}));
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.error(res.message || this.$t('操作失败',{'tip' : this.$t('add')}));
                    }
                });
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 4px 14px;

            .steps-wrap{
                padding-top: 5px;
                margin-left: 100px;
                margin-bottom: 18px;

                /deep/ .ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
                    font-size: 12px;
                    transform: scale(0.7);
                }
                /deep/ .ivu-steps .ivu-steps-tail > i{
                    height: 2px;
                    border-radius: 2px;
                }
            }

            /deep/ .ivu-from{
                padding-top: 15px;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.single-input{
                    width: 130px !important;
                }
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

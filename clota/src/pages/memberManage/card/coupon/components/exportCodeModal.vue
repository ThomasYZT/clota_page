<!--
    导出券码模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal export-code-modal"
               transfer
               width="600"
               :title="$t('exporting')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="form-wrapper">
                <Form ref="formValidate"
                      :model="formData"
                      :rules="ruleValidate"
                      :label-width="150"
                      label-position="left">
                    <!-- 优惠券名称 -->
                    <FormItem :label="$t('couponNameV2')">
                        <span>{{rowData.couponName | contentFilter}}</span>
                    </FormItem>
                    <!-- 可导出数量 -->
                    <FormItem :label="$t('exportableQuantity')">
                        <span>{{rowData.couponName | contentFilter}}</span>
                    </FormItem>
                    <!-- 导出数量 -->
                    <FormItem :label="$t('exportNum')" prop="needCount">
                        <Input v-model.trim="formData.needCount"></Input>
                    </FormItem>
                    <!-- 导出文件是否加密 -->
                    <FormItem :label="$t('isEncrypted')" prop="isPass">
                        <RadioGroup v-model="formData.isPass">
                            <Radio label="true">{{$t('encryption')}}</Radio><!--可同时使用-->
                            <Radio label="false">{{$t('notEncrypted')}}</Radio><!--不可同时使用-->
                        </RadioGroup>
                    </FormItem>
                    <!-- 文件密码 -->
                    <FormItem v-if="formData.isPass === 'true'" :label="$t('fileEncryptionPassword')" prop="password">
                        <Input v-model.trim="formData.password"></Input>
                    </FormItem>
                    <!-- 领取人 -->
                    <FormItem :label="$t('recipient')" prop="optUser">
                        <Input v-model.trim="formData.optUser"></Input>
                    </FormItem>
                    <!-- 领取人电话 -->
                    <FormItem :label="$t('recipientPhone')" prop="phoneNum">
                        <Input v-model.trim="formData.phoneNum"></Input>
                    </FormItem>
                </Form>
            </div>

            <div slot="footer" class="modal-footer">
                <!--<a class="ivu-btn-90px" :href="exportData">{{$t('exporting')}}</a>-->
                <Button type="primary" @click="formValidate" >{{$t("exporting")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import config from '../../../../../config/index';
    import apiList from '../../../../../api/apiList';
    import ajax from '@/api/index'
    import { validateNum, validateMobile } from '../../validateMethods';
    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表行数据
                rowData : {},
                //表单数据
                formData : {
                    //导出数量
                    needCount : '',
                    //导出文件是否加密
                    isPass : '',
                    //文件密码
                    password : '',
                    //领取人
                    optUser : '',
                    //领取人电话
                    phoneNum : '',
                }
            };
        },
        computed : {
            //表单校验规则
            ruleValidate () {
                return {
                    needCount : [ //导出数量
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('exportNum') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur', customField : 'exportNum' }
                    ],
                    isPass : [ //导出文件是否加密
                        { required : true, type : 'string', message : this.$t('selectField',{ msg : '' }), trigger : 'blur' },
                    ],
                    password : [ //文件密码
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('password') }), trigger : 'blur' },
                    ],
                    optUser : [ //领取人
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('recipient') }), trigger : 'blur' },
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('name'), length : 10 }), trigger : 'blur' }, // 不能多于30个字符
                    ],
                    phoneNum : [ //领取人电话
                        { required : true, type : 'string', message : this.$t('inputField',{ field : this.$t('recipientPhone') }), trigger : 'blur' },
                        { validator : validateMobile, trigger : 'blur' }
                    ],
                }
            }
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.rowData = data;
                this.visible = true;
            },
            /**
             *  表单校验
             */
            formValidate () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.exportData();
                    }
                });
            },
            /**
             * 导出
             */
            exportData () {
                let href = config['HOST'] + apiList['downLoadCoupon'] + '?token=' + ajax.getToken();
                for (let param in this.formData) {
                    href += '&' + param + '=' + this.formData[param]
                }
                href += '&' + 'couponId' + '=' + this.rowData.id;
                let aLink = document.createElement('a');
                aLink.href = href;
                aLink.click();
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.rowData = {};
                this.visible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 350px;
        overflow: auto;
    }
    .export-code-modal {
        position: relative;
        .form-wrapper {
            width: 80%;
            margin: 0 auto;
        }
    }
</style>

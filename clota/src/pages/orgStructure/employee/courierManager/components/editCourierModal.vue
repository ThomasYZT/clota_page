<!--
    新增/编辑导游
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="title"
           class-name="add-remark-modal vertical-center-modal"
           width="560"
           :mask-closable="false"
           @on-visible-change="visibleChange"
           @on-cancel="hide">
        <Form ref="form"
              :model="formData"
              :rules="ruleValidate"
              :label-width="lang === 'en' ? 120 : 100"
              class="form">
            <FormItem :label="$t('name')" prop="staffName">
                <i-row>
                    <i-col span="15">
                        <Input type="text"
                               style="width: 240px"
                               v-model.trim="formData.staffName"
                               :placeholder="$t('inputField',{field: $t('name')})"/>
                    </i-col>
                </i-row>
            </FormItem>
            <FormItem :label="$t('identityNo')" prop="documentNo">
                <i-row>
                    <i-col span="15">
                        <Input type="text"
                               style="width: 240px"
                               v-model.trim="formData.documentNo"
                               :placeholder="$t('inputField',{field: $t('identityNo')})"/>
                    </i-col>
                </i-row>
            </FormItem>
            <FormItem :label="$t('mobilePhone')" prop="phoneNumber">
                <i-row>
                    <i-col span="15">
                        <Input type="text"
                               style="width: 240px"
                               v-model.trim="formData.phoneNumber"
                               :placeholder="$t('inputField',{field: $t('mobilePhone')})"/>
                    </i-col>
                </i-row>
            </FormItem>
        </Form>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidate" >{{$t("confirm")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import { validator } from 'klwk-ui';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';

    export default {
        components : {},
        data () {
            const validateMethods = {
                //身份证校验
                identificationNum : (rule, value, callback) => {
                    if (validator.isIdCard(value)) {
                        callback();
                    } else {
                        callback(new Error(this.$t('errorFormat', { field : this.$t('identityNo') })));
                    }
                },
                //校验手机号码
                mobile : (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(new Error(this.$t('errorFormat', { field : this.$t('phoneNum') })));
                    } else {
                        callback();
                    }
                },
            };
            return {
                visible : false,
                title : this.$t('addNewCourier'),
                formData : {
                    //姓名
                    staffName : '',
                    //员工类型
                    staffType : 'guide',
                    //证件类型
                    documentType : 'id',
                    //证件号
                    documentNo : '',
                    //手机号
                    phoneNumber : ''
                },
                ruleValidate : {
                    staffName : [
                        { required : true, message : this.$t('errorEmpty',{ msg : this.$t('name') }), trigger : 'blur' }
                    ],
                    documentNo : [
                        { validator : validateMethods.identificationNum, trigger : 'blur' }
                    ],
                    phoneNumber : [
                        { required : true, message : this.$t('errorEmpty',{ msg : this.$t('phoneNum') }), trigger : 'blur' },
                        { validator : validateMethods.mobile, trigger : 'blur' }

                    ]
                }
            };
        },
        methods : {
            /**
             * 显示弹窗
             * @param type
             * @param scopeRow
             */
            show ({ type, scopeRow }) {
                if (scopeRow) {
                    this.title = this.$t('editCourierInfo');
                    this.formData.id = scopeRow.id;
                    this.formData.staffName = scopeRow.staffName;
                    this.formData.documentNo = scopeRow.documentNo;
                    this.formData.phoneNumber = scopeRow.phoneNumber;
                }
                this.type = type;
                this.visible = true;
            },
            /**
             * 隐藏弹窗
             */
            hide () {
                this.formData = {
                    staffName : '',
                    staffType : 'guide',
                    documentType : 'id',
                    documentNo : '',
                    phoneNumber : ''
                };
                delete this.formData.id;
                this.visible = false;
                this.title = this.$t('addNewCourier');
            },
            /**
             * 校验表单
             */
            formValidate () {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.saveGuide();
                    }
                });
            },
            /**
             * 新增导游
             */
            saveGuide () {
                ajax.post('addOrUpdateOrgStaff',this.formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t(this.type) }));
                        this.hide();
                        this.$emit('refresh');
                    }
                });
            },
            /**
             * 模态框状态改变
             * @param{String} status 模态框状态
             */
            visibleChange (status) {
                if (status === false) {
                    this.$refs.form.resetFields();
                }
            }
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-remark-modal{
        .form {
            width: 70%;
            margin: 0 auto;
        }
        .modal-body{
            padding: 50px 40px;

            /deep/ .ivu-input-wrapper{
                width: 280px;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }

    /deep/ .ivu-modal-body{
        padding-top: 40px;
        display: flex;
        min-height: 250px;
        align-items: center;
    }
</style>

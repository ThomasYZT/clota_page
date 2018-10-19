<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('addDriver')"
           class-name="add-remark-modal vertical-center-modal"
           width="560"
           :mask-closable="false"
           @on-cancel="hide">
        <Form ref="form"
              :model="formData"
              :rules="ruleValidate"
              :label-width="100"
              class="form"
              >
            <FormItem :label="$t('name')" prop="staffName">
                <Row>
                    <Col span="15">
                        <Input type="text" v-model="formData.staffName" :placeholder="$t('inputField',{field: $t('name')})"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem :label="$t('licence')" prop="documentNo">
                <Row>
                    <Col span="15">
                        <Input type="text" v-model="formData.documentNo" :placeholder="$t('inputField',{field: $t('licence')})"></Input>
                    </Col>
                </Row>
            </FormItem>
        </Form>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidate" >{{$t("confirm")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import {validator} from 'klwk-ui';
    import ajax from '@/api/index';
    export default {
        components: {},
        data() {
            const validateMethods = {
                //车牌号校验
                license: (rule, value, callback) => {
                    let reg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
                    if(!reg.test(value)) {
                        callback(new Error(this.$t('errorFormat', {field: this.$t('licence')})))
                    }else {
                        callback();
                    }
                }
            };
            return {
                visible: false,
                formData: {
                    //姓名
                    staffName: '',
                    //员工类型
                    staffType: 'driver',
                    //证件类型
                    documentType: 'license',
                    //证件号
                    documentNo: '',
                },
                ruleValidate: {
                    staffName: [
                        { required: true, message: this.$t('errorEmpty',{msg: this.$t('name')}), trigger: 'blur' }
                    ],
                    documentNo: [
                        { required: true, message: this.$t('errorEmpty',{msg: this.$t('licence')}), trigger: 'blur' },
                        { validator: validateMethods.license, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            /**
             * 显示弹窗
             * @param type
             * @param scopeRow
             */
            show({type, scopeRow}) {
                if(scopeRow) {
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
            hide() {
                this.formData = {
                    staffName: '',
                    staffType: 'driver',
                    documentType: 'license',
                    documentNo: '',
                    phoneNumber: ''
                };
                delete this.formData.id;
                this.visible = false;
            },
            /**
             * 校验表单
             */
            formValidate() {
                this.$refs.form.validate(valid => {
                    if(valid) {
                        this.saveGuide();
                    }
                });
            },
            /**
             * 新增导游
             */
            saveGuide() {
                ajax.post('addOrUpdateOrgStaff',this.formData).then(res => {
                    if(res.success) {
                        this.$Message.success(this.$t('successTip',{tip : this.$t(this.type)}));
                        this.hide();
                        this.$emit('refresh');
                    }
                })
            }
        }
    }
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
</style>

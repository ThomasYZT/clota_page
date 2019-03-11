<!--
    新增商品模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal add-good-modal"
               transfer
               width="600"
               :title="$t('addGood')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="form-wrapper">
                <Form ref="formValidate"
                      label-position="top"
                      :rules="validateRules"
                      :model="formData">
                    <!-- 商品名称 -->
                    <FormItem :label="$t('goodsName')" prop="productName">
                        <Input v-model="formData.productName" style="width: 320px;"></Input>
                    </FormItem>
                    <!-- 商品ID -->
                    <FormItem :label="$t('goodID')" prop="outCode">
                        <Input v-model="formData.outCode" style="width: 320px;"></Input>
                    </FormItem>
                </Form>
            </div>

            <div slot="footer" class="modal-footer">
                <Button type="primary" @click="validate()" >{{$t("save")}}</Button>
                <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import { emoji, validateCN } from '../../../../validateMethods';
    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //商品名称
                    productName : '',
                    //商品ID
                    outCode : '',
                }
            };
        },
        computed : {
            //表单校验规则
            validateRules () {
                return {
                    productName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('goodsName') }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { type : 'string', max : 30, message : this.$t('errorMaxLength', { field : this.$t('goodsName'), length : 30 }), trigger : 'blur' }, // 不能多于30个字符
                    ],
                    outCode : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('goodID') }), trigger : 'blur' },
                        { validator : emoji, trigger : 'blur' },
                        { type : 'string', max : 30, message : this.$t('errorMaxLength', { field : this.$t('goodID'), length : 30 }), trigger : 'blur' },
                        { validator : validateCN, trigger : 'blur' }
                    ],
                };
            }
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.visible = true;
            },
            /**
             *  隐藏模态框
             */
            hide () {
                this.visible = false;
                this.$refs.formValidate.resetFields();
            },
            /**
             * 保存
             */
            validate () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.save();
                    }
                });
            },
            /**
             * 保存商品数据
             */
            save () {
                ajax.post('saveProduct', {
                    ...this.formData
                }).then((res) => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.hide();
                        this.$emit('updateList');
                    } else {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                    }
                });
            }
        }
    };
</script>


<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 300px;
        overflow: auto;
    }
    .add-good-modal {
        .form-wrapper {
            position: absolute;
            @include center_center();
            top: 41px;
            bottom: 57px;
        }
    }
</style>

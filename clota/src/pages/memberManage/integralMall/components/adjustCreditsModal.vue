<!--
    调整兑换时所需积分模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           class-name="vertical-center-modal adjust-credits-modal"
           :title="$t('exchangePointsRequiredSetting')">
        <Form ref="formInline"
              :model="formData"
              :rules="ruleValidate"
              label-position="right"
              :label-width="150">
            <i-row>
                <i-col span="18" offset="3">
                    <Form-item :label="$t('exchangePointsRequired')" prop="requiredCredits">
                        <Input v-model.trim="formData.requiredCredits" style="width:200px" :placeholder="$t('inputField', { field : $t('exchangePointsRequired') })"></Input>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="primary" @click="validate">{{$t('save')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="toggle">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import common from '@/assets/js/common';
    import ajax from '@/api/index';
    export default {
        components : {},
        data () {
            //校验可兑换积分是否为正整数
            const validatePrice = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t(err,{ field : this.$t('exchangePointsRequired'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('exchangePointsRequired') }));
                    }
                });
            };
            return {
                //库存商品数据
                detail : {},
                //表单数据
                formData : {
                    //商品id
                    id : '',
                    //商品上下架状态
                    goodsStatus : '',
                    //商品兑换积分
                    requiredCredits : '',
                },
                //校验规则
                ruleValidate : {
                    requiredCredits : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('exchangePointsRequired') }), trigger : 'blur' },
                        { validator : validatePrice, trigger : 'blur' }
                    ]
                },
                //是否显示模态框
                visible : false
            };
        },
        methods : {
            /**
             *  控制是否显示模态框
             */
            toggle (data) {
                if (data) {
                    console.log(data)
                    this.detail = data;
                    this.formData.id = this.detail.id;
                    this.formData.goodsStatus = this.detail.goodsStatus;
                    this.visible = true;
                } else {
                    this.visible = false;
                    this.reset();
                }
            },
            /**
             * 模态框状态重置
             */
            reset () {
                this.detail = {};
                this.$refs.formInline.resetFields();
            },
            /**
             * 校验数据输入
             */
            validate () {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.adjustCredits();
                    }
                });
            },
            /**
             * 调整积分
             */
            adjustCredits () {
                ajax.post('updateGoodsInfo', this.formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('updateInfo') }));
                        this.toggle();
                        this.$emit('updateSuccess');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('updateInfo') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>

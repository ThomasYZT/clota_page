<!--
    会员注册
    作者：杨泽涛
-->
<template>
    <Modal v-model="isShow"
           class-name="vertical-center-modal"
           :title="$t('goodDetails')">

        <Form ref="formList"
              :model="formData"
              :rules="ruleValidate"
              label-position="right"
              :label-width="150">

            <i-row>
                <i-col span="16" offset="4">
                    <!--商品名称-->
                    <Form-item :label="$t('colonSetting', { key : $t('goodsName') })">
                        <span>{{detail.name}}</span>
                    </Form-item>

                    <!--剩余可上架数量 = 库存数量 - 上架数量 - 已兑换未领取，此处后台已处理已兑换未领取数量-->
                    <Form-item :label="$t('colonSetting', { key : $t('overPlusUpQuantity') })">
                        <span>{{detail.stockNum - detail.upNum}}</span>
                    </Form-item>

                    <!--可兑换积分-->
                    <Form-item :label="$t('colonSetting', { key : $t('convertibilityIntegral') })" prop="requiredCredits">
                        <Input v-model.trim="formData.requiredCredits"
                               style="width:150px"
                               :placeholder="$t('inputField', { field : $t('convertibilityIntegral') })"></Input>
                    </Form-item>

                    <!--上架数量-->
                    <Form-item :label="$t('colonSetting', { key : $t('upNum') })" prop="upNum">
                        <InputNumber style="width:150px"
                                     v-model="formData.upNum"
                                     :precision="0"
                                     :min="1"
                                     :max="detail.stockNum - detail.upNum"></InputNumber>
                    </Form-item>
                </i-col>
            </i-row>

        </Form>

        <div slot="footer">
            <Button class="ivu-btn-90px" type="primary" @click="save">{{$t('save')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        components : {},
        data () {
            //校验是否为正整数
            const validateNum = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'fieldTypeError') {
                        callback(this.$t(err,{ field : this.$t(rule.field) }));
                    } else if (err === 'integetError') {
                        callback(this.$t(err, { field : this.$t(rule.field) }));
                    } else {
                        callback();
                    }
                });
            };
            return {
                //是否显示模态框
                isShow : false,
                //表单数据
                formData : {
                    //商品id
                    id : '',
                    //商品上下架状态
                    goodsStatus : 'up',
                    //商品兑换积分
                    requiredCredits : '',
                    //上架数量
                    upNum : 0,
                },
                //表单验证规则
                ruleValidate : {
                    //兑换时所用积分
                    requiredCredits : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('convertibilityIntegral') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur' }
                    ],
                    //上架数量
                    upNum : [
                        { required : true, type : 'number', message : this.$t('errorEmpty', { msg : this.$t('upNum') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur' }
                    ]
                },
                //商品上下架状态
                statuList : [
                    {
                        label : 'up',
                        value : 'up',
                    },
                    {
                        label : 'down',
                        value : 'down',
                    }
                ],
                //商品详情信息,由列表项获取
                detail : {}
            };
        },
        methods : {
            /**
             *  模态框显示/隐藏状态转换
             *  @param {object} data
             */
            toggle (data) {
                if (data) {
                    this.detail = data;
                    this.formData.id = this.detail.id;
                    this.formData.goodsStatus = this.detail.goodsStatus;
                    this.formData.requiredCredits = this.detail.requiredCredits.toString();
                }
                this.isShow = !this.isShow;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.$refs.formList.resetFields();
                this.toggle();
            },
            /**
             * 更新商品信息
             */
            save () {
                this.$refs.formList.validate( valid => {
                    if (valid) {
                        this.editGood();
                    }
                });
            },
            /**
             * 修改商品信息
             */
            editGood () {
                ajax.post('updateGoodsInfo', {
                    id : this.formData.id,
                    goodsStatus : 'up',
                    requiredCredits : this.formData.requiredCredits,
                    upNum : this.formData.upNum + this.detail.upNum,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('up') }));
                        this.toggle();
                        this.$emit('updateSuccess');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('up') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>

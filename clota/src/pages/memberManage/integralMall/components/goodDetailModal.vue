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
              :label-width="110">

            <i-row>
                <i-col span="16" offset="4">
                    <!--商品名称-->
                    <Form-item :label="$t('goodsName')">
                        <span>{{detail.name}}</span>
                    </Form-item>

                    <!--库存数量-->
                    <Form-item :label="$t('stockNum')">
                        <span>{{detail.stockNum}}</span>
                    </Form-item>

                    <!--可兑换积分-->
                    <Form-item :label="$t('convertibilityIntegral')" prop="requiredCredits">
                        <Input v-model.trim="formData.requiredCredits" style="width:200px" :placeholder="$t('inputField', { field : $t('convertibilityIntegral') })"></Input>
                    </Form-item>

                    <!--库存状态-->
                    <Form-item :label="$t('stockStatus')" prop="goodsStatus">
                        <Select v-model.trim="formData.goodsStatus" style="width:200px">
                            <Option v-for="(item, index) in statuList" :value="item.value" :key="index">{{ $t(item.label) }}</Option>
                        </Select>
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
    export default {
        components : {},
        data () {
            //校验是否为正整数
            const validateNum = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'fieldTypeError') {
                        callback(this.$t(err,{ field : '' }));
                    } else if (err === 'integetError') {
                        callback(this.$t(err, { field : '' }));
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
                    goodsStatus : '',
                    //商品兑换积分
                    requiredCredits : ''
                },
                //表单验证规则
                ruleValidate : {
                    requiredCredits : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('convertibilityIntegral') }), trigger : 'blur' },
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
                    this.formData.requiredCredits = this.detail.requiredCredits;
                }
                this.isShow = !this.isShow;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.formData = {
                    id : '',
                    goodsStatus : '',
                    requiredCredits : ''
                };
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

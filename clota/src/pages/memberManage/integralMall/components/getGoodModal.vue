<!--
    领取奖品模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="isShow"
           width="500"
           class-name="vertical-center-modal"
           class="get-goods"
           @on-visible-change="visibleChange"
           :title="$t('GetTheGoods')">
        <Form ref="formInline"
              v-if="!isGetStatus"
              :model="formData"
              :rules="ruleValidate"
              label-position="right"
              :label-width="100">
            <i-row>
                <i-col span="18" offset="3">
                    <Form-item :label="$t('ticketCode')"
                               prop="exchangeSecurities"
                               :label-width="70">
                        <Input v-model.trim="formData.exchangeSecurities" style="width:240px"
                               :placeholder="$t('inputField', { field : $t('ticketCode') })"/>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>
        <!-- 领取奖品时显示 -->
        <Form v-else
              label-position="right"
              :label-width="150">
            <i-row>
                <i-col span="14" offset="5">
                    <Form-item :label="$t('colonSetting', { key : $t('goodInfo') })">
                        <span>{{exchangeInfo.goodsName}}</span>
                    </Form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="14" offset="5">
                    <Form-item :label="$t('colonSetting', { key : $t('changerInfo') })">
                        <span>{{exchangeInfo.memberName}}</span>
                    </Form-item>
                </i-col>
            </i-row>
        </Form>

        <div slot="footer">
            <Button class="ivu-btn-90px" v-if="isGetStatus" type="primary" @click="exchange">{{$t('exchange')}}</Button>
            <Button class="ivu-btn-90px" v-else type="primary" @click="submit">{{$t('submit')}}</Button>
            <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        components : {},
        data () {
            return {
                //是否显示模态框
                isShow : false,
                //表单数据
                formData : {
                    //兑换券号
                    exchangeSecurities : ''
                },
                //表单验证规则
                ruleValidate : {
                    exchangeSecurities : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('ticketCode') }), trigger : 'blur' },
                    ]
                },
                //商品兑换信息
                exchangeInfo : {},
                //模态框是否处于领取状态
                isGetStatus : false
            };
        },
        methods : {
            /**
             * 隐藏模态框
             */
            hide () {
                this.formData = {
                    exchangeSecurities : ''
                };
                this.exchangeInfo = {};
                this.isGetStatus = false;
                this.toggle();
            },
            /**
             * 模态框显示/隐藏状态转换
             * @param {object} data
             */
            toggle (data) {
                if (data) {
                    this.detail = data;
                    this.formData.goodsStatus = this.detail.goodsStatus;
                }
                this.isShow = !this.isShow;
            },
            /**
             * 提交券码
             */
            submit () {
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
                        this.queryGoodsChangeInfo();
                    }
                });
            },
            /**
             * 查询兑换信息
             */
            queryGoodsChangeInfo () {
                ajax.post('queryGoodsChangeInfo', this.formData).then(res => {
                    if (res.success) {
                        if (res.data) {
                            this.exchangeInfo = res.data ? res.data : {};
                            this.isGetStatus = true;
                        } else {
                            this.exchangeInfo = {};
                            this.$Message.error(this.$t('failToGet', { feild : this.$t('commodityExchangeInformation') }));
                        }
                    } else {
                        this.$Message.error(this.$t('failToGet', { feild : this.$t('commodityExchangeInformation') }));
                    }
                });
            },
            /**
             * 领取商品
             */
            exchange () {
                ajax.post('drawGoods', this.formData).then(res => {
                    if (res.success) {
                       this.$Message.success(this.$t('successTip', { tip : this.$t('exchange') }));
                       this.hide();
                    } else {
                        this.$Message.error(this.$t(res.code));
                    }
                });
            },
            /**
             * 模态框状态改变
             * @param{String} type 当前模态框状态
             */
            visibleChange (type) {
                if (type === false) {
                    this.$refs.formInline.resetFields();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-form {
        margin-top: 20px;
        width: 100%;
    }

    /deep/ .ivu-modal-body {
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

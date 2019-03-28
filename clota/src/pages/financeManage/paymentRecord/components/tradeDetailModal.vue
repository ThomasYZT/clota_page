<!--交易详情-->

<template>
    <Modal
        :title="modalTitle"
        :mask-closable="false"
        :value="value"
        :width="730"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="confirm-member-info"
        class-name="vertical-center-modal">
        <Form :label-width="110">
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('transactionType') })">
                    <template v-if="tradeDetail.txnType === 'trade'">{{$t('trade')}}</template>
                    <template v-else-if="tradeDetail.txnType === 'refund'">{{$t('refund')}}</template>
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2'">
                <FormItem :label="$t('colonSetting',{ key : $t('goodsName') })">
                    {{tradeDetail.extData.body}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6'">
                <FormItem :label="$t('colonSetting',{ key : $t('goodsName') })">
                    {{tradeDetail.extData.txnShortDesc}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2'">
                <FormItem :label="$t('colonSetting',{ key : $t('recipAccount') })">
                    {{tradeDetail.extData.openId}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6'">
                <FormItem :label="$t('colonSetting',{ key : $t('recipAccount') })">
                    {{tradeDetail.extData.payerRealId}}
                </FormItem>
            </i-col>
            <i-col span="12">
                <FormItem :label="$t('colonSetting',{ key : $t('merOrderNum') })">
                    {{tradeDetail.merchantOrderNo | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('payNumber') })">
                    {{tradeDetail.platformTxnNo | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.txnType === 'refund'">
                <FormItem :label="$t('colonSetting',{ key : $t('refundNumber') })">
                    {{tradeDetail.platformTxnNo | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2'">
                <FormItem :label="$t('colonSetting',{ key : $t('APPID') })">
                    {{tradeDetail.merchantOrderNo | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6'">
                <FormItem :label="$t('colonSetting',{ key : $t('transactionTime') })">
                    {{tradeDetail.extData.txnReqTime | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('paymentTime') })">
                    {{tradeDetail.extData.txnAnsTime | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6' && tradeDetail.txnType === 'refund'">
                <FormItem :label="$t('colonSetting',{ key : $t('refundOfTime') })">
                    {{tradeDetail.extData.txnAnsTime | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('payFund') })">
                    {{tradeDetail.extData.txnAmt | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6' && tradeDetail.txnType === 'refund'">
                <FormItem :label="$t('colonSetting',{ key : $t('refundAmount') })">
                    {{Math.abs(tradeDetail.extData.txnAmt) | moneyFilter | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6'">
                <FormItem :label="$t('colonSetting',{ key : $t('merRealGet') })">
                    {{tradeDetail.extData.incomeAmt | moneyFilter | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '6'">
                <FormItem :label="$t('colonSetting',{ key : $t('serviceFee') })">
                    {{tradeDetail.extData.serviceFee | moneyFilter | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('paymentTime') })">
                    {{tradeDetail.extData.tradeTime | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'refund'">
                <FormItem :label="$t('colonSetting',{ key : $t('refundOfTime') })">
                    {{tradeDetail.extData.tradeTime | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('payScene') })">
                    {{getWxPayType(tradeDetail.extData.tradeType)}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2'">
                <FormItem :label="$t('colonSetting',{ key : $t('tradeStatus') })">
                    {{$t('wxPayRe.' + tradeDetail.extData.tradeState)}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('orderAmount') })">
                    {{tradeDetail.extData.totalFee | moneyFilter | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'refund'">
                <FormItem :label="$t('colonSetting',{ key : $t('refundAmount') })">
                    {{tradeDetail.extData.settlementRefundFee | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('fee') })">
                    {{tradeDetail.extData.poundage | moneyFilter | contentFilter}}
                </FormItem>
            </i-col>
            <i-col span="12" v-if="tradeDetail.channelId === '2' && tradeDetail.txnType === 'trade'">
                <FormItem :label="$t('colonSetting',{ key : $t('handlingRate') })">
                    {{tradeDetail.extData.poundageRate | contentFilter}}
                </FormItem>
            </i-col>
        </Form>
        <div slot="footer">
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="close">{{$t('close')}}</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //是否显示取消按钮
            'trade-detail' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {};
        },
        methods : {
            /**
             * 取消操作，隐藏模态框
             */
            close () {
                this.$emit('input', false);
            },
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
            },
            /**
             * 微信支付方式
             * @param{String} tradeType 支付方式code
             * @return {*}
             */
            getWxPayType (tradeType) {
                if (tradeType === 'JSAPI') {
                    return this.$t('wxPay.JSAPI');
                } else if (tradeType === 'NATIVE') {
                    return this.$t('wxPay.NATIVE');
                } else if (tradeType === 'APP') {
                    return this.$t('wxPay.APP');
                } else if (tradeType === 'MWEB') {
                    return this.$t('wxPay.MWEB');
                } else if (tradeType === 'MICROPAY') {
                    return this.$t('wxPay.MICROPAY');
                } else {
                    return '-';
                }
            },
        },
        computed : {
            //模态框标题
            modalTitle () {
                if (this.tradeDetail) {
                    if (this.tradeDetail.channelId === '2') {
                        return this.$t('wxOrderDetail');
                    } else if (this.tradeDetail.channelId === '6') {
                        return this.$t('aliOrderDetail');
                    } else {
                        return this.$t('orderDetail');
                    }
                } else {
                    return this.$t('orderDetail');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .confirm-member-info{

        /deep/ .word-wrap{
            @include overflow_tip();
            @include block_outline($width : auto);
        }

        /deep/ .ivu-form-item{
            margin-bottom: 0;
        }

        /deep/ .ivu-modal-body{
            overflow: auto;
            max-height: 400px;
            min-height: 200px;
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;

            .ivu-form{
                width: 100%;
                overflow: auto;
            }

            .ivu-form-item-content{
                color: $color_666;
                margin-left: 0!important;
            }

            .ivu-form-item-label{
                padding-right: 5px;
                padding-left: 10px;
                width: auto!important;
            }
        }

        /deep/ .card-title{
            font-size: $font_size_14px;
            color: $color_000;
            clear: both;
            padding: 10px 0 5px 10px;
        }

        /deep/ .hr{
            @include block_outline($height : 10px);
            height: 10px;
            clear: both;
        }
    }
</style>

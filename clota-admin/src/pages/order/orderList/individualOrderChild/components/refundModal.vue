<!--
    申请退票模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('ApplyForRefund')"
           class-name="vertical-center-modal apply-refund-modal"
           width="420">

        <Form :label-width="150"
              style="display: flex;min-height: 120px;flex-direction: column;justify-content: center"
              label-position="right">
            <FormItem :label="$t('ApplyForRefundNum')" style="margin-bottom: 10px;">
                {{num}}
            </FormItem>
            <FormItem :label="$t('cancellationCharge')" style="margin-bottom: 10px;">
                {{fee | moneyFilter}}
            </FormItem>
        </Form>

        <div class="err-message" v-if="errMsg">{{errMsg}}</div>
        <div class="err-message" v-if="returnRuleNotAllowMsg">{{returnRuleNotAllowMsg}}</div>

        <div class="btn-wrapper" slot="footer">
            <Button class="btn-88px" type="primary" @click="save">{{$t('confirm')}}</Button>
            <Button class="btn-88px" type="default" @click="toggle">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import ajax from '@/api/index';
    export default {
        props : {
            //申请退票的产品信息
            'refund-ticket-info' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //模态框隐藏显示状态
                visible : false,
                //申请退票数量
                num : 0,
                //退票手续费
                fee : '',
                //选择的数据
                chosedData : [],
                baseInfo : {},
                orderTicketIds : ''
            };
        },
        methods : {
            /**
             * 显示/隐藏 申请退票模态框
             */
            toggle (data) {
                if (!this.visible && data) {
                    this.chosedData = data.chosedData;
                    this.baseInfo = data.baseInfo;
                    this.num = this.chosedData.length;
                    this.getFee(this.chosedData);
                } else {
                    this.chosedData = [];
                    this.num = 0;
                    this.baseInfo = {};
                    this.orderTicketIds = '';
                }
                this.visible = !this.visible;
            },
            /**
             * 获取退票手续费
             */
            getFee (chosedData) {
                this.orderTicketIds = chosedData.map(item => item.id).join(',');
                ajax.post('getRefundProcedureFee', {
                    orderTicketsIds : this.orderTicketIds,
                    orderProductId : this.baseInfo.orderProductId,
                    orderId : this.baseInfo.id,
                }).then(res => {
                    if (res.status === 200) {
                        this.fee = res.data ? res.data : 0;
                    } else {
                        this.fee = 0;
                    }
                });
            },
            /**
             * 确认退票
             */
            save () {
                ajax.post('saveOrderProductRefundAlter', {
                    orderId : this.baseInfo.id,
                    visitorProductId : this.baseInfo.visitorProductId,
                    productId : this.baseInfo.productId,
                    reqOrderTicketIds : this.orderTicketIds,
                    reqType : 'refund',
                    orgId : this.baseInfo.orgId
                }).then(res => {
                    if (res.status === 200) {
                        this.$Message.success(this.$t('ApplicationForRefundSuccess'));
                        this.toggle();
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error(this.$t('ApplicationForRefundFail'));
                        this.toggle();
                    }
                });
            }
        },
        computed : {
            //错误提示信息
            errMsg () {
                let data = this.refundTicketInfo;
                for (let i = 0,j = data.length; i < j; i++) {
                    //如果景区退票的时候选择了已核销的产品需要给出提示
                    if (data[i]['verifyStatus'] === 'true') {
                        return this.$t('refundProductTip');// 提示：您申请退票的产品中包含已核销的产品
                    }
                }
                return '';
            },
            //勾选了按规则不可退的产品错误信息
            returnRuleNotAllowMsg () {
                let canNotReturn = this.refundTicketInfo.filter(item => item.policyReturnRule === 'notAllow');
                if (canNotReturn.length > 0) {
                    return this.$t('returnRuleNotAllowMsg');
                } else {
                    return '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .apply-refund-modal{

        /deep/ .ivu-modal-body {
            margin-bottom: 0!important;
        }

        .refund-info {
            margin-top: 10px;
            .warn-info {
                color: $color_F7981C_080;
            }
        }

        .btn-wrapper {
            .btn-88px {
                width: 88px;
            }
        }
    }
</style>

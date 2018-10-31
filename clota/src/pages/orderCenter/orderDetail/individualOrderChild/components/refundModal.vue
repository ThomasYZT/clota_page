<!--
    申请退票模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('ApplyForRefund')"
           class-name="vertical-center-modal"
           width="420">

        <Form :label-width="150"
              label-position="right">
            <FormItem :label="$t('ApplyForRefundNum')">
                {{num}}
            </FormItem>
            <FormItem :label="$t('cancellationCharge')">
                {{fee | moneyFilter}}
            </FormItem>
        </Form>

        <div class="btn-wrapper" slot="footer">
            <Button class="btn-88px" type="primary" @click="save">{{$t('confirm')}}</Button>
            <Button class="btn-88px" type="default" @click="toggle">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom'
    import ajax from '@/api/index'
    export default {
        components: {
            tableCom
        },
        data() {
            return {
                //模态框隐藏显示状态
                visible: false,
                //申请退票数量
                num: 0,
                //退票手续费
                fee: '',
                //选择的数据
                chosedData: [],
                baseInfo: {},
                orderTicketIds: ''
            }
        },
        methods: {
            /**
             * 显示/隐藏 申请退票模态框
             */
            toggle(data) {
                if(!this.visible && data) {
                    this.chosedData = data.chosedData;
                    this.baseInfo = data.baseInfo;
                    this.num = this.chosedData.length;
                    this.getFee(this.chosedData);
                }else {
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
            getFee(chosedData) {
                this.orderTicketIds = chosedData.map(item => item.id).join(',');
                ajax.post('getRefundProcedureFee', {
                    orderProductId: chosedData[0].orderProductId,
                    orderTicketIds: this.orderTicketIds,
                    orderId: this.baseInfo.orderId,
                }).then(res => {
                    if(res.success) {
                        this.fee = res.data;
                    }
                })
            },
            /**
             * 确认退票
             */
            save() {
                ajax.post('saveOrderProductRefundAlter', {
                    reqType: 'refund',
                    orderId: this.baseInfo.orderId,
                    visitorProductId: this.baseInfo.visitorProductId,
                    productId: this.baseInfo.productId,
                    reqOrderTicketIds: this.orderTicketIds,
                }).then(res => {
                    if(res.success) {
                        this.$Message.success(this.$t('ApplicationForRefundSuccess'));
                        this.toggle();
                        this.$emit('fresh-data');
                    }else {
                        this.$Message.error(this.$t('ApplicationForRefundFail'));
                        this.toggle();
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

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

</style>

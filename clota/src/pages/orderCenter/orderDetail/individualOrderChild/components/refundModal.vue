<!--
    申请退票模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           title="申请退票"
           width="420">

        <Form :label-width="150"
              label-position="right">
            <FormItem label="申请退票数量">
                {{num}}
            </FormItem>
            <FormItem label="退票手续费">
                {{fee | moneyFilter}}
            </FormItem>
        </Form>

        <div class="btn-wrapper" slot="footer">
            <Button class="btn-88px" type="primary" @click="save">确定</Button>
            <Button class="btn-88px" type="default" @click="toggle">取消</Button>
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
                }
                this.visible = !this.visible;
            },
            /**
             * 获取退票手续费
             */
            getFee(chosedData) {
                chosedData.forEach(item => {
                    this.orderTicketIds += item.id + ',';
                });

                ajax.post('getRefundProcedureFee', {
                    orderProductId: chosedData[0].orderProductId,
                    orderTicketIds: this.orderTicketIds
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
                        this.$Message.success(this.$t('successTip',{'tip' : this.$t('return')}));
                        this.toggle();
                    }else {
                        this.$Message.error(this.$t('failureTip',{'tip' : this.$t('return')}));
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

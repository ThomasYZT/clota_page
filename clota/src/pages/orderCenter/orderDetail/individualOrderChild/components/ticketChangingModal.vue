<!--
    改签模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           title="申请改签"
           width="420">

        <Form :label-width="150"
              label-position="right">
            <FormItem label="申请改签数量">
                {{num}}
            </FormItem>
            <FormItem label="申请改签至">
                <DatePicker v-model="afterAlterDate"
                            format="yyyy-MM-dd"
                            type="date"
                            :clearable="false"
                            :editable="false"
                            transfer>
                </DatePicker>
            </FormItem>
        </Form>

        <div class="btn-wrapper" slot="footer">
            <Button class="btn-88px" type="primary" @click="save">确定</Button>
            <Button class="btn-88px" type="default" @click="toggle">取消</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index'
    export default {
        components: {},
        data() {
            return {
                //是否显示模态框
                visible: false,
                //已选择的行数据
                chosedData: [],
                //申请改签数量
                num: 0,
                baseInfo: {},
                //改签日期
                afterAlterDate: '',
                orderTicketIds: ''

            }
        },
        methods: {
            toggle(data) {
                if(!this.visible && data) {
                    this.chosedData = data.chosedData;
                    this.baseInfo = data.baseInfo;
                    this.num = this.chosedData.length;
                    data.chosedData.forEach(item => {
                        this.orderTicketIds += item.id + ',';
                    });
                }else {
                    this.chosedData = [];
                    this.num = 0;
                    this.baseInfo = {};
                }

                this.visible = !this.visible;
            },
            /**
             * 确认改签
             */
            save() {
                ajax.post('saveOrderProductRefundAlter', {
                    reqType: 'alter',
                    orderId: this.baseInfo.orderId,
                    visitorProductId: this.baseInfo.visitorProductId,
                    productId: this.baseInfo.productId,
                    reqOrderTicketIds: this.orderTicketIds,
                    afterAlterDate: new Date(this.afterAlterDate).format('yyyy-MM-dd')
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
</style>

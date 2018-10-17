<!--
内容：散客批量审核
作者：djc
日期：
-->

<template>
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="130">
                <!--订单明细编号-->
                <Form-item :label="$t('订单明细编号') + '：'" prop="">
                    <span>{{formData.orderDetailNo}}</span>
                </Form-item>
                <!--产品名称-->
                <Form-item :label="$t('productName') + '：'" prop="">
                    <span>{{formData.productName | contentFilter}}</span>
                </Form-item>
                <!--游客姓名-->
                <Form-item :label="$t('游客姓名') + '：'" prop="">
                    <span>{{formData.visitorName | contentFilter}}</span>
                </Form-item>
                <!--手机号-->
                <Form-item :label="$t('mobilePhone') + '：'" prop="">
                    <span>{{formData.phoneNumber | contentFilter}}</span>
                </Form-item>
                <!--申请数量-->
                <Form-item :label="$t('申请数量') + '：'" prop="">
                    <span>{{formData.reqNum | contentFilter}}</span>
                </Form-item>
                <!--退票 - （通过/驳回）数量-->
                <Form-item :label="$t('通过数量') + '：'" prop="">
                    <span>{{formData.quantityRefunded | contentFilter}}</span>
                </Form-item>
                <!--改签 - （通过/驳回）数量-->
                <!--<Form-item :label="$t('通过数量') + '：'" prop="">
                    <span>{{orderData.quantityRescheduled | contentFilter}}</span>
                </Form-item>-->
                <!--备注-->
                <Form-item :label="$t('remark') + '：'" prop="">
                    <Input v-model.trim="formData.auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('请填写备注，不超过500个字符')" />
                </Form-item>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="bulkBatchAudit()" v-if="orderData.type == 'pass'">{{$t("审核通过")}}</Button>
            <Button type="primary" @click="bulkBatchAudit()" v-if="orderData.type == 'reject'">{{$t("驳回")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>
<script type="text/ecmascript-6">
    import ajax from '@/api/index';

    export default {
        components: {},
        props: {},
        data() {
            return {
                //订单数据
                orderData: {
                    items: [],  //表格数据
                    isBatch: false,
                    type: ''
                },
                //表单数据
                formData: {
                    auditRemark: ''
                },
                //校验规则
                ruleValidate: {

                },
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            show ( data ) {
                if (data) {
                    this.orderData = data;
                    if (data.items[0]) {
                        Object.assign(this.formData, data.items[0]);
                    }

                    if (data.type == 'pass') {
                        this.title = '审核通过';
                    } else if (data.type == 'reject') {
                        this.title = '驳回申请';
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide() {
                this.formData.auditRemark = this.orderData.type = '';
                this.orderData.items = [];
                this.visible = false;
            },
            /**
             * 单个订单退票的审核通过/驳回
             */
            bulkBatchAudit() {
                ajax.post('auditBatchOrderProduct', {
                    productRefundAlterIds: this.orderData.items.map(item => item.productRefundAlterId).join(','),
                    remark: this.formData.auditRemark,
                    auditStatus: this.orderData.type,
                    reqType: 'refund'
                }).then(res => {
                    if(res.success){
                        this.hide();
                        if (this.orderData.type === 'pass') {
                            this.$Message.success(this.$t('订单已审核通过'));
                        } else if (this.orderData.type === 'reject') {
                            this.$Message.success(this.$t('订单已驳回'));
                        }

                        this.$emit('on-audited');
                    }
                });
            },
        }
    };
</script>

<style lang="scss">

</style>

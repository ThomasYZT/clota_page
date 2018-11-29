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
        width="600"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="180">
                <!--订单明细编号-->
                <Form-item :label="$t('orderDetailNo') + '：'" prop="">
                    <span>{{formData.orderDetailNo}}</span>
                </Form-item>
                <!--产品名称-->
                <Form-item :label="$t('productName') + '：'" prop="">
                    <div class="form-ellipsis-name" v-w-title="formData.productName">{{formData.productName | contentFilter}}</div>
                </Form-item>
                <!--游客姓名-->
                <Form-item :label="$t('touristName') + '：'" prop="">
                    <span>{{formData.visitorName | contentFilter}}</span>
                </Form-item>
                <!--手机号-->
                <Form-item :label="$t('mobilePhone') + '：'" prop="">
                    <span>{{formData.phoneNumber | contentFilter}}</span>
                </Form-item>
                <!--申请改签后的游玩日期-->
                <Form-item :label="$t('visitDateAfterAlter') + '：'" prop="" v-if="reqType=='alter'">
                    <span>{{formData.afterAlterDate | timeFormat('yyyy-MM-dd') | contentFilter}}</span>
                </Form-item>
                <!--申请数量-->
                <Form-item :label="$t('requestNum') + '：'" prop="">
                    <span>{{formData.reqNum | contentFilter}}</span>
                </Form-item>
                <!--通过 - （退票/改签）数量-->
                <Form-item :label="$t('passedNum') + '：'" prop="" v-if="orderData.type=='pass'">
                    <!--<span class="green" v-if="reqType=='refund'">{{formData.quantityRefunded | contentFilter}}</span>
                    <span class="green" v-if="reqType=='alter'">{{formData.quantityRescheduled | contentFilter}}</span>-->
                    <span class="green">{{formData.reqNum | contentFilter}}</span>
                </Form-item>
                <!--驳回 - （退票/改签）数量-->
                <Form-item :label="$t('rejectedNum') + '：'" prop="" v-if="orderData.type=='reject'">
                    <!--<span class="red" v-if="reqType=='refund'">{{formData.quantityRefunded | contentFilter}}</span>
                    <span class="red" v-if="reqType=='alter'">{{formData.quantityReschedule | contentFilter}}</span>-->
                    <span class="red">{{formData.reqNum | contentFilter}}</span>
                </Form-item>
                <!--备注-->
                <Form-item :label="$t('remark') + '：'" prop="auditRemark">
                    <Input v-model.trim="formData.auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('inputPlaceholder')" /><!--请输入-->
                </Form-item>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="bulkBatchAudit()" v-if="orderData.type == 'pass'">{{$t("passed")}}</Button>
            <Button type="error" @click="bulkBatchAudit()" v-if="orderData.type == 'reject'">{{$t("reject")}}</Button>
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
                visible: false,
                title: '',
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
                    auditRemark: {
                        type: 'string',
                        max: 500,
                        message: this.$t('errorMaxLength', {field: this.$t('remark'), length: 500}),
                        trigger: 'blur'
                    },
                },
            }
        },
        computed: {
            // 根据路由信息，判断散客退票or改签 页面：退票-refund， 改签-alter
            reqType() {
                if (this.$route.name=='auditBulkRefund') {
                    return 'refund';
                } else if (this.$route.name=='auditBulkChange') {
                    return 'alter';
                }
            }
        },
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
                        this.title = 'checkPass';   // 审核通过
                    } else if (data.type == 'reject') {
                        this.title = 'PRODUCT_AUDIT_REJECT';    // 驳回申请
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide() {
                this.visible = false;

                setTimeout(() => {
                    this.formData.auditRemark = this.orderData.type = '';
                    this.orderData.items = [];
                    this.$refs.formValidate.resetFields();
                }, 500);
            },
            /**
             * 单个订单退票的审核通过/驳回
             */
            bulkBatchAudit() {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        ajax.post('auditBatchOrderProduct', {
                            productRefundAlterIds: this.orderData.items.map(item => item.productRefundAlterId).join(','),
                            remark: this.formData.auditRemark,
                            auditStatus: this.orderData.type,
                            reqType: this.reqType
                        }).then(res => {
                            if(res.success){
                                if (this.orderData.type === 'pass') {
                                    this.$Message.success(this.$t('orderCheckPassed'));     // 订单已审核通过
                                } else if (this.orderData.type === 'reject') {
                                    this.$Message.success(this.$t('orderRejected'));    // 订单已驳回
                                }
                                this.hide();

                                this.$emit('on-audited');
                            }
                        });
                    }
                })
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .modal-body{
        padding: 5px 60px 14px 20px;

        .form-ellipsis-name {
            @include overflow_tip();
        }
    }

    /deep/ .ivu-form-item {
        margin-bottom: 0;
    }

    /deep/ .ivu-form-item-label {
        color: #585858;
    }

    /deep/ .ivu-form-item-content {
        color: #333;
    }

    .modal-footer{
        /deep/ .ivu-btn{
            width: 88px;
        }
    }

    .green {
        color: $color_green;
    }
    .red {
        color: $color_red;
    }
</style>

<template>
    <!--散客批量审核-->
    <Modal
        v-model="visible"
        :title="$t(title)"
        class-name="add-account-modal vertical-center-modal"
        width="600"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="table-wrap">
                <table-com
                    :height="250"
                    :table-com-min-height="250"
                    :column-data="batchColumnData"
                    :table-data="orderData.items"
                    :border="false">
                </table-com>
            </div>
            <!--备注-->
            <div>
                <span class="label-remark">{{$t('remark')}}：</span>
                <div :style="{marginLeft: lang=='zh-CN'?'45px':'60px', position: 'relative'}">
                    <Input v-model.trim="auditRemark"
                           type="textarea"
                           :rows="3"
                           :placeholder="$t('inputPlaceholder')" /><!--请输入-->
                    <p class="error-tip" v-show="auditRemark.length>500">{{$t('errorMaxLength', {field: this.$t('remark'), length: 500})}}</p>
                </div>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="bulkBatchAudit()" v-if="orderData.type == 'pass'">{{$t("passed")}}</Button>
            <Button type="error" @click="bulkBatchAudit()" v-if="orderData.type == 'reject'">{{$t("reject")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { bulkBatchAuditHead } from '../indRefundAuditConfig';
    import { mapGetters } from 'vuex';

    export default {
        props : [],
        components : {
            tableCom,
        },
        data () {
            return {
                visible : false,
                title : '',
                //批量表头配置
                batchColumnData : bulkBatchAuditHead,
                //订单数据
                orderData : {
                    items : [], //表格数据
                    isBatch : false,
                    type : ''
                },
                //审核备注
                auditRemark : ''
            };
        },
        computed : {
            ...mapGetters({
                lang : 'lang'
            }),
            // 根据路由信息，判断散客退票or改签 页面：退票-refund， 改签-alter
            reqType () {
                if (this.$route.name === 'indRefundOrderAudit') {
                    return 'refund';
                } else if (this.$route.name === 'indAlterOrderAudit') {
                    return 'alter';
                }
                return '';
            },
        },
        methods : {

            show ( data ) {
                if (data) {
                    this.orderData = data;
                    if (data.type == 'pass') {
                        this.title = '批量通过';
                    } else if (data.type == 'reject') {
                        this.title = '批量驳回';
                    }

                    if (this.reqType == 'refund') {
                        this.batchColumnData = bulkBatchAuditHead.filter(item => {
                            return item.field !== 'rescheduleAfterVisitDate';
                        });
                    }
                }

                this.visible = true;
            },
            //关闭模态框
            hide () {
                this.auditRemark = this.orderData.type = '';
                this.orderData.items = [];
                this.visible = false;
            },

            bulkBatchAudit () {
                if (this.auditRemark.length > 500) {
                    return;
                }
                ajax.post('updateIndividualOrderRefundAlterAudit', {
                    refundIds : this.orderData.items.map(item => item.refundId).join(','),
                    remark : this.auditRemark,
                    audit : this.orderData.type,
                    reqType : this.reqType
                }).then(res => {
                    if (res.status === 200) {
                        if (this.orderData.type === 'pass') {
                            this.$Message.success(this.$t('订单已批量审核通过'));
                        } else if (this.orderData.type === 'reject') {
                            this.$Message.success(this.$t('订单已批量驳回'));
                        }
                        this.hide();

                        this.$emit('on-audited');
                    } else {
                        this.$Message.error('审核失败');
                    }
                });
            },

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 14px 4px;

            .table-wrap {
                margin-bottom: 20px;
            }

            .order-amount {
                margin: 15px 20px;
                text-align: right;
            }
            .single-org {
                margin-bottom: 16px;
                .org-name {
                    display: inline-block;
                    max-width: 150px;
                    @include overflow_tip();
                    vertical-align: middle;
                }
            }

            .label-remark {
                float: left;
                font-size: 14px;
                color: #585858;
            }

            .error-tip {
                position: absolute;
                bottom: -18px;
                left: 0;
                font-size: 12px;
                color: $color_red;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

        .blue {
            color: $color_blue;
        }
    }
</style>

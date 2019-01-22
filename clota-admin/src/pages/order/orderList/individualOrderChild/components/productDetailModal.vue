<!--
    散客订单三级详情--产品明细弹窗
    作者：杨泽涛
-->
<template>
    <Modal  v-model="visibile"
            class-name="vertical-center-modal"
            :mask-closable="false"
            width="900">

        <div class="modal-title" slot="header">
            <span class="title">{{$t('individualProductDetail')}}</span>
            <span class="sub-title">{{$t('productDetailNo')}}：{{listItem.id | contentFilter}}</span>
        </div>

        <div class="content">
            <!--订单信息-->
            <div class="divider-header">
                <span>{{$t('orderInfo')}}</span>
            </div>
            <div class="list">
                <Form label-position="right"
                      :label-width="160">
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('orderNo')+'：'">
                                {{orderDetail.orderNo | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('orderTime')+'：'">
                                {{orderDetail.createdTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('orderDetailNo')+'：'">
                                {{orderDetail.orderDetailNo | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('OTAOrderNo')+'：'">
                                {{orderDetail.thirdOrderNo | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('SN')+'：'">
                                {{orderDetail.serialNo | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('sellingOrg')+'：'">
                                {{orderDetail.saleAgency | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('orderOrg')+'：'">
                                {{orderDetail.placeOrderOrgName | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('orderChannel')+'：'">
                                {{orderDetail.orderChannel ? $t('order.' + orderDetail.orderChannel) : '' | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
            </div>

            <!--产品信息-->
            <div class="divider-header">
                <span>{{$t('productInfo')}}</span>
            </div>
            <div class="list">
                <Form label-position="right"
                      :label-width="160">
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('scenePlace')+'：'">
                                {{listItem.orgName | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('productName')+'：'">
                                {{listItem.productName | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('playDate')+'：'">
                                {{listItem.visitDate | timeFormat('yyyy-MM-dd') | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('settlePrice')+'：'">
                                {{listItem.price | moneyFilter | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('SN')+'：'">
                                {{listItem.serialNo | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('takeTicketStatus')+'：'">
                                {{listItem.pickStatus === 'true' ? $t('haveTickets') : $t('noHaveTickets') | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('ticketTime')+'：'">
                                {{listItem.pickTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('verifyStatus')+'：'">
                                <span v-if="listItem.verifyStatus === 'true'">{{$t('consumed')}}</span>
                                <span v-else-if="listItem.verifyStatus === 'false'">{{$t('noConsumed')}}</span>
                                <span v-else-if="listItem.verifyStatus === 'overdue'">{{$t('expiredVerify')}}</span>
                                <span v-else>-</span>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('verifyTime')+'：'">
                                {{listItem.verifyTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('refundStatus')+'：'">
                                <template v-if="listItem.refundStatus === 'refunded'">{{$t('order.refunded')}}</template>
                                <template v-else-if="listItem.refundStatus === 'refund_audit'">{{$t('refundToBeReviewed')}}</template>
                                <template v-else-if="listItem.refundStatus === 'no_refund'">{{$t('order.no_refund')}}</template>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('refundTime')+'：'">
                                {{listItem.refundTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                        <!--改签状态-->
                            <FormItem :label="$t('rescheduleStatus') + '：'">
                                <!--改签待审核-->
                                <template v-if="listItem.rescheduleStatus === 'alter_audit'">{{$t('ModificationToBeReviewed')}}</template>
                                <!--已改签-->
                                <template v-else-if="listItem.rescheduleStatus === 'altered'">{{$t('order.altered')}}</template>
                                <!--未改签-->
                                <template v-else-if="listItem.rescheduleStatus === 'no_alter'">{{$t('order.no_alter')}}</template>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('modifyTime')+'：'">
                                {{listItem.rescheduleTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row >
                        <i-col span="10">
                            <FormItem :label="$t('syncStatus')+'：'">
                                <template v-if="listItem.syncStatus === 'success'">{{$t('synchronized')}}</template>
                                <template v-else-if="listItem.syncStatus === 'failure'">{{$t('syncFailed')}}</template>
                                <template v-else>-</template>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('syncTime')+'：'">
                                {{listItem.syncTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
            </div>

            <!--游客信息-->
            <div class="divider-header">
                <span>{{$t('touristInfo')}}</span>
            </div>
            <div class="list">
                <Form label-position="right"
                      :label-width="160">
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('touristName')+'：'">
                                {{visitorInfo.visitorName | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('mobilePhone')+'：'">
                                {{visitorInfo.phoneNumber | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('credentialsType')+'：'">
                                {{$t(cardType) | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('IdentificationNumber')+'：'">
                                {{cardNum | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                </Form>
            </div>

            <!--订单日志-->
            <div class="divider-header">
                <span>{{$t('orderLog')}}</span>
            </div>
            <div class="step-wrapper">
                <operateLog :order-record-list="orderRecordList"
                            :is-product-log="true"
                            :show-title="false">
                </operateLog>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="toggle()">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import operateLog from '../../../components/operateLog';
    export default {
        props : {
            //订单详情
            'order-detail' : {
                type : Object,
                default () {
                    return {};
                }
            },
            //游客信息
            'visitor-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            operateLog
        },
        data () {
            return {
                //是否显示
                visibile : false,
                //产品明细列表项数据
                listItem : {},
                //产品明细数据--接口数据
                productDetail : {},
                //产品操作日志
                orderRecordList : []
            };
        },
        computed : {
            //订单详情
            orderInfo () {
                if (Object.keys(this.productDetail).length > 0 && this.productDetail.orderInfo) {
                    return this.productDetail.orderInfo;
                } else {
                    return {};
                }
            },
            //证件类型
            cardType () {
                if (Object.keys(this.visitorInfo).length > 0 && this.visitorInfo.documentInfo) {
                    let type = JSON.parse(this.visitorInfo.documentInfo);
                    if (type.length > 0) {
                        return type[0].type;
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            //证件号码
            cardNum () {
                if (Object.keys(this.visitorInfo).length > 0 && this.visitorInfo.documentInfo) {
                    let documentInfo = JSON.parse(this.visitorInfo.documentInfo);
                    if (documentInfo.length > 0) {
                        return documentInfo[0].data;
                    }
                }
                return '';
            }
        },
        methods : {
            /**
             * 显示/隐藏模态框
             */
            toggle (detail) {
                if (!this.visibile && detail) {
                    this.listItem = detail;
                    this.queryTicketOperationLog();
                } else {
                    this.listItem = {};
                    this.productDetail = {};
                }
                this.visibile = !this.visibile;
            },
            /**
             * 获取产品操作日志
             */
            queryTicketOperationLog () {
                ajax.post('queryTicketOperationLog',{
                    orderTicketId : this.listItem.id
                }).then(res => {
                    if (res.status === 200) {
                        this.orderRecordList = res.data ? res.data : [];
                    } else {
                        this.orderRecordList = [];
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modal-title {
        .title {
            position: relative;
            font-size: $font-size_16px;
            i-color: #354052;

            &:after {
                position: absolute;
                content: '';
                height: 16px;
                margin: 0 5px;
                border-right: 1px solid #E1E1E1;
            }
        }

        .sub-title {
            margin-left:10px;
            font-size: $font-size_16px;
            i-color: #999999;
        }
    }

    /deep/ .ivu-modal-body{
        height: 500px;
        overflow: auto;
    }

    .content {

        .list {
            width: 90%;
            margin: 0 auto;

            /deep/ .ivu-form-item {
                margin-bottom: 0;
            }
        }
        /**
            分割线样式
        */
        .divider-header {
            margin: 20px 0;
            display: table;
            position: relative;
            text-align: center;
            width: 100%;

            span {
                white-space: nowrap;
                margin: 0 6px;
                i-color: #333333;
                font-size: 14px;
            }
            &:before {
                display: table-cell;
                position: relative;
                content: "";
                border-top: 1px dashed #E1E1E1;
                width: 50%;
                transform: translateY(50%);
            }
            &:after {
                display: table-cell;
                position: relative;
                content: "";
                border-top: 1px dashed #E1E1E1;
                width: 50%;
                transform: translateY(50%);
            }
        }
    }
</style>

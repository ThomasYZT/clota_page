<!--
    散客订单三级详情--产品明细弹窗
    作者：杨泽涛
-->
<template>
    <Modal  v-model="visibile"
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
                                {{orderInfo.orderNo | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('orderTime')+'：'">
                                {{orderInfo.orderTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('orderDetailNo')+'：'">
                                {{orderInfo.orderDetailNo | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('OTAOrderNo')+'：'">
                                {{orderInfo.thirdOrderNo | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('SN')+'：'">
                                {{orderInfo.serialNo | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('sellingOrg')+'：'">
                                {{orderInfo.saleOrg | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('orderOrg')+'：'">
                                {{orderInfo.channel | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('orderChannel')+'：'">
                                {{orderInfo.orderChannel ? $t('order.' + orderInfo.orderChannel) : '' | contentFilter}}
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
                                {{ticketInfo.scenic | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('productName')+'：'">
                                {{ticketInfo.productName | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('playDate')+'：'">
                                {{ticketInfo.visitDate | timeFormat('yyyy-MM-dd') | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('settlePrice')+'：'">
                                {{ticketInfo.price | moneyFilter | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('SN')+'：'">
                                {{ticketInfo.serialNo | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('takeTicketStatus')+'：'">
                                {{ticketInfo.pickStatus === 'true' ? $t('haveTickets') : $t('noHaveTickets') | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('ticketTime')+'：'">
                                {{ticketInfo.pickTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('verifyStatus')+'：'">
                                <span v-if="ticketInfo.verifyStatus === 'true'">{{$t('consumed')}}</span>
                                <span v-else-if="ticketInfo.verifyStatus === 'false'">{{$t('noConsumed')}}</span>
                                <span v-else-if="ticketInfo.verifyStatus === 'overdue'">{{$t('expiredVerify')}}</span>
                                <span v-else>-</span>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('verifyTime')+'：'">
                                {{ticketInfo.verifyTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                            <FormItem :label="$t('refundStatus')+'：'">
                                <template v-if="ticketInfo.refundStatus === 'refunded'">{{$t('order.refunded')}}</template>
                                <template v-else-if="ticketInfo.refundStatus === 'refund_audit'">{{$t('refundToBeReviewed')}}</template>
                                <template v-else-if="ticketInfo.refundStatus === 'no_refund'">{{$t('order.no_refund')}}</template>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('refundTime')+'：'">
                                {{ticketInfo.refundTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="10">
                        <!--改签状态-->
                            <FormItem :label="$t('rescheduleStatus') + '：'">
                                <!--改签待审核-->
                                <template v-if="ticketInfo.rescheduleStatus === 'alter_audit'">{{$t('ModificationToBeReviewed')}}</template>
                                <!--已改签-->
                                <template v-else-if="ticketInfo.rescheduleStatus === 'altered'">{{$t('order.altered')}}</template>
                                <!--未改签-->
                                <template v-else-if="ticketInfo.rescheduleStatus === 'no_alter'">{{$t('order.no_alter')}}</template>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('modifyTime')+'：'">
                                {{ticketInfo.rescheduleTime | contentFilter}}
                            </FormItem>
                        </i-col>
                    </Row>
                    <!--只有景区可见同步状态和同步时间-->
                    <Row v-if="viewType === 'scenic'">
                        <i-col span="10">
                            <FormItem :label="$t('syncStatus')+'：'">
                                <template v-if="ticketInfo.syncStatus === 'success'">{{$t('synchronized')}}</template>
                                <template v-else-if="ticketInfo.syncStatus === 'failure'">{{$t('syncFailed')}}</template>
                                <template v-else>-</template>
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('syncTime')+'：'">
                                {{ticketInfo.syncTime | contentFilter}}
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
                                {{visitor.visitorName | contentFilter}}
                            </FormItem>
                        </i-col>
                        <i-col span="10">
                            <FormItem :label="$t('mobilePhone')+'：'">
                                {{visitor.phoneNumber | contentFilter}}
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
            //当前查看详情角色
            'view-type' : {
                type : String,
                default : ''
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
                productDetail : {}
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
            //产品信息
            ticketInfo () {
                if (Object.keys(this.productDetail).length > 0 && this.productDetail.ticketInfo) {
                    return this.productDetail.ticketInfo;
                } else {
                    return {};
                }
            },
            //游客信息
            visitor () {
                if (Object.keys(this.productDetail).length > 0 && this.productDetail.visitor) {
                    return this.productDetail.visitor;
                } else {
                    return {};
                }
            },
            //订单日志
            orderRecordList () {
                if (Object.keys(this.productDetail).length > 0 && this.productDetail.orderRecordList) {
                    return this.productDetail.orderRecordList;
                } else {
                    return [];
                }
            },
            //证件类型
            cardType () {
                if (Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    let type = JSON.parse(this.visitor.documentInfo);
                    if (type.length != 0) {
                        switch (type[0].type) {
                            case 'identity':
                                return 'identity';
                            case 'passport':
                                return 'passport';
                            case 'driver':
                                return 'driverLisence';
                            case 'officer':
                                return 'officer';
                            case 'police':
                                return 'police';
                            case 'license':
                                return 'licence';
                        }
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            },
            //证件号码
            cardNum () {
                if (Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    let documentInfo = JSON.parse(this.visitor.documentInfo);
                    if (documentInfo.length !== 0) {
                        return documentInfo[0].data;
                    }
                }
            }
        },
        methods : {
            /**
             * 显示/隐藏模态框
             */
            toggle (detail) {
                if (!this.visibile && detail) {
                    this.listItem = detail;
                    this.getData();
                } else {
                    this.listItem = {};
                    this.productDetail = {};
                }
                this.visibile = !this.visibile;
            },
            /**
             * 获取模态框数据
             */
            getData () {
                ajax.post('queryThirdIndividualOrderDetail',{
                    ticketId : this.listItem.id
                }).then(res => {
                    if (res.success) {
                        this.productDetail = res.data;
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
        .step-wrapper {
            width: 700px;
            margin: 0 auto;
        }

        /deep/ .ivu-steps-clota {
            margin-left: 335px;
            width: calc(100% - 250px);
        }
    }
</style>

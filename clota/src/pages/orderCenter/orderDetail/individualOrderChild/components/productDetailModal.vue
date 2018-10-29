<!--
    散客订单三级详情--产品明细弹窗
    作者：杨泽涛
-->
<template>
    <Modal  v-model="visibile"
            :mask-closable="false"
            width="900">

        <div class="modal-title" slot="header">
            <span class="title">散客产品明细</span>
            <span class="sub-title">产品明细编号：{{listItem.id | contentFilter}}</span>
        </div>

        <div class="content">
            <!--订单信息-->
            <div class="divider-header">
                <span>订单信息</span>
            </div>
            <div class="list">
                <Form label-position="right"
                      :label-width="160">
                    <Row>
                        <Col span="10">
                            <FormItem label="订单编号：">
                                {{orderInfo.orderNo | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="下单时间：">
                                {{orderInfo.orderTime | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="订单明细编号：">
                                {{orderInfo.orderDetailNo | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="OTA订单号：">
                                {{orderInfo.thirdOrderNo | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="串码：">
                                {{orderInfo.serialNo | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="发售机构：">
                                {{orderInfo.saleOrg | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="下单企业：">
                                {{orderInfo.channel | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="下单渠道：">
                                {{orderInfo.orderChannel | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

            <!--产品信息-->
            <div class="divider-header">
                <span>产品信息</span>
            </div>
            <div class="list">
                <Form label-position="right"
                      :label-width="160">
                    <Row>
                        <Col span="10">
                            <FormItem label="所属景区：">
                                {{ticketInfo.scenic | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="产品名称：">
                                {{ticketInfo.productName | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="游玩日期：">
                                {{ticketInfo.visitDate | timeFormat('yyyy-MM-dd') | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="产品单价：">
                                {{ticketInfo.price | moneyFilter | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="串码：">
                                {{ticketInfo.serialNo | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="取票状态：">
                                {{ticketInfo.pickStatus === 'true' ? '已取票' : '未取票' | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="取票时间：">
                                {{ticketInfo.pickTime | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="核销状态：">
                                {{ticketInfo.verifyStatus === 'true' ? '已核销' : '未核销' | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="核销时间：">
                                {{ticketInfo.verifyTime | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="退票状态：">
                                <template v-if="ticketInfo.refundStatus === 'refunded'">{{$t('已退票')}}</template>
                                <template v-else-if="ticketInfo.refundStatus === 'refund_audit'">{{$t('退票待审核')}}</template>
                                <template v-else-if="ticketInfo.refundStatus === 'no_refund'">{{$t('未退票')}}</template>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="退票时间：">
                                {{ticketInfo.refundTime | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="改签状态：">
                                <template v-if="ticketInfo.rescheduleStatus === 'alter_audit'">{{$t('改签待审核')}}</template>
                                <template v-else-if="ticketInfo.rescheduleStatus === 'altered'">{{$t('已改签')}}</template>
                                <template v-else-if="ticketInfo.rescheduleStatus === 'no_alter'">{{$t('未改签')}}</template>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="改签时间：">
                                {{ticketInfo.rescheduleTime | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <!--只有景区可见同步状态和同步时间-->
                    <Row v-if="viewType === 'scenic'">
                        <Col span="10">
                            <FormItem label="同步状态：">
                                <template v-if="ticketInfo.syncStatus === 'success'">{{$t('synchronized')}}</template>
                                <template v-else-if="ticketInfo.syncStatus === 'failure'">{{$t('syncFailed')}}</template>
                                <template v-else>-</template>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="同步时间：">
                                {{ticketInfo.syncTime | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

            <!--游客信息-->
            <div class="divider-header">
                <span>游客信息</span>
            </div>
            <div class="list">
                <Form label-position="right"
                      :label-width="160">
                    <Row>
                        <Col span="10">
                            <FormItem label="游客姓名：">
                                {{visitor.visitorName | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="手机号：">
                                {{visitor.phoneNumber | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="证件类型：">
                                {{cardType | contentFilter}}
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="证件号码：">
                                {{cardNum | contentFilter}}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>

            <!--订单日志-->
            <div class="divider-header">
                <span>订单日志</span>
            </div>
            <div class="step-wrapper">
                <Steps direction="vertical" size="small" class="ivu-steps-clota">
                    <Step v-for="item in orderRecordList"
                          :key="item.createdTime"
                          icon="clota"
                          :class="getClass(item)"
                          :title="item.contents" >
                        <span class="time">{{item.createdTime}}</span>
                        <span class="operater">操作者：{{item.createOrg}} {{item.createName}} </span>
                    </Step>
                </Steps>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="toggle()">取消</Button>
        </div>
    </Modal>
</template>

<script>

    import ajax from '@/api/index'
    export default {
        props :{
            //当前查看详情角色
            'view-type': {
                type: String,
                default: ''
            }
        },
        components: {},
        data() {
            return {
                //是否显示
                visibile: false,
                //产品明细列表项数据
                listItem: {},
                //产品明细数据--接口数据
                productDetail: {}
            }
        },
        computed: {
            //订单详情
            orderInfo() {
                if(Object.keys(this.productDetail).length > 0 && this.productDetail.orderInfo) {
                    return this.productDetail.orderInfo;
                }else {
                    return {}
                }
            },
            //产品信息
            ticketInfo() {
                if(Object.keys(this.productDetail).length > 0 && this.productDetail.ticketInfo) {
                    return this.productDetail.ticketInfo;
                }else {
                    return {}
                }
            },
            //游客信息
            visitor() {
                if(Object.keys(this.productDetail).length > 0 && this.productDetail.visitor) {
                    return this.productDetail.visitor;
                }else {
                    return {}
                }
            },
            //订单日志
            orderRecordList() {
                if(Object.keys(this.productDetail).length > 0 && this.productDetail.orderRecordList) {
                    return this.productDetail.orderRecordList;
                }else {
                    return [];
                }
            },
            //证件类型
            cardType() {
                if(Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    console.log(this.visitor)
                    let type = JSON.parse(this.visitor.documentInfo);
                    if(type.length != 0){
                        switch (type[0].type) {
                            case 'identity':
                                return '身份证';
                                break;
                            case 'passport':
                                return '护照';
                                break;
                            case 'driver':
                                return '驾驶证';
                                break;
                            case 'officer':
                                return '军官证';
                                break;
                            case 'police':
                                return '警官证';
                                break;
                            case 'license':
                                return '车牌号';
                                break;
                        }
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            },
            //证件号码
            cardNum() {
                if(Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    let documentInfo = JSON.parse(this.visitor.documentInfo);
                    if(documentInfo.length !== 0){
                        return documentInfo[0].data;
                    }
                }
            }
        },
        methods: {
            /**
             * 显示/隐藏模态框
             */
            toggle(detail) {
                console.log(detail)
                if(!this.visibile && detail) {
                    this.listItem = detail;
                    this.getData()
                }else {
                    this.listItem = {};
                    this.productDetail = {};
                }
                this.visibile = !this.visibile;
            },
            /**
             * 获取模态框数据
             */
            getData() {
                ajax.post('queryThirdIndividualOrderDetail',{
                    ticketId: this.listItem.id
                }).then(res => {
                    if(res.success){
                        this.productDetail = res.data;
                    }
                })
            },
            /**
             * 获取步骤类名
             * @param data
             */
            getClass (data) {
                switch(data.operationStatus){
                    //订单退票申请
                    case 'ORDER_REFUND_APPLY' : return 'blue-status';
                    //订单退票审核
                    case 'ORDER_REFUND_AUDIT' : return 'green-status';
                    //订单改签申请
                    case 'ORDER_ALTER_APPLY' : return 'green-status';
                    //订单改签审核
                    case 'ORDER_ALTER_AUDIT' : return 'green-status';
                    //新建订单
                    case 'ORDER_NEW_ORDER' : return 'blue-status';
                    //新增票券
                    case 'ORDER_NEW_TICKET' : return 'blue-status';
                    //"团队订单审核驳回
                    case 'ORDER_AUDIT_REJECT' : return 'red-status';
                    //"团队订单审核通过
                    case 'ORDER_AUDIT_PASS' : return 'green-status';
                    //核销
                    case 'ORDER_VERIFY_TICKET' : return 'green-status';
                    default : return 'blue-status'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .modal-title {
        .title {
            position: relative;
            font-size: $font-size_16px;
            color: #354052;

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
            color: #999999;
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
                color: #333333;
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
            width: 50%;
            margin: 0 auto;
        }
    }
</style>

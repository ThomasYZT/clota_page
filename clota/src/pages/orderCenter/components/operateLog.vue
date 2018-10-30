<!--订单操作日志-->

<template>
    <div class="order-operate-log">
        <div class="title" v-if="showTitle">{{$t('orderOperateLog')}}</div>
        <Steps direction="vertical" size="small" class="ivu-steps-clota">
            <Step v-for="item in operateLogDeal"
                  :key="item.createdTime"
                  icon="clota"
                  :class="item.className"
                  :title="item.contentDeal" >
                <span class="time">{{item.createdTime}}</span>
                <span class="operater">{{$t('operator')}}：{{item.createOrg}} {{item.createName}} </span>
            </Step>
        </Steps>
    </div>
</template>

<script>
    export default {
        props :{
            //操作记录
            'order-record-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //是否显示标题
            'show-title' : {
                type : Boolean,
                default : true
            }
        },
        data() {
            return {
                //各种状态对应的类名
                constClassDefined : {
                    //订单退票申请
                    'ORDER_REFUND_APPLY' : 'blue-status',
                    //订单退票审核
                    'ORDER_REFUND_AUDIT' : 'green-status',
                    //订单改签申请
                    'ORDER_ALTER_APPLY' : 'green-status',
                    //订单改签审核
                    'ORDER_ALTER_AUDIT' : 'green-status',
                    //新建订单
                    'ORDER_NEW_ORDER' : 'blue-status',
                    //新增票券
                    'ORDER_NEW_TICKET' : 'blue-status',
                    //"团队订单审核驳回
                    'ORDER_AUDIT_REJECT' : 'red-status',
                    //"团队订单审核通过
                    'ORDER_AUDIT_PASS' : 'green-status',
                    //核销
                    'ORDER_VERIFY_TICKET' : 'green-status',
                }
            }
        },
        methods: {
            /**
             * 获取日志详细内容
             * @param itemData
             */
            getContentDetail (itemData) {
                let contentsObj = {};
                if(itemData.contents && itemData.contents.substr(0,1) === '{'){
                    contentsObj = JSON.parse(itemData.contents);
                }else{
                    contentsObj = {};
                }
                switch(itemData.operationStatus) {
                    //订单退票申请
                    case 'ORDER_REFUND_APPLY' : return `申请退票，数量：${contentsObj.reqNum}。`;
                    //订单退票审核
                    case 'ORDER_REFUND_AUDIT' : return `退票审核，通过数量：${contentsObj.passNum}，手续费率：${contentsObj.refundRate}，${contentsObj.passOrderTicketIds}；驳回数量：${contentsObj.rejectNum}。备注：${contentsObj.remark}`;
                    //订单改签申请
                    case 'ORDER_ALTER_APPLY' : return `申请改签，数量：${contentsObj.reqNum}，申请改签至：${contentsObj.afterAlterDate}。`;
                    //订单改签审核
                    case 'ORDER_ALTER_AUDIT' : return `改签审核，通过数量：${contentsObj.passNum}，产品明细编号：${contentsObj.passOrderTicketIds}，游玩日期改签至：${contentsObj.afterAlterDate}。备注：${contentsObj.remark}`;
                    //新建订单
                    case 'ORDER_NEW_ORDER' : return `预定成功，预定数量：${contentsObj.orderNum}。`;
                    //新增票券
                    case 'ORDER_NEW_TICKET' : return '预定成功';
                    //"团队订单审核驳回
                    case 'ORDER_AUDIT_REJECT' : return `审核不通过，备注：${contentsObj.remark}。`;
                    //"团队订单审核通过
                    case 'ORDER_AUDIT_PASS' : return `审核通过，备注：${contentsObj.remark}。`;
                    //核销
                    case 'ORDER_VERIFY_TICKET' : return `核销数量：${contentsObj.verifyNum}，产品明细编号：${contentsObj.ticketId}，核销串码：${contentsObj.checkSerialNo}。备注：${contentsObj.remark}`;
                    default : return ''
                }
            }
        },
        computed : {
            //操作记录数据处理
            operateLogDeal () {
                return this.orderRecordList.map(item => {
                    return {
                        ...item,
                        className : this.constClassDefined[item.operationStatus] ? this.constClassDefined[item.operationStatus] : 'blue-status',
                        contentDeal : this.getContentDetail(item)
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-operate-log{

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }
    }
</style>

<!--订单操作日志-->

<template>
    <div class="order-operate-log">
        <div class="title">订单操作日志</div>
        <Steps direction="vertical" size="small" class="ivu-steps-clota">
            <Step v-for="item in orderRecordList"
                  :key="item.createdTime"
                  icon="clota"
                  :class="getClass(item)"
                  :title="item.contents" >
                <span class="time">{{item.createdTime}}</span>
                <span class="operater">操作者：广州长隆旅行社 张三 </span>
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
            }
        },
        data() {
            return {}
        },
        methods: {
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

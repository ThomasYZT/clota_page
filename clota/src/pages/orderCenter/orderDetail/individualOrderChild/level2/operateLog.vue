<!--
    散客二级订单详情--操作日志
    作者：杨泽涛
-->
<template>
    <div class="operate-log">
        <div class="title">{{$t('operateLog')}}</div>

        <Steps direction="vertical" size="small" class="ivu-steps-clota">
            <Step v-for="item in orderOperationRecordList"
                  :key="item.createdTime"
                  icon="clota"
                  :class="getClass(item)"
                  :title="item.contents" >
                <span class="time">{{item.createdTime}}</span>
                <span class="operater">{{$t('operator')}}：{{item.createOrg}} {{item.createName}} </span>
            </Step>
        </Steps>
    </div>
</template>

<script>

    export default {
        props: {
            orderOperationRecordList: {
                type: Array,
                default: []
            }
        },
        components: {},
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

    .operate-log {
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title {
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height: 45px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before {
                content: '';
                @include block_outline(absolute, 2px);
                @include block_outline(4px, 16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }
    }
</style>

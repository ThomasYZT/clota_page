<!--订单信息-->

<template>
    <div class="order-info-head">
        <div class="device-name">
            {{$t('orderDetail')}} <span class="abnormal">异常订单</span>
        </div>

        <ul class="cooper-detail">
            <template v-for="item in orderHeadDetail">
                <li class="list" >
                    <div class="info-list1" v-if="item[0]">
                        <span class="info-key">{{item[0].label}}：</span>
                        <span class="info-val">{{item[0].value}}</span>
                    </div>
                    <div class="info-list2" v-if="item[1]">
                        <span class="info-key">{{item[1].label}}：</span>
                        <span class="info-val">{{item[1].value}}</span>
                    </div>
                    <div class="info-list3" v-if="item[2]">
                        <span class="info-key">{{item[2].label}}：</span>
                        <span class="info-val">{{item[2].value}}</span>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        props : {
            //订单类型
            'order-type' : {
                type : String,
                default : ''
            }
        },
        data () {
            return {
                // orderHeadDetail : []
            };
        },
        methods : {
            /**
             * 获取订单表头信息
             * @returns {*[]}
             */
            getOrderDetail (...rest) {
                if (this.orderType === 'custom') {
                    return [
                        [
                            {
                                label : '订单编号',
                                value : rest[0]
                            },
                            {
                                label : '订单类型',
                                value : rest[1]
                            },
                            {
                                label : '下单时间',
                                value : rest[2]
                            }
                        ],
                        [
                            {
                                label : '所属景区',
                                value : rest[3]
                            },
                            {
                                label : '发售机构',
                                value : rest[4]
                            },
                            {
                                label : '下单渠道',
                                value : rest[5]
                            }
                        ],
                        [
                            {
                                label : '下单企业',
                                value : rest[6]
                            },
                            {
                                label : '游玩日期',
                                value : rest[7]
                            },
                            {
                                label : '订单金额',
                                value : rest[8]
                            }
                        ],
                        [
                            {
                                label : '购买数量',
                                value : rest[9]
                            },
                            {
                                label : '取票数量',
                                value : rest[10]
                            }
                        ]
                    ];
                } else if (this.orderType === 'team') {
                    return [
                        [
                            {
                                label : '订单编号',
                                value : rest[0]
                            },
                            {
                                label : '串码',
                                value : rest[1]
                            },
                            {
                                label : '订单类型',
                                value : rest[2]
                            }
                        ],
                        [
                            {
                                label : '审核状态',
                                value : rest[3]
                            },
                            {
                                label : '所属景区',
                                value : rest[4]
                            },
                            {
                                label : '发售机构',
                                value : rest[5]
                            }
                        ],
                        [
                            {
                                label : '下单渠道',
                                value : rest[6]
                            },
                            {
                                label : '下单企业',
                                value : rest[7]
                            },
                            {
                                label : '游玩日期',
                                value : rest[8]
                            }
                        ],
                        [
                            {
                                label : '订单金额',
                                value : rest[9]
                            },
                            {
                                label : '购买数量',
                                value : rest[10]
                            },
                            {
                                label : '取票数量',
                                value : rest[10]
                            }
                        ]
                    ];
                } else {
                    return [];
                }
            }
        },
        computed : {
            orderHeadDetail () {
                return this.getOrderDetail(1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3);
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-info-head{
        @include block_outline($height : auto);

        .device-name {
            padding: 14px 0;
            @include overflow_tip(100%, 56px);
            font-size: $font_size_20px;
            color: rgba($color_000, 0.85);

            .abnormal{
                font-size: 14px;
                color: $color_err;
                margin-left: 10px;
            }
        }

        .cooper-detail {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                /*display: flex;*/
                /*align-items: center;*/
                @include block_outline(auto);
                min-height: 30px;
                overflow: auto;
                padding: 4px 0;
                line-height: 22px;

                .info-list1,
                .info-list3,
                .info-list4,
                .info-list5,
                .info-list2 {
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;
                    /*align-items: center;*/

                    .info-key {
                        @include block_outline(auto, 100%,false);
                        color: $color_333;

                        &.fix-key{
                            width: 120px;
                            text-align: left;
                        }
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;

                        .reset-pass{
                            color: $color_blue;
                            font-size: $font_size_12px;
                            margin-left: 10px;
                            display: inline-block;
                            cursor: pointer;
                        }
                    }
                }


                .info-list1 {
                    @include block_outline(30%, auto);
                }

                .info-list2 {
                    @include block_outline(30%, auto);
                    padding-left: 15px;
                }

                .info-list3,
                .info-list5{
                    @include block_outline(40%, auto);
                    padding-left: 15px;
                }

                .info-list4{
                    @include block_outline(60%, auto);

                    .info-val{
                        overflow: auto;
                        white-space: normal;
                    }
                }

            }
        }
    }
</style>

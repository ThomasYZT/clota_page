<!--选择支付方式并支付-->

<template>
    <div class="pay-order">
        <div class="product-info">
            <div class="product-name">{{productName | contentFilter}}</div>
            <div class="pay-money">
                <span class="pay-label">{{$t('colonSetting',{ key : $t('应付总额') })}}</span>
                <span class="money">{{totalAmount | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
        </div>
        <div class="pay-type-select">
            <div class="title">{{$t('选择支付方式')}}</div>
            <div class="type-list">
                <group >
                    <radio
                        v-model="payType"
                        title=""
                        :options="payTypeList"
                        @on-change="rechageTypechange">
                    </radio>
                </group>
            </div>
        </div>
        <div class="btn-area">
            <x-button @click.native="recharge"
                      :disabled="payTypeList.length < 1">
                {{$t('recharge')}}
            </x-button>
        </div>
    </div>
</template>

<script>
    import ajax from '@/marketing/api/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //支付方式列表
                payTypeList : [],
                //选择的支付方式
                payType : '',
                //产品名称
                productName : '',
                //应付总额
                totalAmount : ''
            };
        },
        methods : {
            /**
             * 充值
             */
            recharge () {

            },
            /**
             * 获取所有支付方式
             */
            queryAllPayType () {
                ajax.post('market_queryOnlinePayAccount').then(res => {
                    if (res.success) {
                        this.payTypeList = res.data && res.data.length > 0 ? res.data.map((item) => {
                            if (item.accountType === 'weixin') {
                                return {
                                    icon : require('../../../../assets/images/icon-wx-pay.svg'),
                                    key : 'wx',
                                    value : this.$t('wxPay'),
                                    param : item
                                };
                            } else if (item.accountType === 'alipay') {
                                return {
                                    icon : require('../../../../assets/images/icon-ali-pay.svg'),
                                    key : 'ali',
                                    value : this.$t('aliPay'),
                                    param : item
                                };
                            }
                        }) : [];
                    } else {
                        this.payTypeList = [];
                    }
                });
            },
            /**
             * 选择的支付方式改变
             * @param{String} payType 更改后的支付方式的key
             */
            rechageTypechange (payType) {
                this.payType = this.payTypeList.find(item => {
                    return item.key === payType;
                });
            },
            /**
             * 获取路由参数
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.productName = params.productName;
                    this.totalAmount = params.totalAmount;
                } else {
                    this.$router.replace({
                        name : 'marketingTourist'
                    });
                }
            }
        },
        created () {
            this.queryAllPayType();
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .pay-order{
        @include block_outline();
        background: #f2f3f4;
        overflow: auto;

        .product-info{
            @include block_outline($height : 75px);
            padding: 9.5px 14px;
            background: $color_fff;

            .product-name{
                @include block_outline($height : 28px);
                font-size: $font_size_14px;
                color: $color_333;
                @include overflow_tip();
                line-height: 28px;
            }

            .pay-money{
                @include block_outline($height : 27px);
                line-height: 27px;

                .pay-label{
                    font-size: $font_size_11px;
                    color: $color_333;
                }

                .money{
                    font-size: $font_size_16px;
                    color: #F15B40;
                }
            }
        }

        .pay-type-select{
            margin-top: 9px;
            background: $color_fff;

            .title{
                @include block_outline($height : 40px);
                line-height: 40px;
                padding: 0 14px;
                font-size: $font_size_15px;
                color: #353B48;
                border-bottom: 0.5px solid #E8E8E8;
            }

            .type-list{
                padding: 15px 0;

                /deep/ .vux-radio-icon{
                    display: inline-block;
                    @include block_outline(18px,18px);
                }
            }
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 33px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 2px;

                &[disabled='disabled']{
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    color: rgba(0, 0, 0, 0.2);
                    background: $color_fff;
                }
            }
        }
    }
</style>

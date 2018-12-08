<!--填写订单-->

<template>
    <div class="create-order">
        <div class="order-title">
            <div class="order-info">
                <div class="order-name">{{productDetail.productName | contentFilter}}</div>
                <div class="notice" @click="showProductNotice = true">{{$t('购票须知')}}</div>
            </div>
            <ul class="label-input">
                <li class="label-list" v-if="cannotReturn">不可退</li>
                <li class="label-list" v-if="cannotAlter">不可改</li>
            </ul>
        </div>
        <div class="content">
            <group class="group-wrap">
                <cell
                    :title="$t('游玩日期')"
                    class="padding-right"
                    :value="formData.date">
                </cell>
                <cell :title="$t('购买数量')">
                    <inline-x-number style="display:block;"
                                     v-model="formData.num"
                                     :max="maxChoosed"
                                     :min="minChoosed" >
                    </inline-x-number>
                </cell>
            </group>
            <group class="group-wrap">
                <popup-radio :title="$t('证件类型')"
                             v-if="acceptIdType.length > 0"
                             :options="acceptIdType"
                             v-model="formData.idType">
                </popup-radio>
                <!-- 证件号 -->
                <x-input
                    v-if="acceptIdType.length > 0"
                    :title="$t('证件号')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.idNum"
                    placeholder-align="right">
                </x-input>
                <!-- 游客姓名 -->
                <x-input
                    :title="$t('游客姓名')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.name"
                    placeholder-align="right">
                </x-input>
                <!-- 手机号 -->
                <x-input
                    :title="$t('手机号')"
                    text-align="right"
                    :show-clear="false"
                    keyboard="tel"
                    v-model.trim="formData.phone"
                    placeholder-align="right">
                </x-input>
            </group>
        </div>
        <div class="btn-wrap">
            <div class="total-amount">
                {{$t('colonSetting',{ key : $t('总额') })}}
                <span class="money">{{totalAmount | moneyFilter(2,'￥') | contentFilter}}</span>
            </div>
            <div class="create-btn">{{$t('下单')}}</div>
        </div>

        <!--购票须知模态框-->
        <ticket-notice :choosedProductInfo="productDetail"
                       v-model="showProductNotice">
        </ticket-notice>
    </div>
</template>

<script>
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ticketNotice from '../components/ticketNotice';
    import ajax from '@/marketing/api/index';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            ticketNotice
        },
        data () {
            return {
                formData : {
                    date : '',
                    name : '',
                    phone : '',
                    num : 1,
                    //证件类型
                    idType : '',
                    //证件号
                    idNum : ''
                },
                //产品明细信息
                productDetail : {},
                //是否显示购票须知模态框
                showProductNotice : false,
                //产品销售政策
                productPolicy : {}
            };
        },
        methods : {
            getParams (params) {
                if (params && params.productDetail && Object.keys(params.productDetail).length > 0) {
                    this.productDetail = params.productDetail;
                    this.formData.date = params.playDate;
                    this.queryProductPolicy();
                } else {
                    this.$router.push({
                        name : 'marketingTourist'
                    });
                }
            },
            /**
             * 查询产品销售规则
             */
            queryProductPolicy () {
                ajax.post('market_findProductSaleRules',{
                    productIds : this.productDetail.productId
                }).then(res => {
                    if (res.success) {
                        this.productPolicy = res.data ? res.data[this.productDetail.productId] : {};
                    } else {
                        this.productPolicy = [];
                    }
                });
            }
        },
        computed : {
            //产品不可退
            cannotReturn () {
                if (this.productDetail && this.productDetail.returnRuleModel) {
                    return this.productDetail.returnRuleModel.type === 'notAllow';
                }
                return false;
            },
            //产品不可改签
            cannotAlter () {
                if (this.productDetail && this.productDetail.alterRuleModel) {
                    return this.productDetail.alterRuleModel.type === 'notAllow';
                }
                return false;
            },
            //支付总额
            totalAmount () {
                return this.formData.num * (this.productDetail ? this.productDetail.salePrice : 0);
            },
            //支持的证件类型
            acceptIdType () {
                if (this.productPolicy && this.productPolicy.acceptIdType) {
                    return this.productPolicy.acceptIdType.split(',').map(item => {
                        return {
                            key : this.$t(item),
                            value : item,
                        };
                    });
                } else {
                    return [];
                }
            },
            //最大选择的产品数量
            maxChoosed () {
                if (this.productPolicy && this.productPolicy.maxNum) {
                    return Number(this.productPolicy.maxNum);
                } else {
                    return 0;
                }
            },
            //最小选择的产品数量
            minChoosed () {
                if (this.productPolicy && this.productPolicy.minNum) {
                    return Number(this.productPolicy.minNum);
                } else {
                    return 0;
                }
            }
        }
    };
</SCRIPT>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .create-order{
        @include block_outline();
        overflow: hidden;
        background: #f2f3f4;

        .order-title{
            @include block_outline($height : 68px);
            padding: 8px 14px;
            background: $color_fff;

            .order-info{
                @include block_outline($height : 27px);
                padding: 3.5px 0;
                display: flex;
                flex-direction: row;
                line-height: 20px;

                .order-name{
                    flex: 1;
                    @include overflow_tip();
                    padding-right: 10px;
                }

                .notice{
                    font-size: $font_size_12px;
                    color: #0073EB;
                }
            }

            .label-input{
                @include block_outline($height : 25px);
                padding: 2.5px 0;

                .label-list{
                    font-size: $font_size_11px;
                    display: inline-block;
                    border: 1px solid #EB6751;
                    padding: 1px 5px;
                    margin: 0;
                    line-height: 15px;
                    border-radius: 4px;
                    color: #EB6751;
                }
            }
        }

        .content{
            @include block_outline($height : unquote('calc(100% - 112px)'));
            overflow: auto;

            .group-wrap{
                margin-top: 8px;
            }
        }

        .btn-wrap{
            @include absolute_pos(fixed,$bottom : 0);
            @include block_outline($height : 44px);
            border-top: 0.5px solid #E1E1E1;
            background: $color_fff;
            display: flex;
            flex-direction: row;
            padding-left: 14px;
            line-height: 44px;

            .total-amount{
                flex: 1;
                font-size: $font_size_12px;
                color: #303030;

                .money{
                    color: #F17E40;
                }
            }

            .create-btn{
                padding: 0 37px;
                font-size: $font_size_16px;
                text-align: center;
                background: #F17E40;
                color: $color_fff;
            }
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .vux-number-selector{
            height: 28px!important;
        }

        /deep/ .vux-number-input{
            font-size: 17px;
        }

        /dee/ .vux-number-selector-plus{
            margin-right: 0!important;
        }
    }
</style>

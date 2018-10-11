<!--账户充值-->

<template>
    <div class="account-recharege">
        <div class="recharge-title">
            <x-input title="¥"
                     v-model="rechargeMoney"
                     :show-clear="false"
                     label-width="20px"
                     :debounce="500"
                     keyboard="number"
                     @on-change="getTrueMoney">
            </x-input>
            <div class="actual-money">
                <span class="label">{{$t('actualToAccount')}}</span>
                <span class="account">{{actualMoney | moneyFilter | contentFilter}}</span>
                <span class="other-data">{{$t('includeDonate',{num : donateMoney})}}</span>
            </div>
        </div>
        <div class="pay-type-chose">
            <div class="type-title">{{$t('chosePayType')}}</div>
            <div class="type-list">
                <group title="default">
                    <radio
                        v-model="payType"
                        title=""
                        :options="commonList"
                        @on-change="rechageTypechange">
                    </radio>
                </group>
            </div>
        </div>
        <div class="btn-area">
            <x-button>{{$t('recharge')}}</x-button>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import lifeCycle from '@/mixins/lifeCycleMixins.js';
    import common from '@/assets/js/common';
    export default {
        mixins : [lifeCycle],
        data() {
            return {
                //可选中支付方式
                commonList: [
                    {
                        icon : require('../../../assets/images/icon-wx-pay.svg'),
                        key : 'wx',
                        value : this.$t('wxPay')
                    },
                    {
                        icon : require('../../../assets/images/icon-ali-pay.svg'),
                        key : 'ali',
                        value : this.$t('aliPay')
                    },
                ],
                //支付方式
                payType : 'wx',
                //实际到账金额
                actualMoney : '',
                //充值金额
                rechargeMoney : '',
                //账户类型id
                accountTypeId  : '',
                //赠送金额
                donateMoney : ''
            }
        },
        methods: {
            /**
             * 获取实际到账金额
             */
            getTrueMoney () {
                this.validateRechargeMoney().then(()=>{
                    ajax.post('getRechargeActMoney',{
                        accountTypeId : this.accountTypeId,
                        amount : this.rechargeMoney,
                    }).then(res => {
                        if(res.success){
                            this.actualMoney =  res.data ? res.data.actMoney : '';
                            this.donateMoney =  res.data ? res.data.gift : '';
                        }else{
                            this.actualMoney = '';
                            this.donateMoney = '';
                        }
                    });
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.accountTypeId = params.accountTypeId;
                }else{
                    this.$router.push({
                        name: 'account'
                    });
                }
            },
            /**
             * 充值类型改变
             */
            rechageTypechange () {

            },
            /**
             * 校验充值金额
             */
            validateRechargeMoney () {
                return new Promise((resolve,reject) => {
                    common.validateMoney(this.rechargeMoney).then(() => {
                        resolve();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            this.$vux.toast.text(this.$t('errorMaxLength',{field : this.$t('rechargeNum'),length : 10}));
                        }else{
                            this.$vux.toast.text(this.$t(err,{field : this.$t('rechargeNum')}));
                        }
                        reject();
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .account-recharege{
        @include block_outline();
        background: rgba(242,243,244,1);

        .recharge-title{
            padding-top: 20px;
            @include block_outline($height : 126px);
            background: $color_fff;

            /deep/ .vux-x-input{
                @include block_outline($height : 60px);
                border-bottom: 1px solid #e8e8e8;
            }

            /deep/ .weui-cell__hd{
                height: 36px;
                line-height: 40px;
            }

            /deep/ .weui-cell__hd{
                font-size: $font_size_19px;
                color: $color_333;
            }

            /deep/ .weui-input{
                height: 35px;
                line-height: 40px;
                font-size: 20px;
                color: #353B48;
            }

            /deep/ .weui-cell__primary{
                height: 100%;
            }

            .actual-money{
                @include block_outline($height : 45px);
                line-height: 45px;
                padding: 0 14px;
                display: flex;

                .label{
                    font-size: $font_size_13px;
                    color: #353B48;
                }

                .account{
                    font-size: $font_size_13px;
                    color: #F7981C;
                }

                .other-data{
                    font-size: $font_size_11px;
                    color: $color_999;
                }
            }
        }

        .pay-type-chose{
            background: $color_fff;
            margin-top: 8px;

            .type-title{
                @include block_outline($height : 40px);
                line-height: 40px;
                font-size: $font_size_15px;
                padding-left: 14px;
                border-bottom: 1px solid #e8e8e8;
                color: #353B48;
            }

            .type-list{
                @include block_outline($height : 109px);
                padding: 15px 0;

                /deep/ .vux-radio-icon{
                    display: inline-block;
                    @include block_outline(18px,18px);
                }
            }

            /deep/ .weui-cells__title{
                display: none;
            }

            /deep/ .weui-cells:before,
            /deep/ .weui-cells:after{
                display: none;
            }

            /deep/ .weui-check__label{
                height: 40px;
            }

            /deep/ .weui-cell:before{
                display: none;
            }

            /deep/ .vux-radio-label{
                font-size: $font_size_15px;
                color: #353B48;
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
                letter-spacing: 5px;
            }
        }
    }
</style>

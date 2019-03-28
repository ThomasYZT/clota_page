<!--
内容：在线支付账户设置
作者：djc
日期：
-->

<template>
    <!--系统设置--在线支付账户设置-->
    <div class="online-payment-setting">
        <div class="title">{{$t('onlinePaymentSetting')}} <span class="tip" v-if="collectionAccList.length === 0">{{$t('unconfiguredAccount')}}</span></div><!--在线支付账户设置-->

        <template v-if="collectionAccList.length > 0">
            <!--<div class="add-account-wrap">-->
                <!--<Button type="primary" @click="addPaymentAccount('addAccount')">+ {{$t("addAccount")}}</Button>-->
            <!--</div>-->
            <div class="account-info"
                 v-for="(item,i) in collectionAccList"
                 :key="i">
                <div class="account-detail clearfix">
                    <div class="img-area" >
                        <img v-if="item.id === '1'" src="../../../assets/images/icon-default-account.svg" alt="">
                        <img v-else src="../../../assets/images/icon-common-account.svg" alt="">
                    </div>
                    <div class="payment-list">
                        <div class="payment-name" v-w-title="item.paymentName">
                            {{$t('collectionAccountInformation')}}
                        </div>
                        <div class="payment-item">
                            <span>{{$t('colonSetting', { key : $t('collectionAccountType') })}}</span>
                            <div class="operate-wrap">
                                {{$t('payType.' + item.accountType) | contentFilter}}
                                <span v-if="canOperateAccount"
                                      class="using-btn"
                                      @click="operateSatus(item)">
                                    {{item.useStatus === 'enabled' ? $t('stopUsing') : $t('commissioned')}}
                                </span>
                            </div>
                        </div>
                        <template v-if="item.paymentChannel === 'yinshi'">
                            <div class="payment-item">
                                <span>{{$t('colonSetting', { key : 'MerchantID' })}}</span>
                                <span>{{item.merchantId | contentFilter}}</span>
                            </div>
                            <div class="payment-item">
                                <span>{{$t('colonSetting', { key : 'partnerID' })}}</span>
                                <span>{{item.partnerId | contentFilter}}</span>
                            </div>
                        </template>
                        <template v-else-if="item.paymentChannel === 'wxorali'">
                            <template v-if="item.accountType === 'alipay'">
                                <div class="payment-item">
                                    <span>{{$t('colonSetting', { key : 'appID' })}}</span>
                                    <span>{{item.appID | contentFilter}}</span>
                                </div>
                                <div class="payment-item">
                                    <span>{{$t('colonSetting', { key : $t('publicKey') })}}</span>
                                    <span>{{item.publicKey | contentFilter}}</span>
                                </div>
                            </template>
                            <template v-else-if="item.accountType === 'weixin'">
                                <div class="payment-item">
                                    <span>{{$t('colonSetting', { key : 'appID' })}}</span>
                                    <span>{{item.officialAccountsAppID | contentFilter}}</span>
                                </div>
                                <div class="payment-item">
                                    <span>{{$t('colonSetting', { key : $t('merchantNum') })}}</span>
                                    <span>{{item.merchantNum | contentFilter}}</span>
                                </div>
                            </template>
                        </template>
                        <div class="payment-item using-status">
                            <span class="start" v-if="item.useStatus === 'enabled'">{{$t('startingUse')}}</span>
                            <span class="unstart" v-else>{{$t('unStarting')}}</span>
                        </div>

                        <!--<div class="payment-item">-->
                            <!--<span>{{'商户号：'}}</span>-->
                            <!--<div>{{item.merchantNumber | contentFilter}}</div>-->
                        <!--</div>-->
                        <!--<div class="payment-item">-->
                            <!--<span>{{'appID：'}}</span>-->
                            <!--<div>{{item.appId | contentFilter}}</div>-->
                        <!--</div>-->
                        <!--<div class="payment-item">-->
                            <!--<span>{{'appKEY：'}}</span>-->
                            <!--<div>{{item.appKey | contentFilter}}</div>-->
                        <!--</div>-->
                        <!--<div class="payment-item">-->
                            <!--<span>{{'appSECRET：'}}</span>-->
                            <!--<div>{{item.appSecret | contentFilter}}</div>-->
                        <!--</div>-->
                        <!--<div class="payment-item">-->
                            <!--<span>{{$t('remark') + '：'}}</span>-->
                            <!--<div style="margin-left: 45px;">{{item.remark | contentFilter}}</div>-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
        </template>

        <div class="no-data-wrap" v-if="collectionAccList.length < 1">
            <!--无数据组件-->
            <no-data ></no-data>
        </div>
        <!--停用账户提示框-->
        <confirm-modal ref="confirmMoal">
            {{$t(`confirmStopAccount`,{ accountName : $t('payType.' + operateAccountInfo.accountType) })}}
        </confirm-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import noData from '@/components/noDataTip/noData-tip.vue';
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    import confirmModal from '@/components/noticeModal/index.vue';

    export default {
        components : {
            noData,
            confirmModal
        },
        props : {},
        data () {
            return {
                collectionAccList : [],
                //当前用户已拥有的账户类型list
                hasPaytypeList : [],
                //当前操作的账户信息
                operateAccountInfo : {}
            };
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以操作账户信息
            canOperateAccount () {
                return this.permissionInfo && this.permissionInfo['operatePaymentAccount'] === 'allow';
            }
        },
        created () {
            this.queryOnlineAccount();
        },
        methods : {
            /**
             * 获取在线账户支付列表
             */
            queryOnlineAccount () {
                ajax.post('queryOnlineAccount').then((res) => {
                    if (res.success) {
                        this.collectionAccList = res.data;
                        this.hasPaytypeList = [];
                        this.collectionAccList.forEach((item) => {
                            if (this.hasPaytypeList.indexOf('alipay') <= -1 && item.accountType === 'alipay') {
                                this.hasPaytypeList.push('alipay');
                            }
                            if (this.hasPaytypeList.indexOf('weixin') <= -1 && item.accountType === 'weixin') {
                                this.hasPaytypeList.push('weixin');
                            }
                        });
                    } else {
                        this.hasPaytypeList = [];
                        this.collectionAccList = [];
                    }
                });
            },
            /**
             * 改变收款账户状态
             * @param {Object} item 账户信息
             */
            operateSatus (item) {
                this.operateAccountInfo = item;
                if (item.useStatus === 'not_enabled') {
                    this.updateAccountStatus(item);
                } else {
                    this.$refs.confirmMoal.show({
                        title : this.$t('notice'),
                        confirmCallback : () => {
                            this.$refs.confirmMoal.hide();
                            this.updateAccountStatus(item);
                        }
                    });
                }
            },
            /**
             * 修改账户启用状态
             * @param{String} accountInfo 账户信息
             */
            updateAccountStatus (accountInfo) {
                ajax.post('updateOnlineAccount', {
                    id : accountInfo.id,
                    useStatus : accountInfo.useStatus === 'enabled' ? 'not_enabled' : 'enabled',
                    accountType : accountInfo.accountType,
                }).then(res => {
                    if (res.success) {
                        if (accountInfo.useStatus === 'enabled') {
                            this.$Message.success({
                                content : this.$t('accountNotInUsing',{ accountName : this.$t('payType.' + accountInfo.accountType) }),
                                duration : 5
                            });
                        } else {
                            this.$Message.success({
                                content : this.$t('accountInUsing',{ accountName : this.$t('payType.' + accountInfo.accountType) }),
                                duration : 5
                            });
                        }
                        this.queryOnlineAccount();
                    } else {
                        if (accountInfo.useStatus === 'enabled') {
                            this.$Message.error({
                                content : this.$t('accountStopFailed',{ accountName : this.$t('payType.' + accountInfo.accountType) }),
                                duration : 5
                            });
                        } else {
                            this.$Message.error({
                                content : this.$t('accountStartFailed',{ accountName : this.$t('payType.' + accountInfo.accountType) }),
                                duration : 5
                            });
                        }
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .text-red {
        color: #EB6751;
    }
    .online-payment-setting {
        @include block_outline();
        padding: 5px 30px 0 30px;
        @include padding_place();

        .title{
            @include block_outline($height : auto);
            padding: 20px 0 5px 0;
            font-size: $font_size_16px;
            color: $color_333;
            letter-spacing: 2.29px;

            .tip {
                font-size: $font_size_14px;
                color: $color_999;
                letter-spacing: 1px;
            }
        }

        .add-account-wrap {
            margin: 10px 0;
        }

        .account-info{
            float: left;
            height : 200px;
            background: $color_fff;
            border: 1px solid $color_E9E9E9;
            border-radius: 2px;
            margin-bottom: 30px;
            margin-right: 15px;

            .account-detail{
                @include block_outline($height : auto);
                padding-right: 10px;

                .img-area{
                    @include block_outline(78px);
                    padding: 30px 20px;
                    float: left;

                    img{
                        @include block_outline(38px,38px,false);
                    }
                }

                .payment-list{
                    float: left;
                    padding: 21px 10px 26px;

                    .payment-name{
                        @include block_outline($height : 42px);
                        @include overflow_tip();
                        line-height: 24px;
                        padding: 9px 0;
                        font-size: $font_size_18px;
                        color: rgba($color_000,0.85);
                    }

                    .payment-item{
                        overflow: auto;
                        line-height: 22px;
                        color: $color_666;
                        > span {
                            float: left;
                            color: $color_333;
                        }

                        .operate-wrap{
                            white-space: nowrap;
                            float: left;
                        }

                        .using-btn {
                            color: $color_blue;
                            cursor: pointer;
                        }
                    }

                    .payment-item.using-status {
                        margin-top: 20px;
                        span {
                            font-size: 18px;
                        }
                        .start {
                            color: $color_green;
                        }

                        .unstart {
                            color: $color_gray;
                        }
                    }
                }
            }

            .account-operate{
                @include block_outline($height : 40px);
                background: #F7F9FA;
                border-top: 1px solid #E9E9E9;

                .list{
                    position: relative;
                    @include block_outline(50%);
                    float: left;
                    line-height: 40px;
                    text-align: center;
                    color: $color_blue;
                    font-size: $font_size_14px;
                    cursor: pointer;
                    @include overflow_tip();
                    padding: 0 10px;

                    &:nth-of-type(1)::after{
                        content: '';
                        @include absolute_pos(absolute,$right : 0,$top : 13px);
                        background:  #E8E8E8;
                        @include block_outline(1px,12px);
                    }
                    &:last-child {
                        @extend .text-red;
                    }
                }
            }
        }

        .no-data-wrap {
            position: relative;
            height: calc(100% - 80px);

            .btn-add-new {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate3d(-50%, 100px, 0);
            }
        }

        /deep/ .ivu-switch {
            width: 50%;
            .ivu-switch-inner {
                width: 100%;
                span {
                    width: 80%;
                }
            }
        }
    }
</style>

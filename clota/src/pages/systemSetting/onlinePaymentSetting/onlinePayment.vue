<!--
内容：在线支付账户设置
作者：djc
日期：
-->

<template>
    <!--系统设置--在线支付账户设置-->
    <div class="online-payment-setting">
        <div class="title">{{$t('onlinePaymentSetting')}}</div><!--在线支付账户设置-->

        <template v-if="collectionAccList.length > 0">
            <div class="add-account-wrap">
                <Button type="primary" @click="addPaymentAccount('addAccount')">+ {{$t("addAccount")}}</Button>
            </div>
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
                            {{item.paymentName}}
                        </div>
                        <div class="payment-item">
                            <span>{{'商户号：'}}</span>
                            <div>{{item.merchantNum}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{'appID：'}}</span>
                            <div>{{item.appID}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{'appKEY：'}}</span>
                            <div>{{item.appKEY}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{'appSECRET：'}}</span>
                            <div>{{item.appSECRET}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{$t('remark') + '：'}}</span>
                            <div style="margin-left: 45px;">{{item.remark}}</div>
                        </div>
                    </div>
                </div>
                <ul class="account-operate">
                    <li class="list" @click="addPaymentAccount('modifyAccount')">{{$t('edit')}}</li><!--编辑-->
                    <li class="list" @click="delPaymentAccount(item)">{{$t('del')}}</li><!--删除-->
                </ul>
            </div>
        </template>

        <div class="no-data-wrap" v-if="collectionAccList.length < 1">
            <!--无数据组件-->
            <no-data ></no-data>
            <Button type="primary"
                    class="btn-add-new"
                    @click="addPaymentAccount('addAccount')">+ {{$t("addAccount")}}</Button>
        </div>

        <!--增加/修改账户Modal-->
        <new-account-modal ref="addAccount"
                           :modal-title="modalTitle"
                           :account-list="collectionAccList"
                           @updata-list="">
        </new-account-modal>

        <!--删除账户Modal-->
        <del-account-modal ref="delAccount"
                           :modal-title="'删除账户'"
                           @on-delete="">
        </del-account-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import noData from '@/components/noDataTip/noData-tip.vue'
    import newAccountModal from './components/newAccountModal.vue'
    import delAccountModal from './components/delAccountModal.vue'

    export default {
        components: {noData, newAccountModal, delAccountModal},
        props: {},
        data() {
            return {
                collectionAccList: [
                    {
                        'paymentName': '支付宝支付账户信息',
                        'merchantNum': 'Tfj789782',
                        'appID': 'Tfj789782',
                        'appKEY': 'iirr789782',
                        'appSECRET': 'Thff89782',
                        'remark': '这里是备注信息，这里是备注信息，这里是备注信息，',
                        'payType': 'zfb',
                        'payTypeName': '支付宝'
                    },
                    {
                        'paymentName': '微信支付账户信息',
                        'merchantNum': 'jjj789782',
                        'appID': 'jjj789782',
                        'appKEY': 'jkh449782',
                        'appSECRET': 'uio339782',
                        'remark': '这里是备注信息，这里是备注信息，这里是备注信息，',
                        'payType': 'wx',
                        'payTypeName': '微信'
                    },
                ],

                // 增加/修改账户modalTitle
                modalTitle: '',
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 增加/修改账户
             * @param operate - 增加、修改的双语键值
             */
            addPaymentAccount(operate) {
                let item = {};
                let index = this.collectionAccList.length;

                this.modalTitle = operate;
                this.$refs.addAccount.show({ item, index});
            },
            /**
             * 删除账户
             */
            delPaymentAccount(item) {
                this.$refs.delAccount.show({item});
            },
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
        }

        .add-account-wrap {
            margin: 10px 0;
        }

        .account-info{
            float: left;
            @include block_outline(30%,263px);
            background: $color_fff;
            border: 1px solid $color_E9E9E9;
            border-radius: 2px;
            margin-bottom: 30px;

            &:nth-of-type(2n){
                margin: 0 5%;
            }

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
                    @include block_outline(unquote('calc(100% - 78px)'));
                    padding: 21px 0 26px 0 ;

                    .payment-name{
                        @include block_outline($height : 42px);
                        @include overflow_tip();
                        line-height: 24px;
                        padding: 9px 0;
                        font-size: $font_size_18px;
                        color: rgba($color_000,0.85);
                    }

                    .payment-item{
                        line-height: 22px;
                        color: $color_666;
                        > span {
                            float: left;
                            color: $color_333;
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
            top: 160px;
            .btn-add-new {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate3d(-50%, 100px, 0);
            }
        }

    }
</style>

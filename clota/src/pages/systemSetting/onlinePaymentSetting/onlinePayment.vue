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
                            {{payTypeName[item.accountType]}}
                        </div>
                        <div class="payment-item">
                            <span>{{'商户号：'}}</span>
                            <div>{{item.merchantNumber}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{'appID：'}}</span>
                            <div>{{item.appId}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{'appKEY：'}}</span>
                            <div>{{item.appKey}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{'appSECRET：'}}</span>
                            <div>{{item.appSecret}}</div>
                        </div>
                        <div class="payment-item">
                            <span>{{$t('remark') + '：'}}</span>
                            <div style="margin-left: 45px;">{{item.remark}}</div>
                        </div>
                    </div>
                </div>
                <ul class="account-operate">
                    <li class="list" @click="addPaymentAccount('modifyAccount',item)">{{$t('edit')}}</li><!--编辑-->
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
                           :hasPaytypeList="hasPaytypeList"
                           @updata-list="queryOnlineAccount">
        </new-account-modal>

        <!--删除模态框-->
        <del-modal ref="delModal">
            <span class="content-text">{{$t('isDoing')}}{{$t('delete')}}：<span class="yellow-label">{{selectedPayType}}</span></span>
            <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
        </del-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import noData from '@/components/noDataTip/noData-tip.vue'
    import newAccountModal from './components/newAccountModal.vue'
    import delAccountModal from './components/delAccountModal.vue'

    import delModal from '@/components/delModal';
    import ajax from '@/api/index'

    export default {
        components: {noData, newAccountModal, delAccountModal, delModal},
        props: {},
        data() {
            return {
                collectionAccList: [],

                // 增加/修改账户modalTitle
                modalTitle: '',
                //当前选中删除的账户类型
                selectedPayType: '',
                payTypeName: {
                    'alipay': '支付宝支付账户',
                    'weixin': '微信支付账户'
                },
                //当前用户已拥有的账户类型list
                hasPaytypeList: []
            }
        },
        computed: {},
        created() {
            this.queryOnlineAccount()
        },
        mounted() {
        },
        watch: {},
        methods: {
            /**
             * 增加/修改账户
             * @param operate - 增加、修改的双语键值
             */
            addPaymentAccount(operate, item) {
                let index = this.collectionAccList.length;

                this.modalTitle = operate;
                this.$refs.addAccount.show({ item, index});
            },
            /**
             * 删除账户
             */
            delPaymentAccount(item) {
                this.selectedPayType = item.paymentName;
                this.$refs.delModal.show({
                    title : this.$t('deleteAccount'),
                    confirmCallback : () => {
                        ajax.post('deleteOnlineAccount', {
                            id: item.id
                        }).then((res) => {
                            if(res.success){
                                this.$Message.success(this.$t('success') + this.$t('delete'));
                                this.queryOnlineAccount();
                            } else {
                                this.$Message.error(res.message || this.$t('fail'));
                            }
                        })
                    }
                })
            },
            /**
             * 获取在线账户支付列表
             */
            queryOnlineAccount() {
                ajax.post('queryOnlineAccount').then((res) => {
                    if (res.success) {
                        this.collectionAccList = res.data;
                        this.hasPaytypeList = [];
                        this.collectionAccList.forEach((item) => {
                            if(this.hasPaytypeList.indexOf('alipay') <= -1 && item.accountType == 'alipay') {
                                this.hasPaytypeList.push('alipay');
                            }
                            if(this.hasPaytypeList.indexOf('weixin') <= -1 && item.accountType == 'weixin') {
                                this.hasPaytypeList.push('weixin');
                            }
                        });
                    } else {
                        this.hasPaytypeList = [];
                        this.collectionAccList = [];
                    }
                })
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

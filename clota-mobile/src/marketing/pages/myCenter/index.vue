<!--我的菜单-->

<template>
    <div class="my-center">
        <div class="toast-info">您还未允许系统定位手机的权限，请前往设置允许权限</div>
        <div class="base-info">
            <img class="head-img" src="../../../assets/images/icon-avator.svg" alt="">
            <div class="info-name">
                <div class="name">{{userInfo.name | contentFilter}}</div>
                <div class="level" v-show="userInfo.levelName">{{userInfo.levelName | contentFilter}}</div>
            </div>
            <div class="er-code">
                <span class="iconfont icon-code" @click="toCreateOrder"></span>
            </div>
        </div>
        <div></div>
        <div class="hr"></div>
        <!--提现金额-->
        <div class="cell-list" @click="toDepositDetail">
            <span class="icon iconfont icon-default-account"></span>
            <span class="label-title">提现金额</span>
            <span class="label-value"><span class="money">{{userInfo.canApplyWithdrawAmount | moneyFilter | contentFilter}}</span>元</span>
            <span class="iconfont icon-arrow"></span>
        </div>
        <!--海报-->
        <div class="cell-list" @click="toPoster">
            <span class="icon iconfont icon-my-orders"></span>
            <span class="label-title">海报</span>
            <span class="label-value"></span>
            <span class="iconfont icon-arrow"></span>
        </div>
        <!--设置-->
        <div class="cell-list" @click="toSettingDetail">
            <span class="icon iconfont icon-security-setting"></span>
            <span class="label-title">设置</span>
            <span class="label-value"></span>
            <span class="iconfont icon-arrow"></span>
        </div>
        <confirm v-model="confirmShow"
                 class="confirm-modal-wrap"
                 v-transfer-dom
                 :title="$t('提示')"
                 :confirm-text="$t('继续')"
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm">
            <p style="text-align:center;">{{ $t('根据景区要求，当前位置扫码下达的订单不计算佣金！') }}</p>
        </confirm>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ajax from '@/marketing/api/index';
    export default {
        data () {
            return {
                //是否确认下单
                confirmShow : false,
                //用户信息
                userInfo : {}
            };
        },
        methods : {
            /**
             * 跳转到提现金额详情页面
             */
            toDepositDetail () {
                this.$router.push({
                    name : 'marketingDeposit',
                    params : this.userInfo
                });
            },
            /**
             * 取消下单
             */
            onCancel () {
                this.confirmShow = false;
            },
            /**
             * 继续下单
             */
            onConfirm () {
                this.$router.push({
                    name : 'marketingQrCode'
                });
            },
            /**
             * 跳转到下单页面
             */
            toCreateOrder () {
                this.confirmShow = true;
            },
            /**
             * 跳转到账户设置页面
             */
            toSettingDetail () {
                this.$router.push({
                    name : 'marketingSetting'
                });
            },
            /**
             * 跳转到我的海报页面
             */
            toPoster () {
                this.$router.push({
                    name : 'marketingPoster',
                    params : {
                        posterData : this.userInfo.posterModels
                    }
                });
            },
            /**
             * 查询用户信息
             */
            queryUserInfo () {
                ajax.post('market_getMarketUserMyInfo').then(res => {
                    if (res.success) {
                        this.userInfo = res.data ? res.data : {};
                    } else {
                        this.userInfo = {};
                    }
                });
            }
        },
        computed : {
            ...mapGetters({
                marketUserInfo : 'marketUserInfo',
            })
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.queryUserInfo();
            });
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .my-center{
        @include block_outline();
        /*background: #f2f3f4;*/
        background: $color_fff;
        overflow: auto;

        .hr{
            @include block_outline($height : 8px);
            background: #f2f3f4;
        }

        .cell-list{
            position: relative;
            @include block_outline($height : 50px);
            padding-left: 15px;
            padding-right: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;

            &:after{
                content : '';
                @include absolute_pos(absolute,$bottom : 0,$left : 15px);
                @include block_outline(unquote('calc(100% - 15px)'),0.5px);
                background: #E8E8E8;
            }

            .icon{
                font-size: $font_size_20px;
                padding-right: 11px;
            }

            .label-title{
                font-size: $font_size_14px;
                color: #172434;
            }

            .label-value{
                flex: 1;
                font-size: $font_size_14px;
                text-align: right;

                .money{
                    color: #F7981C;
                }
            }

            .icon-arrow{
                color : rgba(179,189,194,0.70);
            }
        }

        .toast-info{
            @include block_outline($height : 35px);
            background: #FEF3E0;
            line-height: 35px;
            @include overflow_tip();
            color: #F5A623;
            padding-left: 29px;
            font-size: $font_size_11px;
        }

        .base-info{
            padding: 12.5px 15px 12.5px 25px;
            background: $color_fff;
            display: flex;
            flex-direction: row;

            .head-img{
                @include block_outline(60px,60px,false);
                border-radius: 30px;
            }

            .info-name{
                flex: 1;
                height: 60px;
                padding-left: 15px;

                .name{
                    @include block_outline($height : 30px);
                    padding: 5px 0;
                    font-size: $font_size_18px;
                    color: $color_333;
                    @include overflow_tip();
                }

                .level{
                    display: inline-block;
                    height: 17px;
                    background: #ABAFC3;
                    padding: 0 7px;
                    color: $color_fff;
                    border-radius: 50px;
                    margin-top: 5px;
                    font-size: $font_size_11px;
                }
            }

            .er-code{
                @include block_outline(30px,60px);
                display: flex;
                justify-content: center;
                align-items: center;

                .iconfont{
                    font-size: 25px;
                    color: $color_999;
                }
            }
        }
    }
</style>
<style>
    .confirm-modal-wrap .weui-dialog__bd{
        padding-bottom: 30px!important;
        line-height: 25px!important;
    }
</style>

<!--账户信息-->

<template>
    <div class="account">
        <!-- 非业主卡显示信息 -->
        <swiper dots-position="center"
                v-if="!isOwnerCard"
                v-model="accountShow"
                @on-index-change="accountTapChange">
            <swiper-item
                class="swiper-demo-img"
                v-for="(item,i) in accountList"
                :key="i">
                <div class="header">
                    <div class="account-list-chose" @click="showAccount">
                        {{item.accountName}}
                        <span class="iconfont icon-arrow-right"></span>
                    </div>
                    <div class="asset-info">{{item.accountBalance | moneyFilter}}</div>
                    <div class="asset-tip">{{$t('allAssets')}}</div>
                    <div class="account-type" :class="{'auto-width' : accountList[accountShow].accountDefineId === '4'}">
                        <div class="account-priciple-left">
                            <div class="money-num">{{item.corpusBalance | moneyFilter}}</div>
                            <div class="money-label">{{$t('rechargeMoney')}}</div>
                        </div>
                        <div class="account-donate-left" v-show="accountList[accountShow].accountDefineId !== '4'">
                            <div class="money-num">{{item.donateBalance | moneyFilter}}</div>
                            <div class="money-label">{{$t('donateMoney')}}</div>
                        </div>
                    </div>
                </div>
            </swiper-item>
        </swiper>
        <!-- 业主卡显示信息 -->
        <div v-else class="header no-list-chose">
            <div class="asset-info">{{OwnerCardAccount.accountBalance | moneyFilter}}</div>
            <div class="asset-tip">{{$t('allAssets')}}</div>
            <div class="account-type">
                <div class="account-priciple-left">
                    <div class="money-num">{{OwnerCardAccount.corpusBalance | moneyFilter}}</div>
                    <div class="money-label">{{$t('rechargeMoney')}}</div>
                </div>
                <div class="account-donate-left" >
                    <div class="money-num">{{OwnerCardAccount.donateBalance | moneyFilter}}</div>
                    <div class="money-label">{{$t('donateMoney')}}</div>
                </div>
            </div>

            <div class="account-detail-wrapper">
                <ul class="flex-box">
                    <li>
                        <span class="detail-money">{{OwnerCardAccount.ticketBalance | moneyFilter}}</span>
                        <p class="detail-title">{{$t('ticketMoney')}}</p>
                    </li>
                    <li>
                        <span class="detail-money">{{OwnerCardAccount.hotelBalance | moneyFilter}}</span>
                        <p class="detail-title">{{$t('hotelMoney')}}</p>
                    </li>
                    <li>
                        <span class="detail-money">{{OwnerCardAccount.cateringBalance | moneyFilter}}</span>
                        <p class="detail-title">{{$t('restaurantMoney')}}</p>
                    </li>
                    <li>
                        <span class="detail-money">{{OwnerCardAccount.otherBalance | moneyFilter}}</span>
                        <p class="detail-title">{{$t('otherMoney')}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="accountList.length > 0 && accountList[accountShow].accountDefineId === '1'"
             class="btn-area"
             :class="{'owner-btn' : isOwnerCard}">
            <x-button @click.native="recharge">{{$t('recharge')}}</x-button>
        </div>
        <popup-picker
            :cancel-text="$t('cancel')"
            :confirm-text="$t('complete')"
            :show.sync="visible"
            :show-cell="false"
            :show-name="true"
            :data="[accountList]"
            v-model="chosedAccount"
            @on-change="accountChange">
        </popup-picker>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                visible : false,
                //选择的账户信息
                chosedAccount : [],
                //账户列表
                accountList : [
                    {}
                ],
                //当前显示的账户信息
                accountShow : 0,
                //业主账户信息
                OwnerCardAccount : {}
            };
        },
        computed : {
            ...mapGetters([
                'userInfo',
                'cardInfo'
            ]),
            //是否是业主账户信息
            isOwnerCard () {
                return this.cardInfo.cardTypeId === '1';
            }
        },
        methods : {
            /**
             * 显示所有账户信息
             */
            showAccount () {
                this.visible = true;
            },
            /**
             * 充值
             */
            recharge () {
                this.$router.push({
                    name : 'accountRecharge',
                    params : {
                        accountTypeId : this.accountList[this.accountShow] ? this.accountList[this.accountShow].accountDefineId : '',
                        accountName : this.accountList[this.accountShow] ? this.accountList[this.accountShow].accountName : '',
                        accounId : this.accountList[this.accountShow] ? this.accountList[this.accountShow].id : ''
                    }
                });
            },
            /**
             * 账户列表修改
             */
            accountChange ([index]) {
                this.accountShow = Number(index);
            },
            /**
             * 滑动swiper改变账户
             * @param value
             */
            accountTapChange (value) {
                this.chosedAccount = [String(value)];
            },
            /**
             * 获取所有账户信息
             */
            listCardAccountInfo () {
                ajax.post('listCardAccountInfo',{
                    cardId : this.cardInfo.id,
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if (res.success) {
                        this.accountList = res.data ? res.data.map((item,index) => {
                            return {
                                ...item,
                                name : item.accountName,
                                value : index
                            };
                        }) : [];
                    } else {
                        this.accountList = [];
                    }
                });
            },
            /**
             * 获取业主卡账户信息
             */
            getOwnerCardAccountInfo () {
                ajax.post('queryCardAccountInfo', {
                    cardId : this.cardInfo.id,
                }).then(res => {
                    if (res.success) {
                        this.OwnerCardAccount = res.data ? res.data : [];
                        this.accountList[0] = res.data ? res.data : [];
                    } else {
                        this.OwnerCardAccount = [];
                        this.accountList = [];
                    }
                })
            }
        },
        created () {
            if (this.isOwnerCard) {
                this.getOwnerCardAccountInfo();
            } else {
                this.listCardAccountInfo();
            }
        },
        mounted () {
            //监听微信物理返回
            let state = {
                title : "title",
                url : "#"
            };
            history.pushState(state, "title", "#");
            window.addEventListener("popstate", (e) => {
                this.$router.push({
                    name : 'home'
                })
            }, false);
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    $img_base_url : '../../../assets/images/';
    .account{
        @include block_outline();
        overflow: auto;

        /deep/ .vux-swiper{
            height: 310px!important;
        }

        .header{
            position: relative;
            @include block_outline($height : 267px);
            background: get_url('integrateDetialBg.png');
            background-size: cover;
            text-align: center;

            .account-list-chose{
                display: inline-block;
                @include block_outline(auto,$height : 50px);
                text-align: center;
                @include overflow_tip();
                line-height: 30px;
                color: $color_fff;
                font-size: $font_size_18px;
                padding-top: 20px;
                margin: 0 auto 25px auto;

                .icon-arrow-right{
                    display: inline-block;
                    transform: rotate(90deg);
                    font-size: $font_size_15px;
                }
            }

            .asset-info{
                height: 48px;
                line-height: 48px;
                font-size: $font_size_34px;
                color: $color_fff;
                text-align: center;
            }

            .asset-tip{
                margin-top: 12px;
                @include block_outline($height : 17px);
                line-height: 17px;
                font-size: 12px;
                text-align: center;
                color: $color_fff;
                margin-bottom: 20px;
            }

            .account-type{
                @include absolute_pos(absolute,$bottom : 0,$left : 19px);
                @include block_outline(unquote('calc(100% - 38px)'), 88px);
                border-top: 1px solid rgba($color_fff,0.2);
                padding-top: 14px;

                .account-priciple-left,
                .account-donate-left{
                    float: left;
                    @include block_outline(50%,60px);
                    padding-top: 5px;

                    .money-num{
                        @include block_outline($height : 27px);
                        line-height: 27px;
                        text-align: center;
                        font-size: 19px;
                        color: $color_fff;
                    }

                    .money-label{
                        margin-top: 7px;
                        @include block_outline($height : 17px);
                        text-align: center;
                        font-size: 12px;
                        color: $color_fff;
                    }
                }

                .account-priciple-left{
                    border-right: 1px solid rgba($color_fff,0.2);
                }

            }

            .auto-width {
                .account-priciple-left {
                    @include block_outline(100%,60px);
                    border: none;
                }
            }

            .account-detail-wrapper {
                position: absolute;
                bottom: -202px;
                left: 50%;
                margin-left: -166px;
                width: 337px;
                height: 210px;
                background-color: $color_fff;
                z-index: 10;
                box-shadow:0 5px 15px 1px #F2F2F2;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;

                .flex-box {
                    height: 100%;
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        position: relative;
                        padding-top: 35px;
                        flex: 1 0;
                        flex-basis: 50%;
                        height: 50%;

                        .detail-money {
                            font-size: 19px;
                            color: #333;
                        }

                        .detail-title {
                            font-size: 12px;
                            color: #999;
                        }

                        &:nth-of-type(odd) {
                            &:after {
                                position: absolute;
                                right: 0;
                                top: 50%;
                                margin-top: -30px;
                                content: ' ';
                                height: 60px;
                                width: 1px;
                                border-left: 1px solid #EEE;
                            }
                        }
                        &:nth-child(3){
                            &:before {
                                position: absolute;
                                top: 0;
                                right: 0;
                                content: ' ';
                                height: 1px;
                                width: 150px;
                                border-top: 1px solid #EEE;
                            }
                        }
                        &:nth-child(4){
                            &:before {
                                position: absolute;
                                top: 0;
                                left: 0;
                                content: ' ';
                                height: 1px;
                                width: 150px;
                                border-top: 1px solid #EEE;
                            }
                        }
                    }
                }
            }
        }

        .no-list-chose {
            @include block_outline($height : 282px);
            padding-top: 50px;
            .account-type {
                bottom: 15px;
            }
        }

        /deep/ .vux-slider > .vux-indicator > a,
        /deep/ .vux-slider .vux-indicator-right > a{
            margin: 0 4.5px;

            .vux-icon-dot{
                background: $color_eee;

                &.active{
                    background: #2C78EE;
                }
            }
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 0px auto 20px;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
            }
        }

        .owner-btn {
            margin-top: 300px;
        }

        /deep/ .vux-cell-box::before{
            display: none;
        }
    }
</style>

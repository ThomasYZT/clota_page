<!--账户信息-->

<template>
    <div class="account">
        <swiper dots-position="center"
                v-model="accountShow"
                @on-index-change="accountTapChange">
            <swiper-item
                class="swiper-demo-img"
                v-for="(item,i) in accountList"
                :key="i">
                <div class="header">
                    <div class="account-list-chose" @click="showAccount">{{item.accountName}}</div>
                    <div class="asset-info">{{item.accountBalance | moneyFilter}}</div>
                    <div class="asset-tip">{{$t('allAssets')}}</div>
                    <div class="account-type">
                        <div class="account-priciple-left">
                            <div class="money-num">{{item.corpusBalance | moneyFilter}}</div>
                            <div class="money-label">{{$t('rechargeMoney')}}</div>
                        </div>
                        <div class="account-donate-left">
                            <div class="money-num">{{item.donateBalance | moneyFilter}}</div>
                            <div class="money-label">{{$t('donateMoney')}}</div>
                        </div>
                    </div>
                </div>
            </swiper-item>
        </swiper>

        <div class="btn-area">
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
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                visible : false,
                //选择的账户信息
                chosedAccount : [],
                //账户列表
                accountList : [
                    {}
                ],
                //当前显示的账户信息
                accountShow : 0
            }
        },
        methods: {
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
                    cardId : this.userInfo.cardId,
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if(res.success){
                        this.accountList =  res.data ? res.data.map((item,index) => {
                            return {
                                ...item,
                                name : item.accountName,
                                value : index
                            }
                        }) : [];
                    }else{
                        this.accountList = [];
                    }
                });
            }
        },
        created () {
            this.listCardAccountInfo();
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            })
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    $img_base_url : '../../assets/images/';
    .account{
        @include block_outline();

        /deep/ .vux-swiper{
            height: 310px!important;
        }

        .header{
            position: relative;
            @include block_outline($height : 267px);
            background: get_url('integrateDetialBg.png');
            background-size: 100%;
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
            margin: 33px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
            }
        }

        /deep/ .vux-cell-box::before{
            display: none;
        }
    }
</style>

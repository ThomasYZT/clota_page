1<!--储值信息-->

<template>
    <div class="fund-info">
        <div class="title">{{$t('fundInfo')}}</div><!--账户储值信息-->
        <div class="account-info"
            v-for="(item,key,i) in accountList"
            :key="i">
            <div class="account-detail">
                <div class="img-area" >
                    <img v-if="key === 'defaultAccount'" src="../../../assets/images/icon-default-account.svg" alt="">
                    <img v-else src="../../../assets/images/icon-common-account.svg" alt="">
                </div>
                <div class="fund-list">
                    <div class="account-name">
                        {{$t(key)}}{{'(' + $t('yuan') + ')'}}
                    </div>
                    <div class="money-area">
                        <div class="account-money" v-for="(list,ik) in item" :key="ik">
                            {{list | moneyFilter}}
                            <span class="label-info">{{$t('account.' + ik)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="account-operate">
                <li class="list" v-if="key !== 'openAccount'" @click="toFundDetail(item)">{{$t('storageDetail')}}</li><!--储值明细-->
                <li class="list"
                    v-w-title="$t('fundDetail')"
                    @click="toTradeDetail(item)">{{$t('fundDetail')}}</li><!--资金交易明细-->
            </ul>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        data () {
            return {
                //账户列表
                accountList : []
            };
        },
        methods : {
            /**
             * 获取所欲的账户信息
             */
            queryMemberAccountDefine () {
                //会员3期暂时去掉
                // ajax.post('queryChargingAccountInfo',{
                //     accountType : 'charging',
                //     pageNo : 1,
                //     pageSize : 99999,
                // }).then(res => {
                //    if (res.success) {
                //         this.accountList = res.data ? res.data : [];
                //    } else {
                //        this.accountList = [];
                //    }
                // }).catch(() => {
                //     this.accountList = [];
                // });
                ajax.post('statisChargingAccount').then(res => {
                    if (res.success) {
                        this.accountList = res.data ? res.data : [];
                    } else {
                        this.accountList = [];
                    }
                }).catch(() => {
                    this.accountList = [];
                });
            },
            /**
             * 跳转到资金交易明细
             * @param data
             */
            toTradeDetail (data) {
                this.$router.push({
                    name : 'fianceDetail',
                    params : data
                });
            },
            /**
             * 跳转到储值明细页面
             * @param data
             */
            toFundDetail (data) {
                this.$router.push({
                    name : 'fund',
                    params : data
                });
            },
            /**
             * 获取单位
             * @param rowData
             */
            getUnit (rowData) {
                if (rowData.id === '1') {
                    return '(' + this.$t('yuan') + ')';
                } else {
                    if (rowData.unit) {
                        return '(' + rowData.unit + ')';
                    } else {
                        return '';
                    }
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.queryMemberAccountDefine();
            });
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .fund-info{
        @include block_outline();
        padding: 0 30px 0 30px;
        @include padding_place();

        .title{
            @include block_outline($height : 62px);
            padding: 20px 0;
            font-size: $font_size_16px;
            color:$color_333;
        }

        .account-info{
            position: relative;
            float: left;
            @include block_outline(auto,178px);
            min-width: 30%;
            background: $color_fff;
            border: 1px solid $color_E9E9E9;
            border-radius: 2px;
            margin-bottom: 30px;

            &:nth-of-type(3n){
                margin: 0 5px 30px 5%;
            }

            .account-detail{
                @include block_outline($height : 138px);
                padding-right: 10px;

                .img-area{
                    @include block_outline(78px);
                    padding: 22px 20px;
                    float: left;
                    @include absolute_pos(absolute,$left : 0);

                    img{
                        @include block_outline(38px,38px,false);
                    }
                }

                .fund-list{
                    width: 100%;
                    float: left;
                    padding: 21px 10px 26px 10px;

                    .money-area{
                        @include block_outline($height : 50px);
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                    }

                    .account-name{
                        @include block_outline($height : 42px);
                        @include overflow_tip();
                        line-height: 24px;
                        padding: 9px 0 9px 70px;
                        font-size: $font_size_18px;
                        color: rgba($color_000,0.85);
                    }

                    .account-money{
                        display: inline-block;
                        @include block_outline(auto, 50px);
                        line-height: 32px;
                        padding: 9px 10px;
                        font-size: $font_size_28px;
                        color: rgba($color_000,0.65);
                        text-align: center;

                        .label-info{
                            display: block;
                            font-size: $font_size_12px;
                            color: $color_666;
                            height: 20px;
                            line-height: 20px;
                        }
                    }
                }
            }

            .account-operate{
                @include block_outline($height : 40px);
                background: #F7F9FA;
                border-top: 1px solid #E8E8E8;
                border-bottom: 1px solid #E8E8E8;

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
                }
            }
        }
    }
</style>

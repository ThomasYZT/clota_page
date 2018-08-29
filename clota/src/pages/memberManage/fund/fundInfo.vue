1<!--储值信息-->

<template>
    <div class="fund-info">
        <div class="title">账户储值信息</div>
        <div class="account-info"
            v-for="(item,i) in accountList"
            :key="i">
            <div class="account-detail">
                <div class="img-area" >
                    <img v-if="item.id === '1'" src="../../../assets/images/icon-default-account.svg" alt="">
                    <img v-else src="../../../assets/images/icon-common-account.svg" alt="">
                </div>
                <div class="fund-list">
                    <div class="account-name" v-w-title="item.accountName + '（' + item.unit +'）'">
                        {{item.accountName}}（{{item.unit}}）
                    </div>
                    <div class="account-money">{{item.amount | moneyFilter}}</div>
                </div>
            </div>
            <ul class="account-operate">
                <li class="list" @click="toFundDetail(item)">储值明细</li>
                <li class="list" @click="toTradeDetail(item)">资金交易明细</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        data() {
            return {
                //账户列表
                accountList : []
            }
        },
        methods: {
            /**
             * 获取所欲的账户信息
             */
            queryMemberAccountDefine () {
                ajax.post('queryChargingAccountInfo',{
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                   if(res.success){
                        this.accountList = res.data ? res.data : [];
                   }else{
                       this.accountList = [];
                   }
                }).catch(err => {
                    this.accountList = [];
                });
            },
            /**
             * 跳转到资金交易明细
             * @param data
             */
            toTradeDetail(data) {
                this.$router.push({
                    name : 'fundDetail',
                    params : data
                });
            },
            /**
             * 跳转到储值明细页面
             * @param data
             */
            toFundDetail(data){
                this.$router.push({
                    name : 'fund',
                    params : data
                });
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                vm.queryMemberAccountDefine();
            });
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .fund-info{
        @include block_outline();
        padding: 5px 30px 0 30px;
        @include padding_place();

        .title{
            @include block_outline($height : 62px);
            padding: 20px 0;
            font-size: $font_size_16px;
            color:$color_333;
        }

        .account-info{
            float: left;
            @include block_outline(30%,178px);
            background: $color_fff;
            border: 1px solid $color_E9E9E9;
            border-radius: 2px;
            margin-bottom: 30px;

            &:nth-of-type(3n){
                margin: 0 5%;
            }

            .account-detail{
                @include block_outline($height : 138px);
                padding-right: 10px;

                .img-area{
                    @include block_outline(78px);
                    padding: 30px 20px;
                    float: left;

                    img{
                        @include block_outline(38px,38px,false);
                    }
                }

                .fund-list{
                    float: left;
                    @include block_outline(unquote('calc(100% - 78px)'));
                    padding: 21px 0 26px 0 ;

                    .account-name{
                        @include block_outline($height : 42px);
                        @include overflow_tip();
                        line-height: 24px;
                        padding: 9px 0;
                        font-size: $font_size_18px;
                        color: rgba($color_000,0.85);
                    }

                    .account-money{
                        @include block_outline($height : 50px);
                        line-height: 32px;
                        padding: 9px 0;
                        font-size: $font_size_28px;
                        color: rgba($color_000,0.65);
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

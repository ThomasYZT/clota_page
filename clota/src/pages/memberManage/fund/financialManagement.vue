<template>
    <!--会员管理--储值管理--财务管理-->
    <div class="member-special">

        <div class="content-item">
            <div class="title">景区账户余额</div>
            <div class="content">
                <div class="header-wrap">本金账户余额（元）</div>
                <div class="body-wrap">
                    <div class="coast">{{moneyLeft | contentFilter}}</div>
                    <div class="operate-right">
                        <span @click="showTransferModal">转账</span>
                        <span class="split-line"></span>
                        <span @click="viewTransferRecord">转账记录</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tips">
            提示：本金账户余额为所有储值比率为1：1的本金账户的总和。
        </div>
        <!--转账modal-->
        <transfer-modal
            ref="transfer"
            :org-info="orgInfo"
            @fresh-data="getOrgAccount">
        </transfer-modal>

    </div>
</template>

<script>

    import transferModal from  './components/transferModal.vue';
    import ajax from '@/api/index.js';
    import common from '@/assets/js/common.js';
    

    export default {
        components: {
            transferModal,
        },
        data () {
            return {
                //账户余额
                moneyLeft : '',
                //账户信息
                orgInfo : {}
            }
        },
        methods: {

            /**
             * 显示转账模态框
             */
            showTransferModal () {
                this.$refs.transfer.show();
            },

            /**
             * 跳转到转账记录详情表
             */
            viewTransferRecord () {
                this.$router.push({ name: 'transferRecord'});
            },

            /**
             * 获取账户余额
             */
            getOrgAccount () {
                ajax.post('getOrgAccount').then(res => {
                   if(res.success){
                        this.moneyLeft = common.isNotEmpty(res.data.balance) ? Number(res.data.balance).toCurrency() : '';
                        this.orgInfo =  res.data;
                   }else{
                       this.moneyLeft = '';
                   }
                }).catch(err => {
                    this.moneyLeft = '';
                });
            }

        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.getOrgAccount();
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-special{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        padding: 20px 30px;

        .tips{
            font-size: 14px;
            color: $color_yellow;
        }

        .content-item{
            margin-bottom: 15px;

            .title{
                font-size: $font_size_16px;
                color : $color_333;
            }

            .content{
                border: 1px solid $color_E9E9E9;
                border-radius: 4px 4px 0 0;
                font-size: $font_size_14px;
                margin-top: 15px;

                .header-wrap{
                    background: $color_F5F7FA_050;
                    border-bottom: 1px solid $color_E9E9E9;
                    border-radius: 3px 3px 0 0;
                    height: 40px;
                    line-height: 38px;
                    padding: 0 20px;
                    color: $color_000_085;
                }

                .body-wrap{
                    padding: 0 40px 0 30px;
                    height: 60px;
                    line-height: 60px;
                    @include clearfix();

                    .coast{
                        display: inline-block;
                        font-size: $font_size_18px;
                        color: $color-333;
                        >span{
                            margin-right: 30px;
                        }
                    }

                    .operate-right{
                        float: right;
                        color: $color-blue;
                        >span{
                            cursor: pointer;
                        }
                        .split-line{
                            display: inline-block;
                            width: 1px;
                            height: 14px;
                            background-color: $color-E1E1E1;
                            margin: 0 10px;
                            vertical-align: middle;
                        }
                    }

                }
            }

        }

    }
</style>


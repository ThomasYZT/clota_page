<!--订单提交成功-->

<template>
    <div class="order-submit-suc">
        <div class="img-area">
            <img src="../../../../assets/images/verify-ok-img.png" alt="">
        </div>
        <div class="submit-log">{{$t('productSubmitSuc')}}</div>
        <div class="audit-log" v-if="type === 'team'">
            {{$t('teamProductTips')}}
        </div>
        <Button type="primary" v-if="canShowDetail" @click="toOrderDetail">{{$t('viewDetail')}}</Button>
        <div class="text-wrap">
            <span class="continue-btn" @click="continueReserve">{{$t('continueReserve')}}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data () {
            return {
                type : '',
                //订单id
                orderId : ''
            };
        },
        methods : {
            /**
             * 继续预定订单
             */
            continueReserve () {
                this.$router.push({
                    name : 'createOrder'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.type) {
                    this.type = params.type;
                    this.orderId = params.orderId;
                } else {
                    this.$router.push({
                        name : 'createOrder'
                    });
                }
            },
            /**
             * 跳转到订单详情
             */
            toOrderDetail () {
                if (!this.canShowDetail) return;
                if (this.type === 'team') {
                    this.$router.push({
                        name : 'teamOrderDetail',
                        params : {
                            orderId : this.orderId
                        }
                    });
                } else if (this.type === 'individual') {
                    this.$router.push({
                        name : 'individualFirstLevel',
                        params : {
                            orderId : this.orderId
                        }
                    });
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以查看订单详情
            canShowDetail () {
                return this.permissionInfo && 'orderDetail' in this.permissionInfo;
            },
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-submit-suc{
        @include block_outline();
        background: $color_fff;
        overflow: auto;
        @include padding_place();
        text-align: center;

        .img-area{
            @include block_outline(150px,100px);
            margin: 150px auto 0;

            img{
                @include block_outline($height : auto,$is_block : false);
            }
        }

        .submit-log{
            font-size: $font_size_20px;
            color: $color_333;
            text-align: center;
            margin-bottom: 15px;
        }

        .audit-log{
            font-size: $font_size_14px;
            color: #353B48;
        }

        /deep/ .ivu-btn-primary{
            margin-top: 44px;
        }

        .text-wrap{
            margin-top: 10px;
            font-size: $font_size_14px;
            color: $color_blue;
            cursor: pointer;
        }
    }
</style>

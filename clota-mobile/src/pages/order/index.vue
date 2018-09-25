<!--订单列表-->

<template>
    <div class="order-list">
        <ul class="head">
           <li class="order-type">
               <span class="iconfont icon-alipay"></span>
               <span class="label">票</span>
           </li>
            <li class="order-type">
                <span class="iconfont icon-alipay"></span>
                <span class="label">票</span>
            </li>
            <li class="order-type">
                <span class="iconfont icon-alipay"></span>
                <span class="label">票</span>
            </li>
            <li class="order-type">
                <span class="iconfont icon-alipay"></span>
                <span class="label">票</span>
            </li>
        </ul>
        <!--订单列表-->
        <div class="order-info">
            <div class="order-title">北京欢乐谷七夕套餐，买一赠一</div>
            <div class="num">数量：2</div>
            <div class="price">总价：¥323.32</div>
            <div class="hr"></div>
            <div class="to-detail">
                <span class="for-detail" @click="toOrderDetail">查看详情</span>
            </div>
        </div>
        <div class="order-info">
            <div class="order-title">北京欢乐谷七夕套餐，买一赠一</div>
            <div class="num">数量：2</div>
            <div class="price">总价：¥323.32</div>
            <div class="hr"></div>
            <div class="to-detail">
                <span class="for-detail">查看详情</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            /**
             * 跳转到订单详情
             * @param data
             */
            toOrderDetail (data) {
                this.$router.push({
                    name : 'orderDetail'
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-list{
        @include block_outline();
        background: rgba(242,243,244,1);

        .head{
            @include block_outline($height : 85px);
            background: $color_fff;
            display: flex;
            flex-direction: row;

            .order-type{
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .icon-alipay{
                    @include block_outline(23px,23px,false);
                    font-size: 23px;
                }

                .label{
                    font-size: $font_size_12px;
                    color: #353B48;
                    margin-top: 10px;
                }
            }
        }

        .order-info{
            margin-top: 8px;
            @include block_outline($height : 139px);
            background: $color_fff;
            padding: 9px 0;

            .order-title{
                @include block_outline($height : 30px);
                font-size: $font_size_14px;
                color: #4A4A4A;
                padding: 5px 14px;
                @include overflow_tip();
            }

            .num,
            .price{
                @include block_outline($height : 21);
                padding: 4px 14px;
                font-size: $font_size_12px;
                color: #8E9091;
                line-height: 17px;
            }

            .hr{
                @include block_outline(unquote('calc(100% - 14px)'),0.5px);
                margin-top: 10px;
                background:#E8E8E8;
                padding-left: 14px;
                margin-left: 14px;
            }

            .to-detail{
                @include block_outline($height : 40px);
                text-align: right;
                padding: 9.5px 14px 0 0;

                .for-detail{
                    @include block_outline(60px,21px);
                    border: 1px solid #F7981C;
                    border-radius: 4px;
                    font-size: $font_size_12px;
                    color:#F7981C ;
                    padding: 2.5px 7px;
                }
            }
        }
    }
</style>

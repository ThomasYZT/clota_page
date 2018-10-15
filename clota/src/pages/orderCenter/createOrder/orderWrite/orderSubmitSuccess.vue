<!--订单提交成功-->

<template>
    <div class="order-submit-suc">
        <div class="img-area"></div>
        <div class="submit-log">订单提交成功！</div>
        <Button type="primary">查看详情</Button>
        <div class="text-wrap">
            <span class="continue-btn" @click="continueReserve">继续预定</span>
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
                if(!params || !params.success){
                    this.$router.push({
                        name : 'createOrder'
                    });
                }
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
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
            @include block_outline(200px,200px);
            margin: 100px auto 0;
        }

        .submit-log{
            font-size: $font_size_20px;
            color: $color_333;
            text-align: center;
            margin-bottom: 59px;
        }

        .text-wrap{
            margin-top: 10px;
            font-size: $font_size_14px;
            color: $color_blue;
            cursor: pointer;
        }
    }
</style>

<!--订单提交成功-->

<template>
    <div class="order-submit-suc">
        <div class="img-area"></div>
        <div class="submit-log">订单提交成功！</div>
        <div class="audit-log" v-if="type === 'team'">
            团队订单的审核结果我们将以短信发送通知导游，请耐心等待。
        </div>
        <Button type="primary">查看详情</Button>
        <div class="text-wrap">
            <span class="continue-btn" @click="continueReserve">继续预定</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                type : ''
            }
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
                if(params && params.type){
                    this.type = params.type;
                }else{
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

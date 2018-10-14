<!--订单填写-->

<template>
    <div class="order-write">

        <bread-crumb-head
            :locale-router="'订单预定'"
            :before-router-list="beforeRouterList">     <!--新增卡券 : 修改卡券信息-->
        </bread-crumb-head>
        <!--产品信息 -->
        <product-info :product-list="productList">
        </product-info>
        <!--游客信息-->
        <tourist-info :product-list="productList" >
        </tourist-info>
        <!--下单人信息-->
        <place-orderInfo :pay-person-list="payPersonList">
        </place-orderInfo>
        <!--其它信息-->
        <other-info>
        </other-info>
        <!--账户信息 -->
        <account-info>
        </account-info>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js'
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import productInfo from './child/productInfo';
    import touristInfo from './child/touristInfo';
    import placeOrderInfo from './child/placeOrderInfo';
    import otherInfo from './child/otherInfo';
    import accountInfo from './child/accountInfo';

    export default {
        mixins : [lifeCycelMixins],
        components : {
            breadCrumbHead,
            productInfo,
            touristInfo,
            placeOrderInfo,
            otherInfo,
            accountInfo,
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: '订单填写',
                        router: {
                            name: 'createOrder'
                        }
                    }
                ],
                //产品列表
                productList : [],
                //下单人列表
                payPersonList : [
                    {
                        label : '张三',
                        value : '张三',
                    }
                ]
            }
        },
        methods: {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && params.productList){
                    this.productList = params.productList;
                }else{
                    this.$router.push({
                        name : 'createOrder'
                    });
                }
            },
            /**
             * 获取游客信息
             * @param data
             */
            getTouristInfo (data) {
                console.log(data);
            }
        },
        computed : {
            //游客选择产品信息统计
            productInfoCount () {

            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-write{
        @include block_outline();
        background: $color_fff;
        overflow: auto;
        @include padding_place();
    }
</style>

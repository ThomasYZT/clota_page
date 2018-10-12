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
        <tourist-info>
        </tourist-info>
    </div>
</template>

<script>
    import lifeCycelMixins from '@/mixins/lifeCycleMixins.js'
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import productInfo from './child/productInfo';
    import touristInfo from './child/touristInfo';

    export default {
        mixins : [lifeCycelMixins],
        components : {
            breadCrumbHead,
            productInfo,
            touristInfo
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
                productList : []
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
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-write{
        @include block_outline();
        background: $color_fff;
    }
</style>

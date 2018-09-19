<!--产品类别设置-->

<template>
    <div class="product-type-setting">
        <!--头部tab组件-->
        <header-tabs
            :router-name="routerName">
        </header-tabs>
        <div class="content">
            <div class="btn-area">
                <Button type="primary" icon="ios-plus-empty" @click="addProductType">新增产品类别</Button>
                <Button type="primary" @click="modify">修改</Button>
                <Button type="primary" @click="delProductType">删除</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import headerTabs from './components/headerTabs.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    export default {
        components : {
            headerTabs,
            tableCom
        },
        data() {
            return {
                //当前页面路由名称
                routerName: 'productTypeSetting',
            }
        },
        methods: {
            /**
             * 新增产品类别
             */
            addProductType () {

            },
            /**
             * 修改产品类别
             */
            modify () {

            },
            /**
             * 删除产品类别
             */
            delProductType () {

            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .product-type-setting{
        background: $color-fff;
        @include block_outline();

        .content {
            height: calc(100% - 126px);
            overflow: auto;
            padding: 0 30px;

            .btn-area{
                @include block_outline($height : 60px);
                padding-top: 15px;

                /deep/ .ivu-btn{
                    margin-right: 5px;
                }
            }
        }
    }
</style>

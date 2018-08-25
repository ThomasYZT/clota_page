<template>
    <!--享受积分、折扣率信息-->
    <div class="member-rate">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :before-router-list="beforeRouterList"
                :locale-router="localeRouter">
            </bread-crumb-head>
        </div>

        <div class="rate-content">

            <div class="table-wrap width-500">
                <div class="title-wrap">按会员级别享受积分、折扣率信息</div>
                <table-com
                    :column-data="cardColumnData"
                    :table-data="cardData"
                    :border="false"
                    :ofset-height="170">
                </table-com>
            </div>

            <div class="table-wrap width-660">
                <div class="title-wrap">按店铺享受积分、折扣率信息</div>
                <table-com
                    :column-data="storeColumnData"
                    :table-data="storeData"
                    :border="false"
                    :ofset-height="335">
                </table-com>
            </div>

            <div class="table-wrap width-1100">
                <div class="title-wrap">按产品享受积分、折扣率信息</div>
                <table-com
                    :column-data="productColumnData"
                    :table-data="productData"
                    :border="false"
                    :ofset-height="545">
                </table-com>
            </div>

        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            tableCom,
        },
        computed: {
            show () {
               return false
            },
        },
        data () {
            return {
                beforeRouterList: [
                    {
                        name: '会员信息',
                        router: 'info',
                    },
                    {
                        name: '会员详情',
                        router: 'detail',
                    },
                ],
                localeRouter: '享受积分、折扣率信息',
                //会员详情数据
                detail: {},
                //会员卡的积分折扣率
                cardData: [
                    {scoreRate: '1积分=1元',discountRate: '9.5折',},
                    {scoreRate: '1积分=1元',discountRate: '9.5折',},
                    {scoreRate: '1积分=1元',discountRate: '9.5折',},
                ],
                cardColumnData: [
                    {
                        title: '积分率',
                        minWidth: 100,
                        field: 'scoreRate'
                    },
                    {
                        title: '折扣率',
                        minWidth: 100,
                        field: 'discountRate'
                    },
                ],
                //店铺的积分折扣率
                storeData: [],
                storeColumnData: [
                    {
                        title: '店铺',
                        minWidth: 100,
                        field: 'store'
                    },
                    {
                        title: '积分率',
                        minWidth: 100,
                        field: 'scoreRate'
                    },
                    {
                        title: '折扣率',
                        minWidth: 100,
                        field: 'discountRate'
                    },
                ],
                //产品的积分折扣率
                productData: [],
                productColumnData: [
                    {
                        title: '店铺',
                        minWidth: 100,
                        field: 'store'
                    },
                    {
                        title: '商品',
                        minWidth: 100,
                        field: 'product'
                    },
                    {
                        title: '积分率',
                        minWidth: 100,
                        field: 'scoreRate'
                    },
                    {
                        title: '折扣率',
                        minWidth: 100,
                        field: 'discountRate'
                    },
                ],
            }
        },
        methods: {

            //根据会员卡id获取折扣率说明
            queryList ( params ) {
                ajax.post('listMemberCardRate', {
                    cardId: params.cardId,
                }).then(res => {
                    if(res.success){
                        this.cardData = res.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'listMemberCardRate 失败！');
                    }
                });
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        this[item] = params[item];
                    }
                    //根据会员卡id获取折扣率说明
//                    this.queryList(params.detail);
                }else{
                    this.$router.push({
                        name : 'memberInfo'
                    });
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-rate{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .rate-content{
            padding: 20px 30px;

            .table-wrap{
                margin-bottom: 25px;
                &.width-500{
                    width: 500px;
                }
                &.width-660{
                    width: 660px;
                }
                &.width-1100{
                    max-width: 1100px;
                }
            }

            .title-wrap{
                font-size: $font_size_16px;
                color: $color_333;
                margin-bottom: 15px;
            }

        }

    }
</style>



<!--游客下单-->

<template>
    <div class="tourist-order">
        <date-head
            :active-date="activeDate"
            @show-date-modal="chooseDateShow = true"
            @change-active-date="changeAciveDate">
        </date-head>
        <div class="address-tips">
            地址：广州市番禺区迎宾路长隆旅游度假区内
        </div>
        <div class="product-list">
            <scroll-wrap :item-data="productList"
                         @pull-down="onPullingDown"
                         @pull-up="onPullingUp">
                <template v-for="(item,index) in productList">
                    <product-info :product-info="item"
                                  :key="index"
                                  :active-date="activeDate"
                                  @show-notice="showProductNoticeMethod">
                    </product-info>
                </template>
            </scroll-wrap>
        </div>
        <!--购票须知模态框-->
        <ticket-notice :choosedProductInfo="choosedProductInfo"
                       v-model="showProductNotice">
        </ticket-notice>
        <!--日期选择模态框-->
        <full-date-modal v-model="chooseDateShow"
                         :active-date="activeDate"
                         @choose-day="changeAciveDate">
        </full-date-modal>
    </div>
</template>

<script>
    import dateHead from './components/dateHead';
    import scrollWrap from '@/components/scroll/scrollWrap.vue';
    import productInfo from './components/product-info';
    import fullDateModal from './components/fullDateModal';
    import ajax from '@/marketing/api/index';
    import { mapGetters } from 'vuex';
    import ticketNotice from './components/ticketNotice';

	export default {
		data () {
			return {
                cardType : 2,
                //产品列表
                productList : [],
                //显示购票须知
                showProductNotice : false,
                //选择日期模态框是否显示
                chooseDateShow : false,
                //当前激活日期
                activeDate : new Date(),
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //选择的产品信息
                choosedProductInfo : {}
            };
		},
        components : {
            dateHead,
            scrollWrap,
            productInfo,
            fullDateModal,
            ticketNotice
        },
		methods : {
            /**
             * 显示购票须知详情
             * @param{Object} data 订单信息
             */
            showProductNoticeMethod (data) {
                this.showProductNotice = true;
                this.choosedProductInfo = data;
            },
            /**
             * 查询游客订单信息
             */
            queryProductList () {
                return ajax.post('market_queryMarketProductsForVisitor',{
                    playDate : this.activeDate.format('yyyy-MM-dd'),
                    marketUserId : '1067659364082520064',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.success) {
                        this.productList = res.data ? res.data.data : [];
                    } else {
                        this.productList = [];
                    }
                });
            },
            /**
             * 下拉刷新
             * @param{Function} callback 刷新完成回调
             */
            onPullingDown (callback) {
                this.queryProductList().finally(() => {
                    callback();
                });
            },
            /**
             * 上拉刷新
             * @param{Function} callback 刷新完成回调
             */
            onPullingUp (callback) {
                this.queryProductList().finally(() => {
                    callback();
                });
            },
            /**
             * 更新日期
             * @param{Date} date 要更新的日期
             */
            changeAciveDate (date) {
                this.activeDate = date;
                this.queryProductList();
            }
        },
        computed : {
            ...mapGetters({
                marketOrgId : 'marketOrgId',
                marketLevelId : 'marketLevelId',
                marketTypeId : 'marketTypeId',
            })
        },
        created () {
		    this.queryProductList();
        }
	};
</script>
<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .tourist-order{
        @include block_outline();
        background: #f2f3f4;

        .address-tips{
            @include block_outline($height : 30px);
            line-height: 30px;
            padding-left: 14px;
            font-size: $font_size_14px;
            color: #8395A7;
        }

        .product-list{
            @include block_outline($height : unquote('calc(100% - 83px)'));
        }
    }
</style>

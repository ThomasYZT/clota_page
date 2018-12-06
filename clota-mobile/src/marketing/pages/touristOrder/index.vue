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
                                  @show-notice="showProductNoticeMethod">
                    </product-info>
                </template>
            </scroll-wrap>
        </div>
        <!--购票须知模态框-->
        <div v-transfer-dom>
            <popup v-model="showProductNotice">
                <div :class="$style.popupBody">
                    <div :class="$style.head">
                        <span :class="$style.known" @click="showProductNotice = false">{{$t('知道了')}}</span>
                        购票须知
                    </div>
                    <div :class="$style.content">
                        <div :class="$style.productTitle">广州长隆水上乐园成人单人票</div>
                        <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('产品说明') })}}</div>
                        <div :class="$style.notice">本产品包含：水上乐园全天双人票1张，野生动物园门票1张以及飞鸟乐园10选3门票1张。
                            其中飞鸟乐园可选游玩项目包括：丛林飞龙、旋转木马、哪吒闹海。。。
                            使用规则：两人同时检票入园，每张票限免费携带一名1.0米（不含）以下儿童入园。
                            有效期：游玩日期当天起3天有效。
                            适用条件：成人或身高1.5米（含）以上儿童。</div>
                        <div :class="$style.productNotice">{{$t('colonSetting',{ key : $t('购票须知') })}}</div>
                        <div :class="$style.notice">本产品包含：水上乐园全天双人票1张，野生动物园门票1张以及飞鸟乐园10选3门票1张。
                            其中飞鸟乐园可选游玩项目包括：丛林飞龙、旋转木马、哪吒闹海。。。
                            使用规则：两人同时检票入园，每张票限免费携带一名1.0米（不含）以下儿童入园。
                            有效期：游玩日期当天起3天有效。
                            适用条件：成人或身高1.5米（含）以上儿童。</div>
                    </div>
                </div>
            </popup>
        </div>
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
                pageSize : 10
            };
		},
        components : {
            dateHead,
            scrollWrap,
            productInfo,
            fullDateModal
        },
		methods : {
            /**
             * 显示购票须知详情
             * @param data
             */
            showProductNoticeMethod (data) {
                this.showProductNotice = true;
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
<style module>
    .popupBody{
        width: 100%;
        height: 400px;
        background: #fff;
    }
    .head{
        width: 100%;
        height: 44px;
        background: #F5F6F8;
        position: relative;
        text-align: center;
        line-height: 44px;
        font-size: 15px;
        color: #666666;
    }
    .known{
        position: absolute;
        right: 10px;
        font-size: 15px;
        color: #046FDB;
    }
    .content{
        height: 364px;
        overflow: auto;
        padding: 0 24px;
    }
    .productNotice{
        height: 30px;
        font-size: 15px;
        color: #333333;
        padding-bottom: 9px;
        margin-top: 14px;
    }
    .notice{
        font-size: 12px;
        color: #999999;
    }
    .footer{
        height: 38px;
        background: #F5F6F8;
        line-height: 38px;
        text-align: right;
    }
    .price{
        color: #F7981C;
    }
    .commission{
        color: #046FDB;
        margin-left: 20px;
        padding-right: 10px;
    }
</style>

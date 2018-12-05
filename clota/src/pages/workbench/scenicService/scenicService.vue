<!--
内容：景区服务工作台
作者：djc
日期：
-->

<template>
    <div class="workbench-main">
        <div class="overview-data">
            <!--今日入园人数-->
            <overview-data :label-name="$t('今日入园人数')"
                      :label-rate="itemsData.checkVisitorNum.rate"
                      :label-num="itemsData.checkVisitorNum.value"
                      :icon="require('@/assets/images/icon-abnormal.svg')"
                      label-curve="up">
            </overview-data>
            <!--今日订单数量-->
            <overview-data :label-name="$t('今日订单数量')"
                      :label-rate="itemsData.orderNum.rate"
                      :label-num="itemsData.orderNum.value"
                      :icon="require('@/assets/images/icon-abnormal.svg')"
                      label-curve="up">
            </overview-data>
            <!--今日订单金额-->
            <overview-data :label-name="$t('今日订单金额')"
                      :label-rate="itemsData.orderAmount.rate"
                      :label-num="itemsData.orderAmount.value"
                      :icon="require('@/assets/images/icon-abnormal.svg')"
                      label-curve="up">
            </overview-data>
            <!--未处理通知-->
            <overview-data :label-name="$t('未处理通知')"
                      :label-num="itemsData.workBackNum.value"
                      :icon="require('@/assets/images/icon-abnormal.svg')"
                      label-curve="down">
            </overview-data>
        </div>
        <div class="quota-info"></div>
        <div class="quota-info"></div>
    </div>
</template>
<script>
    import overviewData from '../components/overviewData.vue';
    import ajax from '@/api/index';

    export default {
        components : {
            overviewData
        },
        props : {},
        data () {
            return {
                //顶部各项数据
                itemsData : {
                    //入园人数
                    checkVisitorNum : {},
                    //订单金额
                    orderAmount : {},
                    //订单数量
                    orderNum : {},
                    //未处理通知
                    workBackNum : {},
                }
            }
        },
        computed : {},
        created () {
            this.getScenicQuota();
        },
        mounted () {
        },
        watch : {},
        methods : {
            getScenicQuota () {
                ajax.post('workbench-queryScenicWorkbenchOptions',{
                    date : new Date().format('yyyy-MM-dd')
                }).then((res) => {
                    if (res.success && res.data) {
                        this.itemsData = res.data;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .workbench-main {
        background: $color_F4F6F8;
        @include block_outline();
        @include padding_place();
        overflow: auto;

        &:after{
            background: $color_F4F6F8;
        }


        .overview-data,
        .quota-info {
            overflow: auto;
            margin-top: 15px;
        }
    }
</style>

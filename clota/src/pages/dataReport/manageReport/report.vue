<!--经营报表、财务报表-->

<template>
    <div class="manage-report-wrap">
        <iframe v-if="reportBaseUrl"
                class="iframe-tabel"
                :key="reportUrl"
                :src="reportUrl"
                frameborder="0"></iframe>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                //报表基础路由
                reportBaseUrl : '',
            };
        },
        methods : {
            /**
             * 获取会员报表权限
             */
            getTableauTrustedUrl () {
                ajax.post('getTableauTrustedUrl').then(res => {
                    if (res.success) {
                        this.reportBaseUrl = res.data ? res.data : '';
                    } else {
                        this.reportBaseUrl = '';
                    }
                });
            },
        },
        watch : {
            '$route' : {
                handler () {
                    this.getTableauTrustedUrl();
                },
                immediate : true
            }
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //报表路由
            reportUrl () {
                let env = 'clota-' + APIENV;
                let reportParams = '';
                if (this.$route.name === 'paymentsAnalysis') {//收支明细表
                    reportParams = `views/${env}/sheet14?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'partnerAbality') {//合作伙伴能力分析报表
                    reportParams = `views/${env}/sheet5?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'enterGardenTimeAnalysis') {//入园时段报表
                    reportParams = `views/${env}/sheet6?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'marketAnalysis') {//全民营销能力分析报表
                    reportParams = `views/${env}/sheet7?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'productSaleRankList') {//产品销售排行报表
                    reportParams = `views/${env}/sheet8?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'individualProductAnalysis') {//散客产品报表
                    reportParams = `views/${env}/sheet9?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'teamProductAnalysis') {//团队产品报表
                    reportParams = `views/${env}/sheet10?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'individualOrderAnalysis') {//散客订单报表
                    reportParams = `views/${env}/sheet11?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'teamOrderAnalysis') {//团队订单报表
                    reportParams = `views/${env}/sheet12?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'smsSendAnalysis') {//短信发送记录报表
                    reportParams = `views/${env}/sheet13?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                }
                return this.reportBaseUrl + reportParams + '&nowOrgId=' + this.manageOrgs.id;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .manage-report-wrap{
        @include block_outline();
        overflow: auto;
        background: $color_fff;

        .iframe-tabel{
            @include block_outline($height : unquote('calc(100% - 10px)'));
            overflow: hidden;
        }
    }
</style>

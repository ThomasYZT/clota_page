<!--会员报表-->

<template>
    <div class="manage-report-wrap">
        <iframe class="iframe-tabel" :key="reportUrl" :src="reportUrl" frameborder="0"></iframe>
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
                if (this.$route.name === 'memberGradeAnalysis') {//会员等级报表
                    reportParams = `views/${env}/sheet0?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'memberConsumeAnalysis') {//会员消费数据报表
                    reportParams = `views/${env}/sheet1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'channelAnalysis') {//会员渠道报表
                    reportParams = `views/${env}/sheet2?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'memberIntegerAnalysis') {//会员积分报表
                    reportParams = `views/${env}/sheet3?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                } else if (this.$route.name === 'memberRechargeAnalysis') {//会员充值报表
                    reportParams = `views/${env}/sheet4?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no`;
                }
                return this.reportBaseUrl + reportParams + '&:nowOrgId=' + this.manageOrgs.id;
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

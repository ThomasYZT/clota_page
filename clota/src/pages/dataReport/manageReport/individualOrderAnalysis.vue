<!--散客订单报表-->

<template>
    <div class="manage-report-wrap">
        <iframe class="iframe-tabel" :src="reportUrl" frameborder="0"></iframe>
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
                //报表参数路由
                reportParams : 'views/clota-dev/sheet11?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no'
            };
        },
        methods : {
            /**
             * 获取经营报表权限
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
            /**
             * 获取路由参数
             */
            getParams () {
                this.getTableauTrustedUrl();
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.getParams();
            });
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //报表路由
            reportUrl () {
                return this.reportBaseUrl + this.reportParams + '&:nowOrgId=' + this.manageOrgs.id;
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

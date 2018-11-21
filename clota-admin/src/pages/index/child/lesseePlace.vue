<!--租户用地-->

<template>
    <div class="lessee-place">
        <div class="title">
            租户所在地
        </div>
        <div class="chart-place">
            <pie :pie-data="pieData" v-if="pieShow">
            </pie>
        </div>
    </div>
</template>

<script>
    import pie from './pie';
    import ajax from '@/api/index.js';

    export default {
        components : {
            pie
        },
        data () {
            return {
                //饼图数据
                pieData : {
                    data : [],
                    legend : []
                },
                //饼图是否显示
                pieShow : false
            };
        },
        methods : {
            /**
             * 获取租户所在地数据
             */
            getTenantRegion () {
                this.pieShow = false;
                ajax.get('tenantRegion').then(res => {
                    if (res.status === 200) {
                        if (res.data.regionList && res.data.regionList.length > 0) {
                            let data = [];
                            let legend = [];
                            res.data.regionList.map(item => {
                                legend.push(item.regionName);
                                data.push({
                                    name : item.regionName,
                                    value : item.count
                                });
                            });
                            this.pieData.data = data;
                            this.pieData.legend = legend;
                        }
                    }
                   console.log(res);
                }).finally(() => {
                    this.pieShow = true;
                });
            }
        },
        created () {
            this.getTenantRegion();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .lessee-place {
        float: left;
        @include block_outline(410px, 309px);
        margin-left: 15px;
        @include card();

        .title {
            @include block_outline($height: 45px);
            border-bottom: 1px solid $color_E8E8E;
            line-height: 45px;
            padding: 0 20px;
            font-size: $font_size_16px;
            color: $color_353B5E;
        }

        .chart-place {
            @include block_outline($height: 262px);
        }
    }
</style>

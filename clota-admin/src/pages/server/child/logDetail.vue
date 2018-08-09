<!--日志详情-->

<template>
    <div class="log-detail">
        <bread-crumb-head
            :locale-router="$t('logFile',{msg : 'server-01'})"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="log-info">
            <div class="time-chose">
                <DatePicker type="daterange"
                            placement="bottom-end"
                            style="width: 280px"
                            v-model="logDate">
                </DatePicker>
            </div>
            <!--面积图-->
            <area-com y-yxis-name="文件大小" key="log">
            </area-com>

            <div class="log-file-desc">
                <div class="label"></div>
                日志文件-最小 ： 0.4M 最大：20M
            </div>

            <div class="log-history">
                <table-com
                    :table-data="tableData"
                    :table-height="tableHeight"
                    :column-data="columnData"
                    :row-click="false">
                </table-com>
                <div class="page-area" v-if="tableData.length > 0">
                    <el-pagination
                        :current-page="pageNo"
                        :page-sizes="pageSizeConfig"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="40">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import areaCom from './components/area';
    import tableCom from '../../index/child/tableCom';
    import tableMixins from '../../lessee/tableMixins';
    export default {
        mixins : [tableMixins],
        components: {
            breadCrumbHead,
            areaCom,
            tableCom
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('serverList'),
                        router: {
                            name: 'server'
                        }
                    },
                    {
                        name: this.$t('deviceInfo'),
                        router: {
                            name: 'serverDetail'
                        }
                    }
                ],
                //筛选的日志时间
                logDate : [new Date(),new Date()],
                columnData : [
                    {
                        title: '日期',
                        minWidth: 70,
                        field: 'date'
                    },
                    {
                        title: '时间',
                        minWidth: 70,
                        field: 'time'
                    },
                    {
                        title: '文件大小 M',
                        minWidth: 70,
                        field: 'size'
                    },
                ],
                //表格数据
                tableData : [
                    {
                        date : '2019',
                        time : '12:33',
                        size : '12'
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .log-detail{
        @include block_outline();
        background: $color_f4f6f9;
        overflow: auto;

        .log-info{
            min-height: calc(100% - 74px);
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 0 60px;
            overflow: auto;

            .log-file-desc{
                text-align: center;
                font-size: $font_size_14px;
                color: $color_333;
                @include block_outline($height : 30px);
                line-height: 30px;
                margin-top: 10px;

                .label{
                    @include block_outline(15px,15px);
                    display: inline-block;
                    vertical-align: sub;
                    background: $color_green;
                }
            }

            .time-chose{
                @include block_outline($height : 60px);
                padding: 14px 0;

                .name {
                    float: left;
                    font-size: $font_size_14px;
                    color: $color_333;
                    @include block_outline(auto,32px);
                    line-height: 32px;
                }

                /deep/ .ivu-date-picker{
                    float: right;
                }
            }

            /deep/ .echarts{
                @include block_outline(100%,400px);
            }

            .log-history{
                margin-top: 30px;
            }
            .page-area {
                @include block_outline($height: 57px);
                text-align: right;

                /deep/ .el-pagination {
                    display: inline-block;
                    padding-top: 15px;
                }
            }
        }
    }
</style>

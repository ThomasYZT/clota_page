<!--
    生成链接记录表格
    作者：杨泽涛
-->
<template>
    <div class="">
        <table-com :column-data="columnData"
                   :table-data="tableData"
                   :border="true"
                   :show-pagination="true"
                   :total-count="totalCount"
                   :ofset-height="170"
                   :page-no-d.sync="pageNo"
                   :page-size-d.sync="pageSize"
                   @query-data="queryList">
            <el-table-column
                slot="column2"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Tooltip transfer placement="bottom">
                        <span class="line-info">{{scope.row.optCount | contentFilter}}</span>
                        <div slot="content">
                            <p>{{$t('used')}}：{{scope.row.usedNum | contentFilter}}</p>
                            <p>{{$t('noUse')}}：{{scope.row.waitNum | contentFilter}}</p>
                        </div>
                    </Tooltip>
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span :id="'_card_row_data' + scope.row.id">{{scope.row.couponLink}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li data-clipboard-action="copy"
                            class="coupon-copy-btn"
                            :data-clipboard-target="'#_card_row_data' + scope.row.id">{{$t('copyLink')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { generateLinkRecordHead } from '../couponRecordConfig';
    import ajax from '@/api/index';
    export default {
        props : {
            dateTime : {
                type : Array,
                default () {
                    return [new Date(), new Date().addDays(-7)];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {

                //表头数据
                columnData : generateLinkRecordHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页记录数
                pageSize : 10,
                copyBtn : []
            };
        },
        methods : {
            queryList () {
                ajax.post('queryCouponsLogs', {
                    optType : 'link',
                    startTime : this.dateTime[0].format('yyyy-MM-dd 00:00:00'),
                    endTime : this.dateTime[1].format('yyyy-MM-dd 23:59:59'),
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                        this.setClipboardAction();
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 设置复制到剪贴板功能
             */
            setClipboardAction () {
                this.$nextTick(() => {
                    let btnEle = this.$el.querySelectorAll('.coupon-copy-btn');
                    if (btnEle && btnEle.length > 0) {
                        for (let i = 0,j = btnEle.length; i < j; i++) {
                            if (!this.copyBtn[i]) {
                                this.copyBtn[i] = new this.Clipboard(btnEle[i]);
                                //复制到剪贴板成功
                                this.copyBtn[i].on('success', () => {
                                    this.$Message.success(this.$t('copyToClipBoard',{ field : this.$t('urLink') }));
                                });
                                //复制到剪贴板失败
                                this.copyBtn[i].on('error', () => {
                                    this.$Message.error(this.$t('failureTip', { tip : this.$t('copy') }));
                                });
                            }
                        }
                    }
                });
            },
        },
        watch : {
            dateTime : {
                handler () {
                    this.queryList();
                },
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .line-info {
        color: $color_blue;
        cursor: pointer;
    }
</style>

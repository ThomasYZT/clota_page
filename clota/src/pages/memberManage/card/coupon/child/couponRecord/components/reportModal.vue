<!--
    报表信息模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal report-modal"
               transfer
               width="600"
               :title="$t('addGood')"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="content">
                <div class="content-filter">
                    <ButtonGroup>
                        <Button type="default"
                                @click="changeType('all')"
                                :class="{'selected' : type === 'all'}"
                                class="tab-btn">{{$t('全部')}}</Button>
                        <Button type="default"
                                @click="changeType('used')"
                                :class="{'selected' : type === 'used'}"
                                class="tab-btn">{{$t('已使用')}}</Button>
                        <Button type="default"
                                @click="changeType('noUse')"
                                :class="{'selected' : type === 'noUse'}"
                                class="tab-btn">{{$t('未使用')}}</Button>
                    </ButtonGroup>
                </div>
                <div class="table-wrapper">
                    <table-com v-if="visible"
                               auto-height
                               :table-com-min-height="200"
                               :column-data="columnData"
                               :table-data="tableData"
                               :border="true"
                               :show-pagination="true"
                               :total-count="totalCount"
                               :page-no-d.sync="pageNo"
                               :page-size-d.sync="pageSize"
                               @query-data="queryList">

                    </table-com>
                </div>
            </div>

            <div slot="footer" class="modal-footer">
                <Button @click="hide" >{{$t("close")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { reportModalHead } from '../couponRecordConfig';
    import ajax from '@/api/index';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //表头信息
                columnData : reportModalHead,
                //表格数据
                tableData : [],
                //表格总数据
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页数据条数
                pageSize : 10,
                //记录类型
                type : '',
                //行数据
                rowData : {},
            };
        },
        computed : {
            //卡券状态
            couponStatus () {
                if (this.type === 'used') {
                    return 'used';
                } else if (this.type === 'noUse') {
                    return 'nouse';
                } else {
                    return '';
                }

            }
        },
        methods : {
            /**
             *  显示模态框
             */
            show (type, rowData) {
                if (type && rowData) {
                    this.type = type;
                    this.rowData = rowData;
                    this.visible = true;
                }
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.visible = false;

            },
            changeType (type) {
                this.type = type;
                this.queryList();
            },
            /**
             * 查询
             */
            queryList () {
                ajax.post('queryReportDetail', {
                    couponId : this.rowData.couponId,
                    batchId : this.rowData.batchId,
                    couponStatus : this.couponStatus,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 280px;
        overflow: auto;
    }

    .report-modal {
        .content {
            text-align: center;
            .content-filter {
                display: inline-block;
                /deep/ .selected {
                    border: 1px solid #2F70DF !important;
                    z-index: 10;
                    color: #2F70DF;
                }

                /deep/ .tab-btn {
                    padding-right: 20px;
                    padding-left: 20px;
                    background-color: #fff;
                    outline: none;
                }
            }

            .table-wrapper {
                margin-top: 20px;
            }

        }
    }
</style>

<!--
    查看券码模态框
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal view-code-modal"
               transfer
               width="750"
               :title="$t(title)"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="table-wrapper" v-if="visible">
                <tableCom auto-height
                          :table-com-min-height="300"
                          :column-data="columnData"
                          :table-data="tableData"
                          :border="true"
                          :show-pagination="true"
                          :page-no-d.sync="filterParam.pageNo"
                          :page-size-d.sync="filterParam.pageSize"
                          :total-count="totalCount"
                          @query-data="queryList">
                    <el-table-column
                        slot="column2"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <!-- receive-已领取/已兑换 -->
                            <span class="green-label" v-if="scope.row.couponStatus === 'receive'">
                                <template v-if="scope.row.gainWay === 'link' || scope.row.gainWay === 'download'">
                                    {{$t('alreadyReceived')}}
                                </template>
                                <template v-else>
                                    {{$t('redeemed')}}
                                </template>
                            </span>
                            <!-- wait-未发放 occupy-已发放/未领取 used-已使用 -->
                            <span v-else>
                                {{$t('coupon.status.' + scope.row.couponStatus)}}
                            </span>
                        </template>
                    </el-table-column>
                </tableCom>
            </div>

            <div slot="footer" class="modal-footer">
                <Button type="ghost" @click="hide" >{{$t("close")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { viewCodeCashCouponHead, viewCodeExchangeCouponHead, viewCodeDiscountCouponHead } from '../cardConfig';
    import ajax from '@/api/index';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表行数据
                rowData : {},
                //表格数据
                tableData : [],
                //过滤参数
                filterParam : {
                    //页码
                    pageNo : 1,
                    //每页数据条数
                    pageSize : 10,
                },
                //表格数据总数
                totalCount : 0,
            };
        },
        computed : {
            //模态框标题
            title () {
                if (this.rowData && Object.keys(this.rowData).length > 0) {
                    return this.rowData.couponType;
                } else {
                    return '';
                }
            },
            //表头配置
            columnData () {
                if (this.rowData.couponType === 'cash_coupon') {
                    return viewCodeCashCouponHead;
                } else if (this.rowData.couponType === 'exchange_coupon') {
                    return viewCodeExchangeCouponHead;
                } else if (this.rowData.couponType === 'discount_coupon') {
                    return viewCodeDiscountCouponHead;
                } else {
                    return viewCodeCashCouponHead;
                }
            },
        },
        methods : {
            /**
             * 显示模态框
             * @param data
             */
            show (data) {
                this.rowData = data;
                this.visible = true;
            },
            /**
             * 隐藏
             */
            hide () {
                this.rowData = {};
                this.visible = false;
            },
            /**
             * 查询表格数据
             */
            queryList () {
                ajax.post('listCouponsDetai', {
                    couponId : this.rowData.id,
                    ...this.filterParam
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = [];
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        height: 400px;
        overflow: auto;
    }

    .view-code-modal {
        .table-wrapper {

        }

        .green-label {
            color: $color_green;
        }

        .red-label {
            color: $color_red;
        }
    }
</style>

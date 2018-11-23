<!--
    短信购买记录
    作者：杨泽涛
-->
<template>
    <div class="sms-buy-record">
        <div class="head-info">
            <span class="label">{{$t('totalBuy')}}</span>
            <span class="value">{{totalSym + $t('item')}}</span>
        </div>
        <tableCom
            :ofset-height="110"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="filterData.pageNo"
            :page-size-d.sync="filterData.pageSize"
            :border="true"
            @query-data="getData">
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span :class="[scope.row.txnStatus]">{{scope.row.txnStatus ? $t('txnStatus.' + scope.row.txnStatus) : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span :class="[scope.row.bizStatus]">{{scope.row.bizStatus ? $t('bizStatus.' + scope.row.bizStatus) : '-'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column9"
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list" v-if="scope.row.txnStatus === 'success' && scope.row.bizStatus !== 'success'">
                        <li class="operate" @click="adjust(scope.row)">{{$t('adjust')}}</li><!--查看-->
                    </ul>
                    <span v-else>-</span>
                </template>
            </el-table-column>
        </tableCom>

        <adjustModal ref="adjustModal" @adjust="getData"></adjustModal>
    </div>
</template>

<script>
    import tableCom from '../../../components/tableCom/tableCom';
    import ajax from '../../../api/index';
    import { mapGetters } from 'vuex';
    import { smsByRecordHead } from './smsBuyRecordConfig';
    import adjustModal from './components/adjustModal'
    export default {
        components: {
            tableCom,
            adjustModal
        },
        data() {
            return {
                columnData : smsByRecordHead,
                filterData : {
                    pageNo : 1,
                    pageSize : 10
                },
                tableData : [],
                totalCount : 0,
                //总共购买短信条数
                totalSym : 0
            }
        },
        computed : {
            ...mapGetters([
                'manageOrgs'
            ])
        },
        methods: {
            /**
             * 获取表格数据
             */
            getData () {
                ajax.post('queryPurchaseRecords', {
                    ...this.filterData,
                    orgId : this.manageOrgs.id
                }).then(res => {
                    if (res.success && res.data) {
                        this.totalSym = res.data.totalCount ? res.data.totalCount : 0;
                        this.tableData = res.data.list ? res.data.list : [];
                        this.totalCount = res.data.list ? res.data.list.totalRow : 0;
                    } else {
                        this.totalSym = 0;
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            },
            /**
             * 调整短息数量
             * @param {*} data
             */
            adjust (data) {
                this.$refs.adjustModal.toggle(data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .sms-buy-record {
        height: 100%;

        .head-info {
            margin: 10px 20px;
            height: 50px;
            width: 100%;
            line-height: 50px;

            .label {
                margin-right: 5px;
            }
        }
    }

    .doing {
        color: $color_yellow;
    }

    .success {
        color: $color_green;
    }

    .fail {
        color: $color_red;
    }
</style>

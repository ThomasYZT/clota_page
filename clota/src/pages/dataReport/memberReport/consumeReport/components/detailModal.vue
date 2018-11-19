<!--
    详细消费模态框
    作者：杨泽涛
-->
<template>
    <Modal
        v-model="visible"
        :title="$t('consume') + $t('details')"
        class-name="vertical-center-modal"
        width="600"
        :mask-closable="false"
        @on-cancel="toggle">
        <div class="statistic">
            <span class="label">{{$t('memberName')}}</span> <span class="info">{{listItem.memberName | contentFilter}} | {{listItem.phoneNum | contentFilter}}</span>
            <span class="label">{{$t('memberCardType')}}</span> <span class="info">{{listItem.cardTypeName | contentFilter}} | {{listItem.cardLevelName | contentFilter}}</span>
        </div>

        <div class="statistic">
            <span class="label">{{$t('consumeMoneyTotal')}}</span> <span class="value">{{listItem.actAmount | contentFilter}} </span>
            <span class="label">{{$t('consumeTime')}}</span> <span class="info">| {{listItem.createdTime | contentFilter}}</span>
        </div>

        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="204"
            :page-no-d.sync="filterData.pageNo"
            :page-size-d.sync="filterData.pageSize"
            @query-data="getData">
            <!--<el-table-column-->
                <!--slot="column9"-->
                <!--slot-scope="row"-->
                <!--:label="row.title"-->
                <!--:width="row.width"-->
                <!--:min-width="row.minWidth">-->
                <!--<template slot-scope="scope">-->
                    <!--<ul class="operate-list">-->
                        <!--<li @click="toDetail(scope.row)">{{$t('details')}}</li>-->
                    <!--</ul>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </table-com>
    </Modal>
</template>

<script>
    import tableCom from '../../../../../components/tableCom/tableCom';
    import { consumeRecordHead } from '../../tableHeadConfig';
    import ajax from '../../../../../api/index';
    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //是否显示模态框
                visible : false,
                //列表项数据
                listItem : {},
                //表格数据
                tableData : [],
                //记录总条数
                totalCount : 0,
                //表格表头配置
                columnData : consumeRecordHead,
                //过滤条件数据
                filterData : {
                    //页数
                    pageNo : 1,
                    //每页条数
                    pageSize : 10
                },
            };
        },
        methods : {
            /**
             * 显示/隐藏模态框
             * @param {*} data
             */
            toggle (data) {
                if (data) {
                    this.listItem = data;
                    this.getData();
                } else {
                    this.listItem = {};
                }
                this.visible = !this.visible;
            },
            getData () {
                ajax.post('queryPagedOrderItemDetail', {
                    ...this.filterData,
                    orderId : this.listItem.id
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .statistic {
        padding: 16px 0;
        .label {
            font-size: 14px;
            color: #333333;
        }

        .value {
            font-size: 18px;
            color: #22BB5F;
        }

        .info {
            font-size: 14px;
            color: #666666;
        }

        &:not(:first-of-type) {
            border-top: 1px dashed #E1E1E1;
        }
    }
</style>

<!--
内容：购买短信
作者：djc
日期：
-->

<template>
    <div class="buy-sms">
        <div class="filter-box">
            <Input class="input-field"
                   v-model.trim="filterParam.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputField', {field: 'packageName'})"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <table-com
            :ofsetHeight="170"
            :show-pagination="true"
            :column-data="columnData"
            :table-data="tableData"
            :total-count="totalCount"
            :page-no-d.sync="queryParams.pageNo"
            :page-size-d.sync="queryParams.pageSize"
            :border="true"
            @query-data="queryList">
            <el-table-column
                slot="column2"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.price | moneyFilter}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span class="operate" @click="handleBuy(scope.row)">{{$t('buy')}}</span>
                </template>
            </el-table-column>
        </table-com>

        <!--购买短信套餐弹窗-->
        <buy-sms-modal ref="buySmsModal"></buy-sms-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import tableCom from '@/components/tableCom/tableCom.vue';
    import buySmsModal from './components/buySmsModal.vue';
    import {configVariable} from '@/assets/js/constVariable';
    import {smsPkgHead} from './buySmsConfig';
    import ajax from '@/api/index'

    export default {
        components: {tableCom, buySmsModal},
        props: {},
        data() {
            return {
                // 获取数据的请求参数
                queryParams: {
                    keyword: '',
                    pageNo: 1,                                      // 当前页码数
                    pageSize: configVariable.pageDefaultSize,       // 每页显示数量
                },
                filterParam: {
                    name: '',
                },
                // 表格表头字段名
                columnData: smsPkgHead,
                // 列表数据
                tableData: [],
                // 数据总条数
                totalCount: 0,
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {
            queryList() {
                ajax.post('getSmsPackageList', this.queryParams).then((res) =>{
                    if (res.success) {
                        if (res.data && res.data.data) {
                            this.tableData = res.data.data;
                            this.totalCount = res.data.totalRow;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    }
                })
                this.totalCount = this.tableData.length;
            },

            // 搜索短信套餐
            handleSearch() {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },
            /**
             * 显示购买短信弹窗，并传入当前被操作的行数据
             * @param scopeRow - 行数据
             */
            handleBuy(scopeRow) {
                this.$refs.buySmsModal.show({item: scopeRow});
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .operate {
        color: $color_blue;
        cursor: pointer;
    }

    .filter-box {
        padding: 15px 30px 15px;
        overflow: hidden;
        .input-field {
            width: 350px;
            float: right;
        }
    }
</style>

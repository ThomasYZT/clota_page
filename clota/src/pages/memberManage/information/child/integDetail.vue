<template>
    <!--个人积分交易明细-->
    <div class="member-integration-detail">

        <bread-crumb-head style="padding: 0 30px;"
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="integration-detail-content">
            <div class="filter-wrap">
                <Select v-model="queryParams.operType"
                        style="width:200px"
                        @on-change="filterDealList"
                        :placeholder="$t('selectField', {msg: ''})">
                    <Option v-for="item in type"
                            :value="item.value"
                            :key="item.value">
                        {{ $t(item.name) }}
                    </Option>
                </Select>
                <Date-picker
                    type="date"
                    :editable="false"
                    v-model="queryParams.startDate"
                    format="yyyy-MM-dd"
                    :placeholder="$t('selectField', {msg: $t('startDate')})"
                    @on-change="filterDealList()"><!--请选择开始日期-->
                </Date-picker>
                <Date-picker
                    type="date"
                    :editable="false"
                    v-model="queryParams.endDate"
                    format="yyyy-MM-dd"
                    :placeholder="$t('selectField', {msg: $t('endDate')})"
                    @on-change="filterDealList()"><!--请选择结束日期-->
                </Date-picker>

                <div class="btn-wrap">
                    <Button type="primary" @click="filterDealList()">{{$t('query')}}</Button>
                    <Button type="ghost" @click="resetQueryParams()">{{$t('reset')}}</Button>
                </div>
            </div>
            <table-com
                v-if="queryParams.accountTypeIds"
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
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="green-color" v-if="scope.row.amount > -1">+{{ scope.row.amount | contentFilter}}</span>
                        <span class="red-color" v-if="scope.row.amount < 0">{{ scope.row.amount  | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="blue-color"
                              v-if="scope.row.operationType === 'adjust_score'"
                              @click="viewDetail(scope.row)">
                             {{ $t('adjust_score') }}
                        </span>
                        <span v-else>
                            <template v-if="scope.row.evaluateType === 'consume_add'">
                                {{ $t('gainByConsuming')}}
                            </template>
                            <template v-else-if="scope.row.evaluateType === 'consume_reduce'">
                                {{ $t('scoreResume')}}
                            </template>
                            <template v-else-if="scope.row.evaluateType === 'recharge_add'">
                                {{ $t('gainByRecharging')}}
                            </template>
                            <template v-else>
                               {{$t(scope.row.evaluateType)}}
                            </template>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row.accountSubType === 'corpus'">{{$t('principal')}}：{{ scope.row.amount  | contentFilter }}</span>
                        <span v-else-if="scope.row.accountSubType === 'donate'">{{$t('sendGift')}}：{{ scope.row.amount  | contentFilter }}</span>
                        <span v-else>{{ scope.row.amount  | contentFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{ scope.row.endingBalance | contentFilter }}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <!--积分修改信息modal-->
        <modify-detail-modal
            ref="modifyDetail"
            :manual-data="currManualData">
        </modify-detail-modal>

    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import modifyDetailModal from '../components/viewModifyModal.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import {integraDetailHead, integraType} from './integDetailConfig';
    import ajax from '@/api/index.js';

    export default {
        components: {
            breadCrumbHead,
            modifyDetailModal,
            tableCom
        },
        mixins : [lifeCycleMixins],
        data () {
            return {
                beforeRouterList: [
                    {
                        name: 'memberInfo',     // 会员信息
                        router: 'info',
                    },
                    {
                        name: 'memberDetail',   // 会员详情
                        router: 'detail',
                    },
                ],
                localeRouter: 'selfIntegralTradeDetail',    // 个人积分交易明细
                // 查询数据
                queryParams: {
                    cardId: '',
                    accountTypeIds: '',
                    operType: 'null',
                    startDate: '',
                    endDate: '',
                    pageNo: 1,
                    pageSize: 10,
                },
                // 枚举数据
                type: integraType,
                // 表格数据
                tableData: [],
                //总条数
                totalCount: 0,
                //表头配置
                columnData : integraDetailHead,
                //会员详情账户数据
                integraDetail: {},
                //当前手动修改的交易数据
                currManualData: {},
            }
        },
        methods: {
            /**
             * 查询积分交易明细
             */
            queryList () {
                let param = {};
                Object.assign(param, this.queryParams);
                if (this.queryParams.operType == 'null') {
                    param.operType = null;
                }
                ajax.post('queryOrgAccountChange', Object.assign(param,{
                    startDate : this.queryParams.startDate ? new Date(this.queryParams.startDate).format('yyyy-MM-dd 00:00:00') : '',
                    endDate : this.queryParams.endDate ? new Date(this.queryParams.endDate).format('yyyy-MM-dd 23:59:59') : '',
                })).then(res => {
                    if(res.success){
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },

            /**
             * 手动修改的交易数据，弹窗
             */
            viewDetail ( scopeRow ) {
                this.$refs.modifyDetail.show('integration');
                this.currManualData = scopeRow;
            },

            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    for(let item in params){
                        this[item] = params[item];
                    }

                    this.queryParams.cardId = this.integraDetail.cardId;
                    this.queryParams.accountTypeIds = this.integraDetail.accountDefineId;
                    this.queryList();
                }
            },

            /**
             * 查询交易明细
             */
            filterDealList() {
                Object.assign(this.queryParams, {
                    pageNo: 1,
                    pageSize: 10
                });
                this.queryList();
            },

            /**
             * 重置查询条件
             */
            resetQueryParams() {
                Object.assign(this.queryParams, {
                    operType: 'null',
                    startDate: '',
                    endDate: '',
                    pageNo: 1,
                    pageSize: 10,
                });
                this.queryList();
            },


        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-integration-detail{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;
        position: relative;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .integration-detail-content{

            .filter-wrap{
                height: 60px;
                line-height: 60px;
                padding: 0 30px;
                /deep/ .ivu-select{
                    width: 180px;
                    margin-right: 5px;
                }

                /deep/ .ivu-date-picker{
                    width: 180px;
                    margin-right: 5px;
                }

                /deep/ .ivu-btn{
                    margin-right: 5px;
                }
            }

            .btn-wrap{
                display: inline-block;
                margin-left: 15px;
            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }
        }

        .red-color{
            color: $color_red;
        }

        .green-color{
            color: $color_green;
        }

        .blue-color{
            color: $color_blue;
            cursor: pointer;
        }

    }
</style>




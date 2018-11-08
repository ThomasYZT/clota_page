<template>
    <!--会员管理--会员积分--设置积分率折扣率-->
    <div class="integration-set-rate">

        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="memberInfo.levelName + $t('integration')"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>

        <div class="rate-content">
            <div class="title-wrap">{{$t('member')}}：{{ memberInfo.levelName }}</div>
            <div class="filter-wrap">
                <Input v-model.trim="queryParams.keyword"
                       :placeholder="$t('inputStoreName')"
                       style="width: 240px;margin-right: 15px;" />
                <Button type="primary" @click="queryList">{{$t('query')}}</Button>
                <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
            </div>
            <div class="table-wrap">
                <table-com
                    v-if="tableCanMount"
                    :page-no-d.sync="pageNo"
                    :page-size-d.sync="pageSize"
                    :ofsetHeight="215"
                    :show-pagination="true"
                    :column-data="columnData"
                    :table-data="tableData"
                    :total-count="totalCount"
                    :border="true"
                    @query-data="queryList">
                    <el-table-column
                        slot="column1"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{(scope.row.deptScoreRate !== '' && scope.row.deptScoreRate !== null ? (scope.row.deptScoreRate + ':' + 1) : '') | contentFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="isActivity"
                        slot="column3"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{scope.row.startTime | timeFormat('yyyy-MM-dd','')}} - {{scope.row.endTime | timeFormat('yyyy-MM-dd','')}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        :slot="'column' + (columnData.length - 1)"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        fixed="right"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <ul class="operate-list">
                                <li v-if="!isNotEmpty(scope.row.deptScoreRate) || !isNotEmpty(scope.row.deptDiscountRate)"
                                    @click="showModifyModal(scope.row)">{{$t('setIntegralDiscountRate')}}</li>
                                <li v-else @click="showModifyModal(scope.row)">{{$t('ModifyIntegralDiscountRate')}}</li>
                                <li :class="{disabled : !isNotEmpty(scope.row.deptScoreRate) || !isNotEmpty(scope.row.deptDiscountRate)}"
                                    @click="setProductRate(scope.row)">{{$t('setInteByProduct')}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>
        </div>

        <!--总体积分率折扣率设置modal-->
        <modify-rate-modal
            :date-range="dateRange"
            :integra-data="integraData"
            ref="modifyRate"
            :title="$t('setStoreSetting')"
            :confirm-operate="setStoreDiscount">
        </modify-rate-modal>

    </div>
</template>

<script>

    import modifyRateModal from '../components/modifyRateModal.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData,activityfColumnData } from './setRateConfig';
    import ajax from '@/api/index.js';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            modifyRateModal,
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //跳转信息
                memberInfo : {},
                // 查询数据
                queryParams : {
                    keyword : '',
                },
                // 表格数据
                tableData : [],
                //总条数
                total : 50,
                //会员级别id
                levelDiscountId : '',
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前操作的行数据
                currentData : {},
            };
        },
        methods : {
            /**
             * 显示设置店铺折扣率模态框
             * @param data
             */
            showModifyModal ( data ) {
                this.currentData = data;
                this.$refs.modifyRate.show();
            },

            /**
             * 跳转到按商品进行折扣的页面
             * @param data
             */
            setProductRate ( data ) {
                if (!this.isNotEmpty(data.deptScoreRate) || !this.isNotEmpty(data.deptDiscountRate)) {
                    return;
                }
                this.$router.push({
                    name : this.isActivity ? 'activitySetProductRate' : 'setProductRate',
                    params : {
                        memberInfo : Object.assign({
                            levelId : this.memberInfo.levelId,
                            productName : data.productName
                        },data),
                        levelName : this.memberInfo.levelName
                    }
                });
            },

            /**
             * 查询店铺信息
             */
            queryList () {
                ajax.post('memberDiscountOfStoreList',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    levelDiscountId : this.memberInfo.id,
                    levelId : this.memberInfo.levelId,
                    orgName : this.queryParams.keyword,
                    isActivity : this.isActivity
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params.memberInfo && Object.keys(params.memberInfo).length > 0) {
                    this.levelDiscountId = params.memberInfo.levelId;
                    this.memberInfo = params.memberInfo;
                } else {
                    this.$router.push({
                        name : 'integration'
                    });
                }
            },
            /**
             * 重置查询条件
             */
            reset () {
                this.queryParams.keyword = '';
                this.queryList();
            },
            /**
             * 设置店铺折扣率
             * @param formData 表单数据
             * @param callback 新增完成回调
             */
            setStoreDiscount (formData,callback) {
                ajax.post('setMemberDiscountOfStore',{
                    // levelDiscountId : this.memberInfo.levelId,
                    id : this.currentData.id,
                    deptId : this.currentData.sourceDeptId,
                    levelId : this.memberInfo.levelId,
                    memberDiscountId : this.currentData.memberDiscountId,
                    // orgIds : this.currentData.orgId,
                    deptDiscountRate : formData.discountRate,
                    deptScoreRate : formData.scoreRate,
                    remark : formData.remark,
                    isActivity : this.isActivity,
                    startTime : this.memberInfo['startTime'] ? new Date(this.memberInfo['startTime']).format('yyyy-MM-dd') : '',
                    endTime : this.memberInfo['endTime'] ? new Date(this.memberInfo['endTime']).format('yyyy-MM-dd') : '' ,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('settingSuccess')); // 设置成功
                        if (res.data) {
                            this.memberInfo.id = res.data;
                        }
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('settingFail')); // 设置失败
                    }
                }).finally(() => {
                    callback();
                });
            },
            /**
             * 判断val是否为空
             * @param val
             */
            isNotEmpty (val) {
                return val !== null && val !== '' && val !== undefined;
            },
        },
        computed : {
            //表格是否需要显示
            tableCanMount () {
                return this.memberInfo && !!this.memberInfo.levelId;
            },
            //传递给模态框的积分折扣率信息
            integraData () {
                if (this.currentData && Object.keys(this.currentData).length > 0) {
                    return {
                        discountRate : this.currentData.deptDiscountRate,
                        remark : this.currentData.remark,
                        scoreRate : this.currentData.deptScoreRate,
                        startTime : this.currentData.startTime,
                        endTime : this.currentData.endTime,
                    };
                } else {
                    return {};
                }
            },
            //是否是特殊节日活动页面下的店铺
            isActivity () {
                return this.$route.name === 'activityStore';
            },
            //表头配置
            columnData () {
                if (this.isActivity) {
                    return activityfColumnData;
                } else {
                    return columnData;
                }
            },
            /**
             * 日期设置范围
             */
            dateRange () {
                return {
                    startDate : this.memberInfo['startTime'] ? new Date(this.memberInfo['startTime']) : '',
                    endDate : this.memberInfo['endTime'] ? new Date(this.memberInfo['endTime']) : '',
                };
            },

            //上级路由列表
            beforeRouterList () {
                if (this.$route.name === 'activityStore') {
                    return [
                        {
                            name : 'activityIntegrate',
                            router : {
                                name : 'activityIntegrate'
                            }
                        }
                    ];
                } else {
                    return [
                        {
                            name : 'integration',
                            router : {
                                name : 'integration'
                            }
                        }
                    ];
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .integration-set-rate {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box {
            height: 50px;
            line-height: 50px;
            background: $color_F4F6F8;
        }

        .rate-content{
            @include block_outline($height : unquote('calc(100% - 70px)'));
            padding: 20px 30px 0 30px;

            .title-wrap{
                font-size: $font_size_18px;
                color: $color_333;
                margin-bottom: 15px;
            }

            .filter-wrap{
                margin-bottom: 10px;
            }

            .table-wrap{
                height: calc(100% - 100px);
            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }
        }

        .operate-list{
            @include table_operate();
        }

    }

</style>

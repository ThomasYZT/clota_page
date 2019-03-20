<!--特殊积分折扣率设置-->

<template>
    <div class="special-integral-setting">
        <!--新增区域-->
        <title-wrap @add-rule="addRule">
        </title-wrap>
        <div class="rule-list">
            <div class="btn-group-wrap">
                <ButtonGroup>
                    <Button :type="localRule === item.value ? 'primary' : 'ghost'"
                            v-for="(item,index) in ruleBtnList"
                            :key="index"
                            @click="chooseRule(item)">
                        {{$t(item.name)}}
                    </Button>
                </ButtonGroup>
            </div>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :border="true"
                :show-pagination="true"
                :total-count="totalCount"
                :ofset-height="160"
                :page-no-d.sync="pageNo"
                :page-size-d.sync="pageSize"
                @query-data="queryRules">
                <el-table-column
                    show-overflow-tooltip
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.endDate && scope.row.endDate.substr(0,4) === '9999'">{{$t('forever')}}</template>
                        <template v-else>{{scope.row.endDate}}</template>
                    </template>
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.effDateTxt | contentFilter}}
                    </template>
                </el-table-column>
                <!--只有在全部的筛选条件下才显示-->
                <el-table-column
                    v-if="localRule === ''"
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{ 'active-rule' : true }" v-if="scope.row.ruleStatus === 'valid'">{{$t('effecting')}}</span>
                        <span v-else-if="scope.row.ruleStatus === 'invalid'">{{$t('invalid')}}</span>
                        <span v-else-if="scope.row.ruleStatus === 'overdue'">{{$t('valided')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li @click="setIntegralByMemberCard(scope.row)">{{$t('setDiscountByMemberCard')}}</li>
                            <li @click="pauseRule(scope.row)" v-if="scope.row.ruleStatus === 'valid' && localRule !== 'overdue'">{{$t('pause')}}</li>
                            <li @click="startRule(scope.row)" v-else-if="scope.row.ruleStatus === 'invalid' && localRule !== 'overdue'">{{$t('commissioned')}}</li>
                            <li @click="copyRule(scope.row)">{{$t('copyRule')}}</li>
                            <li class="red-label" @click="deleteRule(scope.row)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--删除规则-->
        <del-rule-modal ref="delRule">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('confirmDeleteRule')}}
            </span>
        </del-rule-modal>
        <!--新建规则模态框-->
        <create-rule v-model="ruleModalShow"
                     :rule-data="currentData"
                     @fresh-data="queryRules">
        </create-rule>
    </div>
</template>

<script>
    import titleWrap from './specialIntegralChild/titleWrap';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import columnData from './specialIntegralSettingConfig';
    import delRuleModal from '@/components/delModal/index.vue';
    import createRule from './specialIntegralChild/createRule';
    import ajax from '@/api/index.js';

    export default {
        components : {
            titleWrap,
            tableCom,
            delRuleModal,
            createRule
        },
        data () {
            return {
                //规则类型列表
                ruleBtnList : [
                    {
                        name : 'all',
                        value : ''
                    },
                    {
                        name : 'effecting',
                        value : 'valid'
                    },
                    {
                        name : 'invalid',
                        value : 'invalid'
                    },
                    {
                        name : 'expired',
                        value : 'overdue'
                    }
                ],
                //规则数据
                tableData : [],
                //全部规则条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前筛选的规则
                localRule : '',
                //当前操作的规则
                currentData : {},
                //新建模态框是否显示
                ruleModalShow : false
            };
        },
        methods : {
            /**
             * 查询特殊积分折扣率数据
             */
            queryRules () {
                ajax.post('listSpecialPointRules',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    ruleStatus : this.localRule
                }).then(res => {
                    if (res.success && res.data) {
                        this.tableData = res.data.data.map(item => {
                            let effDateTxt = '';
                            if (item.effDate) {
                                effDateTxt = item.effDate.split(',').map(day => {
                                    if (day === '0') {
                                        return this.$t('Sunday');
                                    } else if (day === '1') {
                                        return this.$t('Monday');
                                    } else if (day === '2') {
                                        return this.$t('Tuesday');
                                    } else if (day === '3') {
                                        return this.$t('Wednesday');
                                    } else if (day === '4') {
                                        return this.$t('Thursday');
                                    } else if (day === '5') {
                                        return this.$t('Friday');
                                    } else if (day === '6') {
                                        return this.$t('Saturday');
                                    }
                                }).join('、');
                            }
                            return {
                                ...item,
                                effDateTxt
                            };
                        });
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 暂停规则
             * @param{Object} rowData 规则数据
             */
            pauseRule (rowData) {
                ajax.post('updateRulesStatus',{
                    id : rowData.id,
                    ruleStatus : 'invalid'
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('stautsHasStoped',{ name : rowData.ruleName } ));
                        this.queryRules();
                    } else {
                        this.$Message.error(this.$t('statusStopedFailed',{ name : rowData.ruleName }));
                    }
                });
            },
            /**
             * 启用规则
             * @param{Object} rowData 规则数据
             */
            startRule (rowData) {
                ajax.post('updateRulesStatus',{
                    id : rowData.id,
                    ruleStatus : 'valid'
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('statusEnabled',{ name : rowData.ruleName }));
                        this.queryRules();
                    } else {
                        this.$Message.error(this.$t('statusEnabledFailed',{ name : rowData.ruleName }));
                    }
                });
            },
            /**
             * 删除规则
             * @param{Object} rowData 规则信息
             */
            deleteRule (rowData) {
                this.$refs.delRule.show({
                    title : this.$t('notice'),//提示
                    confirmCallback : () => {
                        this.confirmDelRule(rowData);
                    }
                });
            },
            /**
             * 选择规则
             * @param{Object} ruleItem 规则信息
             */
            chooseRule (ruleItem) {
                this.localRule = ruleItem.value;
                this.queryRules();
            },
            /**
             * 确认删除规则信息
             * @param{Object} ruleData 规则信息
             */
            confirmDelRule (ruleData) {
                ajax.post('updateRulesStatus',{
                    id : ruleData.id,
                    isDeleted : true
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('ruleDeleted',{ name : ruleData.ruleName }));
                        this.queryRules();
                    } else {
                        this.$Message.error(this.$t('ruleDeletedFailed',{ name : ruleData.ruleName }));
                    }
                });
            },
            /**
             * 复制规则
             * @param{Object} ruleData 规则信息
             */
            copyRule (rowData) {
                this.currentData = rowData;
                this.ruleModalShow = true;
            },
            /**
             * 新增规则
             */
            addRule () {
                this.currentData = {};
                this.ruleModalShow = true;
            },
            /**
             * 根据会员级别设置积分折扣率
             * @param{Object} ruleData 规则信息
             */
            setIntegralByMemberCard (rowData) {
                this.$router.push({
                    name : 'specialIntegralCardLevelSetting',
                    params : {
                        ruleId : rowData.id
                    }
                });
            },
        },
        computed : {
            //表头数据
            columnData () {
                return columnData;
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .special-integral-setting{
        @include block_outline();

        .rule-list{
            @include block_outline($height : unquote('calc(100% - 50px)'));

            .btn-group-wrap{
                @include block_outline($height : '50px');
                padding: 9px 20px;

                .ivu-btn{
                    padding-left: 30px;
                    padding-right: 30px;
                }
            }
        }

        .active-rule{
            color: #22BB5F;
        }
    }
    .content-text{
        width: auto!important;
        max-width: 300px;
    }
</style>

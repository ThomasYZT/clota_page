<!--特殊积分折扣率设置-->

<template>
    <div class="special-integral-setting">
        <!--新增区域-->
        <title-wrap>
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
                <!--只有在全部的筛选条件下才显示-->
                <el-table-column
                    v-if="localRule === 'all'"
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{ 'active-rule' : true }">{{$t('生效中')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li @click="setIntegral(scope.row)">{{$t('按会员卡级别设置积分、折扣率')}}</li>
                            <li @click="pauseRule(scope.row)">{{$t('暂停')}}</li>
                            <li @click="startRule(scope.row)">{{$t('启用')}}</li>
                            <li class="red-label" @click="deleteRule(scope.row)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--删除规则-->
        <del-rule-modal ref="delRule">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('是否确定删除该规则？')}}
            </span>
        </del-rule-modal>
    </div>
</template>

<script>
    import titleWrap from './specialIntegralChild/titleWrap';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import columnData from './specialIntegralSettingConfig';
    import delRuleModal from '@/components/delModal/index.vue';

    export default {
        components : {
            titleWrap,
            tableCom,
            delRuleModal
        },
        data () {
            return {
                //规则类型列表
                ruleBtnList : [
                    {
                        name : 'all',
                        value : 'all'
                    },
                    {
                        name : '生效中',
                        value : 'valid'
                    },
                    {
                        name : '未生效',
                        value : 'invalid'
                    },
                    {
                        name : '已过期',
                        value : 'overdue'
                    }
                ],
                //规则数据
                tableData : [
                    {}
                ],
                //全部规则条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //当前筛选的规则
                localRule : 'all'
            };
        },
        methods : {
            /**
             * 查询特殊积分折扣率数据
             */
            queryRules () {

            },
            /**
             * 暂停规则
             */
            pauseRule () {

            },
            /**
             * 启用规则
             */
            startRule () {

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
            },
            /**
             * 确认删除规则信息
             * @param{Object} ruleData 规则信息
             */
            confirmDelRule (ruleData) {

            }
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

<!--积分交易抵扣规则设置-->

<template>
    <div >
        <div class="title">
            {{$t('setRulesForMemberPointTransactionDeduction')}}
            <Button type="primary" @click="addRule">{{$t('新增规则')}}</Button>
        </div>
        <div class="main">
            <table-com
                :column-data="ruleColumnData"
                :table-data="ruleData"
                :border="true"
                :table-com-min-height="250"
                :auto-height="true">
                <!--积分兑换比例-->
                <el-table-column
                    slot="column1"
                    show-overflow-tooltip
                    slot-scope="row"
                    :resizable="false"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{$t(`${scoped.row.integrate}积分兑换${scoped.row.money}元`)}}
                    </template>
                </el-table-column>
                <!--是否启用-->
                <el-table-column
                    slot="column5"
                    show-overflow-tooltip
                    slot-scope="row"
                    :resizable="false"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{scoped.row.isSwitch ? $t('yes') : $t('no')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column6"
                    show-overflow-tooltip
                    slot-scope="row"
                    :resizable="false"
                    :label="row.title"
                    fixed="right"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li>{{$t('modify')}}</li>
                            <li class="red-label" @click="delRule(scoped.row.$index)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--新增或编辑模态框-->
        <add-integer-rule-modal v-model="showRuleModal"
                                :valid-rules="ruleData"
                                @add-integer-rule="$emit('add-integer-rule',$event)">
        </add-integer-rule-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { columnData } from './integerRuleSettingConfig.js';
    import addIntegerRuleModal from './addIntegerRuleModal';

	export default {
	    props : {
	        //交易规则数据
	        'rule-data' : {
	            type : Array,
                default : []
            }
        },
		data () {
			return {
                //积分交易抵扣规则设置表头
                ruleColumnData : columnData,
                //是否显示新增模态框
                showRuleModal : false
            };
		},
        components : {
            tableCom,
            addIntegerRuleModal
        },
		methods : {
            /**
             * 新增规则
             */
            addRule () {
                this.showRuleModal = true;
            },
            /**
             * 删除规则
             * @param index 规则序号
             */
            delRule (index) {
                this.$emit('del-rule',index);
            }
        },
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
</style>

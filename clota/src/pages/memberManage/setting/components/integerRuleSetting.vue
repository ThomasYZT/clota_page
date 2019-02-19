<!--积分交易抵扣规则设置-->

<template>
    <div class="integer-rule-set">
        <div class="title">
            {{$t('setRulesForMemberPointTransactionDeduction')}}
            <span class="blue-label" @click="addRule"><Icon type="android-add"></Icon>&nbsp;{{$t('addRule')}}</span>
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
                        {{scoped.row.integrate + $t('scoreToMoney', { money : scoped.row.money })}}
                    </template>
                </el-table-column>
                <!--最多抵扣单笔订单金额-->
                <el-table-column
                    slot="column4"
                    show-overflow-tooltip
                    slot-scope="row"
                    :resizable="false"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        {{scoped.row.highProportion | contentFilter}}%
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
                            <li @click="modifyData(scoped.row,scoped.$index)">{{$t('modify')}}</li>
                            <li class="red-label" @click="delRule(scoped.row,scoped,scoped.$index)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--新增或编辑模态框-->
        <add-integer-rule-modal v-model="showRuleModal"
                                :valid-rules="ruleData"
                                :default-info="currentData"
                                @edit-integer-rule="$emit('edit-integer-rule',$event)"
                                @add-integer-rule="$emit('add-integer-rule',$event)">
        </add-integer-rule-modal>

        <!--删除模态框-->
        <del-modal ref="delModal" class="del-min-width">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('colonSetting',{ key : $t('isDoing') })}}
                <span class="yellow-label">{{currentData ? currentData['data'].ruleName : ''}}</span>
                <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span>
            </span>
        </del-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { columnData } from './integerRuleSettingConfig.js';
    import addIntegerRuleModal from './addIntegerRuleModal';
    import delModal from '@/components/delModal/index.vue';

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
                showRuleModal : false,
                //当前编辑的数据
                currentData : {
                    index : 0,
                    data : {}
                },
            };
		},
        components : {
            tableCom,
            addIntegerRuleModal,
            delModal
        },
		methods : {
            /**
             * 新增规则
             */
            addRule () {
                this.currentData = {
                    index : 0,
                    data : {}
                };
                this.showRuleModal = true;
            },
            /**
             * 删除规则
             * @param rowData
             * @param index 规则序号
             */
            delRule (rowData,index) {
                this.currentData = {
                    data : rowData,
                    index : index
                };
                this.$refs.delModal.show({
                    title : this.$t('deleteMemberScoreRule'),
                    confirmCallback : () => {
                        this.$emit('del-rule',index);
                    }
                });
            },
            /**
             * 编辑规则信息
             * @param rowData
             * @param index
             */
            modifyData (rowData,index) {
                this.currentData = {
                    data : rowData,
                    index : index
                };
                this.showRuleModal = true;
            }
        },
	};
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .integer-rule-set{

        .blue-label{
            color : $color_blue;
            cursor : pointer;
            font-size : $font_size_16px;
            margin-left : 10px;
        }
    }

    .content-text {
        width: 210px;
        position: relative;

        .delete-icon {
            position: absolute;
            left: -20px;
            margin-right: 12px;
            color: $color_red;
        }

        .yellow-label{
            display: inline-block;
            max-width: 100%;
            color: $color_yellow;
            vertical-align: middle;
            @include overflow_tip();
        }
    }
</style>

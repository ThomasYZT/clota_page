<!--
    配额管理模态框
    作者：杨泽涛
-->
<template>
    <div class="quota-manage-modal">
        <Modal  v-model="visible"
                class-name="vertical-center-modal quota-manage"
                :title="$t('配额管理')"
                transfer
                width="740"
                :mask-closable="false"
                @on-cancel="hide">

            <div class="manage-wrapper">
                <div class="filter-head">
                    <div class="label-title">{{$t('销售渠道')}}</div>
                    <Select v-model="chosedChannelId"
                            style="width:240px"
                            @on-change="channelChange">
                        <Option v-for="item in channelList"
                                :value="item.partnerId"
                                :key="item.partnerId">{{ item.channelName }}</Option>
                    </Select>
                </div>
                <div class="table-wrapper">
                    <Form v-if="tableData.length > 0" ref="formDynamic" :model="{ tableData : tableData }">
                        <tableCom :auto-height="true"
                                  :table-com-min-height="250"
                                  :column-data="columnData"
                                  :table-data="tableData"
                                  :border="true">
                            <el-table-column
                                slot="column1"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <span>{{scope.row.quotaType === 'total' ? $t('限制配额总量') : $t('限制每日配额')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column2"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <span>{{Number(scope.row.totalQuota ? scope.row.totalQuota : 0) -
                                            Number(scope.row.sharedQuota ? scope.row.sharedQuota : 0) -
                                            Number(scope.row.marketQuota ? scope.row.marketQuota : 0) -
                                            (Number(scope.row.toTalExclusiveQuota ? scope.row.toTalExclusiveQuota : 0) -
                                            Number(scope.row.vipQuota ? scope.row.vipQuota : 0) +
                                            Number(scope.row.tempVipQuota ? scope.row.tempVipQuota : 0))}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column3"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <template v-if="scope.row.editable">
                                        <FormItem :prop="'tableData.' + scope.$index + '.tempVipQuota'"
                                                  :rules="[ { validator : validateVipQuota, trigger : 'change', quota : scope.row }]">
                                            <Input v-model="scope.row.tempVipQuota"
                                                   size="small"
                                                   :placeholder="$t('请输入')"></Input>
                                        </FormItem>
                                    </template>
                                    <template v-else>
                                        <span>{{scope.row.vipQuota}}</span>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column
                                v-if="type !== 'check'"
                                slot="column4"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <template v-if="scope.row.editable === false">
                                            <li @click="modify(scope)">{{$t('modify')}}</li><!--修改-->
                                        </template>
                                        <template v-else>
                                            <li @click="save(scope)">{{$t('save')}}</li><!--保存-->
                                            <li @click="cancel(scope)">{{$t('cancel')}}</li><!--取消-->
                                        </template>
                                    </ul>
                                </template>
                            </el-table-column>
                        </tableCom>
                    </Form>
                </div>
            </div>

            <div slot="footer">
                <Button class="ivu-btn-90px" type="primary" @click="confirm">{{$t('confirm')}}</Button>
                <Button class="ivu-btn-90px" type="default" @click="hide">{{$t('cancel')}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { quotaManageHead } from '../../quotaAllowance/headConfig';
    import { validateVipQuota } from '../../components/validateMethods';
    export default {
        props : {
            quotaData : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                //模态框类型状态 check-查看 modify-修改 add-新增
                type : '',
                //是否显示模态框
                visible : false,
                //销售渠道组数据
                channelGroupData : {},
                //选择的销售渠道
                chosedChannelId : '',
                //销售渠道列表
                channelList : [],
                //表格数据
                tableData : [],
                //渠道配额管理数据
                quotaChannelData : [],
                //专享配额校验规则
                validateVipQuota : validateVipQuota
            };
        },
        computed : {
            //配额管理表格表头配置
            columnData () {
                if (this.type === 'check') {
                    return quotaManageHead.filter(item => {
                        return item.title !== 'operate';
                    });
                } else {
                    return quotaManageHead;
                }
            }
        },
        methods : {
            /**
             * 显示模态框
             * @param channelGroupData 销售渠道组数据
             * @param quotaChannelData 额管理数据
             */
            show ({channelGroupData, quotaChannelData, type}) {
                //设置模态框类型状态
                this.type = type;
                //获取销售分组下销售渠道列表数据
                this.channelGroupData = channelGroupData;
                this.channelList = channelGroupData.channelModels ? channelGroupData.channelModels : [];
                //获取渠道配额管理数据
                this.quotaChannelData = quotaChannelData;
                //渠道配额表格数据初始化
                this.quotaChannelDataInit();
                this.visible = true;
            },
            /**
             *  渠道配额表格数据初始化
             *  @param chosedChannelId
             */
            quotaChannelDataInit (chosedChannelId) {
                this.chosedChannelId = chosedChannelId ? chosedChannelId : this.channelList[0].partnerId;
                this.tableData = this.quotaData.map(item => {
                    return {
                        ...item,
                        editable : false,
                        vipQuota : String(0),
                        tempVipQuota : String(0),
                    };
                });
                this.tableData.forEach(item => {
                    let findIndex = this.quotaChannelData.findIndex(quotaItem => {
                        return quotaItem.channelId === this.chosedChannelId && quotaItem.productId === item.productId;
                    });
                    if (findIndex > -1) {
                        item.tempVipQuota = item.vipQuota = this.quotaChannelData[findIndex].vipQuota;
                    }
                })
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.channelGroupData = {};
                this.chosedChannelId = '';
                this.channelList = [];
                this.tableData = [];
                this.quotaChannelData = [];
                this.visible = false;
            },
            /**
             * 确认
             */
            confirm () {
                if (this.validateUnSavedData()) {
                    this.$emit('updateQuotaChannelData', this.quotaChannelData);
                    this.hide();
                } else {
                    this.$Message.warning("请保存设置");
                }
            },
            /**
             *  校验是否有为保存的数据
             */
            validateUnSavedData () {
                if (this.tableData.findIndex(item => {
                    return item.editable;
                }) > -1) {
                    return false;
                } else {
                    return true;
                }
            },
            /**
             *  配额变更成可修改状态
             *  @param data
             */
            modify (data) {
                data.row.editable = true;
            },
            /**
             * 保存配额设置
             * @param data
             */
            save (data) {
                this.$refs.formDynamic.validateField('tableData.' + data.$index + '.tempVipQuota', (err) => {
                    if (!err) {
                        //保存配额数据
                        if (data.row.tempVipQuota !== data.row.vipQuota) {
                            let findIndex = this.quotaChannelData.findIndex(item => {
                                //找产品id，和当前选择的销售渠道相同的配额设置数据
                                return item.productId === data.row.productId && item.channelId === this.chosedChannelId;
                            });
                            if ( findIndex > -1) {
                                this.quotaChannelData[findIndex].vipQuota = data.row.tempVipQuota;
                            } else {
                                this.quotaChannelData.push({
                                    productId : data.row.productId,
                                    channelId : this.chosedChannelId,
                                    quotaType : data.row.quotaType,
                                    vipQuota : data.row.tempVipQuota,
                                });
                            }
                        }
                        //更新表格数据
                        data.row.toTalExclusiveQuota = data.row.toTalExclusiveQuota -
                            Number(data.row.vipQuota ? data.row.vipQuota : 0) +
                            Number(data.row.tempVipQuota ? data.row.tempVipQuota : 0);
                        data.row.vipQuota = data.row.tempVipQuota ? data.row.tempVipQuota : String(0);
                        data.row.editable = false;
                    }
                });
            },
            /**
             * 取消配额设置
             * @param data
             */
            cancel (data) {
                data.row.tempVipQuota = data.row.vipQuota;
                data.row.editable = false;
            },
            /**
             * 切换销售渠道
             * @param channelId 渠道id
             */
            channelChange (channelId) {
                this.tableData.forEach(item => {
                    item.editable = false;
                    let findIndex = this.quotaChannelData.findIndex(quotaItem => {
                        return quotaItem.productId === item.productId && channelId === quotaItem.channelId;
                    });
                    if ( findIndex > -1) {
                        item.tempVipQuota = item.vipQuota = this.quotaChannelData[findIndex].vipQuota;
                    } else {
                        item.tempVipQuota = item.vipQuota = String(0);
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    /deep/ .ivu-modal-body {
        min-height: 363px;
    }

    /deep/ .ivu-form-item {
        margin-bottom: 0;
        .ivu-form-item-content {
            line-height: 100%;
            .ivu-form-item-error-tip {
                position: unset;
                top: unset;
                right: unset;

            }
        }

        .el-table {

        }
    }

    .quota-manage {
        .filter-head {
            .label-title {
                margin: 6px 0;
                font-size: 12px;
                color: #585858;
            }
        }

        .table-wrapper {
            margin-top: 20px;
        }
    }
</style>

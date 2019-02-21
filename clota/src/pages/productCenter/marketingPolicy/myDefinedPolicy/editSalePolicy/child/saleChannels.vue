<!--
    销售渠道编辑信息模版元素
    作者：杨泽涛
-->
<template>
    <div class="sale-channels">
        <Form>
            <div class="form-content">
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('saleChannels')"><!--销售渠道-->
                        <table-com
                            ref="channelMultiTablePlug"
                            auto-height
                            :table-com-min-height="260"
                            :column-data="saleChannelColumn"
                            :table-data="saleChannelList"
                            :border="false"
                            :column-check="true"
                            @selection-change="changeSelection">
                            <el-table-column
                                slot="column1"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <span v-for="(item, index) in scope.row.channelModels"
                                              class="channel"
                                              :class="{disable: item.status !== 'valid'}"
                                              :key="index">
                                            {{item.channelName}}
                                            <span class="disable" v-if="item.status !== 'valid'">({{$t('unStarting')}})</span>
                                        </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column2"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <li :class="{ disabled : (selectedRow.findIndex((item) => { return item.id === scope.row.id }) <= -1) ||
                                        !scope.row.channelModels || scope.row.channelModels.length === 0 }"
                                            @click="quotaManage(scope.row)">{{$t('配额管理')}}</li><!--配额管理-->
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>
                    </Form-item>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { selectSaleChannelColumn } from '../editPolicyConfig';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom
        },
        data () {
            return {
                //销售渠道列表及表头
                saleChannelColumn : selectSaleChannelColumn,
                saleChannelList : [],
                selectedRow : [],
                formData : {
                    //销售渠道组ID，多个逗号分隔
                    groupIds : '',
                }
            };
        },
        methods : {
            /**
             * 销售渠道勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection (selection) {
                this.selectedRow = selection;
            },
            /**
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve) => {
                    resolve({
                        saleChannels : this.selectedRow
                    });
                });
            },
            /**
             *  查询销售渠道组列表
             */
            queryOrgGroupVoList () {
                ajax.post('queryOrgGroupVoList',{
                    groupType : 'sale',
                }).then(res => {
                    if (res.success) {
                        this.saleChannelList = res.data || [];
                        setTimeout( () => {
                            if (this.saleChannelList.length > 0) {
                                this.saleChannelList.forEach( (item, index) => {
                                    if (this.formData.groupIds.indexOf(item.id) > -1) {
                                        if (this.$refs.channelMultiTablePlug) {
                                            this.$refs.channelMultiTablePlug.toggleRowSelection(this.saleChannelList[index], true);
                                        }
                                    }
                                });
                            }
                        }, 300);
                    } else {
                        this.saleChannelList = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                Object.assign(this.formData, formData);
                //查询销售渠道组
                this.queryOrgGroupVoList();
            },
            /**
             * 配额管理
             * @param data
             */
            quotaManage (data) {
                if (this.selectedRow.findIndex((item) => {
                    return item.id === data.id
                }) <= -1 || !data.channelModels || data.channelModels.length === 0) return;
                this.$emit("manageQuota", data);
            }
        },
        created () {
            this.queryOrgGroupVoList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .sale-channels {

    }
</style>

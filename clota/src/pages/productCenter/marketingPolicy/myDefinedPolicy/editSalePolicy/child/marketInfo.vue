<!--
    全民营销编辑信息模版元素
    作者：杨泽涛
-->
<template>
    <div class="market-info">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              label-position="top">
            <div class="form-content">
                <!--全民营销-->
                <div class="ivu-form-item-wrap single">
                    <Form-item :label="$t('allPeopleMarket')"
                               prop="marketingData"><!--全民营销-->
                        <span @click="addMarketLevel" class="blue">+ {{$t('addNewMarketingType')}}</span><!--增加营销等级-->
                        <table-com
                            auto-height
                            :table-com-min-height="260"
                            :column-data="marketingColumn"
                            :table-data="formData.marketingData"
                            :border="false">
                            <el-table-column
                                slot="column0"
                                slot-scope="row"
                                show-overflow-tooltip
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    <Select v-if="scope.row.editable"
                                            v-model="scope.row.typeId"
                                            label-in-value
                                            transfer
                                            :placeholder="$t('selectField', {msg: ''})"
                                            @on-change="marketingTypeChange($event, scope.row)">
                                        <Option v-for="(item,index) in marketingTypeList"
                                                :key="index"
                                                :value="item.value">
                                            {{$t(item.label)}}
                                        </Option>
                                    </Select>
                                    <span v-else>{{$t(scope.row.typeName) | contentFilter}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column1"
                                slot-scope="row"
                                show-overflow-tooltip
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    <Select v-if="scope.row.editable"
                                            v-model="scope.row.levelId"
                                            label-in-value
                                            transfer
                                            :placeholder="$t('selectField', {msg: ''})"
                                            @on-change="marketingLevelChange($event, scope.row)">
                                        <Option v-for="(item,index) in marketingLevelList"
                                                :key="index"
                                                :value="item.value">
                                            {{$t(item.label)}}
                                        </Option>
                                    </Select>
                                    <span v-else>{{$t(scope.row.levelName) | contentFilter}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column2"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <template v-if="scope.row.editable">
                                            <li class="normal" @click="saveMarketingData(scope.row)">{{$t('save')}}</li><!--保存-->
                                            <li class="normal" @click="cancelMarketingData(scope.row)">{{$t('cancel')}}</li><!--取消-->
                                        </template>
                                        <template v-else>
                                            <li class="red-label" @click="delMarketingData(scope.row)">{{$t('delete')}}</li><!--删除-->
                                        </template>
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>
                    </Form-item>
                    <span class="marketing-tip">{{$t('productCenter.addPolicyMarketingTip')}}</span>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { marketingColumn } from '../editPolicyConfig';
    import { validateMarketingData } from '../validateMethods';
    import ajax from '@/api/index';

    export default {
        components : {
            tableCom
        },
        data () {
            return {
                formData : {
                    //全民营销表格数据
                    marketingData : [],
                },
                //全民营销列表及表头
                marketingColumn : marketingColumn,
                //全民营销类别列表
                marketingTypeList : [],
                //全名营销级别列表
                marketingLevelList : [],
            };
        },
        computed : {
            ruleValidate () {
                return {
                    marketingData : [
                        {
                            validator : validateMarketingData,
                            params : {
                                marketingData : this.formData.marketingData
                            }
                        }
                    ]
                };
            }
        },
        methods : {
            /**
             * 新增营销等级
             */
            addMarketLevel () {
                //一次只能同时新增一个营销等级
                if (this.formData.marketingData.findIndex((item) => {
                    return item.editable === true;
                }) < 0) {
                    this.formData.marketingData.push({
                        typeName : '',
                        typeId : '',
                        levelName : '',
                        levelId : '',
                        editable : true
                    });
                    ajax.post('marketing-typeList').then(res => {
                        if (res.success) {
                            this.marketingTypeList = res.data ? res.data.map((item) => {
                                return {
                                    value : item.id,
                                    label : item.typeName,
                                };
                            }) : [];
                            this.formData.marketingData[this.formData.marketingData.length - 1].typeName = this.marketingTypeList.length > 0 ? this.marketingTypeList[0].label : '';
                            this.formData.marketingData[this.formData.marketingData.length - 1].typeId = this.marketingTypeList.length > 0 ? this.marketingTypeList[0].value : '';
                            this.listLevel(this.marketingTypeList[0].value);
                        } else {
                            this.marketingTypeList = [];
                        }
                    });
                }
            },
            /**
             *  营销类别变化时触发
             *  @param {string} newType
             *  @param {object} rowData
             */
            marketingTypeChange (newType, rowData) {
                rowData.typeName = newType.label;
                rowData.typeId = newType.value;
                this.listLevel(newType.value);
            },
            /**
             *  营销级别变化时触发
             *  @param {string} newLevel
             *  @param {object} rowData
             */
            marketingLevelChange (newLevel, rowData) {
                rowData.levelName = newLevel ? newLevel.label : '';
                rowData.levelId = newLevel ? newLevel.value : '';
            },
            /**
             *  保存新增营销等级数据
             *  @param {object} data
             */
            saveMarketingData (data) {
                if (!data.typeName) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('marketType') }));
                    return;
                }

                if (!data.levelName) {
                    this.$Message.warning(this.$t('selectField', { msg : this.$t('marketingLevel') }));
                    return;
                }

                data.editable = false;
                this.$refs.formValidate.validateField('marketingData');
            },
            /**
             *  取消新增营销等级数据
             *  @param {object} data
             */
            cancelMarketingData (data) {//todo:查看能否去掉
                this.formData.marketingData.pop();
            },
            /**
             *  删除营销等级数据
             *  @param {object} data
             */
            delMarketingData (data) {
                this.formData.marketingData.splice(this.formData.marketingData.findIndex((item) => {
                    return item.value === data.value;
                }), 1);
            },
            /**
             *  查询等级列表
             *  @param {string} typeId
             */
            listLevel (typeId) {
                ajax.post('marketing-listLevel', {
                    typeId : typeId,
                    pageNo : 1,
                    pageSize : 99
                }).then(res => {
                    if (res.success) {
                        this.marketingLevelList = res.data ? res.data.data.map((item) => {
                            return {
                                label : item.levelName,
                                value : item.id
                            };
                        }) : [];

                        //过滤已增加的营销等级
                        for (let i = 0, len = this.formData.marketingData.length; i < len; i++) {
                            for (let j = 0, jlen = this.marketingLevelList.length; j < jlen; j++) {
                                if (this.formData.marketingData[i].levelId === this.marketingLevelList[j].value) {
                                    this.marketingLevelList.splice(j, 1);
                                    jlen--;
                                    j--;
                                }
                            }
                        }

                        this.formData.marketingData[this.formData.marketingData.length - 1].levelName = this.marketingLevelList.length > 0 ? this.marketingLevelList[0].label : '';
                        this.formData.marketingData[this.formData.marketingData.length - 1].levelId = this.marketingLevelList.length > 0 ? this.marketingLevelList[0].value : '';
                    } else {
                        this.marketingLevelList = [];
                    }
                });
            },
            /**
             * 校验表单
             * @return {Promise<any>}
             */
            formValidate () {
                return new Promise((resolve, reject) => {
                    this.$refs.formValidate.validate((valid) => {
                        if (valid) {
                            resolve({
                                marketingData : this.formData.marketingData
                            });
                        } else {
                            reject('marketingDataNotSave');
                        }
                    });
                });
            },
            /**
             * 编辑时初始化表单数据
             */
            initData (formData) {
                Object.assign(this.formData, formData);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .market-info {

    }
</style>

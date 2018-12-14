<!--
    营销等级
    作者：杨泽涛
-->
<template>
    <div class="marketing-level">
        <div class="btn-area" v-if="canOperateMarketType">
            <Button type="primary" class="ivu-btn-108px" @click="add">{{$t('add') + $t('level')}}</Button>
            <Button type="default" :class="{disabled : chosedColomn.length === 0}" class="ivu-btn-108px error" :disabled="chosedColomn.length === 0" @click="deleteBatch()">{{$t('deleteBatch')}}</Button>
        </div>

        <tableCom v-if="Object.keys(marketingTypeItem).length > 1"
                  :column-data="columnData"
                  :table-data="tableData"
                  :border="true"
                  :column-check="canOperateMarketType"
                  :total-count="totalCount"
                  :ofset-height="180"
                  :page-no-d.sync="filterData.pageNo"
                  :page-size-d.sync="filterData.pageSize"
                  @selection-change="selectionChange"
                  @query-data="getData">
            <el-table-column
                v-if="canOperateMarketType"
                slot="column5"
                slot-scope="row"
                show-overflow-tooltip
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="modify(scope.row)" >{{$t('modify')}}</li>
                        <li class="red-label" @click="deleteBatch(scope.row.id)">{{$t('del')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </tableCom>

        <addMarketingLevelModal ref="addMarketingLevelModal"
                                @do-success="updateSuccess"></addMarketingLevelModal>

        <delModal ref="delModal">
            <div class="del-modal">
                <i class="iconfont icon-help"></i>
                <span class="result">{{$t('sureToDelMarketingLevel')}}</span>
                <span class="warn-tip">{{$t('operationIrrevocable')}}{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '../../../../../components/tableCom/tableCom';
    import { marketingLevelHead } from '../../tableHeadConfig';
    import addMarketingLevelModal from '../components/addMarketingLevelModal';
    import delModal from '@/components/delModal/index';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            levelLength : {
                type : Number,
                defaut : 0,
            },
            marketingTypeItem : {
                type : Object,
                defaut () {
                    return {};
                }
            }
        },
        components : {
            tableCom,
            addMarketingLevelModal,
            delModal
        },
        data () {
            return {
                columnData : marketingLevelHead,
                tableData : [],
                totalCount : 0,
                filterData : {
                    pageNo : 1,
                    pageSize : 99
                },
                chosedColomn : [],
            };
        },
        methods : {
            /**
             * 获取表格数据
             */
            getData () {
                ajax.post('marketing-listLevel', {
                    typeId : this.marketingTypeItem.id,
                    ...this.filterData
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                    this.$emit('update:levelLength', this.tableData.length);
                });
            },
            /**
             * 新增
             */
            add () {
                this.$refs.addMarketingLevelModal.toggle({
                    type : 'add',
                    addParams : {
                        haslevelList : this.tableData,
                        typeId : this.marketingTypeItem.id,
                    }
                });
            },
            /**
             * 修改
             * @param {object} data
             */
            modify (data) {
                this.$refs.addMarketingLevelModal.toggle({
                    type : 'edit',
                    editParams : {
                        id : data.id,
                        levelAmount : data.levelAmount,
                        level : data.level,
                        levelName : data.levelName,
                        typeId : data.typeId,
                        haslevelList : this.tableData,
                    }
                });
            },
            /**
             * 批量删除
             * @param {string} id
             */
            deleteBatch (id) {
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        let levelIds;
                        if (id) {
                            levelIds = id;
                        } else {
                            levelIds = this.chosedColomn.map((item) => {
                                return item.id;
                            }).join(',');
                        }
                        ajax.post('marketing-deleteLevel',{
                            levelIds : levelIds
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                                this.getData();
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                            }
                        });
                    }
                });
            },
            /**
             * 表格栏被check时
             * @param {array} list
             */
            selectionChange (list) {
                this.chosedColomn = list;
            },
            /**
             * 新增等级成功回调
             */
            updateSuccess () {
                this.getData();
            }
        },
        watch : {
            marketingTypeItem : {
                handler (newVal) {
                    if (Object.keys(newVal).length > 1 && newVal.type === 'change') {
                        this.getData();
                    }
                },
                immediate : true,
                deep : true
            }
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
            ]),
            //是否可以编辑营销类别
            canOperateMarketType () {
                return this.permissionInfo && 'operateMarketType' in this.permissionInfo;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-level {
        .btn-area {
            padding: 14px 30px;

            /deep/ .error {
                background-color: #EB6751;
                border-color: #EB6751;
                color: #fff;
            }

            .ivu-btn-108px {
                margin-right: 10px;
            }

            .disabled {
                background-color: $color_gray;
                border-color: $color_gray;
            }
        }
    }

    .del-modal {
        width: 80%;
        .icon-help {
            color: #EB6751;
        }

        .type-name {
            color: $color_yellow;
        }

        .result {
            color: $color_red;
        }
    }
</style>

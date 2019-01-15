<!--
    营销地理位置设置
    作者：杨泽涛
-->
<template>
    <div class="marketing-position-setting">
        <div class="btn-area">
            <template v-if="canEditPosition">
                <Button type="primary" class="ivu-btn-108px" @click="add">{{$t('add')}}</Button>
                <Button type="error" class="ivu-btn-108px" :disabled="chosedColomn.length === 0" @click="deleteBatch()">{{$t('deleteBatch')}}</Button>
            </template>

            <Input class="input-field"
                   v-model.trim="filterData.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputField', {field: $t('positionName')})"
                   @on-enter="getData"
                   @on-click="getData" />
        </div>

        <h4 v-if="tableData.length > 0" class="tip">{{$t('marketingPositionTip')}}</h4>
        <tableCom :column-data="columnData"
                  :table-data="tableData"
                  :border="true"
                  :column-check="canEditPosition"
                  :show-pagination="true"
                  :total-count="totalCount"
                  :ofset-height="120"
                  :page-no-d.sync="filterData.pageNo"
                  :page-size-d.sync="filterData.pageSize"
                  @selection-change="selectionChange"
                  @query-data="getData">
            <el-table-column
                slot="column1"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{manageOrgs.orgName | contentFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column
                v-if="canEditPosition"
                slot="column6"
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

        <addLngLatModal ref="addLngLatModal" @addSuccess="getData"></addLngLatModal>

        <delModal ref="delModal">
            <div class="del-modal">
                <i class="iconfont icon-help"></i>
                <span class="result">{{$t('sureToDelmarketingPosition')}}</span>
                <span class="warn-tip">{{$t('operationIrrevocable')}}{{$t('sureToDel')}}</span>
            </div>
        </delModal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    import tableCom from '../../../../components/tableCom/tableCom';
    import { marketingPositionHead } from '../tableHeadConfig';
    import addLngLatModal from './components/addLngLatModal';
    import delModal from '../../../../components/delModal/index';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            tableCom,
            addLngLatModal,
            delModal
        },
        data () {
            return {
                columnData : marketingPositionHead,
                tableData : [],
                totalCount : 0,
                filterData : {
                    pageNo : 1,
                    pageSize : 10,
                    keyword : '',
                },
                chosedColomn : [],
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //是否可以编辑地理位置信息
            canEditPosition () {
                return this.permissionInfo && 'operateMarketPosition' in this.permissionInfo;
            }
        },
        methods : {
            /**
             * 获取表格数据
             */
            getData () {
                ajax.post('marketing-queryForbiddenList', this.filterData).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data ? res.data.totalRow : 0;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                });
            },
            /**
             * 新增
             */
            add () {
                this.$refs.addLngLatModal.toggle({
                    type : 'show'
                });
            },
            /**
             * 批量删除
             * @param {string} id
             */
            deleteBatch (id) {
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        let ids;
                        if (id) {
                            ids = id;
                        } else {
                            ids = this.chosedColomn.map((item) => {
                                return item.id;
                            }).join(',');
                        }
                        ajax.post('marketing-deleteForbidden',{
                            ids : ids
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
             * 修改
             * @param {object} data
             */
            modify (data) {
                this.$refs.addLngLatModal.toggle({
                    type : 'show',
                    param : data
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .marketing-position-setting {
        .tip {
            margin-bottom: 10px;
            margin-left: 30px;
            color: $color_yellow;
        }
        .btn-area {
            padding: 14px 30px;
            overflow: auto;

            /deep/ .error {
                background-color: #EB6751;
                border-color: #EB6751;
                color: #fff;
            }

            .ivu-btn-108px {
                margin-right: 10px;
            }
        }

        .input-field {
            width: 350px;
            float: right;
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

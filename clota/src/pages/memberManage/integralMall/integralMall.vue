<!--
    会员管理--基础设置--积分商城
    作者：杨泽涛
-->
<template>
    <div class="container">
        <i-row>
            <i-col span="8">
                <!-- 搜索框 -->
                <Input class="input-field"
                       v-model.trim="queryParams.keyword"
                       icon="ios-search"
                       :placeholder="$t('inputSpecificForSearch', { field : $t('goodsName') })"
                       @on-click="getListData"
                       @on-enter="getListData"/>
            </i-col>
        </i-row>
        <!-- 工具栏 -->
        <tool-box :toolNum="2">
            <div slot="tool0" class="button-tool">
                <!-- 上架 -->
                <!--<Button class="ivu-btn-90px tool-btn" type="primary" :disabled="goodsStatus !== 'down'" @click="up()">{{$t('up')}}</Button>-->
                <!-- 下架 -->
                <!--<Button class="ivu-btn-90px tool-btn" type="primary" :disabled="goodsStatus !== 'up'" @click="down()">{{$t('down')}}</Button>-->
                <!-- 领取商品 -->
                <Button v-if="canOperateProduct"
                        class="ivu-btn-90px tool-btn"
                        type="primary"
                        @click="getGoods()">{{$t('GetTheGoods')}}</Button>
            </div>
            <div slot="tool1">
                <div class="placeholder"></div>
            </div>
        </tool-box>

        <!-- 表格 -->
        <div class="table-wrapper">
            <tableCom :column-data="tableColumn"
                      :table-data="tableData"
                      :border="true"
                      :ofsetHeight="170"
                      :show-pagination="true"
                      :column-check="true"
                      :total-count="totalCount"
                      :page-no-d.sync="queryParams.pageNo"
                      :page-size-d.sync="queryParams.pageSize"
                      @selection-change="colomnSelect"
                      @query-data="getListData">
                <!-- 剩余可上架数量 -->
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span>{{scope.row.stockNum - scope.row.upNum}}</span>
                    </template>
                </el-table-column>
                <!-- 商品状态 -->
                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span class="status normal" v-if="scope.row.goodsStatus === 'up'">{{$t('up')}}</span>
                        <span class="status sleep" v-else>{{$t('down')}}</span>
                    </template>
                </el-table-column>
                <!-- 兑换时所需积分 -->
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span :class="{ 'inline-btn' : canOperateProduct }"
                              @click="adjustCredits(scope.row)">{{scope.row.requiredCredits | contentFilter}}</span>
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column
                    v-if="canOperateProduct"
                    slot="column7"
                    slot-scope="row"
                    fixed="right"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <!--<li class="blue-label" @click="stockDetail(scope.row)">{{$t('details')}}</li>-->
                            <li class="blue-label" @click="putOnGoods(scope.row)">{{$t('up')}}</li>
                            <li :class="{ disabled : scope.row.goodsStatus === 'down' }" class="blue-label" @click="down(scope.row)">{{$t('down')}}</li>
                        </ul>
                    </template>
                </el-table-column>

            </tableCom>
        </div>

        <!--下架商品模态框-->
        <del-modal ref="delModal">
            <div class="content-text"><i class="iconfont icon-warn"></i>
                <span v-if="delModalType === 'down'">{{$t('isSureDownGoods')}}？</span><span v-else>{{$t('isSureUpGoods')}}</span>
                <span class="warn">{{$t('operationIrrevocable')}}</span><span>{{$t('WhetherToContinue')}}</span>
            </div>
        </del-modal>

        <!--领取商品模态框-->
        <get-good-modal ref="getGoodModal"></get-good-modal>

        <!--商品详情模态框-->
        <good-detail-modal ref="goodDetailModal" @updateSuccess="getListData"></good-detail-modal>

        <!-- 调整兑换时所需积分 -->
        <adjustCreditsModal ref="adjustCreditsModal" @updateSuccess="getListData"></adjustCreditsModal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import toolBox from '../inventoryManage/components/toolBox';
    import { integralHead } from './tableHeadConfigs';
    import ajax from '@/api/index';
    import delModal from '@/components/delModal/index';
    import getGoodModal from './components/getGoodModal';
    import goodDetailModal from './components/goodDetailModal';
    import forEach from 'lodash/forEach';
    import adjustCreditsModal from './components/adjustCreditsModal';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            toolBox,
            tableCom,
            delModal,
            getGoodModal,
            goodDetailModal,
            adjustCreditsModal
        },
        data () {
            return {
                //过滤信息
                queryParams : {
                    pageNo : 1,
                    pageSize : 10,
                    keyword : ''
                },
                //表头配置
                tableColumn : integralHead,
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //删除模态框类型
                delModalType : 'down',
                //上下架按钮是否可用
                goodsStatus : '',
                //表格已选行数据
                chosedData : []
            };
        },
        methods : {
            /**
             * 获取表格数据
             */
            getListData () {
                ajax.post('queryPagedGoods', this.queryParams).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.$Message.error(this.$t('dataGetError'));
                    }
                });
            },
            /**
             * 前往库存详情页面
             * @param {object} data
             */
            stockDetail (data) {
                this.$refs.goodDetailModal.toggle(data);
            },
            /**
             * 兑换奖品
             */
            getGoods () {
                if (!this.canOperateProduct) return;
                this.$refs.getGoodModal.toggle();
            },
            /**
             *  上架商品
             */
            up () {
                this.delModalType = 'up';
                this.$refs.delModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.batchPutOnGoods();
                    }
                });
            },
            /**
             *  下架商品模态框控制
             *  @param {object} rowData
             */
            down (rowData) {
                if (rowData.goodsStatus === 'down') {
                    return;
                }
                this.delModalType = 'down';
                this.$refs.delModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.pullOffGoods(rowData);
                    }
                });
            },
            /**
             * 批量下架商品
             */
            batchPullOffGoods () {
                let data = this.chosedData.map((item) => {
                    return item.id;
                });

                ajax.post('batchPullOffGoods', data,
                    {
                        headers : { "Content-Type" : "application/json;charset-UTF-8" }
                    }
                ).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('down') }));
                        this.getListData();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('down') }));
                    }
                });
            },
            /**
             * 批量上架商品
             */
            batchPutOnGoods () {
                let canUp = true;
                forEach(this.chosedData, (item) => {
                    if (!item.requiredCredits) {
                        this.$Message.error(this.$t('pleaseSetRequiredCredits'));
                        canUp = false;
                        return false;
                    }
                });
                if (canUp) {
                    let data = this.chosedData.map((item) => {
                        return item.id;
                    });

                    ajax.post('batchPutOnGoods', data,
                        {
                            headers : { "Content-Type" : "application/json;charset-UTF-8" }
                        }
                    ).then(res => {
                        if (res.success) {
                            this.$Message.success(this.$t('successTip', { tip : this.$t('up') }));
                            this.getListData();
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('up') }));
                        }
                    });
                }
            },
            /**
             * 表格选择框选中事件处理
             * @param {object} data
             */
            colomnSelect (data) {
                this.chosedData = data;
                if (data.length !== 0) {
                    let goodsStatus = data[0].goodsStatus;
                    let status = false;
                    for (let i = 1,len = data.length; i < len; i++) {
                        if (goodsStatus !== data[i].goodsStatus) {
                            status = true;
                            break;
                        }
                    }

                    if (status) {
                        this.goodsStatus = '';
                    } else {
                        this.goodsStatus = goodsStatus;
                    }
                } else {
                    this.goodsStatus = '';
                }
            },
            /**
             *  调整兑换时所需积分
             *  @param {object} rowData
             */
            adjustCredits (rowData) {
                if (!this.canOperateProduct) return;
                this.$refs.adjustCreditsModal.toggle(rowData);
            },
            /**
             *  下架商品
             *  @param {object} rowData
             */
            pullOffGoods (rowData) {
                ajax.post('updateGoodsInfo', {
                    id : rowData.id,
                    goodsStatus : 'down',
                    requiredCredits : rowData.requiredCredits,
                    upNum : 0,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('down') }));
                        this.getListData();
                    } else {
                        this.$Message.success(this.$t('failureTip', { tip : this.$t('down') }));
                    }
                });
            },
            /**
             * 上架商品
             *  @param {object} rowData
             */
            putOnGoods (rowData) {
                this.$refs.goodDetailModal.toggle(rowData);
            },
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以进行操作
            canOperateProduct () {
                return this.permissionInfo && this.permissionInfo['operateIntegralProduct'] === 'allow';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .container{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        /deep/ .input-field {
            width: 350px;
            padding-left: 30px;
            margin-top: 9px;
        }

        .button-tool {
            text-align: left;
            .tool-btn {
                margin: 0 10px 0 0;
            }
        }

        .table-wrapper {
            margin-top: 20px;

            .status {
                position: relative;
                padding-left: 14px;
                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 6px;
                    height: 6px;
                    border-radius: 50px;
                }
            }
            .normal:after {
                background: $color_green;
            }
            .sleep:after {
                background: $color_gray;
            }

            .inline-btn {
                color: $color_blue;
                cursor: pointer;
            }
        }

        .placeholder {
            width: 10px;
            height: 10px;
        }
    }

    /deep/ .content-text {
        width: 240px;
        margin: auto 15px;

        i {
            color: #F3AD4C;
        }
    }

    /deep/ .ivu-modal-body {
        .warn {
            color: $color_red;
        }
    }

    /deep/ .ivu-modal-footer {
        .ivu-btn-error {
            background-color: $color_blue;
            border-color: $color_blue;
        }
    }

    .disabled {
        color: $color_gray;
        cursor: not-allowed
    }
</style>

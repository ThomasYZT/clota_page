<!--
    会员管理--基础设置--积分商城
    作者：杨泽涛
-->
<template>
    <div class="container">
        <!-- 工具栏 -->
        <tool-box :toolNum="3">
            <div slot="tool0" class="button-tool">
                <!-- 上架 -->
                <Button class="ivu-btn-90px" type="primary" :disabled="goodsStatus !== 'down'" @click="up()">{{$t('up')}}</Button>
                <!-- 下架 -->
                <Button class="ivu-btn-90px" type="primary" :disabled="goodsStatus !== 'up'" @click="down()">{{$t('down')}}</Button>
                <!-- 领取商品 -->
                <Button class="ivu-btn-90px" type="primary" @click="getGoods()">{{$t('GetTheGoods')}}</Button>
            </div>
            <div slot="tool1">
                <div class="placeholder"></div>
            </div>

            <div slot="tool2" class="button-tool">
                <!-- 搜索框 -->
                <Input class="input-field"
                       search
                       enter-button
                       v-model.trim="queryParams.keyword"
                       icon="ios-search"
                       :placeholder="$t('inputSpecificForSearch', { field : $t('goodsName') })"
                       @on-search="getListData"
                       @on-enter="getListData"/>
            </div>
        </tool-box>

        <!-- 表格 -->
        <div class="table-wrapper">
            <tableCom :column-data="tableColumn"
                      :table-data="tableData"
                      :border="true"
                      :show-pagination="true"
                      :column-check="true"
                      :total-count="totalCount"
                      :page-no-d.sync="queryParams.pageNo"
                      :page-size-d.sync="queryParams.pageSize"
                      @selection-change="colomnSelect"
                      @query-data="getListData">
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
                <!-- 操作 -->
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    fixed="right"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li class="blue-label" @click="stockDetail(scope.row)">{{$t('details')}}</li>
                        </ul>
                    </template>
                </el-table-column>

            </tableCom>
        </div>

        <!--下架商品模态框-->
        <del-modal ref="delModal">
            <div class="content-text"><i class="iconfont icon-warn"></i>
                <span v-if="delModalType === 'down'">{{$t('isSureDownGoods')}}？</span><span v-else>{{$t('isSureUpGoods')}}</span>
            </div>
        </del-modal>

        <!--领取商品模态框-->
        <get-good-modal ref="getGoodModal"></get-good-modal>

        <!--商品详情模态框-->
        <good-detail-modal ref="goodDetailModal" @updateSuccess="getListData"></good-detail-modal>
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
    export default {
        components : {
            toolBox,
            tableCom,
            delModal,
            getGoodModal,
            goodDetailModal,
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
             */
            down () {
                this.delModalType = 'down';
                this.$refs.delModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.batchPullOffGoods();
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
            }
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

        .button-tool {
            text-align: left;
            .tool-btn {
                margin: 0 20px;
            }

            /deep/ .input-field {
                width: 350px;
                float: right;
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
        }

        .placeholder {
            width: 10px;
            height: 10px;
        }


        /deep/ .content-text {
            margin: 0 15px;

            i {
                color: $color_red !important;
            }
        }
    }
</style>

<!--
    进销存管理--商品管理--库存详情
    作者：杨泽涛
-->
<template>
    <div class="stock-info">
        <breadCrumbHead  :before-router-list="beforeRouterList"
                         :locale-router="'stockDetail'"><!--商品管理-->>

        </breadCrumbHead>

        <div class="content">
            <div class="title">
                {{$t('goodInfo')}}

                <Button type="primary" class="right-btn" @click="addGood(detail)">{{$t('continueStockIn')}}</Button>
            </div>
            <div class="form-wrapper">
                <Form label-position="left">
                    <i-row>
                        <i-col span="6" class="col-wrapper">
                            <!-- 产品名称 -->
                            <Form-item :label="$t('goodsName')+':'">
                                {{goodInfo.name}}
                            </Form-item>
                        </i-col>
                        <i-col span="6" :offset="2">
                            <!-- 入库数量 -->
                            <Form-item :label="$t('stockNum')+':'">
                                {{goodInfo.stockNum + goodInfo.undrawNum}}
                            </Form-item>
                        </i-col>
                    </i-row>

                    <i-row>
                        <i-col span="6" class="col-wrapper">
                            <!-- 采购价 -->
                            <Form-item :label="$t('purchasePrice')+':'">
                                {{goodInfo.purchasePrice}}
                            </Form-item>
                        </i-col>
                        <i-col span="6" :offset="2">
                            <!-- 市场价 -->
                            <Form-item :label="$t('marketPrice')+':'">
                                {{goodInfo.marketPrice}}
                            </Form-item>
                        </i-col>
                    </i-row>

                    <!--<i-row>-->
                    <!--<i-col span="6" offset="1">-->
                    <!--&lt;!&ndash; 采购人 &ndash;&gt;-->
                    <!--<Form-item :label="$t('purchaser')+':'">-->
                    <!--{{goodInfo.purchaser}}-->
                    <!--</Form-item>-->
                    <!--</i-col>-->
                    <!--<i-col span="6">-->
                    <!--&lt;!&ndash; 采购日期 &ndash;&gt;-->
                    <!--<Form-item :label="$t('purchaseTime')+':'">-->
                    <!--{{goodInfo.purchaseDate}}-->
                    <!--</Form-item>-->
                    <!--</i-col>-->
                    <!--</i-row>-->

                    <i-row>
                        <i-col span="6" class="col-wrapper">
                            <!-- 计量单位 -->
                            <Form-item :label="$t('measurementUnit')+':'">
                                {{goodInfo.unit}}
                            </Form-item>
                        </i-col>
                        <i-col span="6" :offset="2">
                            <Form-item :label="$t('historyInTotal')">
                                {{goodInfo.total}}
                            </Form-item>
                        </i-col>
                    </i-row>

                    <i-row>
                        <i-col span="8" class="col-wrapper">
                            <!-- 商品图片 -->
                            <FormItem :label="$t('goodPic')+':'">
                                <span class="edit-btn"></span>
                                <div class="img-wrapper">
                                    <img-uploader @upload-success="uploadSuc"
                                                  :defaultList="defaultImgList"
                                                  :quantity-limit="1"></img-uploader>
                                </div>
                            </FormItem>
                        </i-col>
                        <i-col span="6" >
                            <!-- 异常管理 -->
                            <FormItem :label="$t('abnormalManagement')+':'">
                                <span class="edit-btn" @click="abnormalEdit">{{$t('edit')}}</span>
                            </FormItem>
                        </i-col>
                    </i-row>

                    <i-row>
                        <i-col span="16" class="col-wrapper">
                            <!-- 备注 -->
                            <Form-item :label="$t('remark')+':'">
                                {{goodInfo.remark}}
                            </Form-item>
                        </i-col>
                    </i-row>

                    <i-row>
                        <i-col span="16" class="col-wrapper">
                            <!-- 商品描述 -->
                            <Form-item :label="$t('goodsDesc')+':'">
                                {{goodInfo.goodsDesc}}
                            </Form-item>
                        </i-col>
                    </i-row>
                </Form>
            </div>

            <!-- 库存变动记录 -->
            <div class="title">{{$t('goodInfo')}}</div>
            <i-row>
                <i-col span="23" class="col-wrapper">
                    <Tabs value="in" @on-click="tabChange" :animated="false">
                        <!-- 商品入库记录 -->
                        <TabPane :label="$t('CommodityInRecord')" name="in">
                            <div class="table-wrapper">
                                <tableCom :column-data="inBoundHead"
                                          :auto-height="true"
                                          :table-com-min-height="200"
                                          :table-data="tableData"
                                          :border="true"
                                          :show-pagination="true"
                                          :total-count="totalCount"
                                          :page-no-d.sync="queryParams.pageNo"
                                          :page-size-d.sync="queryParams.pageSize"></tableCom>
                            </div>
                        </TabPane>
                        <!-- 商品出库记录 -->
                        <TabPane :label="$t('CommodityOutRecord')" name="out">
                            <div class="table-wrapper">
                                <tableCom :column-data="outBoundHead"
                                          :auto-height="true"
                                          :table-com-min-height="200"
                                          :table-data="tableData"
                                          :border="true"
                                          :show-pagination="true"
                                          :total-count="totalCount"
                                          :page-no-d.sync="queryParams.pageNo"
                                          :page-size-d.sync="queryParams.pageSize">
                                    <!-- 领取状态 -->
                                    <el-table-column
                                        slot="column6"
                                        slot-scope="row"
                                        :label="row.title"
                                        :width="row.width"
                                        :min-width="row.minWidth">
                                        <template slot-scope="scope">
                                            {{ scope.row.drawStatus === 'true' ? $t('alreadyReceived') : $t('unconverted')}}
                                        </template>
                                    </el-table-column>
                                </tableCom>
                            </div>
                        </TabPane>
                        <!-- 商品异常管理 -->
                        <TabPane :label="$t('CommodityAbnormalManagement')" name="abnormal">
                            <div class="table-wrapper">
                                <tableCom :column-data="abnormalHead"
                                          :auto-height="true"
                                          :table-com-min-height="200"
                                          :table-data="tableData"
                                          :border="true"
                                          :show-pagination="true"
                                          :total-count="totalCount"
                                          :page-no-d.sync="queryParams.pageNo"
                                          :page-size-d.sync="queryParams.pageSize"></tableCom>
                            </div>
                        </TabPane>
                    </Tabs>
                </i-col>
            </i-row>
        </div>

        <abnormalManageModal ref="abnormalManageModal" @editSuccess="queryGoodsInfo"></abnormalManageModal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import lifeCycleMixins from '../../../../mixins/lifeCycleMixins';
    import ajax from '../../../../api/index';
    import { inBoundHead, outBoundHead, abnormalHead } from './tableConfig';
    import abnormalManageModal from '../components/abnormalManageModal';
    import breadCrumbHead from '../../../../components/breadCrumbHead/index';
    import ImgUploader from '../../../register/components/ImgUploader';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            tableCom,
            abnormalManageModal,
            breadCrumbHead,
            ImgUploader
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'goodsManage', //商品管理
                        router : {
                            name : 'goodsManage'
                        }
                    }
                ],
                //路由数据信息
                detail : {},
                //商品信息
                goodInfo : {},
                //表头配置
                tableColumn : [],
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //入库表格表头配置
                inBoundHead : inBoundHead,
                //出库表格表头配置
                outBoundHead : outBoundHead,
                //库存异常表格表头配置
                abnormalHead : abnormalHead,
                //列表查询参数
                queryParams : {
                    pageNo : 1,
                    pageSize : 10
                },
                //图片上传组件默认显示列表
                defaultImgList : [],

            };
        },
        methods : {
            /**
             * 路由获取参数处理
             * @param {object} params
             */
            getParams (params) {
                if (params && params.listItem) {
                    this.detail = params.listItem;
                    this.queryGoodsInfo();
                    //进入详情页默认显示入库记录
                    this.queryPagedStockChangeRecord({ type : 'in' });
                } else {
                    this.$router.push({
                        name : 'goodsManage'
                    });
                }
            },
            /**
             * 查询商品详情信息
             */
            queryGoodsInfo () {
                ajax.post('queryGoodsInfo', {
                    goodsId : this.detail.id
                }).then(res => {
                    if (res.success) {
                        this.goodInfo = res.data ? res.data : {};
                        this.defaultImgList = [
                            {
                                name : 0,
                                url : this.goodInfo.pics
                            }
                        ]
                    } else {
                        this.$Message.error(this.$t('dataGetError'));
                    }
                });
            },
            /**
             * 查询库存变动记录
             * @param {string} type
             */
            queryPagedStockChangeRecord ({ type }) {
                this.tableData = [];
                ajax.post('queryPagedStockChangeRecord', {
                    changeType : type,
                    goodsId : this.detail.id,
                    ...this.queryParams
                }).then(res => {
                    if (res.success) {
                       this.tableData = res.data ? res.data.data : [];
                       this.totalCount = res.data.totalRow;
                    } else {
                        this.$Message.error(this.$t('dataGetError'));
                    }
                });
            },
            /**
             * tab切换时，查询表格数据
             * @param {object} data
             */
            tabChange (data) {
                this.queryPagedStockChangeRecord({ type : data });
            },
            /**
             *  异常管理
             */
            abnormalEdit () {
                this.$refs.abnormalManageModal.toggle(this.detail);
            },
            /**
             * 前往继续入库界面
             * @param {object} data
             */
            addGood (data) {
                this.$router.push({
                    name : 'editGoodsWarehousing',
                    params : {
                        type : 'edit',
                        listItem : data
                    }
                });
            },
            /**
             * @param {array} data
             * 上传图片成功
             */
            uploadSuc (data) {
                this.defaultImgList = data.map((url, index) => {
                    return {
                        name : index,
                        url : url
                    };
                });
                this.editGoodPic(data);
            },
            /**
             * 接口修改图片信息
             * @param {array} pics
             */
            editGoodPic (pics) {
                ajax.post('addGoods', {
                    id : this.detail.id,
                    pics : pics.join(','),
                    stockNum : '0',
                    purchasePrice : this.detail.purchasePrice,
                    marketPrice : this.detail.marketPrice,
                    purchaser : this.detail.purchaser,
                    purchaseDate : this.detail.purchaseDate ? this.detail.purchaseDate.split(' ')[0] : '',
                    goodsDesc : this.detail.goodsDesc,
                    remark : this.detail.remark,
                    unit : this.detail.unit,
                }).then( res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('edit') + this.$t('picture') }));
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('edit') + this.$t('picture') }));
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .stock-info {
        .content {
            padding: 30px 52px;
        }

        .form-wrapper {
            margin-top: 10px;

            .img-wrapper {
                width: 100%;
                img {
                    height: 200px;
                }
            }

            /deep/ .el-upload {
                width: 100px;
                height: 100px;
                line-height: 100px;
            }

            /deep/ .el-upload-list__item {
                width: 100px;
                height: 100px;
                img {
                    width: 100px;
                    height: 100px;
                }
            }
        }

        .title{
            position: relative;
            padding: 11px 0 0 0;
            @include block_outline($height : 41px);
            font-size: $font_size_16px;
            font-weight: bold;
            color: $color_333;

            .right-btn {
                position: absolute;
                top: 15px;
                right: 20px;
            }
        }

        /deep/ .ivu-tabs-ink-bar.ivu-tabs-ink-bar-animated {
            color: #2F70DF;
        }

        /deep/ .ivu-tabs-tabpane {
            padding: 20px 0;
            min-height: 300px;
        }

        .col-wrapper {
            .table-wrapper {
                min-height: 200px;
                margin-bottom: 30px;
            }
        }

        /deep/ .ivu-form-item-label {
            padding-left: 0;
        }

        .edit-btn {
            color: #2F70DF;
            cursor: pointer;
        }

    }


</style>

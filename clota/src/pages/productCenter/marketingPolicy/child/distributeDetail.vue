<!--
    分销详情页面
    作者：杨泽涛
-->
<template>
    <div class="distribute-detail">
        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="$t('distributeDetail')">
        </bread-crumb-head>

        <div class="content">

            <!--标题-->
            <div class="title-wrap">
                <h3>{{$t('distributePolicy')}}</h3>

                <span class="sub-operator"
                      @click="viewDetail(listItem)">{{$t('viewDetail')}}</span>
            </div>

            <!--列表信息-->
            <Form ref="infoForm"
                  :model="listItem">
                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('salePolicyName')+'：'"><!--销售政策名称-->
                                <div v-w-title="listItem.name">{{listItem.name | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('desc')+'：'"><!--描述-->
                                <div v-w-title="listItem.policyDesc">{{listItem.policyDesc | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <div class="form-content">
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('scenePlace')+'：'"><!--所属景区-->
                                <div v-w-title="listItem.scenicName">{{listItem.scenicName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('superiorDistribution')+'：'"><!--上级分销商-->
                                <div v-w-title="listItem.parentDistributor">{{listItem.parentDistributor | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>
            </Form>

            <!-- 分割线标题 -->
            <div class="divider-title">
                <span>{{$t('parentDistributePrice')}}</span>
            </div>

            <!-- 上级分销单价表格信息 -->
            <div class="table-wrapper">
                <tableCom :column-data="parentDistributePriceConfig"
                          :table-com-min-height="260"
                          :table-data="parentDistributeData"
                          :border="false">
                    <el-table-column
                        slot="column3"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{$t(scope.row.stockType)+scope.row.stockNum | contentFilter}}
                        </template>
                    </el-table-column>
                </tableCom>
            </div>

            <!-- 分割线标题 -->
            <div class="divider-title">
                <span>{{$t('myDistribute')}}</span>
            </div>

            <div class="button-wrapper">
                <span @click="distribute" class="btn">+ {{ $t('add') + $t('distribution')}}</span>
            </div>

            <!-- 我的分销表格信息 -->
            <div class="table-wrapper2">
                <tableCom v-if="myAllocationLists.length !== 0"
                          :column-data="myDistributeConfig"
                          :table-com-min-height="260"
                          :table-data="myAllocationLists"
                          :border="false"
                          :header-clickable="true"
                          @headerClick="headerClick(arguments)">
                </tableCom>
                <div class="no-data" v-else>
                    <img src="../../../../assets/images/icon-no-data.png" alt="">
                </div>
            </div>
        </div>

        <policy-detail ref="detailView">
        </policy-detail>

        <editDistributeModal ref="editModal"
                             @refresh="refresh()">

        </editDistributeModal>

        <!-- 分销 -->
        <distribution-modal @complete="refresh()"
                            ref="distributionModal"f></distribution-modal>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import policyDetail from '../components/policyDetailModal.vue';
    import distributionModal from '../components/distributionModal'
    import {detailParentDistributePriceConfig, myDistributeConfig} from './detailConfig'
    import ajax from '@/api/index';
    import editDistributeModal from '../components/editDistributionModal'

    export default {
        mixins : [lifeCycleMixins],
        components: {
            breadCrumbHead,
            tableCom,
            policyDetail,
            editDistributeModal,
            distributionModal
        },
        data() {
            return {
                //列表项信息 --路由参数
                listItem: {},
                //面包屑上级路由信息
                beforeRouterList: [
                    {
                        name: 'marketingPolicy',   // 产品列表--票类列表
                        router: {
                            name : 'marketingPolicy'
                        },
                    }
                ],
                //上级分销单价表格数据
                parentDistributeData: [],
                //上级分销单价表头配置
                parentDistributePriceConfig: detailParentDistributePriceConfig,
                //我的分销单价表格数据
                myAllocationLists: [],
                //我的分销表头配置
                myDistributeConfig: Array.from(myDistributeConfig),
            }
        },
        methods: {
            /**
             *  获取页面数据
             */
            getData() {
                //获取分销详情数据接口
                ajax.post('getPolicyAllocationInfo',{
                    allocationId: this.listItem.allocationId
                }).then((res) => {
                    if(res.success) {
                        //初始化我的分销表头配置
                        this.myDistributeConfig = Array.from(myDistributeConfig);
                        //上级分销单价表格数据
                        this.parentDistributeData = res.data ? res.data.parentAllocationProductList : {};

                        if(res.data.myAllocationLists.length !== 0){
                            this.myAllocationLists = Array.from(this.parentDistributeData);

                            //增加尾行数据 -- 销售渠道分组
                            let lastRowData = {
                                productName: '销售渠道组'
                            };
                            //动态增加列数据
                            for(let i = 0,len=this.myAllocationLists.length; i<len; i ++) {
                                for(let j = 0,jlen = res.data.myAllocationLists.length; j<jlen ; j++) {
                                    this.myAllocationLists[i]['allocationName' + j] = res.data.myAllocationLists[j].allocationName;
                                    this.myAllocationLists[i]['allocationId' + j] = res.data.myAllocationLists[j].allocationId;
                                    this.myAllocationLists[i]['price' + j] = res.data.myAllocationLists[j].itemVos[i].settlePrice;
                                    this.myAllocationLists[i]['itemVos' + j] = Array.from(res.data.myAllocationLists[j].itemVos);
                                    if(i === 0) {
                                        //动态增加表格列
                                        let _obj = {
                                            title: this.myAllocationLists[i]['allocationName' + j],      // 分销名称
                                            field: 'price'+ j
                                        };
                                        this.myDistributeConfig.push(_obj)

                                        //组装尾行数据 -- 销售渠道分组
                                        res.data.myAllocationLists[j].policyChannelVos.forEach((item) => {
                                            lastRowData['price' + j] === undefined ? lastRowData['price' + j] = item.groupName + '\n' : lastRowData['price' + j] += item.groupName + '\n';
                                            lastRowData['groupIds' + j] === undefined ? lastRowData['groupIds' + j] = item.groupId : lastRowData['groupIds' + j] += ',' + item.groupId;
                                        })
                                    }

                                }
                            }
                            this.myAllocationLists.push(lastRowData);
                        } else {
                            this.myAllocationLists = [];
                        }
                    }else {
                        this.$Message.error(this.$t(res.code || ''))
                    }
                });
            },
            /**
             * 获取路由信息
             * @param
             */
            getParams(params) {
                if(params && Object.keys(params).length > 0) {
                    if(params.listItem) {
                        this.listItem = params.listItem;
                        //console.log(this.listItem)
                    }
                }
                //获取页面数据
                this.getData();
            },
            /**
             * 查看销售政策详情
             */
            viewDetail(data) {
                //显示弹窗
                this.$refs.detailView.toggle(data);
            },
            /**
             * 表格头点击事件
             * @param data
             */
            headerClick(data) {
                //获取表格选中列的索引
                let coloumnIndex = this.getIndex(data);
                //组装表格选中列的数据
                let columnData = this.getColumnData(coloumnIndex);
                columnData.listItem = this.listItem;
                //禁用首行首列的表头点击事件
                if(data.label !== "产品名称/销售渠道组") {
                    //console.log(columnData);
                    this.$refs.editModal.toggle(columnData);
                }
            },
            /**
             * 获取表格选中列的索引
             */
            getIndex(data) {
                let property = data[0].property;
                let _index = property.charAt(property.length - 1);
                return _index;
            },
            /**
             * 获取表格选中列的数据
             * @param _index
             */
            getColumnData(_index) {
                //组装表格选中列的数据,同一列的数据allocationId、groupNames、allocationName都是相同的，
                //所以默认取第一产品的相关数据即可
                let columnData = {
                    productList: [],
                    name: this.myAllocationLists[0]['allocationName'+_index],
                    allocationId: this.myAllocationLists[0]['allocationId'+_index],
                    groupIds: this.myAllocationLists[this.myAllocationLists.length -1]['groupIds'+_index]
                };
                this.myAllocationLists.forEach((item, index) => {
                    if(index !== this.myAllocationLists.length - 1){
                        columnData.productList = item['itemVos' + _index];
                    }
                });
                return columnData;
            },
            /**
             * 刷新页面数据
             */
            refresh() {
                this.getData();
            },
            /**
             *  分销操作
             */
            distribute() {
                this.$refs.distributionModal.toggle(this.listItem);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .distribute-detail {
        height: 100%;

        .content {
            height: 100%;

            .title-wrap {
                position: relative;
                height: 75px;

                h3 {
                    margin: 25px 34px;
                    font-size: 20px;
                    line-height: 28px;
                    color: #000;
                }

                .sub-operator {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    right: 31px;
                    line-height: 28px;
                    color: #2F70DF;
                    font-size: 14px;
                }
            }

            .form-content {
                margin: 0 auto;
                width: 80%;

                .ivu-form-item{
                    margin: 0 auto;
                    text-align: left;
                    width: 100%;
                    float: left;
                    height: 30px;
                    line-height: 30px;
                    font-size: $font_size_14px;
                    display: flex;
                }

                /deep/ .ivu-form-item-label{
                    padding-left: 0;
                    padding-right: 0;
                    width: 220px;
                }

                /deep/ .ivu-form-item-content{
                    color: $color-666;
                    /*flex: 1;*/
                    display: inline-block;
                    width: calc(100% - 220px);
                    >div{
                        vertical-align: middle;
                        @include overflow_tip();
                    }
                }
            }

            .divider-title {
                width: 100%;
                display: table;
                position: relative;
                text-align: center;
                margin: 25px 0;

                span {
                    display: inline-block;
                    border: 1px solid #E1E1E1;
                    border-radius: 20px;
                    padding: 4px 19px;
                    font-size: 16px;
                    color: #333333;
                    white-space: nowrap;

                }

                &:before {
                    content: '';
                    display: table-cell;
                    position: relative;
                    width: 50%;
                    border-top: 1px solid #E1E1E1;
                    transform: translateY(50%);
                }

                &:after {
                    content: '';
                    display: table-cell;
                    position: relative;
                    width: 50%;
                    border-top: 1px solid #E1E1E1;
                    transform: translateY(50%);
                }
            }
            .table-wrapper {
                width: 80%;
                margin: 0 auto;
            }

            .table-wrapper2 {
                width: 80%;
                margin: 0 auto;
                /deep/ .header-clickable {
                    &:not(:first-child) {
                        .cell {
                            text-decoration: underline;
                            color: #2F70DF;
                            cursor: pointer;
                        }
                    }
                }

                .no-data {
                    width: 100%;
                    text-align: center;
                    img {
                        width: 150px;
                        height: 150px;
                    }
                }
            }

            .button-wrapper {
                width: 80%;
                margin: 10px auto;
                .btn {
                    font-size: $font_size_14px;
                    color: #2F70DF;
                    cursor: pointer;
                }
            }
        }
    }
</style>

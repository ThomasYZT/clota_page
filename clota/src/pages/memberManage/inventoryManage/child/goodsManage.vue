<!--
    进销存管理--商品管理
    作者：杨泽涛
-->
<template>
    <div class="goods-manage">
        <i-row>

        </i-row>
        <i-row class="search-row">
            <i-col style="display: inline-block;width : auto;">
                <Button v-if="canAddGoods"
                        class="tool-btn left"
                        icon="android-add"
                        type="primary"
                        @click="addGood({type : 'add'})">{{$t('NewGoodsWarehousing')}}</Button>
                <!-- 导出 -->
                <a v-if="canExportGoods" class="ivu-btn-90px a-btn" :href="downloadUrl">{{$t('exporting')}}</a>
            </i-col>
            <i-col span="8" style="float: right;">
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
        <!--<tool-box :toolNum="2">-->
            <!--<div slot="tool0" class="button-tool">-->
                <!--&lt;!&ndash; 新增商品入库 &ndash;&gt;-->
                <!--<Button v-if="canAddGoods"-->
                        <!--class="tool-btn left"-->
                        <!--icon="android-add"-->
                        <!--type="primary"-->
                        <!--@click="addGood({type : 'add'})">{{$t('NewGoodsWarehousing')}}</Button>-->
                <!--&lt;!&ndash; 导出 &ndash;&gt;-->
                <!--<a v-if="canExportGoods" class="ivu-btn-90px a-btn" :href="downloadUrl">{{$t('exporting')}}</a>-->
            <!--</div>-->
            <!--<div slot="tool1">-->
                <!--<div class="placeholder"></div>-->
            <!--</div>-->
        <!--</tool-box>-->

        <!-- 表格 -->
        <div class="table-wrapper">
            <tableCom :column-data="tableColumn"
                      :table-data="tableData"
                      :ofsetHeight="110"
                      :border="true"
                      :show-pagination="true"
                      :total-count="totalCount"
                      :page-no-d.sync="queryParams.pageNo"
                      :page-size-d.sync="queryParams.pageSize"
                      @query-data="getListData">
                <!-- 库存数量 -->
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="Number(scope.row.stockNum) <  Number(scope.row.undrawNum)"
                              class="warn-value">
                            {{ scope.row.stockNum | contentFilter}} {{$t('bracketSetting', { content : $t('缺货') })}}
                        </span>
                        <span v-else>
                            {{ scope.row.stockNum | contentFilter}}
                        </span>
                    </template>
                </el-table-column>
                <!-- 商品状态 -->
                <el-table-column
                    slot="column5"
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
                    :width="canAddGoods ? row.width : (row.width / 2)"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li v-if="canAddGoods"
                                class="blue-label"
                                @click="addGood({type: 'edit', detail: scope.row})">{{$t('continueStockIn')}}</li>
                            <li class="blue-label" @click="stockDetail(scope.row)">{{$t('stockDetail')}}</li>
                        </ul>
                    </template>
                </el-table-column>

            </tableCom>
        </div>
    </div>
</template>

<script>
import tableCom from '@/components/tableCom/tableCom';
import toolBox from '../components/toolBox';
import { goodsListHead } from './tableConfig';
import ajax from '@/api/index';
import ajaxConfig from '@/config/index.js';
import apiList from '@/api/apiList.js';
import { mapGetters } from 'vuex';

export default {
	components : {
		tableCom,
		toolBox
	},
	data () {
		return {
			//商品状态类型 选择列表
			goodsStatusList : [
				{
					label : 'inGoods',
					value : '0'
				},
				{
					label : 'inGoods',
					value : '1'
				},
			],
			//过滤信息
			queryParams : {
				pageNo : 1,
				pageSize : 10,
				keyword : ''
			},
			//表头配置
			tableColumn : goodsListHead,
			//表格数据
			tableData : [],
			//表格数据总条数
			totalCount : 0
		};
	},
    computed : {
        //下载模板路径
        downloadUrl () {
            return ajaxConfig['HOST'] + apiList['exportGoodsList'] + '?token=' + ajax.getToken();
        },
        ...mapGetters([
            'permissionInfo'
        ]),
        //是否可以新增商品入库
        canAddGoods () {
            return this.permissionInfo && this.permissionInfo['operateMemberProduct'] === 'allow';
        },
        //是否可以导出商品
        canExportGoods () {
            return this.permissionInfo && this.permissionInfo['queryMemberProductList'] === 'allow';
        }
    },
	methods : {
		/**
         * 获取列表数据
         */
		getListData () {
			ajax.post('queryPagedGoods', this.queryParams).then(res => {
                if ( res.success ) {
                    this.tableData = res.data ? res.data.data : [];
                    this.totalCount = res.data.totalRow;
                } else {
                    this.tableData = [];
                    this.totalCount = 0;
                    this.$Message.error(this.$t('dataGetError'));
                }
			});
		},
        /**
         * 前往新增商品入库界面
         * @param {string} type
         * @param {object} detail
         */
        addGood ({ type, detail }) {
            if (!this.canAddGoods) return;
            this.$router.push({
                name : 'editGoodsWarehousing',
                params : {
                    type : type,
                    listItem : detail
                }
            });
        },
        /**
         * 前往库存详情页面
         * @param {object} data
         */
        stockDetail (data) {
            this.$router.push({
                name : 'stockInfo',
                params : {
                    listItem : data
                }
            });
        }
	}
};
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .goods-manage {
        .button-tool {
            text-align: left;
            .tool-btn {
                margin-right: 10px;
            }
        }

        .tool-btn {
            margin-right: 5px;
        }

        .search-row{
            @include block_outline($height : 50px);
            padding: 10px 30px;
        }

        /deep/ .input-field {
            width: 350px;
            padding-left: 30px;
        }

        .table-wrapper {

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

            .warn-value {
                color: $color_red;
            }
        }


        .a-btn {
            display: inline-block;
            padding: 4px 15px;
            width: 90px;
            font-size: 14px;
            color: $color_fff;
            border-radius: 4px;
            text-align: center;
            background-color: $color_blue;
        }

        .placeholder {
            width: 10px;
            height: 10px;
        }
    }

</style>

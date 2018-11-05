<!--实体卡管理-->

<template>
    <div class="entity-card-controle">
        <div class="content">
            <div class="btn-area">
                <div class="query-params">
                    <Select v-model="cardStatus"
                            style="width:170px"
                            @on-change="statusChange">
                        <Option value="all">{{$t('allCardType')}}</Option>
                        <Option value="open">{{$t('cardOpened')}}</Option>
                        <Option value="wait">{{$t('cardUnopened')}}</Option>
                        <Option value="lose">{{$t('lose')}}</Option>
                    </Select>
                    <Select v-model="entityCardType"
                            style="width:170px"
                            @on-change="queryList">
                        <Option value="all">{{$t('all')}}</Option>
                        <Option value="common">{{$t('普通卡')}}</Option>
                        <Option value="password">{{$t('密码卡')}}</Option>
                    </Select>
                    <Input v-model.trim="keyword"
                           style="width: 240px;margin-left: 15px;margin-right: 15px;"
                           :placeholder="$t('pleaseInputNumbers')"/>
                    <Button type="primary"
                            @click="search"
                            style="margin-right: 5px;">{{$t('query')}}</Button>
                    <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
                    <ul class="member-count">
                        <li>
                            <span class="label">{{$t('notOpenData')}}</span>
                            <span class="count">{{unOpenCardsNum | contentFilter}}</span>
                        </li>
                        <li>
                            <span class="label">{{$t('openedData')}}</span>
                            <span class="count">{{openCardsNum | contentFilter}}</span>
                        </li>
                    </ul>
                </div>
                <div class="btn-label">
                    <Button type="primary"
                            class="ivu-btn-108px"
                            style="margin-right: 5px;"
                            @click="importSingle">{{$t('singleImport')}}</Button>
                    <Button type="primary"
                            class="ivu-btn-108px"
                            @click="batchImport">{{$t('batchImport')}}</Button>
                </div>
            </div>
            <table-com
                :column-data="columns"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="153"
                @query-data="queryList">
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.cardStatus === 'open' ? $t('cardOpened') : $t('cardUnopened')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.entityCardType === 'password' ? $t('密码卡') : $t('普通卡')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    fixed="right"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li @click="modify(scope.row)">{{$t('modify')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--单个导入实体卡模态框-->
        <import-single-card-info
            :card-data="currentData"
            v-model="importVisible"
            @input="currentData = {}"
            @fresh-data="queryList">
        </import-single-card-info>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {cardHead} from './entityCardControlConfig';
    import ajax from '@/api/index.js';
    import importSingleCardInfo from './components/importSingleCardInfo';
    export default {
        components : {
            tableCom,
            importSingleCardInfo
        },
        data() {
            return {
                //表头配置
                columns : cardHead,
                //表格数据
                tableData : [],
                pageNo : 1,
                pageSize : 10,
                totalCount :0,
                //筛选卡状态
                cardStatus : 'all',
                //关键字
                keyword  : '',
                //已开发数量
                openCardsNum : '',
                //未开卡数量
                unOpenCardsNum : '',
                //模态框是否显示
                importVisible : false,
                //当前操作的数据
                currentData : {},
                //卡类型
                entityCardType : 'all'
            }
        },
        methods: {
            /**
             * 查询所有导入的实体卡信息
             */
            queryList () {
                ajax.post('queryEntityCard',{
                    cardStatus : this.cardStatus === 'all' ? '' : this.cardStatus,
                    keyWord : this.keyword,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    entityCardType : this.entityCardType === 'all' ? '' : this.entityCardType
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.memberEntityCardVoList ? res.data.memberEntityCardVoList.data : [] : [];
                        this.totalCount = res.data ? res.data.memberEntityCardVoList ? res.data.memberEntityCardVoList.totalRow : 0 : 0;
                        this.openCardsNum = res.data ? res.data.openCardNum : '';
                        this.unOpenCardsNum = res.data ? res.data.waitOpenNum : '';
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                        this.openCardsNum = '';
                        this.unOpenCardsNum = '';
                    }
                });
            },
            /**
             * 重置查询条件
             */
            reset () {
                this.keyword = '';
                this.cardStatus = 'all';
                this.queryList();
            },
            /**
             * 查询
             */
            search () {
                this.queryList();
            },
            /**
             * 根据卡状态筛选数据
             */
            statusChange () {
                this.queryList();
            },
            /**
             * 显示导入单个
             */
            importSingle ( ) {
                this.currentData = {};
                this.importVisible = true;
            },
            /**
             * 修改卡数据
             * @param rowData
             */
            modify (rowData) {
                this.importVisible = true;
                this.currentData = rowData;
            },
            /**
             * 批量导入
             */
            batchImport () {
                this.$router.push({
                    name : 'importEntityCard'
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .entity-card-controle{
        @include block_outline();
        background: $color_fff;
        border-radius: 4px;

        .content{
            @include block_outline($height : unquote('calc(100% - 50px)'));

            .btn-area{
                @include block_outline($height : 93px);
                padding: 5px 30px;

                .query-params{
                    @include block_outline($height : 42px);
                    padding: 5px 0;

                    .member-count{
                        float: right;
                        line-height: 32px;

                        li{
                            float: left;
                            font-size: $font_size_14px;
                            margin-left: 30px;

                            .label{
                                color: $color_666;
                            }

                            .count{
                                color: $color_yellow;
                            }
                        }
                    }
                }

                .btn-label{
                    padding: 5px 0;
                }
            }
        }
    }
</style>

<!--实体卡管理-->

<template>
    <div class="entity-card-controle">
        <div class="content">
            <div class="btn-area">
                <div class="query-params">
                    <Select v-model="cardStatus"
                            style="width:170px;margin-right: 5px;"
                            @on-change="statusChange">
                        <Option value="all">{{$t('allCardType')}}</Option>
                        <Option value="open">{{$t('cardOpened')}}</Option>
                        <Option value="wait">{{$t('cardUnopened')}}</Option>
                        <Option value="loss">{{$t('lose')}}</Option>
                    </Select>
                    <Select v-model="entityCardType"
                            style="width:170px"
                            @on-change="queryList">
                        <Option value="all">{{$t('all')}}</Option>
                        <Option value="common">{{$t('normalCard')}}</Option>
                        <Option value="password">{{$t('passwordCard')}}</Option>
                    </Select>
                    <Input v-model.trim="keyword"
                           style="width: 240px;margin-left: 5px;margin-right: 5px;"
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
                    <template v-if="canUploadCard">
                        <Button type="primary"
                                class="ivu-btn-108px"
                                style="margin-right: 5px;"
                                @click="importSingle">{{$t('singleImport')}}</Button>
                        <el-dropdown trigger="click"
                                     placement="bottom-start"
                                     size="medium"
                                     @command="handleCommand"
                                     @click.native.stop="">
                            <Button type="primary"
                                    class="ivu-btn-108px">{{$t('batchImport')}}</Button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,index) in importTypeList"
                                                  :key="index"
                                                  :command="item">{{$t(item.label)}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
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
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{$t('entityCardStatus.' + scope.row.cardStatus)}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.entityCardType === 'password' ? $t('passwordCard') : $t('normalCard')}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    show-overflow-tooltip
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.row.custName | contentFilter}}/{{scope.row.phoneNum | contentFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="canEditCard"
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    fixed="right"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li @click="modify(scope.row)"
                                :class="{disabled : scope.row.cardStatus === 'open' ||  scope.row.cardStatus === 'loss'}">
                                {{$t('modify')}}
                            </li>
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
    import { cardHead } from './entityCardControlConfig';
    import ajax from '@/api/index.js';
    import importSingleCardInfo from './components/importSingleCardInfo';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            tableCom,
            importSingleCardInfo
        },
        data () {
            return {
                //表头配置
                columns : cardHead,
                //表格数据
                tableData : [],
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //筛选卡状态
                cardStatus : 'all',
                //关键字
                keyword : '',
                //已开发数量
                openCardsNum : '',
                //未开卡数量
                unOpenCardsNum : '',
                //模态框是否显示
                importVisible : false,
                //当前操作的数据
                currentData : {},
                //卡类型
                entityCardType : 'all',
                //导入方式列表
                importTypeList : [
                    {
                        label : 'normalCard',
                        value : 'common'
                    },
                    {
                        label : 'passwordCard',
                        value : 'password'
                    }
                ]
            };
        },
        methods : {
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
                    if (res.success) {
                        this.tableData = res.data ? res.data.memberEntityCardVoList ? res.data.memberEntityCardVoList.data : [] : [];
                        this.totalCount = res.data ? res.data.memberEntityCardVoList ? res.data.memberEntityCardVoList.totalRow : 0 : 0;
                        this.openCardsNum = res.data ? res.data.openCardNum : '';
                        this.unOpenCardsNum = res.data ? res.data.waitOpenNum : '';
                    } else {
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
                if (!this.canUploadCard) return;
                this.currentData = {};
                this.importVisible = true;
            },
            /**
             * 修改卡数据,已开卡和已遗失的实体卡不可以再修改数据
             * @param rowData
             */
            modify (rowData) {
                if (rowData.cardStatus === 'open' || rowData.cardStatus === 'loss' || !this.canEditCard) return;
                this.currentData = rowData;
                this.importVisible = true;
            },
            // /**
            //  * 批量导入
            //  */
            // batchImport () {
            //     this.$router.push({
            //         name : 'importEntityCard'
            //     });
            // },
            /**
             * 导入实体卡
             * @param{String} command 导入的类型
             */
            handleCommand (command) {
                if (!this.canUploadCard) return;
                this.$router.push({
                    name : 'importEntityCard',
                    params : {
                        importType : command.value
                    }
                });
            }
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以导入实体卡
            canUploadCard () {
                return this.permissionInfo && this.permissionInfo['uploadEntityCard'] === 'allow';
            },
            //是否可以编辑实体卡
            canEditCard () {
                return this.permissionInfo && this.permissionInfo['modifyEntityCard'] === 'allow';
            }
        }
    };
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

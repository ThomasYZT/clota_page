<template>
    <!--会员管理--会员类别-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="btn-wrap">
                <!--新增会员类别-->
                <Button type="primary"
                        icon="android-add"
                        :disabled="!canAddCardType"
                        @click="showAddMemberModal">{{$t('addMemberCardCategory')}}</Button>
                <!--<span class="tips">{{$t('mostAddNumOfMemberType', { num : '12' })}}</span>&lt;!&ndash;最多新增12个会员类别&ndash;&gt;-->
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="180"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true">
                    <el-table-column
                        slot="column2"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <template v-if="scoped.row.cardForm === 'sale'">{{$t('cardSaleType')}}</template>
                            <template v-else-if="scoped.row.cardForm === 'growth'">{{$t('cardGrowthType')}}</template>
                            <template v-else>-</template>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column4"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <ul class="operate-list">
                                <li class="blue-label" @click.stop="showEditMemberModal(scoped.row)">{{$t('modify')}}</li>
                                <li class="blue-label" @click.stop="toDetail(scoped.row)">{{$t('setMemberLevel')}}</li>
                                <!--会员3期暂时去掉-->
                                <!--<li class="red-label"-->
                                    <!--@click.stop="delMemberLevel($event,scoped.row)">-->
                                    <!--{{$t('del')}}-->
                                <!--</li>-->
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

        <!--删除级别模态框-->
        <del-modal ref="delModal">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>
                {{$t('isDoing')}}{{$t('delete')}}：
                <span class="yellow-label" v-w-title="currentData ? currentData.typeName : ''">{{currentData ? currentData.typeName : ''}}</span>
            </span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>，{{$t('sureToDel')}}</span>
        </del-modal>

        <!--新增会员卡类别模态框-->
        <add-card-category-modal v-model="showAddModal"
                                 :card-default-info="currentData"
                                 @fresh-data="queryList">
        </add-card-category-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './categorySettingConfig';
    import headerTabs from './components/headerTabs.vue';
    import delModal from '@/components/delModal/index.vue';
    import addCardCategoryModal from './components/addCardCategoryModal';
    import { mapGetters } from 'vuex';

    export default {
        components : {
            headerTabs,
            tableCom,
            delModal,
            addCardCategoryModal
        },
        data () {
            return {
                //当前页面路由名称
                routerName : 'memCardManagement',
                //列表表头
                columnData : columnData,
                // 表格数据
                tableData : [],
                // 已被创建的会员级别
                usedLevels : [],
                //当前操作的数据
                currentData : {},
                //是否显示新增会员卡类别名称
                showAddModal : false,
                //会员卡类型计数
                memberCardTypeCount : {}
            };
        },
        created () {
            //查询列表
            this.queryList();
        },
        methods : {
            /**
             * 显示新增模态框
             */
            showAddMemberModal ( ) {
                this.currentData = {};
                this.showAddModal = true;
            },

            /**
             * 编辑会员卡类别信息
             * @param rowData 行数据
             */
            showEditMemberModal (rowData) {
                this.currentData = rowData;
                this.showAddModal = true;
            },

            /**
             * 查询所有会员类别信息
             */
            queryList () {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.filter(item => {
                            if (this.cardIsSaling && this.cardIsGrowth) {
                                return true;
                            } else if (this.cardIsSaling) {
                                return item.cardForm === 'sale';
                            } else if (this.cardIsGrowth) {
                                return item.cardForm === 'growth';
                            }
                            return false;
                        }) : [];
                        this.usedLevels = this.tableData.map(item => {
                            return item.levelNum;
                        });
                    } else {
                        this.$Message.warning(res.message || 'queryMemberLevels ' + this.$t('queryFailure') + '！');
                    }
                }).finally(() => {
                    this.countCardTypeByType();
                });
            },

            //增加/修改会员级别
            showChannelModal ( event, data ) {
                this.$refs.addChannel.show(data);
            },

            /**
             * 删除会员级别
             * @param event
             * @param rowData
             */
            delMemberLevel (event, rowData) {
                this.currentData = rowData;
                this.$refs.delModal.show({
                    title : this.$t('deleteMemberLevel'),
                    confirmCallback : () => {
                        this.deleteLevelInfo(rowData);
                    }
                });
            },

            /**
             * 删除会员类别
             * @param data 会员类别数据
             */
            deleteLevelInfo ( data ) {
                ajax.post('deletedCardType', {
                    cardTypeId : data.id,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                        //查询列表
                        this.queryList();
                    } else if (res.code === 'M021') {
                        this.$Message.error(this.$t('levelExistCard')); // 该会员级别下已存在会员信息，不能删除
                    } else if (res.code === 'M025') {
                        this.$Message.error(this.$t('categoryExist')); // 会员卡类别已存在
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                    }
                });
            },
            /**
             * 跳转到会员级别详情的页面
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'levelSetting',
                    params : {
                        id : data.id,
                        cardForm : data.cardForm
                    }
                });
            },
            /**
             * 获取会员卡类型新增个数
             */
            countCardTypeByType () {
                ajax.post('countCardTypeByType').then(res => {
                    if (res.success && res.data) {
                        this.memberCardTypeCount = res.data;
                    } else {
                        this.memberCardTypeCount = {};
                    }
                });
            }
        },
        computed : {
            ...mapGetters([
                'memberConfigInfo'
            ]),
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是成长型型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否可以新增会员卡类别
            canAddCardType () {
                if (this.memberCardTypeCount && Object.keys(this.memberCardTypeCount).length > 0) {
                    //成长型会销售型会员卡下最多分别可以新增2张个人卡和2张企业卡
                    if (this.memberConfigInfo && this.memberConfigInfo['cardType'] === 'sale_growth') {
                        return (this.memberCardTypeCount['growth']['enterprise'] < 2 ||
                            this.memberCardTypeCount['growth']['personal'] < 2 ||
                            this.memberCardTypeCount['sale']['personal'] < 2 ||
                            this.memberCardTypeCount['sale']['enterprise'] < 2 );
                    } else if (this.cardIsSaling) {
                        return (this.memberCardTypeCount['sale']['personal'] < 2 ||
                            this.memberCardTypeCount['sale']['enterprise'] < 2 );
                    } else if (this.cardIsGrowth) {
                        return (this.memberCardTypeCount['growth']['personal'] < 2 ||
                            this.memberCardTypeCount['growth']['enterprise'] < 2 );
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .setting{
        @include block_outline();
        min-width: $content_min_width;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .content {
            padding: 0px 30px;
            height: calc(100% - 90px);
            overflow: auto;

            .btn-wrap{
                height: 60px;
                line-height: 60px;
                @include clearfix();

                /deep/ .ivu-btn{
                    min-width: 108px;
                    margin-right: 15px;
                }

                .tips{
                    font-size: $font_size_12px;
                    color: $color_yellow;
                    float: right;
                }
            }

            .table-wrap{
                max-height: calc(100% - 70px);

                .ivu-icon-checkmark-round, .ivu-icon-close-round{
                    color: $color_C0CDDF;
                }
            }

            .page-wrap{
                margin-top: 30px;
                text-align: center;
            }

        }

    }

    .content-text {
        width: 210px;
        position: relative;

        .delete-icon {
            position: absolute;
            left: -27px;
            margin-right: 12px;
            color: $color_red;
        }

        .yellow-label{
            display: inline-block;
            max-width: 100%;
            color: $color_yellow;
            vertical-align: middle;
            @include overflow_tip();
        }
    }
</style>


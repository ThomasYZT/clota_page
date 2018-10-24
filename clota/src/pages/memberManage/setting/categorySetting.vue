<template>
    <!--会员管理--会员类别-->
    <div class="setting">

        <!--头部tab组件-->
        <header-tabs :router-name="routerName"></header-tabs>

        <div class="content">

            <div class="btn-wrap">
                <!--新增会员类别-->
                <Button type="primary"
                        :disabled="tableData.length > 11 ? true : false"
                        @click="showAddMemberModal">+ {{$t('addMemberCardCategory')}}</Button>
                <span class="tips">{{$t('max12MemberLevels')}}</span><!--最多新增12个会员级别-->
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="180"
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="true"
                    :row-click-able="true"
                    @row-click="toDetail">
                    <el-table-column
                        slot="column3"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <ul class="operate-list">
                                <li class="blue-label" @click="showEditMemberModal(scoped.row)">{{$t('modify')}}</li>
                                <li class="red-label" @click="delMemberLevel($event,scoped.row)">{{$t('del')}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

        <!--删除级别模态框-->
        <del-modal ref="delModal">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('isDoing')}}{{$t('delete')}}：
                <span class="yellow-label">{{currentData ? currentData.levelDesc : ''}}</span></span>
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
    import {columnData} from './categorySettingConfig';
    import headerTabs from './components/headerTabs.vue';
    import delModal from '@/components/delModal/index.vue';
    import addCardCategoryModal from './components/addCardCategoryModal';

    export default {
        components: {
            headerTabs,
            tableCom,
            delModal,
            addCardCategoryModal
        },
        data () {
            return {
                //当前页面路由名称
                routerName: 'memCardManagement',
                //列表表头
                columnData : columnData,
                // 表格数据
                tableData: [],
                // 已被创建的会员级别
                usedLevels: [],
                //当前操作的数据
                currentData : {},
                //是否显示新增会员卡类别名称
                showAddModal : false,
            }
        },
        created(){
            //查询列表
            this.queryList();
        },
        methods: {
            /**
             * 显示新增模态框
             */
            showAddMemberModal ( ) {
                this.currentData =  {};
                this.showAddModal = true;
            },

            /**
             * 编辑会员卡类别信息
             * @param rowData 行数据
             */
            showEditMemberModal (rowData) {
                this.currentData =  rowData;
                this.showAddModal = true;
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                        this.usedLevels = this.tableData.map(item => {
                            return item.levelNum;
                        });
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryMemberLevels '+ $t('queryFailure') +'！');
                    }
                })
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
                    title : this.$t('删除会员级别'),
                    confirmCallback : () => {
                        this.deleteLevelInfo(rowData);
                    }
                })
            },

            //删除数据
            deleteLevelInfo ( data ) {
                ajax.post('deleteMemberLevel', {
                    id: data.id,
                    lowerGrowthValue: data.lowerGrowthValue,
                    highestGrowthValue: data.highestGrowthValue,
                    isDeleted: 'true',
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip', {tip: this.$t('del')}));     // 删除成功
                        //查询列表
                        this.queryList();
                    } else if (res.code == 'M013') {
                        this.$Message.error(this.$t('levelExistCard'));    // 该会员级别下已存在会员信息，不能删除
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip', {tip: this.$t('del')}));    // 删除失败
                    }
                })
            },
            /**
             * 跳转到会员级别详情的页面
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'levelSetting',
                    params : {

                    }
                });
            }
        }
    }
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


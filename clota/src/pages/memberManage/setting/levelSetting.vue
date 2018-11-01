<template>
    <!--会员管理--会员级别-->
    <div class="setting">

        <bread-crumb-head
            :locale-router="$t('memberGrade')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>

        <div class="content">

            <div class="btn-wrap">
                <Button type="primary"
                        :disabled="tableData.length > 11"
                        @click="showAddMemberModal">+ {{$t('addMemberLevel')}}</Button><!--新增会员级别-->

                <!--会员3期暂时去掉-->
                <!--<Button type="primary"-->
                        <!--:disabled="tableData.length > 0"-->
                        <!--@click="showRuleModal">{{$t('promotionSetting')}}</Button>&lt;!&ndash;晋级设置&ndash;&gt;-->
                <span class="tips">{{$t('max12MemberLevels')}}</span><!--最多新增12个会员级别-->
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="180"
                    :column-data="levelListHead"
                    :table-data="tableData"
                    :border="true">
                    <!--会员3期暂时去掉-->
                    <!--<el-table-column-->
                        <!--slot="column3"-->
                        <!--:label="row.title"-->
                        <!--:prop="row.field"-->
                        <!--:key="row.index"-->
                        <!--:width="row.width"-->
                        <!--:min-width="row.minWidth"-->
                        <!--show-overflow-tooltip-->
                        <!--slot-scope="row">-->
                        <!--<template slot-scope="scoped">-->
                            <!--<span>{{scoped.row.lowerGrowthValue}} - {{scoped.row.highestGrowthValue}}</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        slot="column6"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        fixed="right"
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <ul class="operate-list">
                                <li class="blue-label" @click="showAddMemberModal($event,scoped.row)">{{$t('modify')}}</li>
                                <!--会员3期暂时去掉-->
                                <!--<li class="red-label" @click="delMemberLevel($event,scoped.row)">{{$t('del')}}</li>-->
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

        <!--新增会员modal-->
        <add-member-modal ref="addMember"
                          :card-type-id="cardTypeId"
                          @modify-success="queryList">
        </add-member-modal>

        <!--会员等级晋升规则设置modal-->
        <member-rule-modal ref="memberRule" @modify-success="queryList"></member-rule-modal>

        <!--删除级别模态框-->
        <del-modal ref="delModal">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('isDoing')}}{{$t('delete')}}：
                <span class="yellow-label">{{currentData ? currentData.levelDesc : ''}}</span></span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>，{{$t('sureToDel')}}</span>
        </del-modal>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { levelListHead } from './levelConfig';
    import addMemberModal from '../components/addMemberModal.vue';
    import memberRuleModal from '../components/memberRuleModal.vue';
    import delModal from '@/components/delModal/index.vue';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            addMemberModal,
            memberRuleModal,
            tableCom,
            delModal,
            breadCrumbHead
        },
        data () {
            return {
                //列表表头
                levelListHead : levelListHead,
                // 表格数据
                tableData : [],
                // 已被创建的会员级别
                usedLevels : [],
                //当前操作的数据
                currentData : {},
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'memCardManagement',
                        router : {
                            name : 'memCardManagement'
                        }
                    }
                ],
                //会员类别id
                cardTypeId : ''
            };
        },
        methods : {

            showAddMemberModal ( event, data ) {
                this.$refs.addMember.show( data || null, this.usedLevels );
            },

            showRuleModal () {
                this.$refs.memberRule.show( this.tableData );
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                ajax.post('queryLevelsByCardType', {
                    cardTypeId : this.cardTypeId
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data : [];
                        this.usedLevels = this.tableData.map(item => item.levelNum);
                    } else {
                        this.tableData = [];
                        this.$Message.warning(res.message || 'queryMemberLevels ' + this.$t('queryFailure') + '');
                    }
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
                    title : this.$t('删除会员级别'),
                    confirmCallback : () => {
                        this.deleteLevelInfo(rowData);
                    }
                });
            },

            //删除数据
            deleteLevelInfo ( data ) {
                ajax.post('deleteMemberLevel', {
                    id : data.id,
                    lowerGrowthValue : data.lowerGrowthValue,
                    highestGrowthValue : data.highestGrowthValue,
                    isDeleted : 'true',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('del') })); // 删除成功
                        //查询列表
                        this.queryList();
                    } else if (res.code == 'M013') {
                        this.$Message.error(this.$t('levelExistCard')); // 该会员级别下已存在会员信息，不能删除
                    } else {
                        this.$Message.error(res.message || this.$t('failureTip', { tip : this.$t('del') })); // 删除失败
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.cardTypeId = params.id;
                    this.queryList();
                } else {
                    this.$router.push({
                        name : 'memCardManagement'
                    });
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


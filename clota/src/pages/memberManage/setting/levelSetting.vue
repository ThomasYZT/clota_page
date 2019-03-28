<template>
    <!--会员管理--会员级别-->
    <div class="setting">

        <bread-crumb-head
            :locale-router="$t('memberGrade')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>

        <div class="content">

            <div class="btn-wrap">
                <template v-if="cardTypeId !== '1'">
                    <Button type="primary"
                            icon="android-add"
                            :disabled="tableData.length > 11"
                            @click="showAddMemberModal">{{$t('addMemberLevel')}}</Button><!--新增会员级别-->
                    <Button type="primary"
                            v-if="cardAttribute === 'growth'"
                            :disabled="tableData.length < 1"
                            @click="showRuleModal">{{$t('promotionSetting')}}</Button><!--晋级设置-->
                    <span class="tips">{{$t('max12MemberLevels')}}</span><!--最多新增12个会员级别-->
                </template>
            </div>
            <div class="table-wrap">
                <table-com
                    :ofsetHeight="180"
                    :column-data="levelListHead"
                    :table-data="tableData"
                    :border="true">
                    <el-table-column
                        v-if="cardAttribute === 'growth'"
                        slot="column1"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                        <template slot-scope="scoped">
                           {{scoped.row.levelNum | contentFilter}}
                        </template>
                    </el-table-column>
                    <!--会员4期暂时去掉-->
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
                            <!--{{getFunctions(scoped.row)}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                        v-if="cardAttribute === 'growth'"
                        slot="column3"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                        <template slot-scope="scoped">
                            {{scoped.row.lowerGrowthValue | contentFilter }}-{{scoped.row.highestGrowthValue | contentFilter }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="cardAttribute === 'sale'"
                        slot="column4"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                        <template slot-scope="scoped">
                            {{scoped.row.salePrice | moneyFilter | contentFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="cardAttribute === 'sale'"
                        slot="column5"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                        <template slot-scope="scoped">
                            {{scoped.row.amountInCard | moneyFilter | contentFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column6"
                        :label="row.title"
                        :prop="row.field"
                        :key="row.index"
                        :width="row.width"
                        :min-width="row.minWidth"
                        show-overflow-tooltip
                        slot-scope="row">
                        <template slot-scope="scoped">
                            <template v-if="scoped.row.effTime === null">
                                {{$t('permanentValidity')}}
                            </template>
                            <template v-else>
                                {{scoped.row.effTime}}{{$t('time.' + scoped.row.effTimeUnit)}}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="column8"
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
                                <li class="red-label" @click="delMemberLevel($event,scoped.row)">{{$t('del')}}</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>
            </div>

        </div>

        <!--新增会员modal-->
        <add-member-modal ref="addMember"
                          :cardAttribute="cardAttribute"
                          :card-type-id="cardTypeId"
                          @modify-success="queryList">
        </add-member-modal>

        <!--会员等级晋升规则设置modal-->
        <member-rule-modal ref="memberRule" @modify-success="queryList"></member-rule-modal>

        <!--删除级别模态框-->
        <del-modal ref="delModal" class="del-min-width">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('colonSetting',{ key : $t('isDoing') })}}
                <span class="yellow-label">{{currentData ? currentData.levelDesc : ''}}</span></span>
            <span><span style="color : #EB6751;">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span>
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
    import { mapGetters } from 'vuex';

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
                cardTypeId : '',
                //会员卡属性
                cardAttribute : ''
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
                        this.$Message.warning('queryMemberLevels ' + this.$t('queryFailure') + '');
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
                    title : this.$t('deleteMemberLevel'),
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
                    } else if (res.code === 'M013') {
                        this.$Message.error(this.$t('levelExistCard')); // 该会员级别下已存在会员信息，不能删除
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') })); // 删除失败
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
                    this.cardAttribute = params.cardForm;
                    this.queryList();
                } else {
                    this.$router.push({
                        name : 'memCardManagement'
                    });
                }
            },
            /**
             * 获取会员功能信息
             * @param rowData
             */
            getFunctions (rowData) {
                let result = [];
                if ( rowData['isScore'] === 'true' ) {
                    result.push(this.$t('integral'));
                }
                if ( rowData['isDiscount'] === 'true' ) {
                    result.push(this.$t('allowance'));
                }
                if ( rowData['isRecharge'] === 'true' ) {
                    result.push(this.$t('recharge'));
                }
                return result.join(',');
            }
        },
        computed : {
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
            }),
            //是否是成长型型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是售卖型会员卡
            cardIsSaling () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
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


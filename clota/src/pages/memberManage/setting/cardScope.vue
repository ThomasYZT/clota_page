<!--会员卡可用范围设置-->

<template>
    <div class="card-scope-setting">
        <!--头部tab组件-->
        <header-tabs
            :router-name="routerName">
        </header-tabs>
        <div class="content">
            <ul class="cardtype-area" v-if="memTableData.length > 0">
                <li class="card-type-list"
                    v-for="(item,index) in memTableData"
                    :class="{ 'active' : chosedMemCard === item.id }"
                    @click="cardTypeChosedChange(item.id)"
                    :key="index">
                    {{item.content}}
                </li>
            </ul>
            <div class="cardtype-area" v-else>
                <no-data >
                </no-data>
            </div>
            <div class="channel-area">
                <div class="wrap-area">
                    <div class="title">{{$t('memberAreaChoose')}}</div>
                    <el-tree :data="companyData"
                             node-key="id"
                             ref="tree"
                             :default-expand-all="true"
                             show-checkbox
                             :check-strictly="true"
                             :props="defaultProps"
                             :expand-on-click-node="false"
                             v-if="companyData.length > 0"
                             @check="treeChecked"
                             :render-content="renderContent">
                    </el-tree>
                    <div class="tree-area" v-else>
                        <no-data >
                        </no-data>
                    </div>
                </div>
                <div class="wrap-area" v-if="choosedScenic && Object.keys(choosedScenic).length > 0">
                    <div class="title">{{choosedScenic.orgName}} - {{$t('memberChannelChoose')}}</div>
                    <table-com
                        key="tableCom"
                        ref="tableCom"
                        :column-data="columns"
                        :table-data="tableData"
                        :border="true"
                        :page-no-d.sync="pageNo"
                        :show-pagination="true"
                        :page-size-d.sync="pageSize"
                        :total-count="totalCount"
                        :auto-height="true"
                        :table-com-min-height="280"
                        @query-data="queryList"
                        @selection-change="channelChange">
                        <el-table-column
                            slot="column0"
                            slot-scope="row"
                            :selectable="selectable"
                            :label="row.title"
                            type="selection"
                            :width="row.width"
                            :min-width="row.minWidth">
                        </el-table-column>
                    </table-com>
                </div>
            </div>
        </div>
        <div class="btn-area">
            <Button type="primary" @click="saveSetting">{{$t("save")}}</Button>
            <Button type="ghost" @click="resetFieldFunc">{{$t("cancel")}}</Button>
        </div>
    </div>
</template>

<script>
    import headerTabs from './components/headerTabs.vue';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { cardScopeHead } from './cardScopeConfig';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';

    export default {
        components : {
            headerTabs,
            tableCom,
            noData
        },
        data () {
            return {
                //当前页面路由名称
                routerName : 'cardScopeSetting',
                //表头配置
                columns : cardScopeHead,
                //表格数据
                tableData : [],
                pageNo : 1,
                pageSize : 10,
                //总条数
                totalCount : 0,
                //组织树配置
                defaultProps : {
                    children : 'subNodes'
                },
                //组织树数据
                treeData : {},
                //当前选择的自营渠道列表
                channelSelected : [],
                //会员类别及级别数据
                memberLevelsData : {},
                //选择的会员卡信息
                chosedMemCard : '',
                //会员卡级别对应的可用渠道和可用景区
                cardCategoryChosedInfo : {}
            };
        },
        methods : {
            /**
             * 查询会员卡可用渠道范围
             */
            queryList () {
                ajax.post('querySelfOwnedChannel',{
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).finally(() => {
                    this.getOrgTree();
                });
            },
            /**
             * 获取组织树列表
             */
            getOrgTree () {
                ajax.post('getRootOrgTree',{
                    showScene : 'manage',
                    manageType : 'manage',
                }).then(res =>{
                   if (res.success) {
                       this.treeData = res.data ? res.data : {};
                   } else {
                       this.treeData = {};
                   }
                }).finally(() => {
                    this.queryCardRangeList();
                    // this.findBasicSet();
                });
            },
            /**
             * 组织树render函数
             */
            renderContent (h, { data }) {
                if (data.nodeType === 'department'
                    || data.nodeType === 'table'
                    || data.nodeType === 'company'
                    || !this.chosedMemCard) {
                    this.$set(data,'disabled',true);
                }
                return h('div', {
                    style : {
                        display : 'inline-block',
                        width : '100%',
                        height : '24px'
                    },
                    class : {
                        'title-wrap' : true,
                        [this.$style.choosedNode] : data.id === this.choosedScenic.id
                    },
                    on : {
                        click : () => {
                            this.choosedScenic = data;
                            this.queryList(data.id);
                        }
                    }
                }, [
                    h('span', {
                        class : {
                            'title-class' : true
                        },
                        directives : [
                            {
                                name : 'w-title',
                                value : data.orgName
                            }
                        ],
                        style : {
                            display : 'inline-block',
                            overflow : 'hidden',
                            textOverflow : 'ellipsis',
                            whiteSpace : 'nowrap',
                            width : '93%'
                        }
                    }, data.orgName),
                ]);
            },
            /**
             * 保存设置
             */
            saveSetting () {
                let cardRanges = [];
                for ( let item in this.cardCategoryChosedInfo ) {
                    cardRanges.push({
                        id : this.cardCategoryChosedInfo[item]['id'],
                        cardLevelId : item,
                        channelIds : this.cardCategoryChosedInfo[item]['channel'].join(','),
                        parkIds : this.cardCategoryChosedInfo[item]['scenic'].join(','),
                    });
                }
                ajax.post('saveOrUpdateCardRanges',{
                    cardRanges : JSON.stringify(cardRanges)
                }).then(res => {
                    if ( res.success ) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('card-range-saved') })); // 保存基础设置成功
                        this.queryCardRangeList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('card-range-saved') }));
                    }
                });
                // ajax.post('basicSet',{
                //     channelIds : this.channelSelected.map(item => item.partnerId).join(','),
                //     parkIds : companyIds.join(','),
                // }).then(res => {
                //    if (res.success) {
                //        this.$Message.success('保存成功');
                //        this.findBasicSet();
                //    } else {
                //        this.$Message.error('保存失败');
                //    }
                // });
            },
            /**
             * 选中的自营渠道修改
             * @param data
             */
            channelChange (data) {
                if (this.cardCategoryChosedInfo[this.chosedMemCard]) {
                    this.cardCategoryChosedInfo[this.chosedMemCard]['channel'] = data.map(item => item.partnerId);
                }
                // this.channelSelected = data;
            },
            /**
             * 取消保存，重置状态
             */
            resetFieldFunc () {
                this.queryList();
            },
            /**
             * 获取会员卡可用范围设置
             */
            // findBasicSet () {
            //     ajax.post('findBasicSet').then(res => {
            //        if (res.success) {
            //            if (res.data) {
            //                if (res.data.channelIds) {
            //                    let channelSelected = res.data.channelIds.split(',');
            //                    this.$nextTick(() => {
            //                        for (let i = 0,j = this.tableData.length; i < j; i++) {
            //                            if (channelSelected.includes(this.tableData[i].partnerId)) {
            //                                this.$refs.tableCom.toggleRowSelection(this.tableData[i],true);
            //                            }
            //                        }
            //                    });
            //                }
            //                if (res.data.parkIds) {
            //                    this.$nextTick(() => {
            //                        this.$refs.tree.setCheckedKeys(res.data.parkIds.split(','));
            //                    });
            //                }
            //            }
            //        } else {
            //            this.channelSelected = [];
            //        }
            //     });
            // },
            /**
             * 获取所有会员类别和类别下的所有级别数据
             */
            getMemberLevelsInType () {
                ajax.post('getMemberLevelsInType').then(res => {
                    if (res.success) {
                        this.memberLevelsData = res.data ? res.data : {};
                        if ( !this.chosedMemCard && Object.keys(this.memberLevelsData).length > 0 ) {
                            for (let item in this.memberLevelsData) {
                                if (this.memberLevelsData[item] && this.memberLevelsData[item].length > 0) {
                                    this.chosedMemCard = this.memberLevelsData[item][0]['id'];
                                    this.cardTypeChosedChange(this.memberLevelsData[item][0]['id']);
                                    break;
                                }
                            }
                        }
                    } else {
                        this.memberLevelsData = {};
                    }
                });
            },
            /**
             * 判断会员卡可用渠道是否可以选择
             */
            selectable () {
                return !!this.chosedMemCard;
            },
            /**
             * 会员卡级别选择状态改变
             * @param rowDataid
             */
            cardTypeChosedChange (rowDataid) {
                this.chosedMemCard = rowDataid;
                if ( !(rowDataid in this.cardCategoryChosedInfo) ) {
                    this.cardCategoryChosedInfo[rowDataid] = {
                        channel : [],
                        scenic : []
                    };
                    this.$nextTick(() => {
                        this.$refs.tableCom.clearSelection();
                        if (this.$refs.tree) {
                            this.$refs.tree.setCheckedKeys([]);
                        }
                    });
                } else {
                    this.$nextTick(() => {
                        let channelsData = this.cardCategoryChosedInfo[rowDataid]['channel'];
                        for (let i = 0,j = this.tableData.length; i < j; i++) {
                            if (channelsData.includes(this.tableData[i]['partnerId'])) {
                                this.$refs.tableCom.toggleRowSelection(this.tableData[i],true);
                            } else {
                                this.$refs.tableCom.toggleRowSelection(this.tableData[i],false);
                            }
                        }
                        this.$refs.tree.setCheckedKeys(this.cardCategoryChosedInfo[rowDataid]['scenic']);
                    });
                }
            },
            /**
             * 选择的可用景区改变
             * @param data
             * @param checkedNodes
             */
            treeChecked (data,{ checkedNodes }) {
                if (this.cardCategoryChosedInfo[this.chosedMemCard]) {
                    this.cardCategoryChosedInfo[this.chosedMemCard]['scenic'] = checkedNodes.map(item => item.id);
                }
            },
            /**
             * 查询会员卡使用范围设置
             */
            queryCardRangeList () {
                ajax.post('queryCardRangeList').then(res => {
                    if (res.success) {
                        let cardRange = res.data ? res.data : [];
                        for ( let i = 0,j = cardRange.length; i < j; i++) {
                            this.cardCategoryChosedInfo[cardRange[i]['cardLevelId']] = {
                                channel : cardRange[i]['channelIds'].split(','),
                                scenic : cardRange[i]['parkIds'].split(','),
                                id : cardRange[i]['id']
                            };
                        }
                    } else {
                        this.cardCategoryChosedInfo = {};
                    }
                    this.cardTypeChosedChange(this.chosedMemCard);
                });
            }
        },
        created () {
            this.getMemberLevelsInType();
            // this.findBasicSet();
        },
        computed : {
            //组织树数组格式数据
            companyData () {
                if (this.treeData && Object.keys(this.treeData).length > 0) {
                    return this.treeData;
                } else {
                    return [];
                }
            },
            //会员卡级别数据
            memTableData () {
                let result = [];
                for (let item in this.memberLevelsData) {
                    result = [].concat(result,this.memberLevelsData[item].map(list => {
                        return {
                            ...list,
                            content : item + '-' + list.levelDesc
                        };
                    }));
                }
                return result;
            }
        }
    };
</script>


<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .card-scope-setting{
        background: $color-fff;
        @include block_outline();

        .content{
            height: calc(100% - 126px);
            overflow: auto;
            padding: 25px 60px;

            .cardtype-area{
                position: relative;
                @include block_outline(322px);
                background: #fbfcfe;
                float: left;
                overflow-y: auto;
                overflow-x: hidden;

                .card-type-list{
                    @include block_outline($height : 50px);
                    font-size: $font_size_14px;
                    color: $color_666;
                    line-height: 50px;
                    padding: 0 20px;
                    cursor: pointer;

                    &.active{
                        background: $color_fff;
                        border: 1px solid #BBC5D5;
                        border-right: 0;
                    }
                }
            }

            .channel-area{
                @include block_outline(unquote('calc(100% - 322px)'));
                float: left;
                padding-left: 30px;
                overflow: auto;
            }

            .title{
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                margin-bottom: 15px;

                &:not(:nth-of-type(1)){
                    margin-top: 25px;
                }
            }

            /deep/ .table-com{
                width: 500px;
            }

            /deep/ .el-tree{
                width: 500px;
            }
        }

        .btn-area{
            @include block_outline($height : 56px);
            line-height: 56px;
            text-align: center;
            background: #FFFFFF;
            -webkit-box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);
            box-shadow: 0 -5px 3px 0 rgba(0, 0, 0, 0.03);

            /deep/ .ivu-btn{
                width: 108px;
                padding: 5px 30px;
            }
            .ivu-btn + .ivu-btn{
                margin-left: 20px;
            }
        }

        .tree-area{
            position: relative;
            @include block_outline(500px,200px);
        }
    }
</style>

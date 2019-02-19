<template>
    <!-- 合作伙伴 -->
    <div class="partner">
        <div class="filter-box">
            <Button type="primary"
                    style="float: left;margin-right: 10px"
                    icon="android-add"
                    v-if="canAddpartner"
                    @click="newPartnerBtn('add')"
                    size="default"><span class="add-icon">{{$t('addPartner')}}</span>
            </Button>
            <el-dropdown trigger="click"
                         v-if="canOperatePartner || canDeletePartner"
                         placement="bottom-start"
                         @command="handleCommand">
                <Button type="ghost" style="float: left" size="default">{{$t('batchOperate')}}</Button><!--批量操作-->

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in batchOperate"
                                      :key="index"
                                      :disabled="chosenPartners.length <= 0 || item.disabled"
                                      :command="item">{{$t(item.label)}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <Input class="input-field"
                   v-model.trim="filterParam.keyword"
                   icon="ios-search"
                   :placeholder="$t('inputAnywordForSearch')"
                   @on-enter="handleSearch"
                   @on-click="handleSearch" />
        </div>
        <div class="selection-table">

            <table-com
                :ofsetHeight="170"
                :show-pagination="true"
                :column-data="columnData"
                :table-data="tableData"
                :total-count="totalCount"
                :page-no-d.sync="queryParams.pageNo"
                :page-size-d.sync="queryParams.pageSize"
                :border="true"
                :column-check="true"
                @query-data="queryList"
                @selection-change="changeSelection">

                <!--<el-table-column-->
                    <!--slot="column3"-->
                    <!--slot-scope="row"-->
                    <!--:label="row.title"-->
                    <!--:width="row.width"-->
                    <!--:min-width="row.minWidth">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{new Date(scope.row.startDate).format('yyyy-MM-dd')}}-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <!--<el-table-column-->
                    <!--slot="column4"-->
                    <!--slot-scope="row"-->
                    <!--:label="row.title"-->
                    <!--:width="row.width"-->
                    <!--:min-width="row.minWidth">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{new Date(scope.row.endDate).format('yyyy-MM-dd')}}-->
                    <!--</template>-->
                <!--</el-table-column>-->

                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status=='valid'">
                            <span class="status-sign valid"></span>{{$t('startingUse')}}
                        </span>
                        <span v-if="scope.row.status=='invalid'">
                            <span class="status-sign invalid"></span>{{$t('unStarting')}}
                        </span>
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
                            <li v-if="canModifyPartner" @click="newPartnerBtn('modify', scope.row)">{{$t('modify')}}</li>
                            <li :class="{'red-label' : scope.row.status === 'valid','disabled' : scope.row.disabled}"
                                v-if="canOperatePartner"
                                @click="enable(scope.row)">
                                {{scope.row.status === 'valid' ? $t('disabled') : $t('commissioned')}}
                            </li>
                            <li class="red-label"
                                v-if="canDeletePartner"
                                @click="showDelModal(scope.row)">{{$t('del')}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--新增/修改合作伙伴-->
        <add-partner ref="addPartnerModal" @on-add-success="queryList"></add-partner>
        <!--删除合作伙伴-->
        <!--<delete-list ref="delListModal"
                     @deletions="handleDeletions"
                     :deleteName="deleteName"
                     :name="name"></delete-list>-->
        <del-modal ref="delListModal" class="del-min-width">
            <span class="content-text">
                <i class="iconfont icon-help delete-icon"></i>{{$t('colonSetting',{ key : $t('isDoing')})}}
                <span class="yellow-label" v-w-title="name">{{name}}</span>
                <span style="color: #333;" v-if="partnerIds.length>1">{{$t('cooperationTip',{num: partnerIds.length})}}</span>
            </span>
            <span><span class="red-label">{{$t('irreversible')}}</span>{{$t('sureToDel')}}</span><!--本操作不可撤销，是否确认删除？-->
        </del-modal>

        <!--启用失败提示框-->
        <noticeModal ref="noticeModal">
            <ul class="pro-list">
                <li class="detail">{{$t('validPartnerError')}}</li>
                <li class="detail partner-list"
                    v-for="(item,index) in validPartnersErr"
                    v-w-title="item.channelName"
                    :key="index">
                    {{item.channelName | contentFilter}}
                </li>
                <li class="hint">
                    <Icon type="information-circled"></Icon>
                </li>
            </ul>
        </noticeModal>

        <!--删除失败提示框-->
        <noticeModal ref="delErrModal">
            <ul class="pro-list">
                <li class="detail">{{$t('delPartnerFail')}}</li>
                <li class="detail partner-list"
                    v-for="(item,index) in noExpireErrorPartner"
                    v-w-title="$t('delPartnerFailReason2',{ orgName : item.channelName})"
                    :key="index">
                    {{$t('delPartnerFailReason2',{ orgName : item.channelName}) | contentFilter}}
                </li>
                <li class="detail partner-list"
                    v-for="(item,index) in noSettleErrorPartner"
                    v-w-title="$t('delPartnerFailReason1',{ orgName : item.channelName})"
                    :key="index">
                    {{$t('delPartnerFailReason1',{ orgName : item.channelName}) | contentFilter}}
                </li>
                <li class="hint">
                    <Icon type="information-circled"></Icon>
                </li>
            </ul>
        </noticeModal>

    </div>
</template>


<script>
    // 表格筛选下拉模块
    import filterDrop from '../../../components/filterDrop/filterDrop.vue';
    //新增合作伙伴弹窗
    import addPartner from '../model/addPartner.vue';
    // 删除合作伙伴弹窗
//    import deleteList from '../model/deleteList.vue';
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index';
    import { partnerListHead } from '../orgStructure';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { configVariable, batchOperate } from '@/assets/js/constVariable';
    import map from 'lodash/map';
    import { mapGetters } from 'vuex';
    import noticeModal from '@/components/noticeModal/index.vue';

    export default {
        components : {
            filterDrop,
            addPartner,
            delModal,
            tableCom,
            noticeModal
        },
        data () {
            return {
                // 获取数据的请求参数
                queryParams : {
                    pageNo : 1, // 当前页码数
                    pageSize : configVariable.pageDefaultSize, // 每页显示数量
                    nodeType : 'partner'
                },
                filterParam : {
                    keyword : '',
                },
                // 表格表头字段名
                columnData : partnerListHead,
                // 列表数据
                tableData : [],
                // 数据总条数
                totalCount : 0,


                /*
                // 表格筛选下拉菜单
                listFilters: {
                    stateFilter: [{name: '全部', state: 'all'}, {name: '已签到', state: 'ok'}, {name: '未签到', state: 'leak'}],
                    alertFilter: [{name: '不限', alert: 'all'}, {name: '异常', alert: 'alert'}, {
                        name: '正常',
                        alert: 'normal'
                    }],
                },*/
                enableValue : true, //启用，未启用变量
                name : '', //删除弹窗名字
                deleteName : this.$t('delete') + this.$t('cooperation'), //删除内容名字
                partnerIds : [], //合作伙伴ids
//                scopeRowData: {}, //当前被操作的行数据
                // 已勾选的数据
                chosenPartners : [],
                //启用失败的合作伙伴
                validPartnersErr : [],
                //协议期未过期删除失败的合作伙伴
                noExpireErrorPartner : [],
                //尾款未结清删除失败的合作伙伴
                noSettleErrorPartner : []
            };
        },
        methods : {
            // 初始化加载获取员工列表数据
            queryList () {

                ajax.post('queryPartnerList', this.queryParams).then(res => {
                    if (res.success) {
                        if (res.data && res.data.data) {
                            this.tableData = res.data.data.map(item => {
                                let disabled = false;
                                if (item.status === 'invalid') {
                                    if (new Date().valueOf() < item.startDate.toDate().valueOf() ||
                                        new Date().valueOf() > item.endDate.toDate().addDays(1).valueOf()) {
                                        disabled = true;
                                    }
                                }
                                return {
                                    ...item,
                                    disabled
                                };
                            });
                            this.totalCount = res.data.totalRow;
                        } else {
                            this.tableData = [];
                            this.totalCount = 0;
                        }
                    }
                });
            },
            // 搜索员工
            handleSearch () {
                this.queryParams.pageNo = 1;
                Object.assign(this.queryParams, this.filterParam);
                this.queryList();
            },

            // 筛选下拉组件
            renderHeader (h, params) {
                return h(filterDrop, {
                    props : {
                        colParams : params.column,
                        filters : this.listFilters
                    },
                    on : {
                        'state-filter' : this.handleAlertFilter,
                        'alert-filter' : this.handleAlertFilter,
                    }
                });
            },
            // 筛选点击事件
            handleAlertFilter () {

            },
            //启用或者禁用
            enable (scopeRow, isBatch) {
                if (!this.canOperatePartner || scopeRow.disabled) return;
                let partnerObj = {};
                if (scopeRow.status == 'valid') {
                    partnerObj.successTip = this.$t('disabledCooperation');
                    partnerObj.failTip = this.$t('failureTip', { tip : this.$t('disabled') }); // 禁用失败
                    partnerObj.status = 'invalid';
                    partnerObj.msgType = 'success';
                } else if (scopeRow.status == 'invalid') {
                    partnerObj.successTip = this.$t('ableCooperation');
                    partnerObj.failTip = this.$t('failureTip', { tip : this.$t('commissioned') }); // 启用失败
                    partnerObj.status = 'valid';
                    partnerObj.msgType = 'success';
                }

                ajax.post('updatePartnerStatus', {
                    ids : isBatch == true ? this.partnerIds.join(',') : scopeRow.id,
                    status : partnerObj.status
                }).then(res => {
                    if (res.success) {
                        //如果是启用，如果data不是空，表示启用失败
                        if (scopeRow.status === 'invalid' && res.data && res.data.length > 0) {
                            this.validPartnersErr = res.data;
                            this.$refs.noticeModal.show({
                                title : this.$t('notice'),
                                showCancel : false,
                                confirmBtn : this.$t('close')
                            });
                        } else {
                            if (isBatch === true) {
                                // 批量操作提示语
                                this.$Message[partnerObj.msgType](partnerObj.successTip + '：' + this.$t('batchOperate'));
                            } else {
                                // 单个操作提示语
                                this.$Message[partnerObj.msgType](partnerObj.successTip + '：' + scopeRow.channelName);
                            }
                        }
                        this.queryList();
                    } else {
                        this.$Message.error(res.message ? res.message : partnerObj.failTip);
                    }
                });
            },
            /**
             * 新增/修改合作伙伴
             * @param type - 新增/修改 类型
             * @param scopeRow - 修改时的行数据
             **/
            newPartnerBtn (type, scopeRow) {
                if (!this.canAddpartner && !this.canModifyPartner) return;
                let obj = type == 'add' ? { type : type } : { item : scopeRow, type : type };
                this.$refs.addPartnerModal.show(obj);
            },
            /**
             * 删除某一个或多个合作伙伴
             * @param data - 被删除的行数据
             * @param isBatch - 是否批量操作  Boolean
             */
            showDelModal (data, isBatch) {
                if (!this.canDeletePartner) return;
                if (isBatch == true) {
                    this.partnerIds = data.map(item => item.id);
                    this.name = data.length > 1 ? `${data[0].channelName}、${data[1].channelName}` : `${data[0].channelName}`;
                } else {
                    this.partnerIds = [data.id];
                    this.name = data.channelName;
                }

                this.$refs.delListModal.show({
                    title : this.$t(this.deleteName),
                    confirmCallback : () => {
                        this.handleDeletions();
                    }
                });
            },
            //确认删除
            handleDeletions () {
                ajax.post('deletePartners', {
                    ids : this.partnerIds.join(',')
                }).then(res => {
                    if (res.success) {
                        if (res.data && Object.keys(res.data).length > 0) {
                            this.noExpireErrorPartner = res.data['noExpire'];
                            this.noSettleErrorPartner = res.data['noSettle'];
                            this.$refs.delErrModal.show({
                                title : this.$t('notice'),
                                showCancel : false,
                                confirmBtn : this.$t('close')
                            });
                        } else {
                            this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                        }
                        this.handleSearch();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                    }
                });
            },
            /**
             * 批量勾选结果改变时的处理
             * @param selection - 被勾选的数据  Array
             */
            changeSelection (selection) {
                this.chosenPartners = selection;
                if (selection.length > 0) {
                    this.partnerIds = map(selection, 'id');
                }
            },
            handleCommand (dropItem) {
                if (this.chosenPartners.length <= 0) {
                    this.$Message.warning(this.$t('selectChannelOperate'));
                    return;
                }
                switch (dropItem.status) {
                    case 'valid' :
                    case 'invalid' :
                        this.enable(dropItem, true);
                        break;
                    case 'del' :
                        this.showDelModal(this.chosenPartners, true);
                        break;
                }
            },
        },
        computed : {
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以新增合作伙伴
            canAddpartner () {
                return this.permissionInfo && this.permissionInfo['addPartner'] === 'allow';
            },
            //是否可以修改合作伙伴
            canModifyPartner () {
                return this.permissionInfo && this.permissionInfo['modifyPartner'] === 'allow';
            },
            //是否可以禁用、启用合作伙伴
            canOperatePartner () {
                return this.permissionInfo && this.permissionInfo['operatePartner'] === 'allow';
            },
            //是否可以删除合作伙伴
            canDeletePartner () {
                return this.permissionInfo && this.permissionInfo['deletePartner'] === 'allow';
            },
            // 批量操作下拉选项
            batchOperate () {
                let result = [];
                if (this.canOperatePartner) {
                    result = result.concat([
                        {
                            label : 'commissioned', // 启用
                            value : 'valid',
                            status : 'invalid',
                            disabled : this.chosenPartners.filter(item => {
                                if (item.status === 'invalid') {
                                    if (item.endDate && item.startDate) {
                                        if (new Date().valueOf() >= item.startDate.toDate().valueOf() &&
                                            new Date().valueOf() <= item.endDate.toDate().addDays(1).valueOf()) {
                                            return true;
                                        }
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            }).length < 1
                        },
                        {
                            label : 'disabled', // 禁用
                            value : 'invalid',
                            status : 'valid',
                            disabled : this.chosenPartners.filter(item => item.status === 'valid').length < 1
                        }
                    ]);
                }
                if (this.canDeletePartner) {
                    result = result.concat([{
                        label : 'del', // 删除
                        value : 'del',
                        status : 'del',
                    },]);
                }
                return result;
            }
        },
        created () {
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .partner {
        @include block_outline();
        background: $color_fff;
        border-radius: 4px 4px 0 0;

        .filter-box {
            padding: 15px 30px 15px;
            overflow: hidden;
            .input-field {
                width: 350px;
                float: right;
            }

            /deep/ .ivu-btn-ghost {
                border-color: $color_blue;
                color: $color_blue;
            }
        }

        .operate-btn {
            cursor: pointer;
        }

        .blue {
            color: $color_blue;
        }
        .org {
            color: $color_yellow;
        }
        .red {
            color: $color_red;
        }

        .status-sign {
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
        .valid:after {
            background: $color_green;
        }
        .invalid:after {
            background: $color_BBC5D5;
        }
    }

    .el-dropdown-menu {
        width: 88px;
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

    .red-label {
        color: $color_red;
    }

    .pro-list{
        max-width: 320px;
        position: relative;

        .detail{
            line-height: 25px;
            @include overflow_tip();

            &.partner-list{
                color: $color_err;
            }
        }

        .hint{
            content : '';
            @include absolute_pos(absolute,$top : 2px,$left : -20px);

            .ivu-icon-information-circled{
                font-size: $font_size_16px;
                color: $color_yellow;
            }
        }
    }
</style>

<template>
    <!-- 销售渠道分组 -->
    <div class="saleChannelsGroup">
        <div class="orgHeader">
            <Poptip placement="bottom-start" v-model="addGroupPopVisible" width="312" transfer >
                <Button type="primary"
                        icon="ios-plus-empty"
                        class="ivu-btn-108px"
                        @click="addGroup">
                    新增分组
                </Button>
                <div slot="content">
                    <div class="add-group">
                        <div class="name">新增分组名称</div>
                        <Form ref="formData" :model="formData" :rules="ruleValidate">
                            <FormItem prop="orgName">
                                <Input v-model.trim="formData.orgName"/>
                            </FormItem>
                        </Form>
                        <div class="btn-area">
                            <Button type="primary" @click="addOrgName">确定</Button>
                            <Button type="ghost" @click="addGroupPopVisible = false;">取消</Button>
                        </div>
                    </div>
                </div>
            </Poptip>
            <Button type="ghost"
                    class="ivu-btn-108px">
                批量操作
            </Button>

            <Select v-model="groupType" style="width:280px">
                <Option :value="item.id"
                        v-for="item in orgGroupList"
                        :label="item.groupName"
                        :key="item.id">
                    <div class="group-list" @click="stopPro($event)" >
                        <template v-if="!item.edit">
                            <span class="label-text" v-w-title="item.groupName">{{item.groupName}}</span>
                            <span class="iconfont icon-edit" v-if="item.stay !== true" @click="editOrgType($event,item)"></span>
                            <span class="iconfont icon-delete" v-if="item.stay !== true"></span>
                        </template>
                        <template v-else>
                            <Input v-model="item.groupName" style="width: 190px;"/>
                            <span class="save">保存</span>
                            <span class="cancel">取消</span>
                        </template>
                    </div>
                </Option>
            </Select>
        </div>
        <!--<div class="selectionTable">-->
            <!--<el-table-->
                <!--:data="tableData"-->
                <!--:border="true"-->
                <!--style="width: 100%">-->
                <!--<el-table-column-->
                    <!--type="selection"-->
                    <!--width="55">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="渠道编码">-->
                    <!--<template slot-scope="scope">-->
                        <!--<div class="cellText"><span class="code">309287482</span></div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="渠道名称">-->
                    <!--<template slot-scope="scope">-->
                        <!--<div>星火旅行社1</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="销售渠道类型">-->
                    <!--<template slot-scope="scope">-->
                        <!--<div>A级销售渠道</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--prop="date"-->
                    <!--label="操作">-->
                    <!--<template slot-scope="scope">-->
                        <!--<div class="operation">-->
                            <!--<span class="move" @click="moveInGroupBtn">移动到</span>-->
                            <!--<span class="span-blue" @click="moveOutGroupBtn">移出分组</span>-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div class="pagination">-->
                <!--<el-pagination-->
                    <!--:page-sizes="[100, 200, 300, 400]"-->
                    <!--:page-size="100"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="400">-->
                <!--</el-pagination>-->
            <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; 移动分组弹窗 &ndash;&gt;-->
        <!--<move-out-group ref="moveOutGroupModal" @upDataList='init' :moveName="moveName"></move-out-group>-->
        <!--&lt;!&ndash; 删除分组弹窗 &ndash;&gt;-->
        <!--<delete-group ref="deleteGroupModal" @upDataList='init' :pattnerName="pattnerName"></delete-group>-->
        <!--&lt;!&ndash; 新增分组 &ndash;&gt;-->
        <!--<kw-popover ref="addPopover" :el="popoverEl" placement="bottom" align="left" :offset="offset">-->
            <!--<div class="add-group-popover">-->
                <!--<div class="popover-content">-->
                    <!--<p>新增分组名称</p>-->
                    <!--<Input :placeholder="$t('inputField', {field: ''})"/>-->
                <!--</div>-->
                <!--<div class="popover-footer">-->
                    <!--<Button type="primary" size="small">{{$t("save")}}</Button>-->
                    <!--<Button type="ghost" size="small">{{$t("cancel")}}</Button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</kw-popover>-->
        <!--&lt;!&ndash; 移动分组 &ndash;&gt;-->
        <!--<kw-popover ref="movePopover" :el="popoverEl" placement="left" align="top">-->
            <!--<div class="add-group-popover">-->
                <!--<div class="popover-content">-->
                    <!--<p>将所选销售渠道移至分组</p>-->
                    <!--<Select>-->
                        <!--<Option value="132">123</Option>-->
                    <!--</Select>-->
                <!--</div>-->
                <!--<div class="popover-footer">-->
                    <!--<Button type="primary" size="small">{{$t("save")}}</Button>-->
                    <!--<Button type="ghost" size="small">{{$t("cancel")}}</Button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</kw-popover>-->

        <div class="content">
            <table-com
                :column-data="columns"
                :table-data="tableData"
                :border="true"
                :page-no-d.sync="pageNo"
                :show-pagination="true"
                :page-size-d.sync="pageSize"
                :total-count="totalCount"
                :ofset-height="120"
                @query-data="queryList">
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    show-overflow-tooltip
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li>
                                <Poptip placement="right"
                                        width="312"
                                        v-model="scoped.row.visible"
                                        transfer popper-class="select-group">
                                    <span @click="scoped.row.visible = true">移动到</span>
                                    <div slot="content">
                                        <div class="name">将所选销售渠道移至分组</div>
                                        <Form ref="formData1" :model="formData" :rules="ruleValidate">
                                            <FormItem prop="selectOrgId">
                                                <Select v-model="formData.selectOrgId" style="width:240px" transfer>
                                                    <Option :value="item.id"
                                                            v-for="item in orgGroupList"
                                                            :label="item.groupName"
                                                            :key="item.id">
                                                    </Option>
                                                </Select>
                                            </FormItem>
                                        </Form>
                                        <div class="btn-area">
                                            <Button type="primary" @click="changeOrg(scoped.row)">确定</Button>
                                            <Button type="ghost" @click="scoped.row.visible = false">取消</Button>
                                        </div>
                                    </div>
                                </Poptip>
                            </li>
                            <li @click="removeGroup(scoped.row)">移除分组</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <!--移除分组-->
        <del-modal ref="delModal">
            <div class="del-tips">
                <Icon type="help-circled"></Icon>
                <span class="red-bale">将所选销售渠道从本分组移出后，将列入未分组</span>
            </div>
        </del-modal>
    </div>
</template>


<script>
    // 下拉编辑组件
    import editDropdown from '../../../components/editDropdown/editDropdown.vue';
    // 移动分组弹窗
    import moveOutGroup from '../model/moveOutGroup.vue';
    // 删除分组弹窗
    import deleteGroup from '../model/deleteGroup.vue';
    // 移动分组下拉
    import kwPopover from '../../../components/popover/popover.vue';
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {saleGroup} from './saleChannelsGroupConfig';
    import delModal from '@/components/delModal/index.vue';

    export default {
        components: {
            editDropdown,
            moveOutGroup,
            deleteGroup,
            kwPopover,
            tableCom,
            delModal
        },
        data() {
            return {
                //表单数据
                tableData: [],
                //下拉列表数据
                dataList: [{
                    name: 'A级销售渠道',
                    id: 1,
                }, {
                    name: 'B级销售渠道',
                    id: 2,
                }, {
                    name: 'C级销售渠道',
                    id: 3,
                }],
                moveName: '销售渠道', //移出名称
                pattnerName: 'A级销售渠道', //删除分组名称
                popoverEl: '', //移动分组下拉变量
                // 下拉组件位置定义
                offset: {
                    top: 8,
                },
                //选择的分组类型
                groupType : '',
                //销售渠道分组
                orgGroupList : [],
                //表头配置
                columns : saleGroup,
                pageNo : 1,
                pageSize : 10,
                totalCount : 0,
                //分组信息
                formData : {
                    //新增的分组姓名
                    orgName : '',
                    //移动分组时选择的分组
                    selectOrgId : ''
                },
                //表单校验规则
                ruleValidate : {
                    orgName : [
                        {required : true,message : this.$t('inputField',{field : '分组名称'}),trigger : 'blur'},
                        {max : 50,message : this.$t('errorMaxLength',{field : '分组名称',length : 50}),trigger : 'blur'},
                    ],
                    selectOrgId : [
                        {required : true,message : this.$t('selectField',{msg : '销售分组'}),trigger : 'change'},
                    ]
                },
                //新增分组名称是否显示
                addGroupPopVisible : false,

            }
        },
        methods: {
            /**
             * 新增分组
             */
            addGroup(event) {
                this.addGroupPopVisible = true;
            },
            // 移动列表
            moveInGroupBtn(event) {
                this.popoverEl = event.currentTarget;
                this.$refs.movePopover.show();
            },
            // 移出分组
            moveOutGroupBtn() {
                this.$refs.moveOutGroupModal.show();
            },
            // 删除列表
            deleteList() {
                this.$refs.deleteGroupModal.show();
            },
            // 保存列表
            saveList(value) {
                console.log(value)
            },
            //初始化
            init() {

            },
            /**
             * 查询销售渠道分组信息
             */
            getOrgGroupList () {
                ajax.post('getOrgGroupList',{
                    groupType : 'sale'
                }).then(res => {
                    if(res.success){
                        this.orgGroupList = res.data ? res.data : [];
                        this.orgGroupList.push({
                            groupName : '未分组',
                            id : '0000',
                            stay : true
                        });
                        this.orgGroupList.unshift({
                            groupName : '全部分组',
                            id : '111',
                            stay : true
                        });
                    }else{
                        this.orgGroupList = [];
                    }
                });
            },
            /**
             * 编辑分组
             * @param e
             * @param data
             */
            editOrgType (e,data) {
                e.stopPropagation();
                this.$set(data,'edit',!data.edit);
            },
            changeOrgName () {
                console.log(orgName)
            },
            stopPro (e) {
                e.stopPropagation();
            },
            /**
             * 查询所有销售渠道分组
             */
            queryList() {
                ajax.post('getSaleChannelPage',{
                    groupId : this.groupType,
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                })
            },
            /**
             * 新增分组
             */
            addOrgName () {
                this.$refs.formData.validate(valid => {
                    if(valid){
                        ajax.post('addOrUpdateOrgGroup',{
                            groupType : 'sale',
                            groupName : this.formData.orgName
                        }).then(res => {
                            if(res.success){
                                this.$Message.success(`新增销售渠道分组:${this.formData.orgName}成功`);
                                this.getOrgGroupList();
                            }else{
                                this.$Message.error('新增失败');
                            }
                        }).finally(() => {
                            this.addGroupPopVisible = false;
                        });
                    }
                });
            },
            /**
             * 修改分组
             * @param data
             */
            changeOrg (data) {
                this.$refs.formData1.validate(valid => {
                    if(valid){
                        this.batchMoveChannelGroup([{
                            saleGroupId :  this.formData.selectOrgId,
                            id :  data.id,
                        }]);
                    }
                });
            },
            /**
             * 移动销售渠道分组
             * @param data
             */
            batchMoveChannelGroup (data) {
                ajax.post('batchMoveChannelGroup',data,{
                    headers : {
                        'Content-Type' : 'application/json;charset-UTF-8'
                    }
                }).then(res => {
                   if(res.success){
                       this.$Message.success('移动成功');
                       this.queryList();
                   }else{
                       this.$Message.error('移动失败');
                   }
                });
            },
            /**
             * 将渠道移出分组
             * @param rowData
             */
            removeGroup (rowData) {
                this.$refs.delModal.show({
                    title : `提示`,
                    confirmCallback : () => {
                        this.batchMoveChannelGroup([{
                            saleGroupId :  '',
                            id :  rowData.id,
                        }]);
                    }
                });
            }
        },
        computed: {},
        created() {
            this.getOrgGroupList();
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/scss/base';
    @import '../commonFile/common';

    .add-group-popover {
        padding: 17px 20px;

        .popover-content {
            width: 240px;
            p {
                font-size: $font_size_12px;
                color: #666666;
                line-height: 16px;
                margin-bottom: 10px;
            }
        }
        .popover-footer {
            margin-top: 30px;
            text-align: right;
            button:first-child {
                margin-right: 10px;
            }
        }
    }

    .saleChannelsGroup {
        @include block_outline();
        background: $color_fff;

        .orgHeader{
            @include block_outline($height : 60px);
            padding: 14px 30px 0 30px;

            /deep/ .ivu-btn-primary{
                margin-right: 10px;
            }

            /deep/ .ivu-select{
                float: right;
            }

            /deep/ .ivu-select-item{
                overflow-y: auto;
                overflow-x: hidden;
                padding: 0;

                &:hover{

                    & .iconfont{
                        display: inline-block;
                    }
                }
            }

            .group-list{
                padding: 7px 16px;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .label-text{
                display: inline-block;
                width: 210px;
                float: left;
                @include overflow_tip();
            }

            .iconfont{
                display: none;
                vertical-align: middle;

                &.icon-edit{
                    color: $color_blue;
                }

                &.icon-delete{
                    color: $color_err;
                    font-size: 14px;
                    margin-left: 5px;
                }
            }

            .save{
                font-size: $font_size_12px;
                color: $color_blue;
                margin-left: 5px;
            }

            .cancel{
                font-size: $font_size_12px;
                color: $color_999;
            }
        }

        .content{
            @include block_outline($height : unquote('calc(100% - 60px)'));
        }
    }
    .ivu-select-dropdown-transfer{
        z-index: 9999;
    }

    .del-tips{
        position: absolute;
        padding: 0 76px 0 106px;
        color: $color_333;
        font-size: $font_size_14px;

        .ivu-icon{
            @include absolute_pos(absolute,$left : 88px,$top : 2px);
            font-size: 15px;
            color: #EB6751;
        }
    }
</style>
<style>

    .add-group{
        width: 280px;
        height: 138px;
    }
    .add-group .name{
        padding: 10px 0 10px 0;
        font-size: 12px;
        color: #666666;
    }

    .add-group .btn-area{
        margin-top: 30px;
        text-align: right;
    }

    .add-group .ivu-btn-ghost{
        margin-left:5px;
    }
    .select-group{
        height: 153px;
    }
    .select-group .ivu-poptip-content,
    .select-group .ivu-poptip-inner{
        height: 100%;
    }
    .select-group .ivu-poptip-body{
        padding-top: 0;
        padding-bottom: 0;
    }

    .select-group .name{
        height: 46px;
        padding: 20px 0 10px 0;
        font-size: 12px;
        color: #666666;
    }
    .select-group .btn-area{
        text-align: right;
        margin-top: 30px;
    }
</style>


<template>
    <!--会员管理--会员信息-->
    <div class="member-information">

        <div class="filter-wrap">
            <Select v-model="queryParams.levelId" @on-change="queryList">
                <Option value="">全部会员等级</Option>
            </Select>
            <Select v-model="queryParams.channelId" @on-change="queryList">
                <Option value="">全部会员渠道</Option>
            </Select>
            <Select v-model="queryParams.vipStatus" @on-change="queryList">
                <Option value="">全部会员类型</Option>
                <Option v-for="(item,index) in enumData.vipStatusEnum"
                        :key="index"
                        :value="item.name">
                    {{item.desc}}
                </Option>
            </Select>
            <Select v-model="queryParams.cardStatus" @on-change="queryList">
                <Option value="">全部会员状态</Option>
                <Option v-for="(item,index) in enumData.cardStatusEnum"
                        :key="index"
                        :value="item.name">
                    {{item.desc}}
                </Option>
            </Select>
        </div>

        <div class="search-wrap">
            <Input v-model="queryParams.keyWord" placeholder="请输入姓名、电话、会员编号"/>
            <Button :disabled="queryParams.keyWord ? false : true" type="primary" @click="queryList">查 询</Button>
            <Button :disabled="queryParams.keyWord ? false : true" type="ghost" @click="reset">重 置</Button>
        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="add">+ 新增会员</Button>
        </div>

        <div class="table-wrap">
            <table-com
                ref="multipleTable"
                :table-data="tableData"
                :table-height="tableHeight"
                :column-data="infoListHead"
                :border="true"
                :row-click="true"
                @row-click="viewDetail">
                <el-table-column
                    slot="column0"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.cardCode }}</span>
                        <span class="red-color" v-if="scoped.row.cardStatus ==='frozen'">已冻结</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column3"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    slot-scope="row">
                    <template slot-scope="scoped">
                       <span>{{ getEnumFieldShow('genderEnum', scoped.row.gender) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column5"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ getEnumFieldShow('vipStatusEnum', scoped.row.status) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column9"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.updatedTime ? new Date(scoped.row.updatedTime).format('yyyy-mm-dd') : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column10"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <div class="operation">
                            <span class="span-blue" @click="modifyData($event,scoped.row)">修改</span>
                            <span @click="deleteMemberInfo($event,scoped.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </table-com>
        </div>

        <div class="page-wrap" v-if="tableData.length > 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="parseInt(total)">
            </el-pagination>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index'
    import tableCom from '@/pages/memberManage/components/tableCom';
    import tableMixins from '@/mixins/tableMixins';
    import {infoListHead} from './infoListConfig';
    import { vipStatusEnum, cardStatusEnum, genderEnum } from '@/assets/js/constVariable';

    export default {
        mixins : [tableMixins],
        components: { tableCom },
        data () {
            return {
                // 查询数据 keyWord-搜索关键字，levelId-会员级别Id，channelId-会员渠道Id，vipStatus-会员类型，cardStatus-会员状态
                queryParams: {
                    keyWord: '',
                    levelId: '',
                    channelId: '',
                    vipStatus: '',
                    cardStatus: '',
                },
                //枚举数据
                enumData: {
                    //会员级别
                    level: [],
                    //会员渠道
                    channel: [],
                    //会员类型
                    vipStatusEnum: vipStatusEnum,
                    //会员状态
                    cardStatusEnum: cardStatusEnum,
                    //性别
                    genderEnum: genderEnum,
                },
                //列表表头
                infoListHead : infoListHead,
                //列表数据(表格数据取统一字段名)
                tableData : [],
                //列表总条数
                total: 0,
                //列表多选list
                multipleSelection: [],
            }
        },
        created(){
            //清空选择数据
            this.multipleSelection = [];
            //查询列表
            this.queryList();
        },
        methods: {

            //新增会员
            add () {
                this.$router.push({ name: 'addMember', query: { type: 'add' }});
            },

            //编辑会员
            modifyData ( event, data ) {
                event.stopPropagation();
                this.$router.push({ name: 'addMember', query: { type: 'modify', info: data }});
            },

            //表格勾选回调
            handleSelectionChange(val) {
                this.multipleSelection[this.pageNo] = val;
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                var list = [
                    {
                        age: null,
                        alipayAcct: "alipay",
                        birthDay: "1994-01-01 00:00:00",
                        cardCode: "1031487745190662145",
                        cardId: 1031487745190662100,
                        cardStatus: "active",
                        certificationType: 1,
                        cityCode: "001001",
                        companyId: null,
                        createUser: 1,
                        createdTime: "2018-08-20 18:26:57",
                        custName: "李四",
                        emailAddr: "111@qq.com",
                        gender: "male",
                        hobby: "吃",
                        homeAddr: "长沙",
                        id: 1031487743789764600,
                        idCardNumber: "1132123141342342",
                        memberCardVos: [
                            {
                                cardCode: "1031487745190662145",
                                channelId: null,
                                childCard: null,
                                companyId: 1,
                                createUser: 1,
                                createdTime: "2018-08-20 18:26:57",
                                effDate: "2018-08-20 18:26:57",
                                effectiveSet: "perpetual",
                                effectiveTimes: null,
                                expDate: "2024-05-18 18:26:57",
                                id: 1031487745190662100,
                                isDeleted: "false",
                                isMotherCard: null,
                                lastActiveDate: null,
                                levelId: null,
                                memberAccountVos: [],
                                memberCardCouponModels: null,
                                memberDiscountOfMemberModels: null,
                                memberId: 1031487743789764600,
                                motherCard: null,
                                orgId: 101,
                                parentId: null,
                                passwd: null,
                                staffTypeId: null,
                                status: "active",
                                tpCardNo: "",
                                tpNo: "",
                                updateUser: null,
                                updatedTime: "2018-08-20 18:26:57",
                            }
                        ],
                        moneyBalance: null,
                        phoneNum: "15548752104",
                        pointBalance: null,
                        portrait: null,
                        qq: "12313",
                        stateCode: "001",
                        status: "active",
                        updateUser: null,
                        updatedTime: "2018-08-20 18:26:57",
                        wechatAcct: "wechat",
                    }
                ];
                this.multipleSelection[1] = list;
                this.tableData = list;
                this.total = 1;
                this.setTableHeight();
                ajax.post('queryMemberPage', {
                    keyWord: this.queryParams.keyWord,
                    levelId: this.queryParams.levelId,
                    channelId: this.queryParams.channelId,
                    vipStatus: this.queryParams.vipStatus,
                    cardStatus: this.queryParams.cardStatus,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                        this.total = res.data.totalRow || 0;
                        this.setTableHeight();
                        this.$nextTick( () => {
                            console.log(this.$refs.multipleTable.$children[0].setCurrentRow)
                            this.multipleSelection.forEach(item => {
                                if(item && item.length > 0){
                                    item.forEach(row => {
                                        console.log(row)
                                        console.log(this.$refs.multipleTable.$children[0].setCurrentRow)
                                        this.$refs.multipleTable.$children[0].setCurrentRow(row);
                                    })
                                }
                            })
                        })
                    } else {
                        console.log(res);
                        this.$Message.warning('queryMemberPage 查询失败！');
                    }
                })
            },

            //点击表格行常看详情
            viewDetail ( data ) {
                if(data.cardStatus !=='frozen'){
                    this.$router.push({ name: 'infoDetail' });
                }
            },

            //删除表格数据
            deleteMemberInfo ( event, data ) {
                event.stopPropagation();
                ajax.post('deleteMemberInfo', {
                    memberId: data.id,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('删除成功！');
                    } else {
                        console.log(res);
                        this.$Message.warning('deleteMemberInfo 删除失败！');
                    }
                });
            },

            /**
             * 获取枚举数据展示字段
             * @param name String 枚举字段名
             * @param val String 值
             */
            getEnumFieldShow ( name, val ) {
                var obj = this.enumData[name].find((item) => val === item.name);
                return obj.desc
            },

            //重置查询数据
            reset () {
                this.queryParams.keyWord = "";
                this.queryList();
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-information {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;
        padding-top: 20px;

        .filter-wrap{
            padding: 0 30px;
            margin-bottom: 8px;
            /deep/ .ivu-select{
                width: 180px;
                margin-right: 5px;
            }
        }

        .search-wrap{
            padding: 0 30px;
            margin-bottom: 12px;
            /deep/ .ivu-input-wrapper{
                width: 240px;
                margin-right: 15px;
            }

            /deep/ .ivu-btn{
                margin-right: 5px;
            }

        }

        .btn-wrap{
            padding: 0 30px;
            margin-bottom: 15px;
        }

        .table-wrap{
            max-height: calc(100% - 200px);

            .red-color{
                font-size: $font_size_12px;
                color: $color_red;
            }
        }

        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }

    }
</style>

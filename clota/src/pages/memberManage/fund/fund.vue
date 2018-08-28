<template>
    <!--会员管理--储值管理--储值账户-->
    <div class="funds">

        <div class="breadcrumb-box">
            <bread-crumb-head
                locale-router="储值明细"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>
        <div class="header-wrap">
            <Select v-model="queryParams.accountTypeId"
                    style="width:180px"
                    placeholder="请选择账户类型">
                <Option value='all'>
                    全部
                </Option>
                <Option
                    v-for="item in accountList"
                    :value="item.id"
                    :key="item.id">
                    {{ item.accountName }}
                </Option>
            </Select>
            <Select v-model="queryParams.levelId">
                <Option value="all">全部会员等级</Option>
                <Option v-for="(item, index) in enumData.level"
                        :value="item.id"
                        :key="index">
                    {{ item.levelDesc }}
                </Option>
            </Select>
            <Select v-model="queryParams.channelId">
                <Option value="all">全部会员渠道</Option>
                <Option v-for="(item,index) in enumData.channel"
                        :value="item.id"
                        :key="index">
                    {{ item.channelName }}
                </Option>
            </Select>
            <Select v-model="queryParams.cardStatus">
                <Option v-for="(item,index) in enumData.cardStatusEnum"
                        :key="index"
                        :value="item.name">
                    {{item.desc}}
                </Option>
            </Select>
            <br>
            <Input v-model="queryParams.keyWord" placeholder="请输入姓名、电话、会员编号"/>
            <Button type="primary" @click="queryList">查 询</Button>
            <Button type="ghost" @click="reset">重 置</Button>
        </div>

        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :row-class-name="rowClassName"
            :page-no-d.sync="pageNo"
            :show-pagination="true"
            :page-size-d.sync="pageSize"
            :total-count="totalCount"
            :ofset-height="210"
            @query-data="queryList">
            <el-table-column
                slot="column0"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    {{scoped.row.cardCode}}
                    <span class="frozen-cla">{{scoped.row.cardStatus === 'frozen' ? '已冻结' : ''}}</span>
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
                slot="column6"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    {{scoped.row.moneyBalance}}{{scoped.row.unit}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-list">
                        <li @click="toDetail(scoped.row)">详情</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './fundConfig';
    import ajax from '@/api/index.js';
    import { cardStatusEnum, genderEnum } from '@/assets/js/constVariable';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        components: {
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('fund'),
                        router: {
                            name: 'fundInfo'
                        }
                    }
                ],
                // 查询数据
                queryParams: {
                    keyWord: '',
                    //会员等级id
                    levelId: 'all',
                    //渠道id
                    channelId: 'all',
                    //会员卡状态
                    cardStatus: 'null',
                    //账户类型
                    accountTypeId : 'all'
                },
                //枚举数据
                enumData: {
                    //会员级别
                    level: [],
                    //会员渠道
                    channel: [],
                    //会员状态
                    cardStatusEnum: cardStatusEnum,
                    //性别
                    genderEnum: genderEnum,
                },
                //表头配置
                columnData : columnData,
                // 表格数据
                tableData: [],
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //账户列表
                accountList : []
            }
        },
        created() {
            //查询会员级别
            this.queryMemberLevels();
            //查询渠道列表
            this.queryChannelSet();
        },
        methods: {

            //查询会员级别
            queryMemberLevels () {
                ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.enumData.level = res.data.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'queryMemberLevels 查询失败！');
                    }
                })
            },

            //查询渠道列表
            queryChannelSet () {
                ajax.post('queryChannelSet', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.enumData.channel = res.data.data || [];
                    } else {
                        console.log(res);
                        this.$Message.warning('queryChannelSet 查询失败！');
                    }
                })
            },

            /**
             * 储值账户列表
             */
            queryList () {
                ajax.post('queryMemberPage',{
                    levelId : this.queryParams.levelId !== 'all' ? this.queryParams.levelId : '',
                    channelId : this.queryParams.channelId !=='all' ? this.queryParams.channelId : '',
                    cardStatus : this.queryParams.cardStatus !== 'null' ? this.queryParams.cardStatus : '',
                    accountTypeId  : this.queryParams.accountTypeId !== 'all' ? this.queryParams.accountTypeId : '',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    keyWord : this.queryParams.keyWord,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    }else{
                        this.tableData =  [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData =  [];
                    this.totalCount = 0;
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
                this.queryParams.accountTypeId = this.accountList.length > 0 ? this.accountList[0].id : 'all';
                this.queryParams.levelId = "all";
                this.queryParams.channelId = "all";
                this.queryParams.cardStatus = "all";
                this.queryList();
            },

            /**
             * 查询账户类型
             */
            queryMemberAccountDefine () {
                ajax.post('queryMemberAccountDefine',{
                    accountType: 'charging',
                    pageNo: 1,
                    pageSize: 99999
                }).then(res => {
                    if(res.success){
                        this.accountList = res.data.data ? res.data.data : [];
                    }else{
                        this.accountList = [];
                    }
                }).catch(() => {
                    this.accountList = [];
                })
            },
            /**
             * 获取路由信息
             * @param params
             */
            getParams (params) {
                if(params && Object.keys(params).length > 0){
                    this.queryParams.accountTypeId = params.id;
                }
            },
            /**
             * 动态给行添加类名
             * @param row
             */
            rowClassName (row){
                if(row.row.cardStatus === "frozen"){
                    return 'frozen-tr';
                }
            },
            /**
             * 跳转到个人资金明细
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'infoFund',
                    params: {
                        fundDetail : data
                    }
                });
            }
        },
        beforeRouteEnter(to,from,next){
            next(vm => {
                vm.queryMemberAccountDefine();
            });
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.queryParams.accountTypeId;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .funds{
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .header-wrap{
            height: 100px;
            line-height: 40px;
            padding: 10px 20px;

            /deep/ .ivu-select{
                width: 180px;
                margin-right: 5px;
            }

            /deep/ .ivu-input-wrapper{
                width: 240px;
                margin-right: 15px;
            }

            .ivu-btn + .ivu-btn{
                margin-left: 5px;
            }

        }

        .frozen-cla{
            font-size: $font_size_12px;
            color: $color_red;
        }

        /deep/ .frozen-tr{
            color: $color_gray;
        }

        .operate-list{
            @include table_operate();
        }

    }

</style>

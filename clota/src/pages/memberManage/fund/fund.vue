<template>
    <!--会员管理--储值管理--储值账户-->
    <div class="funds">
        <div class="breadcrumb-box">
            <bread-crumb-head
                :locale-router="'storageDetail'"
                :before-router-list="beforeRouterList">
            </bread-crumb-head>
        </div>
        <div class="header-wrap">
            <Select v-model="queryParams.accountTypeId"
                    style="width:180px"
                    :placeholder="$t('chooseAccountType')"
                    @on-change="queryList"><!--请选择账户类型-->
                <Option
                    v-for="item in accountList"
                    :value="item.id"
                    :key="item.id">
                    {{ item.accountName }}
                </Option>
            </Select>
            <Select v-model="queryParams.levelId" @on-change="queryList">
                <Option value="all">{{$t('memberLevelAll')}}</Option><!--全部会员等级-->
                <Option v-for="(item, index) in enumData.level"
                        :value="item.id"
                        :key="index">
                    {{item.typeName}}-{{ item.levelDesc }}
                </Option>
            </Select>
            <Select v-model="queryParams.channelId" @on-change="queryList">
                <Option value="all">{{$t('memberChannelAll')}}</Option><!--全部会员渠道-->
                <Option v-for="(item,index) in enumData.channel"
                        :value="item.id"
                        :key="index">
                    {{ item.channelName }}
                </Option>
            </Select>
            <Select v-model="queryParams.cardStatus" @on-change="queryList">
                <Option v-for="(item,index) in enumData.cardStatusEnum"
                        :key="index"
                        :value="item.name">
                    {{$t(item.desc)}}
                </Option>
            </Select>
            <br>
            <Input v-model.trim="queryParams.keyWord" :placeholder="$t('fundPlaceholder')"/><!--请输入姓名、电话、会员编号-->
            <Button type="primary" @click="queryList">{{$t('query')}}</Button>
            <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
        </div>
        <table-com
            v-if="tableShow"
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
                show-overflow-tooltip
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    {{scoped.row.id}}
                    <span class="frozen-cla">{{scoped.row.cardStatus === 'frozen' ? $t('memberStatusFrozen') : ''}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                show-overflow-tooltip
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
                slot="column7"
                show-overflow-tooltip
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    {{scoped.row.moneyBalance | moneyFilter}}{{getUnit(scoped.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column8"
                show-overflow-tooltip
                :label="row.title"
                :prop="row.field"
                :key="row.index"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth"
                slot-scope="row">
                <template slot-scope="scoped">
                    <ul class="operate-list">
                        <li @click="toDetail(scoped.row)">{{$t('details')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './fundConfig';
    import ajax from '@/api/index.js';
    import { cardStatusEnum, genderEnum } from '@/assets/js/constVariable';
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            tableCom,
            breadCrumbHead
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'fundInfo',
                        router : {
                            name : 'fundInfo'
                        }
                    }
                ],
                // 查询数据
                queryParams : {
                    keyWord : '',
                    //会员等级id
                    levelId : 'all',
                    //渠道id
                    channelId : 'all',
                    //会员卡状态
                    cardStatus : 'null',
                    //账户类型
                    accountTypeId : ''
                },
                //枚举数据
                enumData : {
                    //会员级别
                    level : [],
                    //会员渠道
                    channel : [],
                    //会员状态
                    cardStatusEnum : cardStatusEnum,
                    //性别
                    genderEnum : genderEnum,
                },
                //表头配置
                columnData : columnData,
                // 表格数据
                tableData : [],
                //总条数
                totalCount : 0,
                //页码
                pageNo : 1,
                //每页条数
                pageSize : 10,
                //账户列表
                accountList : [],
                //全部的账户id列表
                accountIds : [],
                //会员中心初始化，用于重置查询条件时重置账户类型
                accountTypeIdInit : ''
            };
        },
        created () {
            //查询会员级别
            this.queryMemberLevels();
            //查询渠道列表
            this.queryChannelSet();
        },
        methods : {
            //查询会员级别
            queryMemberLevels () {
                ajax.post('queryMemberLevels', {
                    pageNo : 1,
                    pageSize : 99999,
                    isDeleted : 'false',
                }).then(res => {
                    if (res.success) {
                        this.enumData.level = res.data.data || [];
                    } else {
                        this.$Message.warning(res.message || 'queryMemberLevels ' + this.$t('queryFailure') + '！');
                    }
                });
            },
            //查询渠道列表
            queryChannelSet () {
                ajax.post('queryChannelSet', {
                    pageNo : 1,
                    pageSize : 99999,
                    isDeleted : 'false',
                }).then(res => {
                    if (res.success) {
                        this.enumData.channel = res.data.data || [];
                    } else {
                        this.$Message.warning('queryChannelSet ' + this.$t('queryFailure') + '！');
                    }
                });
            },
            /**
             * 储值账户列表
             */
            queryList () {
                ajax.post('queryChargingList',{
                    levelId : this.queryParams.levelId !== 'all' ? this.queryParams.levelId : '',
                    channelId : this.queryParams.channelId !== 'all' ? this.queryParams.channelId : '',
                    cardStatus : this.queryParams.cardStatus !== 'null' ? this.queryParams.cardStatus : '',
                    accountTypeIds : this.queryParams.accountTypeId !== 'all' ? this.queryParams.accountTypeId : this.accountIds.join(','),
                    pageNo : this.pageNo,
                    pageSize : this.pageSize,
                    keyword : this.queryParams.keyWord,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data.data ? res.data.data : [];
                        this.totalCount = res.data.totalRow;
                    } else {
                        this.tableData = [];
                        this.totalCount = 0;
                    }
                }).catch(err => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 获取枚举数据展示字段
             * @param name String 枚举字段名
             * @param val String 值
             */
            getEnumFieldShow ( name, val ) {
                let obj = this.enumData[name].find((item) => val === item.name);
                return obj ? this.$t(obj.desc) : '';
            },
            //重置查询数据
            reset () {
                this.queryParams.keyWord = "";
                this.queryParams.accountTypeId = this.accountTypeIdInit ? this.accountTypeIdInit : 'all';
                this.queryParams.levelId = "all";
                this.queryParams.channelId = "all";
                this.queryParams.cardStatus = "null";
                this.queryList();
            },
            /**
             * 查询账户类型
             */
            queryMemberAccountDefine () {
                this.accountIds = [];
                ajax.post('queryMemberAccountDefine',{
                    accountType : 'charging',
                    pageNo : 1,
                    pageSize : 99999
                }).then(res => {
                    if (res.success) {
                        this.accountList = res.data ? res.data.data.filter(item => {
                            //如果是多账户可以显示除了默认账户外的其它账户
                            if (this.isMutipleAccount) {
                                //如果是售卖型会员卡，才可以显示开卡账户
                                if (this.cardIsSaling) {
                                    return true;
                                } else {
                                    return item.id !== '4';
                                }
                            } else {
                                //如果是售卖型会员卡，才可以显示开卡账户
                                if (this.cardIsSaling) {
                                    return item.id === '4' || item.id === '1';
                                } else {
                                    return item.id === '1';
                                }
                            }
                        }) : [];
                        this.accountList.forEach(item => {
                            this.accountIds.push(item.id);
                        });
                    } else {
                        this.accountList = [];
                    }
                }).catch(() => {
                    this.accountList = [];
                }).finally(() => {
                    this.accountList.unshift({
                        id : 'all',
                        accountName : this.$t('all')
                    });
                });
            },
            /**
             * 获取路由信息
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    this.queryParams.accountTypeId = params.id;
                    this.accountTypeIdInit = params.id;
                }
            },
            /**
             * 动态给行添加类名
             * @param row
             */
            rowClassName (row) {
                if (row.row.cardStatus === "frozen") {
                    return 'frozen-tr';
                }
            },
            /**
             * 跳转到个人资金明细
             * @param data
             */
            toDetail (data) {
                this.$router.push({
                    name : 'perFundDetail',
                    params : {
                        fundDetail : {
                            id : data.accountId,
                            accountDefineId : data.accountTypeId
                        }
                    }
                });
            },
            /**
             * 获取账户单位信息
             * @param rowData
             */
            getUnit (rowData) {
                if (rowData.accountTypeId === '1') {
                    return this.$t('yuan');
                } else if (rowData.unit) {
                    return this.$t(rowData.unit);
                } else {
                    return '';
                }
            }
        },
        beforeRouteEnter (to,from,next) {
            next(vm => {
                vm.queryMemberAccountDefine();
            });
        },
        computed : {
            //表格是否显示
            tableShow () {
                return !!this.queryParams.accountTypeId;
            },
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
            //是否是多账户类型
            isMutipleAccount () {
                return this.memberConfigInfo && this.memberConfigInfo['accountPattern'] && this.memberConfigInfo['accountPattern'] === 'multiple';
            },
        }
    };
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

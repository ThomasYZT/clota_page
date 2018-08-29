<template>
    <!--会员管理--会员信息-->
    <div class="member-information">

        <div class="filter-wrap">
            <Select v-model="queryParams.levelId" @on-change="queryList">
                <Option v-for="(level, index) in enumData.level" :key="index"
                        :value="level.id">{{$t(level.levelDesc)}}
                </Option>
            </Select>
            <Select v-model="queryParams.channelId" @on-change="queryList">
                <Option v-for="(channel, index) in enumData.channel" :key="index"
                        :value="channel.id">{{$t(channel.channelName)}}
                </Option>
            </Select>
            <Select v-model="queryParams.vipStatus" @on-change="queryList">
                <Option v-for="(item,index) in enumData.vipStatusEnum" :key="index"
                        :value="item.name">{{$t(item.desc)}}
                </Option>
            </Select>
            <Select v-model="queryParams.cardStatus" @on-change="queryList">
                <Option v-for="(item,index) in enumData.cardStatusEnum"
                        :key="index"
                        :value="item.name">{{$t(item.desc)}}
                </Option>
            </Select>
        </div>

        <div class="search-wrap">
            <Input v-model.trim="queryParams.keyWord" :placeholder="$t('memberPlaceholder')"/>
            <Button type="primary" @click="queryList">{{$t("query")}}</Button>
            <Button type="ghost" @click="reset">{{$t("reset")}}</Button>
        </div>

        <div class="btn-wrap">
            <Button type="primary" @click="add">+ {{$t("addMember")}}</Button>
        </div>

        <div class="table-wrap">
            <table-com
                :ofsetHeight="170"
                :show-pagination="true"
                :column-data="infoListHead"
                :table-data="tableData"
                :total-count="total"
                :row-class-name="rowClassName"
                :page-no-d.sync="queryParams.pageNo"
                :page-size-d.sync="queryParams.pageSize"
                :border="true"
                :row-click="true"
                :row-click-able="true"
                @query-data="queryList"
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
                        <span class="red-color" v-if="scoped.row.cardStatus ==='frozen'">{{$t("memberStatusFrozen")}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                </el-table-column>
                <el-table-column
                    slot="column3"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
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
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ getEnumFieldShow('vipStatusEnum', scoped.row.status) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column7"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.moneyBalance ? scoped.row.moneyBalance.toCurrency()+$t("yuan") : '' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column8"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ scoped.row.createdTime ? new Date(scoped.row.createdTime).format('yyyy-MM-dd') : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column9"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    fixed="right"
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <ul class="operate-list">
                            <li class="blue-label" @click="modifyData($event,scoped.row)">{{$t("modify")}}</li>
                            <li class="red-label" @click="deleteMemberInfo($event,scoped.row)">{{$t("del")}}</li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </div>

    </div>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {infoListHead} from './infoListConfig';
    import { vipLevel, vipChannel, vipStatusEnum, cardStatusEnum, genderEnum } from '@/assets/js/constVariable';

    export default {
        components: { tableCom },
        data () {
            return {
                // 查询数据 keyWord-搜索关键字，levelId-会员级别Id，channelId-会员渠道Id，vipStatus-会员类型，cardStatus-会员状态
                queryParams: {
                    keyWord: '',
                    levelId: 'null',
                    channelId: 'null',
                    vipStatus: 'null',
                    cardStatus: 'null',
                    pageNo: 1,
                    pageSize: 10,
                },
                //枚举数据
                enumData: {
                    //会员级别
                    level: vipLevel,
                    //会员渠道
                    channel: vipChannel,
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
            }
        },
        created(){
            //查询列表
            this.queryList();
            this.getLevelList();
            this.getChannelList();
        },
        methods: {
            // 获取会员级别列表
            getLevelList() {
                ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.$set(this.enumData, 'level', this.enumData.level.concat(res.data.data || []));
                    } else {
                        this.$Message.warning('queryChannelSet 查询失败！');
                    }
                })
            },

            // 获取会员渠道列表
            getChannelList() {
                ajax.post('queryChannelSet', {
                    companyId: '',
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.$set(this.enumData, 'channel', this.enumData.channel.concat(res.data.data || []));
                    } else {
                        this.$Message.warning('queryChannelSet 查询失败！');
                    }
                })
            },

            //新增会员
            add () {
                this.$router.push({ name: 'addMember', query: { type: 'add' }});
            },

            //编辑会员
            modifyData ( event, data ) {
                event.stopPropagation();
                this.$router.push({ name: 'addMember', query: { type: 'modify', info: data }});
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                ajax.post('queryMemberPage', {
                    keyWord: this.queryParams.keyWord,
                    levelId: this.queryParams.levelId == 'null' ? "" : this.queryParams.levelId,
                    channelId: this.queryParams.channelId == 'null' ? "" : this.queryParams.channelId,
                    vipStatus: this.queryParams.vipStatus == 'null' ? "" : this.queryParams.vipStatus,
                    cardStatus: this.queryParams.cardStatus == 'null' ? "" : this.queryParams.cardStatus,
                    pageNo: this.queryParams.pageNo,
                    pageSize: this.queryParams.pageSize,
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data.data || [];
                        this.total = res.data.totalRow || 0;
                    } else {
                        this.$Message.warning('queryMemberPage 查询失败！');
                    }
                })
            },

            //点击表格行常看详情
            viewDetail ( data ) {
                this.$router.push({ name: 'infoDetail', params: { detail: data } });
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
                this.queryParams.levelId = this.queryParams.channelId = this.queryParams.vipStatus = this.queryParams.cardStatus = 'null';
                this.queryList();
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

            /deep/ .frozen-tr{
                color: $color_gray;
            }
        }

        .page-wrap{
            margin-top: 30px;
            text-align: center;
        }

    }
</style>

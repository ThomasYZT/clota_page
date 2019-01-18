<template>
    <!--会员管理--会员信息-->
    <div class="member-information">

        <div class="filter-wrap">
            <!--会员卡类型-->
            <Select v-model="queryParams.cardTypeId"
                    :style="{ width : lang === 'en' ? '240px' : '180px' }"
                    @on-change="cardTypeChange">
                <Option v-for="item in memberCardTypesList"
                        :key="item.label"
                        class="overflow-tip-list"
                        v-w-title="$t(item.label)"
                        :value="item.value">
                    {{$t(item.label)}}
                </Option>
            </Select>
            <!--会员等级-->
            <Select v-model="queryParams.levelId" @on-change="queryList">
                <Option v-for="(level, index) in enumData.level"
                        :key="index"
                        :value="level.id">
                    {{$t(level.levelDesc)}}
                </Option>
            </Select>
            <!--会员渠道-->
            <Select v-model="queryParams.channelId"
                    @on-change="queryList"
                    style="width : 190px">
                <Option v-for="(channel, index) in enumData.channel"
                        :key="index"
                        :value="channel.id">
                    {{$t(channel.channelName)}}
                </Option>
            </Select>
            <!--会员类型-->
            <!--<Select v-model="queryParams.vipStatus" @on-change="queryList">-->
                <!--<Option v-for="(item,index) in enumData.vipStatusEnum"-->
                        <!--:key="index"-->
                        <!--:value="item.name">-->
                    <!--{{$t(item.desc)}}-->
                <!--</Option>-->
            <!--</Select>-->
            <!--会员状态-->
            <Select v-model="queryParams.cardStatus" @on-change="queryList">
                <Option v-for="(item,index) in enumData.cardStatusEnum"
                        :key="index"
                        :value="item.name">
                    {{$t(item.desc)}}
                </Option>
            </Select>
        </div>
        <!--关键字查询-->
        <div class="search-wrap">
            <Input v-model.trim="queryParams.keyWord"
                   :placeholder="$t('memberPlaceholder')"
                   :style="{width : lang === 'zh-CN' ? '250px' : '400px'}"
                   @on-enter="queryList"/>
            <Button type="primary" @click="queryList">{{$t("query")}}</Button>
            <Button type="ghost" @click="reset">{{$t("reset")}}</Button>
        </div>

        <!--会员3期暂时去掉-->
        <!--<div class="btn-wrap">-->
            <!--<Button type="primary" @click="add">+ {{$t("addMember")}}</Button>-->
        <!--</div>-->

        <div class="table-wrap">
            <table-com
                :ofsetHeight="163"
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
                    show-overflow-tooltip
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
                    slot="column3"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        {{$t(scoped.row.gender) | contentFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="false"
                    slot="column5"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ $t(getEnumFieldShow('vipStatusEnum', scoped.row.memberType)) | contentFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="showMemberPoint"
                    slot="column6"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        {{scoped.row.pointBalance | contentFilter}}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="showMemberRecharge"
                    slot="column7"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        {{ scoped.row.moneyBalance | moneyFilter | contentFilter }}{{$t('yuan')}}
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
                        <span>{{ scoped.row.createdTime | timeFormat('yyyy-MM-dd') | contentFilter }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="canModifyMemberInfo"
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
                            <!--<li class="red-label" @click="deleteMemberInfo($event,scoped.row)">{{$t("del")}}</li>-->
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
    import { infoListHead } from './infoListConfig';
    import { mapGetters } from 'vuex';
    import { vipLevel, vipChannel, vipStatusEnum, cardStatusEnum, genderEnum } from '@/assets/js/constVariable';

    export default {
        components : { tableCom },
        data () {
            return {
                // 查询数据 keyWord-搜索关键字，levelId-会员级别Id，channelId-会员渠道Id，vipStatus-会员类型，cardStatus-会员状态
                queryParams : {
                    keyWord : '',
                    levelId : 'null',
                    channelId : 'null',
                    vipStatus : 'null',
                    cardStatus : 'null',
                    pageNo : 1,
                    pageSize : 10,
                    //会员卡类型
                    cardTypeId : 'all'
                },
                //枚举数据
                enumData : {
                    //会员级别
                    level : vipLevel,
                    //会员渠道
                    channel : vipChannel,
                    //会员类型
                    vipStatusEnum : vipStatusEnum,
                    //会员状态
                    cardStatusEnum : cardStatusEnum,
                    //性别
                    genderEnum : genderEnum,
                    //会员卡类型
                    memberCardTypes : []
                },
                //列表表头
                infoListHead : infoListHead,
                //列表数据(表格数据取统一字段名)
                tableData : [],
                //列表总条数
                total : 0,
            };
        },
        created () {
            // this.getLevelList();
            this.getChannelList();
            this.queryCardTypeList();
        },
        computed : {
            ...mapGetters({
                lang : 'lang',
                memberConfigInfo : 'memberConfigInfo',
                permissionInfo : 'permissionInfo',
            }),
            //是否可以修改会员信息
            canModifyMemberInfo () {
                return this.permissionInfo && this.permissionInfo['modifyMembersInfo'] === 'allow';
            },
            //是否可以显示会员积分账户信息
            showMemberPoint () {
                return this.memberConfigInfo && this.memberConfigInfo['memberPoint'] && this.memberConfigInfo['memberPoint'] === 'true';
            },
            //是否可以显示会员储值账户信息
            showMemberRecharge () {
                return this.memberConfigInfo && this.memberConfigInfo['memberRecharge'] && this.memberConfigInfo['memberRecharge'] === 'true';
            },
            //是否是售卖型会员卡
            cardIsSale () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'sale' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //是否是成长型会员卡
            cardIsGrowth () {
                return this.memberConfigInfo &&
                    this.memberConfigInfo['cardType'] &&
                    (this.memberConfigInfo['cardType'] === 'growth' ||
                        this.memberConfigInfo['cardType'] === 'sale_growth');
            },
            //会员卡类型数据
            memberCardTypesList () {
                let result = [];
                if (this.cardIsSale && this.cardIsGrowth) {
                    result = this.enumData.memberCardTypes;
                } else if (this.cardIsSale) {
                    result = this.enumData.memberCardTypes.filter(item => item.cardForm === 'sale');
                } else if (this.cardIsGrowth) {
                    result = this.enumData.memberCardTypes.filter(item => item.cardForm === 'growth');
                } else {
                    result = [];
                }
                return [].concat([
                    {
                        label : 'allMemCardTyps',
                        value : 'all'
                    }
                ],result);
            }
        },
        methods : {
            // 获取会员级别列表
            // getLevelList () {
            //     ajax.post('queryMemberLevels', {
            //         pageNo : 1,
            //         pageSize : 99999,
            //         isDeleted : 'false',
            //     }).then(res => {
            //         if (res.success) {
            //             this.$set(this.enumData, 'level', this.enumData.level.concat(res.data.data || []));
            //         }
            //     });
            // },

            // 获取会员渠道列表
            getChannelList () {
                ajax.post('queryChannelSet',{
                    pageNo : 1,
                    pageSize : 999999,
                    isDeleted : false
                }).then(res => {
                    if (res.success) {
                        this.$set(this.enumData, 'channel', this.enumData.channel.concat(res.data.data || []));
                    }
                });
            },

            // //新增会员
            // add () {
            //     this.$router.push({ name : 'addMember', query : { type : 'add' } });
            // },

            //编辑会员
            modifyData ( event, data ) {
                if (!this.canModifyMemberInfo) return;
                event.stopPropagation();
                this.$router.push({
                    name : 'addMember',
                    query : { type : 'modify' },
                    params : data
                });
            },

            //查询列表(查询表格取统一的方法名)
            queryList () {
                ajax.post('queryMemberPage', {
                    keyWord : this.queryParams.keyWord,
                    levelId : this.queryParams.levelId === 'null' ? "" : this.queryParams.levelId,
                    channelId : this.queryParams.channelId === 'null' ? "" : this.queryParams.channelId,
                    vipStatus : this.queryParams.vipStatus === 'null' ? "" : this.queryParams.vipStatus,
                    cardStatus : this.queryParams.cardStatus === 'null' ? "" : this.queryParams.cardStatus,
                    pageNo : this.queryParams.pageNo,
                    pageSize : this.queryParams.pageSize,
                    cardTypeId : this.queryParams.cardTypeId === 'all' ? "" : this.queryParams.cardTypeId,
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.data : [];
                        this.total = res.data.totalRow || 0;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                    }
                });
            },

            //点击表格行常看详情
            viewDetail ( data ) {
                this.$router.push({ name : 'infoDetail', params : { detail : data } });
            },

            // //删除表格数据
            // deleteMemberInfo ( event, data ) {
            //     event.stopPropagation();
            //     ajax.post('deleteMemberInfo', {
            //         memberId : data.id,
            //     }).then(res => {
            //         if (res.success) {
            //             this.$Message.success(this.$t('successTip', { tip : this.$t('del') }) + '！'); // 删除成功
            //             this.queryList();
            //         } else {
            //             this.$Message.warning('deleteMemberInfo ' + this.$t('failureTip', { tip : this.$t('del') }) + '！'); // 删除失败
            //         }
            //     });
            // },

            /**
             * 获取枚举数据展示字段
             * @param{String} name  枚举字段名
             * @param{String} val  值
             * @return 枚举值的值
             */
            getEnumFieldShow ( name, val ) {
                let obj = this.enumData[name].find((item) => val === item.name);
                return obj ? obj.desc : '';
            },

            //重置查询数据
            reset () {
                this.queryParams.keyWord = "";
                this.queryParams.levelId = this.queryParams.channelId = this.queryParams.vipStatus = this.queryParams.cardStatus = 'null';
                this.queryParams.cardTypeId = 'all';
                this.queryList();
            },

            /**
             * 动态给行添加类名
             * @param{Object} row
             * @return 冻结的行的类名
             */
            rowClassName (row) {
                if (row.row.cardStatus === "frozen") {
                    return 'frozen-tr';
                }
            },
            /**
             * 获取所有会员卡类型
             */
            queryCardTypeList () {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success) {
                        this.$set(this.enumData, 'memberCardTypes', this.enumData.memberCardTypes.concat(res.data ? res.data.map(item => {
                            return {
                                label : item.typeName,
                                value : item.id,
                                cardForm : item.cardForm,
                            };
                        }) : []));
                    }
                });
            },
            /**
             * 根据会员类别获取会员级别
             * @param{String} cardTypeId 会员类别id
             */
            queryLevelsByCardType (cardTypeId) {
                ajax.post('queryLevelsByCardType',{
                    cardTypeId : cardTypeId
                }).then(res => {
                    if (res.success) {
                        this.$set(this.enumData, 'level', [].concat(this.enumData.level[0],res.data ? res.data : []));
                        this.queryParams.levelId = 'null';
                        this.queryList();
                    }
                });
            },
            /**
             * 会员卡类别修改，
             * @param{String} cardTypeId 会员类别id
             */
            cardTypeChange (cardTypeId) {
                if (cardTypeId === 'all') {
                    this.queryParams.levelId = 'null';
                    this.enumData.level = this.enumData.level.slice(0,1);
                    // this.$set(this.enumData, 'level', this.enumData.level[0]);
                    this.queryList();
                } else {
                    this.queryLevelsByCardType(cardTypeId);
                }
            }
        }
    };
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

        /*.btn-wrap{*/
            /*padding: 0 30px;*/
            /*margin-bottom: 15px;*/
        /*}*/

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

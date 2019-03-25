<template>
    <!--会员管理--会员卡券-->
    <div class="member-card">
        <div class="header-toolbox">
            <div class="left-tool">
                <div class="btn-wrap" v-if="canAddMembersCoupon">
                    <!--新增卡券-->
                    <!--<Button class="function-btn" type="primary" @click="add">+ {{$t('newCardCoupon')}}</Button>-->
                    <!--新增卡券 版本2-->
                    <Button class="function-btn" type="primary" @click="add2">+ {{$t('newCardCoupon')}}</Button>
                    <!--商品管理-->
                    <Button class="function-btn" type="primary" @click="toGoodsManage">{{$t('goodsManage')}}</Button>
                    <!--H5背景设置-->
                    <!--<Button class="function-btn" type="ghost" @click="H5Setting">{{$t('H5Setting')}}</Button>-->
                </div>
            </div>
            <div class="right-tool">
                <div class="input-wrap">
                    <Input class="input-field"
                           v-model.trim="filterParam.keyword"
                           icon="ios-search"
                           :placeholder="$t('inputField', {field: $t('coupon') + $t('name') + ' / ' + $t('batchNumber') + ' / ' + $t('ticketYard')})"
                           @on-enter="queryList"
                           @on-click="queryList" />
                    <!--搜索-->
                    <Button type="primary" @click="queryList">{{$t('searching')}}</Button>
                </div>
            </div>
        </div>

        <div class="filter-head">
            <!-- 应用场景 -->
            <div class="select-wrap">
                <span class="label-title">{{$t('applicationScenario')}}</span>
                <Select v-model="filterParam.appScene"
                        :style="{width : lang === 'en' ? '150px' : '180px'}"
                        @on-change="queryList">
                    <Option v-for="item in cardScenarioList"
                            :value="item.value"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
            <!-- 是否有效 -->
            <div class="select-wrap">
                <span class="label-title">{{$t('wetherEffective')}}</span>
                <Select v-model="filterParam.inTime"
                        :style="{width : lang === 'en' ? '150px' : '180px'}"
                        @on-change="queryList">
                    <Option v-for="item in cardValidList"
                            :value="item.value"
                            :key="item.value">{{ $t(item.label) }}</Option>
                </Select>
            </div>
            <div class="tool-box"
                 :class="{ 'en-tool-box' : lang === 'en' }">
                <!-- 导出记录 -->
                <span class="text-btn" @click="toRecord('export')">{{$t('exportRecord')}}</span>
                <!-- 生成链接记录 -->
                <span class="text-btn" @click="toRecord('link')">{{$t('generateLinkRecord')}}</span>
                <!-- 会员权益优惠券推送记录 -->
                <span class="text-btn" @click="toRecord('push')">{{$t('benefitCouponPushRecord')}}</span>
            </div>
        </div>

        <!--表格-->
        <table-com
            :ofset-height="166"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :page-no-d.sync="filterParam.pageNo"
            :page-size-d.sync="filterParam.pageSize"
            :total-count="totalCount"
            :row-class-name="rowClassName"
            @query-data="queryList">
            <!-- 优惠券类型 -->
            <el-table-column
                slot="column2"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row['couponType']) | contentFilter}}
                </template>
            </el-table-column>
            <!-- 应用场景 -->
            <el-table-column
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row['appScene'] ? $t('coupon.' + scope.row['appScene']) : '-'}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getUseCondition(scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span v-if="scope.row.appScene === 'spread'">{{scope.row.effectiveTime | timeFormat('yyyy-MM-dd')}}--{{scope.row.expireTime | timeFormat('yyyy-MM-dd')}}</span>
                    <span v-else>{{scope.row.effDays + $t('day')}}</span>
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                show-overflow-tooltip
                slot-scope="row"
                fixed="right"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <!-- 卡券详情 -->
                        <li @click="showDetail(scope.row)">{{$t('detail')}}</li>
                        <!-- 查看券码 仅传播型优惠券有查看券码的操作 -->
                        <li v-if="scope.row.appScene === 'spread'" @click="viewCouponCode(scope.row)">{{$t('viewCouponCode')}}</li>
                        <!-- 只有传播型的、有操作权限的优惠券才能展示以下操作 -->
                        <template v-if="scope.row.appScene === 'spread' && canOperateMembersCoupon">
                            <!-- 导出券码 -->
                            <li :class="{disabled : isObsolote(scope.row) || isSpreadExpired(scope.row) }" @click="exportCouponCode(scope.row)">{{$t('exportCouponCode')}}</li>
                            <!-- 生成链接 -->
                            <li :class="{disabled : isObsolote(scope.row) || isSpreadExpired(scope.row) }" @click="generateLink(scope.row)">{{$t('generateLink')}}</li>
                            <!-- 作废 -->
                            <li v-if="!isObsolote(scope.row)" :class="{disabled : isSpreadExpired(scope.row) }" @click="obsoloteCoupon(scope.row, 'spread')" class="red-label" >{{$t('obsolete')}}</li>
                            <!-- 重启 -->
                            <li v-else class="yellow-btn" :class="{disabled : isSpreadExpired(scope.row) }" @click="reloadCoupon(scope.row, 'spread')">{{$t('restart')}}</li>
                        </template>
                        <!-- 只有权益型的、有操作权限的优惠券才能展示以下操作 -->
                        <template v-else-if="scope.row.appScene === 'right' && canOperateMembersCoupon">
                            <!-- 手动推送 可以无限推送 -->
                            <li :class="{disabled : isObsolote(scope.row) || isRightExpired(scope.row) }" @click="manualPush(scope.row)">{{$t('manualPush')}}</li>
                            <!-- 作废 -->
                            <li v-if="isObsolote(scope.row)" :class="{disabled : isRightExpired(scope.row) }" @click="obsoloteCoupon(scope.row, 'right')" class="red-label" >{{$t('obsolete')}}</li>
                            <!-- 重启 -->
                            <li v-else class="yellow-btn" :class="{disabled : isRightExpired(scope.row) }" @click="reloadCoupon(scope.row, 'right')">{{$t('restart')}}</li>
                        </template>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal v-model="visible"
                   @confirm-del="deleteCardFunc"
                   :coupon-data="currentData">
        </del-modal>

        <!-- 查看券码模态框 -->
        <viewCodeModal ref="viewCodeModal"></viewCodeModal>
        <!-- 导出券码模态框 -->
        <exportCodeModal ref="exportCodeModal"></exportCodeModal>
        <!-- 生成链接模态框 -->
        <generateLinkModal ref="generateLinkModal"></generateLinkModal>
        <!-- 作废模态框 -->
        <obsoleteModal ref="obsoleteModal" @updateList="queryList"></obsoleteModal>
        <!-- 手动推送模态框 -->
        <manualPushModal ref="manualPushModal"></manualPushModal>
        <!-- 优惠券领取H5页面背景设置模态框 -->
        <backgroundSettingModal ref="backgroundSettingModal"></backgroundSettingModal>

    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import viewCodeModal from './components/viewCodeModal';
    import exportCodeModal from './components/exportCodeModal';
    import generateLinkModal from './components/generateLinkModal';
    import obsoleteModal from './components/obsoleteModal';
    import manualPushModal from './components/manualPushModal';
    import backgroundSettingModal from './components/backgroundSettingModal';
    import { columnData } from './cardConfig';
    import delModal from './components/delModal';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { cardValid, cardScenario } from '../../../../assets/js/constVariable';
    import { mapGetters } from 'vuex';
    import ajax from '@/api/index.js';

    export default {
        components : {
            tableCom,
            delModal,
            viewCodeModal,
            exportCodeModal,
            generateLinkModal,
            obsoleteModal,
            manualPushModal,
            backgroundSettingModal,
        },
        data () {
            return {
                //查询接口过滤参数
                filterParam : {
                    //关键字
                    keyword : '',
                    //应用场景
                    appScene : 'all',
                    //是否有效
                    inTime : 'all',
                    //每页记录数量
                    pageSize : 10,
                    //页码
                    pageNo : 1,
                },
                //表格数据
                tableData : [],
                //表格数据总条数
                totalCount : 0,
                //删除模态框是否显示
                visible : false,
                //表头配置
                columnData : columnData,
                //当前操作的行数据
                currentData : {},
                //会员卡是否有效下拉列表数据
                cardValidList : cardValid,
                //会员卡使用场景下拉列表数据
                cardScenarioList : cardScenario,
            };
        },
        methods : {
            /**
             * 新增卡券
             */
            add () {
                this.$router.push({ name : 'addCard', query : { type : 'add' },params : { name : 1 } });
            },
            add2 () {
                this.$router.push({
                    name : 'addCardV2',
                    params : {
                        type : 'add',
                    }
                });
            },
            /**
             *  前往商品管理页面
             */
            toGoodsManage () {
                this.$router.push({
                    name : 'memberGoodsManage',
                });
            },
            /**
             *  优惠券领取H5页面背景设置
             */
            H5Setting () {
                this.$refs.backgroundSettingModal.show();
            },
            /**
             *  进入记录页面
             *  @param type 记录类型
             */
            toRecord (type) {
                this.$router.push({
                    name : 'couponRecord',
                    params : {
                        type : type,
                    }
                });
            },
            /**
             *  查看卡券详情
             *  @param rowData 券数据
             */
            showDetail (rowData) {
                this.$router.push({
                    name : 'addCardV2',
                    params : {
                        type : 'check',
                        rowData : rowData
                    }
                });
            },
            /**
             *  查看券码
             *  @param rowData 券数据
             */
            viewCouponCode (rowData) {
                this.$refs.viewCodeModal.show(rowData);
            },
            /**
             *  导出券码
             *  @param rowData 券数据
             */
            exportCouponCode (rowData) {
                if (this.isObsolote(rowData) || this.isSpreadExpired(rowData)) return false;
                this.$refs.exportCodeModal.show(rowData);
            },
            /**
             *  生成链接
             *  @param rowData 券数据
             */
            generateLink (rowData) {
                if (this.isObsolote(rowData) || this.isSpreadExpired(rowData)) return false;
                this.$refs.generateLinkModal.show(rowData);
            },
            /**
             *  手动推送
             *  @param rowData 券数据
             */
            manualPush (rowData) {
                if (this.isObsolote(rowData) || this.isRightExpired(rowData)) return false;
                this.$refs.manualPushModal.show(rowData);
            },
            /**
             * 修改券
             * @param data
             */
            modifyFunc ( data ) {
                this.$router.push({
                    name : 'addCard',
                    query : { type : 'modify' },
                    params : this.getUpdateCouponParams(data)
                });
            },
            /**
             *  根据优惠券是否作废判断按钮是否禁用
             *  @param type
             *  @param rowData
             */
            isObsolote (rowData) {
                //判断是否作废
                return rowData.status === 'valid';
            },
            /**
             * 判断传播型优惠券是否过期
             * @param rowData 券数据
             */
            isSpreadExpired (rowData) {
                if (rowData.effectiveTime && rowData.expireTime) {
                    if (new Date() >= new Date(rowData.effectiveTime) &&
                        new Date() <= new Date(new Date(rowData.expireTime).getTime() + 24 * 60 * 60 * 1000 - 1)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
            /**
             * 判断权益型优惠券是否过期
             * @param rowData 券数据
             */
            isRightExpired (rowData) {
                if (rowData.createdTime && rowData.effDays) {
                    if (new Date() >= new Date(rowData.createdTime) &&
                        new Date() <= new Date(new Date(rowData.createdTime).getTime() + rowData.effDays * 24 * 60 * 60 * 1000 - 1)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            },
            /**
             * 作废券
             * @param rowData 券数据
             * @param couponType 卡券类型
             */
            obsoloteCoupon ( rowData, couponType ) {
                if (couponType === 'spread' && this.isSpreadExpired(rowData)) return false;
                if (couponType === 'right' && this.isRightExpired(rowData)) return false;
                this.$refs.obsoleteModal.show(rowData);
            },

            /**
             * 重新启用券
             * @param rowData 券数据
             * @param couponType 卡券类型
             */
            reloadCoupon (rowData, couponType) {
                if (couponType === 'spread' && this.isSpreadExpired(rowData)) return false;
                if (couponType === 'right' && this.isRightExpired(rowData)) return false;
                ajax.post('updateCouponStatus', {
                    id : rowData.id,
                    status : 'valid',
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip',{ tip : this.$t('commissioned') }));
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('failureTip',{ tip : this.$t('commissioned') }));
                    }
                });
            },

            /**
             * 显示删除的模态框
             * @param data
             */
            showModal (data) {
                this.visible = true;
                this.currentData = data;
            },

            /**
             * 删除券
             */
            deleteCardFunc () {
                let params = this.getUpdateCouponParams(this.currentData);
                ajax.post('updateCouponStatus',Object.assign({
                    isDeleted : 'true'
                },params)).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('del') })); // 删除成功
                        this.queryList();
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }) ); // 删除失败
                    }
                });
            },

            /**
             * 查询新建的会员卡券信息
             */
            queryList () {
                let params = defaultsDeep({}, this.filterParam);
                params.appScene = params.appScene === 'all' ? '' : params.appScene;
                params.inTime = params.inTime === 'all' ? '' : params.inTime;
                ajax.post('queryCouponsList', params).then(res => {
                   if (res.success) {
                       this.tableData = res.data.data ? res.data.data : [];
                       this.totalCount = res.data.totalRow;
                   } else {
                       this.tableData = [];
                       this.totalCount = 0;
                   }
                }).catch(() => {
                    this.tableData = [];
                    this.totalCount = 0;
                });
            },
            /**
             * 获取卡券使用条件
             * @param rowData
             */
            getUseCondition (rowData) {
                if (rowData.couponType === 'discount_coupon') {//折扣券
                    return this.$t('discountCouponUseConditions',{ minCash : rowData.conditionLowerLimtation,maxCash : rowData.conditionUpperLimtation });
                } else if (rowData.couponType === 'exchange_coupon') {//兑换券
                    return this.$t('only',{ msg : rowData.remark });
                } else if (rowData.couponType === 'cash_coupon') {//代金券
                    return this.$t('overTipCanUse',{ money : rowData.conditionLowerLimtation });
                }
            },
            /**
             * 获取编辑卡券的参数
             */
            getUpdateCouponParams (data) {
                if (data.couponType === 'cash_coupon') {//代金券
                    return {
                        id : data.id,
                        couponName : data.couponName,
                        couponType : data.couponType,
                        nominalValue : String(data.nominalValue),
                        conditionLowerLimtation : String(data.conditionLowerLimtation),
                        effectiveTime : new Date(data.effectiveTime.replace(/-/g,'/')),
                        expireTime : new Date(data.expireTime.replace(/-/g,'/')),
                        price : String(data.price),
                        isDiscountCoexist : data.isDiscountCoexist,
                        isEffectBeforeDiscount : data.isEffectBeforeDiscount,
                        conditionChannelId : data.conditionChannelId,
                        conditionOrgId : data.conditionOrgId,
                    };
                } else if (data.couponType === 'exchange_coupon') {//兑换券
                    return {
                        id : data.id,
                        couponName : data.couponName,
                        couponType : data.couponType,
                        effectiveTime : new Date(data.effectiveTime.replace(/-/g,'/')),
                        expireTime : new Date(data.expireTime.replace(/-/g,'/')),
                        price : String(data.price),
                        conditionChannelId : data.conditionChannelId,
                        conditionProductId : data.conditionProductId,
                        singleStoreId : data.conditionOrgId,
                    };
                } else if (data.couponType === 'discount_coupon') {//折扣券
                    return {
                        id : data.id,
                        couponName : data.couponName,
                        couponType : data.couponType,
                        nominalValue : String(data.nominalValue),
                        conditionLowerLimtation : String(data.conditionLowerLimtation),
                        conditionUpperLimtation : String(data.conditionUpperLimtation),
                        effectiveTime : new Date(data.effectiveTime.replace(/-/g,'/')),
                        expireTime : new Date(data.expireTime.replace(/-/g,'/')),
                        price : String(data.price),
                        conditionOrgId : data.conditionOrgId,
                        conditionChannelId : data.conditionChannelId,
                    };
                }
            },
            /**
             * 被禁用行样式
             * @param row
             * @return {string} 类名
             * @constructor
             */
            rowClassName ({ row }) {
                if (row.status === "invalid") {
                    return 'disabled-row';
                } else {
                    if (row.appScene === 'spread' && this.isSpreadExpired(row)) return 'disabled-row';
                    // if (row.appScene === 'right' && this.isRightExpired(row)) return 'disabled-row';
                    return '';
                }
            }
        },
        computed : {
            ...mapGetters([
                'permissionInfo',
                'lang'
            ]),
            //是否可以新增卡券
            canAddMembersCoupon () {
                return this.permissionInfo && this.permissionInfo['addMembersCoupon'] === 'allow';
            },
            //是否可以作废和重新启用卡券
            canOperateMembersCoupon () {
                return this.permissionInfo && this.permissionInfo['operateMembersCoupon'] === 'allow';
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .header-toolbox {
            display: flex;
            border: 1px solid #EEEEEE;
            .left-tool {
                flex: 1 0;
                .btn-wrap{
                    height: 50px;
                    padding: 10px 20px 0;

                    .function-btn {
                        margin-right: 10px;
                    }
                }
            }

            .right-tool {
                flex: 1 0;
                .input-wrap {
                    height: 50px;
                    padding: 10px 30px 0;
                    text-align: right;

                    .input-field {
                        margin-right: 10px;
                        width: 350px;

                        /deep/ .ivu-input {
                            height: 30px;
                        }
                    }
                }
            }
        }

        .filter-head {
            line-height: 50px;
            padding-left: 20px;
            .select-wrap {
                margin-right: 20px;
                display: inline-block;
                .label-title {
                    margin-right: 10px;
                }
            }

            .tool-box {
                float: right;
                .text-btn {
                    padding: 0 15px;
                    font-size: 14px;
                    color: $color_blue;
                    cursor: pointer;

                    &:hover {
                        color: #2F70DF;
                    }

                    &:not(:first-child) {
                        position: relative;
                        &:before {
                            content: ' ';
                            position: absolute;
                            top: 50%;
                            left: 0;
                            margin-top: -7.5px;
                            height: 15px;
                            border-left: 1px solid #C5C5C5;
                        }
                    }
                }
            }
        }

        .en-tool-box {
            display: block;
            float: unset !important;
        }

        /deep/ .el-table{
            tr td:nth-of-type(1) .cell,
            tr th:nth-of-type(1) .cell{
                padding-left: 43px!important;
            }
        }

        .operate-list{
            @include table_operate();
        }

        .yellow-btn {
            color: $color_yellow !important;
        }
    }

    /deep/ .disabled-row {
        color: $color_gray;
    }

</style>

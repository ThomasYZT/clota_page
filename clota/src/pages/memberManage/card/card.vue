<template>
    <!--会员管理--会员卡券-->
    <div class="member-card">

        <div class="tabs-wrap">
            <Tabs :animated="false" :value="tabsName" @on-click="changeTab">
                <TabPane label="已创建" name="created"></TabPane>
                <TabPane label="已作废" name="cancellation"></TabPane>
            </Tabs>
        </div>

        <div class="btn-wrap" v-if="tabsName === 'created'">
            <Button type="primary" @click="add">+ {{$t('newCardCoupon')}}</Button><!--新增卡券-->
        </div>
        <!--已创建的卡券信息-->
        <table-com
            v-if="tabsName === 'created'"
            key="created"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="170"
            @query-data="queryList">
            <el-table-column
                slot="column1"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row['couponType'])}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column2"
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
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.effectiveTime | timeFormat('yyyy-MM-dd')}}--{{scope.row.expireTime | timeFormat('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                show-overflow-tooltip
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="modifyFunc(scope.row)">{{$t('modify')}}</li>
                        <li @click="obsoloteCoupon(scope.row)">作废</li>
                        <li class="red-label" @click="showModal(scope.row)">{{$t('del')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
        <!--已作废的卡券信息-->
        <table-com
            v-if="tabsName === 'cancellation'"
            key="cancellation"
            :column-data="columnData"
            :table-data="tableData"
            :border="true"
            :show-pagination="true"
            :total-count="totalCount"
            :ofset-height="110"
            @query-data="queryList">
            <el-table-column
                slot="column1"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{$t(scope.row['couponType'])}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column2"
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
                slot="column3"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.effectiveTime | timeFormat('yyyy-MM-dd')}}--{{scope.row.expireTime | timeFormat('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="150">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li @click="reloadCoupon(scope.row)">重新启用</li>
                        <li class="red-label" @click="showModal(scope.row)">{{$t('del')}}</li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>

        <!--删除模态框-->
        <del-modal v-model="visible"
                   @confirm-del="deleteCardFunc"
                   :coupon-data="currentData">
        </del-modal>

    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './cardConfig';
    import delModal from './delModal';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components : {
            tableCom,
            delModal
        },
        data () {
            return {
                //当前tap值
                tabsName: 'created',
                //表格数据
                tableData: [],
                //删除模态框是否显示
                visible: false,
                //表头配置
                columnData : columnData,
                //表格数据总条数
                totalCount : 0,
                //当前操作的行数据
                currentData : {},
                pageSize : 10,
                pageNo :1
            }
        },
        methods: {

            /**
             * 切换tab
             * @param name
             */
            changeTab (name) {
                this.tabsName = name;
            },

            /**
             * 新增卡券
             */
            add () {
                this.$router.push({ name: 'addCard', query: { type: 'add' },params : {name : 1}});
            },

            /**
             * 修改券
             * @param data
             */
            modifyFunc ( data ) {
                this.$router.push({
                    name: 'addCard',
                    query: { type: 'modify' },
                    params : this.getUpdateCouponParams(data)
                });
            },

            /**
             * 作废券
             * @param data 券数据
             */
            obsoloteCoupon ( data ) {
                let params = this.getUpdateCouponParams(data);
                ajax.post('updateCoupon',defaultsDeep({
                    status : 'invalid'
                },params)).then(res => {
                    if(res.success){
                        this.$Message.success("作废成功！");
                        this.queryList();
                    }else{
                        this.$Message.error('作废失败！');
                    }
                });
            },

            /**
             * 重新启用券
             * @param data 券数据
             */
            reloadCoupon (data) {
                this.$router.push({
                    name: 'addCard',
                    query: { type: 'reLoad' },
                    params : this.getUpdateCouponParams(Object.assign({
                        status :'valid'
                    },data))
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
                ajax.post('updateCoupon',Object.assign({
                    isDeleted : 'true'
                },params)).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip', {tip: 'del'}) + "！");     // 删除成功
                        this.queryList();
                    }else{
                        this.$Message.error(this.$t('failureTip', {tip: 'del'}) + '！');   // 删除失败
                    }
                });
            },

            /**
             * 查询新建的会员卡券信息
             */
            queryList ({pageNo,pageSize} = {pageNo : this.pageNo,pageSize : this.pageSize}) {
                this.pageNo = pageNo;
                this.pageSize = pageSize;
                ajax.post('queryCoupons',{
                    isDeleted : false,
                    status : this.tabsName === 'created' ? 'valid' : 'invalid',
                    pageNo : this.pageNo,
                    pageSize : this.pageSize
                }).then(res => {
                   if(res.success){
                       this.tableData = res.data.data ? res.data.data : [];
                       this.totalCount = res.data.totalRow;
                   }else{
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
            getUseCondition(rowData) {
                if(rowData.couponType === 'discount_coupon'){//折扣券
                    return `最低可使用金额${rowData.conditionLowerLimtation}元最高使用金额${rowData.conditionUpperLimtation}元`
                }else if(rowData.couponType === 'exchange_coupon'){//兑换券
                    return `仅限${rowData.remark}`;
                }else if(rowData.couponType === 'cash_coupon'){//代金券
                    return `满${rowData.conditionLowerLimtation}可用`
                }
            },
            /**
             * 获取编辑卡券的参数
             */
            getUpdateCouponParams (data) {
                if(data.couponType === 'cash_coupon'){//代金券
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
                    }
                }else if(data.couponType === 'exchange_coupon'){//兑换券
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
                    }
                }else if(data.couponType === 'discount_coupon'){//折扣券
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
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .member-card {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        background: $color-fff;
        border-radius: 4px;

        .tabs-wrap{
            /deep/ .ivu-tabs-nav{
                margin-left: 30px;
            }
        }

        .btn-wrap{
            height: 58px;
            line-height: 56px;
            padding: 0 30px;
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
    }

</style>

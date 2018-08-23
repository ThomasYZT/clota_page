<template>
    <!--会员管理--会员卡券-->
    <div class="member-card">

        <div class="tabs-wrap">
            <Tabs :animated="false" :value="tabsName" @on-click="changeTab">
                <TabPane label="已创建" name="created"></TabPane>
                <TabPane label="已作废" name="cancellation"></TabPane>
            </Tabs>
        </div>

        <div class="btn-wrap"v-if="tabsName === 'created'">
            <Button type="primary" @click="add">+ 新增卡券</Button>
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
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{getUseCondition(scope.row)}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.effectiveTime}}-{{scope.row.expireTime}}
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <div class="operation">
                        <span class="span-blue"
                              @click="modifyFunc(scope.row)">
                            修改
                        </span>
                        <span class="span-blue"
                              @click="obsoloteCoupon(scope.row)">
                            作废
                        </span>
                        <span class="span-blue"
                              @click="showModal(scope.row)">
                            删除
                        </span>
                    </div>
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
            :ofset-height="138"
            @query-data="queryList">
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="200">
                <template slot-scope="scope">
                    <div class="operation">
                        <span class="span-blue"
                              @click="modifyFunc(scope.row)">
                            修改
                        </span>
                        <span class="span-blue"
                              @click="reloadCoupon(scope.row)">
                            重新启用
                        </span>
                        <span class="span-blue"
                              @click="showModal(scope.row)">
                            删除
                        </span>
                    </div>
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
                currentData : {}
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
                this.$router.push({ name: 'addCard', query: { type: 'add' }});
            },

            /**
             * 修改券
             * @param data
             */
            modifyFunc ( data ) {
                console.log(data)
                console.log(this.getUpdateCouponParams(data))
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
                ajax.post('updateCoupon',Object.assign({
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
                let params = this.getUpdateCouponParams(data);
                ajax.post('updateCoupon',Object.assign({
                    status : 'valid'
                },params)).then(res => {
                    if(res.success){
                        this.$Message.success("启用成功！");
                        this.queryList();
                    }else{
                        this.$Message.error('启用失败！');
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
                ajax.post('updateCoupon',Object.assign({
                    isDeleted : 'true'
                },params)).then(res => {
                    if(res.success){
                        this.$Message.success("删除成功！");
                        this.queryList();
                    }else{
                        this.$Message.error('删除失败！');
                    }
                });
            },

            /**
             * 查询新建的会员卡券信息
             */
            queryList () {
                ajax.post('queryCoupons',{
                    isDeleted : false,
                    status : this.tabsName === 'created' ? 'valid' : 'invalid',
                    pageNo : 1,
                    pageSize : 10
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
                if(rowData.couponType === 'discountCoupon'){//折扣券
                    return `最低可使用金额${rowData.conditionLowerLimtation}元最高使用金额${rowData.conditionUpperLimtation}元`
                }else if(rowData.couponType === 'coinCoupon'){//兑换券
                    return `仅限张记手擀面`;
                }else if(rowData.couponType === 'cashCoupon'){//代金券
                    return `满${rowData.nominalValue}可用`
                }
            },
            /**
             * 获取编辑卡券的参数
             */
            getUpdateCouponParams (data) {
                if(data.couponType === 'cashCoupon'){//代金券
                    return {
                        id : data.id,
                        couponName : data.couponName,
                        couponType : data.couponType,
                        nominalValue : data.nominalValue,
                        conditionLowerLimtation : data.conditionLowerLimtation,
                        effectiveTime : new Date(data.effectiveTime).format('yyyy/MM/dd HH:mm:ss'),
                        expireTime : new Date(data.expireTime).format('yyyy/MM/dd HH:mm:ss'),
                        isDiscountCoexist : data.isDiscountCoexist,
                        isEffectBeforeDiscount : data.isEffectBeforeDiscount,
                        conditionChannelId : data.conditionChannelId,
                        conditionOrgId : data.conditionOrgId,
                    }
                }else if(data.couponType === 'coinCoupon'){//兑换券
                    return {
                        id : data.id,
                        couponName : data.couponName,
                        couponType : data.couponType,
                        effectiveTime : new Date(data.effectiveTime).format('yyyy/MM/dd HH:mm:ss'),
                        expireTime : new Date(data.expireTime).format('yyyy/MM/dd HH:mm:ss'),
                        store : data.store,
                        integCanSelected : data.store,
                        conditionChannelId : data.conditionChannelId,
                        conditionProductId : data.conditionProductId,
                    }
                }else if(data.couponType === 'discountCoupon'){//折扣券
                    return {
                        id : data.id,
                        couponName : data.couponName,
                        couponType : data.couponType,
                        nominalValue : data.nominalValue,
                        conditionLowerLimtation : data.conditionLowerLimtation,
                        conditionUpperLimtation : data.conditionUpperLimtation,
                        effectiveTime : new Date(data.effectiveTime).format('yyyy/MM/dd HH:mm:ss'),
                        expireTime : new Date(data.expireTime).format('yyyy/MM/dd HH:mm:ss'),
                        integCanSelected : data.integCanSelected,
                        storeCanUseId : data.storeCanUseId,
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
    }

</style>

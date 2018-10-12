<!--预定模态框-->

<template>
    <div>
        <Modal
            title="Title"
            :mask-closable="false"
            :value="value"
            :width="700"
            @input="changeValue"
            @on-visible-change="visibleChange"
            class="reserve-modal"
            class-name="vertical-center-modal">
            <div slot="header" class="target-class">
                <span class="title">{{$t('请填写购买数量')}}</span>
            </div>
            <div class="target-body">
                <table-com
                    :column-data="columnData"
                    :table-data="tableData"
                    :border="false"
                    :height="254"
                    @query-data="queryList">
                    <el-table-column
                        slot="column0"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <div class="product-name">
                                <span class="product-name-info" v-w-title="scope.row.productName">{{scope.row.productName}}</span>
                                <span class="ticket-info" @click="showTickInfo(scope.row)">购票须知</span>
                            </div>
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
                            <InputNumber
                                :min="1"
                                :value="scope.row.num"
                                @input="changeProductNum(scope.$index,$event)"
                                style="width: 100px">
                            </InputNumber>
                        </template>
                    </el-table-column>
                </table-com>
                <div class="predict-money">预计订单总额: <span class="money">{{predictMoney | moneyFilter }}</span></div>
                <div class="left-money">下单企业可用额度: <span class="money">{{validatMoney | moneyFilter}}</span></div>
            </div>
            <div slot="footer">
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="save">{{$t('confirm')}}</Button>
                <Button type="ghost"
                        class="ivu-btn-90px"
                        @click="cancel">{{$t('cancel')}}</Button>
            </div>
        </Modal>
        <!--购票须知模态框-->
        <ticket-info v-model="ticketModalShow"
                     :policy-id="ticketInfoPolicyId"
                     :org-name="ticketInfoOrgname">
        </ticket-info>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './reserveConfig';
    import ticketInfo from './ticketInfo';
    import ajax from '@/api/index.js';
    export default {
        components : {
            tableCom,
            ticketInfo
        },
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //已经选择的产品列表
            'product-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //查询参数
            'search-params' :{
                type :Object,
                default () {
                    return {};
                }
            }
        },
        data() {
            return {
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //购票须知模态框是否显示
                ticketModalShow : false,
                //购票须知对应的id
                ticketInfoPolicyId : '',
                //购票景区
                ticketInfoOrgname : '',
                //下单企业可用余额
                validatMoney : 0
            }
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === true){
                    this.queryLeftMoney();
                }
            },
            /**
             * 确定填写数量
             */
            save () {
                this.$router.push({
                    name :'writeOrder',
                    params :{
                        productList : this.tableData
                    }
                });
            },
            /**
             * 取消预定
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 查询所有产品信息
             */
            queryList () {
            },
            /**
             * 显示购票须知信息
             * @param data
             */
            showTickInfo (data) {
                this.ticketInfoPolicyId = data.policyId;
                this.ticketInfoOrgname = data.saleOrgName;
                this.ticketModalShow = true;
            },
            /**
             * 修改数量
             * @param index
             * @param num
             */
            changeProductNum (index,num) {
                this.$set(this.tableData[index],'num',num)
            },
            /**
             * 查询下单企业剩余金额
             */
            queryLeftMoney() {
                ajax.post('findByOrgIdAndPeerId',{
                    orgId : this.searchParams.saleOrgId,
                    peerOrgId :this.searchParams.orderOrgId
                }).then(res =>{
                    if(res.success){
                        this.validatMoney = (res.data.accountBalance ? res.data.accountBalance :0) + (res.data.creditBalance ? res.data.creditBalance : 0);
                    }else{
                        this.validatMoney = 0;
                    }
                });
            }
        },
        watch : {
            productList () {
                this.tableData = JSON.parse(JSON.stringify(this.productList));
            }
        },
        computed : {
            //预计总额
            predictMoney () {
                let amount = 0;
                for(let i = 0,j = this.tableData.length;i < j;i++){
                    amount += this.tableData[i]['settlePrice'] * this.tableData[i]['num'];
                }
                return amount;
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .reserve-modal{
        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: $font_size_16px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        .target-body{
            max-height: 324px;
            overflow: auto;

            .predict-money,
            .left-money{
                height: 44px;
                float: left;
                padding: 10px;
                font-size: $font_size_15px;

            }

            .money{
                color: $color_yellow;
            }

            .product-name{
                display: flex;
                width: 100%;

                .product-name-info{
                    flex: 1;
                    @include overflow_tip();
                    display: inline-block;
                    vertical-align: middle;
                    font-size: $font_size_12px;
                    color: $color_606266;
                }

                .ticket-info{
                    cursor: pointer;
                    font-size: $font_size_12px;
                    color: $color_blue;
                    letter-spacing: 0.86px;
                    padding-left: 5px;
                }
            }
        }

        /deep/ .ivu-modal-body{
            padding: 30px 28px 0 28px;
        }

        /deep/ .el-table th{
            padding-top: 8px;
            padding-bottom: 8px;
        }
        /deep/ .el-table td{
            padding-top: 5px;
            padding-bottom: 5px;
        }

        /deep/ .el-table__header-wrapper{
            border-top: 1px solid #ebeef5;
        }
    }
</style>

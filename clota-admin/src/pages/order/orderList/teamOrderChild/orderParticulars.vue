<!--订单明细信息-->

<template>
    <div class="order-particular">
        <div class="title">{{$t('orderDetailInformation')}}</div>
        <Form ref="formInline" :model="formData" :rules="ruleInline" inline>
            <FormItem prop="user" :label="$t('productName')" :label-width="80">
                <Select v-model="formData.productName"
                        style="width: 180px"
                        @on-change="queryOrderTicketDetail">
                    <Option v-for="item in productList"
                            :key="item.value"
                            :value="item.value">
                        {{$t(item.label)}}
                    </Option>
                </Select>
            </FormItem>
            <!--是否取票-->
            <FormItem prop="user" :label="$t('whetherPickTicket')" :label-width="100">
                <Select v-model="formData.pickStatus"
                        style="width: 180px"
                        @on-change="queryOrderTicketDetail">
                    <Option value="true">{{$t('haveTickets')}}</Option><!--已取票-->
                    <Option value="false">{{$t('noHaveTickets')}}</Option><!--未取票-->
                </Select>
            </FormItem>
            <!--关键词-->
            <FormItem prop="user" :label="$t('keywords')" :label-width="80">
                <!--请输入游客姓名/手机号码/核销串码-->
                <Input type="text"
                       v-model.trim="formData.keyword"
                       :placeholder="$t('queryByVerifySN')"
                       style="min-width: 180px;max-width: 280px" />
            </FormItem>
            <FormItem prop="user" :label-width="10">
                <Button type="primary" class="ivu-btn-90px" @click="queryOrderTicketDetail">{{$t('searching')}}</Button>
                <Button type="ghost" class="ivu-btn-90px" @click="reset">{{$t('reset')}}</Button>
            </FormItem>
        </Form>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :table-com-min-height="250"
            :border="true"
            :auto-height="true">
            <el-table-column
                slot="columnpickStatus"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    {{scope.row.pickStatus === 'true' ? $t('haveTickets') : $t('noHaveTickets')}}
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './orderParticularsConfig';
    import ajax from '@/api/index.js';

    export default {
        props : {
            //订单编号id
            orderNo : {
                type : String,
                default : ''
            },
            //产品信息
            'product-info-list' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //表格数据
                tableData : [],
                //表头配置
                columnData : columnData,
                //查询条件
                formData : {
                    //产品名称
                    productName : 'all',
                    //关键字
                    keyword : '',
                    //是否取票
                    pickStatus : 'true'
                },
                //校验规则
                ruleInline : {

                }
            };
        },
        components : {
            tableCom
        },
        methods : {
            /**
             * 获取订单明细信息
             */
            queryOrderTicketDetail () {
                ajax.post('groupProductDetail',{
                    productName : this.formData.productName === 'all' ? '' : this.formData.productName,
                    pickStatus : this.formData.pickStatus,
                    keyword : this.formData.keyword,
                    orderNo : this.orderNo,
                }).then(res => {
                    if (res.statu === 200) {
                        this.tableData = res.data ? res.data : [];
                    } else {
                        this.tableData = [];
                    }
                });
            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.formData.productName = 'all';
                this.formData.keyword = '';
                this.formData.pickStatus = 'true';
                this.queryOrderTicketDetail();
            }
        },
        watch : {
            orderNo : {
                immediate : true,
                handler (newVal) {
                    if (newVal) {
                        this.queryOrderTicketDetail();
                    }
                }
            }
        },
        computed : {
            productList () {
                let productList = [];
                this.productInfoList.forEach(item => {
                    if (item.productName) {
                        if (item.productName.slice(0,1) !== '[') {
                            productList.push({
                                label : item.productName,
                                value : item.productName,
                            });
                        } else {
                            let productSplit = JSON.parse(item.productName);
                            productSplit.forEach(productName => {
                                productList.push({
                                    label : productName,
                                    value : productName,
                                });
                            });
                        }
                    }
                });
                return [].concat([{
                    label : 'all',
                    value : 'all'
                }],productList);
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .order-particular{
        clear: both;

        .title{
            position: relative;
            padding: 15px 0;
            @include block_outline($height : 52px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
        }
    }
</style>

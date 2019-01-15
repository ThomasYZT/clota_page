<!--订单明细信息-->

<template>
    <div class="order-particular">
        <div class="title">{{$t('orderDetailInformation')}}</div>
        <Form ref="formInline" :model="formData" :rules="ruleInline" inline>
            <FormItem prop="user" :label="$t('productName')" :label-width="80">
                <Select v-model="formData.productId"
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
            <FormItem prop="user" :label="$t('whetherPickTicket')" :label-width="80">
                <Select v-model="formData.pickStatus"
                        style="width: 180px"
                        @on-change="queryOrderTicketDetail">
                    <Option value="true">{{$t('haveTickets')}}</Option><!--已取票-->
                    <Option value="false">{{$t('noHaveTickets')}}</Option><!--未取票-->
                </Select>
            </FormItem>
            <!--关键词-->
            <FormItem prop="user" :label="$t('keywords')" :label-width="70">
                <!--请输入游客姓名/手机号码/核销串码-->
                <Input type="text"
                       v-model.trim="formData.keyword"
                       :placeholder="$t('queryByVerifySN')"
                       style="min-width: 250px;max-width: 280px" />
            </FormItem>
            <FormItem prop="user" :label-width="10">
                <Button type="primary"
                        style="margin-right: 5px;"
                        @click="queryOrderTicketDetail">{{$t('searching')}}</Button>
                <Button type="ghost" @click="reset">{{$t('reset')}}</Button>
            </FormItem>
        </Form>
        <table-com
            :column-data="columnData"
            :table-data="tableData"
            :table-com-min-height="250"
            :border="true"
            :auto-height="true">
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                show-overflow-tooltip
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <template v-if="scope.row.pickStatus === 'true'">
                        {{$t('haveTickets')}}
                    </template>
                    <span class="yellow-label" v-else>{{$t('noHaveTickets')}}</span>
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
            //订单id
            orderId : {
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
                tableData : [
                    {
                    }
                ],
                //表头配置
                columnData : columnData,
                //查询条件
                formData : {
                    //产品id
                    productId : 'all',
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
                ajax.post('queryOrderTicketDetail',{
                    productId : this.formData.productId === 'all' ? '' : this.formData.productId,
                    pickStatus : this.formData.pickStatus,
                    keyword : this.formData.keyword,
                    orderId : this.orderId,
                }).then(res => {
                    if (res.success) {
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
                this.formData.productId = 'all';
                this.formData.keyword = '';
                this.formData.pickStatus = 'true';
                this.queryOrderTicketDetail();
            }
        },
        watch : {
            orderId : {
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
                return [].concat(this.productInfoList.map(item => {
                    return {
                        label : item.productName,
                        value : item.productId
                    };
                }),[{
                    label : 'all',
                    value : 'all'
                }]);
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

        .yellow-label{
            color: $color_yellow;
        }
    }
</style>

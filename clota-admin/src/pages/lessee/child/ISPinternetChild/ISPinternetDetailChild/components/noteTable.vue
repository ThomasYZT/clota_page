<!--短信-->

<template>
    <div class="note-table">
        <div class="table-name">
            <span class="label">短信</span>
            <span class="back-up"
                  @click="isPackUpLoad = !isPackUpLoad">
            {{$t(isPackUpLoad ? 'backUp' : 'upLoad')}}
                <span class="iconfont icon-pull-down" :class="{'icon-reverse' : isPackUpLoad}"></span>
          </span>
        </div>
        <transition name="fade">
            <div v-if="isPackUpLoad">
                <!--短信发送记录-->
                <div class="employee-account">
                    <span class="note-record">短信发送记录</span>
                    <div class="note-sended">
                        <Icon type="ios-help"></Icon>
                        <span class="note-tips">共发送短信数量：<span class="icon-weight">{{sendSmsTotals | contentFilter}}条</span></span>
                        <span class="note-tips">剩余短信数量：<span class="icon-weight">{{smsSurplusTotal | contentFilter}}条</span></span>
                    </div>
                </div>

                <table-com
                    v-if="tableShow"
                    :column-data="sendColumns"
                    :table-data="smsSendRecord"
                    :border="true"
                    :page-no-d.sync="smsSendRecordPageNo"
                    :show-pagination="true"
                    :page-size-d.sync="smsSendRecordPageSize"
                    :total-count="smsSendRecordTotal"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="getSmsSendRecord">
                    <el-table-column
                        slot="columninvokeType"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row.invokeType)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="columnstatus"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            {{$t(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        slot="columnoperate"
                        slot-scope="row"
                        :label="row.title"
                        show-overflow-tooltip
                        :width="row.width"
                        fixed="right"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <ul class="operate-info">
                                <li class="normal" @click="watchNoteDetail(scope.row)">查看</li>
                            </ul>
                        </template>
                    </el-table-column>
                </table-com>

                <!--短信购买记录-->
                <div class="employee-account" slot="table-title">
                    <span class="note-record">短信购买记录</span>
                    <div class="note-sended">
                        <Icon type="ios-help"></Icon>
                        <span class="note-tips">共购买短信数量：<span class="icon-weight">{{smsBuyTotal | contentFilter}}条</span></span>
                    </div>
                </div>

                <table-com
                    v-if="tableShow"
                    :column-data="buyColumns"
                    :table-data="smsBuyRecord"
                    :border="true"
                    :page-no-d.sync="smsBuyRecordPageNo"
                    :show-pagination="true"
                    :page-size-d.sync="smsBuyRecordPageSize"
                    :total-count="smsBuyRecordTotal"
                    :auto-height="true"
                    :table-com-min-height="280"
                    @query-data="getSmsBuyRecord">
                </table-com>
            </div>
        </transition>
        <!--短信发送记录-->
        <note-detail v-model="noteDetailShow" :note-id="currentRow.id">
        </note-detail>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {buyColumns,sendColumns} from './noteConfig';
    import noteDetail from './noteDetail';
    import ajax from '@/api/index.js';
    export default {
        props : {
            //表格查询参数
            'search-params' : {
                typee : Object,
                default () {
                    return {}
                }
            }
        },
        components : {
            tableCom,
            noteDetail
        },
        data() {
            return {
                //购买短信表头
                buyColumns : buyColumns,
                //发送短信表头
                sendColumns : sendColumns,
                //员工总数
                totalCount : 100,
                //是否展开表格
                isPackUpLoad : false,
                //短信记录模态框是否显示
                noteDetailShow : false,
                //当前操作的短信条
                currentRow : {},
                //短信购买记录
                smsBuyRecord : [],
                smsBuyRecordPageNo : 1,
                smsBuyRecordPageSize : 10,
                smsBuyRecordTotal : 0,
                // 短信总共购买统计
                smsBuyTotal : '',
                //短信发送记录
                smsSendRecord : [],
                smsSendRecordPageNo : 1,
                smsSendRecordPageSize : 10,
                smsSendRecordTotal : 0,
                //短信剩余数量
                smsSurplusTotal : '',
                //短信发送数量
                sendSmsTotals : ''
            }
        },
        methods: {
            /**
             * 查看短信发送记录
             * @param data
             */
            watchNoteDetail (data) {
                this.noteDetailShow = true;
                this.currentRow = data;
            },
            /**
             * 获取短信购买记录
             */
            getSmsBuyRecord () {
                ajax.post('getSmsPurchaseRecords',{
                    id : this.searchParams.id,
                    pageNo : this.smsBuyRecordPageNo,
                    pageSize : this.smsBuyRecordPageSize
                }).then(res => {
                    if(res.status === 200){
                        this.smsBuyRecord = res.data.list ? res.data.list : [];
                        this.smsBuyTotal = res.data.otherData ? res.data.otherData.totals : '';
                    }else{
                        this.smsBuyRecord = [];
                        this.smsBuyTotal = '';
                    }
                })
            },
            /**
             * 获取短信发送记录
             */
            getSmsSendRecord () {
                ajax.post('getSmsConsumeRecords',{
                    id : this.searchParams.id,
                    pageNo : this.smsBuyRecordPageNo,
                    pageSize : this.smsBuyRecordPageSize
                }).then(res => {
                    if(res.status === 200){
                        this.smsSendRecord = res.data.list ? res.data.list : [];
                        this.smsSurplusTotal = res.data.otherData ? res.data.otherData.smsSurplusTotal : '';
                        this.sendSmsTotals = res.data.otherData ? res.data.otherData.sendSmsTotals : '';
                    }else{
                        this.smsSendRecord = [];
                        this.smsSurplusTotal = '';
                        this.sendSmsTotals = '';
                    }
                })
            }
        },
        computed : {
            //表格是否显示
            tableShow () {
                return this.searchParams && this.searchParams.id;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .note-table{

        .table-name {
            @include block_outline($height: 49px);
            padding: 25px 0 0 0;

            .label {
                display: inline-block;
                font-size: $font_size_16px;
                color: $color_333;
                line-height: 24px;
                vertical-align: middle;
            }

            .back-up {
                font-size: $font_size_14px;
                color: $color_blue;
                display: inline-block;
                margin-left: 10px;
                vertical-align: middle;
                cursor: pointer;

                .icon-pull-down{
                    display: inline-block;
                    transition: all 0.5s;

                    &::before{
                        color: $color_blue;
                        font-size: 12px;
                    }

                    &.icon-reverse{
                        transform: rotate(180deg);
                        transition: all 0.5s;
                    }

                }
            }
        }

        .employee-account {
            @include block_outline(auto);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;

            .note-record{
                display: block;
                margin-bottom: 5px;
                font-size: $font_size_13px;
                color: $color_333;
            }

            .note-sended{
                @include block_outline($height : 30px);
                background: $color_E8F7FF;
                border: 1px solid rgba(0,130,213,0.50);
                border-radius: 4px;
                margin-top: 10px;
                line-height: 27px;
                font-size: $font_size_14px;
                color: rgba($color_000,0.65);
                padding-left: 15px;

                .ivu-icon-ios-help{
                    font-size: $font_size_17px;
                    color:  $color_0082D5;
                    vertical-align: text-top;
                    margin-right: 10px;
                    margin-top: 1px;
                }

                .note-tips{
                    margin-right: 20px;

                    .icon-weight{
                        color: $color_000;
                    }
                }
            }
        }
        .operate-info{
            @include table_operate();

            .custome{
                color: $color_blue;
            }
        }
    }
</style>

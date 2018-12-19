<!--
    散客二级订单详情--核销日志
    作者：杨泽涛
-->
<template>
    <div class="vertification-log">
        <div class="title">{{$t('verifyLog')}}</div>

        <tableCom :column-data="verifyTicketLogListHead"
                  :table-data="verifyTicketLogListDeal"
                  :table-com-min-height="250"
                  :border="true"
                  :auto-height="true">
            <el-table-column
                slot="columnoperatorAndTime"
                show-overflow-tooltip
                slot-scope="row"
                :label="row.title"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{scope.row.nickName | contentFilter}}/{{scope.row.createdTime | contentFilter}}</span>
                </template>
            </el-table-column>
        </tableCom>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom';
    import { verifyTicketLogListHead } from './secondLevelDetailConfig';
    export default {
        props : {
            //核销产品数据
            verifyTicketLogList : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data () {
            return {
                verifyTicketLogListHead : verifyTicketLogListHead
            };
        },
        computed : {
            //核销日志数据处理
            verifyTicketLogListDeal () {
                return this.verifyTicketLogList.map(item => {
                    let contents = item.contents ? JSON.parse(item.contents) : {};
                    return {
                        ...item,
                        //核销数量
                        verifyNum : contents.verifyNum,
                        //产品明细编号
                        ticketId : contents.ticketId,
                    };
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .vertification-log{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
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
    }
</style>

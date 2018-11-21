<!--短信设置-->

<template>
    <div class="sms-setting">
        <div class="sms-label-title">{{$t('smsNumSet')}}</div>
        <div class="sms-length-setting">{{$t('smsSingleMaxCount')}}
            <InputNumber :min="1"
                         :max="9999"
                         v-model.trim="copySettingData.smsMaxCount"
                         :placeholder="$t('inputPlaceholder')"></InputNumber>
            {{$t('word')}}
        </div>
        <div class="sms-label-title">{{$t('smsProvider')}} </div>
        <div class="table-wrap">
            <table-com
                :ofsetHeight="290"
                :column-data="columnData"
                :table-data="tableData"
                :border="false">
                <el-table-column
                    slot="columnsmsProviderName"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    show-overflow-tooltip
                    slot-scope="row">
                    <template slot-scope="scoped">
                        <span>{{ copySettingData.smsSupplierName | contentFilter }}</span>
                    </template>
                </el-table-column>
            </table-com>
        </div>
        <div class="btn-area">
            <slot name="footer" :rowData="copySettingData"></slot>
        </div>
    </div>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props : ['setting'],
        components : {
            tableCom,
        },
        data () {
            return {
                //表头数据
                columnData : [
                    {
                        title : 'smsProviderName',
                        minWidth : 100,
                        field : 'smsProviderName'
                    },
                ],
                //表格数据
                tableData : [{ smsProviderName : '' }],
                //复制数据，用于当前修改
                copySettingData : {},
            };
        },
        created () {
            this.copySettingData = defaultsDeep({}, this.setting);
        },
        watch : {
            setting : function (val) {
                this.copySettingData = defaultsDeep({}, val);
            }
        },
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .sms-setting{
        position: relative;
        @include block_outline();

        .sms-label-title{
            padding-top: 30px;
            @include block_outline($height : 70px);
            font-size: $font_size_16px;
            color: $color_666;
        }

        .sms-length-setting{
            font-size: $font_size_14px;
            color: $color_333;

            /deep/ .ivu-input-number{
                margin: 0 5px;
            }
        }

        .table-wrap{
            width: 200px;
        }

        .btn-area{
            width: 100%;
            @include absolute_pos(absolute,$bottom : 20px);
            text-align: center;

            .ivu-btn-90px{
                margin: 0 10px;
            }
        }
    }
</style>

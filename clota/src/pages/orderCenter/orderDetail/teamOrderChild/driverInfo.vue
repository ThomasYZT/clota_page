<!--司机信息-->

<template>
    <div class="driver-info">
        <div class="title">司机信息</div>
        <table-com
            :column-data="columnData"
            :table-data="driverList"
            :border="true"
            :table-com-min-height="250"
            :auto-height="true">
        </table-com>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './driverInfoConfig';
    export default {
        props : {
            //司机列表
            'driver-list' : {
                type : Array,
                default ( ){
                    return [];
                }
            }
        },
        components :{
            tableCom
        },
        data() {
            return {
                //表头配置
                columnData : columnData
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .driver-info{
        width: calc(50% - 16px);
        float: right;

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
    }
</style>

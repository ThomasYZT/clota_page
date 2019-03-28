<!--
    头部过滤器组件
    作者：杨泽涛
-->
<template>
    <div class="filter-head">
        <div class="left-filter">
            <i-row>
                <i-col span="24">
                    <slot name="left-filter"></slot>
                </i-col>
            </i-row>
        </div>

        <div class="right-filter">
            <i-row>
                <i-col span="24">
                    <slot name="right-filter"></slot>
                </i-col>
            </i-row>
        </div>
    </div>
</template>

<script>

    export default {
        props : {
            //过滤栏左部宽
            'left-width' : {
                type : String,
                default () {
                    return '50%';
                }
            },
            //过滤栏右部宽
            'right-width' : {
                type : String,
                default () {
                    return '50%';
                }
            }
        },
        components : {},
        data () {
            return {};
        },
        methods : {}
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .filter-head {
        position: relative;
        display: flex;
        padding: 9px 20px;
        width: 100%;
        height: 48px;

        .left-filter {
            flex: 1 0;
        }

        .right-filter {

        }

        /deep/ .ivu-row {
            height: 100%;

            .ivu-col {
                height: 100%;
            }
        }
    }
</style>

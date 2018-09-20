<!--组织架构树-->

<template>
    <div class="structure-head">
        <ul class="head">
            <li class="tree-title active">
                <span class="iconfont icon-help"></span>
                财务管理
            </li>
            <li class="tree-title">
                <span class="iconfont icon-help"></span>
                经营管理
            </li>
        </ul>
        <div class="search-input">
            <Input
                v-model.trim="keyWord"
                placeholder="请输入查找内容"
                icon="ios-search"
                style="width: 360px"></Input>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //搜索关键字
                keyWord: ''
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .structure-head {
        @include block_outline($height: 140px);
        padding: 0 20px;

        .head {
            @include block_outline($height: 68px);
            border-bottom: 1px solid $color_E1E1E1;
            padding: 23px 0 20px 0;

            .tree-title {
                float: left;
                @include block_outline($width: 50%, $height: 25px);
                font-size: $font_size_16px;
                color: $color_666;
                text-align: center;
                cursor: pointer;

                &.active {
                    color: $color_blue;

                    .iconfont {
                        color: $color_blue;
                    }
                }

                &:nth-of-type(1) {
                    border-right: 1px solid $color_E1E1E1;
                }

                .iconfont {
                    color: $color_666;
                    font-size: $font_size_14px;
                    margin-right: 10px;
                }
            }
        }

        .search-input {
            @include block_outline($height: 78px);
            padding-top: 20px;

            /deep/ .ivu-input {
                height: 32px;
            }
        }
    }
</style>

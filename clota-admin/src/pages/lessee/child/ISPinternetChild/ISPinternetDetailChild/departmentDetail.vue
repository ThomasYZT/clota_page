<!--部门详情-->

<template>
    <div class="department-deail">
        <div class="com-name">
          <span class="name"
                v-w-title="'广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团'">
            广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团
          </span>
            <span class="started">已启用</span>
            <span class="edit">修改</span>
        </div>
        <ul class="department-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">部门ID：</span>
                    <span class="info-val">232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323</span>
                </div>
            </li>
        </ul>
        <!--员工-->
        <employee-table :is-pack-up="true">
        </employee-table>
    </div>
</template>

<script>
    import employeeTable from './components/employeeTable';
    export default {
        components : {
            employeeTable
        },
        data() {
            return {

            }
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .department-deail{
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: unquote('calc(100% - 127px)'), $height: 100%);
            }

            .started,
            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
            }
        }

        .department-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                @include block_outline($height: 30px);
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(100%, auto);
                }

                .info-list1{
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }
            }
        }


    }
</style>

<!--款台信息-->

<template>
    <div class="cashier-detail">
        <div class="com-name">
          <span class="name"
                v-w-title="'广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团'">
            广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团
          </span>
            <span class="started">已启用</span>
            <span class="edit">修改</span>
        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">款台名称：</span>
                    <span class="info-val">232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">款台ID：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">
                        服务器名称
                        <Tooltip placement="bottom">
                             <div slot="content" class="tips-content">
                               {{$t('serverNameTips')}}
                            </div>
                            <Icon type="information-circled"></Icon>
                        </Tooltip>：
                    </span>
                    <span class="info-val">23</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">款台类型：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">所属核销设备分组：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">所属销售渠道分组：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .cashier-detail{
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

        .company-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                @include block_outline($height: 30px);
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(40%, auto);
                }

                .info-list2 {
                    @include block_outline(60%, auto);
                }

                .info-list1,
                .info-list2 {
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    &:nth-last-of-type(1) {
                        padding-left: 15px;
                    }

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;

                        .ivu-icon-information-circled{
                            font-size: $font_size_15px;
                            margin-left: 5px;
                            color: $color_gray;
                            vertical-align: unset;
                        }

                        .tips-content{
                            white-space: normal;
                        }
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

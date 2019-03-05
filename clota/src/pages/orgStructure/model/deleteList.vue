<template>
    <Modal
        v-model="visible"
        class="deleteList"
        class-name="vertical-center-modal"
        :mask-closable="false"
        :width="420"
        @on-cancel="hide">
        <!--自定义页头-->
        <div slot="header" class="ivu-modal-header-inner">
            <span>{{deleteName}}</span>
        </div>
        <!--内容区域-->
        <div class="content">
            <i class="iconfont icon-help delete-icon"></i>
            <div class="text">
                <span>{{$t('isDoing')}}{{deleteName}}：</span>
                <span class="name" v-html="name" v-w-title="name"></span>
            </div>
            <div class="text">
                <span class="tips">{{$t('operationIrrevocable')}}</span>
                <span>{{$t('sureToDel')}}</span>
            </div>
        </div>
        <!--自定义页脚-->
        <div slot="footer">
            <template>
                <i-button class="ivu-btn-error" type="primary" @click="submit">{{$t('confirm')}}</i-button>
                <i-button type="ghost" @click="hide">{{$t('cancel')}}</i-button>
            </template>
        </div>

    </Modal>

</template>

<script type="text/ecmascript-6">

    export default {
        components : {},
        props : ['deleteName', 'name'],
        data () {
            return {
                visible : false,
                readonly : false,
                loading : false,
            };
        },
        computed : {},
        created () {
        },
        watch : {},
        methods : {

            /**
             * 显示模态框
             */
            show () {
                this.visible = true;
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.visible = false;
            },
            /**
             * 创建自定义指标表单校验
             */
            submit () {
                this.$emit('deletions');
                this.visible = false;
            },
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .deleteList {
        .ivu-modal-body {
            padding-top: 58px;
            padding-bottom: 58px;
            padding-left: 81px;
            padding-right: 54px;
        }

        .ivu-modal-footer {
            .ivu-btn {
                padding: 4px 30px;
            }
        }
    }

    .deleteList {
        .content {
            position: relative;
            margin: 40px 80px;

            .delete-icon {
                /*@include draw_circle(14px, 14px, $color_red, $color_fff, $font_size_12px);*/
                @include absolute_pos(absolute, $top: 0px, $left: -28px);
                color: $color_red;
            }
            .text {
                font-size: $font_size_14px;
                color: #333333;
                line-height: 24px;

                .name {
                    display: inline-block;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: $color_yellow;
                }
                .tips {
                    color: $color_red;
                }
            }
        }
    }
</style>

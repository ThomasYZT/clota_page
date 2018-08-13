<!--预警设置 -->

<template>
    <div class="alarm-setting">
        <div class="setting-title">
            预警设置
        </div>
        <div class="setting">
            <div class="setting-name">磁盘空间利用率报警阈值&nbsp;</div>
            <InputNumber :max="100"
                         :min="0"
                         v-model="smsLength">
            </InputNumber>
            &nbsp;%
        </div>
        <div class="setting">
            <div class="setting-name">日志文件大小报警阈值&nbsp;</div>
            <InputNumber :max="100"
                         :min="0"
                         v-model="smsLength">
            </InputNumber>
            &nbsp;%
        </div>
        <div class="btn-area">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="save">{{$t('save')}}</Button>
            <Button type="ghost" class="ivu-btn-90px">{{$t('cancel')}}</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            /**
             * 保存设置
             */
            save () {
                this.$Message.success('保存成功');
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .alarm-setting{
        position: relative;
        @include block_outline();

        .setting-title{
            padding-top: 30px;
            @include block_outline($height : 70px);
            font-size: $font_size_16px;
            color: $color_666;
        }

        .setting{
            font-size: $font_size_14px;
            color: $color_333;
            margin-bottom: 20px;

            .setting-name{
                display: inline-block;
                @include block_outline(160px,auto);
                text-align: right;
            }
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

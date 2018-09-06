<!--预警设置 -->

<template>
    <div class="alarm-setting">
        <!--预警设置-->
        <div class="setting-title">{{$t('alarmSetting')}}</div>
        <div class="setting">
            <!--磁盘空间利用率报警阈值-->
            <div class="setting-name">{{$t('warningUseRatioVal')}}</div>
            <InputNumber :max="100"
                         :min="0"
                         v-model="copySettingData.warningUseRatioVal">
            </InputNumber>
            &nbsp;%
        </div>
        <div class="setting">
            <!--日志文件大小报警阈值-->
            <div class="setting-name">{{$t('warningLogSizeVal')}}</div>
            <InputNumber :max="100"
                         :min="0"
                         v-model="copySettingData.warningLogSizeVal">
            </InputNumber>
            &nbsp;%
        </div>
        <div class="btn-area">
            <slot name="footer" :rowData="copySettingData"></slot>
        </div>
    </div>
</template>

<script>

    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['setting'],
        data() {
            return {
                //复制数据，用于当前修改
                copySettingData: {},
            }
        },
        created() {
            this.copySettingData = defaultsDeep({}, this.setting);
        },
        watch: {
            setting : function (val) {
                this.copySettingData = defaultsDeep({}, val);
            }
        },
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

            /deep/ .ivu-input-number{
                margin: 0 5px;
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

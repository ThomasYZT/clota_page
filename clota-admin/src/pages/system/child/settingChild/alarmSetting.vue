<!--预警设置 -->

<template>
    <div class="alarm-setting">
        <Form ref="formValidate" :model="copySettingData" :rules="ruleValidate">
            <!--预警设置-->
            <div class="setting-title">{{$t('alarmSetting')}}</div>
            <div class="setting">
                <!--<InputNumber :max="100"-->
                             <!--:min="0"-->
                             <!--v-model.trim="copySettingData.warningUseRatioVal"-->
                             <!--:placeholder="$t('inputPlaceholder')">-->
                <!--</InputNumber>-->
                <FormItem prop="warningUseRatioVal">
                    <!--磁盘空间利用率报警阈值-->
                    <div class="setting-name">{{$t('warningUseRatioVal')}}</div>
                    <Input style="width: 100px;"
                           type="text"
                           v-model.trim="copySettingData.warningUseRatioVal"
                           :placeholder="$t('inputPlaceholder')" />
                    &nbsp;%
                </FormItem>
            </div>
            <div class="setting">
                <FormItem prop="warningLogSizeVal">
                    <!--日志文件大小报警阈值-->
                    <div class="setting-name">{{$t('warningLogSizeVal')}}</div>
                    <Input style="width: 100px;"
                           type="text"
                           v-model.trim="copySettingData.warningLogSizeVal"
                           :placeholder="$t('inputPlaceholder')" />
                    &nbsp;%
                </FormItem>
            </div>
        </Form>
        <div class="btn-area">
            <slot name="footer"
                  :rowData="copySettingData"
                  :validateFunc="validateFunc"
                  :resetValidFunc="resetValidFunc">
            </slot>
        </div>
    </div>
</template>

<script>

    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';

    export default {
        props : ['setting'],
        data () {
            //校验带小数的浮点数
            const validateDecimalData = (rule,value,callback) => {
                if (value) {
                    common.validateMoney(value).then(() => {
                        if (value > 100) {
                            callback(this.$t('errorGreaterThan',{ small : this.$t(rule._field),big : 100 }));
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t(rule._field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule._field) }));
                        }
                    });
                } else {
                    callback(this.$t('inputField',{ field : this.$t(rule._field) }));
                }
            };
            return {
                //复制数据，用于当前修改
                copySettingData : {
                    warningUseRatioVal : '',
                    warningLogSizeVal : ''
                },
                ruleValidate : {
                    warningUseRatioVal : [
                        {
                            validator : validateDecimalData,
                            trigger : 'blur',
                            _field : '磁盘空间利用率报警阈值'
                        }
                    ],
                    warningLogSizeVal : [
                        {
                            validator : validateDecimalData,
                            trigger : 'blur',
                            _field : '日志文件大小报警阈值'
                        }
                    ]
                }
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
        methods : {
            /**
             * 校验表单是否通过
             */
            validateFunc () {
                return new Promise((resolve,reject) => {
                    this.$refs.formValidate.validate(valid => {
                        if (valid) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            },
            /**
             * 重置表单校验
             */
            resetValidFunc () {
                this.$refs.formValidate.resetFields();
            }
        }
    };
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

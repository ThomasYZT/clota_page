<!--注册其它信息-->

<template>
    <div class="other-info">
        <div class="warn-tips">{{$t('为保障您的合法权益，销售用户实行实名制注册')}}</div>
        <div class="other-info-content">
            <x-input :title="$t('name')"
                     v-model.trim="formData.name"
                     class="c-input"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('name') })">
            </x-input>
            <x-input :title="$t('身份证号')"
                     v-model.trim="formData.idNum"
                     class="c-input"
                     text-align="right"
                     label-width="150px"
                     :placeholder="$t('inputField',{ field : $t('身份证号') })">
            </x-input>
        </div>
        <x-button class="button"
                  @click.native="register">{{$t('marketingRegister')}}</x-button>
        <div class="before-step" @click="beforeStep">{{$t('上一步')}}</div>
    </div>
</template>

<script>
    import { validator } from 'klwk-ui';
    export default {
        data () {
            return {
                //表单数据
                formData : {
                    //姓名
                    name : '',
                    //身份证号
                    idNum : ''
                }
            };
        },
        methods : {
            /**
             * 开始注册
             */
            register () {
                this.validatetName().then(() => {
                    return this.validateIdNum();
                }).then(() => {
                    this.$emit('register',this.formData);
                });
            },
            /**
             * 校验姓名
             * @return {Promise<any>}
             */
            validatetName () {
                return new Promise((resolve,reject) => {
                    if (this.formData.name === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('name') }));
                        reject();
                    } else {
                        if (this.formData.name.length > 20) {
                            this.$vux.toast.text(this.$t('maxLengthErr',{ field : this.$t('name'),length : 20 }));
                        } else {
                            resolve();
                        }
                    }
                });
            },
            /**
             * 校验身份证号
             * @return {Promise<any>}
             */
            validateIdNum () {
                return new Promise((resolve,reject) => {
                    if (this.formData.idNum === '') {
                        this.$vux.toast.text(this.$t('inputField',{ field : this.$t('身份证号') }));
                        reject();
                    } else {
                        if (validator.isIdCard(this.formData.idNum)) {
                            resolve();
                        } else {
                            this.$vux.toast.text(this.$t('errFormat',{ field : this.$t('身份证号') }));
                        }
                    }
                });
            },
            /**
             * 跳到上一步
             */
            beforeStep () {
                this.$emit('to-before-step');
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .other-info{
        .warn-tips{
            @include block_outline($height : 34px);
            line-height: 34px;
            padding-left: 14px;
            color: #8395A7;
        }

        .other-info-content{
            background: $color_fff;
        }
        /deep/ .weui-btn{
            margin-top: 68px;
        }

        .before-step{
            font-size: $font_size_13px;
            color: $color_blue;
            max-width: calc(100% - 1.466667rem);
            text-align: left;
            margin: 12px auto 0;
        }
    }
</style>

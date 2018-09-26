<!--修改证件号码-->

<template>
    <div class="change-id">
        <div class="id-area">
            <group>
                <popup-picker
                    :title="$t('cardType')"
                    show-name
                    v-model.trim="formData.idType"
                    :data="[idLists]">
                </popup-picker>
                <x-input :title="$t('IdNumber')"
                         type="number"
                         :required="true"
                         class="valid-class"
                         v-model.trim="formData.idCard"
                         text-align="right"
                         :placeholder="$t('pleaseInputIdNum')" >
                </x-input>
            </group>
            <div class="btn-area">
                <x-button @click.native="save">{{$t('save')}}</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //表单数据
                formData : {
                    //证件类型
                    idType : ['1'],
                    //证件号码
                    idCard : ''
                },
                //证件类型列表
                idLists : [
                    {
                        value : '1',
                        name : '身份证'
                    },
                    {
                        value : '2',
                        name : '军官证'
                    }
                ]
            }
        },
        methods: {
            /**
             * 保存证件号码
             */
            save () {
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-id{
        @include block_outline();
        float: left;
        background: rgba(242,243,244,1);

        .id-area{
            @include block_outline($height : 364px);
            background: $color_fff;
        }

        /deep/ .weui-label{
            font-size: $font_size_15px;
            color: #4A4A4A;
        }

        /deep/ .weui-input{
            font-size: $font_size_15px;
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .weui-cells{
            margin-top: 0;

            &:before{
                display: none;
            }
        }

        /deep/ .weui-cell:before{
            left: 0;
        }

        .valid-class /deep/ .weui-input{
            padding-right: 10px;
            box-sizing: border-box;
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 186px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 5px;
            }
        }
    }
</style>

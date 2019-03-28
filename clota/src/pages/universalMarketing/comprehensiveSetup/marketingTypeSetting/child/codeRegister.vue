<!--
    二维码注册管理
    作者：杨泽涛
-->
<template>
    <div class="code-register">
        <codeBox v-if="Object.keys(marketingTypeItem).length > 1"
                 v-show="levelLength > 0"
                 :codeInfo="codeInfo"
                 @updateSuccess="updateSuccess"></codeBox>

        <div v-show="levelLength === 0" class="code-box">
            <div class="null-box">
                <span>{{$t('pleaseAddMarketingLevelFirst')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import codeBox from '../components/codeBox';
    export default {
        props : {
            levelLength : {
                type : Number,
                default : 0,
            },
            marketingTypeItem : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            codeBox
        },
        data () {
            return {
                codeInfo : {},
            };
        },
        methods : {
            /**
             * 更新成功
             */
            updateSuccess () {
                this.$emit('updateSuccess', this.marketingTypeItem);
            },
        },
        watch : {
            marketingTypeItem : {
                handler (newVal) {
                    this.codeInfo = {
                        registerUrl : newVal.registerUrl,
                        id : newVal.id,
                        typeName : newVal.typeName,
                        status : newVal.registerUrl ? 'show' : 'null',
                    };
                },
                immediate : true,
                deep : true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .code-register {
        padding : 35px 33px;

        .code-box {
            position: relative;
            width: 300px;
            height: 350px;
            border-radius: 8px;

            .null-box {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: $color_gray;
                font-size: 16px;
                line-height: 350px;
                text-align: center;
                border: 1px dashed #D9D9D9;
            }
        }
    }

</style>

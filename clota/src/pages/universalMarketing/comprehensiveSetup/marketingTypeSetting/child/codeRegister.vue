<!--
    二维码注册管理
    作者：杨泽涛
-->
<template>
    <div class="code-register">
        <codeBox v-if="Object.keys(marketingTypeItem).length > 1"
                 :codeInfo="codeInfo"
                 @updateSuccess="updateSuccess"></codeBox>
    </div>
</template>

<script>
    import codeBox from '../components/codeBox';
    export default {
        props : {
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
                codeInfo : {}
            };
        },
        methods : {
            /**
             * 更新成功
             */
            updateSuccess () {
                this.$emit('updateSuccess', this.marketingTypeItem);
            }
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
                }
            },
            immediate : true,
            deep : true
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .code-register {
        padding : 35px 33px;
    }
</style>

<!--选择所属类别-->

<template>
    <popup :value="value" v-transfer-dom :hide-on-blur="false">
        <!-- group already has a top border, so we need to hide header's bottom border-->
        <popup-header
            :left-text="$t('cancel')"
            :right-text="$t('confirm')"
            :title='$t("chooseMarketingTypes")'
            :show-bottom-border="false"
            @on-click-left="cancel"
            @on-click-right="confirm">
        </popup-header>
        <group gutter="0">
            <radio :options="typeList" v-model="typeChoosed"></radio>
        </group>
    </popup>
</template>

<script>
    export default {
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //所属类别选择
            'type-list' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //选择的所属类别
                typeChoosed : ''
            };
        },
        methods : {
            /**
             * 取消选择登录
             */
            cancel () {
                this.$emit('input',false);
            },
            /**
             * 确定选择所属类别
             */
            confirm () {
                this.$emit('input',false);
                this.$emit('choose-type',this.typeChoosed);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>

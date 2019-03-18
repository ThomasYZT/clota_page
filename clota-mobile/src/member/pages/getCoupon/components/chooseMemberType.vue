<!--选择领取优惠券的会员卡-->

<template>
    <popup :value="value" v-transfer-dom :hide-on-blur="false" @on-show="popupShow">
        <popup-header
            :left-text="$t('cancel')"
            :right-text="$t('confirm')"
            :title='$t("请选择领取优惠券的会员卡")'
            :show-bottom-border="false"
            @on-click-left="cancel"
            @on-click-right="confirm">
        </popup-header>
        <group gutter="0">
            <radio :options="memberList" v-model="memberSelected">
            </radio>
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
            //会员列表
            'member-list' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                //选择的会员卡
                memberSelected : ''
            };
        },
        methods : {
            /**
             * 不选择会员卡
             */
            cancel () {
                this.$emit('input',false);
            },
            /**
             * 确定选择所选会员卡
             */
            confirm () {
                this.$emit('input',false);
                this.$emit('choose-type',this.memberSelected);
            },
            /**
             * 上拉选择框显示
             */
            popupShow () {
                if (this.memberList && this.memberList.length > 0) {
                    this.memberSelected = this.memberList[0]['value'];
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
</style>

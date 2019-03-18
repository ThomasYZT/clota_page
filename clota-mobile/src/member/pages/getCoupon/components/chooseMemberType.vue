<!--选择领取优惠券的会员卡-->

<template>
    <popup :value="value" v-transfer-dom :hide-on-blur="false">
        <popup-header
            :left-text="$t('cancel')"
            :right-text="$t('confirm')"
            :title='$t("setRightMemberToGetCoupon")'
            :show-bottom-border="false"
            @on-click-left="cancel"
            @on-click-right="confirm">
        </popup-header>
        <group gutter="0">
            <template v-for="item in memberList">
                <radio :options="[item]"
                       :key="item.id"
                       v-model="memberSelected"
                       :disabled="item.status === 'frozen'">
                    <div slot="each-item" slot-scope="scoped" :class="{ 'disabled-cell' : item.status === 'frozen' }">
                        {{scoped.label}} <span class="tips" v-if="item.status === 'frozen'">{{$t('frozen')}}</span>
                    </div>
                </radio>
            </template>
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
                if (this.memberSelected) {
                    this.$emit('input',false);
                    this.$emit('choose-type',this.memberSelected);
                } else {
                    this.$vux.toast.text('setRightMemberToGetCoupon');
                }
            },
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .disabled-cell{
        color: #C5C5C5;

        .tips{
            color: $color_err;
            vertical-align: bottom;
            font-size: $font_size_11px;
        }
    }
</style>

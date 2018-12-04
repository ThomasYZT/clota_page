<!--
    提现设置
    作者：杨泽涛
-->
<template>
    <div class="cash-offer-settings">
        <cashOfferSettingBox v-if="Object.keys(marketingTypeItem).length > 0"
                             :cashOfferInfo="cashOfferInfo"
                             @updateSuccess="updateSuccess"></cashOfferSettingBox>
    </div>
</template>

<script>
    import cashOfferSettingBox from '../components/cashOfferSettingBox';
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
            cashOfferSettingBox
        },
        data () {
            return {
                cashOfferInfo : {}
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
                    this.cashOfferInfo = {
                        withdrawDay : newVal.withdrawDay,
                        id : newVal.id,
                        status : 'show',
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
    .cash-offer-settings {
        padding: 20px 30px;
    }
</style>

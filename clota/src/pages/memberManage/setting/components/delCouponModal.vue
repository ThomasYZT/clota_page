<!--删除优惠券提示模态框-->

<template>
    <del-modal ref="delModal">
         <div class="content-text content-info">
             <i class="iconfont icon-help delete-icon"></i>
             <span>{{$t('是否确定删除本批次优惠券？')}}<br>{{$t('已发放至用户的优惠券是否继续有效：')}}</span>
         </div>
        <div class="radio-area">
            <RadioGroup v-model="couponTypeChoose">
                <Radio label="1">
                    {{$t('继续有效')}}
                </Radio>
                <Radio label="2">
                    {{$t('失效')}}
                </Radio>
            </RadioGroup>
        </div>
        <div class="del-info">
            {{$t('如果选择失效则已发放的优惠券均失效，请谨慎操作!')}}
        </div>
    </del-modal>
</template>

<script>
    import delModal from  '@/components/delModal/index.vue';

    export default {
        components : {
            delModal
        },
        data () {
            return {
                //删除卡券后的状态
                couponTypeChoose : '1'
            };
        },
        methods : {
            /**
             * 显示模态框
             */
            show () {
                this.couponTypeChoose = '1';
                this.$refs.delModal.show({
                    title : this.$t('notice'),//提示
                    confirmCallback : () => {
                        this.confirmDeleteCoupon();
                    }
                });
            },
            /**
             * 确定删除优惠券
             */
            confirmDeleteCoupon () {

            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .radio-area{
        width: 250px!important;
        text-align: left;
        margin-top: 10px;
    }
    .content-info {
        width: 250px!important;
    }
    .del-info{
        position: absolute;
        bottom: 10px;
        color: $color_err;
        font-size: $font_size_12px;
    }
</style>

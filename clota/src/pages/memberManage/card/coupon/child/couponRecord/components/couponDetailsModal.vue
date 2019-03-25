<!--
    优惠券详情弹窗
    作者：杨泽涛
-->
<template>
    <div>
        <Modal v-model="visible"
               class-name="vertical-center-modal coupon-details-modal"
               transfer
               width="600"
               :title="$t(detail.couponType)"
               @on-cancel="hide"
               :mask-closable="false">

            <div class="content">
                <div class="form-wrapper">
                    <Form label-position="right" :label-width="130">
                        <!-- 卡券名称 -->
                        <formItem :label="$t('colonSetting', { key : $t('couponName') })">
                            <span>{{detail.couponName | contentFilter}}</span>
                        </formItem>
                        <!-- 卡券类别 -->
                        <formItem :label="$t('colonSetting', { key : $t('couponType') })">
                            <span>{{$t(detail.couponType) | contentFilter}}</span>
                        </formItem>
                        <!-- 有效期 -->
                        <formItem :label="$t('colonSetting', { key : $t('effectiveTime') })">
                            <span v-if="detail.appScene === 'spread'">{{detail.effectiveTime | timeFormat('yyyy-MM-dd')}}--{{detail.expireTime | timeFormat('yyyy-MM-dd')}}</span>
                            <span v-else>{{detail.effDays + $t('day')}}</span>
                        </formItem>
                        <!-- 可用产品类别 -->
                        <formItem :label="$t('colonSetting', { key : $t('availableProductCategories') })">
                            <span v-if="detail.appScene === 'spread'">{{detail.conditionProductNames | contentFilter}}</span>
                            <span v-else>{{detail.conditionGoodNames | contentFilter}}</span>
                        </formItem>
                        <!-- 可用渠道 -->
                        <formItem :label="$t('colonSetting', { key : $t('availableChannels') })">
                            <span>{{detail.conditionChannelNames | contentFilter}}</span>
                        </formItem>
                        <!-- 可用店铺 -->
                        <formItem :label="$t('colonSetting', { key : $t('availableShop') })">
                            <span>{{detail.conditionOrgNames | contentFilter}}</span>
                        </formItem>
                    </Form>
                </div>
            </div>

            <div slot="footer" class="modal-footer">
                <Button @click="hide" >{{$t("close")}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ajax from '@/api/index';
    export default {
        data () {
            return {
                visible : false,
                //卡券详情信息
                detail : {},
                //行数据
                rowData : {},
            };
        },
        methods : {
            /**
             * 显示模态框
             * @param rowData
             */
            show (rowData) {
                this.rowData = rowData;
                this.findCouponById().then(() => {
                    this.visible = true;
                });
            },
            /**
             * 隐藏模态框
             */
            hide () {
                this.rowData = {};
                this.detail = {};
                this.visible = false;
            },
            /**
             * 查询优惠券详情
             */
            findCouponById () {
                return new Promise((resolve, reject) => {
                    ajax.post('findCouponById', {
                        couponId : this.rowData.couponId
                    }).then(res => {
                        if (res.success) {
                            this.detail = res.data ? res.data : {};
                            resolve();
                        } else {
                            this.detail = {};
                            reject();
                        }
                    });
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .coupon-details-modal {
        .content {
            .form-wrapper {
                width: 350px;
                margin-left: 130px;
                display: inline-block;

                /deep/ .ivu-form-item {
                    margin-bottom: 10px;
                    .ivu-form-item-content {
                        min-width: 100px;
                    }
                }
            }
        }
    }
</style>

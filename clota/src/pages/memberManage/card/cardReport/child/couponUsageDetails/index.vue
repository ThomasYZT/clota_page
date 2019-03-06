<!--
    优惠券使用详情
    作者：杨泽涛
-->
<template>
    <div class="coupon-usage-details">
        <!-- 面包屑导航 -->
        <breadCrumbHead :locale-router="'couponUsageDetails'"
                        :before-router-list="beforeRouterList"></breadCrumbHead>

        <div class="head-toolbox">
            <div class="left-tool">
                <div class="button-wrapper">
                    <ButtonGroup>
                        <!-- 已兑换 -->
                        <Button type="default"
                                @click="changeType('redeemed')"
                                :class="{'selected' : type === 'redeemed'}"
                                class="tab-btn">{{$t('redeemed')}}</Button>
                        <!-- 已领取 -->
                        <Button type="default"
                                @click="changeType('received')"
                                :class="{'selected' : type === 'received'}"
                                class="tab-btn">{{$t('alreadyReceived')}}</Button>
                        <!-- 已使用 -->
                        <Button type="default"
                                @click="changeType('used')"
                                :class="{'selected' : type === 'used'}"
                                class="tab-btn">{{$t('used')}}</Button>
                        <!-- 未使用 -->
                        <Button type="default"
                                @click="changeType('noUse')"
                                :class="{'selected' : type === 'noUse'}"
                                class="tab-btn">{{$t('noUse')}}</Button>
                        <!-- 已过期 -->
                        <Button type="default"
                                @click="changeType('expired')"
                                :class="{'selected' : type === 'expired'}"
                                class="tab-btn">{{$t('expired')}}</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>

        <div class="table-wrapper">
            <!-- 已兑换 -->
            <redeemedTable v-if="type === 'redeemed'"></redeemedTable>
            <!-- 已领取 -->
            <receivedTable v-else-if="type === 'received'"></receivedTable>
            <!-- 已使用 -->
            <usedTable v-else-if="type === 'used'"></usedTable>
            <!-- 未使用 -->
            <noUseTable v-else-if="type === 'noUse'"></noUseTable>
            <!-- 已过期 -->
            <expiredTable v-else-if="type === 'expired'"></expiredTable>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import expiredTable from './components/expiredTable';
    import noUseTable from './components/noUseTable';
    import receivedTable from './components/receivedTable';
    import redeemedTable from './components/redeemedTable';
    import usedTable from './components/usedTable';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            expiredTable,
            noUseTable,
            receivedTable,
            redeemedTable,
            usedTable,
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'cardReport',
                        router : {
                            name : 'cardReport',
                        }
                    }
                ],
                //优惠券使用详情类型
                type : ''
            };
        },
        methods : {
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && params.type) {
                    this.type = params.type;
                } else {
                    this.$router.push({
                        name : 'cardReport'
                    });
                }
            },
            /**
             * 优惠券使用详情类型切换
             * @param type
             */
            changeType (type) {
                this.type = type;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .coupon-usage-details {
        .head-toolbox {
            display: flex;
            height: 60px;
            line-height: 60px;
            .left-tool {
                flex: 1 1;
                flex-basis: 60%;
                padding: 0 20px;
            }
            .right-tool {
                flex: 0 1;
                flex-basis: 40%;
                padding: 0 30px;
                text-align: right;
            }
        }

        .button-wrapper {
            display: inline-block;
            /deep/ .selected {
                border: 1px solid #2F70DF !important;
                z-index: 10;
                color: #2F70DF;
            }
        }
    }
</style>

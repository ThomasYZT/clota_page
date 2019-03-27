<!--
    优惠券操作记录页面 --- 导出卡券记录详情，生成链接记录详情，会员权益推送优惠券记录详情
    作者：杨泽涛
-->
<template>
    <div class="coupon-record">
        <!-- 面包屑导航 -->
        <breadCrumbHead :locale-router="'operateRecord'"
                        :before-router-list="beforeRouterList">
        </breadCrumbHead>

        <div class="head-toolbox">
            <div class="left-tool">
                <div class="button-wrapper"
                     :class="{ 'en-button-wrapper' : lang === 'en' }">
                    <ButtonGroup>
                        <Button type="default"
                                @click="changeType('export')"
                                :class="{'selected' : type === 'export'}"
                                class="tab-btn">{{$t('exportCouponRecord')}}</Button>
                        <Button type="default"
                                @click="changeType('link')"
                                :class="{'selected' : type === 'link'}"
                                class="tab-btn">{{$t('generateLinkRecord')}}</Button>
                        <Button type="default"
                                @click="changeType('push')"
                                :class="{'selected' : type === 'push'}"
                                class="tab-btn">{{$t('benefitCouponPushRecord')}}</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div class="right-tool">
                <span class="label-title">{{$t('exportTime')}}</span>
                <DatePicker v-model="dateTime"
                            type="daterange"
                            split-panels
                            :clearable="false"
                            :placeholder="$t('selectField', { msg : '' })"
                            style="width: 200px"></DatePicker>
            </div>
        </div>

        <div class="table-wrapper">
            <exportCouponRecordTable :dateTime="dateTime" v-if="type === 'export'"></exportCouponRecordTable>
            <generateLinkRecordTable :dateTime="dateTime" v-else-if="type === 'link'"></generateLinkRecordTable>
            <pushRecordTable :dateTime="dateTime" v-else-if="type === 'push'"></pushRecordTable>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import exportCouponRecordTable from './components/exportCouponRecordTable';
    import generateLinkRecordTable from './components/generateLinkRecordTable';
    import pushRecordTable from './components/pushRecordTable';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins';
    import { mapGetters } from 'vuex';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            exportCouponRecordTable,
            generateLinkRecordTable,
            pushRecordTable,
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'members-coupon',
                        router : {
                            name : 'coupon',
                        }
                    }
                ],
                //记录类型
                type : '',
                //日期范围
                dateTime : [new Date().addDays(-7), new Date()],
            };
        },
        computed : {
            ...mapGetters([
                'lang'
            ])
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
                        name : 'coupon'
                    });
                }
            },
            /**
             * 记录类型
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
    .coupon-record {
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

            .label-title {
                margin-right: 10px;
                font-size: 14px;
                color: #585858;
            }
        }

        .button-wrapper {
            display: inline-block;
            /deep/ .selected {
                border: 1px solid #2F70DF !important;
                z-index: 10;
                color: #2F70DF;
            }

            /deep/ .tab-btn {
                padding-right: 40px;
                padding-left: 40px;
                background-color: #fff;
                outline: none;
            }
        }

        .en-button-wrapper {
            display: inline-block;

            /deep/ .tab-btn {
                padding-right: 10px;
                padding-left: 10px;
                background-color: #fff;
                outline: none;
            }
        }

        .table-wrapper {
            padding: 0 10px;
        }
    }
</style>

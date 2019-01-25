<!--
内容：销售政策 - 我定义的销售政策/分销给我的销售政策
作者：
日期：
-->

<template>
    <div class="marketing-policy">

        <!--tab栏 仅非合作伙伴可见-->
        <div class="tabs-wrap" v-if="role !== 'partner'">
            <Tabs :animated="false" v-model="tabsName">
                <!--我定义的销售政策-->
                <TabPane v-if="hasMyPolicy" :label="$t('mySalePolicy')" name="created">
                    <myDefinedPolicyList v-if="tabsName === 'created'"></myDefinedPolicyList>
                </TabPane>
                <!--分销给我的销售政策（仅公司不可见）-->
                <TabPane :label="$t('distributeSalePolicy')"
                         name="cancellation"
                         v-if="role !== 'company' && hasToMyPolicy">
                    <policyToMeList v-if="tabsName === 'cancellation'"
                                    :scenicList="enumData.scene"></policyToMeList>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import myDefinedPolicyList from './child/myDefinedPolicyList';
    import policyToMeList from './child/policyToMeList';
    import { mapGetters } from 'vuex';
    import ajax from '@/api/index';

    export default {
        components : {
            myDefinedPolicyList,
            policyToMeList
        },
        data () {
            return {
                //当前账号角色
                role : '',
                //当前tap值
                tabsName : 'created',
                //枚举数据
                enumData : {
                    scene : [],
                },
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs',
                'permissionInfo',
            ]),
            //是否有我的销售政策
            hasMyPolicy () {
                return this.permissionInfo && 'queryPolicyList' in this.permissionInfo;
            },
            //是否有分销给我的销售政策
            hasToMyPolicy () {
                return this.permissionInfo && 'queryAllocation' in this.permissionInfo;
            },
        },
        created () {
            //设置当前角色
            this.role = this.manageOrgs.nodeType;
            //设置当前的tab页
            if (this.hasMyPolicy) {
                this.tabsName = 'created';
            } else if (this.hasToMyPolicy) {
                this.tabsName = 'cancellation';
            }
            //获取所属景区列表
            this.queryPolicyFromScenic();
        },
        methods : {
            //获取所属景区列表
            queryPolicyFromScenic () {
                ajax.post('queryPolicyFromScenic',{
                    selectType : 'to',
                    pageNo : 1,
                    pageSize : 999
                }).then(res => {
                    if (res.success) {
                        this.enumData.scene = res.data;
                    }
                });
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "~@/assets/scss/base";

    .marketing-policy {

        .tabs-wrap{
            /deep/ .ivu-tabs-nav{
                margin-left: 30px;
                font-size: $font_size_16px;
            }
        }

        .status-recharge {
            position: relative;
            padding-left: 14px;
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 6px;
                height: 6px;
                border-radius: 50px;
            }
        }
        .pass:after {
            background: $color_green;
        }
        .pending:after {
            background: $color_BBC5D5;
        }
        .reject:after {
            background: $color_red;
        }

    }

    .content-text {
        margin: 0 15px;
    }

    .yellow-label{
        word-break:break-all;
        color: $color_yellow;
    }

    .red-label {
        color: $color_red;
    }
</style>

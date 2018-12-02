<!--
    营销类型设置
    作者：杨泽涛
-->
<template>
    <div class="marketing-type-setting">
        <div class="setup-layout">
            <div class="tree-wrapper">
                <marketTypeTree></marketTypeTree>
            </div>

            <div class="view-wrapper">
                <Tabs :animated="false" v-model="nowTab">
                    <TabPane :label="$t('marketingLevel')">
                        <marketingLevel></marketingLevel>
                    </TabPane>
                    <TabPane :label="$t('codeRegisterManage')">
                        <codeRegister></codeRegister>
                    </TabPane>
                    <TabPane :label="$t('cashSetting')">
                        <cashOfferSettings></cashOfferSettings>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import marketTypeTree from './components/marketTypeTree';
    import cashOfferSettings from './child/cashOfferSettings';
    import codeRegister from './child/codeRegister';
    import marketingLevel from './child/marketingLevel';
    export default {
        components : {
            marketTypeTree,
            cashOfferSettings,
            codeRegister,
            marketingLevel,
        },
        data () {
            return {
                //当前tab项
                nowTab : 0
            };
        },
        methods : {

        },
        created () {

        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .marketing-type-setting {
        height: 100%;
        .setup-layout {
            width: 100%;
            height: 100%;
            display: flex;

            .tree-wrapper {
                flex: 1 0;
                flex-basis: 20%;
                height: 100%;
                border-right: 1px solid #E1E1E1;
                overflow: auto;
            }

            .view-wrapper {
                flex: 0 1;
                flex-basis: 78%;
                height: 100%;
                overflow: auto;
            }

            /deep/ .ivu-tabs {
                height: 100%;
            }

            /deep/ .ivu-tabs-nav {
                margin-left: 21px;
            }

            /deep/ .ivu-tabs-tab {
                padding: 14px 33px;
                color: #666666;
                font-size: 16px;

                &:hover {
                    color: #57a3f3;
                }
            }

            /deep/ .ivu-tabs-content {
                height: calc(100% - 51px);
                .ivu-tabs-tabpane {
                    height: 100%;
                    overflow: auto;
                }
            }

            /deep/ .ivu-tabs-tab-active {
                color: #2F70DF;
            }
        }
    }

</style>

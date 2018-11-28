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
                <Tabs :animated="false">
                    <TabPane :label="$t('marketingLevel')">1</TabPane>
                    <TabPane :label="$t('codeRegisterManage')">2</TabPane>
                    <TabPane :label="$t('cashSetting')">3</TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import marketTypeTree from './components/marketTypeTree';
    export default {
        components : {
            marketTypeTree
        },
        data () {
            return {};
        },
        methods : {}
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
                    padding: 30px 23px;
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

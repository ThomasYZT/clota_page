<!--
    营销类型设置
    作者：杨泽涛
-->
<template>
    <div class="marketing-type-setting">
        <div class="setup-layout">
            <div class="tree-wrapper">
                <marketTypeTree :marketingTypeItem.sync="marketingTypeItem"
                                :nowControlItem='nowItem'
                                :isUpdate.sync="isUpdate"></marketTypeTree>
            </div>

            <div class="view-wrapper">
                <Tabs v-if="Object.keys(marketingTypeItem).length > 0" :animated="false" v-model="nowTab">
                    <TabPane :label="$t('marketingLevel')">
                        <marketingLevel ref="marketingLevel"
                                        :marketingTypeItem="marketingTypeItem"
                                        :levelLength.sync="levelLength"></marketingLevel>
                    </TabPane>
                    <TabPane :label="$t('codeRegisterManage')">
                        <codeRegister :marketingTypeItem="marketingTypeItem"
                                      :levelLength="levelLength"
                                      @updateSuccess="updateSuccess"></codeRegister>
                    </TabPane>
                    <TabPane :label="$t('cashSetting')">
                        <cashOfferSettings :marketingTypeItem="marketingTypeItem"
                                           @updateSuccess="updateSuccess"></cashOfferSettings>
                    </TabPane>
                </Tabs>
                <noDataTip v-else></noDataTip>
            </div>
        </div>
    </div>
</template>

<script>
    import marketTypeTree from './components/marketTypeTree';
    import cashOfferSettings from './child/cashOfferSettings';
    import codeRegister from './child/codeRegister';
    import marketingLevel from './child/marketingLevel';
    import noDataTip from '../../../../components/noDataTip/noData-tip';
    export default {
        components : {
            marketTypeTree,
            cashOfferSettings,
            codeRegister,
            marketingLevel,
            noDataTip
        },
        data () {
            return {
                //当前tab项
                nowTab : 0,
                //是否需要更新状态
                isUpdate : false,
                //当前选择的营销类别项
                marketingTypeItem : {
                    id : ''
                },
                //当前选中的类别
                nowItem : {},
                //等级列表
                levelLength : 0,
            };
        },
        methods : {
            /**
             * 更新成功
             * @param {object} nowItem 当前操作的类别
             */
            updateSuccess (nowItem) {
                this.isUpdate = true;
                this.nowItem = nowItem;
            },
        },
        mounted () {
            console.log(this.$refs.marketingLevel.tableData)
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
                position: relative;
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

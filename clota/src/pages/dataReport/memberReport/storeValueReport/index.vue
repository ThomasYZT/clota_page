<!--
    会员储值报表
    作者：杨泽涛
-->
<template>
    <div class="store-value-report">
        <!-- 数据表 -->
        <datasheet v-if="type === 'datasheet'" :cardTypeList="cardTypeList" :scenicList="scenicList"></datasheet>

        <!-- 趋势图 -->
        <tendency v-else :cardTypeList="cardTypeList"></tendency>
    </div>
</template>

<script>
    import datasheet from './child/datasheet';
    import tendency from './child/tendency';
    import ajax from '../../../../api/index';
    export default {
        props : {
            type : {
                type : String,
                default : ''
            }
        },
        components : {
            datasheet,
            tendency,
        },
        data () {
            return {
                //会员卡类型列表数据
                cardTypeList : [
                    {
                        value : 'all',
                        label : 'memberTypeAll'
                    }
                ],
                //景区下拉列表数据
                scenicList : [
                    {
                        value : 'all',
                        label : 'allScenic'
                    }
                ]
            };
        },
        methods : {
            /**
             * 获取下拉列表数据
             */
            getSelectList () {
                ajax.post('queryScenicByOrgId').then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            this.scenicList = this.scenicList.concat(res.data.map(item => {
                                return {
                                    value : item.id,
                                    label : item.orgName
                                };
                            }));
                        }
                    } else {
                        this.scenicList = [
                            {
                                value : 'all',
                                label : 'allScenic'
                            }
                        ];
                    }
                });
            },
            /**
             * 获取会员卡类型下拉列表数据
             */
            getMemberTypeList () {
                ajax.post('queryCardTypeList').then(res => {
                    if (res.success && res.data.length > 0) {
                        this.cardTypeList = this.cardTypeList.concat(res.data.map(item => {
                            return {
                                value : item.id,
                                label : item.typeName
                            };
                        }));
                    } else {
                        this.cardTypeList = [
                            {
                                value : 'all',
                                label : 'memberTypeAll'
                            }
                        ];
                    }
                });
            }
        },
        created () {
            this.getMemberTypeList();
            this.getSelectList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .store-value-report {
        width: 100%;
        height: calc(100% - 59px);
    }
</style>

<!--
    会员卡销售报表
    作者：杨泽涛
-->
<template>
    <div class="card-sale-report">
        <!-- 数据表 -->
        <datasheet v-if="type === 'datasheet'" :cardTypeList="cardTypeList"></datasheet>

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
                cardTypeList : [],
            };
        },
        methods : {
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
                        this.defaultCardType = this.cardTypeList[0].value;
                    } else {
                        this.cardTypeList = [];
                    }
                });
            },
        },
        created () {
            this.getMemberTypeList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .card-sale-report {
        width: 100%;
        height: calc(100% - 59px);
    }

</style>

<!--会员卡有效期展示-->

<template>
    <div class="member-validate-date">
        <template v-if='Object.keys(memberLevelsData).length > 0'>
            <ButtonGroup class="card-list">
                <Button v-for="(item,name,index) in memberLevelsData"
                        :key="index"
                        :type="choosedCard === name ? 'primary' : 'ghost'"
                        @click="choseCard(name)">
                    {{name}}
                </Button>
            </ButtonGroup>
            <table-com
                :column-data="columnData"
                :table-data="tableData"
                :border="true"
                :auto-height="true"
                :height="95">
            </table-com>
        </template>
        <no-data v-else class="no-data-wrap">
        </no-data>
    </div>
</template>
<script>
    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom';
    import noData from '@/components/noDataTip/noData-tip.vue';
    export default {
        data () {
            return {
                //会员卡信息
                memberCardList : [],
                //选择的会员卡
                choosedCard : '',
                //会员卡数据
                memberLevelsData : {}
            };
        },
        components : {
            tableCom,
            noData
        },
        methods : {
            /**
             * 更改
             * @param{Object} cardName 选择的会员卡名称
             */
            choseCard (cardName) {
                this.choosedCard = cardName;
            },
            /**
             * 获取所有会员类别和类别下的所有级别数据
             */
            getMemberLevelsInType () {
                ajax.post('getMemberLevelsInType').then(res => {
                    if (res.success) {
                        this.memberLevelsData = res.data ? res.data : {};
                        if (Object.keys(this.memberLevelsData).length > 0) {
                            for (let item in this.memberLevelsData) {
                                this.choosedCard = item;
                                break;
                            }
                        }
                    } else {
                        this.memberLevelsData = {};
                    }
                });
            },
            /**
             * 获取表头数据
             * @param data 会员类别数据
             */
            getColumnData (data) {
                let columnData = [];
                for (let i = 0,j = data.length; i < j; i++) {
                    columnData.push({
                        title : data[i]['levelDesc'],
                        width : 180,
                        field : data[i]['levelDesc']
                    });
                }
                return columnData;
            },
            /**
             * 获取表格数据
             * @param data 会员类别数据
             */
            getTableData (data) {
                let tableData = [{}];
                for (let i = 0,j = data.length; i < j; i++) {
                    if (data[i]['effTime'] === null || data[i]['effTime'] === '') {
                        tableData[0][data[i]['levelDesc']] = this.$t('permanentValidity');
                    } else {
                        tableData[0][data[i]['levelDesc']] = data[i]['effTime'] + (data[i]['effTimeUnit'] ? this.$t('time.' + data[i]['effTimeUnit']) : '' );
                    }
                }
                return tableData;
            },
        },
        created () {
            this.getMemberLevelsInType();
        },
        computed : {
            //表头配置
            columnData () {
                return this.getColumnData(this.memberLevelsData[this.choosedCard]);
            },
            //表格数据
            tableData () {
                return this.getTableData(this.memberLevelsData[this.choosedCard]);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .member-validate-date{

        .no-data-wrap{
            width:500px;
        }
    }
</style>

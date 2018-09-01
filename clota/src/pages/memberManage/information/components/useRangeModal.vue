<template>
    <!--应用范围-->
    <Modal
        v-model="visible"
        :title="$t('applicationScope')"
        class-name="use-range-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="table-wrap">

                <div style="width: 262px;display: inline-block;float: left;">
                    <table-com
                        :table-com-min-height="400"
                        :column-data="corpusColumnData"
                        :table-data="corpusRangeData"
                        :border="false">
                        <el-table-column
                            slot="column0"
                            :label="row.title"
                            :prop="row.field"
                            :key="row.index"
                            :width="row.width"
                            :min-width="row.minWidth"
                            show-overflow-tooltip
                            slot-scope="row">
                        </el-table-column>
                    </table-com>
                </div>

                <div style="width: 262px;display: inline-block;">
                    <table-com
                        :table-com-min-height="400"
                        :column-data="donateColumnData"
                        :table-data="donateRangeData"
                        :border="false">
                        <el-table-column
                            slot="column0"
                            :label="row.title"
                            :prop="row.field"
                            :key="row.index"
                            :width="row.width"
                            :min-width="row.minWidth"
                            show-overflow-tooltip
                            slot-scope="row">
                        </el-table-column>
                    </table-com>
                </div>

            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="hide" >{{$t('back')}}</Button><!--返回-->
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props: ['store'],
        components: {
            tableCom,
        },
        data () {
            return {
                visible: false,
                //表头数据
                corpusColumnData: [
                    {
                        title: 'principal',     // 本金
                        minWidth: 200,
                        field: 'corpusRanges'
                    },
                ],
                donateColumnData: [
                    {
                        title: 'giftSum',  // 赠送金额
                        minWidth: 200,
                        field: 'donateRanges'
                    },
                ],
                //会员信息的账户数据
                accountInfo: {},
                //应用范围列表
                corpusRangeData: [],
                donateRangeData: [],
            }
        },
        methods: {

            show ( data ) {
                if( data ){
                    this.corpusRangeData = [];
                    this.accountInfo = data;
                    let corpusRanges = data.corpusAppliedOrgId ? data.corpusAppliedOrgId.split(',') : [];
                    let donateRanges = data.donateAppliedOrgId ? data.donateAppliedOrgId.split(',') : [];
                    this.store.forEach( (item, index) => {
                        if(corpusRanges.indexOf(item.id) > -1){
                            this.corpusRangeData.push({ corpusRanges: item.orgName });
                        }
                        if(donateRanges.indexOf(item.id) > -1){
                            this.donateRangeData.push({ donateRanges: item.orgName });
                        }
                    });
                }
                this.visible = true;
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.accountInfo = {};
                setTimeout(function () {
                    this.corpusRangeData = [];
                    this.donateRangeData = [];
                },300);
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .use-range-modal{
        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

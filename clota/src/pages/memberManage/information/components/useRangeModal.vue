<template>
    <!--应用范围-->
    <Modal
        v-model="visible"
        title="应用范围"
        class-name="use-range-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <div class="table-wrap">
                <el-table
                    :width="810"
                    :data="rangeData"
                    :border="false"
                    height="260"
                    style="width: 100%">
                    <el-table-column
                        prop="corpusRanges"
                        label="本金">
                    </el-table-column>
                    <el-table-column
                        prop="donateRanges"
                        label="赠送金额">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="ghost" @click="hide" >返回</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';

    export default {
        components: {},
        data () {
            return {
                visible: false,
                //会员信息的账户数据
                accountInfo: {},
                //应用范围列表
                rangeData: [],
            }
        },
        methods: {

            show ( data ) {
                if( data ){
                    this.accountInfo = data;
                    //获取账户应用范围
                    this.listAccountDetailRange();
                }
                this.visible = true;
            },

            //获取账户应用范围
            listAccountDetailRange () {
                ajax.post('listAccountDetailRange', {
                    accountId: this.accountInfo.id
                }).then(res => {
                    if(res.success){
                        if(res.data.corpusRanges.length > 0){
                            res.data.corpusRanges.forEach( (item,index) => {
                                this.rangeData.push(
                                    {
                                        corpusRanges: res.data.corpusRanges[index],
                                        donateRanges: res.data.donateRanges[index],
                                    })
                            })
                        }
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'listAccountDetailRange 失败！');
                    }
                });
            },

            //关闭模态框
            hide(){
                this.visible = false;
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

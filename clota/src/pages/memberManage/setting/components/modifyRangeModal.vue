<template>
    <!--默认账户本金/赠送金额可使用范围设置-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="false"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="orgName"
                        label="本金可使用范围设置">
                    </el-table-column>
                </el-table>
            </div>
            <!--<div class="page-wrap" v-if="tableData.length > 0">-->
                <!--<el-pagination-->
                    <!--layout="prev, pager, next"-->
                    <!--:total="50">-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="save" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        props: ['length','table-data'],
        components: {},
        data () {
            return {
                visible: false,
                title: '默认账户本金可使用范围设置',
                //表格多选列表
                multipleSelection: [],
                //区分本金/赠送金额 money/send
                type: 'money',
                //表单数据
                formData: {},
                index: null,
            }
        },
        methods: {

            show ( data, type) {
                console.log(data)
                console.log(type)
                if(type && type !== 'money'){
                    this.title = '默认账户赠送金额可使用范围设置';
                    this.index = this.length;
                }
                if( data ){
                    this.formData = data.item;
                    this.index = data.index;
                }
                this.visible = true;
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //保存
            save () {
                if(this.type === 'send'){
                    this.multipleSelection.forEach( (item, index) => {
                        this.formData.donateAppliedOrgId.push({ id: item.id });
                    });
                } else {
                    this.multipleSelection.forEach( (item, index) => {
                        this.formData.donateAppliedOrgId.push({ id: item.id });
                    });
                }
                let params = {
                    account: this.formData.account,
                    accountName: this.formData.accountName,
                    unit: this.formData.unit,
                    rate: this.formData.start/this.formData.end,
                    exchangeToCash: this.formData.exchangeToCash,
                    corpusAppliedOrgId: this.formData.corpusAppliedOrgId.join(','),
                    donateAppliedOrgId: this.formData.donateAppliedOrgId.join(','),
                };
                this.updateMemberAccountDefine(params);
            },

            //保存/更改/储值账户设置
            updateMemberAccountDefine ( params ) {
                ajax.post('updateMemberAccountDefine', params).then(res => {
                    if( res.success ) {
                        this.$Message.success('操作成功！');
                        this.hide();
                        this.$emit('updata-list', { item: this.formData, index: this.index});
                    } else {
                        this.$Message.warning(res.message || 'updateMemberAccountDefine 操作失败！');
                    }
                })
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.title = '默认账户本金可使用范围设置';
                this.formData = {};
                this.multipleSelection = [];
                this.index = null;
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 14px;
            height: 450px;


        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>

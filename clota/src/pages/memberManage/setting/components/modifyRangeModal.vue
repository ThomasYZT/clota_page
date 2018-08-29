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

                <template v-if="type === 'money'">
                    <table-com
                        ref="moneyMultiTablePlug"
                        :table-com-min-height="450"
                        :column-data="moneyColumnData"
                        :table-data="tableData"
                        @selection-change="handleSelectionChange"
                        :border="false">
                        <el-table-column
                            slot="column0"
                            :label="row.title"
                            :prop="row.field"
                            :key="row.index"
                            :width="row.width"
                            :min-width="row.minWidth"
                            type="selection"
                            slot-scope="row">
                        </el-table-column>
                    </table-com>
                </template>

                <template v-if="type === 'send'">
                    <table-com
                        ref="sendMultiTablePlug"
                        :table-com-min-height="450"
                        :column-data="sendColumnData"
                        :table-data="tableData"
                        @selection-change="handleSelectionChange"
                        :border="false">
                        <el-table-column
                            slot="column0"
                            :label="row.title"
                            :prop="row.field"
                            :key="row.index"
                            :width="row.width"
                            :min-width="row.minWidth"
                            type="selection"
                            slot-scope="row">
                        </el-table-column>
                    </table-com>
                </template>
            </div>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="save" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        props: ['length','table-data'],
        components: {
            tableCom,
        },
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
                //表头信息
                moneyColumnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: '本金可使用范围设置',
                        minWidth: 400,
                        field: 'orgName'
                    },
                ],
                sendColumnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: '赠送金额可使用范围设置',
                        minWidth: 400,
                        field: 'orgName'
                    },
                ],
            }
        },
        methods: {

            show ( data, type) {
                console.log(data)
                if(type && type !== 'money'){
                    this.title = '默认账户赠送金额可使用范围设置';
                    this.type = 'send';
                } else {
                    this.title = '默认账户本金可使用范围设置';
                    this.type = 'money';
                }
                if( data ){
                    let formData = defaultsDeep({}, data.item);
                    formData.corpusAppliedOrgId = data.item.corpusAppliedOrgId && data.item.corpusAppliedOrgId.length > 0 ?
                        data.item.corpusAppliedOrgId.split(',') : [];
                    formData.donateAppliedOrgId = data.item.donateAppliedOrgId && data.item.donateAppliedOrgId.length > 0  ?
                        data.item.donateAppliedOrgId.split(',') : [];
                    this.formData = formData;
                    this.index = data.index;
                }
                this.visible = true;

                if( data ){
                    if(type === 'money'){
                        if(this.formData.corpusAppliedOrgId && this.formData.corpusAppliedOrgId.length > 0){
                            this.formData.corpusAppliedOrgId.forEach( item => {
                                this.tableData.forEach( (list,index) => {
                                    if(item === list.id){
                                        this.$refs.moneyMultiTablePlug.toggleRowSelection(this.tableData[index], true);
                                    }
                                })
                            })
                        }
                    }

                    if(type === 'send'){
                        if(this.formData.donateAppliedOrgId && this.formData.donateAppliedOrgId.length > 0){
                            this.formData.donateAppliedOrgId.forEach( item => {
                                this.tableData.forEach( (list,index) => {
                                    if(item === list.id){
                                        this.$refs.sendMultiTablePlug.toggleRowSelection(this.tableData[index], true);
                                    }
                                })
                            })
                        }
                    }
                }

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
                        this.formData.corpusAppliedOrgId.push({ id: item.id });
                    });
                }
                let params = {
                    id: this.formData.id || '',
                    account: this.formData.account,
                    accountName: this.formData.accountName,
                    unit: this.formData.unit,
                    rate: this.rate,
                    exchangeToCash: this.formData.exchangeToCash,
                    corpusAppliedOrgId: this.formData.corpusAppliedOrgId.length > 0 ?
                        this.formData.corpusAppliedOrgId.join(',') : '',
                    donateAppliedOrgId: this.formData.donateAppliedOrgId.length > 0 ?
                        this.formData.donateAppliedOrgId.join(',') : '',
                };
                console.log(params);
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
                if( this.$refs.moneyMultiTablePlug ){
                    this.$refs.moneyMultiTablePlug.clearSelection();
                }
                if( this.$refs.sendMultiTablePlug ){
                    this.$refs.sendMultiTablePlug.clearSelection();
                }
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

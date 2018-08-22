<template>
    <!--储值赠送金额比例-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="add-account-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <Form ref="formValidate" :model="donateWhileRecharge" :rules="ruleValidate" :label-width="130">
                <div class="ivu-form-item-wrap">
                    <!--<FormItem-->
                        <!--label=""-->
                        <!--:prop="'items.' + index + '.value'"-->
                        <!--:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">-->
                        <!--储值：-->
                        <!--<Input type="text"-->
                                       <!--v-model.trim="item.lowerValue"-->
                                       <!--disabled-->
                                       <!--placeholder="请输入"-->
                                       <!--class="single-input"/> –-->
                                <!--<Input type="text"-->
                                       <!--v-model.trim="item.topValue"-->
                                       <!--disabled-->
                                       <!--placeholder="请输入"-->
                                       <!--class="single-input"/> 赠送-->
                                <!--<Input type="text"-->
                                       <!--v-model.trim="item.gift"-->
                                       <!--disabled-->
                                       <!--placeholder="请输入"-->
                                       <!--class="single-input"/> 元-->
                                <!--<span class="add-span red-color" v-if="item.disabled && index > 0" @click="handleRemove(index)">删除</span>-->
                        <!--<span class="add-span blue-color" v-if="!item.disabled" @click="handleSubmit('formDynamic')">应用范围</span>-->
                    <!--</FormItem>-->
                </div>
            </Form>

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
                        prop="name"
                        label="本金可使用范围设置">
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-wrap" v-if="tableData.length > 0">
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </div>

        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                visible: false,
                title: '新增储值赠送金额比例',
                //储值赠送金额比例设置
                index: null,
                donateWhileRecharge: [
                    {
                        lowerValue: 100,
                        topValue: 199,
                        gift: 5,
                        scope: '可用账号id',
                        index: 1,
                        status: 1,
                        disabled: true,
                    },
                ],
                ruleValidate: {
                    account: [
                        { required: true, message: '兑现数量不能为空', trigger: 'change' },
                    ],
                    channel: [
                        { required: true, message: '充值渠道不能为空', trigger: 'change' },
                    ],
                },
                tableData: [
                    { name: '温泉酒店A' },
                    { name: '温泉酒店B' },
                    { name: '温泉酒店C' },
                ],
                multipleSelection: [],
            }
        },
        methods: {

            show ( data, type) {
                if(type && type !== 'add'){
                    this.title = '修改储值赠送金额比例'
                }
                if( data ){
                    this.donateWhileRecharge = data.item;
                    this.index = data.index;
                }
                this.visible = true;
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if(valid){
                        this.$emit('submit-date', { data: this.donateWhileRecharge, index: this.index});
                    }
                })
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.$refs.formValidate.resetFields();
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

            .steps-wrap{
                padding-top: 5px;
                margin-left: 100px;
                margin-bottom: 18px;

                /deep/ .ivu-steps .ivu-steps-head-inner > .ivu-steps-icon.ivu-icon {
                    font-size: 12px;
                    transform: scale(0.7);
                }
                /deep/ .ivu-steps .ivu-steps-tail > i{
                    height: 2px;
                    border-radius: 2px;
                }
            }

        }
    }
</style>

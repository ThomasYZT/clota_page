<template>
    <!--储值赠送金额比例-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="add-account-modal vertical-center-modal"
        width="650"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">

            <div class="ivu-form-item-wrap">
                <div class="send-money-wrap">
                    <span class="label">储值：</span>
                    <Input type="text"
                           v-model.trim="formData.lowerValue"
                           @on-blur="validateInput(formData.lowerValue)"
                           placeholder="请输入"
                           class="single-input"/> –
                    <Input type="text"
                           v-model.trim="formData.topValue"
                           @on-blur="validateInput(formData.topValue)"
                           placeholder="请输入"
                           class="single-input"/> 赠送
                    <Input type="text"
                           v-model.trim="formData.gift"
                           @on-blur="validateInput(formData.gift)"
                           placeholder="请输入"
                           class="single-input"/> 元
                   <div class="ivu-form-item-error-tip" v-if="error">{{error}}</div>
                </div>
            </div>
            <div class="title">该规则应用范围：</div>
            <div class="table-wrap">
                <el-table
                    :data="tableData"
                    :border="false"
                    :height="tableData.length > 5 ? 320 : 'auto'"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="accountName"
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
            <Button type="primary"
                    :disabled="!(formData.lowerValue && formData.topValue && formData.gift && multipleSelection.length > 0)"
                    @click="save" >保存</Button>
            <Button type="ghost" @click="hide">取消</Button>
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
                title: '新增储值赠送金额比例',
                //表单数据--储值赠送金额比例设置
                index: null,
                formData:  {
                    lowerValue: 100,
                    topValue: 199,
                    gift: 5,
                    scope: '',
                    _status: 1,
                },
                //表格多选列表
                multipleSelection: [],
                //表单报错内容
                error: '',
            }
        },
        methods: {

            show ( data, type) {
                console.log(data)
                console.log(type)
                if(type && type !== 'add'){
                    this.title = '修改储值赠送金额比例';
                    this.index = this.length;
                }
                if( data ){
                    this.formData = data.item;
                    this.index = data.index;
                }
                this.visible = true;
            },

            //校验input输入
            validateInput ( value ) {
                if ( value && ( parseInt(value) < 0 || parseInt(value) + '' !== value + '' ) ) {
                    this.error = '当前输入只能是非负整数';
                    return false
                } else {
                    this.error = '';
                    return true
                }
            },

            //保存
            save () {
                if( this.validateInput(this.formData.lowerValue) &&
                    this.validateInput(this.formData.topValue) &&
                    this.validateInput(this.formData.gift) ){
                    let list = [];
                    this.multipleSelection.forEach( (item, index) => {
                        list.push({ id: item.id });
                    });
                    this.formData.scope = JSON.stringify(list);
                    console.log(this.formData)
                    this.$emit('submit-date', { item: this.formData, index: this.index});
                    this.hide();
                }
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //关闭模态框
            hide(){
                this.visible = false;
                this.formData = {
                    lowerValue: 0,
                    topValue: 0,
                    gift: 0,
                    scope: '',
                    _status: 1,
                };
                this.multipleSelection = [];
                this.index = null;
                this.error = '';
            },

        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 44px;
            height: 450px;

            /deep/ .ivu-form-item-wrap{
                position: relative;
                display: inline-block;
                width: 580px;
                padding-right: 55px;
                text-align: left;
                vertical-align: middle;
                margin: 5px 0 15px;

                /deep/ .ivu-input-wrapper{
                    width: 120px;
                    margin: 0 10px;
                }

            }

            /deep/ .ivu-form-item-error-tip{
                left: 50px;
                padding-top: 2px;
            }

            .title{
                font-size: $font_size_14px;
                color: $color_333;
                margin-bottom: 5px;
            }

            .page-wrap{
                margin-top: 10px;
            }
        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }

    }
</style>

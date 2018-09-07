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
                    <span class="label">{{$t('recharge')}}：</span>
                    <Input type="text"
                           v-model.trim="formData.lowerValue"
                           @on-blur="validateInput(formData.lowerValue, true)"
                           :placeholder="$t('inputField', {field: ''})"
                           class="single-input"/> –
                    <Input type="text"
                           v-model.trim="formData.topValue"
                           @on-blur="validateInput(formData.topValue)"
                           :placeholder="$t('inputField', {field: ''})"
                           class="single-input"/> {{$t('sendGift')}}
                    <Input type="text"
                           v-model.trim="formData.gift"
                           @on-blur="validateInput(formData.gift)"
                           :placeholder="$t('inputField', {field: ''})"
                           class="single-input"/> {{$t('yuan')}}
                   <div class="ivu-form-item-error-tip" v-if="error">{{error}}</div>
                </div>
            </div>
            <div class="title">{{$t('scopeOfApplicationOfTheRule')}}：</div>
            <div class="table-wrap">
                <table-com
                    ref="ruleMultiTablePlug"
                    :table-com-min-height="320"
                    :column-data="columnData"
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
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary"
                    :disabled="!(formData.topValue && formData.gift && multipleSelection.length > 0)"
                    @click="save" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide">{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import common from '@/assets/js/common.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        props: ['length','table-data'],
        components: {
            tableCom,
        },
        data () {
            return {
                visible: false,
                title: this.$t('addStoredSendRatio'),
                //表单数据--储值赠送金额比例设置
                index: null,
                formData:  {
                    lowerValue: 0,
                    topValue: 0,
                    gift: 0,
                    scope: '',
                    _status: 1,
                },
                //表格多选列表
                multipleSelection: [],
                //表单报错内容
                error: '',
                //表头信息
                columnData: [
                    {
                        title: '',
                        minWidth: 110,
                        field: '',
                    },
                    {
                        title: 'principalCanBeUsedInRangeSetting',
                        minWidth: 400,
                        field: 'accountName'
                    },
                ],
            }
        },
        methods: {

            show ( data, type) {
                if(type && type !== 'add'){
                    this.title = this.$t('modifyProportionOfDonatedAmountOfStorageValue');
                    this.index = this.length;
                }

                if( data ){
                    if(type && type !== 'add'){
                        this.formData = defaultsDeep({}, data.item);
                    } else {
                        this.formData = data.item;
                    }
                    this.index = data.index;
                }

                this.visible = true;

                if( data ){
                    setTimeout( () => {
                        if(data.item.scope && JSON.parse(data.item.scope) && JSON.parse(data.item.scope).length > 0){
                            JSON.parse(data.item.scope).forEach( item => {
                                this.tableData.forEach( (list,index) => {
                                    if(item.id === list.id){
                                        if(this.$refs.ruleMultiTablePlug){
                                            this.$refs.ruleMultiTablePlug.toggleRowSelection(this.tableData[index], true);
                                        }
                                    }
                                })
                            })
                        }
                    },300)
                }
            },

            //校验input输入
            validateInput ( value, flag ) {
                if( value === '' || value === 'null' || value === null || value == 0 || !value ){
                    if( (value == 0 || !value) && flag ){
                        this.error = '';
                        return true
                    }else{
                        this.error = this.$t('errorEmpty', {msg: ''});     // '不能为空'
                        return false
                    }
                } else if( value && value.length > 10 ){
                    this.error = this.$t('errorMaxLength',{field : '',length : 10});
                    return false
                } else if( value && value.isUtf16() ){
                    this.error = this.$t('errorIrregular');     // '输入内容不合规则'
                    return false
                } else {
                    this.error = '';
                    return true
                }
            },

            //保存
            save () {
                if( this.validateInput(this.formData.lowerValue, true) &&
                    this.validateInput(this.formData.topValue) &&
                    this.validateInput(this.formData.gift) ){

                    if(Number(this.formData.lowerValue) > Number(this.formData.topValue)) {
                        this.error = this.$t('startValBiggerThenMaxVal', {msg: ''});     // '不能为空'
                        return
                    }

                    let list = [];
                    this.multipleSelection.forEach( (item, index) => {
                        list.push({ id: item.id });
                    });
                    this.formData.scope = JSON.stringify(list);
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
                if( this.$refs.ruleMultiTablePlug ){
                    this.$refs.ruleMultiTablePlug.clearSelection();
                }
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
            overflow-y: auto;
            overflow-x: hidden;

            /deep/ .ivu-form-item-wrap{
                position: relative;
                display: inline-block;
                width: 580px;
                padding-right: 55px;
                text-align: left;
                vertical-align: middle;
                margin: 5px 0 15px;

            }

            /deep/ .ivu-input-wrapper{
                width: 120px;
                margin: 0 10px;
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

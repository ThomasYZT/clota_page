<template>
    <!--会员等级晋升规则设置-->
    <Modal
        v-model="visible"
        :title="$t('memberPromotionRules')"
        class-name="member-rule-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="formData" :label-width="170">
                <div class="ivu-form-item-wrap" v-for="(item, index) in formData.tableData">
                    <Form-item :label="item.levelDesc + $t('growthRange') + '：'"
                               :key="index"
                               :prop="'tableData.'+index+'.highestGrowthValue'"
                               :rules="[{ validator: emoji, trigger: 'blur' },
                                { max: 10, message: $t('errorMaxLength',{field : $t('value'),length : 10}), trigger: 'blur' },
                                { validator: maxLength, trigger: 'blur' },
                                { validator: validateNumber, trigger: 'blur' },
                                { validator: validateHigh, trigger: 'blur' },]">
                        <Input v-model.trim="item.lowerGrowthValue"
                               :placeholder="$t('inputField', {field: ''})"
                               class="single-input"/>
                        <span class="split-line">–</span>
                        <Input v-model.trim="item.highestGrowthValue"
                               :placeholder="$t('inputField', {field: ''})"
                               class="single-input"/>
                    </Form-item>
                </div>

            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

    </Modal>
</template>

<script>

    import ajax from '@/api/index';
    import common from '@/assets/js/common.js';
    import defaultsDeep from 'lodash/defaultsDeep';

    export default {
        components: {},
        data () {
            return {
                //校验正整数
                validateNumber : (rule,value,callback) => {
                    common.validateInteger( Number(value) ).then(() => {
                        callback();
                    }).catch(err => {
                        callback(this.$t(err, {field: ''}));
                    });
                },

                //校验表情
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                },

                //校验最高值范围
                validateHigh : (rule,value,callback) => {
                    let field = rule.field.split('.');
                    common.validateInteger( Number(this.formData.tableData[field[1]].lowerGrowthValue) ).then(() => {
                        if(Number(this.formData.tableData[field[1]].lowerGrowthValue) > Number(value)){
                            callback(this.$t('startValBiggerThenMaxVal'));
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        callback(this.$t(err, {field: ''}));
                    });
                },

                //校验长度
                maxLength : (rule, value, callback) => {
                    let field = rule.field.split('.');
                    if (this.formData.tableData[field[1]].lowerGrowthValue && this.formData.tableData[field[1]].lowerGrowthValue.length > 10) {
                        callback(this.$t('errorMaxLength',{field : '',length : 10}));
                    } else {
                        callback();
                    }
                },

                visible: false,
                //表单数据
                formData: {
                    tableData: [],
                },
                //Number型
                numberProps: ['lowerGrowthValue','highestGrowthValue'],
                //String型
                stringProps: ['lowerGrowthValue','highestGrowthValue'],
            }
        },
        methods: {

            //数据转换，数据查询后转成string进入input，保存时转成相应类型
            transPropsType ( data, type ) {
                switch (type) {
                    case 'number':
                        return data ? Number(data) : 0;
                        break;
                    case 'string':
                        return data!==null ? String(data) : '';
                        break;
                }
            },

            //显示弹窗，页面数据初始化，把数字转成string
            show ( data ) {
                if(data && data.length > 0){
                    let list = defaultsDeep([], data);
                    list.forEach( (item, index) => {
                        for( let key in item){
                            if(this.stringProps.indexOf(key) > -1){
                                item[key]= this.transPropsType(item[key], 'string');
                            }
                        }
                    });
                    this.formData.tableData =  defaultsDeep([], list);
                }
                this.visible = true;
            },

            save () {
                let params = [];
                let setParam = defaultsDeep([],  this.formData.tableData);
                setParam.forEach( (item, index) => {
                    for( let key in item){
                        if(this.numberProps.indexOf(key) > -1){
                            item[key]= this.transPropsType(item[key], 'number');
                        }
                    }
                    params.push({
                        id: item.id,
                        levelNum: item.levelNum,
                        levelDesc: item.levelDesc,
                        lowerGrowthValue: item.lowerGrowthValue,
                        highestGrowthValue: item.highestGrowthValue,
                    })
                });
                console.log(params)
                this.batchUpdateMemberLevels(params);
            },

            //会员等级晋升规则设置
            batchUpdateMemberLevels ( data ) {
                ajax.post('batchUpdateMemberLevels', { models: JSON.stringify(data) }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip', {tip: this.$t('operate')}) + '！');  // 操作成功
                        this.$emit('modify-success');
                        this.hide();
                    } else {
                        this.$Message.warning(res.message ? this.$t(res.message) :
                            'batchUpdateMemberLevels ' + this.$t('failureTip', {tip: this.$t('operate')}) + '！');  // 操作失败
                    }
                })
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.save();
                    }
                })
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
    .member-rule-modal{
        .modal-body{
            padding: 15px 20px 0;
            max-height: 420px;
            overflow: auto;

            /deep/ .ivu-input-wrapper{
                /*width: 280px;*/

                &.single-input{
                    width: 120px !important;
                }
            }

            .split-line{
                margin: 0 12px;
                color: $color_585858;
            }

        }

        .modal-footer{
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }
        }
    }
</style>


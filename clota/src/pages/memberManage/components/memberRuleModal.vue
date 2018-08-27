<template>
    <!--会员等级晋升规则设置-->
    <Modal
        v-model="visible"
        title="会员等级晋升规则设置"
        class-name="member-rule-modal vertical-center-modal"
        width="560"
        :mask-closable="false"
        @on-cancel="hide">

        <div class="modal-body">
            <Form ref="formValidate" :model="formData" :label-width="170">
                <div class="ivu-form-item-wrap" v-for="(item, index) in formData.tableData">
                    <Form-item :label="item.levelDesc+'成长值范围：'"
                               :key="index"
                               :prop="'tableData.'+index+'highestGrowthValue'"
                               :rules="[{ validator: emoji, trigger: 'blur' },
                               { validator: maxLength, trigger: 'blur' },
                               { validator: validateNumber, trigger: 'blur' },
                               { validator: validateHigh, trigger: 'blur' },]">
                        <Input v-model.trim="item.lowerGrowthValue"
                               placeholder="请输入"
                               :maxlength="10"
                               class="single-input"/>
                        <span class="split-line">–</span>
                        <Input v-model.trim="item.highestGrowthValue"
                               :maxlength="10"
                               placeholder="请输入"
                               class="single-input"/>
                    </Form-item>
                </div>

            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="formValidateFunc" >保存</Button>
            <Button type="ghost" @click="hide" >取消</Button>
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
                        callback(err);
                    });
                },

                //校验表情
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                },

                //校验最高值范围
                 validateHigh : (rule,value,callback) => {
                    common.validateInteger( Number(this.formData.lowerGrowthValue) ).then(() => {
                        if(Number(this.formData.lowerGrowthValue) > Number(value)){
                            callback(new Error('起始值不能大于最高值'));
                        } else {
                            callback();
                        }
                    }).catch(err => {
                        callback(err);
                    });
                },

                //校验长度
                maxLength : (rule, value, callback) => {
                    if (value && value.length > 10) {
                        callback(new Error('长度不能大于10'));
                    } else {
                        callback();
                    }
                },

                visible: false,
                //表单数据
                formData: {
                    tableData: [],
                },
            }
        },
        methods: {

            show ( data ) {
                if(data && data.length > 0){
                    this.formData.tableData = defaultsDeep([], data);
                }
                this.visible = true;
            },

            save () {
                var params = [];
                this.formData.tableData.forEach( item => {
                    var list = {
                        id: item.id,
                        lowerGrowthValue: item.lowerGrowthValue,
                        highestGrowthValue: item.highestGrowthValue,
                    };
                    params.push(list);
                })
                this.batchUpdateMemberLevels(params);
            },

            //会员等级晋升规则设置
            batchUpdateMemberLevels ( data ) {
                console.log(data)
                console.log(JSON.stringify(data))
                ajax.post('batchUpdateMemberLevels', { models: JSON.stringify(data) }).then(res => {
                    if(res.success){
                        this.$Message.success('操作成功！');
                        this.$emit('modify-success');
                        this.hide();
                    } else {
                        console.log(res);
                        this.$Message.warning(res.message || 'batchUpdateMemberLevels 操作失败！');
                    }
                })
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        console.log(true);
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


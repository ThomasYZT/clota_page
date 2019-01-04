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
                    <Form ref="formValidate"
                          :model="formData"
                          :rules="ruleValidate"
                          inline>
                        <i-row type="flex" justify="center" align="middle">
                            <i-col style="display: inline-block;width : auto;">
                                <span class="label">{{$t('recharge')}}：</span>
                            </i-col>
                            <i-col style="display: inline-block;width : auto;">
                                <FormItem prop="lowerValue">
                                    <Input type="text"
                                           v-model.trim="formData.lowerValue"
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/>
                                </FormItem>
                            </i-col>
                            <i-col style="display: inline-block;width : auto;">–</i-col>
                            <i-col style="display: inline-block;width : auto;">
                                <FormItem prop="topValue">
                                    <Input type="text"
                                           v-model.trim="formData.topValue"
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/>
                                </FormItem>
                            </i-col>
                            <i-col style="display: inline-block;width : auto;">
                                {{$t('sendGift')}}
                            </i-col>
                            <i-col style="display: inline-block;width : auto;">
                                <FormItem prop="gift">
                                    <Input type="text"
                                           v-model.trim="formData.gift"
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/> {{$t('yuan')}}
                                </FormItem>
                            </i-col>
                        </i-row>
                    </Form>
                </div>
            </div>
            <div class="title">{{$t('scopeOfApplicationOfTheRule')}}：</div>
            <div class="table-wrap">
                <el-tree :data="cardAccountInfo"
                         :props="defaultProps"
                         :default-expand-all="true"
                         show-checkbox
                         :render-content="renderContent">
                </el-tree>
                <!--<table-com-->
                    <!--ref="ruleMultiTablePlug"-->
                    <!--:table-com-min-height="320"-->
                    <!--:column-data="columnData"-->
                    <!--:height="370"-->
                    <!--:table-data="tableData"-->
                    <!--@selection-change="handleSelectionChange"-->
                    <!--:border="false">-->
                    <!--<el-table-column-->
                        <!--slot="column0"-->
                        <!--:label="row.title"-->
                        <!--:prop="row.field"-->
                        <!--:key="row.index"-->
                        <!--:width="row.width"-->
                        <!--:min-width="row.minWidth"-->
                        <!--type="selection"-->
                        <!--slot-scope="row">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                        <!--slot="column1"-->
                        <!--:label="row.title"-->
                        <!--:prop="row.field"-->
                        <!--:key="row.index"-->
                        <!--:width="row.width"-->
                        <!--:min-width="row.minWidth"-->
                        <!--slot-scope="row">-->
                        <!--<template slot-scope="scope">-->
                            <!--{{scope.row.typeName}}-{{scope.row.levelDesc}}-->
                        <!--</template>-->
                    <!--</el-table-column>-->
                <!--</table-com>-->
            </div>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary"
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
        props : ['length','table-data'],
        components : {
            tableCom,
        },
        data () {
            //校验储值的最低值
            const validateLowerValue = (rule,value,callback) => {
                common.validateMoney(value,0,10).then(() => {
                    if (common.isNotEmpty(this.formData.topValue) && Number(value) > Number(this.formData.topValue)) {
                        callback(this.$t('storeValueRangeErr'));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('storeValueMin'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('storeValueMin') }));
                    }
                });
            };
            //校验储值的最大值
            const validateTopValue = (rule,value,callback) => {
                common.validateMoney(value,0,10).then(() => {
                    if (common.isNotEmpty(this.formData.lowerValue) && Number(value) < Number(this.formData.lowerValue)) {
                        callback(this.$t('storeValueRangeErr'));
                    } else {
                        callback();
                    }
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('storeValueMax'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('storeValueMax') }));
                    }
                });
            };
            //校验赠送金额
            const validateGift = (rule,value,callback) => {
                common.validateMoney(value,0,10).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('giftSum'),length : 10 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('giftSum') }));
                    }
                });
            };
            return {
                visible : false,
                title : this.$t('addStoredSendRatio'),
                //表单数据--储值赠送金额比例设置
                index : null,
                formData : {
                    lowerValue : '',
                    topValue : '',
                    gift : '',
                    scope : '',
                    _status : 1,
                },
                //表格多选列表
                multipleSelection : [],
                //表头信息
                columnData : [
                    {
                        title : '',
                        minWidth : 110,
                        field : '',
                    },
                    {
                        title : 'applicationScope',
                        minWidth : 400,
                        // 会员3期暂时去掉
                        // field : 'accountName'
                        field : 'levelDesc'
                    },
                ],
                //表单校验规则
                ruleValidate : {
                    lowerValue : [
                        {
                            required : true,
                            validator : validateLowerValue,
                            trigger : 'blur'
                        }
                    ],
                    topValue : [
                        {
                            required : true,
                            validator : validateTopValue,
                            trigger : 'blur'
                        }
                    ],
                    gift : [
                        {
                            required : true,
                            validator : validateGift,
                            trigger : 'blur'
                        }
                    ]
                },
                cardAccountInfo : [{
                    label : '一级 1',
                    children : [{
                        label : '二级 1-1',
                        children : [{
                            label : '三级 1-1-1'
                        }]
                    }]
                }, {
                    label : '一级 2',
                    children : [{
                        label : '二级 2-1',
                        children : [{
                            label : '三级 2-1-1'
                        }]
                    }, {
                        label : '二级 2-2',
                        children : [{
                            label : '三级 2-2-1'
                        }]
                    }]
                }, {
                    label : '一级 3',
                    children : [{
                        label : '二级 3-1',
                        children : [{
                            label : '三级 3-1-1'
                        }]
                    }, {
                        label : '二级 3-2',
                        children : [{
                            label : '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps : {
                    children : 'children',
                    label : 'label'
                }
            };
        },
        methods : {

            show ( data, type) {
                if (type && type !== 'add') {
                    this.title = this.$t('modifyProportionOfDonatedAmountOfStorageValue');
                    this.index = this.length;
                }

                if ( data ) {
                    if (type && type !== 'add') {
                        this.formData = defaultsDeep({}, data.item);
                    } else {
                        this.formData = data.item;
                    }
                    this.index = data.index;
                }

                this.visible = true;

                if ( data ) {
                    setTimeout( () => {
                        if (data.item.scope && JSON.parse(data.item.scope) && JSON.parse(data.item.scope).length > 0) {
                            JSON.parse(data.item.scope).forEach( item => {
                                this.tableData.forEach( (list,index) => {
                                    if (item.id === list.id) {
                                        if (this.$refs.ruleMultiTablePlug) {
                                            this.$refs.ruleMultiTablePlug.toggleRowSelection(this.tableData[index], true);
                                        }
                                    }
                                });
                            });
                        }
                    },300);
                }
            },
            //保存
            save () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        if (this.multipleSelection.length > 0) {
                            let list = [];
                            this.multipleSelection.forEach( (item, index) => {
                                list.push({ id : item.id });
                            });
                            this.formData.scope = JSON.stringify(list);
                            this.$emit('submit-date', { item : JSON.parse(JSON.stringify(this.formData)), index : this.index });
                            this.hide();
                        } else {
                            this.$Message.warning(this.$t('selectField',{ msg : this.$t('applicationScope') }));
                        }
                    }
                });
            },

            handleSelectionChange (val) {
                this.multipleSelection = val;
            },

            //关闭模态框
            hide () {
                this.visible = false;
                this.formData = {
                    lowerValue : '',
                    topValue : '',
                    gift : '',
                    scope : '',
                    _status : 1,
                };
                this.multipleSelection = [];
                if ( this.$refs.ruleMultiTablePlug ) {
                    this.$refs.ruleMultiTablePlug.clearSelection();
                }
                this.index = null;
                this.$refs.formValidate.resetFields();
            },
            /**
             * 会员卡账户数据树
             * @param h
             * @param{Object} root 根节点
             * @param{Object} node 当前节点
             * @param{Object} data 当前节点上的数据
             */
            renderContent (h, { root, node, data }) {
                return h('div',{
                    style : {}
                },[h('span',data.label)]);
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .add-account-modal{

        .modal-body{
            padding: 0 20px;
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
                margin: 0 9px;
            }

            /deep/ .ivu-form-item-error-tip{
                left: 9px;
            }

            /deep/ .ivu-form-item{
                margin-bottom: 0;
                margin-right: 0;
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

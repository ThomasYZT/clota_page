<!--
内容：产品列表 - 编辑/新增产品 - 新增产品
作者：
日期：
-->
<template>
    <Modal
        title="Title"
        v-model="visible"
        :mask-closable="false"
        class="edit-park-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="content-info">

            <!--一票制表单信息-->
            <Form ref="formValidate"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">

                <div class="padding-bottom" style="padding: 10px 0;">
                    <span>{{$t('所属景区')}}：</span>
                    <span>野生动物园</span>
                </div>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('选择产品')" prop="saleType"><!--选择产品-->
                            <Select v-model="formData.saleType"
                                    :disabled="type === 'check'"
                                    :placeholder="$t('selectField', {msg: ''})" @on-change="changeChooseProduct">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>

                <!--分割线-->
                <div class="split-line"></div>

                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('限制库存')" prop="saleType"><!--限制库存-->
                            <Select v-model="formData.saleType"
                                    :disabled="type === 'check'"
                                    :placeholder="$t('selectField', {msg: ''})" @on-change="changeStock">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('库存数量')" prop="saleType"><!--库存数量-->
                            <Input v-model.trim="formData.dayEnterTimes"
                                   :disabled="type === 'check'"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="12">
                        <FormItem :label="$t('景区成本价')" prop="saleType"><!--景区成本价-->
                            <Input v-model.trim="formData.dayEnterTimes"
                                   :disabled="type === 'check'"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </FormItem>
                    </i-col>
                    <i-col span="12">
                        <FormItem :label="$t('产品单价')" prop="saleType"><!--产品单价-->
                            <Input v-model.trim="formData.dayEnterTimes"
                                   :disabled="type === 'check'"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('分账设置')" prop="enterCheckPlace"><!--分账设置-->
                            <!--入园检票处--核销表格,区分查看与编辑-->
                            <table-com
                                :table-com-min-height="250"
                                :column-data="subAccountColumn"
                                :table-data="subAccountData"
                                :border="true">
                                <el-table-column
                                    slot="column1"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <Input v-model.trim="scope.row.status"
                                               :disabled="type === 'check'"
                                               class="short-input"
                                               :placeholder="$t('inputField', {field: ''})" @on-blur="checkInput(scope.row)"/>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </FormItem>
                    </i-col>
                </i-row>
                <div><span class="red-span">{{$t('未分帐金额')}}：30{{$t('yuan')}}</span></div>
            </Form>

        </div>
        <div slot="footer">
            <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
            <Button type="ghost" class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import titlePark from '../../components/titlePark.vue';
    import { saleType, authenticationType } from '@/assets/js/constVariable';
    import { subAccountColumn} from './editPolicyConfig';
    import common from '@/assets/js/common.js';

    export default {
        props: {},
        components: {
            tableCom,
            titlePark,
        },
        data() {
            let validateMethod = {
                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') ));    // 输入内容不合规则
                    } else {
                        callback();
                    }
                }
            };
            //校验正整数
            const validateNumber = (rule,value,callback) => {
                if(value){
                    common.validateInteger(value).then(() => {
                        callback();
                    }).catch(err => {
                        if(err === 'errorMaxLength'){
                            callback(this.$t(err,{field : this.$t(rule.field),length : 10}));
                        }else{
                            callback(this.$t(err,{field : this.$t(rule.field)}));
                        }
                    });
                }
            };

            return {
                //类型 add/modify
                type: 'add',
                //标题信息
                title : this.$t('add') + this.$t('产品'),
                //是否显示模态框
                visible : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表单数据
                formData: {
                    choosePark: '',//选择园区
                    saleType: 'one',//售票方式
                    //入园核销
                    peopleEnterTimes: '',//每人可入园总次数
                    dayEnterTimes: '',//每日可入园次数
                    equipmentGroup: '',//设备分组
                    enterCheckPlace: '',//入园检票处
                    otherSet: ['fingerprint'],//其他设置
                    //游玩项目
                    projectTotalTimes: '',//项目游玩总次数
                    addProjectGroup: [],//添加项目分组
                },
                ruleValidate: {
                    choosePark: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('productName')}), trigger: 'change' },     // 不能为空
                    ],
                    saleType: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('saleType')}), trigger: 'change' },
                    ],
                    peopleEnterTimes: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('peopleEnterTimes')}), trigger: 'blur' },
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('peopleEnterTimes'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    dayEnterTimes: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('dayEnterTimes')}), trigger: 'blur' },
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('dayEnterTimes'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                    projectTotalTimes: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('projectTotalTimes')}), trigger: 'blur' },
                        { type: 'string', max: 10, message: this.$t('errorMaxLength', {field: this.$t('projectTotalTimes'), length: 10}), trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' },
                        { validator: validateNumber, trigger: 'blur' }
                    ],
                },
                //枚举数据
                enumData: {
                    choosePark: [],
                    //售票方式
                    saleType: saleType,
                    //设备分组
                    group: [],
                    //认证方式
                    authenticationType: authenticationType,
                },

                //分账表头
                subAccountColumn: subAccountColumn,
                //分账表格数据
                subAccountData: [
                    {
                        id: '1',
                        name: '旋转木马',
                        times: 3,
                        day: 3,
                        play: 'true',
                    },
                    {
                        id: '2',
                        name: '摩天轮',
                        times: 3,
                        day: 3,
                        play: 'false',
                    },
                    {
                        id: '3',
                        name: '过山车',
                        times: 0,
                        day: 0,
                        play: 'false',
                    },
                ],
            }
        },
        methods: {

            //售票方式改变
            changeSaleType ( val ) {
                let obj = this.enumData.saleType.find( item => val === item.value );
                if(obj && val === 'one_ticket'){
                    this.title = this.$t(this.type) + this.$t('oneTicketPark');
                } else {
                    this.title = this.$t(this.type) + this.$t('moreTicketPark');
                }
                this.$nextTick(() => {
                    this.$refs.formValidate.resetFields();
                });
            },

            //选择产品改变
            changeChooseProduct ( val ) {
                console.log(val)
            },

            //限制库存改变
            changeStock ( val ) {
                console.log(val)
            },

            //校验表格填入
            checkInput ( data ) {
                console.log(data)
            },

            /**
             * 确认
             */
            confirm() {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        this.loading = true;
                        if(this.confirmCallback){
                            this.confirmCallback( this.formData );
                            this.cancel();
                        }
                    }
                })
            },

            /**
             * 取消
             */
            cancel() {
                this.visible = false;
                this.$refs.formValidate.resetFields();
                if(this.cancelCallback){
                    this.cancelCallback();
                }
            },

            /**
             * 显示 模态框
             * @param data
             * @param type
             * @param title
             * @param confirmCallback
             * @param cancelCallback
             */
            show ({data,type,title,confirmCallback = null,cancelCallback}) {
                this.visible = true;
                this.title = title;
                this.type = type;
                if(data && data.id){
                    this.formData = data;
                }
                if(confirmCallback && typeof confirmCallback == 'function'){
                    this.confirmCallback = confirmCallback;
                }
                if(cancelCallback && typeof cancelCallback == 'function'){
                    this.cancelCallback = cancelCallback;
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-park-modal {
        & /deep/ .ivu-modal {
            width: 740px !important;
            min-height: 580px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline();
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .content-info {
            @include block_outline();
            font-size: $font_size_14px;
            color: $color_333;
            padding: 20px 40px;
            text-align: left;
            max-height: 600px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline();
                margin: 0 auto;
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.short-input{
                    width: 180px;
                }
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input{
                font-size: $font_size_14px;
            }

            /deep/ .ivu-select-placeholder{
                font-size: $font_size_14px;
            }

            .padding-bottom{
                padding-bottom: 10px;
            }

            .split-line{
                border-top: 1px dashed $color_979797_020;
                padding-bottom: 20px;
            }

            .red-span{
                color: $color_red;
            }

        }
    }

    .span-yellow{
        color: $color_yellow !important;
    }

</style>

<!--
内容：产品列表 - 编辑/新增票类 - 新增园区
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
            <Form ref="oneTicketFormValidate"
                  key="oneTicketFormValidate"
                  v-if="formData.saleType === 'one'"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('choosePark')" prop="choosePark"><!--选择园区-->
                            <Select v-model="formData.choosePark"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.park"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="iconfont icon-help" v-title="$t('chooseParkNotice')"></span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('saleType')" prop="saleType"><!--售票方式-->
                            <Select v-model="formData.saleType"
                                    :placeholder="$t('selectField', {msg: ''})" @on-change="changeSaleType">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="notice" v-if="formData.saleType === 'one'">{{$t('oneTicketNotice')}}</span>
                            <span class="notice" v-if="formData.saleType === 'more'">{{$t('moreTicketNotice')}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('peopleEnterTimes')" prop="peopleEnterTimes"><!--每人可入园总次数-->
                            <Input v-model.trim="formData.peopleEnterTimes"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('dayEnterTimes')" prop="dayEnterTimes"><!--每日可入园次数-->
                            <Input v-model.trim="formData.dayEnterTimes"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('selectField',{msg: $t('equipmentGroup')})" prop="equipmentGroup"><!--设备分组-->
                            <Select v-model="formData.equipmentGroup"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeEquipmentGroup">
                                <Option v-for="(item,index) in enumData.group"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('enterCheckPlace')" prop="enterCheckPlace"><!--入园检票处-->
                            <!--入园检票处--核销表格-->
                            <table-com
                                :table-com-min-height="250"
                                :column-data="distributeColumnHead"
                                :table-data="distributeTableData"
                                :border="false">
                                <el-table-column
                                    slot="column2"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.status === 'true' ? $t('startingUse') : $t('unStarting') }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="normal"
                                                v-if="scope.row.status === 'false'"
                                                @click="startUse(scope.row)">{{$t('commissioned')}}</li><!--启用-->
                                            <li class="span-yellow"
                                                v-else
                                                @click="disabled(scope.row)">{{$t('disabled')}}</li><!--禁用-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('otherSet')" prop="otherSet"><!--其他设置-->
                            <CheckboxGroup v-model="formData.otherSet">
                                <Checkbox v-for="(item,index) in enumData.authenticationType"
                                          :key="index"
                                          :label="item.value">
                                    {{$t(item.label)}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                    </i-col>
                </i-row>
            </Form>

            <!--多票制表单信息-->
            <Form ref="moreTicketFormValidate"
                  key="moreTicketFormValidate"
                  v-if="formData.saleType === 'more'"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('choosePark')" prop="choosePark"><!--选择园区-->
                            <Select v-model="formData.choosePark"
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in enumData.park"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="iconfont icon-help" v-title="$t('chooseParkNotice')"></span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('saleType')" prop="saleType"><!--售票方式-->
                            <Select v-model="formData.saleType"
                                    :placeholder="$t('selectField', {msg: ''})" @on-change="changeSaleType">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="notice" v-if="formData.saleType === 'one'">{{$t('oneTicketNotice')}}</span>
                            <span class="notice" v-if="formData.saleType === 'more'">{{$t('moreTicketNotice')}}</span>
                        </FormItem>
                    </i-col>
                </i-row>

                <!--入园核销-->
                <title-park title="enterCheck"></title-park>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('peopleEnterTimes')" prop="peopleEnterTimes"><!--每人可入园总次数-->
                            <Input v-model.trim="formData.peopleEnterTimes"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('dayEnterTimes')" prop="dayEnterTimes"><!--每日可入园次数-->
                            <Input v-model.trim="formData.dayEnterTimes"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('selectField',{msg: $t('equipmentGroup')})" prop="equipmentGroup"><!--设备分组-->
                            <Select v-model="formData.equipmentGroup"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeEquipmentGroup">
                                <Option v-for="(item,index) in enumData.group"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('enterCheckPlace')" prop="enterCheckPlace"><!--入园检票处-->
                            <!--入园检票处--核销表格-->
                            <table-com
                                :table-com-min-height="250"
                                :column-data="distributeColumnHead"
                                :table-data="distributeTableData"
                                :border="false">
                                <el-table-column
                                    slot="column2"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.status === 'true' ? $t('startingUse') : $t('unStarting') }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="normal"
                                                v-if="scope.row.status === 'false'"
                                                @click="startUse(scope.row)">{{$t('commissioned')}}</li><!--启用-->
                                            <li class="span-yellow"
                                                v-else
                                                @click="disabled(scope.row)">{{$t('disabled')}}</li><!--禁用-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </FormItem>
                    </i-col>
                </i-row>

                <!--游玩项目-->
                <title-park title="playProject"></title-park>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('projectTotalTimes')" prop="projectTotalTimes"><!--项目游玩总次数-->
                            <Input v-model.trim="formData.projectTotalTimes"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('addProjectGroup')" prop="addProjectGroup"><!--添加项目分组-->
                            <Select v-model="formData.addProjectGroup"
                                    :multiple="true"
                                    :clearable="true"
                                    :placeholder="$t('selectField', {msg: ''})" @on-change="changeProjectGroup">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                    </Option>
                            </Select>
                            <span class="example" @click="jumpForExample">{{$t('example')}}</span>
                            <!--项目分组表格-->
                            <div class="table-wrap">
                                <table-com
                                    :table-com-min-height="250"
                                    :column-data="proGroupColumnHead"
                                    :table-data="proGroupTableData"
                                    :border="false">
                                    <el-table-column
                                        slot="column2"
                                        :label="row.title"
                                        :prop="row.field"
                                        :key="row.index"
                                        :width="row.width"
                                        :min-width="row.minWidth"
                                        show-overflow-tooltip
                                        slot-scope="row">
                                        <template slot-scope="scope">
                                            <InputNumber :max="9999999999"
                                                         :min="1"
                                                         v-model.trim="scope.row.times"
                                                         :placeholder="$t('inputField', {field: ''})"
                                                         @on-blur="checkTimes(scope.row)">
                                            </InputNumber>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        slot="column3"
                                        :label="row.title"
                                        :prop="row.field"
                                        :key="row.index"
                                        :width="row.width"
                                        :min-width="row.minWidth"
                                        show-overflow-tooltip
                                        slot-scope="row">
                                        <template slot-scope="scope">
                                            <InputNumber :max="9999999999"
                                                         :min="1"
                                                         v-model.trim="scope.row.day"
                                                         :placeholder="$t('inputField', {field: ''})"
                                                         @on-blur="checkTimes(scope.row)">
                                            </InputNumber>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        slot="column4"
                                        slot-scope="row"
                                        :label="row.title"
                                        :width="row.width"
                                        :min-width="row.minWidth">
                                        <template slot-scope="scope">
                                            <ul class="operate-list">
                                                <li class="normal"
                                                    v-if="scope.row.play === 'true'"
                                                    @click="setAblePlay(scope.row)">{{$t('setAblePlay')}}</li><!--设为可玩-->
                                                <li class="normal"
                                                    v-else
                                                    @click="setMustPlay(scope.row)">{{$t('setMustPlay')}}</li><!--设为必玩-->
                                            </ul>
                                        </template>
                                    </el-table-column>
                                </table-com>
                            </div>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('otherSet')" prop="otherSet"><!--其他设置-->
                            <CheckboxGroup v-model="formData.otherSet">
                                <Checkbox v-for="(item,index) in enumData.authenticationType"
                                          :key="index"
                                          :label="item.value">
                                    {{$t(item.label)}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                    </i-col>
                </i-row>

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
    import titlePark from '../components/titlePark.vue';
    import { saleType, authenticationType } from '@/assets/js/constVariable';
    import {distributeColumnHead, proGroupColumnHead} from './parkConfig';
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
                title : this.$t('add') + this.$t('oneTicketPark'),
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
                //入园检票处表头
                distributeColumnHead: distributeColumnHead,
                //可游玩园区表格数据
                distributeTableData: [
                    {
                        id: '1',
                        name: '闸机A',
                        status: 'true',
                    },
                    {
                        id: '2',
                        name: '闸机B',
                        status: 'false',
                    },
                ],
                //项目分组表头
                proGroupColumnHead: proGroupColumnHead,
                //项目分组表格数据
                proGroupTableData: [
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
                if(obj && val === 'one'){
                    this.title = this.$t(this.type) + this.$t('oneTicketPark');
                } else {
                    this.title = this.$t(this.type) + this.$t('moreTicketPark');
                }
                this.$nextTick(() => {
                    let fromRef = '';
                    if(this.formData.saleType === 'one'){
                        fromRef = 'oneTicketFormValidate'
                    }else if(this.formData.saleType === 'more'){
                        fromRef = 'moreTicketFormValidate'
                    }
                    if(fromRef){
                        this.$refs[fromRef].resetFields();
                    }
                });
            },

            //设备分组改变
            changeEquipmentGroup ( val ) {
                console.log(val)
            },

            //项目分组改变
            changeProjectGroup ( val ) {
                console.log(val)
            },

            //启用
            startUse ( data ) {
                console.log(data)
            },
            //禁用
            disabled ( data ) {
                console.log(data)
            },

            //设为可玩
            setAblePlay ( data ) {
                console.log(data)
            },
            //设为必玩
            setMustPlay ( data ) {
                console.log(data)
            },

            //校验表格填入次数与总数
            checkTimes ( data ) {
                console.log(data)
            },

            //跳转进入示例页面
            jumpForExample () {
                console.log('跳转进入示例页面');
            },

            /**
             * 确认
             */
            confirm() {
                let fromRef = '';
                if(this.formData.saleType === 'one'){
                    fromRef = 'oneTicketFormValidate'
                }else if(this.formData.saleType === 'more'){
                    fromRef = 'moreTicketFormValidate'
                }
                if(fromRef){
                    this.$refs[fromRef].validate((valid) => {
                        if ( valid ) {
                            this.loading = true;
                            if(this.confirmCallback){
                                this.confirmCallback( this.formData );
                                this.cancel();
                            }
                        }
                    })
                }
            },

            /**
             * 取消
             */
            cancel() {
                this.visible = false;
                if(this.$refs.oneTicketFormValidate){
                    this.$refs.oneTicketFormValidate.resetFields();
                }
                if(this.$refs.moreTicketFormValidate){
                    this.$refs.moreTicketFormValidate.resetFields();
                }
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
            padding: 25px 40px;
            text-align: left;
            max-height: 600px;
            overflow: auto;

            /deep/ .ivu-form {

                @include block_outline();
                margin: 0 auto;

            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
            }

            /deep/ .ivu-input-number{
                font-size: $font_size_14px;
                width: 110px;
                color: #333333;
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

            /deep/ .ivu-checkbox{
                margin-right: 5px;
            }

            .table-wrap{
                padding-top: 20px;
            }

            .iconfont{
                margin-left: 8px;
                font-size: $font_size_14px;
                color: $color_gray;
            }

            .notice{
                font-size: $font_size_12px;
                color: $color_999;
                display: inline-block;
                width: calc(100% - 300px);
                line-height: 14px;
                padding-left: 8px;
            }

            .example{
                float: right;
                color: $color_blue;
                cursor: pointer;
            }

        }
    }

    .span-yellow{
        color: $color_yellow !important;
    }

</style>

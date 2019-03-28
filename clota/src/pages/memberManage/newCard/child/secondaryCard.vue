<!--
内容：业主卡 - 副卡
作者：djc
日期：
-->

<template>
    <div class="owner-vice-card">
        <h3>{{$t('viceCard')}}</h3>
        <div class="btn-wrap">
            <Button type="primary" @click="addViceCard">{{$t('addViceCard')}}</Button>
        </div>
        <Form ref="formValidate" >
            <table-com
                auto-height
                :show-pagination="false"
                :column-data="columnData"
                :table-data="tableData"
                :table-com-min-height="250">
                <!--序号-->
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem prop="custName"
                                  :rules="{ validator : validateName,trigger : 'blur',data : scope.row.custName,maxLength : 20 }">
                            <Input v-model.trim="scope.row.custName"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem prop="phoneNum"
                                  :rules="{ validator : validatePhoneName,trigger : 'blur',data : scope.row.phoneNum }">
                            <Input v-model.trim="scope.row.phoneNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem prop="gender"
                                  :rules="{ validator : validateExist,trigger : 'change',index : scope.$index ,_field : 'gender'}">
                            <Select v-model="scope.row.gender" transfer
                                    :placeholder="$t('selectField', {msg: ''})">
                                <Option v-for="(item,index) in genderEnum" :key="index"
                                        :value="item.name">
                                    {{$t(item.desc)}}
                                </Option>
                            </Select>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem prop="certificationType"
                                  :rules="{ validator : validateExist,trigger : 'change',index : scope.$index ,_field : 'certificationType',msgField : 'credentialsType'}">
                            <Select v-model="scope.row.certificationType"
                                    transfer
                                    :placeholder="$t('selectField', {msg: $t('credentialsType')})"><!--请选择证件类型-->
                                <Option v-for="item in idType"
                                        :key="item.id"
                                        :value="item.id">
                                    {{$t(item.name)}}
                                </Option>
                            </Select>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem prop="idCardNumber"
                                  :rules="{ validator : validateExist,trigger : 'blur',index : scope.$index ,_field : 'idCardNumber',msgField : 'identificationNum'}">
                            <Input v-model.trim="scope.row.idCardNumber"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem prop="birthDay"
                                  :rules="{ validator : validateExist,trigger : 'change',index : scope.$index ,_field : 'birthDay',msgField : 'birthday'}">
                            <Date-picker
                                type="date"
                                v-model="scope.row.birthDay"
                                :options="dateOption"
                                :editable="false"
                                format="yyyy-MM-dd"
                                transfer
                                :placeholder="$t('selectField', {msg: ''})">
                            </Date-picker>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column7"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <FormItem :prop="'tradePassword' + scope.$index"
                                  :rules="{ validator : validateExist,trigger : 'blur',index : scope.$index ,_field : 'tradePassword',msgField : 'payPass'}">
                            <ul class="operate-list">
                                <li v-if="scope.row.tradePassword"
                                    @click="setPayPassword(scope.$index)">{{$t('haveSetted')}}
                                </li>
                                <li v-else
                                    @click="setPayPassword(scope.$index)">{{$t('setTradePass')}}
                                </li>
                            </ul>
                        </FormItem>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column8"
                    slot-scope="row"
                    :label="row.title"
                    fixed="right"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li class="red-label"
                                @click="delCard(scope.$index)">{{$t('clear')}}
                            </li>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </Form>
        <!--设置支付密码模态框-->
        <set-password-modal v-model="setPasswordModalShow"
                            @set-pay-password="getPayPassword">
        </set-password-modal>
    </div>
</template>
<script type="text/ecmascript-6">
    import { secondaryCardHead } from './newCardConfig';
    import { genderEnum } from '@/assets/js/constVariable';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { validator } from 'klwk-ui';
    import setPasswordModal from '../components/setPasswordModal';

    export default {
        components : {
            tableCom,
            setPasswordModal
        },
        props : {
            //证件类型列表
            idType : Array,
            //主卡信息
            'main-card-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        data () {
            return {
                // 表头配置
                columnData : secondaryCardHead,
                //设置支付密码模态框是否显示
                setPasswordModalShow : false,
                //当前设置支付密码的序号
                setPasswordIndex : '',
                // 表格数据
                tableData : [],
                // 性别枚举
                genderEnum : genderEnum,
                dateOption : {
                    disabledDate : function (value) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
            };
        },
        methods : {
            /**
             * 校验姓名格式是否正确
             * @param{Object} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 回调函数
             */
            validateName (rule,value,callback) {
                if (rule.data) {
                    if (rule.data.length > rule.maxLength) {
                        callback(this.$t('errorMaxLength', { field : this.$t('name'), length : rule.maxLength }));
                    } else {
                        callback();
                    }
                } else {
                    callback(this.$t('inputField', { field : this.$t('name') }));
                }
            },
            /**
             * 校验手机格式是否正确
             * @param{Object} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 回调函数
             */
            validatePhoneName (rule,value,callback) {
                if (rule.data) {
                    if (validator.isMobile(rule.data)) {
                        if ( this.mainCardInfo.phoneNum === rule.data ) {
                            callback(this.$t('phoneNumRepeat'));
                        } else {
                            callback();
                        }
                    } else {
                        callback(this.$t('errorFormat', { field : this.$t('phoneNum') }));
                    }
                } else {
                    callback(this.$t('inputField', { field : this.$t('phoneNum') }));
                }
            },
            /**
             * 校验是否填写了值
             * @param{Object} rule 校验规则
             * @param{String} value 校验值
             * @param{Function} callback 回调函数
             */
            validateExist (rule,value,callback) {
                this.$nextTick(() => {
                    if (this.tableData[rule.index][rule._field]) {
                        callback();
                    } else {
                        if (rule.trigger === 'change') {
                            callback(this.$t('selectField', { msg : this.$t(rule.msgField ? rule.msgField : rule._field) }));
                        } else {
                            if (rule._field === 'tradePassword') {
                                callback(this.$t('setTradePass'));
                            } else {
                                callback(this.$t('inputField', { field : this.$t(rule.msgField ? rule.msgField : rule._field) }));
                            }
                        }
                    }
                });
            },
            /**
             * 获取支付密码
             * @param{String} payPassword
             */
            getPayPassword (payPassword) {
                this.tableData[this.setPasswordIndex]['tradePassword'] = payPassword;
                this.$nextTick(() => {
                    this.$refs.formValidate.validateField('tradePassword' + this.setPasswordIndex);
                });
            },
            /**
             * 设置交易密码
             * @param{Number} index
             */
            setPayPassword (index) {
                this.setPasswordIndex = index;
                this.setPasswordModalShow = true;
            },
            /**
             * 新增副卡
             */
            addViceCard () {
                this.tableData.push({
                    custName : "",
                    phoneNum : "",
                    birthDay : "",
                    gender : "",
                    certificationType : "",
                    idCardNumber : "",
                    tradePassword : ""
                });
                this.freshTableData();
            },
            /**
             * 校验副卡表单
             * @return{Function} promise对象
             */
            validateForm () {
                return new Promise((resolve,reject) => {
                    if (this.tableData.length === 0) {
                        resolve();
                    } else {
                        this.$refs.formValidate.validate(valid => {
                            if (valid) {
                                resolve();
                            } else {
                                reject();
                            }
                        });
                    }
                });
            },
            /**
             * 删除副卡信息
             * @param{Number} index
             */
            delCard (index) {
                this.tableData.splice(index,1);
                this.freshTableData();
            },
            /**
             * 更新副卡信息
             */
            freshTableData () {
                this.$emit('set-vice-card-info',this.tableData);
            },
            /**
             * 清空副卡信息
             */
            resetTableData () {
                this.tableData = [];
                this.$emit('set-vice-card-info',this.tableData);
            }
        },
        computed : {
            //证件类别对象类型
            idTypeObj () {
                let result = {};
                for (let i = 0,j = this.idType.length; i < j; i++) {
                    result[this.idType[i]['id']] = this.idType[i];
                }
                return result;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .owner-vice-card{

        .btn-wrap{
            height: 48px;
            padding-top: 8px;
        }

        h3 {
            margin-top: 20px;
            text-align: center;
            font-size: $font_size_16px;
            color: $color_333;
        }

        /deep/ .ivu-form-item-content{
            position: initial;
        }

        /deep/ .ivu-form-item{
            margin-bottom: 0;
        }

        /deep/ .ivu-form-item-error-tip{
            bottom: 0px;
            left: 18px;
            top : auto;
        }
    }
</style>

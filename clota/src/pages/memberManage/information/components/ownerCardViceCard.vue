<!--业主卡副卡/主卡-->

<template>
    <div class="owner-card-vice-card" v-if="cardInfo.cardTypeId === '1'">
        <div class="title" v-if="cardInfo.motherCard">主卡信息<span class="add-vice-card" @click="addViceCard">+新增副卡</span></div>
        <div class="title" v-else>副卡信息</div>
        <Form ref="formValidate" >
            <table-com
                auto-height
                :column-data="columnData"
                :table-data="tableData"
                border
                :table-com-min-height="250">
                <el-table-column
                    slot="column0"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <FormItem prop="custName"
                                      :rules="{ validator : validateName,trigger : 'blur',data : scope.row.custName,maxLength : 20 }">
                                <Input v-model.trim="scope.row.custName"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row.custName | contentFilter}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <FormItem prop="phoneNum"
                                      :rules="{ validator : validatePhoneName,trigger : 'blur',data : scope.row.phoneNum }">
                                <Input v-model.trim="scope.row.phoneNum"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row.phoneNum | contentFilter}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column2"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <FormItem prop="gender"
                                      :rules="{ validator : validateExist,trigger : 'change',index : scope.$index ,_field : 'gender'}">
                                <Select v-model="scope.row.gender"
                                        transfer
                                        :placeholder="$t('selectField', {msg: ''})">
                                    <Option v-for="(item,index) in genderEnum"
                                            :key="index"
                                            :value="item.name">
                                        {{$t(item.desc)}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </template>
                        <template v-else>
                            {{$t(scope.row.gender) | contentFilter}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column3"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <FormItem prop="certificationType"
                                      :rules="{ validator : validateExist,trigger : 'change',index : scope.$index ,_field : 'certificationType',msgField : 'credentialsType'}">
                                <Select v-model="scope.row.certificationType"
                                        transfer
                                        :placeholder="$t('selectField', {msg: $t('credentialsType')})"><!--请选择证件类型-->
                                    <Option v-for="item in idTypes"
                                            :key="item.id"
                                            :value="item.id">
                                        {{$t(item.name)}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row.certificationType | contentFilter}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <FormItem prop="idCardNumber"
                                      :rules="{ validator : validateExist,trigger : 'blur',index : scope.$index ,_field : 'idCardNumber',msgField : 'identificationNum'}">
                                <Input v-model.trim="scope.row.idCardNumber"
                                       :placeholder="$t('inputField', {field: ''})"/>
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row.idCardNumber | contentFilter}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column5"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
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
                        <template v-else>
                            {{scope.row.birthDay | contentFilter}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column6"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
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
                        <template v-else>
                            {{scope.row.tradePassword ? '●●●●●●' : ''}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column9"
                    slot-scope="row"
                    :label="row.title"
                    :width="tableOperateColumnWidth"
                    fixed="right">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <li v-if="!scope.row.edit" class="red-label" @click="stopAccount(scope.row)">{{$t('停用')}}</li>
                            <template v-else-if="scope.row.edit">
                                <li @click="saveAccount(scope.row)">{{$t('save')}}</li>
                                <li @click="cancelAdd(scope.$index)">{{$t('cancel')}}</li>
                                <li @click="readEntityCardInfo(scope.$index)" :class="{ disabled : !cardReadEnabled }">{{$t('读取实体卡')}}</li>
                            </template>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </Form>
        <!--确认停用模态框-->
        <confirm-modal ref="confirmModal">
            <div class="confirm-label">
                <i class="iconfont icon-warn" style="color : #F7981C;font-size: 17px;"></i>
                {{$t('是否确认停用该会员')}}
            </div>
        </confirm-modal>
        <!--设置支付密码模态框-->
        <set-password-modal v-model="setPasswordModalShow"
                            @fresh-data="$emit('fresh-data',$event)"
                            @set-pay-password="getPayPassword">
        </set-password-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import { columnData } from './ownerCardViceCardConfig';
    import confirmModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index.js';
    import { validator } from 'klwk-ui';
    import { genderEnum } from '@/assets/js/constVariable';
    import { mapGetters } from 'vuex';
    import setPasswordModal from '../../newCard/components/setPasswordModal';

    export default {
        props : {
            //会员卡信息
            'card-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
        components : {
            tableCom,
            confirmModal,
            setPasswordModal
        },
        data () {
            return {
                //表格数据
                tableData : [
                    {}
                ],
                //当前操作的数据
                currentData : {},
                // 性别枚举
                genderEnum : genderEnum,
                //证件列表
                idTypes : [],
                //设置支付密码模态框是否显示
                setPasswordModalShow : false,
                //当前设置支付密码的序号
                setPasswordIndex : '',
                dateOption : {
                    disabledDate : function (value) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
            };
        },
        methods : {
            /**
             * 停用账户
             * @param{Object} rowData
             */
            stopAccount (rowData) {
                this.currentData = rowData;
                this.$refs.confirmModal.show({
                    title : this.$t('notice'),
                    confirmCallback : () => {
                        this.confirmStopAccount();
                    }
                });
            },
            /**
             * 保存副卡信息
             * @param{Object} rowData 保存的业主卡信息
             */
            saveAccount (rowData) {
                ajax.post('').then(res => {
                    if (res.success) {

                    } else {

                    }
                });
            },
            /**
             * 确认停用业主卡
             */
            confirmStopAccount () {
                ajax.post('').then(res => {
                    if (res.success) {
                        this.$Message.success('停用成功');
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error('停用失败');
                    }
                });
            },
            /**
             * 新增副卡
             */
            addViceCard () {
                this.tableData.push({
                    edit : true
                });
            },
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
                        callback();
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
             * 查询证件类型
             */
            queryDocument () {
                ajax.post('queryDocument', {
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        this.idTypes = res.data ? res.data.data : [];
                    } else {
                        this.idTypes = [];
                    }
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
             * 获取实体卡信息
             * @param{Number} index
             */
            readEntityCardInfo (index) {
                if (!this.cardReadEnabled) return;
                this.$store.dispatch('getCardReadData').then(res => {
                    //校验当前页面是否已经使用了读取的卡
                    for (let i = 0,j = this.tableData.length; i < j; i++) {
                        if (this.tableData[i]['tpNo'] === res) {
                            this.$Message.warning(this.$t('entityCardUsedErr'));
                            return;
                        }
                    }
                    this.findByPhysicalNum(res).then(item => {
                        this.tableData[index]['tpNo'] = item.physicalNum;
                        this.tableData[index]['tpCardNo'] = item.faceNum;
                    }).catch((err) => {
                        if (err && err === 'M026') {
                            this.$Message.warning(this.$t('entityCardUsedErr'));
                        } else {
                            this.$Message.warning(this.$t('noMatchCard'));
                        }
                        this.tableData[index]['tpNo'] = '';
                        this.tableData[index]['tpCardNo'] = '';
                    });
                });
            },

            /**
             * 查看实体卡是否可以使用
             * @param{String} physicalNum
             * @return{Object} promise对象
             */
            findByPhysicalNum (physicalNum) {
                return new Promise((resolve,reject) => {
                    ajax.post('findByPhysicalNum',{
                        physicalNum : physicalNum,
                        entityCardType : 'common'
                    }).then((res) => {
                        if (res.success) {
                            if (res.data && Object.keys(res.data).length > 0) {
                                resolve(res.data);
                            } else {
                                reject();
                            }
                        } else {
                            if (res.code && res.code === 'M026') {
                                reject('M026');
                            } else {
                                reject();
                            }
                        }
                    }).catch(() => {
                        reject();
                    });
                });
            },
            /**
             * 设置支付密码
             * @param{String} password 支付密码
             */
            getPayPassword (password) {
                this.tableData[this.setPasswordIndex]['tradePassword'] = password;
            },
            /**
             * 取消保存
             * @param{Number} index
             */
            cancelAdd (index) {
                this.tableData.splice(index,1);
            }
        },
        computed : {
            //表格操作列宽度
            tableOperateColumnWidth () {
                let hasEditColumn = false;
                hasEditColumn = this.tableData.some(item => item.edit);
                return hasEditColumn ? 210 : 80;
            },
            ...mapGetters({
                cardReadEnabled : 'cardReadEnabled'
            }),
            columnData () {
                if (this.cardInfo && this.cardInfo.motherCard) {
                    return columnData;
                } else {
                    return columnData.slice(0,-1);
                }
            }
        },
        created () {
            this.queryDocument();
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .owner-card-vice-card{

        .title {
            font-size: $font_size_16px;
            color: $color-333;
            line-height: 24px;
            @include clearfix();
            margin-bottom: 10px;

            .add-vice-card{
                color: $color_blue;
                cursor: pointer;
                font-size: $font_size_14px;
            }
        }

        /deep/ .ivu-form-item{
            margin-bottom: 0;
        }
    }
</style>

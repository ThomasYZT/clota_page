<!--修改购房金额模态框-->

<template>
    <Modal
        :title="$t('修改购房金额')"
        :mask-closable="false"
        :value="value"
        :width="600"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="change-house-money-modal"
        class-name="vertical-center-modal">
        <Form ref="formValidate"
              :model="formData"
              :rules="ruleValidate"
              :label-width="180">
            <!--购房总金额-->
            <Form-item :label="$t('homeBuyMoney')" prop="houseMoney">
                <Input v-model.trim="formData.houseMoney"
                       style="width : 300px"
                       :placeholder="$t('inputField', {field: $t('homeBuyMoney')})"/>
            </Form-item>
        </Form>
        <table-com
            auto-height
            :column-data="columnData"
            :table-data="tableData"
            :height="300"
            :table-com-min-height="250">
        </table-com>
        <div slot="footer" class="modal-footer">
            <Button type="primary" class="ivu-btn-90px" @click="save" >{{$t("save")}}</Button>
            <Button type="ghost" class="ivu-btn-90px" @click="cancel" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import common from '@/assets/js/common.js';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import ajax from '@/api/index.js'

	export default {
	    components : {
            tableCom
        },
        props : {
            //模态框是否显示
            value : {
                type : Boolean,
                default : false
            },
            //会员卡信息
            'card-info' : {
                type : Object,
                default () {
                    return {};
                }
            }
        },
		data () {
            //校验购房总金额
            const validateHouseMoney = (rule,value,callback) => {
                common.validateMoney(value,0,15).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'errorMaxLength') {
                        callback(this.$t('errorMaxLength',{ field : this.$t('homeBuyMoney'),length : 15 }));
                    } else {
                        callback(this.$t(err,{ field : this.$t('homeBuyMoney') }));
                    }
                });
            };
			return {
			    //校验规则
                ruleValidate : {
                    houseMoney : [
                        {
                            required : true,
                            message : this.$t('inputField', { field : this.$t('homeBuyMoney') }),
                            trigger : 'blur',
                        },
                        {
                            validator : validateHouseMoney,
                            trigger : 'blur'
                        }
                    ],
                },
                //表单数据
                formData : {
                    //购房金额
                    houseMoney : ''
                },
                //修改购房金额记录
                tableData : [],
                //购房记录表头配置
                columnData : [
                    {
                        title : '修改时间', // 修改时间
                        minWidth : 190,
                        field : 'updatedTime',
                        type : 'time'
                    },
                    {
                        title : '原购房金额', // 原购房金额
                        width : 150,
                        field : 'oldMoney',
                        type : 'money'
                    },
                    {
                        title : '修改后购房金额', // 修改后购房金额
                        minWidth : 150,
                        field : 'newMoney',
                        type : 'money'
                    },
                    {
                        title : '操作人', // 操作人
                        width : 100,
                        field : 'optUser'
                    },
                ]
            };
		},
		methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 保存修改的购房金额
             */
            save () {
                this.$refs.formValidate.validate(valid => {
                    if (valid) {
                        this.saveHouseMoney();
                    }
                });
            },
            /**
             * 取消修改购房金额
             */
            cancel () {
                this.$emit('input',false);
            },
            /**
             * 模态框状态改变
             * @param{String} type 模态框显隐状态
             */
            visibleChange (type) {
                if (type === false) {
                    this.$refs.formValidate.resetFields();
                } else {
                    this.queryHouseMoneyEditRecord();
                }
            },
            /**
             * 保存修改的购房金额
             */
            saveHouseMoney () {
                ajax.post('updateHomeMoney',{
                    memberId : this.cardInfo.memberId,
                    homeMoney : this.formData.houseMoney,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success('修改购房金额成功');
                        this.$emit('fresh-data');
                    } else {
                        this.$Message.error('修改购房金额失败');
                    }
                }).finally(() => {
                    this.$emit('input',false);
                });
            },
            /**
             * 查询购房金额修改记录
             */
            queryHouseMoneyEditRecord () {
                ajax.post('queryHouseMoneyEditRecord',{
                    memberId : this.cardInfo.memberId
                }).then(res => {
                    if (res.success) {
                        this.tableData = res.data ? res.data.map(item => {
                            let record = item.contents ? JSON.parse(item.contents) : {};
                            return {
                                ...item,
                                oldMoney : record.oldMoney,
                                updatedTime : record.updatedTime,
                                optUser : record.optUser,
                                newMoney : record.newMoney,
                            };
                        }) : [];
                    } else {
                        this.tableData = [];
                    }
                });
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-house-money-modal{

        /deep/ .ivu-modal-body{
            .el-table th,
            .el-table td{
                padding: 8px 0;
            }
        }
    }
</style>

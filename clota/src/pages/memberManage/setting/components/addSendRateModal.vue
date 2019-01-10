<template>
    <!--储值赠送金额比例-->
    <Modal
        v-model="visible"
        :title="title"
        class-name="add-account-modal vertical-center-modal"
        width="720"
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
                                           style="width: 80px;"
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/>
                                </FormItem>
                            </i-col>
                            <i-col style="display: inline-block;width : auto;">–</i-col>
                            <i-col style="display: inline-block;width : auto;">
                                <FormItem prop="topValue">
                                    <Input type="text"
                                           style="width: 80px;"
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
                                           style="width: 80px;"
                                           :placeholder="$t('inputField', {field: ''})"
                                           class="single-input"/>{{isMutipleAccount ? $t('variousUnit') : $t('yuan')}}
                                </FormItem>
                            </i-col>
                        </i-row>
                    </Form>
                </div>
            </div>
            <div class="title">{{$t('scopeOfApplicationOfTheRule')}}：</div>
            <div class="table-wrap">
                <el-tree :data="cardAccountInfo"
                         v-show="filteredData.length > 0"
                         :props="defaultProps"
                         :default-expand-all="true"
                         show-checkbox
                         node-key="uniqueName"
                         ref="accountTree"
                         :filter-node-method="menuNodeFilter"
                         :render-content="renderContent">
                </el-tree>
                <no-data v-show="filteredData.length < 1">
                </no-data>
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
    import defaultsDeep from 'lodash/defaultsDeep';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    import noData from '@/components/noDataTip/noData-tip.vue';

    export default {
        components : {
            noData
        },
        props : ['length'],
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
                //账户信息
                cardAccountInfo : [],
                defaultProps : {
                    children : 'cardLevelAccountVos',
                    label : 'name'
                },
                //过滤后的数据
                filteredData : []
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
                this.queryLevelAccount();
            },
            //保存
            save () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        let accountSelected = this.$refs.accountTree.getCheckedNodes();
                        if (accountSelected.length > 0) {
                            let scopeData = [];
                            accountSelected.forEach(item => {
                                //cardLevelAccountVos 为空表示是账户信息
                                if (!item.cardLevelAccountVos) {
                                    let levelId = item.uniqueName.split('_')[0];
                                    scopeData.push({
                                        id : levelId,
                                        accountTypeId : item.id,
                                        uniqueName : item.uniqueName,
                                    });
                                }
                            });
                            this.formData.scope = JSON.stringify(scopeData);
                            this.$emit('submit-date', { item : JSON.parse(JSON.stringify(this.formData)), index : this.index });
                            this.hide();
                        } else {
                            this.$Message.warning(this.$t('selectField',{ msg : this.$t('applicationScope') }));
                        }
                    }
                });
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
                this.index = null;
                this.cardAccountInfo = [];
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
                return h('div', {
                    style : {
                        display : 'inline-block',
                        width : '100%'
                    },
                    class : {
                        'title-wrap' : true,
                    },
                }, [
                    h('span', {
                        class : {
                            'title-class' : true
                        },
                        directives : [
                            {
                                name : 'w-title',
                                value : data.name + ( data.unit ? this.$t('bracketSetting',{ content : this.$t(data.unit) }) : '' )
                            }
                        ],
                    }, data.name + ( data.unit ? this.$t('bracketSetting',{ content : this.$t(data.unit) }) : '' ))
                ]);
            },
            /**
             * 查看级别下所有账户信息
             */
            queryLevelAccount () {
                ajax.post('queryLevelAccount').then(res => {
                    if (res.success && res.data) {
                        this.cardAccountInfo = res.data;
                    } else {
                        this.cardAccountInfo = [];
                    }
                }).finally(() => {
                    this.$nextTick(() => {
                        let scopeData = this.formData.scope ? JSON.parse(this.formData.scope) : [];
                        let defaultChoosedAccount = scopeData.map(item => item.uniqueName);
                        this.$refs.accountTree.setCheckedKeys(defaultChoosedAccount);
                        this.filteredData = [];
                        this.$refs.accountTree.filter('account');
                    });
                });
            },
            /**
             * 筛选账户信息
             * @param{String} value 筛选值
             * @param{Object} data 账户数据
             */
            menuNodeFilter (value,data) {
                if (this.isMutipleAccount) {
                    this.filteredData.push(data);
                    return true;
                } else {
                    return data.id === '1';
                }
            },
        },
        computed : {
            ...mapGetters({
                memberConfigInfo : 'memberConfigInfo',
            }),
            //是否是多账户类型
            isMutipleAccount () {
                return this.memberConfigInfo && this.memberConfigInfo['accountPattern'] && this.memberConfigInfo['accountPattern'] === 'multiple';
            },
        }
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

        .table-wrap{
            position: relative;
            height: calc(100% - 100px);
            overflow: auto;

            /deep/ .title-wrap {
                @include absolute_pos(relative, 0, 0, 0, -20px);
                padding-left: 20px;
                cursor: pointer;

                &:hover {
                    background: $color_fafa;

                    .title-class {
                        color: $color_blue;
                    }

                    .iconfont:not(.hidden) {
                        display: inline-block;
                    }
                }

                &.active-node{

                    .title-class {
                        color: $color_blue;
                    }
                }

                .title-class {
                    @include overflow_tip(unquote('calc(100% - 2px)'), 36px);
                    display: inline-block;
                    padding: 7px 0;
                    line-height: 22px;
                    font-size: 16px;
                    color: #333333;
                    vertical-align: middle;
                }

                .iconfont {
                    display: none;
                    color: $color_blue;
                    font-size: 14px;
                    float: right;
                    margin-top: 7px;
                    cursor: pointer;
                }
            }
        }

    }
</style>

<!--
    分销弹窗
    作者：杨泽涛
-->
<template>
    <Modal v-model="show"
           width="760"
           :mask-closable="false"
           :title="$t('distribution')">
        <div class="content">
            <Form ref="policyform"
                  :model="formData"
                  :rules="ruleValidate"
                  v-if="detail">
                <div class="form-content">
                    <i-row class="first-row">
                        <i-col span="18">
                            <Form-item :label="$t('distributeName')+'：'" prop="name"><!--分销名称-->
                                <Input v-model="formData.name" :placeholder="$t('distributeName')"></Input>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('salePolicyName')+'：'"><!--销售政策名称-->
                                <div v-w-title="detail.name">{{detail.name | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('scenePlace')+'：'"><!--所属景区-->
                                <div v-w-title="detail.scenicName">{{detail.scenicName | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                    <i-row>
                        <i-col span="12">
                            <Form-item :label="$t('superiorDistribution')+'：'"><!--上级分销商-->
                                <div v-w-title="detail.parentDistributor">{{detail.parentDistributor | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                        <i-col span="12">
                            <Form-item :label="$t('desc')+'：'"><!--描述-->
                                <div v-w-title="detail.policyDesc">{{detail.policyDesc | contentFilter}}</div>
                            </Form-item>
                        </i-col>
                    </i-row>
                </div>

                <!-- 我的分销单价 -->
                <div class="divider-header">
                    <span>{{$t('mySalePrice')}}</span>
                </div>

                <Form-item prop="productPrices">
                    <table-com
                        v-if="info && info.parentAllocationProductList"
                        :table-com-min-height="260"
                        :column-data="detailParentDistributePriceConfig"
                        :table-data="info.parentAllocationProductList"
                        :border="false">
                        <el-table-column
                            slot="column0"
                            slot-scope="row"
                            :label="row.title"
                            :width="120"
                            :min-width="120"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.productName | contentFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column1"
                            slot-scope="row"
                            :label="row.title"
                            :width="130"
                            :min-width="120"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.stockNum | contentFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column2"
                            slot-scope="row"
                            :label="row.title"
                            :width="120"
                            :min-width="120"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.printPrice | contentFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column3"
                            slot-scope="row"
                            :label="row.title"
                            :width="140"
                            :min-width="120"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{scope.row.settlePrice | moneyFilter}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column4"
                            slot-scope="row"
                            :label="$t('mySalePrice')"
                            :width="140"
                            :min-width="120">
                            <template slot-scope="scope">
                                <Input v-model="formData.productPrices[scope.$index].price" :placeholder="$t('distributePrice')"></Input>
                            </template>
                        </el-table-column>
                    </table-com>
                    <span v-if="isLossTipShow" class="loss-tip">{{this.$t('maybeLoss')}}</span>
                </Form-item>

                <!-- 设置我的销售渠道 -->
                <div class="divider-header">
                    <span>{{$t('setMySaleChannels')}}</span>
                </div>

                <Form-item prop="groupIds">
                    <table-com
                        :table-com-min-height="260"
                        :column-data="saleChannelColumn"
                        :table-data="saleGroupList"
                        :column-check="true"
                        :border="false"
                        @selection-change="colomnSelect($event)">
                    </table-com>
                </Form-item>
                <div v-if="isTipShow" class="distribute-tip">{{$t('distributeTip',{field: detail.parentDistributor})}}</div>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button type="primary" @click="save()" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import {validator} from 'klwk-ui';
    import tableCom from '@/components/tableCom/tableCom';
    import {detailParentDistributePriceConfig, setSaleChannelColumn} from '../child/detailConfig'
    export default {
        components: {
            tableCom
        },
        data() {
            const validateMethod = {
                productPrice: (rule,value,callback) => {
                    //校验非空必填以及不可低于上级分销单价
                    if(value.length){
                        value.forEach((item) => {
                            if(item.price === ''){
                                callback(new Error(this.$t('errorEmpty', {msg: this.$t('mySalePrice')})));
                            }else {
                                if(validator.isNumber(item.price)) {
                                    if(parseFloat(item.price) < parseFloat(item.settlePrice)) {
                                        this.isLossTipShow = true;
                                        callback();
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback(this.$t('numError',{field : this.$t('mySalePrice')}));
                                }

                            }
                        })
                    }
                }
            }
            return {
                //是否显示modal
                show: false,
                //分销详情数据 --传参
                detail: {},
                //分销详情数据 --接口数据
                info: {},
                //销售渠道列表数据
                saleGroupList: [],
                //产品列表表头
                detailParentDistributePriceConfig: Array.from(detailParentDistributePriceConfig),
                //销售渠道表头
                saleChannelColumn: setSaleChannelColumn,
                //表单数据
                formData: {
                    //分销名称
                    name: '',
                    //销售政策id -- 父级销售政策id
                    parentId: '',
                    //分销产品定价
                    productPrices: [],
                    //销售分组id
                    groupIds: ''
                },
                //表达验证
                ruleValidate: {
                    name: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('distributeName')}), trigger: 'blur' },     // 不能为空
                        { type: 'string', max: 40, message: this.$t('errorMaxLength', {field: this.$t('distributeName'), length: 40}), trigger: 'blur' },
                    ],
                    productPrices: [
                        { validator: validateMethod.productPrice, trigger: 'blur' },     // 不能为空
                    ],
                    groupIds: [
                        { required: true, message: this.$t('errorEmpty', {msg: this.$t('saleChannels')}), trigger: 'blur' },     // 不能为空
                    ]
                },
                //是否显示分销提示
                isTipShow: false,
                //是否显示亏损提示
                isLossTipShow: false
            }
        },
        methods: {
            /**
             * 弹窗显示/隐藏
             */
            toggle(data) {

                if(data) {
                    //打开模态框
                    this.detail = data;
                    this.formData.parentId = data.allocationId;
                    this.getData();
                } else {
                    //关闭模态框
                    this.$refs.policyform.resetFields();
                    this.formData = {
                        name: '',
                        parentId: '',
                        productPrices: [],
                        groupIds: ''
                    };
                    this.detail = {};
                    this.info = {};
                    this.show = !this.show;
                }

            },
            /**
             * 获取数据
             */
            async getData(){
                //获取分销详情数据
                await ajax.post('getPolicyAllocationInfo', {
                    allocationId: this.detail.allocationId
                }).then((res) => {
                    if(res.success) {
                        this.info = res.data ? res.data : {};

                        //初始化产品分销单价数据
                        this.info.parentAllocationProductList.forEach((item) => {
                            let _obj = {};
                            _obj.productId = item.productId;
                            _obj.settlePrice = item.settlePrice;
                            _obj.price = '';
                            this.formData.productPrices.push(_obj);
                        });
                        //关闭模态框
                        this.show = !this.show;
                    }
                });

                //获取销售渠道分组列表
                await ajax.post('queryOrgGroupVoList',{
                    groupType: 'sale'
                }).then((res) => {
                    if(res.success) {
                        // 设置临时数据
                        this.tempData = res.data;
                    }
                });

                //获取已选择销售渠道组数据接口
                await ajax.post('queryHaveAllocationSaleGroups',{
                    allocationId: this.detail.allocationId
                }).then(res => {
                    if(res.success) {
                        this.haveSaleGroups = res.data;

                        //过滤没有销售渠道的销售组
                        for(let i=0,len=this.tempData.length; i<len; i++) {
                            if(this.tempData[i].channelNames === null) {
                                console.log(this.tempData[i].groupName,this.tempData[i].channelNames)
                                this.tempData.splice(i,1);
                                len--;
                                i--;
                                continue;
                            }
                        }

                        for(let i=0,len=this.tempData.length; i<len; i++) {
                            for(let j=0,jlen=this.haveSaleGroups.length; j<jlen; j++) {
                                if(len > 0 && jlen > 0) {
                                    if(this.haveSaleGroups[j].id === this.tempData[i].id) {
                                        this.haveSaleGroups.splice(j,1);
                                        j--;
                                        jlen--;
                                        this.tempData.splice(i,1);
                                        i--;
                                        len--;
                                        break;

                                    }
                                }
                            }
                        }

                        //设置销售渠道组列表数据
                        this.saleGroupList = this.tempData;
                        this.tempData = null;
                    }
                });
            },
            /**
             * 表格选择框事件
             */
            colomnSelect(data) {
                this.isTipShow = false;
                this.formData.groupIds = '';
                data.forEach((item) => {
                    this.formData.groupIds += item.id + ',';
                    //政策不能在分销给上级分销商,后台会做过滤处理，此处给出提示
                    if(item.channelNames.indexOf(this.detail.parentDistributor) > -1) {
                        this.isTipShow = true;
                    }
                })

            },
            /**
             * 保存分销设置
             */
            save() {
                this.$refs['policyform'].validate((valid) => {
                    if(valid) {
                        ajax.post('savePolicyAllocation',{
                            parentId: this.formData.parentId,
                            name: this.formData.name,
                            productPrices: JSON.stringify(this.formData.productPrices),
                            groupIds: this.formData.groupIds
                        }).then((res) => {
                            if(res.success) {
                                this.$Message.success(this.$t('distributeSccuess'));
                                this.$emit('complete', this.detail);
                                this.toggle();
                            } else {
                                this.$Message.error(this.$t('distributeFail'));
                            }
                        })
                    }
                });

            },
            /**
             * 关闭模态框
             */
            hide(){
                this.toggle();
            },
        },
        created() {
            //增加我的分销单价表头
            this.detailParentDistributePriceConfig.push(
                {
                    title: 'mySalePrice',       // 我的分销单价
                    width: 180,
                }
            );
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .content {
        width: 90%;
        margin: 0 auto 40px;

        .form-content {
            margin: 0 auto;

            .first-row {
                margin-bottom: 10px;
            }

            .ivu-form-item{
                margin: 0 auto;
                text-align: left;
                width: 100%;
                float: left;
                height: 30px;
                line-height: 30px;
                font-size: $font_size_14px;
                display: flex;
            }

            /deep/ .ivu-form-item-label{
                padding-left: 0;
                padding-right: 0;
                width: 180px;
            }

            /deep/ .ivu-form-item-content{
                color: $color-666;
                /*flex: 1;*/
                display: inline-block;
                width: calc(100% - 180px);
                >div{
                    vertical-align: middle;
                    @include overflow_tip();
                }
            }
        }
        /**
            分割线样式
        */
        .divider-header {
            margin: 20px 0;
            display: table;
            position: relative;
            text-align: center;
            width: 100%;

            span {
                white-space: nowrap;
                margin: 0 6px;
                color: #333333;
                font-size: 14px;
            }
            &:before {
                display: table-cell;
                position: relative;
                content: "";
                border-top: 1px dashed #E1E1E1;
                width: 50%;
                transform: translateY(50%);
            }
            &:after {
                display: table-cell;
                position: relative;
                content: "";
                border-top: 1px dashed #E1E1E1;
                width: 50%;
                transform: translateY(50%);
            }
        }

        .distribute-tip {
            color: $color_F7981C_080;
        }

        .loss-tip {
            color: $color_red;
            font-size: 12px;
        }
    }

    .modal-footer{
        /deep/ .ivu-btn{
            padding: 5px 30px;
        }
    }
</style>

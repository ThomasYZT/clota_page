<!--
    编辑分销政策模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="show"
           width="740"
           :mask-closable="false"
           :title="$t('check')">
        <div class="content">
            <Form ref="policyform"
                  :model="formData"
                  :rules="ruleValidate"
                  v-if="detail">
                <div class="tool"
                     v-if="!editable">
                    <Button type="primary" @click="changeSelectable" >{{$t("modify")}}</Button>
                    <Button type="error" @click="deleteDistribution()" >{{$t("deleteSalePrice")}}</Button>
                </div>
                <div class="tool"
                     v-else>
                    <Button type="default" @click="cancelEdit" >{{$t("giveUpModify")}}</Button>
                </div>

                <i-row class="first-row">
                    <i-col span="10">
                        <Form-item :label="$t('distributeName')+'：'" prop="name"><!--分销名称-->
                            <Input :disabled="!editable"  v-model="formData.name" :placeholder="$t('distributeName')"></Input>
                        </Form-item>
                    </i-col>
                </i-row>

                <!-- 我的分销单价 -->
                <div class="divider-header">
                    <span>{{$t('mySalePrice')}}</span>
                </div>

                <Form-item prop="productPrices">
                    <table-com
                        v-if="detail && detail.productList"
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
                            :width="120"
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
                            :width="130"
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
                            :min-width="120"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <Input :disabled="!editable" v-model="formData.productPrices[scope.$index].price" :placeholder="$t('distributePrice')"></Input>
                            </template>
                        </el-table-column>
                    </table-com>
                    <span v-if="isLossTipShow" class="loss-tip">{{this.$t('maybeLoss')}}</span>
                </Form-item>

                <!-- 设置我的销售渠道 -->
                <div class="divider-header">
                    <span>{{$t('setMySaleChannels')}}</span>
                </div>

                <Form-item prop="groupIds"
                           v-show='editable'>
                    <table-com
                        ref="multipleTable"
                        :table-com-min-height="260"
                        :column-data="saleChannelColumn"
                        :table-data="saleGroupList"
                        :column-check="true"
                        :border="false"
                        :selectable="selectable"
                        @selection-change="colomnSelect($event)">
                        <el-table-column
                            slot="column1"
                            slot-scope="row"
                            :label="row.title"
                            show-overflow-tooltip
                            :min-width="120">
                            <template slot-scope="scope">
                                <span v-for="(item, index) in scope.row.channelModels"
                                      class="channel"
                                      :class="{disable: item.status === 'valid'}"
                                      :key="index">
                                    {{item.channelName}}
                                    <span class="disable" v-if="item.status === 'valid'">(未启用)</span>
                                </span>
                            </template>
                        </el-table-column>
                    </table-com>
                </Form-item>
                <Form-item prop="groupIds"
                           v-show="!editable">
                    <table-com
                        ref="multipleTable1"
                        :table-com-min-height="260"
                        :column-data="saleChannelColumn"
                        :table-data="saleGroupList"
                        :column-check="true"
                        :border="false"
                        :selectable="selectDisable"
                        @selection-change="colomnSelect($event)">
                        <el-table-column
                            slot="column1"
                            slot-scope="row"
                            :label="row.title"
                            show-overflow-tooltip
                            :min-width="120">
                            <template slot-scope="scope">
                                <span v-for="(item, index) in scope.row.channelModels"
                                      class="channel"
                                      :class="{disable: item.status === 'valid'}"
                                      :key="index">
                                    {{item.channelName}}
                                    <span class="disable" v-if="item.status === 'valid'">(未启用)</span>
                                </span>
                            </template>
                        </el-table-column>
                    </table-com>
                </Form-item>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button v-if="editable" type="primary" @click="save()" >{{$t("save")}}</Button>
            <Button type="ghost" @click="hide" >{{$t("cancel")}}</Button>
        </div>

        <tipModal ref="tipModal"
                  @giveUp="giveUp()"
                  @noGiveUp="noGiveUp()"> </tipModal>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import { validator } from 'klwk-ui';
    import tableCom from '@/components/tableCom/tableCom';
    import tipModal from '../../components/tipModal';
    import { saleChannelColumn, detailParentDistributePriceConfig } from '../child/detailConfig';
    export default {
        components: {
            tableCom,
            tipModal
        },
        data() {
            const validateMethod = {
                productPrice: (rule,value,callback) => {
                    //校验非空必填以及不可低于上级分销单价
                    if(value.length){
                        value.forEach((item) => {
                            if(item.price === ''){
                                callback(new Error(this.$t('errorEmpty', { msg: this.$t('mySalePrice') })));
                            }else {
                                if(validator.isNumber(item.price)) {
                                    if(parseFloat(item.price) < parseFloat(item.settlePrice)) {
                                        this.isLossTipShow = true;
                                        callback();
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback(this.$t('numError',{ field : this.$t('mySalePrice') }));
                                }

                            }
                        })
                    }
                }
            }
            return {
                //是否显示模态框
                show: false,
                //模态框信息参数
                detail: {},
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
                        { required: true, message: this.$t('errorEmpty', { msg: this.$t('distributeName') }), trigger: 'blur' },     // 不能为空
                    ],
                    productPrices: [
                        { validator: validateMethod.productPrice, trigger: 'blur' },     // 不能为空
                    ],
                    groupIds: [
                        { required: true, message: this.$t('errorEmpty', { msg: this.$t('saleChannels') }), trigger: 'blur' },     // 不能为空
                    ]
                },
                //分销详情数据 --接口数据
                info: {},
                //销售渠道分组数据
                saleGroupList: [],
                //设置销售渠道表头配置
                saleChannelColumn: saleChannelColumn,
                //设置我的分销单价表头配置
                detailParentDistributePriceConfig: Array.from(detailParentDistributePriceConfig),
                //已选中的渠道组
                selectedRow: [],
                //是否处于编辑状态
                editable: false,
                //是否显示亏损提示
                isLossTipShow: false

            }
        },
        methods: {
            /**
             * 显示模态框
             */
            toggle(data) {
                if(data) {
                    this.detail = data;
                    //获取对呀分销政策的表单数据
                    this.formData.id = this.detail.allocationId;
                    this.formData.name = this.detail.name;
                    this.formData.parentId = this.detail.listItem.allocationId;
                    this.formData.groupIds = this.detail.groupIds;
                    //获取模态框数据
                    this.getData();
                }else {
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
                    this.saleGroupList = [];
                    this.selectedRow = [];
                    this.show = !this.show;
                    this.editable = false;
                }
            },
            /**
             * 获取数据
             */
            async getData(){
                //获取分销详情数据
                await ajax.post('getPolicyAllocationInfo', {
                    allocationId: this.detail.listItem.allocationId
                }).then((res) => {
                    if(res.success) {
                        this.info = res.data ? res.data : {};

                        //初始化产品分销单价数据
                        this.detail.productList.forEach((item,index) => {
                            this.info.parentAllocationProductList.forEach((pitem, pindex) => {
                                if(index === pindex) {
                                    let _obj = {};
                                    _obj.productId = item.productId;
                                    _obj.price = item.settlePrice;
                                    _obj.settlePrice = pitem.settlePrice;
                                    this.formData.productPrices.push(_obj);
                                }
                            })
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
                    allocationId: this.detail.listItem.allocationId
                }).then(res => {
                    if(res.success) {
                        //已选择的销售渠道组数据
                        this.haveSaleGroups = res.data;

                        //过滤没有销售渠道的销售组
                        for(let i=0,len=this.tempData.length; i<len; i++) {
                            if(this.tempData[i].channelModels && this.tempData[i].channelModels.length === 0) {
                                this.tempData.splice(i,1);
                                len--;
                                i--;
                                continue;
                            }
                        }

                        //设置销售渠道组列表数据
                        this.saleGroupList = this.tempData;

                        //设置已选择的销售渠道组
                        let _channels = this.saleGroupList;
                        let _chosedChannels = this.haveSaleGroups.map((item) => {
                            return item.id;
                        });
                        for(let i=0,len=_channels.length; i<len; i++) {
                            for(let j=0,jlen=_chosedChannels.length; j<jlen; j++) {
                                if(_channels[i].id === _chosedChannels[j]) {
                                    this.selectedRow.push({
                                        item: _channels[i],
                                        index: i
                                    });
                                }
                            }
                        }

                        this.$nextTick(() => {
                            this.selectedRow.forEach((item) => {
                                this.$refs.multipleTable.toggleRowSelection(item.item, true);
                                this.$refs.multipleTable1.toggleRowSelection(item.item, true);
                            });
                        });

                        //去除其他分销选择过的销售组
                        for(let i=0,len=this.tempData.length; i<len; i++) {
                            for(let j=0,jlen=this.haveSaleGroups.length; j<jlen; j++) {
                                if(len > 0 && jlen > 0) {
                                    if(this.haveSaleGroups[j].id === this.tempData[i].id && _chosedChannels.indexOf(this.tempData[i].id) <= -1) {
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
                        this.tempData = null;
                    }
                });
            },
            /**
             * 删除分销
             */
            deleteDistribution(){
                ajax.post('deletePolicyAllocation',{
                    allocationId: this.detail.allocationId
                }).then((res) => {
                     if(res.success) {
                        this.$Message.success(this.$t('successTip',{ tip: this.$t('delete') }));
                        this.toggle();
                        this.$emit('refresh')
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
                            id: this.formData.id,
                            name: this.formData.name,
                            parentId: this.formData.parentId,
                            productPrices: JSON.stringify(this.formData.productPrices),
                            groupIds: this.formData.groupIds
                        }).then((res) => {
                            if(res) {
                                this.$Message.success(this.$t('successTip',{ tip: this.$t('modify') }));
                                this.toggle();
                                this.$emit('refresh')
                            }
                        })

                    }
                })

            },
            /**
             * 表格选择框事件
             */
            colomnSelect(data) {
                this.formData.groupIds = "";
                data.forEach((item) => {
                    this.formData.groupIds += item.id + ',';
                });
            },
            /**
             * 关闭模态框
             */
            hide(){
                if(this.editable) {
                    this.show = false;
                    this.$refs.tipModal.show();
                }else {
                    this.toggle();
                }
            },
            /**
             *  table selectable属性
             * @return {boolean}
             */
            selectable: () => {
                return true;
            },
            selectDisable: () => {
                return false;
            },
            /**
             *  改变选择框可选状态
             */
            changeSelectable() {
                this.editable = !this.editable;
            },
            /**
             * 取消编辑
             */
            cancelEdit() {
                //初始化产品分销单价数据
                this.formData.productPrices = [];
                this.detail.productList.forEach((item,index) => {
                    let _obj = {};
                    _obj.productId = item.productId;
                    _obj.price = item.settlePrice;
                    this.formData.productPrices.push(_obj);
                });
                this.changeSelectable();
            },
            /**
             * 放弃保存编辑过后的信息
             */
            giveUp() {
                this.show = true;
                this.toggle();
            },
            /**
             * 不放弃编辑后的信息
             */
            noGiveUp() {
                this.show = true;
            }
        },
        created() {
            //增加我的分销单价表头
            this.detailParentDistributePriceConfig.push(
                {
                    title: 'mySalePrice',       // 我的分销单价
                    width: 180,
                }
            )
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

        .tool {
            margin: 15px 0;
            /deep/ .ivu-btn{
                padding: 5px 30px;
            }

            /deep/ .ivu-btn.ivu-btn-error {
                background-color: #EB6751;
            }
        }

        .loss-tip {
            color: $color_red;
            font-size: 12px;
        }

        .channel {
            span {
                margin-right: 13px;
            }

            span.disable {
                letter-spacing: -1px;
            }
        }
        .disable {
            color: $color_red;
        }
    }

    .modal-footer{
        /deep/ .ivu-btn{
            padding: 5px 30px;
        }
    }
</style>

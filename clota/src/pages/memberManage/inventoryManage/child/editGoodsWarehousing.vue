<!--
    新增/编辑 商品入库
    作者：杨泽涛
-->
<template>
    <div class="edit-good-warehousing">
        <breadCrumbHead  :before-router-list="beforeRouterList"
                         :locale-router="'goodsStockIn'"><!--商品管理-->>

        </breadCrumbHead>
        <div class="form-wrapper">
            <Form ref='formList'
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="8" offset="5">
                        <!-- 产品名称 -->
                        <Form-item :label="$t('productName')" prop="name">
                            <Input v-model.trim="formData.name" style="width:250px" :disabled="pageEditable" :placeholder="$t('inputField', { field : $t('productName') })"/>
                        </Form-item>
                    </i-col>
                    <i-col span="8">
                        <!-- 入库数量 -->
                        <Form-item v-if="!pageEditable" :label="$t('goodsQuantity')" prop="stockNum">
                            <Input v-model.trim="formData.stockNum"
                                   :placeholder="$t('inputField', { field : $t('goodsQuantity') })"
                                   style="width:250px"></Input>
                        </Form-item>
                        <Form-item v-else :label="$t('addGoodsNum')" prop="stockNum">
                            <Input v-model.trim="formData.stockNum"
                                   :placeholder="$t('inputField', { field : $t('addGoodsNum') })"
                                   style="width:250px"/>
                            <span>{{$t('nowHaveStockNum')}}:{{nowHaveStockNum}}</span>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="8" offset="5">
                        <!-- 采购价 -->
                        <Form-item :label="$t('purchasePrice')" prop="purchasePrice">
                            <Input v-model.trim="formData.purchasePrice" :placeholder="$t('inputField', { field : $t('purchasePrice') })" style="width:250px"/>
                        </Form-item>
                    </i-col>
                    <i-col span="8">
                        <!-- 市场价 -->
                        <Form-item :label="$t('marketPrice')" prop="marketPrice">
                            <Input v-model.trim="formData.marketPrice" :placeholder="$t('inputField', { field : $t('marketPrice') })" style="width:250px"/>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="8" offset="5">
                        <!-- 采购人 -->
                        <Form-item :label="$t('purchaser')" prop="purchaser">
                            <Input v-model.trim="formData.purchaser" :placeholder="$t('inputField', { field : $t('purchaser') })" style="width:250px"/>
                        </Form-item>
                    </i-col>
                    <i-col span="8">
                        <!-- 采购日期 -->
                        <Form-item :label="$t('purchaseTime')" prop="purchaseDate">
                            <DatePicker type="date"
                                        :placeholder="$t('selectField', { msg : $t('purchaseTime') })"
                                        :editable="false"
                                        v-model="formData.purchaseDate" style="width:250px"></DatePicker>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="8" offset="5">
                        <!-- 计量单位 -->
                        <Form-item :label="$t('unit')" prop="unit">
                            <Select  ref="select"
                                     v-model="formData.unit" :placeholder="$t('selectField', { msg : $t('unit') })"
                                     @on-change="addUnit" style="width:250px">
                                <Option v-for="(item, index) in unitList"
                                        :value="item.unitNames"
                                        :key="index"
                                        :label="item.unitNames === 'addUnit' ? $t(item.unitNames) : item.unitNames">
                                    <div class="option">
                                        <span :class="{'add-unit': item.unitNames === 'addUnit'}">{{$t(item.unitNames)}}</span>
                                        <span class="option-del"
                                              v-if="index !== unitList.length - 1"
                                              @click.stop="delUnit(item)">{{$t('del')}}</span>
                                    </div>
                                </Option>
                            </Select>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="16" offset="5">
                        <!-- 商品图片 -->
                        <FormItem :label="$t('goodPic')" prop="pics">
                            <img-uploader @upload-success="uploadSuc"
                                          @remove-img="removeIDimg"
                                          :format="['jpeg', 'png']"
                                          :defaultList="defaultImgList"
                                          :quantity-limit="1"></img-uploader>
                        </FormItem>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="16" offset="5">
                        <!-- 备注 -->
                        <Form-item :label="$t('remark')" prop="remark">
                            <Input v-model.trim="formData.remark" :rows="4" type="textarea" :placeholder="$t('inputField', { field : $t('remark') })" style="width: 655px;"></Input>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="16" offset="5">
                        <!-- 商品描述 -->
                        <Form-item :label="$t('goodsDesc')" prop="goodsDesc">
                            <Input v-model.trim="formData.goodsDesc" :rows="4" type="textarea" :placeholder="$t('inputField', { field : $t('goodsDesc') })" style="width: 655px;"></Input>
                        </Form-item>
                    </i-col>
                </i-row>
            </Form>

            <div class="button-wrapper">
                <Button type="primary" class="ivu-btn-90px" @click="formValidate">{{$t('save')}}</Button>
            </div>
        </div>

        <addUnitModal ref="addUnitModal"
                      @restore="restore"
                      @addSuccess="addUnitSuccess"
                      @addError="addUnitError"></addUnitModal>

        <del-modal ref="delModal">
            <div class="del-modal">
                <span class="content-text">
                    {{$t('isDoing')}}{{$t('delete')}} {{$t('colonSetting', { key : $t('unit') }) + unitName}}：<!--导游-->
                    <span class="yellow-label">{{$t('operationIrrevocable')}}</span>
                    <span>{{$t('sureToDel')}}</span>
                </span>
            </div>
        </del-modal>
    </div>
</template>

<script>
    import ImgUploader from '../../../register/components/ImgUploader';
    import ajax from '../../../../api/index';
    import lifeCycleMixins from '../../../../mixins/lifeCycleMixins';
    import addUnitModal from '../components/addUnitModal';
    import common from '@/assets/js/common.js';
    import breadCrumbHead from '../../../../components/breadCrumbHead/index';
    import delModal from '../../../../components/delModal/index';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            ImgUploader,
            addUnitModal,
            breadCrumbHead,
            delModal
        },
        data () {
            //校验是否为正整数
            const validateNum = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'fieldTypeError') {
                        callback(this.$t(err,{ field : '' }));
                    } else if (err === 'integetError') {
                        callback(this.$t(err, { field : '' }));
                    } else {
                        callback();
                    }
                });
            };

            //校验钱
            const validateMoney = (rule,value,callback) => {
                if (value) {
                    common.validateMoney(value).then(() => {
                        callback();
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t('errorMaxLength',{ field : this.$t(rule.field),length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : this.$t(rule.field) }));
                        }
                    });
                } else {
                    callback();
                }
            };

            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : 'goodsManage', //商品管理
                        router : {
                            name : 'goodsManage'
                        }
                    }
                ],
                //表单数据
                formData : {
                    //商品ID
                    id : '',
                    //商品名称
                    name : '',
                    //商品图片url
                    pics : new Array(),
                    //入库数量
                    stockNum : '',
                    //采购价
                    purchasePrice : '',
                    //市场价
                    marketPrice : '',
                    //采购人
                    purchaser : '',
                    //采购日期
                    purchaseDate : '',
                    //单位
                    unit : '',
                    //商品描述
                    goodsDesc : '',
                    //备注
                    remark : '',
                },
                //表单校验规则
                ruleValidate : {
                    //商品名称
                    name : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('productName') }), trigger : 'blur' },
                    ],
                    //入库数量
                    stockNum : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('goodsQuantity') }), trigger : 'blur' },
                        { validator : validateNum, trigger : 'blur' }
                    ],
                    //采购价
                    purchasePrice : [
                        { validator : validateMoney, trigger : 'blur' }
                    ],
                    //市场价
                    marketPrice : [
                        { validator : validateMoney, trigger : 'blur' }
                    ]
                },
                //列表项详情信息
                detail : {},
                //图片上传组件默认显示列表
                defaultImgList : [],
                //用于区分新增和编辑页面
                pageEditable : false,
                //单位列表
                unitList : [],
                //现有库存
                nowHaveStockNum : 0,
                //要删除的单位名称
                unitName : ''
            };
        },
        methods : {
            /**
             * 表单校验
             */
            formValidate () {
                this.$refs['formList'].validate( valid => {
                    if (valid) {
                        this.stockGood();
                    }
                });
            },
            /**
             * 新增商品入库
             */
            stockGood () {
                //图片地址数组转字符串
                this.formData.pics = this.formData.pics.length > 0 ? this.formData.pics.join(',') : '';
                //转换日期格式
                this.formData.purchaseDate = this.formData.purchaseDate ? new Date(this.formData.purchaseDate).format('yyyy-MM-dd') : '';
                ajax.post('addGoods', this.formData).then( res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('stockIn') }));
                        this.$router.push({
                            name : 'goodsManage'
                        });
                    } else {
                        if (res.code && res.code === 'M035') {
                            this.$Message.error(this.$t(res.code));
                        } else {
                            this.$Message.error(this.$t('failureTip', { tip : this.$t('stockIn') }));
                        }
                    }
                });
            },
            /**
             * @param {array} data
             * 上传图片成功
             */
            uploadSuc (data) {
                this.formData.pics = data;
                this.defaultImgList = this.formData.pics.map((url, index) => {
                    return {
                        name : index,
                        url : url
                    };
                });
            },
            /**
             * @param {array} data
             * 删除图片
             */
            removeIDimg (data) {
                this.defaultImgList = [];
                this.formData.pics = data;
            },
            /**
             * 路由获取参数处理
             * @param {object} params
             */
            getParams (params) {
                if (params && params.type === 'edit' && params.listItem) {
                    this.pageEditable = true;
                    this.detail = params.listItem;
                    for (let key in this.detail) {
                        if (this.formData.hasOwnProperty(key)) {
                            this.formData[key] = this.detail[key];
                        }
                    }
                    this.formData.pics = this.formData.pics ? this.formData.pics.split(',') : [];
                    this.nowHaveStockNum = this.formData.stockNum;
                    this.formData.stockNum = '';
                    this.defaultImgList = this.formData.pics.map((url,index) => {
                        return {
                            name : index,
                            url : url
                        };
                    });
                } else if (params && params.type === 'add') {
                    this.pageEditable = false;
                    this.detail = {};
                } else {
                    //若没获取到路由参数，返回上一级页面
                    this.$router.push({
                        name : 'goodMange'
                    });
                }
            },
            /**
             * 获取单位列表
             * @param {object} data
             */
            queryUnitList (data) {
                ajax.post('queryUnitList').then(res => {
                    if (res.success) {
                        this.unitList = res.data ? res.data : [];
                        this.unitList.push({
                            unitNames : 'addUnit'
                        });
                        if (data) {
                            this.formData.unit = data;
                        }
                    } else {
                        this.unitList = [];
                    }
                });
            },
            /**
             * 新增单位
             * @param {object} data
             */
            addUnit (data) {
                if ( data === 'addUnit' ) {
                    this.$refs.addUnitModal.toggle();
                }
            },
            /**
             * 新增单位失败
             */
            addUnitError () {
                this.formData.unit = this.detail.unit ? this.detail.unit : '';
            },
            /**
             *  取消新增单位
             */
            restore () {
                this.formData.unit = this.unitList.length > 1 ? this.unitList[0].unitNames : '';
            },
            /**
             * 新增单位成功
             * @param {object} data
             */
            addUnitSuccess (data) {
                this.queryUnitList(data);
            },
            /**
             * 删除单位
             * @param data
             */
            delUnit (data) {
                this.$set(this.$refs.select, 'visible', false);
                this.formData.unit = '';
                this.unitName = data.unitNames;
                this.$refs.delModal.show({
                    confirmCallback : () => {
                        ajax.post('addUnit', {
                            isDeleted : 'true',
                            id : data.id,
                            unitNames : data.unitNames,
                        }).then(res => {
                            if (res.success) {
                                this.$Message.success(this.$t('successTip', { tip : this.$t('del') }));
                                this.unitName = '';
                                this.queryUnitList();
                            } else {
                                this.$Message.error(this.$t('failureTip', { tip : this.$t('del') }));
                            }
                        });
                    },
                    cancelCallback : () => {
                        this.unitName = '';
                    }
                });
            }
        },
        created () {
            //获取单位列表
            this.queryUnitList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-good-warehousing {
        .form-wrapper {
            margin-top: 50px;

            /deep/ .el-icon-check{
                position: absolute;
                top: 0;
                right: 14px;
            }

            .button-wrapper {
                margin-top: 40px;
                margin-bottom: 40px;
                text-align: center;
            }

            /deep/ .ivu-row {
                margin-bottom: 10px;
            }

            .add-unit {
                color: #2F70DF;
            }

            /deep/ .ivu-date-picker {
                width: 100%;
            }

            .option {
                .option-del {
                    color: $color_red;
                    float: right;
                }
            }
        }

        /deep/ .el-upload--picture-card {
            border: 1px solid #D8D8D8;
            height: 80px;
            width: 80px;
            line-height: 80px;
        }

        /deep/ .el-upload-list__item-actions {
            height: 80px;
            width: 80px;
            line-height: 80px;
        }

        /deep/ .el-upload-list__item {
            height: 80px;
            width: 80px;
            line-height: 80px;
            img {
                height: 80px;
                width: 80px;
                line-height: 80px;
            }
        }
    }
</style>

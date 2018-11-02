<!--
    新增/编辑 商品入库
    作者：杨泽涛
-->
<template>
    <div class="edit-good-warehousing">
        <!-- 面包屑导航 -->
        <breadCrumbHead
            :before-router-list="beforeRouterList"
            :locale-router="$t('NewGoodsWarehousing')"
        >
        </breadCrumbHead>

        <div class="form-wrapper">
            <Form ref='formList'
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="right"
                  :label-width="150">
                <i-row>
                    <i-col span="8" offset="3">
                        <!-- 产品名称 -->
                        <Form-item :label="$t('productName')" prop="name">
                            <Input v-model="formData.name" :disabled="pageEditable" :placeholder="$t('inputField', { field : $t('productName') })"></Input>
                        </Form-item>
                    </i-col>
                    <i-col span="8">
                        <!-- 入库数量 -->
                        <Form-item v-if="!pageEditable" :label="$t('goodsQuantity')" prop="stockNum">
                            <Input v-model="formData.stockNum"
                                   :placeholder="$t('inputField', { field : $t('goodsQuantity') })"></Input>
                        </Form-item>
                        <Form-item v-else :label="$t('addGoodsNum')" prop="stockNum">
                            <Input v-model="formData.stockNum"
                                   :placeholder="$t('inputField', { field : $t('addGoodsNum') })"></Input>
                            <span>{{$t('nowHaveStockNum')}}:{{nowHaveStockNum}}</span>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="8" offset="3">
                        <!-- 采购价 -->
                        <Form-item :label="$t('purchasePrice')" prop="purchasePrice">
                            <Input v-model="formData.purchasePrice" :placeholder="$t('inputField', { field : $t('purchasePrice') })"></Input>
                        </Form-item>
                    </i-col>
                    <i-col span="8">
                        <!-- 市场价 -->
                        <Form-item :label="$t('marketPrice')" prop="marketPrice">
                            <Input v-model="formData.marketPrice" :placeholder="$t('inputField', { field : $t('marketPrice') })"></Input>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="8" offset="3">
                        <!-- 采购人 -->
                        <Form-item :label="$t('purchaser')" prop="purchaser">
                            <Input v-model="formData.purchaser" :placeholder="$t('inputField', { field : $t('purchaser') })"></Input>
                        </Form-item>
                    </i-col>
                    <i-col span="8">
                        <!-- 采购日期 -->
                        <Form-item :label="$t('purchaseTime')" prop="purchaseDate">
                            <DatePicker type="date" :placeholder="$t('selectField', { msg : $t('purchaseTime') })"
                                        v-model="formData.purchaseDate"></DatePicker>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="8" offset="3">
                        <!-- 计量单位 -->
                        <Form-item :label="$t('unit')" prop="unit">
                            <Select v-model="formData.unit" :placeholder="$t('selectField', { msg : $t('unit') })"
                                    @on-change="addUnit">
                                <Option v-for="(item, index) in unitList"
                                        :value="item.unitNames"
                                        :key="index"
                                        :label="item.unitNames === 'addUnit' ? $t(item.unitNames) : item.unitNames">
                                    <span :class="{'add-unit': item.unitNames === 'addUnit'}">{{$t(item.unitNames)}}</span>
                                </Option>
                            </Select>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="16" offset="3">
                        <!-- 商品图片 -->
                        <FormItem :label="$t('goodPic')" prop="pics">
                            <img-uploader @upload-success="uploadSuc"
                                          @remove-img="removeIDimg"
                                          :defaultList="defaultImgList"
                                          :quantity-limit="1"></img-uploader>
                        </FormItem>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="16" offset="3">
                        <!-- 备注 -->
                        <Form-item :label="$t('remark')" prop="remark">
                            <Input v-model="formData.remark" :rows="4" type="textarea" :placeholder="$t('inputField', { field : $t('remark') })"></Input>
                        </Form-item>
                    </i-col>
                </i-row>

                <i-row>
                    <i-col span="16" offset="3">
                        <!-- 商品描述 -->
                        <Form-item :label="$t('goodsDesc')" prop="goodsDesc">
                            <Input v-model="formData.goodsDesc" :rows="4" type="textarea" :placeholder="$t('inputField', { field : $t('goodsDesc') })"></Input>
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
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import ImgUploader from '../../../register/components/ImgUploader';
    import ajax from '../../../../api/index';
    import lifeCycleMixins from '../../../../mixins/lifeCycleMixins';
    import addUnitModal from '../components/addUnitModal';
    import common from '@/assets/js/common.js';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead,
            ImgUploader,
            addUnitModal
        },
        data () {
            //校验入库数量是否为正整数
            const validateStockNum = (rule,value,callback) => {
                common.validateInteger(value).then(() => {
                    callback();
                }).catch(err => {
                    if (err === 'fieldTypeError') {
                        callback(this.$t(err,{ field : this.$t('amount') }));
                    } else {
                        callback();
                    }
                });
            };

            return {
                //路由信息
                beforeRouterList : [
                    {
                        name : 'inventoryManage',
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
                        { validator : validateStockNum, trigger : 'blur' }
                    ],
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
                nowHaveStockNum : 0
            };
        },
        methods : {
            /**
             * 表单校验
             */
            formValidate () {
                if (this.$refs['formList'].validate( valid => {
                    if (valid) {
                        this.stockGood();
                    }
                }));
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
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('stockIn') }));
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
                this.formData.pics = data;
            },
            /**
             * 路由获取参数处理
             * @param {object} params
             */
            getParams (params) {
                if (params && params.listItem) {
                    this.pageEditable = true;
                    this.detail = params.listItem;
                    for (let key in this.detail) {
                        if (this.formData.hasOwnProperty(key)) {
                            this.formData[key] = this.detail[key];
                        }
                    }
                    this.formData.pics = this.formData.pics.split(',');
                    this.nowHaveStockNum = this.formData.stockNum;
                    this.formData.stockNum = '';
                    this.defaultImgList = this.formData.pics.map((url,index) => {
                        return {
                            name : index,
                            url : url
                        };
                    });
                } else {
                    this.detail = {};
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
                        this.$Message.error(this.$t('dataGetError'));
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
                this.formData.unit = this.detail.unit;
            },
            /**
             *  取消新增单位
             */
            restore () {
                this.formData.unit = this.unitList[0].unitNames;
            },
            /**
             * 新增单位成功
             * @param {object} data
             */
            addUnitSuccess (data) {
                this.queryUnitList(data);
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
            margin-top: 30px;


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
        }
    }
</style>

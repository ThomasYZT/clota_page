
<!--添加游客-->

<template>
    <div>
        <Modal
            title="Title"
            :mask-closable="false"
            :value="value"
            :width="860"
            @on-visible-change="visibleChange"
            @input="changeValue"
            class="add-tourist"
            class-name="vertical-center-modal">
            <div slot="header" class="target-class">
                <span class="title">{{$t('添加游客信息')}}</span>
            </div>
            <Form ref="formInline" :model="formData" label-position="left" >
                <i-row>
                    <i-col span="11">
                        <FormItem prop="name" label="姓名:" :label-width="75" :rules="rules.name">
                            <Input type="text" v-model.trim="formData.name" style="width: 280px;"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem prop="phone" label="手机号码:" :label-width="100" :rules="rules.phone">
                            <Input type="text" v-model.trim="formData.phone" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <!--不需要证件时，不需要显示证件列表-->
                <template v-if="acceptCertificateType.all.length > 0">
                    <div class="add-id-card">
                        <span class="add-btn" @click="addCardInfo"><Icon type="ios-plus-empty"></Icon>添加证件</span>
                    </div>
                    <table-com
                        v-if="acceptCertificateType.all.length > 0"
                        :column-data="idColumns"
                        :table-data="idTableData"
                        class="id-class"
                        :auto-height="true"
                        :table-com-min-height="250">
                        <el-table-column
                            slot="column0"
                            show-overflow-tooltip
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                <template v-if="scope.row.editType === 'edit'">
                                    <FormItem :prop="'idTypeIn' + scope.$index" :rules="rules.idTypeIn(scope.row)">
                                        <Select v-model.trim="scope.row.type" transfer>
                                            <Option v-for="item in acceptCertificateType.all"
                                                    :key="item.value"
                                                    :value="item.value">
                                                {{$t(item.label)}}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </template>
                                <template v-else>
                                    <div class="row-class">
                                        {{$t(scope.row[row.field])}}
                                    </div>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                            show-overflow-tooltip
                            slot="column1"
                            slot-scope="row"
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                <template v-if="scope.row.editType === 'edit'">
                                    <FormItem :prop="'idCard' + scope.$index" :rules="rules.idCard(scope.row)">
                                        <Input type="text" v-model.trim="scope.row.data" />
                                    </FormItem>
                                </template>
                                <template v-else>
                                    {{scope.row[row.field]}}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column
                            slot="column2"
                            slot-scope="row"
                            show-overflow-tooltip
                            :label="row.title"
                            :width="row.width"
                            :min-width="row.minWidth">
                            <template slot-scope="scope">
                                <ul class="operate-list">
                                    <template v-if="scope.row.editType !== 'edit'">
                                        <li @click="modifyIdfo(scope.$index)" >{{$t('modify')}}</li>
                                        <li class="red-label" @click="delIdInfo(scope.$index)">{{$t('del')}}</li>
                                    </template>
                                    <template v-else>
                                        <li @click="saveCardInfo(scope.$index)">{{$t('save')}}</li>
                                        <li class="cancel" @click="cancelEdit(scope.$index)">{{$t('cancel')}}</li>
                                    </template>
                                </ul>
                            </template>
                        </el-table-column>
                    </table-com>
                </template>
                <div class="title-label">
                    取票信息
                </div>
                <table-com
                    :column-data="ticketColumnData"
                    class="get-ticket"
                    :table-data="productListDeal"
                    :auto-height="true"
                    :table-com-min-height="250">
                    <el-table-column
                        slot="column3"
                        show-overflow-tooltip
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <template v-if="scope.row.needId !== 'noRequired'">
                                <FormItem :prop="'idType' + scope.$index" :rules="rules.idType(scope.row)">
                                    <Select v-model.trim="scope.row.idType" :disabled="scope.row.takeNum < 1" transfer>
                                        <Option v-for="item in acceptCertificateType[scope.row.productId]"
                                                :key="item.productId"
                                                :value="item.value">
                                            {{$t(item.label)}}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </template>
                            <template v-else>
                                -
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                        show-overflow-tooltip
                        slot="column4"
                        slot-scope="row"
                        :label="row.title"
                        :width="row.width"
                        :min-width="row.minWidth">
                        <template slot-scope="scope">
                            <InputNumber
                                :min="scope.row.min"
                                :max="scope.row.max"
                                :disabled="scope.row.disabled"
                                v-model.trim="scope.row.takeNum"
                                @on-change="takeNumChange(scope.row)">
                            </InputNumber>
                        </template>
                    </el-table-column>
                </table-com>
            </Form>

            <div slot="footer">
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="confirm">{{$t('confirm')}}</Button>
                <Button type="ghost"
                        class="ivu-btn-90px"
                        @click="cancel">{{$t('cancel')}}</Button>
            </div>
        </Modal>
        <!--添加游客报错提示框-->
        <add-tourist-err-modal v-model="addTouristModalShow"
                               :tourist-err-list="touristErrList">
        </add-tourist-err-modal>
    </div>
</template>

<script>
    import {validator} from 'klwk-ui';
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {idColumns,ticketColumnData} from './addTouristConfig';
    import ajax from '@/api/index.js';
    import {idType} from '@/assets/js/constVariable.js';
    import addTouristErrModal from './addTouristErrModal';

    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //产品列表
            'product-list' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //已经添加的游客信息
            'added-tourist-info' : {
                type : Array,
                default () {
                    return []
                }
            },
            //默认游客信息
            'default-info' : {
                type : Object,
                default () {
                    return {}
                }
            }
        },
        components : {
            tableCom,
            addTouristErrModal
        },
        data() {
            //校验手机号码
            const validatePhone =  (rule,value,callback) => {
                if(value && validator.isMobile(value)){
                    this.validatePhoneIsExit().then(() => {
                        callback();
                    }).catch(err => {
                        callback('手机号码已存在');
                    });
                }else{
                    callback(this.$t('errorFormat', { field : this.$t('mobilePhone')}));
                }
            };
            //校验证件类型
            const validateIdType = (rule,value,callback) => {
                if(rule['rowData']['takeNum'] <= 0){
                    callback();
                }else{
                    if(rule['rowData']['needId'] !== 'noRequired' ){
                        for(let i = 0,j = this.idTableData.length;i < j;i++){
                            if(this.idTableData[i]['type'] === rule['rowData']['idType'] &&
                                this.idTableData[i]['editType'] !== 'edit'){
                                callback();
                            }
                        }
                        callback('请填写证件信息');
                    }else{
                        callback();
                    }
                }
            };
            //校验证件号码
            const validateIdCard = (rule,value,callback) => {
                if(rule.rowData.data){
                    if(rule.rowData.data.length > 100){
                        callback(this.$t('errorMaxLength', { field : this.$t('identificationNum'), length : 100}));
                    }else{
                        this.validateIdCardNumIsExist(rule.rowData).then(() => {
                            callback();
                        }).catch(() => {
                            callback('证件已存在');
                        });
                    }
                }else{
                    callback('请输入证件号');
                }
            };
            //校验是否选择了证件
            const validateidTypeIn =(rule,value,callback) => {
                if(rule.rowData.type){
                    callback();
                }else{
                    callback('请选择证件类型');
                }
            };
            return {
                //表单数据
                formData : {
                    //姓名
                    name : '',
                    phone : '',
                    //证件类型
                    idType : '',
                    //证件号码
                    idNum :''
                },
                //校验规则
                rules : {
                    name : [
                        { required: true, message: this.$t('inputField',{field : this.$t('name')}), trigger: 'blur' },
                        { max : 20, message: this.$t('errorMaxLength', { field : this.$t('name') , length : 20}), trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: this.$t('inputField',{field : this.$t('mobilePhone')}), trigger: 'blur' },
                        {validator :validatePhone,trigger : 'blur'}
                    ],
                    idType  (rowData) {
                        return  [
                            { validator : validateIdType ,trigger : 'change',rowData : rowData }
                        ]
                    },
                    idCard (rowData) {
                        return [
                            {validator : validateIdCard,trigger: 'blur',rowData : rowData}
                        ]
                    },
                    idTypeIn (rowData) {
                        return [
                            {validator : validateidTypeIn,trigger: 'change',rowData : rowData}
                        ]
                    }
                },
                //证件列表表头配置
                idColumns : idColumns,
                //证件数据
                idTableData : [],
                ticketColumnData : ticketColumnData,
                //取票信息数据
                ticketTableData : [],
                //产品政策
                productPolicy : {},
                //修改证件信息时，保存原始数据
                originalIDInfo : [],
                //错误提示框是否显示
                addTouristModalShow : false,
                //游客错误信息列表
                touristErrList : [],
                //当前状态
                type : 'add'
            }
        },
        methods: {
            /**
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 确定新增游客
             */
            confirm () {
                this.$refs.formInline.validate(valid => {
                    if(valid){
                        Promise.all([this.validateIdType(),this.validateGetTicketNum(),this.checkProductSaleRule()]).then(() => {
                            //如果有默认信息表示是修改游客信息，没有表示新增游客信息
                            if(this.defaultInfo && Object.keys(this.defaultInfo).length > 0){
                                this.$emit('modify-tourist',{
                                    index : this.defaultInfo['index'],
                                    data : {
                                        name : this.formData.name,
                                        phone : this.formData.phone,
                                        idTableData : this.idTableData,
                                        productInfo : this.productListDeal.filter(item => item.takeNum > 0)
                                    }
                                });
                            }else{
                                this.$emit('add-tourist',{
                                    name : this.formData.name,
                                    phone : this.formData.phone,
                                    idTableData : this.idTableData,
                                    productInfo : this.productListDeal.filter(item => item.takeNum > 0)
                                });
                            }
                            this.$emit('input', false);
                        }).catch(err => {
                            if(err === 'ticketErr'){
                                this.$Message.error('最少选择一种产品信息');
                            }else if(err === 'idTypeErr'){
                                this.$Message.warning('请先保存正在编辑的证件类型')
                            }
                        });
                    }
                });
            },
            /**
             * 取消新增游客
             */
            cancel () {
                this.$emit('input',false);
            },
            /**
             * 修改证件类型
             * @param index
             */
            modifyIdfo (index) {
                this.originalIDInfo[index] = JSON.parse(JSON.stringify(this.idTableData[index]));
                this.$set(this.idTableData[index],'editType','edit');
                this.$set(this.idTableData[index],'modifyType','modify');
            },
            /**
             * 删除证件类型
             * @param index
             */
            delIdInfo (index) {
                this.idTableData.splice(index,1);
            },
            /**
             * 添加证件类型
             */
            addCardInfo () {
                // if(this.idTableData.length >= this.acceptCertificateType.all.length){
                //     this.$Message.error(`最多添加${this.acceptCertificateType.all.length}个证件`);
                // }else{
                    this.idTableData.push({
                        type : '',
                        data : '',
                        editType : 'edit',
                        modifyType : 'add'
                    });
                // }
            },
            /**
             * 保存证件类型
             * @param index
             */
            saveCardInfo (index){
                for(let i = 0,j = this.idTableData.length;i < j;i++){
                    if(i !== index && this.idTableData[index]['type'] !== '' && this.idTableData[index]['type'] === this.idTableData[i]['type']){
                        this.$Message.error(`${this.$t(this.idTableData[index]['type'])}已经填写，请选择其它证件类型`);
                        return;
                    }
                }
                //判断证件类型和证件号是否已经填写，并且需要判断证件号和证件类型是否已经填写过
                Promise.all([new Promise((resolve,reject) => {
                    this.$refs.formInline.validateField('idCard' + index,valid => {
                        if(valid){
                            reject();
                        }else{
                            resolve();
                        }
                    });
                }),new Promise((resolve,reject) => {
                    this.$refs.formInline.validateField('idTypeIn' + index,valid => {
                        if(valid){
                            reject();
                        }else{
                            resolve();
                        }
                    });
                })]).then(() => {
                    this.$set(this.idTableData[index],'editType','');
                    // for(let i = 0,j = this.productList.length;i < j;i++){
                    //     if(this.productPolicy[this.productList[i].productId]['needId'] !== 'noRequired'){
                    //         this.$refs.formInline.validateField('idType' + i);
                    //     }
                    // }
                });
            },
            /**
             * 取消保存
             * @param index
             */
            cancelEdit (index) {
                if(this.idTableData[index]['modifyType'] === 'add'){
                    this.delIdInfo(index);
                }else{
                    // this.idTableData[index] = this.originalIDInfo.splice(index,1);
                    this.$set(this.idTableData,index,this.originalIDInfo[index]);
                }
            },
            /**
             * 获取产品下所有证件类型
             */
            findProductSaleRule () {
                ajax.post('findProductSaleRule',{
                    productIds : this.ticketTableData.map(item => item.productId).join(',')
                }).then(res => {
                    if(res.success){
                        this.productPolicy = res.data ? res.data : {};
                    }else{
                        this.productPolicy = {};
                    }
                });
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === true){
                    this.findProductSaleRule();
                }else{
                    this.$refs.formInline.resetFields();
                    this.idTableData = [];
                }
            },
            /**
             * 校验证件状态
             */
            validateIdType ( ) {
                return new Promise((resolve,reject) => {
                    for(let i = 0 ,j = this.idTableData.length;i < j;i++ ){
                        if(this.idTableData[i]['editType'] === 'edit'){
                            reject('idTypeErr');
                        }
                    }
                    resolve();
                });
            },
            /**
             * 取票数量改变
             * @param rowData
             */
            takeNumChange (rowData) {
                if(rowData.takeNum > 0){
                    if(!rowData.idType){
                        rowData.idType = this.productPolicy[rowData.productId].acceptIdType ? this.productPolicy[rowData.productId].acceptIdType.split(',')[0] : '';
                    }
                }else{
                    rowData.idType = '';
                }
            },
            /**
             * 校验总的取票数量是否正确
             */
            validateGetTicketNum () {
                return new Promise((resolve,reject) => {
                    let num = 0;
                    for(let i = 0,j = this.productListDeal.length;i < j;i++){
                        num += this.productListDeal[i]['takeNum'];
                    }
                    if(num <= 0){
                        reject('ticketErr');
                    }else{
                        resolve();
                    }
                });
            },
            /**
             * 校验填写的游客是否可以购票
             */
            checkProductSaleRule () {
                let checkProducts = this.getChcekProducts();
                return new Promise((resolve,reject) => {
                    ajax.post('checkProductSaleRule',{
                        productSaleVo : JSON.stringify(checkProducts)
                    }).then(res => {
                        if(res.success){
                            if(res.data && res.data.length > 0){
                                this.addTouristModalShow = true;
                                this.touristErrList = res.data;
                                reject();
                            }else{
                                resolve();
                            }
                        }else{
                            reject();
                        }
                    });
                });
            },
            /**
             * 校验手机号码是否存在
             * @param phone
             */
            validatePhoneIsExit (phone) {
                return new Promise((resolve,reject) => {
                    //区分当前是修改游客还是添加游客
                    if(this.defaultInfo && Object.keys(this.defaultInfo).length > 0){
                        for(let i = 0,j = this.addedTouristInfo.length;i < j;i++){
                            if(i !== this.defaultInfo['index'] && this.addedTouristInfo[i]['phone'] === this.formData.phone){
                                reject();
                            }
                        }
                        resolve();
                    }else{
                        for(let i = 0,j = this.addedTouristInfo.length;i < j;i++){
                            if(this.addedTouristInfo[i]['phone'] === this.formData.phone){
                                reject();
                            }
                        }
                        resolve();
                    }
                });
            },
            /**
             * 校验证件号是否已经填写过
             * @param cardInfo
             */
            validateIdCardNumIsExist (cardInfo) {
                return new Promise((resolve,reject) => {
                    if(this.defaultInfo && Object.keys(this.defaultInfo).length > 0){
                        for(let i = 0,j = this.addedTouristInfo.length;i < j;i++){
                            let idTableData = this.addedTouristInfo[i]['idTableData'] ? this.addedTouristInfo[i]['idTableData'] : [];
                            for(let a = 0,b = idTableData.length;a < b;a++){
                                if(i !== this.defaultInfo['index'] && idTableData[a]['data'] === cardInfo['data'] && idTableData[a]['type'] === cardInfo['type']){
                                    reject();
                                }
                            }
                        }
                        resolve();
                    }else{
                        for(let i = 0,j = this.addedTouristInfo.length;i < j;i++){
                            let idTableData = this.addedTouristInfo[i]['idTableData'] ? this.addedTouristInfo[i]['idTableData'] : [];
                            for(let a = 0,b = idTableData.length;a < b;a++){
                                if(idTableData[a]['data'] === cardInfo['data'] && idTableData[a]['type'] === cardInfo['type']){
                                    reject();
                                }
                            }
                        }
                        resolve();
                    }
                });
            },
            /**
             * 获取需要校验的产品信息
             */
            getChcekProducts () {
                //证件信息转对象
                let idsObj = {};
                for(let i = 0,j = this.idTableData.length;i < j;i++){
                    idsObj[this.idTableData[i]['type']] = this.idTableData[i];
                }
                return this.productListDeal.map(item =>{
                    return {
                        productId : item.productId,
                        documentType : item.idType,
                        documentId : idsObj[item.idType] ? idsObj[item.idType]['data'] : '',
                        mobile : this.formData.phone,
                        count : item.takeNum,
                        productName : item.productName,
                        visitorName : this.formData.name
                    }
                }).filter(item => item.count > 0);
            }
        },
        watch : {
            productList (newVal,oldVal){
                if(newVal){
                    this.ticketTableData = JSON.parse(JSON.stringify(newVal));
                }else{
                    this.ticketTableData = [];
                }
            },
            //如果默认信息不为空表示在修改游客信息
            defaultInfo (newVal){
                if(newVal && Object.keys(newVal).length > 0){
                    let productInfo = {};
                    this.formData.name = newVal.name;
                    this.formData.phone = newVal.phone;
                    this.idTableData = newVal.idTableData;
                    for(let i = 0,j = newVal.productInfo.length;i < j;i++){
                        productInfo[newVal.productInfo[i]['productId']] = newVal.productInfo[i];
                    }
                    this.ticketTableData = this.productList.map(item => {
                        return {
                            ...item,
                            takeNum : productInfo[item.productId] ? '' : item.takeNum,
                            leftNum : productInfo[item.productId] ? (productInfo[item.productId]['takeNum'] + item.leftNum) : item.leftNum,
                        }
                    });
                    this.type =  'edit';
                }else{
                    this.ticketTableData = JSON.parse(JSON.stringify(this.productList));
                    this.type =  'add';
                }
            },
            acceptCertificateType (newVal) {
                if(!this.defaultInfo || Object.keys(this.defaultInfo).length < 1){
                    if(newVal && newVal.all){
                        if(newVal.all.length > 0 && this.idTableData.length < 1){
                            this.idTableData =  [
                                {
                                    type : 'identity',
                                    data : '',
                                    editType : 'edit',
                                    modifyType : 'add'
                                }
                            ];
                        }else{
                            this.idTableData =  [];
                        }
                    }
                }
            }
        },
        computed : {
            //产品接受的证件类型
            acceptCertificateType () {
                let result = [];
                let arrTmp = [];
                let accpet = [];
                let productIdsList = {};
                for(let item in this.productPolicy){
                    arrTmp = this.productPolicy[item].acceptIdType ? this.productPolicy[item].acceptIdType.split(',') : [];
                    for(let i = 0,j = arrTmp.length;i < j;i++){
                        if(!result.includes(arrTmp[i]) && this.productPolicy[item]['needId'] !== 'noRequired'){
                            result.push(arrTmp[i]);
                        }
                    }
                    productIdsList[item] = [];
                    for(let i = 0,j = idType.length;i < j;i++){
                        if(arrTmp.includes(idType[i]['value'])){
                            productIdsList[item].push(idType[i])
                        }
                    }
                }
                for(let i = 0,j = idType.length;i < j;i++){
                    if(result.includes(idType[i]['value'])){
                        accpet.push(idType[i]);
                    }
                }
                return {
                    all : accpet,
                    acceptArr : result,
                    ...productIdsList
                };
            },
            //产品数量限制
            productListDeal () {
                if(this.productPolicy && Object.keys(this.productPolicy).length > 0){
                    return this.ticketTableData.map(item => {
                        let numCount = item.takeNum;
                        let needId = this.productPolicy[item.productId] ? this.productPolicy[item.productId].needId : '';
                        let max = item.leftNum;
                        //一个证件只能购买一张票
                        if(needId === 'one'){
                            max = max >= 1 ? 1 : 0;
                            if(!item.takeNum || item.takeNum <= 0){
                                numCount = 1;
                            }
                        }else{
                            if(!item.takeNum || item.takeNum <= 0){
                                numCount = item.num;
                            }
                        }
                        if(numCount > max){
                            if(!item.takeNum || item.takeNum <= 0){
                                numCount = max;
                            }
                        }
                        return {
                            ...item,
                            disabled : false,
                            max : max,
                            min : 0,
                            takeNum : Number(numCount),
                            idType : this.productPolicy[item.productId] && this.productPolicy[item.productId].acceptIdType && this.productPolicy[item.productId].needId !== 'noRequired' ? this.productPolicy[item.productId].acceptIdType.split(',')[0] : '',
                            needId : needId
                        }
                    });
                }else{
                    return this.ticketTableData.map(item => {
                        return {
                            ...item,
                            disabled : true,
                            max : 0,
                            min : 0,
                            idType : this.productPolicy[item.productId] && this.productPolicy[item.productId].acceptIdType && this.productPolicy[item.productId].needId !== 'noRequired' ? this.productPolicy[item.productId].acceptIdType.split(',')[0] : '',
                            needId : this.productPolicy[item.productId] ? this.productPolicy[item.productId].needId : ''
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .add-tourist{

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: $font_size_16px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                width: 100%;
                display: inline-block;
                @include overflow_tip();
            }
        }

        .title-label{
            position: relative;
            padding: 16px 0 10px 0;
            @include block_outline($height : 54px);
            font-size: $font_size_16px;
            color: $color_333;
            line-height: 30px;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
            }
        }

        .add-id-card{
            @include block_outline($height : 40px);
            padding: 14px 0 10px 14px;

            /deep/ .ivu-icon{
                font-weight: bold;
                font-size: $font_size_18px;
                margin-right: 8px;
                color: $color_blue;
            }

            .add-btn{
                font-size: $font_size_12px;
                color: $color_blue;
                cursor: pointer;
                display: inline-flex;
                flex-direction: row;
                align-items: center;
            }
        }

        .ivu-form{
            max-height: 475px;
            overflow: auto;
            padding: 30px;

            .ivu-form-item{
                margin-bottom: 0;
            }

            .get-ticket /deep/ .ivu-form-item-error-tip,
            .id-class /deep/ .ivu-form-item-error-tip{
                position: relative;
            }

            .id-class /deep/ .el-table td{
                padding: 5px 0;
            }

            .get-ticket /deep/ .el-table td{
                padding: 5px 0;
            }

            .id-class .row-class{
                padding: 4px 0;
            }

            .id-class /deep/ .ivu-form-item-content,
            .get-ticket /deep/ .ivu-form-item-content{
                line-height: 30px;
            }

            /deep/ .el-table th, /deep/ .el-table td{
                padding: 8px 0;
            }

            .cancel{
                color: #3F3F3F;
            }
        }

        /deep/ .table-com{
            border-top: 1px solid #EBEEF5;
        }

        /deep/ .ivu-modal-body{
            padding: 0;
        }
    }
</style>

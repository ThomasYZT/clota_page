<!--下单人信息-->

<template>
    <div class="place-order-info">
        <div class="title">
            下单人信息
        </div>
        <Form ref="formInline" :model="formData" label-position="right" :label-width="110">
            <i-row>
                <i-col span="11">
                    <FormItem label="请选择下单人" >
                        <Select v-model="formData.payerType"
                                style="width: 280px;"
                                @on-change="payerChange">
                            <Option v-for="item in payPersonListFilter"
                                    :value="item.value"
                                    :key="item.value">
                                {{item.label}}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="11">
                    <FormItem prop="phone" label="手机号" :rules="ruleInline.phone">
                        <Input v-model="formData.phone"
                               :disabled="formData.payerType !== 'other'"
                               style="width: 280px"/>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="11" v-if="formData.payerType === 'other'">
                    <FormItem prop="payer" label="下单人姓名" :rules="ruleInline.payer">
                        <Input v-model="formData.payer" style="width: 280px"/>
                    </FormItem>
                </i-col>
                <i-col span="11" v-if="formData.payerType === 'other'">
                    <FormItem prop="idNum" label="身份证号码" :rules="ruleInline.idNum">
                        <Input v-model="formData.idNum" style="width: 280px"/>
                    </FormItem>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import {validator} from 'klwk-ui';
    export default {
        props :{
            //下单人
            'pay-person-list' : {
              type : Array ,
              default () {
                  return [];
              }
            }
        },
        data() {
            //校验手机号码
            const validatePhone =  (rule,value,callback) => {
                  if(value && validator.isMobile(value)){
                      callback();
                  }else{
                      callback(this.$t('errorFormat', { field : this.$t('mobilePhone')}));
                  }
            };
            //校验身份证号
            const validateIdNum = (rule,value,callback) => {
                if(value){
                    if(validator.isIdCard(value)){
                        callback();
                    }else{
                        callback(this.$t('errorFormat', { field : this.$t('identityNo')}));
                    }
                }else{
                    callback();
                }
            };
            return {
                ruleInline: {
                    payer: [
                        { required: true, message: this.$t('inputField',{field : '下单人姓名'}), trigger: 'blur' },
                        { max : 20, message: this.$t('errorMaxLength', { field : '下单人姓名' , length : 20}), trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: this.$t('inputField',{field : this.$t('mobilePhone')}), trigger: 'blur' },
                        {validator :validatePhone,trigger : 'blur'}
                    ],
                    idNum : [
                        { validator : validateIdNum ,trigger :'blur'}
                    ]
                },
                formData : {
                    payerType : '',
                    //下单人
                    payer : '',
                    phone : '',
                    //身份证号
                    idNum : ''
                }
            }
        },
        methods: {
            /**
             * 下单人改变,选择其它，重新设置下单人信息
             */
            payerChange (data) {
                if(data === 'other'){
                    this.formData.payer = '';
                    this.formData.phone = '';
                    this.formData.idNum = '';
                }else{
                    for(let i = 0,j = this.payPersonListFilter.length;i < j;i++){
                        if(data === this.payPersonListFilter[i]['value']){
                            this.formData.phone = this.payPersonListFilter[i]['phone'];
                        }
                    }
                }
                this.$refs.formInline.validate();
            },
            /**
             * 获取下单人信息
             */
            getPlaceOrderInfo () {
                return new Promise((resolve,reject) => {
                    this.$refs.formInline.validate(valid => {
                        if(valid){
                            //下单人姓名
                            let visitorName = '';
                            if(this.payerType === 'other'){
                                visitorName = this.formData.payer;
                            }else{
                                visitorName = this.formData.payerType;
                            }
                            resolve({
                                documentInfo : this.getPlaceOrderDocumentInfo(),
                                phoneNumber : this.formData.phone,
                                visitorName : visitorName,
                                visitorType : 'payer',
                            });
                        }else{
                            reject();
                        }
                    });
                });
            },
            /**
             * 获取下单人证件信息
             */
            getPlaceOrderDocumentInfo () {
                //证件信息
                let documentInfo = '';
                if(this.payerType === 'other'){
                    documentInfo = JSON.stringify([{
                        data : this.formData.idNum,
                        type : 'identity'
                    }])
                }else{
                    for(let i = 0,j = this.payPersonListFilter.length;i < j;i++){
                        if(this.formData.payerType === this.payPersonListFilter[i]['value']){
                            //游客证件信息
                            let idTableData = this.payPersonListFilter[i]['idTableData'];
                            documentInfo = JSON.stringify(idTableData.map(item => {
                                return {
                                    data : item.data,
                                    type : item.type,
                                }
                            }))
                        }
                    }
                }
                return documentInfo;
            }
        },
        computed : {
            //下单人列表，（添加了其它选项）
            payPersonListFilter () {
                return [...this.payPersonList,{
                    label : '其它',
                    value :'other',
                    phone : '',
                    idTableData : []
                }]
            }
        },
        watch : {
            payPersonListFilter :{
                handler (newVal,oldVal){
                    if(newVal && newVal.length > 0){
                        if(!this.formData.payerType){
                            this.formData.payerType = newVal[0]['value'];
                            this.formData.phone = newVal[0]['phone'];
                        }else if(this.payerType === 'other' && this.formData.payer === '' && this.formData.phone === '' && this.formData.idNum === ''){
                            this.formData.payerType = newVal[0]['value'];
                            this.formData.phone = newVal[0]['phone'];
                        }else if(oldVal.length > newVal.length){
                            this.formData.payerType = newVal[0]['value'];
                            this.formData.phone = newVal[0]['phone'];
                            this.formData.payer = '';
                            this.formData.idNum = '';
                        }
                    }else{
                        this.formData.payerType = '';
                        this.formData.phone = '';
                    }
                },
                deep :true,
                immediate : true
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .place-order-info{
        padding: 0 30px;

        .title{
            position: relative;
            padding: 16px 0;
            @include block_outline($height : 60px);
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
    }
</style>
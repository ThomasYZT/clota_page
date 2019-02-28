<template>
    <!--新增/修改会员信息-->
    <div class="add-member">

        <bread-crumb-head
            :before-router-list="beforeRouterList"
            :locale-router="localeRouter">
        </bread-crumb-head>

        <div class="add-member-content">

            <!--基本信息-->
            <div class="form-container">
                <Form ref="formValidate"
                      :model="member"
                      :rules="ruleValidate"
                      label-position="top">
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('name')" prop="custName"><!--姓名-->
                            <Input v-model.trim="member.custName"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('mobilePhone')" prop="phoneNum"><!--手机号-->
                            <Input v-model.trim="member.phoneNum"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap">-->
                        <!--<Form-item label="E-mall" prop="emailAddr">-->
                            <!--<Input v-model.trim="member.emailAddr"-->
                                   <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('birthday')" prop="birthDay">
                            <Date-picker
                                type="date"
                                transfer
                                v-model="member.birthDay"
                                :options="dateOption"
                                :placeholder="$t('selectField', {msg: ''})"
                                @on-change="customValid($event, 'birthDay')">
                            </Date-picker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('gender')" prop="gender"><!--性别-->
                            <Select v-model="member.gender"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    transfer>
                                <Option v-for="(item,index) in enumData.genderEnum"
                                        :key="index"
                                        :value="item.name">
                                    {{$t(item.desc)}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap">-->
                        <!--<Form-item :label="$t('QQ')" prop="qq">-->
                            <!--<Input v-model.trim="member.qq"-->
                                   <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <!--<div class="ivu-form-item-wrap">
                        <Form-item :label="$t('weChat')" prop="wechatAcct">&lt;!&ndash;微信&ndash;&gt;
                            <Input v-model.trim="member.wechatAcct"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>-->
                    <!--<div class="ivu-form-item-wrap">
                        <Form-item :label="$t('ailiPay')" prop="alipayAcct">&lt;!&ndash;支付宝&ndash;&gt;
                            <Input v-model.trim="member.alipayAcct"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>-->
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap">-->
                        <!--<Form-item :label="$t('levelSetting')" prop="levelId">&lt;!&ndash;会员级别&ndash;&gt;-->
                            <!--<Select v-model="member.levelId"-->
                                    <!--:placeholder="$t('selectField', {msg: $t('memberLevelPri')})">&lt;!&ndash;请选择会员初始级别&ndash;&gt;-->
                                <!--<Option v-for="item in enumData.level"-->
                                        <!--:key="item.id"-->
                                        <!--:value="item.id">{{item.levelDesc}}</Option>-->
                            <!--</Select>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <!--<div class="ivu-form-item-wrap">
                        <Form-item :label="$t('memberChannel')" prop="channelId">&lt;!&ndash;会员渠道&ndash;&gt;
                            <Select v-model="member.channelId"
                                    :placeholder="$t('selectField', {msg: $t('memberOriginChannel')})">&lt;!&ndash;请选择会员来源渠道&ndash;&gt;
                                <Option v-for="item in enumData.channel"
                                        :key="item.id"
                                        :value="item.id">
                                    {{item.channelName}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>-->
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap">-->
                        <!--<Form-item :label="$t('countryCode')" prop="stateCode">&lt;!&ndash;国家代码&ndash;&gt;-->
                            <!--<Input v-model.trim="member.stateCode"-->
                                   <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap">-->
                        <!--<Form-item :label="$t('cityCode')" prop="cityCode">&lt;!&ndash;城市代码&ndash;&gt;-->
                            <!--<Input v-model.trim="member.cityCode"-->
                                   <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <!--<div class="ivu-form-item-wrap">
                        <Form-item :label="$t('thirdCardNum')" prop="tpNo">&lt;!&ndash;第三方卡号&ndash;&gt;
                            <Input v-model.trim="member.tpNo"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('thirdCardFaceNum')" prop="tpCardNo">&lt;!&ndash;第三方卡面号&ndash;&gt;
                            <Input v-model.trim="member.tpCardNo"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>-->
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('credentialsType')" prop="certificationType"><!--证件类型-->
                            <Select v-model="member.certificationType"
                                    transfer
                                    :placeholder="$t('selectField', {msg: $t('credentialsType')})"
                                    @on-change="idTypeChange"><!--请选择证件类型-->
                                <Option v-for="item in enumData.idType"
                                        :key="item.id"
                                        :value="item.id">
                                    {{item.name}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item :label="$t('credentialsCode')" prop="idCardNumber"><!--证件编号-->
                            <Input v-model.trim="member.idCardNumber"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </div>
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap">-->
                        <!--<Form-item :label="$t('personalInterests')" prop="hobby">&lt;!&ndash;个人兴趣&ndash;&gt;-->
                            <!--<Input v-model.trim="member.hobby"-->
                                   <!--:placeholder="$t('inputField', {field: ''})"/>-->
                        <!--</Form-item>-->
                    <!--</div>-->
                    <!--空字段站位用-->
                    <!--会员3期暂时去掉-->
                    <!--<div class="ivu-form-item-wrap"></div>-->
                    <div class="ivu-form-item-wrap single">
                        <Form-item :label="$t('address')" prop="homeAddr"><!--地址-->
                            <Input v-model.trim="member.homeAddr"
                                   :placeholder="$t('inputField', {field: $t('familyAddress')})"/><!--请输入家庭地址-->
                        </Form-item>
                    </div>

                </Form>
            </div>

            <div class="content-footer">
                <template v-if="type === 'add'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('confirmAdd')}}
                    </Button>
                </template>
                <template v-if="type === 'modify'">
                    <Button type="primary"
                            :loading="loading"
                            @click="formValidateFunc">
                        {{$t('confirm')}}
                    </Button>
                </template>
                <Button type="ghost"
                        @click="goBack">
                    {{$t("cancel")}}
                </Button>
            </div>

        </div>
    </div>
</template>

<script>

    import breadCrumbHead from '@/components/breadCrumbHead/index';
    import { genderEnum, vipLevel, vipChannel } from '@/assets/js/constVariable';
    import pick from 'lodash/pick';
    import defaultsDeep from 'lodash/defaultsDeep';
    import { validator } from 'klwk-ui';
    import ajax from '@/api/index';
    import minBy from 'lodash/minBy';
    import common from '@/assets/js/common.js';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { mapGetters } from 'vuex';

    export default {
        mixins : [lifeCycleMixins],
        components : {
            breadCrumbHead
        },
        data () {
            let validateMethod = {

                mobile : (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(this.$t('errorFormat',{ field : this.$t('phoneNum') }));
                    } else {
                        callback();
                    }
                },

                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                }

            };
            //校验邮箱
            const validateEmail = (rule,value,callback) => {
                if (value) {
                    if (validator.isEmail(value)) {
                        callback();
                    } else {
                        callback(this.$t('errorFormat',{ field : this.$t('mail') }));
                    }
                } else {
                    callback();
                }
            };
            //校验字段长度
            const validateFileLength = (rule,value,callback) => {
                if (common.isNotEmpty(value)) {
                    if (value.length > rule.maxLength) {
                        callback(this.$t('errorMaxLength',{ field : rule.name,length : rule.maxLength }));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            //校验字符串是否包含数字和字母
            const validateNumAndStr = (rule,value,callback) => {
                if (common.isNotEmpty(value)) {
                    if (this.member.certificationType === '1') {
                        if (validator.isIdCard(value)) {
                            callback();
                        } else {
                            callback(this.$t('errorFormat', { field : rule.name }));
                        }
                    } else {
                        if (/^[A-Za-z0-9]{0,}$/g.test(value)) {
                            if (value.length > rule.maxLength) {
                                callback(this.$t('errorMaxLength', { field : rule.name, length : rule.maxLength }));
                            } else {
                                callback();
                            }
                        } else {
                            callback(this.$t('errorFormat', { field : rule.name }));
                        }
                    }
                } else {
                    callback(this.$t('selectField',{ msg : this.$t('identificationNum') }));
                }
            };
            return {
                //面包屑上级路由信息
                beforeRouterList : [
                    {
                        name : 'memberInfo', // 会员信息
                        router : {
                            name : 'memberInfo'
                        },
                    }
                ],
                //新增/修改
                type : 'add',
                loading : false,
                dateOption : {
                    disabledDate : function ( value ) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData : {
                    level : vipLevel.slice(1),
                    channel : vipChannel.slice(1),
                    idType : [],
                    status : [
                        {
                            desc : this.$t('memberStatusAll'), // 全部会员状态
                            name : this.$t('memberStatusAll'),
                        }
                    ],
                    genderEnum : genderEnum
                },
                //表单数据-会员信息+卡信息
                member : {
                    //会员信息
                    "custName" : "",//姓名
                    "phoneNum" : "",//手机号
                    "emailAddr" : "",//E-mall
                    "birthDay" : "",//生日
                    "gender" : "",// 性别
                    "qq" : "",//QQ
//                    "wechatAcct":"",//微信
//                    "alipayAcct":"",//支付宝
                    "cityCode" : "",//城市代码
                    "stateCode" : "",//国家代码
                    "hobby" : "",//个人兴趣
                    "certificationType" : "",//证件类型
                    "idCardNumber" : "",//证件号码
                    "homeAddr" : "",//家庭地址
                    "status" : "active",//默认正式会员
                    //卡信息
                    "levelId" : "",//会员级别
//                    "channelId":"",//会员渠道
//                    "tpNo":"",//第三方卡号
//                    "tpCardNo":"",//第三方卡面号
                },
                ruleValidate : {
                    custName : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('name') }), trigger : 'blur' }, // 姓名不能为空
                        { type : 'string', max : 15, message : this.$t('errorMaxLength', { field : this.$t('name'), length : 15 }), trigger : 'blur' }, // 姓名不能多于15个字符
                        { validator : validateMethod.emoji, trigger : 'blur' }
                    ],
                    phoneNum : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('mobilePhone') }), trigger : 'blur' }, // 手机号不能为空
                        { validator : validateMethod.mobile, trigger : 'blur' }
                    ],
                    gender : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('gender') }), trigger : 'change' }, // 性别不能为空
                    ],
                    emailAddr : [
                        { validator : validateEmail,trigger : 'blur' },
                        { max : 100, message : this.$t('errorMaxLength', { field : this.$t('mail'), length : 100 }), trigger : 'blur' }, // 邮箱不能多于100个字符
                    ],
                    qq : [
                        { validator : validateFileLength,trigger : 'blur',name : 'qq',maxLength : 50 }
                    ],
                    /*wechatAcct : [
                        {validator : validateFileLength,trigger : 'blur',name : this.$t('weChat'),maxLength : 50}
                    ],*/
                    /*alipayAcct : [
                        {validator : validateFileLength,trigger : 'blur',name : this.$t('ailiPay'),maxLength : 30}
                    ],*/
                    hobby : [
                        { validator : validateFileLength,trigger : 'blur',name : this.$t('personalInterests'),maxLength : 100 }
                    ],
                    homeAddr : [
                        { validator : validateFileLength,trigger : 'blur',name : this.$t('address'),maxLength : 100 }
                    ],
                    stateCode : [
                        { validator : validateNumAndStr,trigger : 'blur',name : this.$t('countryCode'),maxLength : 30 }
                    ],
                    cityCode : [
                        { validator : validateNumAndStr,trigger : 'blur',name : this.$t('cityCode'),maxLength : 30 }
                    ],
                    /*tpNo : [
                        {validator : validateNumAndStr,trigger : 'blur',name : this.$t('thirdCardNum'),maxLength : 30}
                    ],*/
                    idCardNumber : [
                        { required : true,validator : validateNumAndStr,trigger : 'blur',name : this.$t('credentialsCode'),maxLength : 40 }
                    ],
                    birthDay : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('birthday') }),
                            trigger : 'change',
                            type : 'date'
                        }
                    ],
                    certificationType : [
                        {
                            required : true,
                            message : this.$t('selectField',{ msg : this.$t('credentialsType') }),
                            trigger : 'change'
                        }
                    ],
                    /*tpCardNo : [
                        {validator : validateNumAndStr,trigger : 'blur',name : this.$t('thirdCardFaceNum'),maxLength : 30}
                    ]*/
                },
                //编辑原数据
                info : {},
            };
        },
        computed : {
            localeRouter () {
                return this.type === 'add' ? this.$t('addMember') : this.$t('modifyMember'); // 新增会员 ： 修改会员信息
            },
            ...mapGetters({
                lang : 'lang',
            }),
        },
        created () {
            this.getChannelList();
            this.queryDocument();
            this.getLevelList();
            // 初始化
            // this.init();
        },

        methods : {

            //手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid (data, field) {
                this.$nextTick(()=>{
                    this.$refs.formValidate.validateField( field );
                });
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        let params = {
                            memberInfo : pick(this.member, ['custName', 'phoneNum','emailAddr','birthDay',
                                'gender','qq', 'wechatAcct','alipayAcct','cityCode','stateCode','hobby',
                                'certificationType','idCardNumber','homeAddr','status']),
                            memberCard : pick(this.member, ['levelId', 'channelId']),
                        };
                        params.memberInfo.birthDay = params.memberInfo.birthDay ?
                            new Date(params.memberInfo.birthDay).format('yyyy-MM-dd') : '';
                        //区分新增与修改
                        if ( this.type === 'add' ) {
                            this.saveAndEditMember( 'saveNewMemberInfo', params);
                        }
                        if ( this.type === 'modify' ) {
                            params.memberInfo.id = this.info.id;
                            params.memberCard.id = this.info.cardId;
                            this.saveAndEditMember( 'editMemberInfo', params);
                        }
                    }
                });
            },

            // 获取会员级别列表
            getLevelList () {
                return ajax.post('queryMemberLevels', {
                    pageNo : 1,
                    pageSize : 99999,
                    isDeleted : 'false',
                }).then(res => {
                    if (res.success) {
                        this.$set(this.enumData, 'level', this.enumData.level.concat(res.data.data || []));
                        if (!this.member.levelId) {
                            let minLevelInfo = minBy(this.enumData.level, 'levelNum');
                            if (minLevelInfo && 'id' in minLevelInfo) {
                                this.member.levelId = minBy(this.enumData.level, 'levelNum').id;
                            }
                        }
                    } else {
                        this.$Message.warning('queryChannelSet ' + this.$t('queryFailure') + '！');
                    }
                    return res;
                });
            },

            // 获取会员渠道列表
            getChannelList () {
                ajax.post('queryChannelSet', {
                    pageNo : 1,
                    pageSize : 99999,
                    isDeleted : 'false',
                }).then(res => {
                    if (res.success) {
                        this.$set(this.enumData, 'channel', this.enumData.channel.concat(res.data.data || []));
                    } else {
                        this.$Message.warning('queryChannelSet ' + this.$t('queryFailure') + '！');
                    }
                });
            },

            //查询证件类型
            queryDocument () {
                ajax.post('queryDocument',{
                    isDeleted : 'false',
                    pageNo : 1,
                    pageSize : 99999,
                }).then(res => {
                    if (res.success) {
                        this.enumData.idType = res.data.data || [];
                    }
                });
            },

            //新增/编辑会员接口
            saveAndEditMember ( url, params ) {
                ajax.post(url, {
                    memberInfo : JSON.stringify(params.memberInfo),
                    memberCard : JSON.stringify(params.memberCard),
                }).then(res => {
                    if (res.success) {
                        //区分新增与修改
                        if (this.type === 'add') {
                            this.$Message.success(this.$t('successTip',{ tip : this.$t('add') })); // 新增会员成功
                            this.$router.push({ name : 'memberInfo' });
                        }
                        if (this.type === 'modify') {
                            this.$Message.success(this.$t('successTip',{ tip : this.$t('modify') })); // 修改会员成功
                            this.$router.back();
                        }
                    } else {
                        //区分新增与修改
                        let errorTip = '';
                        if (res.message === 'M008' || res.code === '300') {
                            errorTip = this.$t('phoneExistCard'); // 手机号已被注册，请更换手机号
                        }

                        if (this.type === 'add') {
                            this.$Message.error(errorTip || this.$t('failureTip',{ tip : this.$t('add') }));
                        }
                        if (this.type === 'modify') {
                            this.$Message.error(errorTip || this.$t('failureTip',{ tip : this.$t('modify') }));
                        }

                    }
                });
            },

            //返回
            goBack () {
                //区分新增与修改
                if ( this.type === 'add' ) {
                    this.$router.push({ name : 'memberInfo' });
                }
                if ( this.type === 'modify' ) {
                    this.$router.back();
                    // this.$router.push({name: this.routerFrom.name});
                }
            },
            /**
             * 获取路由信息
             */
            getParams (params) {
                if (this.$route.query.type === 'modify') {
                    if (params && Object.keys(params).length > 0) {
                        this.type = this.$route.query.type;
                        this.initData(params);
                    }
                }
            },
            /**
             * 初始化数据
             * @param data
             */
            initData (data) {
                this.info = JSON.parse(JSON.stringify(data));
                let memberInfo = pick(data, ['custName', 'phoneNum','emailAddr','birthDay',
                    'gender','qq', 'wechatAcct','alipayAcct','cityCode','stateCode','hobby',
                    'certificationType','idCardNumber','homeAddr','status','levelId','channelId']);
                this.member = defaultsDeep({},memberInfo);
            },
            /**
             * 选择的证件类型修改，重新校验证件编号
             */
            idTypeChange () {
                if (this.member.idCardNumber) {
                    this.$refs.formValidate.validateField('idCardNumber');
                }
            }

        },
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-member {
        @include block_outline();
        min-width: $content_min_width;
        overflow: auto;
        @include padding_place();
        background: $color-fff;
        border-radius: 4px;

        .breadcrumb-box{
            height: 50px;
            line-height: 50px;
            background: $color_F4F6F8;
        }

        .add-member-content{

            .form-container{
                width: 1000px;
                margin: 0 auto;
                height: 100%;
                background-color: #FFFFFF;
                border-radius: 4px;
                overflow: hidden;
                .ivu-input-icon{
                    z-index: 2;
                }

                /deep/ .ivu-form-item-label{
                    padding-left: 0;
                }

                .ivu-form{
                    padding: 55px  0;
                    text-align: center;
                }

                .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 495px;
                    /*padding-right: 55px;*/
                    /*width: 40%;*/
                    width: 49%;
                    /*text-align: center;*/
                    text-align: left;
                    vertical-align: middle;

                    .ivu-form-item{
                        width: 395px;
                        margin: 0 auto 18px;
                        text-align: left;

                        .ivu-date-picker {
                            display: block;
                        }

                        .ivu-select-selected-value,
                        .ivu-input{
                            font-size: 14px;
                        }

                        .ivu-select-item{
                            font-size: 14px !important;
                        }
                    }

                    &.single{
                        width: calc(49% + 455px);
                        padding: 0 24px 0 24px;
                        .ivu-form-item{
                            width: 100%;
                        }
                    }
                }

            }

            .content-footer{
                text-align: center;

                /deep/ .ivu-btn{
                    width: 108px;
                    &:nth-child(1){
                        margin-right: 20px;
                    }
                }

            }

        }

    }
</style>



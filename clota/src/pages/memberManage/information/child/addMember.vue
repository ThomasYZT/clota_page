<template>
    <!--新增/修改会员信息-->
    <div class="add-member">

        <bread-crumb-head :before-router-list="beforeRouterList" :locale-router="localeRouter"></bread-crumb-head>

        <div class="add-member-content">

            <!--基本信息-->
            <div class="form-container">
                <Form ref="formValidate" :model="member" :rules="ruleValidate" :label-width="115">
                    <div class="ivu-form-item-wrap">
                        <Form-item label="姓名" prop="custName">
                            <Input v-model.trim="member.custName" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="手机号" prop="phoneNum">
                            <Input v-model.trim="member.phoneNum" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="E-mall" prop="emailAddr">
                            <Input v-model.trim="member.emailAddr" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="生日" prop="birthDay">
                            <Date-picker
                                type="date"
                                v-model="member.birthDay"
                                :options="dateOption"
                                placeholder="请选择"
                                @on-change="customValid($event, 'birthDay')">
                            </Date-picker>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label=" 性别" prop="gender">
                            <Select v-model="member.gender" placeholder="请选择">
                                <Option v-for="(item,index) in enumData.genderEnum"
                                        :key="index"
                                        :value="item.name">
                                    {{item.desc}}
                                </Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="QQ" prop="qq">
                            <Input v-model.trim="member.qq" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="微信" prop="wechatAcct">
                            <Input v-model.trim="member.wechatAcct" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="支付宝" prop="alipayAcct">
                            <Input v-model.trim="member.alipayAcct" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="会员级别" prop="levelId">
                            <Select v-model="member.levelId" placeholder="请选择会员初始级别">
                                <Option v-for="item in enumData.level" :key="item.id" :value="item.id">{{item.levelDesc}}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="会员渠道" prop="channelId">
                            <Select v-model="member.channelId" placeholder="请选择会员来源渠道">
                                <Option v-for="item in enumData.channel" :key="item.id" :value="item.id">{{item.channelName}}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="国家代码" prop="stateCode">
                            <Input v-model.trim="member.stateCode" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="城市代码" prop="cityCode">
                            <Input v-model.trim="member.cityCode" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="第三方卡号" prop="tpNo">
                            <Input v-model.trim="member.tpNo" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="第三方卡面号" prop="tpCardNo">
                            <Input v-model.trim="member.tpCardNo" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="证件类型" prop="certificationType">
                            <Select v-model="member.certificationType" placeholder="请选择证件类型">
                                <Option v-for="item in enumData.idType" :key="item.id" :value="item.id">{{item.name}}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="证件编号" prop="idCardNumber">
                            <Input v-model.trim="member.idCardNumber" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <div class="ivu-form-item-wrap">
                        <Form-item label="个人兴趣" prop="hobby">
                            <Input v-model.trim="member.hobby" placeholder="请输入"/>
                        </Form-item>
                    </div>
                    <!--空字段站位用-->
                    <div class="ivu-form-item-wrap"></div>
                    <div class="ivu-form-item-wrap single">
                        <Form-item label="地址" prop="homeAddr">
                            <Input v-model.trim="member.homeAddr" placeholder="请输入家庭地址"/>
                        </Form-item>
                    </div>

                </Form>
            </div>

            <div class="content-footer">
                <template v-if="type === 'add'">
                    <Button type="primary" :loading="loading" @click="formValidateFunc">确定新增</Button>
                </template>
                <template v-if="type === 'modify'">
                    <Button type="primary" :loading="loading" @click="formValidateFunc">确定</Button>
                </template>
                <Button type="ghost" @click="goBack">取消</Button>
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
    import ajax from '@/api/index'
    import minBy from 'lodash/minBy'

    export default {
        components: {
            breadCrumbHead
        },
        data() {
            var validateMethod = {

                mobile :  (rule, value, callback) => {
                    if (!validator.isMobile(value)) {
                        callback(new Error('请输入正确的手机号码'));
                    } else {
                        callback();
                    }
                },

                emoji :  (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error('输入内容不合规则'));
                    } else {
                        callback();
                    }
                }

            };
            return {
                beforeRouterList: [
                    {
                        name: '会员信息',
                        router: 'info',
                    }
                ],
                //新增/修改
                type: 'add',
                loading: false,
                dateOption: {
                    disabledDate: function( value ){
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
                enumData: {
                    level: vipLevel.slice(1),
                    channel: vipChannel.slice(1),
                    idType: [],
                    status: [
                        {
                            desc: '全部会员状态',
                            name: '全部会员状态',
                        }
                    ],
                    genderEnum: genderEnum
                },
                //表单数据-会员信息+卡信息
                member: {
                    //会员信息
                    "custName":"",//姓名
                    "phoneNum":"",//手机号
                    "emailAddr":"",//E-mall
                    "birthDay":"",//生日
                    "gender":"",// 性别
                    "qq":"",//QQ
                    "wechatAcct":"",//微信
                    "alipayAcct":"",//支付宝
                    "cityCode":"",//城市代码
                    "stateCode":"",//国家代码
                    "hobby":"",//个人兴趣
                    "certificationType":"",//证件类型
                    "idCardNumber":"",//证件号码
                    "homeAddr":"",//家庭地址
                    "status":"active",//默认正式会员
                    //卡信息
                    "levelId":"",//会员级别
                    "channelId":"",//会员渠道
                    "tpNo":"",//第三方卡号
                    "tpCardNo":"",//第三方卡面号
                },
                ruleValidate: {
                    custName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '姓名不能多于20个字符', trigger: 'blur' },
                        { validator: validateMethod.emoji, trigger: 'blur' }
                    ],
                    phoneNum: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        { validator: validateMethod.mobile, trigger: 'blur'}
                    ],
                    gender: [
                        { required: true, message: '性别不能为空', trigger: 'change' },
                    ],
                },
                //编辑原数据
                info: {},
                // 路由from参数
                routerFrom: {}
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.routerFrom = from;
            });
        },
        computed: {
            localeRouter () {
                return this.type === 'add' ? '新增会员' : '修改会员信息'
            },
            isEdit() {
                return this.$route.query.info;
            },
        },
        created() {
            // 初始化
            this.init();
        },

        methods: {

            //页面初始化，区分新增与修改
            async init() {
                try {
                    this.getChannelList();
                    this.queryDocument();
//                    await Promise.all([this.getLevelList(), this.getChannelList(), this.queryDocument()]);
                    await this.getLevelList();

                    if (this.$route.query && this.$route.query.type) {
                        this.type = this.$route.query.type;

                        // 编辑页面时给表单赋值
                        if(this.isEdit){
                            this.info = this.$route.query.info;
                            var memberInfo = pick(this.$route.query.info, ['custName', 'phoneNum','emailAddr','birthDay',
                                'gender','qq', 'wechatAcct','alipayAcct','cityCode','stateCode','hobby',
                                'certificationType','idCardNumber','homeAddr','status']);
                            var memberCard = this.$route.query.info.memberCardVos && this.$route.query.info.memberCardVos.length >0 ?
                                pick(this.$route.query.info.memberCardVos[0], ['levelId', 'channelId','tpNo','tpCardNo']) : {
                                    levelId: '',channelId: '',tpNo: '',tpCardNo: '',
                                };
                            this.member = defaultsDeep(memberInfo, memberCard);
                        } else {
                            this.member.levelId = minBy(this.enumData.level, 'levelNum').id;
                        }
                    }
                } catch (err) {
                    console.warn(err);
                }
            },

            //手动校验，解决datePicker手动输入触发校验时获取到的值有延时导致校验错误问题
            customValid(data, field){
                this.$nextTick(()=>{
                    this.$refs.formValidate.validateField( field );
                })
            },

            //表单校验
            formValidateFunc () {
                this.$refs.formValidate.validate((valid) => {
                    if ( valid ) {
                        var params = {
                            memberInfo: pick(this.member, ['custName', 'phoneNum','emailAddr','birthDay',
                                'gender','qq', 'wechatAcct','alipayAcct','cityCode','stateCode','hobby',
                                'certificationType','idCardNumber','homeAddr','status']),
                            memberCard: pick(this.member, ['levelId', 'channelId','tpNo','tpCardNo']),
                        };
                        params.memberInfo.birthDay = params.memberInfo.birthDay ?
                            new Date(params.memberInfo.birthDay).format('yyyy-MM-dd') : '';
                        //区分新增与修改
                        if( this.type === 'add' ){
                            this.saveAndEditMember( 'saveNewMemberInfo', params);
                        }
                        if( this.type === 'modify' ){
                            params.memberInfo.id = this.info.id;
                            params.memberCard.id = this.info.cardId;
                            this.saveAndEditMember( 'editMemberInfo', params);
                        }
                    }
                })
            },

            // 获取会员级别列表
            getLevelList() {
                return ajax.post('queryMemberLevels', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.$set(this.enumData, 'level', this.enumData.level.concat(res.data.data || []));
                    } else {
                        this.$Message.warning('queryChannelSet 查询失败！');
                    }
                    return res;
                })
            },

            // 获取会员渠道列表
            getChannelList() {
                ajax.post('queryChannelSet', {
                    pageNo: 1,
                    pageSize: 99999,
                    isDeleted: 'false',
                }).then(res => {
                    if(res.success){
                        this.$set(this.enumData, 'channel', this.enumData.channel.concat(res.data.data || []));
                    } else {
                        this.$Message.warning('queryChannelSet 查询失败！');
                    }
                })
            },

            //查询证件类型
            queryDocument () {
                ajax.post('queryDocument',{
                    isDeleted: 'false',
                    pageNo: 1,
                    pageSize: 99999,
                }).then(res => {
                    if(res.success){
                        this.enumData.idType = res.data.data || [];
                    }
                })
            },

            //新增/编辑会员接口
            saveAndEditMember( url, params ){
                ajax.post(url, {
                    memberInfo: JSON.stringify(params.memberInfo),
                    memberCard: JSON.stringify(params.memberCard),
                }).then(res => {
                    if(res.success){
                        //区分新增与修改
                        if(this.type === 'add'){
                            this.$Message.success('新增会员成功！');
                            this.$router.push({ name: 'memberInfo'});
                        }
                        if(this.type === 'modify'){
                            this.$Message.success('修改会员成功！');
                            this.$router.push({name: this.routerFrom.name});
                        }
                    } else {
                        console.log(res);
                        this.$Message.warning(url+' 失败！')
                    }
                })
            },

            //返回
            goBack() {
                //区分新增与修改
                if( this.type === 'add' ){
                    this.$router.push({ name: 'memberInfo'});
                }
                if( this.type === 'modify' ){
                    this.$router.push({name: this.routerFrom.name});
                }
            },

        },
    }
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
            padding: 0 30px;
            background: $color_F4F6F8;
        }

        .add-member-content{

            .form-container{
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                border-radius: 4px;
                overflow: auto;
                .ivu-input-icon{
                    z-index: 2;
                }

                .ivu-form{
                    padding: 60px  0;
                    text-align: center;
                }

                .ivu-form-item-wrap{
                    position: relative;
                    display: inline-block;
                    min-width: 495px;
                    padding-right: 55px;
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



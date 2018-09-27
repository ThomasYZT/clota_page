<!--个人信息-->

<template>
    <div class="person-info">
        <div class="title-info">
            <div class="per-img">
                <img src="../../assets/images/icon-ali-pay.svg" alt="">
                <span class="edit">{{$t('edit')}}</span>
            </div>
        </div>
        <div class="cell-list">
            <group>
                <x-input
                    :title="$t('name')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.name"
                    placeholder-align="right">
                </x-input>
                <popup-picker
                    :title="$t('sex')"
                    show-name
                    v-model.trim="formData.gender"
                    :data="[genderEnum]">
                </popup-picker>
                <cell
                    :title="$t('phone')"
                    is-link
                    :value="formData.phoneNum"
                    :link="{name : 'changeMobile',params : {mobile : formData.phoneNum}}">
                </cell>
                <cell
                    :title="$t('tradePass')"
                    is-link
                    :value="formData.passwd"
                    :link="{name : 'changeTradePass'}">
                </cell>
                <cell
                    :title="$t('IdNumber')"
                    is-link
                    :link="{name : 'changeId'}"
                    :value="formData.idCardNumber + '(' + formData.certificationTypeName + ')'">
                </cell>
                <cell
                    :title="$t('wx')"
                    disabled
                    :value="formData.wechatAcct">
                </cell>
                <cell
                    :title="$t('ali')"
                    disabled
                    :value="formData.alipayAcct">
                </cell>
                <x-input
                    :title="$t('qq')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.qq"
                    placeholder-align="right">
                </x-input>
                <x-input
                    :title="$t('email')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.emailAddr"
                    placeholder-align="right">
                </x-input>
                <cell
                    :title="$t('growth')"
                    disabled
                    value="17237387333">
                </cell>
                <cell
                    :title="$t('entityCardId')"
                    disabled
                    :value="formData.tpNo">
                </cell>
                <cell
                    :title="$t('address')"
                    is-link
                    :value="formData.homeAddr">
                </cell>
            </group>
        </div>
        <div class="btn-area">
            <x-button @click.native="saveInfo">{{$t('save')}}</x-button>
        </div>
    </div>
</template>

<script>
    import {genderEnum} from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    import {validator} from 'klwk-ui';
    export default {
        data() {
            return {
                //性别枚举值
                genderEnum : genderEnum.map(item => ({name : this.$t(item.name),value : item.desc})),
                //个人信息数据
                formData : {
                    //姓名
                    name : '',
                    //性别
                    gender : [],
                }
            }
        },
        methods: {
            /**
             * 获取个人信息
             */
            getMemberDetail () {
                ajax.post('getMemberDetail',{
                    memberId : this.userInfo.memberId
                }).then(res => {
                    if(res.success){
                        this.formData = res.data ?{
                            ...res.data,
                            name : res.data.custName,
                            gender : [res.data.gender],
                        } : {};
                    }else{
                        this.formData = {};
                    }
                });
            },
            /**
             * 保存用户信息
             */
            saveInfo () {
                this.validateName().then(() => {
                    return this.validateQQ();
                }).then(() =>{
                    return this.validateEmail();
                }).then(() => {
                    ajax.post('updateMemberInfo',{
                        id : this.userInfo.memberId,
                        custName : this.formData.name,
                        gender : this.formData.gender[0],
                        qq : this.formData.qq,
                        emailAddr : this.formData.emailAddr,
                    }).then(res => {
                        if(res.success){
                            this.$vux.toast.show({
                                text: '保存成功'
                            });
                            this.getMemberDetail();
                        }else{
                            this.$vux.toast.show({
                                text: '保存失败',
                                type : 'cancel'
                            });
                        }
                    });
                });
            },
            /**
             * 校验姓名
             */
            validateName () {
                return new Promise((resolve,reject) => {
                    if(this.formData && !this.formData.name){
                        this.$vux.toast.show({
                            text: '请输入姓名',
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else if(this.formData.name.length > 15){
                        this.$vux.toast.show({
                            text: '姓名最多输入15个字符',
                            type: 'text',
                            width: '6rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
                });
            },
            /**
             * 校验qq
             */
            validateQQ () {
                return new Promise((resolve,reject) => {
                    if(this.formData.qq.length > 50){
                        this.$vux.toast.show({
                            text: 'qq最多输入50个字符',
                            type: 'text',
                            width: '6rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
                });
            },
            /**
             * 校验邮箱
             */
            validateEmail () {
                return new Promise((resolve,reject) => {
                    if(this.formData.emailAddr.length > 100){
                        this.$vux.toast.show({
                            text: 'E-mail最多输入100个字符',
                            type: 'text',
                            width: '6rem'
                        });
                        reject();
                    }else  if(this.formData.emailAddr && !validator.isEmail(this.formData.emailAddr)){
                        this.$vux.toast.show({
                            text: 'E-mail格式错误',
                            type: 'text',
                            width: '6rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
                });
            }
        },
        beforeRouteEnter (to,from,next){
            next(vm => {
                vm.getMemberDetail();
            });
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            })
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .person-info{
        background: rgba(242,243,244,1);
        height: 100%;
        overflow: auto;
        @include padding_place($height : 8px);

        .title-info{
            @include block_outline($height : 122px);
            background: $color_fff;

            .per-img{
                position: relative;
                @include block_outline(74px,94px,false);
                margin: 0 auto;
                padding-top: 20px;
                border-radius: 100px;
                overflow: hidden;

                img{
                    @include block_outline(100%,100%,false);
                    border-radius: 100px;
                }

                .edit{
                    @include block_outline($height : 17px);
                    line-height: 17px;
                    background: rgba($color_000,0.5);
                    @include absolute_pos(absolute,$bottom : 0px);
                    text-align: center;
                    font-size: 10px;
                    color: $color_fff;
                }
            }
        }

        .cell-list{
            margin-top: 8px;
            background: $color_fff;
            height: calc(100% - 200px);
            overflow: auto;

            .arrow-wrap {
                text-align: right;

                .info {
                    color: #353B48;
                    margin-right: 10px;
                }
            }

            /deep/.vux-cell-value{
                color: #353B48;
            }

            /deep/ .weui-cell{
                height: 49px;

                &:before{
                    background: #e8e8e8;
                }

                &.vux-cell-disabled .weui-cell__ft{
                    color: $color_999;
                }

                .vux-label,
                .weui-label{
                    font-size: $font_size_14px;
                    color: #172434;
                }

                .weui-cell__ft,
                .weui-input{
                    font-size: $font_size_14px;
                    color: #353B48;
                }
            }
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 15px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
            }
        }
    }
</style>

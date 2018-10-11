<!--个人信息-->

<template>
    <div class="person-info">
        <div class="title-info">
            <div class="per-img">
                <img :src="formData.portrait" v-if="formData.portrait" alt="">
                <span clsss="img-span" v-else></span>
                <span class="edit">
                    <!--<input class="upload" type="file" accept="image/*" @change="uploadImg($event)">-->
                    <span class="label" @click="editHeadImg">{{$t('edit')}}</span>
                </span>
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
                    value="●●●●●●"
                    :link="{name : 'changeTradePass',params : {mobile : formData.phoneNum}}">
                </cell>
                <cell
                    :title="$t('IdNumber')"
                    is-link
                    :link="{name : 'changeId',params : {certificationType : formData.certificationType,idCardNumber : formData.idCardNumber}}"
                    :value="idNum">
                </cell>
                <!--<cell-->
                    <!--:title="$t('wx')"-->
                    <!--disabled-->
                    <!--:value="formData.wechatAcct">-->
                <!--</cell>-->
                <!--<cell-->
                    <!--:title="$t('ali')"-->
                    <!--disabled-->
                    <!--:value="formData.alipayAcct">-->
                <!--</cell>-->
                <x-input
                    :title="$t('qq')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.qq"
                    placeholder-align="right">
                </x-input>
                <cell
                    :title="$t('growth')"
                    disabled
                    class="padding-right"
                    :value="formData.growth">
                </cell>
                <cell
                    :title="$t('entityCardId')"
                    disabled
                    class="padding-right"
                    :value="formData.tpNo">
                </cell>
                <x-input
                    :title="$t('address')"
                    text-align="right"
                    :show-clear="false"
                    v-model.trim="formData.homeAddr"
                    placeholder-align="right">
                </x-input>
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
                    gender : ['0'],
                    idCardNumber : '',
                    certificationTypeName : '',
                    homeAddr : '',
                    emailAddr : '',
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
                        this.$set(this,'formData',res.data ? Object.assign(this.formData,{
                            ...res.data,
                            name : res.data.custName,
                            gender : [res.data.gender],
                            qq : res.data.qq ? res.data.qq : ''
                        }) : {});
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
                        homeAddr : this.formData.homeAddr,
                    }).then(res => {
                        if(res.success){
                            this.$vux.toast.show({
                                text: this.$t('operateSuc',{msg : this.$t('save')})
                            });
                            this.getMemberDetail();
                        }else{
                            this.$vux.toast.show({
                                text: this.$t('operateFail',{msg : this.$t('save')}),
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
                            text: this.$t('pleaseInput',{field : this.$t('name')}),
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else if(this.formData.name.length > 15){
                        this.$vux.toast.show({
                            text: this.$t('maxLengthErr',{field : this.$t('name'),length : 15}),
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
                    if(this.formData.qq && this.formData.qq.length > 50){
                        this.$vux.toast.show({
                            text: this.$t('maxLengthErr',{field : this.$t('qq'),length : 50}),
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
                    if(this.formData.emailAddr && this.formData.emailAddr.length > 100){
                        this.$vux.toast.show({
                            text: this.$t('maxLengthErr',{field : this.$t('email'),length : 100}),
                            type: 'text',
                            width: '6rem'
                        });
                        reject();
                    }else  if(this.formData.emailAddr && !validator.isEmail(this.formData.emailAddr)){
                        this.$vux.toast.show({
                            text: this.$t('errFormat',{field : this.$t('email')}),
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
             * 获取成长值
             */
            getGrowthBalance () {
                ajax.post('getGrowthBalance',{
                    cardId : this.userInfo.cardId
                }).then(res => {
                    if(res.success){
                        this.$set(this.formData,'growth',res.data ? res.data.accountBalance : '');
                    }else{
                        this.formData.growth = '';
                    }
                });
            },
            // /**
            //  * 上传图片
            //  * @param e
            //  */
            // uploadImg (e) {
            //     let file = e.target.files[0];
            //     let param = new FormData(); //创建form对象
            //     param.append('file',file,file.name);//通过append向form对象添加数据
            //     if(file.size > 1024 * 1024 * 10){
            //         this.$vux.toast.show({
            //             text : this.$t('uploadErr',{size : 10}),
            //             type : 'text',
            //             width : '3.5rem'
            //         });
            //     }else{
            //         ajax.uploadFile('uploadMemberImageInfo',param).then(res => {
            //             if(res.success){
            //                 this.modifyHeadImg(res.data);
            //             }else{
            //                 this.$vux.toast.show({
            //                     text : '上传头像失败',
            //                     type : 'text',
            //                     width : '3rem'
            //                 });
            //             }
            //         });
            //     }
            // },
            // /**
            //  * 修改头像信息
            //  * @param imgSrc 头像地址
            //  */
            // modifyHeadImg (imgSrc) {
            //     ajax.post('updateMemberInfo',{
            //         id : this.userInfo.memberId,
            //         portrait : imgSrc
            //     }).then(res => {
            //         if(res.success){
            //             this.$vux.toast.show({
            //                 text: this.$t('operateSuc',{msg : this.$t('changeImg')})
            //             });
            //             this.getMemberDetail();
            //             this.getGrowthBalance();
            //         }else{
            //             this.$vux.toast.show({
            //                 text: this.$t('operateFail',{msg : this.$t('changeImg')}),
            //                 type : 'cancel'
            //             });
            //         }
            //     });
            // },
            /**
             * 上传头像
             */
            editHeadImg () {
                this.$wechat.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success : res => {
                        this.$wechat.getLocalImgData({
                            localId : res.localIds[0],
                            success : data => {
                                this.getBase64ToServer(data.localData);
                            }
                        });
                    }
                });
            },
            /**
             * 将图片base64编码发送到服务器
             * @param data
             */
            getBase64ToServer (data) {
                ajax.post('uploadBase64File',{
                    file : data
                }).then(res => {
                    if(res.success){
                        this.$vux.toast.show({
                            text: this.$t('operateSuc',{msg : this.$t('changeImg')})
                        });
                        this.getMemberDetail();
                        this.getGrowthBalance();
                    }else{
                        this.$vux.toast.show({
                            text: this.$t('operateFail',{msg : this.$t('changeImg')}),
                            type : 'cancel'
                        });
                    }
                });
            }
        },
        beforeRouteEnter (to,from,next){
            next(vm => {
                vm.getMemberDetail();
                vm.getGrowthBalance();
            });
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            }),
            //证件号码
            idNum () {
                if(this.formData && this.formData.idCardNumber){
                    if(this.formData.certificationTypeName){
                        return this.formData.idCardNumber + '(' + this.formData.certificationTypeName + ')'
                    }else{
                        return this.formData.idCardNumber;
                    }
                }else{
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .person-info{
        background: rgba(242,243,244,1);
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;

        .title-info{
            @include block_outline($height : 122px);
            background: $color_fff;
            display: flex;
            flex-direction: row;
            justify-content: center;

            .per-img{
                position: relative;
                float: left;
                @include block_outline(74px,74px,false);
                margin: 20px auto 0;
                border-radius: 100px;
                overflow: hidden;
                box-shadow: 0 4px 14px 0 rgba(0,0,0,0.20);

                .img-span,
                img{
                    @include block_outline(100%,100%,false);
                    border-radius: 100px;
                }

                .edit{
                    position: relative;
                    @include block_outline($height : 17px);
                    line-height: 17px;
                    background: rgba($color_000,0.5);
                    @include absolute_pos(absolute,$bottom : 0px);
                    text-align: center;
                    font-size: 10px;
                    color: $color_fff;

                    .upload{
                        position: absolute;
                        display: inline-block;
                        width: 74px;
                        opacity: 0;
                    }
                }
            }
        }

        .cell-list{
            margin-top: 8px;
            background: $color_fff;
            overflow: auto;

            .padding-right /deep/ .weui-cell__ft{
                padding-right: 15px;
            }

            /deep/ .vux-x-input-placeholder-right{
                padding-right: 15px;
            }

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
            @include block_outline(100%,68px);
            background: $color_fff;
            padding-top: 15px;

            /deep/ .weui-btn_default{
                width: calc(100% - 55px);
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
            }
        }
    }
</style>

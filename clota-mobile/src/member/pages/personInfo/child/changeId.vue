<!--修改证件号码-->

<template>
    <div class="change-id">
        <div class="id-area">
            <group>
                <popup-picker
                    :title="$t('cardType')"
                    show-name
                    :cancel-text="$t('cancel')"
                    :confirm-text="$t('complete')"
                    v-model.trim="formData.idType"
                    :data="[idLists]">
                </popup-picker>
                <x-input :title="$t('IdNumber')"
                         class="valid-class"
                         v-model.trim="formData.idCard"
                         text-align="right"
                         :placeholder="$t('pleaseInputMsg')" >
                </x-input>
            </group>
            <div class="btn-area">
                <x-button @click.native="save">{{$t('save')}}</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/member/api/index.js';
    import { mapGetters } from 'vuex';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import { validator } from 'klwk-ui';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //表单数据
                formData : {
                    //证件类型
                    idType : ['0'],
                    //证件号码
                    idCard : ''
                },
                //证件类型列表
                idLists : []
            };
        },
        methods : {
            /**
             * 保存证件号码
             */
            save () {
                this.validateIdTpe().then(() => {
                    return this.validateIdNum();
                }).then(() => {
                    this.updateMemberInfo();
                });
            },
            /**
             * 查询所有的证件类型
             */
            queryDocuments () {
                ajax.post('queryDocument').then(res => {
                    if (res.success) {
                        this.idLists = res.data ? res.data.data.map(item => {
                            return {
                                value : item.id,
                                name : item.name
                            };
                        }) : [];
                    } else {
                        this.idLists = [];
                    }
                });
            },
            /**
             * 校验证件类型
             */
            validateIdTpe () {
                return new Promise((resolve,reject) => {
                    if (this.formData.idType.length === 0 || this.formData.idType[0] === '0') {
                        this.$vux.toast.show({
                            text : this.$t('pleaseSelect',{ field : this.$t('cardType') }),
                            type : 'text',
                            width : '5rem'
                        });
                        reject();
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 校验证件号是否正确
             */
            validateIdNum () {
                return new Promise((resolve,reject) => {
                    if (this.formData && !this.formData.idCard) {
                        this.$vux.toast.show({
                            text : this.$t('pleaseInput',{ field : this.$t('idCard') }),
                            type : 'text',
                            width : '5rem'
                        });
                        reject();
                    } else if (this.formData && this.formData.idCard) {
                        if (this.formData.idType[0] === '1') {
                            if (validator.isIdCard(this.formData.idCard)) {
                                resolve();
                            } else {
                                this.$vux.toast.show({
                                    text : this.$t('errFormat',{ field : this.$t('idCard') }),
                                    type : 'text',
                                    width : '5.2rem'
                                });
                                reject();
                            }
                        } else {
                            if (this.formData.idCard.length > 40) {
                                this.$vux.toast.show({
                                    text : this.$t('maxLengthErr',{ field : this.$t('idCard'),length : 40 }),
                                    type : 'text',
                                    width : '5.2rem'
                                });
                                reject();
                            } else {
                                resolve();
                            }
                        }
                        reject();
                    } else {
                        resolve();
                    }
                });
            },
            /**
             * 修改证件信息
             */
            updateMemberInfo () {
                ajax.post('updateMemberInfo',{
                    id : this.userInfo.memberId,
                    certificationType : this.formData.idType[0],
                    idCardNumber : this.formData.idCard
                }).then(res => {
                    if (res.success) {
                        this.$vux.toast.show({
                            text : this.$t('operateSuc',{ msg : this.$t('modify') })
                        });
                        this.$router.push({
                            name : 'personInfo'
                        });
                    } else {
                        this.$vux.toast.show({
                            text : this.$t('operateFail',{ msg : this.$t('modify') }),
                            type : 'cancel'
                        });
                    }
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    if (params.idCardNumber) {
                        this.formData.idType = [String(params.certificationType)];
                    }
                    this.formData.idCard = params.idCardNumber;
                    this.queryDocuments();
                } else {
                    this.$router.push({
                        name : 'personInfo'
                    });
                }
            }
        },
        computed : {
            ...mapGetters({
                userInfo : 'userInfo'
            })
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-id{
        @include block_outline();
        float: left;
        background: $color_fff;

        .id-area{
            @include block_outline($height : 364px);
            background: $color_fff;
        }

        /deep/ .weui-label{
            font-size: $font_size_15px;
            color: #4A4A4A;
        }

        /deep/ .weui-input{
            font-size: $font_size_15px;
        }

        /deep/ .weui-cell{
            height: 50px;
        }

        /deep/ .weui-cells{
            margin-top: 0;

            &:before{
                display: none;
            }
        }

        /deep/ .weui-cell:before{
            left: 0;
        }

        .valid-class /deep/ .weui-input{
            padding-right: 10px;
            box-sizing: border-box;
        }

        .btn-area{
            @include block_outline(unquote('calc(100% - 55px)'),42px);
            margin: 186px auto 0;

            /deep/ .weui-btn_default{
                background: $color_0073EB;
                font-size: 17px;
                color: $color_fff;
                border-radius: 100px;
                letter-spacing: 5px;
            }
        }
    }
</style>

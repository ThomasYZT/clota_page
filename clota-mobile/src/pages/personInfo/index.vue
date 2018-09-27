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
                <cell
                    :title="$t('qq')"
                    is-link
                    :value="formData.qq">
                </cell>
                <cell
                    :title="$t('email')"
                    is-link
                    :value="formData.emailAddr">
                </cell>
                <cell
                    :title="$t('growth')"
                    disabled
                    value="17237387333">
                </cell>
                <cell
                    :title="$t('entityCardId')"
                    is-link
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
            <x-button @click.native="recharge">{{$t('save')}}</x-button>
        </div>
    </div>
</template>

<script>
    import {genderEnum} from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
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

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
                    value="17237387333"
                    :link="{name : 'changeMobile'}">
                </cell>
                <cell
                    :title="$t('tradePass')"
                    is-link
                    :link="{name : 'changeTradePass'}"
                    value="17237387333">
                </cell>
                <cell
                    :title="$t('IdNumber')"
                    is-link
                    :link="{name : 'changeId'}"
                    value="17237387333">
                </cell>
                <cell :title="$t('wx')" disabled value="17237387333"></cell>
                <cell :title="$t('ali')" disabled value="17237387333"></cell>
                <cell :title="$t('qq')" is-link value="17237387333"></cell>
                <cell :title="$t('email')" is-link value="17237387333"></cell>
                <cell :title="$t('growth')" disabled value="17237387333"></cell>
                <cell :title="$t('entityCardId')" is-link value="17237387333"></cell>
                <cell :title="$t('address')" is-link value="17237387333"></cell>
            </group>
        </div>
    </div>
</template>

<script>
    import {genderEnum} from '@/assets/js/constVariable.js';
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
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .person-info{
        background: rgba(242,243,244,1);
        min-height: 100%;
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
    }
</style>

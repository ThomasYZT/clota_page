<!--
    散客二级订单--游客信息
    作者：杨泽涛
-->
<template>
    <div class="individual-order-base-info">
        <div class="title">{{$t('touristInfo')}}</div>
        <!--下单企业视图-->
        <ul class="order-detail">
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('touristName')}}：{{visitor.visitorName | contentFilter}}</li>
                    <li class="col">{{$t('mobilePhone')}}：{{visitor.phoneNumber | contentFilter}}</li>
                </ul>
            </li>
            <li class="row">
                <ul class="list">
                    <li class="col">{{$t('credentialsType')}}：{{$t(cardType) | contentFilter}}</li>
                    <li class="col">{{$t('IdentificationNumber')}}：{{cardNum | contentFilter}} </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        props: {
            visitor: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        computed: {
            //证件类型
            cardType() {
                if(Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    let type = JSON.parse(this.visitor.documentInfo);
                    if(type.length != 0){
                        switch (type[0].type) {
                            case 'identity':
                                return 'identity';
                            case 'passport':
                                return 'passport';
                            case 'driver':
                                return 'driverLisence';
                            case 'officer':
                                return 'officer';
                            case 'police':
                                return 'police';
                            case 'license':
                                return 'licence';
                        }
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            },
            //证件号码
            cardNum() {
                if(Object.keys(this.visitor).length > 0 && this.visitor.documentInfo) {
                    let documentInfo = JSON.parse(this.visitor.documentInfo);
                    if(documentInfo.length !== 0){
                        return documentInfo[0].data;
                    }
                }
            }
        },
        components: {},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .individual-order-base-info{
        border-radius: 2px;
        margin: 10px 0 6px;
        padding: 2px 0 16px 0;
        position: relative;

        .title{
            position: relative;
            padding: 15px 0 0 0;
            @include block_outline($height : 45px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 14px;
                vertical-align: middle;
            }
        }

        .order-detail{
            padding-left: 28px;

            .list{
                overflow: auto;

                .col{
                    font-size: $font_size_14px;
                    height: 31px;
                    padding: 6px 0;
                    float: left;
                    width: 310px;
                    color: $color_666;
                    @include overflow_tip();

                    .code{
                        color: $color_yellow;
                    }
                }
            }
        }

        .ivu-btn-108px{
            @include absolute_pos(absolute,20px,24px)
        }

    }
</style>

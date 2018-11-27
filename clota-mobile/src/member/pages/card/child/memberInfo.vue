<!--成员信息-->

<template>
    <div class="member-info">
        <div class="title">
            <span class="iconfont icon-members-info"></span>
            <span class="font-label">{{$t('memberInfo')}}</span>
        </div>
        <div class="detail">
            <ul class="info-detail bottom-dashed" v-for="(item,i) in availPersonsArr" :key="i">
                <li class="field bit-title">
                    <span class="value">{{$t('memberInex',{index : item.no })}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('name')}}：</span>
                    <span class="value">{{item.name | contentFilter}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('sex')}}：</span>
                    <span class="value">{{$t(item.gender) | contentFilter}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('phone')}}：</span>
                    <span class="value">{{item.phone | contentFilter}}</span>
                </li>
                <li class="field">
                    <span class="key">{{$t('idCard')}}：</span>
                    <span class="value">{{item.idno | contentFilter}}（{{$t('identifyCard')}}）</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //成员信息
            'avail-persons' : {
                type : String,
                default : ''
            }
        },
        data() {
            return {}
        },
        methods: {
        },
        computed : {
            //成员信息数组
            availPersonsArr () {
                if(this.availPersons){
                    return JSON.parse(this.availPersons);
                }else{
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .member-info{
        margin-top: 8.5px;
        background: $color_fff;
        min-height: 50px;

        .detail{
            padding: 9.5px 24px;
            padding-bottom: 0;
        }

        .bottom-dashed{
            position: relative;
            padding-bottom: 9.5px;

            &:not(:nth-of-type(1)){
                padding-top: 10px;
            }

            &:not(:nth-last-of-type(1)):after{
                @include block_outline(unquote('calc(100% + 24px)'),0.5px);
                content: '';
                border-bottom: 1px dashed #e8e8e8;
                @include absolute_pos(absolute,$bottom : 0px);
            }
        }
    }
</style>

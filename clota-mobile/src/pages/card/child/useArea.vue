<!--可用范围-->

<template>

    <div class="use-area">
        <div class="title">
            <span class="iconfont icon-alipay"></span>
            <span class="font-label">{{$t('scopeArea')}}</span>
        </div>
        <div class="scene-list">
            <span class="scene"
                  v-for="(item,i) in availOrgsObj"
                  :key="i">
                {{item.orgName}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            //可用机构
            'avail-orgs' : {
                type : String,
                default : ''
            }
        },
        data() {
            return {}
        },
        methods: {},
        computed : {
            //可用机构
            availOrgsObj () {
                if(this.availOrgs){
                    return JSON.parse(this.availOrgs);
                }else{
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';

    .use-area{
        margin-top: 8.5px;
        background: $color_fff;
        min-height: 118px;

        .scene-list{
            padding: 12px 14px;

            .scene{
                display: inline-block;
                border-radius: 100px;
                height: 34px;
                background: $color_fafa;
                padding: 7px 14px;
                line-height: 20px;
                margin-bottom: 8px;
            }
        }
    }
</style>

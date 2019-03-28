<!--个人中心-->

<template>
    <div class="personal-center">
        <div class="tab-list">
            <ButtonGroup>
                <Button :class="{'ivu-active-tap' : filterType === item.value , 'ivu-default-tap' : filterType !== item.value}"
                        @click="filterTable(item.value)"
                        :key="index"
                        v-for="(item,index) in tapsList">
                    {{$t(item.label)}}
                </Button>
            </ButtonGroup>
        </div>
        <component :is="filterType">
        </component>
    </div>
</template>

<script>
    import baseInfo from './child/baseInfo';
    import changePass from './child/changePass';
    export default {
        components : {
            baseInfo,
            changePass
        },
        data () {
            return {
                //操作列表
                tapsList : [
                    {
                        value : 'baseInfo',
                        label : 'baseInfo'
                    },
                    {
                        value : 'changePass',
                        label : 'changePass'
                    }
                ],
                //当前激活的tap标签
                filterType : 'baseInfo'
            };
        },
        methods : {
            /**
             * 激活当前点击的button
             * @param value
             */
            filterTable (value) {
                this.filterType = value;
            }
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .personal-center{
        @include block_outline();
        background: $color_fff;
        padding: 0 30px;
        @include padding_place();

        .tab-list{
            @include block_outline($height : 60px);
            padding: 14px 0;
        }
    }
</style>

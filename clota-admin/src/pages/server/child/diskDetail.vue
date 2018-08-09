<!--磁盘使用情况-->

<template>
    <div class="disk-detail">
        <bread-crumb-head
            :locale-router="$t('diskSpace',{msg : 'server-01'})"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <div class="time-chose">
                <DatePicker type="daterange"
                            placement="bottom-end"
                            style="width: 280px"
                            v-model="logDate">
                </DatePicker>
            </div>
            <area-com y-yxis-name="磁盘已用空间"  key="disk">
            </area-com>
        </div>
    </div>

</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import areaCom from './components/area';
    export default {
        components : {
            areaCom,
            breadCrumbHead
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('serverList'),
                        router: {
                            name: 'server'
                        }
                    },
                    {
                        name: this.$t('deviceInfo'),
                        router: {
                            name: 'serverDetail'
                        }
                    }
                ],
                logDate : [new Date(),new Date()]
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .disk-detail{
        @include block_outline();
        background: $color_f4f6f9;
        overflow: auto;

        .content{
            min-height: calc(100% - 74px);
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 0 60px;
            overflow: auto;

            .time-chose{
                @include block_outline($height : 60px);
                padding: 14px 0;

                .name {
                    float: left;
                    font-size: $font_size_14px;
                    color: $color_333;
                    @include block_outline(auto,32px);
                    line-height: 32px;
                }

                /deep/ .ivu-date-picker{
                    float: right;
                }
            }

            /deep/ .echarts{
                @include block_outline(100%,400px);
            }
        }
    }
</style>

<!--磁盘使用情况-->

<template>
    <div class="disk-detail">
        <bread-crumb-head
            :locale-router="$t('diskSpace',{msg : serverName})"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <div class="time-chose">
                <DatePicker type="daterange"
                            placement="bottom-end"
                            style="width: 280px"
                            v-model="logDate" 
                            @on-change="queryMoreDiskSpaceDate">
                </DatePicker>
            </div>
            <!-- 磁盘空间面积图 -->
            <area-com y-yxis-name="磁盘已用空间"  
                      :disk-info="diskInfo"
                      v-if="diskInfo.length > 0"
                      key="disk">
            </area-com>
        </div>
        <no-data v-if="diskInfo.length < 1">
        </no-data>
    </div>

</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import areaCom from './components/area';
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    export default {
        components : {
            areaCom,
            breadCrumbHead,
            noData
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
                //查询日期
                logDate : [],
                //服务器ip
                serverIp : '',
                //服务器名称
                serverName : '',
                //磁盘数据
                diskInfo : []
            }
        },
        methods: {
            /**
             * 查询磁盘空间信息
             */
            queryMoreDiskSpaceDate () {
                ajax.post('queryMoreDiskSpaceDate',{
                    ip : this.serverIp,
                    startTime : this.logDate[0].format('yyyy-MM-dd'),
                    endTime : this.logDate[1].format('yyyy-MM-dd'),
                    pageSize : 99999,
                    page : 1
                }).then(res => {
                    if(res.status === 200){
                        if(res.data.list && res.data.list.length > 0){
                            this.diskInfo = res.data.list.sort((a,b) => a.ctime.toDate() - b.ctime.toDate());
                        }else{
                            this.diskInfo = [];
                        }
                    }else{
                        this.diskInfo = [];
                    }
                }).catch(err => {
                    this.diskInfo = [];
                });
            },
            /**
             * 获取路由数据
             */
            getParams(params) {
                if(params.ip){
                    this.serverIp = params.ip;
                    this.logDate = [params.startTime,params.endTime];
                    this.serverName = params.serverName;
                    this.queryMoreDiskSpaceDate();
                }
            }
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        }
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

        /deep/ .component-noData-tip{
            @include block_outline(120px,120px);
            margin: auto;
        }
    }
</style>

<!--
    会员消费数据报表
    作者：杨泽涛
-->
<template>
    <div class="consume-report">
        <!-- 数据表 -->
        <datasheet v-if="type === 'datasheet'" :scenicList="scenicList"></datasheet>

        <!-- 趋势图 -->
        <tendency v-else :scenicList="scenicList"></tendency>
    </div>
</template>

<script>
    import datasheet from './child/datasheet';
    import tendency from './child/tendency';
    import ajax from '@/api/index';
    export default {
        props : {
            type : {
                type : String,
                default : ''
            }
        },
        components : {
            datasheet,
            tendency,
        },
        data () {
            return {
                //景区下拉列表数据
                scenicList : [
                    {
                        value : 'all',
                        label : 'allScenic'
                    }
                ]
            };
        },
        methods : {
            /**
             * 获取下拉列表数据
             */
            getSelectList () {
                ajax.post('queryScenicByOrgId').then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            this.scenicList = this.scenicList.concat(res.data.map(item => {
                                return {
                                    value : item.id,
                                    label : item.orgName
                                };
                            }));
                        } else {
                            this.scenicList = [
                                {
                                    value : '',
                                    label : 'allScenic'
                                }
                            ];
                        }
                    } else {
                        this.scenicList = [
                            {
                                value : '',
                                label : 'allScenic'
                            }
                        ];
                    }
                });
            },
        },
        created () {
            this.getSelectList();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .consume-report {
        width: 100%;
        height: calc(100% - 59px);
    }
</style>

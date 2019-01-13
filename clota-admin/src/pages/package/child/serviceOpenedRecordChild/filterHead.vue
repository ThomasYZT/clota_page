<!--筛选表头-->


<template>
    <div class="filter-head" >

        <Form :model="formData" label-position="right" :label-width="80" >
            <i-row>
                <i-col span="8">
                    <!--租户-->
                    <FormItem :label="$t('lessee')">
                        <Select v-model="formData.orgId"
                                ref="lesseeref"
                                :placeholder="$t('selectField',{ msg : '' })"
                                :transfer="true"
                                filterable
                                @on-change="search">
                            <Option v-for="item in lesseeList"
                                    :value="item.id"
                                    class="text-overflow-tip"
                                    v-w-title="item.orgName"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--服务-->
                    <FormItem :label="$t('serviceName')">
                        <Select v-model="formData.serviceId"
                                :transfer="true"
                                ref="serviceRef"
                                filterable
                                @on-change="search">
                            <Option v-for="item in servicesList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.serviceName }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--操作时间-->
                    <FormItem :label="$t('operateTime')">
                        <DatePicker type="daterange"
                                    :placeholder="$t('selectField',{ msg : '' })"
                                    :editable="false"
                                    v-model.trim="formData.operateTime"
                                    :transfer="true"
                                    style="width: 100%;"
                                    @on-change="search">
                        </DatePicker>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="8">
                    <!--类别-->
                    <FormItem label="类别">
                        <Select v-model="formData.opId"
                                :transfer="true"
                                @on-change="search">
                            <Option v-for="item in serviceOperateType"
                                    :value="item.value"
                                    :key="item.value">
                                {{ $t(item.label) }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="16" style="text-align: right">
                    <div class="btn-area">
                        <Button type="primary"
                                class="ivu-btn-90px"
                                @click="search">搜索</Button>
                        <Button type="ghost"
                                class="ivu-btn-90px"
                                @click="reset">重置</Button>
                    </div>
                </i-col>
            </i-row>
        </Form>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    export default {
        props : {
        },
        data () {
            return {
                //表单数据
                formData : {
                    //租户id
                    orgId : '',
                    //服务id
                    serviceId : '',
                    //操作时间
                    operateTime : [],
                    //类别
                    opId : ''
                },
                //操作类型
                serviceOperateType : [],
                //租户列表
                lesseeList : [],
                //服务列表
                servicesList : []
            };
        },
        methods : {
            /**
             * 获取服务列表
             */
            queryServiceList () {
                ajax.post('queryServiceList',{
                    serviceStatus : 'normal'
                }).then(res => {
                    if (res.status === 200) {
                        this.servicesList = res.data ? res.data : [];
                    } else {
                        this.servicesList = [];
                    }
                }).catch(() => {
                    this.servicesList = [];
                });
            },
            /**
             * 根据筛选条件查询数据
             */
            search () {
                this.$emit('search-data',this.formData);
            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.$refs.lesseeref.setQuery(null);
                this.$refs.serviceRef.setQuery(null);
                this.formData.serviceId = '';
                this.formData.orgId = '';
                this.formData.opId = '';
                this.formData.operateTime = [];
                this.search();
            },
            /**
             * 获取所有租户信息
             */
            listServiceProvider () {
                ajax.post('listServiceProvider').then(res => {
                    if (res.status === 200) {
                        this.lesseeList = res.data ? res.data : [];
                    } else {
                        this.lesseeList = [];
                    }
                }).catch(err => {
                    this.lesseeList = [];
                });
            },
            /**
             * 获取操作类型下拉列表接口
             */
            listServiceOpTypes () {
                ajax.post('listServiceOpTypes').then(res => {
                    if (res.status === 200) {
                        this.serviceOperateType = res.data ? res.data.map((item) => {
                            return {
                                label : item.opType,
                                value : item.id,
                            }
                        }) : [];
                    } else {
                        this.serviceOperateType = [];
                    }
                }).catch(() => {
                    this.serviceOperateType = [];
                })
            }
        },
        created () {
            this.queryServiceList();
            this.listServiceOpTypes();
            this.listServiceProvider();
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .filter-head{
        position: relative;
        @include block_outline($height : auto);
        padding: 15px 34px 10px 0;
        overflow: hidden;
        transition: all 0.5s;

        .form-wrap{
            @include block_outline($height : auto);
            overflow: hidden;

            & .height-54px{
                height: 60px;
                transition: all 0.5s;
            }
        }

        /deep/ .ivu-form-item{
            margin-bottom: 10px;
        }

        /deep/ .ivu-form{
            float: left;
            @include block_outline(100%,auto);
        }

        .btn-area{
            margin-top: 2px;
        }
    }
</style>

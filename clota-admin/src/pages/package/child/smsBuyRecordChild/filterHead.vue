<!--筛选表头-->


<template>
    <div class="filter-head" >

        <Form :model="formData" label-position="right" :label-width="80" >
            <i-row>
                <i-col span="8">
                    <!--租户列表-->
                    <FormItem :label="$t('lessee')">
                        <Select v-model="formData.orgId" :transfer="true">
                            <Option v-for="item in lesseeList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.orgName }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--套餐-->
                    <FormItem :label="$t('package')">
                        <Select v-model="formData.smsPackageId" :transfer="true">
                            <Option v-for="item in packageList"
                                    :value="item.id"
                                    :key="item.id">
                                {{ item.packageName }}
                            </Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <!--购买时间-->
                    <FormItem :label="$t('buyTime')">
                        <DatePicker type="daterange"
                                    :editable="false"
                                    v-model.trim="formData.purchaseTime"
                                    :transfer="true"
                                    style="width: 100%;">
                        </DatePicker>
                    </FormItem>
                </i-col>
            </i-row>
            <i-row>
                <i-col span="24" style="text-align: right">
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
    import{serviceOperateType} from '@/assets/js/constVariable.js';
    import ajax from '@/api/index.js';
    export default {
        props : {
        },
        data() {
            return {
                //表单数据
                formData : {
                    // 选择的租户
                    orgId : '',
                    //套餐id
                    smsPackageId : '',
                    //购买时间
                    purchaseTime : []
                },
                //操作类型
                serviceOperateType : serviceOperateType,
                //租户列表
                lesseeList : [],
                //套餐列表
                packageList : []
            }
        },
        methods: {

            /**
             * 查询短信套餐列表
             */
            queryPackageList () {
                ajax.post('smsPackageList',{
                    page : 1,
                    pageSize : 9999
                }).then(res => {
                    if(res.status === 200){
                        this.packageList = res.data.list ? res.data.list : [];
                    }else{
                        this.packageList = [];
                    }
                })
            },
            /**
             * 搜索数据
             */
            search () {
                this.$emit('search-data',this.formData);
            },
            /**
             * 重置筛选条件
             */
            reset () {
                this.formData.orgId = '';
                this.formData.smsPackageId = '';
                this.formData.purchaseTime = [];
                this.search();
            },
            /**
             * 获取所有租户信息
             */
            listServiceProvider () {
                ajax.post('listServiceProvider').then(res => {
                    if(res.status === 200){
                        this.lesseeList = res.data.list ? res.data.list : [];
                    }else{
                        this.lesseeList = [];
                    }
                }).catch(err => {
                    this.lesseeList = [];
                });
            }
        },
        created () {
            this.queryPackageList();
            this.listServiceProvider();
        }
    }
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

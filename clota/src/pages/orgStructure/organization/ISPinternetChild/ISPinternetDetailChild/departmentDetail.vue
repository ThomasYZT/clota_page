<!--部门详情-->

<template>
    <div class="department-deail">
        <div class="com-name">
            <template v-if="type === 'edit'">
                <Form ref="formValidate"
                      :rules="ruleValidate"
                      :model="formDataCopy"
                      :label-width="0" inline>
                    <FormItem prop="orgName">
                        <Input v-model="formDataCopy.orgName" style="width : 280px"/>
                    </FormItem>
                    <FormItem>
                        <i-switch v-model="formDataCopy.isStart"></i-switch>
                        <span :class="{'started' :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                            {{$t(formDataCopy.isStart ? 'commissioned' : 'hasNotStart')}}
                        </span>
                    </FormItem>
                </Form>
            </template>
            <template v-if="type === 'watch'">
                <span class="name"
                      v-if="type === 'watch'"
                      v-w-title="formData.orgName">
                    {{formData.orgName | contentFilter}}
                </span>
                <span class="edit"
                      v-if="'modifyNode' in permissionInfo"
                      @click="edit">
                    <span class="iconfont icon-edit"></span>
                    {{$t('modify')}}
                </span>
                <span :class="{'started' :formData.status === 'open' ,'not-started' : formData.status !== 'open'}">
                    {{$t(formData.status === 'open' ? 'hasStart' : 'hasNotStart')}}
                </span>
            </template>
        </div>
        <ul class="department-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">{{$t('departmentID')}}：</span>
                    <span class="info-val" v-w-title="formData.id">{{formData.id | contentFilter}}</span>
                </div>
            </li>
            <li class="btn-area" v-if="type === 'edit'">
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="saveEdit">{{$t('save')}}</Button>
                <Button type="ghost"
                        class="ivu-btn-90px"
                        @click="cancel">{{$t('cancel')}}</Button>
            </li>
        </ul>
        <!--员工-->
        <employee-table
            :isDefaultPackUp="true"
            :is-department="true"
            :search-params="{id : activeNode.id}"
            type="department">
        </employee-table>
    </div>
</template>

<script>
    import employeeTable from './components/employeeTable';
    import defaultsDeep from 'lodash/defaultsDeep';
    import ajax from '@/api/index.js';
    import { mapGetters } from 'vuex';
    export default {
        props : {
            //节点信息
            'activeNode' : {
                type : Object,
                default () {
                    return {};
                }
            },
        },
        components : {
            employeeTable
        },
        data () {
            return {
                //表单数据
                formDataCopy : {},
                //表单数据
                formData : {},
                type : 'watch',
                //校验规则
                ruleValidate : {
                    orgName : [
                        { required : true,message : this.$t('inputField',{ field : this.$t('departName') }),trigger : 'blur' },
                        { max : 100,message : this.$t('errorMaxLength',{ field : this.$t('departName'),length : 100 }) }
                    ]
                }
            };
        },
        methods : {
            /**
             * 开始编辑
             */
            edit () {
                this.type = 'edit';
                this.formDataCopy = defaultsDeep({
                    isStart : this.formData.status === 'open'
                } , this.formData);
            },
            /**
             * 取消编辑
             */
            cancel () {
                this.type = 'watch';
            },
            /**
             * 保存编辑的信息
             */
            saveEdit () {
                this.type = 'watch';
                ajax.post('modifyOrgInfo',{
                    id : this.formDataCopy.id,
                    status : this.formDataCopy.isStart ? 'open' : 'close',
                    orgName : this.formDataCopy.orgName,
                    nodeType : this.formDataCopy.nodeType,
                    parentEconomicId : this.formDataCopy.parentEconomicId,
                    parentManageId : this.formDataCopy.parentManageId,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                        //修改了节点的名字，需要刷新左侧的组织树
                        if (this.formDataCopy.orgName !== this.formData.orgName) {
                            this.freshOrg();
                        } else {
                            this.$emit('fresh-org',this.activeNode);
                            this.getDepDetail();
                        }
                        this.$store.dispatch('freshOrgs');
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                    }
                });
            },
            /**
             * 获取部门详情
             */
            getDepDetail () {
                ajax.post('getOrgInfo',{
                    orgId : this.activeNode.id
                }).then(res => {
                    if (res.success) {
                        this.formData = res.data ? res.data.basicInfo : {};
                    } else {
                        this.formData = {};
                    }
                });
            },
            /**
             * 更新左侧的组织树
             */
            freshOrg () {
                this.$emit('fresh-org',this.activeNode);
            },
        },
        watch : {
            //节点更换，重新请求节点数据
            activeNode : {
                handler (newVal,oldVal) {
                    this.getDepDetail();
                },
                deep : true,
                immediate : true
            }
        },
        computed : {
            ...mapGetters({
                permissionInfo : 'permissionInfo'
            })
        }
    };
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .department-deail{
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .com-name {
            @include overflow_tip(100%,65px);
            padding: 14px 0 0 0;

            /deep/ .ivu-switch{
                margin-left: 20px;
            }

            /deep/ .ivu-form{
                width: 360px;
                display: inline-block;
                vertical-align: middle;
            }

            .iconfont{
                vertical-align: middle;
            }

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: auto, $height: 100%);
                max-width: calc(100% - 137px);
                float: left;
            }

            .started,
            .not-started,
            .edit {
                @include block_outline(70px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .not-started{
                padding-left: 10px;
                color: $color_yellow;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
                cursor: pointer;
            }
        }

        .department-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .btn-area{
                @include block_outline($height : 72px);
                text-align: center;
                padding: 20px 0;

                /deep/ .ivu-btn-primary{
                    margin-right: 8px;
                }
            }

            .list {
                display: flex;
                align-items: center;
                @include block_outline($height: 30px);
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(100%, auto);
                }

                .info-list1{
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }
            }
        }


    }
</style>

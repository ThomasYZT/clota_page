<!--新增角色-->

<template>
    <div class="add-role">
        <bread-crumb-head
            :locale-router="localeRouter"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <Form :model="formData" ref="formValidate" :rules="ruleValidate">
                <i-row>
                    <i-col span="10">
                        <FormItem label="公司/景区名称" :label-width="100">
                            <Input :value="manageOrgs.orgName"
                                   disabled
                                   style="width: 280px;"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10">
                        <FormItem label="角色名称" :label-width="100" prop="roleName">
                            <Input v-model="formData.roleName" style="width: 280px;" />
                        </FormItem>
                    </i-col>
                    <i-col span="4" style="text-align: right" v-if="type === 'edit'">
                        <Button type="primary" @click="copyRole">复制角色</Button>
                    </i-col>
                </i-row>
            </Form>
            <!--景区经营权限设置-->
            <manage-role-set ref="mangeRole" :default-chosed-node-init="manageDefaultChosed">
            </manage-role-set>
            <div class="gap"></div>
            <!--财务权限设置-->
            <finace-role-set ref="finaceRole" :default-chosed-node-init="economicDefaultChosed">
            </finace-role-set>
            <!--员工权限设置-->
            <employee-role-list
                :role-id="roleId"
                ref="employee"
                :employee-list="employeeList"
                @updateSelected="setSelectedEmployee">
            </employee-role-list>
        </div>
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-108px" @click="save">保存</Button>
            <Button type="ghost" class="ivu-btn-108px" @click="cancel">取消</Button>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import manageRoleSet from './manageRoleSet';
    import finaceRoleSet from './finaceRoleSet';
    import employeeRoleList from './employeeRoleList';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    export default {
        mixins : [lifeCycleMixins],
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: 'rolePermission',
                        router: {
                            name: 'rolePermission'
                        }
                    }
                ],
                //角色表头数据
                formData : {
                    //角色名称
                    roleName : ''
                },
                //选择的员工
                selectedEmployees : [],
                //选择的权限
                privaliges : {
                    manage : [],
                    economic : []
                },
                ruleValidate : {
                    //角色名称校验规则
                    roleName : [
                        {required : true,message : this.$t('inputField',{field : '角色名称'}),trigger : 'blur'},
                        {max : 50,message : this.$t('errorMaxLength',{field : '角色名称',length  : 50}),trigger : 'blur'}
                    ],
                },
                //当前查看角色的id
                roleId : '',
                //当前查看类型
                type : 'add',
                //角色已经包含的员工列表
                employeeList : [],
                //经营权限默认选中的节点
                manageDefaultChosed : {},
                //财务权限默认选中节点
                economicDefaultChosed : {}
            }
        },
        components : {
            breadCrumbHead,
            manageRoleSet,
            finaceRoleSet,
            employeeRoleList
        },
        methods: {
            /**
             * 更新已选择的员工
             * @param data
             */
            setSelectedEmployee (data) {
                this.selectedEmployees = data;
            },
            /**
             * 保存权限
             */
            save () {
                let privileges = [...this.$refs.mangeRole.getMangePrivalige(),...this.$refs.finaceRole.getMangePrivalige()];
                if(privileges.length <= 0){
                    this.$Message.warning('请先添加菜单权限');
                }else{
                    this.$refs.formValidate.validate(valid => {
                        if(valid){
                            if(this.roleId){
                                this.modifyRole(privileges);
                            }else{
                                this.addRole(privileges);
                            }
                        }
                    });
                }
            },
            /**
             * 新增角色
             * @param privileges
             */
            addRole (privileges) {
                ajax.post('addRole',{
                    privileges : JSON.stringify(privileges),
                    roleName : this.formData.roleName,
                    accountIds : this.selectedEmployees.map(item => item.id)
                }).then(res => {
                    if(res.success){
                        this.$Message.success('新增成功');
                        this.$router.push({
                            name : 'rolePermission'
                        });
                    }else{
                        this.$Message.error(res.message || '新增失败');
                    }
                })
            },
            /**
             * 查询角色详情
             */
            queryRoleDetail () {
                ajax.post('findById',{
                    id : this.roleId
                }).then(res => {
                    if(res.success){
                        this.employeeList = res.data ? res.data.employeeVos : [];
                        this.formData.roleName = res.data ? res.data.role.roleName : '';
                        this.getMangePrivalige(res.data.privModelList);
                    }else{
                        this.employeeList = [];
                        this.formData.roleName = '';
                    }
                });
            },
            /**
             * 获取路由详情
             * @param params
             */
            getParams (params) {
                if(params.type){
                    this.type = params.type;
                    if(this.type === 'edit'){
                        this.roleId = params.id;
                        this.queryRoleDetail();
                    }
                }else{
                    this.type = 'add';
                    this.roleId = '';
                }
            },
            /**
             * 获取景区经营权限节点列表
             * @param data
             */
            getMangePrivalige (data) {
                this.manageDefaultChosed = {};
                this.economicDefaultChosed = {};
                for(let i = 0,j = data.length;i < j;i++){
                    if(data[i].orgType === 'manage'){
                        if(!this.manageDefaultChosed[data[i].privOrg]){
                            this.manageDefaultChosed[data[i].privOrg] = [{
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                            }];
                        }else{
                            this.manageDefaultChosed[data[i].privOrg].push({
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                            });
                        }
                    }else if(data[i].orgType === 'economic'){
                        if(!this.economicDefaultChosed[data[i].privOrg]){
                            this.economicDefaultChosed[data[i].privOrg] = [{
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                            }];
                        }else{
                            this.economicDefaultChosed[data[i].privOrg].push({
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                            });
                        }
                    }
                }
            },
            /**
             * 修改权限
             * @param privileges
             */
            modifyRole (privileges) {
                ajax.post('updateRole',{
                    roleId : this.roleId,
                    privileges : JSON.stringify(privileges),
                    roleName : this.formData.roleName,
                    accountIds : this.selectedEmployees.map(item => item.id)
                }).then(res => {
                    if(res.success){
                        this.$Message.success('修改成功');
                        this.$router.push({
                            name : 'rolePermission'
                        });
                    }else{
                        this.$Message.error(res.message || '修改失败');
                    }
                })
            },
            /**
             * 复制角色
             */
            copyRole () {
                this.type = 'copy';
                this.roleId = '';
                this.formData.roleName = '';
                this.$refs.employee.resetEmployeeData();
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$router.push({
                    name : 'rolePermission'
                });
            }
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
            //面包屑上当前菜单名
            localeRouter () {
                if(this.type === 'add'){
                    return 'addRole';
                }else if(this.type === 'edit'){
                    return 'roleDetail';
                }else if(this.type === 'copy'){
                    return 'copyRole'
                }else{
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .add-role{
        @include block_outline();
        background: $color_fff;
        overflow: auto;

        .content{
            min-height: calc(100% - 50px);
            padding: 0 40px;
            @include padding_place($height : 76px);

            /deep/ .ivu-form{
                @include block_outline($height : 72px);
                padding-top: 20px;

                .ivu-form-item-label{
                    padding-left: 0;
                }
            }

            .gap{
                @include block_outline($height : 7px);
            }
        }

        .btn-area{
            position: absolute;
            z-index: 99;
            bottom: 0;
            @include block_outline($height : 56px);
            background: $color_fff;
            box-shadow: 0 -5px 3px 0 rgba(0,0,0,0.03);
            padding: 12px 0;
            text-align: center;

            .ivu-btn-108px{
                margin: 0 4px;
            }
        }
    }
</style>

<!--新增角色-->

<template>
    <div class="add-role">
        <bread-crumb-head
            :locale-router="'newCardCoupon'"
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
                </i-row>
            </Form>
            <!--景区经营权限设置-->
            <manage-role-set ref="mangeRole">
            </manage-role-set>
            <div class="gap"></div>
            <!--财务权限设置-->
            <finace-role-set ref="finaceRole">
            </finace-role-set>
            <!--员工权限设置-->
            <employee-role-list
                @updateSelected="setSelectedEmployee">
            </employee-role-list>
        </div>
        <div class="btn-area">
            <Button type="primary" class="ivu-btn-108px" @click="save">保存</Button>
            <Button type="ghost" class="ivu-btn-108px">取消</Button>
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
    export default {
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: 'card',
                        router: {
                            name: 'card'
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
                }
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
                if(privileges.length < 0){
                    this.$Message.warning('请先添加菜单权限');
                }else{
                    this.$refs.formValidate.validate(valid => {
                        if(valid){
                            this.addRole(privileges);
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
                        this.$Message.error('新增失败');
                    }
                })
            }
        },
        computed : {
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            })
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

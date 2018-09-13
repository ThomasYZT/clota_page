<!--新增角色-->

<template>
    <div class="add-role">
        <bread-crumb-head
            :locale-router="'newCardCoupon'"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="content">
            <Form :model="formData" >
                <i-row>
                    <i-col span="10">
                        <FormItem label="公司/景区名称" :label-width="100">
                            <Input v-model="formData.input" style="width: 280px;"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10">
                        <FormItem label="角色名称" :label-width="100">
                            <Input v-model="formData.input" style="width: 280px;" />
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <!--景区经营权限设置-->
            <manage-role-set>
            </manage-role-set>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import manageRoleSet from './manageRoleSet';
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

                }
            }
        },
        components : {
            breadCrumbHead,
            manageRoleSet
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .add-role{
        @include block_outline();
        background: $color_fff;

        .content{
            min-height: calc(100% - 50px);
            padding: 0 40px;

            /deep/ .ivu-form{
                @include block_outline($height : 72px);
                padding-top: 20px;

                .ivu-form-item-label{
                    padding-left: 0;
                }
            }
        }
    }
</style>

<!--修改合作伙伴信息-->

<template>
    <div class="change-partners">
        <!--面包屑导航-->
        <bread-crumb-head
            locale-router="modify"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>

        <div class="add-less-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="120">
                <i-row>
                    <i-col span="11">
                        <!--租户公司名称-->
                        <FormItem :label="$t('name')" v-if="personalChannel" >
                            {{formData.name | contentFilter}}
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--身份证号-->
                        <FormItem :label="$t('身份证号')" v-if="personalChannel" >
                            {{formData.certificateNumber | contentFilter}}
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--管理账号-->
                        <FormItem :label="$t('管理账号')">
                            {{formData.managerAccount | contentFilter}}
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--联系方式-->
                        <FormItem :label="$t('phone')">
                            <Input v-model.trim="formData.telephone" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="11">
                        <!--电子邮箱-->
                        <FormItem :label="$t('email')" prop="mail">
                            <Input v-model.trim="formData.email" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <!--地点-->
                        <FormItem :label="$t('location')">
                            <city-plugin @select="formData.place = $event" style="width: 280px;">
                            </city-plugin>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <!--详细地址-->
                    <i-col span="11">
                        <FormItem :label="$t('address')" prop="address">
                            <Input v-model.trim="formData.address" style="width: 280px"/>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <!--个人说明-->
                    <i-col span="24">
                        <FormItem :label="$t('个人说明')" v-if="personalChannel" >
                            <Input v-model.trim="formData.description" type="textarea"/>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
            <div class="footer">
                <Button @click="save"
                        type="primary"
                        class="ivu-btn-min btn-margin"
                        :loading="addLoading">{{$t('confirmEdit')}}</Button>
                <Button  @click="cancel" class="ivu-btn-min">{{$t('cancel')}}</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';

    export default {
        mixins : [lifeCycleMixins],
        data () {
            return {
                //表单数据
                formData : {
                    name : '',
                    certificateNumber : '',
                    managerAccount : '',
                    telephone : '',
                    email : '',
                    description : '',
                    address : '',
                },
                //表单校验规则
                ruleValidate : {

                },
                //是否在提交中
                addLoading : false
            };
        },
        components : {
            breadCrumbHead,
            cityPlugin
        },
        methods : {
            /**
             * 获取路由信息
             * @param{Object} params 路由信息
             */
            getParams (params) {
                if (params && Object.keys(params).length > 0) {
                    if (this.$route.name === 'cooperaChannelPerDetailModify') {
                        this.formData.name = params.formData.orgName;
                        this.formData.certificateNumber = params.formData.certificateNumber;
                        this.formData.managerAccount = params.formData.managerAccount;
                        this.formData.telephone = params.formData.telephone;
                        this.formData.email = params.formData.email;
                        this.formData.description = params.formData.description;
                        this.formData.address = params.formData.address;
                        // this.formData.idNum = params.formData.info[0][];
                    }
                }
            },
            /**
             * 取消编辑合作伙伴详情
             */
            cancel () {
                this.$router.push({
                    name : this.personalChannel ? 'cooperaChannelPer' : 'cooperaChannelOrg'
                });
            },
            /**
             * 保存编辑的信息
             */
            save () {

            }
        },
        computed : {
            //面包屑路由信息
            beforeRouterList () {
                if (this.$route.name === 'cooperaChannelPerDetailModify') { //个人合作伙伴
                    return [
                        {
                            name : 'cooperaChannelPer',
                            router : {
                                name : 'cooperaChannelPer'
                            }
                        },
                        {
                            name : 'lesseeDetail',
                            router : {
                                name : 'cooperaChannelPerDetail'
                            }
                        }
                    ];
                } else if (this.$route.name === 'addServer') { //机构合作伙伴
                    return [
                        {
                            name : this.$t('serverList'),
                            router : {
                                name : 'server'
                            }
                        }
                    ];
                }
                return [];
            },
            //个人合作伙伴
            personalChannel () {
                return this.$route.name === 'cooperaChannelPerDetailModify';
            },
            //机构合作伙伴
            orgChannel () {
                return this.$route.name === 'cooperaChannelPerDetailModify';
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .change-partners{
        @include block_outline();
        overflow: auto;

        .add-less-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;
            }
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .btn-margin {
                margin-right: 18px;
            }
        }
    }
</style>

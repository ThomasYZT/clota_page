<!--新增/编辑计量单位-->

<template>
    <div class="add-unit">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addUnit' : 'editUnit')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-unit-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <Row>
                    <Col span="11">
                        <FormItem :label="$t('nameG')" prop="name">
                            <Input v-model="formData.name" style="width: 280px"/>
                        </FormItem>
                    </Col>
                    <Col span="11">
                        <FormItem :label="$t('isUsing')" prop="isUsing">
                            <Checkbox v-model="formData.isUsing">启用</Checkbox>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22">
                        <FormItem :label="$t('remark')">
                            <Input v-model="formData.remark"
                                   type="textarea"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div class="footer">
                <Button type="primary"
                        @click="save"
                        class="ivu-btn-min"
                        :loading="addLoading">
                    {{$t(type === 'add' ? 'addNew' : 'confirmEdit')}}
                </Button>
                <Button @click="cancel"
                        class="ivu-btn-min">
                    {{$t('cancel')}}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbHead from '@/components/breadCrumbHead/index.vue';
    import {validator} from 'klwk-ui';

    export default {
        components: {
            breadCrumbHead,
        },
        data() {
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('measureUnit'),
                        router: {
                            name: 'measureUnit'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //单位 名字
                    name: '',
                    //单位是否启用
                    isUsing: '',
                    //备注
                    remark: '',
                },
                //表单校验规则
                ruleValidate: {
                    name : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('nameG')}), trigger: 'blur'},
                    ],
                },
                //是否正在添加中
                addLoading: false,
                //账号操作类型
                type : ''
            }
        },
        methods: {
            /**
             * 保存新增单位数据
             */
            save() {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    this.addLoading = false;
                });
            },
            /**
             * 取消新增
             */
            cancel() {
                this.$router.push({
                    name: 'measureUnit'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if(params.type) {
                    this.type = params.type;
                }else{
                    this.$router.push({
                        name : 'measureUnit'
                    });
                }
            }
        },
        beforeRouteEnter(to,fromm,next){
            next(vm => {
                vm.getParams(to.params);
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .add-unit {
        @include block_outline();
        background: $color_f4f6f9;

        .add-unit-info {
            @include block_outline($height: unquote('calc(100% - 74px)'));
            margin-top: 20px;
            background: $color_fff;
            @include padding_place();
            padding: 26px 60px;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline(924px, auto);
                margin: 0 auto;

                textarea.ivu-input{
                    height: 70px;
                }
            }
        }

        .footer {
            text-align: center;
            margin-top: 40px;

            /deep/ .ivu-btn-primary {
                margin-right: 18px;
            }
        }
    }
</style>

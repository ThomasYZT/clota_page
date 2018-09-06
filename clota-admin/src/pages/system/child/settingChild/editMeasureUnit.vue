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
                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('nameG')" prop="name">
                            <Input v-model.trim="formData.name"
                                   :placeholder="$t('inputPlaceholder')"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem :label="$t('isUsing')" prop="status">
                            <Checkbox v-model="formData.status">{{$t('startUsing')}}</Checkbox>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="22">
                        <FormItem :label="$t('remark')">
                            <Input v-model.trim="formData.remarks"
                                   :placeholder="$t('inputPlaceholder')"
                                   type="textarea"/>
                        </FormItem>
                    </i-col>
                </i-row>
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
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index';

    export default {
        mixins : [lifeCycleMixins],
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
                    status: '',
                    //备注
                    remarks: '',
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
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addLoading = true;
                        let params = {
                            name: this.formData.name,
                            status: this.formData.status ? 'normal' : 'invalid',
                            remarks: this.formData.remarks,
                        };
                        if (this.type === 'add') {
                            this.addUnit(params);
                        }else {
                            params.id = this.formData.id;
                            this.updateUnit(params);
                        }
                    }
                });
            },
            /**
             * 新增单位
             */
            addUnit( params ) {
                ajax.post('addUnit', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({ name: 'measureUnit'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 修改单位
             * @param params
             */
            updateUnit( params ) {
                ajax.post('updateUnit', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name: 'measureUnit'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
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
                    if(params.info){
                        this.formData.id = params.info.id;
                        this.formData.name = params.info.name;
                        this.formData.status = params.info.status === 'normal' ? true : false;
                        this.formData.remarks =  params.info.remarks;
                    }
                }else{
                    this.$router.push({
                        name : 'measureUnit'
                    });
                }
            },

        },
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


                /deep/ .ivu-input-wrapper{
                    width: 280px;
                }

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

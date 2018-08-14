<!--新增/编辑节假日信息-->

<template>
    <div class="add-type">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addHoliday' : 'editHoliday')"
            :before-router-list="beforeRouterList">
        </bread-crumb-head>
        <div class="add-type-info">
            <Form ref="formValidate"
                  :model="formData"
                  label-position="right"
                  :rules="ruleValidate"
                  :label-width="100">
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('holidayName')" prop="name">
                        <Input v-model="formData.name" style="width: 280px"/>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('isUsing')">
                        <Checkbox v-model="formData.isUsing">启用</Checkbox>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem :label="$t('holidayTime')" prop="time">
                            <DatePicker
                                v-model="formData.time"
                                type="daterange"
                                placement="bottom-end"
                                placeholder="请选择假期时间"
                                style="width: 280px;" >
                            </DatePicker>
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
            //校验假期时间
            const validateTime = (rule,value,callback) => {
              if(value && value.length === 2 && value[0] && value[1]){
                  callback();
              }else{
                  callback(this.$t('validateError.pleaseSelect', {'msg': this.$t('holidayTime')}))
              }
            };
            return {
                //上级路由列表
                beforeRouterList: [
                    {
                        name: this.$t('holidayInfo'),
                        router: {
                            name: 'holiday'
                        }
                    }
                ],
                //表单数据
                formData: {
                    //单位 名字
                    name: '',
                    //单位是否启用
                    isUsing: '',
                    //假期时间
                    time: [new Date(),new Date()],
                },
                //表单校验规则
                ruleValidate: {
                    name : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('holidayName')}), trigger: 'blur'},
                    ],
                    time : [
                        {required: true, validator : validateTime, trigger: 'change'},
                    ]
                },
                //是否正在添加中
                addLoading: false,
                //操作类型
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
                    name: 'holiday'
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
                        name : 'holiday'
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

    .add-type {
        @include block_outline();
        background: $color_f4f6f9;

        .add-type-info {
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

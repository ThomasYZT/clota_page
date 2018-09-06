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
                <i-row>
                    <i-col span="11">
                        <FormItem :label="$t('holidayName')" prop="holidayName">
                            <Input v-model="formData.holidayName"/>
                        </FormItem>
                    </i-col>
                    <i-col span="11">
                        <FormItem :label="$t('isUsing')" prop="status">
                            <Checkbox v-model="formData.status">{{$t('startUsing')}}</Checkbox>
                        </FormItem>
                    </i-col>
                </i-row>
                <row>
                    <i-col span="11">
                        <FormItem :label="$t('holidayTime')" prop="time">
                            <DatePicker
                                v-model="formData.time"
                                type="daterange"
                                placement="bottom-end"
                                :placeholder="$t('validateError.pleaseSelect', {msg: $t('holidayTime')})">
                            </DatePicker>
                        </FormItem>
                    </i-col>
                </row>
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
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index';

    export default {
        mixins : [lifeCycleMixins],
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
                    holidayName: '',
                    //单位是否启用
                    status: false,
                    //假期时间
                    time: [new Date(),new Date()],
                },
                //表单校验规则
                ruleValidate: {
                    holidayName : [
                        {required: true, message : this.$t('validateError.pleaseInput', {'msg': this.$t('holidayName')}), trigger: 'blur'},
                        { type: 'string', max: 15, message: this.$t('errorMaxLength', {field: this.$t('holidayName'), length: 15}), trigger: 'blur' },
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
             * 保存节假日
             */
            save() {
                this.$refs.formValidate.validate(valid => {
                    if(valid){
                        this.addLoading = true;
                        let params = {
                            holidayName: this.formData.holidayName,
                            status: this.formData.status ? 'normal' : 'invalid',
                            holidayStartTime: this.formData.time[0].format('yyyy-MM-dd hh:mm:ss'),
                            holidayEndTime: this.formData.time[1].format('yyyy-MM-dd hh:mm:ss'),
                        };
                        if (this.type === 'add') {
                            this.addHoliday(params);
                        }else {
                            params.id = this.formData.id;
                            this.updateHoliday(params);
                        }
                        console.log(params)
                    }
                });
            },
            /**
             * 新增节假日
             */
            addHoliday( params ) {
                ajax.post('addHoliday', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('addSuccess'));
                        this.$router.push({ name: 'holiday'});
                    } else {
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             * 修改节假日
             * @param params
             */
            updateHoliday( params ) {
                ajax.post('updateHoliday', params).then(res => {
                    this.addLoading = false;
                    if(res.status === 200){
                        this.$Message.success(this.$t('edit') + this.$t('success'));
                        this.$router.push({ name: 'holiday'});
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
                    if(params.info){
                        this.formData.id = params.info.id;
                        this.formData.holidayName = params.info.holidayName;
                        this.formData.status = params.info.status === 'normal' ? true : false;
                        this.formData.time = [new Date(params.info.holidayStartTime),new Date(params.info.holidayEndTime) ];
                    }
                }else{
                    this.$router.push({
                        name : 'holiday'
                    });
                }
            },

        },

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

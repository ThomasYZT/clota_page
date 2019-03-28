<!--新增/编辑地区信息-->

<template>
    <div class="add-type">
        <bread-crumb-head
            :locale-router="$t(type === 'add' ? 'addRegion' : 'editRegion')"
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
                        <FormItem :label="$t('province')" prop="province">
                            <Select v-model="formData.province"
                                    style="width:280px"
                                    @on-change="provinceChange">
                                <Option v-for="item in provinceList"
                                        :value="item.code"
                                        :key="item.code">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('city')" prop="city">
                        <Select v-model="formData.city" style="width:280px">
                            <Option v-for="item in cityList"
                                    :value="item.code"
                                    :key="item.code">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem :label="$t('county')" prop="county">
                        <Select v-model="formData.county" style="width:280px">
                            <Option v-for="item in countyList"
                                    :value="item.code"
                                    :key="item.code">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="11">
                    <FormItem :label="$t('isUsing')">
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
    import { validator } from 'klwk-ui';
    import provinceList from '@/components/kCityPicker/dicts/provinces.json';
    import cityList from '@/components/kCityPicker/dicts/citys.json';
    import countyList from '@/components/kCityPicker/dicts/areas.json';

    export default {
        components : {
            breadCrumbHead,
        },
        data () {
            return {
                //上级路由列表
                beforeRouterList : [
                    {
                        name : this.$t('regionInfo'),
                        router : {
                            name : 'region'
                        }
                    }
                ],
                //表单数据
                formData : {
                    //省
                    province : '',
                    //市
                    city : '',
                    //是否启用
                    isUsing : '',
                    //县/区
                    county : '',
                    //备注
                    remark : '',
                },
                //表单校验规则
                ruleValidate : {
                    province : [
                        { required : true, message : this.$t('validateError.pleaseSelect', { 'msg' : this.$t('province') }), trigger : 'blur' },
                        { validator : validateMethod.emoji, trigger : 'blur' },
                        { type : 'string', max : 20, message : this.$t('errorMaxLength', { field : this.$t('account'), length : 20 }), trigger : 'blur' },
                    ],
                    city : [
                        { required : true, message : this.$t('validateError.pleaseSelect', { 'msg' : this.$t('city') }), trigger : 'blur' },
                    ],
                    county : [
                        { required : true, message : this.$t('validateError.pleaseSelect', { 'msg' : this.$t('county') }), trigger : 'blur' },
                    ]
                },
                //是否正在添加中
                addLoading : false,
                //操作类型
                type : '',
                //省列表
                provinceList : provinceList,
            };
        },
        methods : {
            /**
             * 保存新增单位数据
             */
            save () {
                this.addLoading = true;
                this.$refs.formValidate.validate(valid => {
                    this.addLoading = false;
                });
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$router.push({
                    name : 'region'
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams (params) {
                if (params.type) {
                    this.type = params.type;
                } else {
                    this.$router.push({
                        name : 'region'
                    });
                }
            },
            /**
             * 省级改变,市和区都变空
             */
            provinceChange () {
                this.formData.city = '';
                this.formData.county = '';
            }
        },
        beforeRouteEnter (to,fromm,next) {
            next(vm => {
                vm.getParams(to.params);
            });
        },
        computed : {
            //城市列表
            cityList  () {
                return cityList.filter(item => item.provinceCode === this.formData.province);
            },
            //县/区列表
            countyList () {
                return countyList.filter(item => item.provinceCode === this.formData.province && item.cityCode === this.formData.city);
            }
        }
    };
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

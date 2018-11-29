<!--
    新增经纬度模态框
    作者：杨泽涛
-->
<template>
    <Modal v-model="visible"
           :title="$t('addNewLngLat')"
           class-name="vertical-center-modal add-lng-lat"
           width="600"
           :mask-closable="false">

        <div class="form-wrapper">
            <Form ref="form"
                  :model="formData"
                  :rules="ruleValidate"
                  :label-width="180">
                <i-row>
                    <i-col span="18" offset="3">
                        <!-- 所属景区 -->
                        <FormItem :label="$t('colonSetting', { key : $t('scenePlace') })" prop="scenePlace">
                            <Select v-model="formData.scenePlace"
                                    :placeholder="$t('selectField', { msg : $t('scenePlace') })"
                                    show-name
                                    style="width:200px">
                                <Option v-for="item in scenePlaceList"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                        <!-- 位置名称 -->
                        <FormItem :label="$t('colonSetting', { key : $t('positionName') })"  prop="positionName">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.positionName"
                                   :placeholder="$t('inputField', { field : $t('positionName') })"/>
                        </FormItem>
                        <!-- 获取经纬度坐标值 -->
                        <FormItem :label="$t('colonSetting', { key : $t('getLogLatValue') })"  prop="coordinates">
                            <span class="click-btn">{{$t('clickHereGetValue')}}</span>
                        </FormItem>
                        <!-- 经度 -->
                        <FormItem :label="$t('colonSetting', { key : $t('longitude') })"  prop="longitude">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.longitude"
                                   :placeholder="$t('inputField', { field : $t('longitude') })"/>
                        </FormItem>
                        <!-- 纬度 -->
                        <FormItem :label="$t('colonSetting', { key : $t('latitude') })"  prop="latitude">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.latitude"
                                   :placeholder="$t('inputField', { field : $t('latitude') })"/>
                        </FormItem>
                        <!-- 半径 -->
                        <FormItem :label="$t('colonSetting', { key : $t('radiusWithUnit') })"  prop="radius">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.radius"
                                   :placeholder="$t('inputField', { field : $t('radiusWithoutUnit') })"/>
                        </FormItem>
                        <!-- 备注 -->
                        <FormItem :label="$t('colonSetting', { key : $t('remark') })"  prop="remark">
                            <Input style="width:200px;"
                                   type="textarea"
                                   v-model.trim="formData.remark"
                                   :placeholder="$t('inputField', { field : $t('remark') })"/>
                        </FormItem>
                    </i-col>
                </i-row>
            </Form>
        </div>

        <div slot="footer" class="modal-footer">
            <Button class="ivu-btn-90px"
                    type="primary"
                    @click="save" >{{$t('save')}}</Button>
            <Button class="ivu-btn-90px"
                    type="ghost"
                    @click="toggle" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                //所属景区下拉列表
                scenePlaceList : [],
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //所属景区
                    scenePlace : '',
                    //地理位置名称
                    positionName : '',
                    //坐标值
                    coordinates : [],
                    //经度
                    longitude : '',
                    //纬度
                    latitude : '',
                    //半径
                    radius : '',
                    //备注
                    remark : '',

                },
                //表单验证规则
                ruleValidate : {
                    scenePlace : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('scenePlace') }), trigger : 'blur' },
                    ],
                    positionName : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('positionName') }), trigger : 'blur' },
                        { type : 'string', max : 50, message : this.$t('errorMaxLength',{ field : this.$t('positionName'),length : 50 }), trigger : 'blur' },
                    ],
                    coordinates : [
                        { required : true, type : 'array', min : 2, message : this.$t('pleaseGetLngLat'), trigger : 'blur' },
                    ],
                    longitude : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('longitude') }), trigger : 'blur' },
                    ],
                    latitude : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('latitude') }), trigger : 'blur' },
                    ],
                    radius : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('radiusWithoutUnit') }), trigger : 'blur' },
                    ],
                    remark : [
                        { type : 'string', max : 200, message : this.$t('errorMaxLength',{ field : this.$t('remark'),length : 200 }), trigger : 'blur' },
                    ],
                },
            };
        },
        methods : {
            /**
             * 显示、隐藏模态框
             */
            toggle () {
                this.formData = {
                    scenePlace : '',
                    positionName : '',
                    coordinates : [],
                    longitude : '',
                    latitude : '',
                    radius : '',
                    remark : '',
                };
                this.scenePlaceList = [
                    {
                        label : '111',
                        value : '111'
                    },
                    {
                        label : '222',
                        value : '222'
                    },
                    {
                        label : '333',
                        value : '333'
                    },
                    {
                        label : '444',
                        value : '444'
                    }
                ];
                this.$refs.form.resetFields();
                this.visible = !this.visible;

            },
            /**
             * 保存
             */
            save () {
                this.$refs.form.validate((valid) => {
                    if (valid) {

                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .form-wrapper {
        .click-btn {
            font-size: 14px;
            color: $color_blue;
            cursor: pointer;
        }
    }
</style>

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
                        <FormItem :label="$t('colonSetting', { key : $t('scenePlace') })" prop="orgId">
                            <span>{{manageOrgs.orgName | contentFilter}}</span>
                        </FormItem>
                        <!-- 位置名称 -->
                        <FormItem :label="$t('colonSetting', { key : $t('positionName') })"  prop="address">
                            <Input type="text"
                                   style="width:200px;"
                                   v-model.trim="formData.address"
                                   :placeholder="$t('inputField', { field : $t('positionName') })"/>
                        </FormItem>
                        <!-- 获取经纬度坐标值 -->
                        <FormItem :label="$t('colonSetting', { key : $t('getLogLatValue') })">
                            <span class="click-btn" @click="getPosition">{{$t('clickHereGetValue')}}</span>
                            <el-amap v-if="isCreateMap" v-show="false" vid="amapDemo" :plugin="plugins"></el-amap>
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
                    @click="toggle({type : 'hide'})" >{{$t("cancel")}}</Button>
        </div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index';
    import { mapGetters } from 'vuex';
    import { validator } from 'klwk-ui';
    export default {
        components : {},
        data () {
            //校验经度
            const longitudeValid = (rule, value, callback) => {
                let reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;

                if (!reg.test(value)) {
                    callback(new Error(this.$t('errorFormat', { field : this.$t('longitude') })));
                } else {
                    callback();
                }
            };

            //校验纬度
            const latitudeValid = (rule, value, callback) => {
                let reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
                if (!reg.test(value)) {
                    callback(new Error(this.$t('errorFormat', { field : this.$t('latitude') })));
                } else {
                    callback();
                }
            };

            //校验是否为数字
            const isNumber = (rule, value, callback) => {
                if (!validator.isBothNumber(value)) {
                    callback(new Error(this.$t('numError', { field : this.$t('radiusWithoutUnit') })));
                } else {
                    callback();
                }
            };

            return {
                //模态框编辑、新增状态
                type : 'add',
                //列表项数据
                listItem : {},
                //是否显示模态框
                visible : false,
                //表单数据
                formData : {
                    //所属景区
                    orgId : '',
                    //地理位置名称
                    address : '',
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
                    orgId : [
                        { required : true, message : this.$t('selectField',{ msg : this.$t('scenePlace') }), trigger : 'blur' },
                    ],
                    address : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('positionName') }), trigger : 'blur' },
                        { type : 'string', max : 50, message : this.$t('errorMaxLength',{ field : this.$t('positionName'),length : 50 }), trigger : 'blur' },
                    ],
                    longitude : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('longitude') }), trigger : 'blur' },
                        { validator : longitudeValid, trigger : 'blur' }
                    ],
                    latitude : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('latitude') }), trigger : 'blur' },
                        { validator : latitudeValid, trigger : 'blur' }
                    ],
                    radius : [
                        { required : true, message : this.$t('inputField',{ field : this.$t('radiusWithoutUnit') }), trigger : 'blur' },
                        { validator : isNumber, trigger : 'blur' }
                    ],
                    remark : [
                        { type : 'string', max : 200, message : this.$t('errorMaxLength',{ field : this.$t('remark'),length : 200 }), trigger : 'blur' },
                    ],
                },
                //坐标值
                coordinates : [],
                isCreateMap : false,
                plugins : [
                    {
                        pName : 'Geolocation',
                        events : {
                            init : (o) => {
                                o.getCurrentPosition((status, result) => {
                                    if (result && result.position) {
                                        this.formData.longitude = result.position.lng.toString();
                                        this.formData.latitude = result.position.lat.toString();
                                        this.isCreateMap = false;
                                    }
                                });
                            }
                        }
                    }
                ]
            };
        },
        computed : {
            ...mapGetters([
                'manageOrgs'
            ])
        },
        methods : {
            /**
             * 显示、隐藏模态框
             */
            toggle ({ type, param }) {
                if (type && type === 'show') {
                    if (param) {
                        this.listItem = param;
                        Object.assign(this.formData, this.listItem);
                        this.formData.radius = this.formData.radius.toString();
                    } else {
                        this.formData.orgId = this.manageOrgs.id;
                    }
                } else if (type && type === 'hide') {
                    this.reset();
                }
                this.visible = !this.visible;
            },
            /**
             * 保存
             */
            save () {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (Object.keys(this.listItem).length > 0) {
                            this.editLongLng();
                        } else {
                            this.addLongLng();
                        }
                    }
                });
            },
            /**
             * 重置
             */
            reset () {
                this.formData = {
                    orgId : '',
                    address : '',
                    longitude : '',
                    latitude : '',
                    radius : '',
                    remark : '',
                };
                this.listItem = {};
                this.$refs.form.resetFields();
            },
            /**
             * 新增经纬度
             */
            addLongLng () {
                ajax.post('marketing-addForbidden', this.formData).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('add') }));
                        this.$emit('addSuccess');
                        this.toggle({ type : 'hide' });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('add') }));
                    }
                });
            },
            /**
             * 修改经纬度
             */
            editLongLng () {
                ajax.post('marketing-updateForbidden', {
                    id : this.formData.id,
                    address : this.formData.address,
                    latitude : this.formData.latitude,
                    longitude : this.formData.longitude,
                    radius : this.formData.radius,
                    remark : this.formData.remark,
                }).then(res => {
                    if (res.success) {
                        this.$Message.success(this.$t('successTip', { tip : this.$t('modify') }));
                        this.$emit('addSuccess');
                        this.toggle({ type : 'hide' });
                    } else {
                        this.$Message.error(this.$t('failureTip', { tip : this.$t('modify') }));
                    }
                });
            },
            /**
             * h5获取经纬度信息
             */
            getGeolocationInfo () {
                // return new Promise((resolve, reject) => {
                //     if (navigator.geolocation) {
                //         navigator.geolocation.getCurrentPosition((position) => {
                //             let latitude = position.coords.latitude;
                //             let longitude = position.coords.longitude;
                //             let data = {
                //                 latitude : latitude,
                //                 longitude : longitude
                //             };
                //             resolve(data);
                //         }, (res) => {
                //             console.log(res);
                //             reject(arguments);
                //         });
                //     } else {
                //         let msg = 'no-support';
                //         reject(msg);
                //     }
                // });
            },
            getPosition () {
                this.isCreateMap = true;
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

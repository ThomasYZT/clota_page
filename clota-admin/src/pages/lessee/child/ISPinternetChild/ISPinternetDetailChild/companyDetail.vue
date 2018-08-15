<!--公司详情-->

<template>
    <div class="company-detail">
        <div class="com-name">
            <template v-if="type === 'edit'">
                <Input v-model="formDataCopy.companyName" style="width : 280px"/>
                <i-switch v-model="formDataCopy.isStart"></i-switch>
            </template>
            <template v-if="type === 'watch'">
                <span class="name"
                     v-if="type === 'watch'"
                     v-w-title="formData.companyName">
                    {{formData.companyName}}
                </span>
                <span class="edit"
                  @click="edit">
                    <span class="iconfont icon-modify"></span>
                    {{$t('edit')}}
                </span>
            </template>
            <span :class="{'started'
                :formDataCopy.isStart ,'not-started' : !formDataCopy.isStart}">
                {{$t(formDataCopy.isStart ? 'hasStart' : 'hasNotStart')}}
            </span>

        </div>
        <ul class="company-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">公司ID：</span>
                    <span class="info-val">232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">公司编码：</span>
                    <span class="info-val">23232323232323232323232323232323232323232</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">企业编码(线下核销)：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.cashierCode"/>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.cashierCode}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">全民分销邀请码：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.inviteCode"/>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.inviteCode}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">短信供应商：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.smsSuppiler" >
                            <Option v-for="item in smsSuppilerList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.smsSuppiler}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key">管理账号：</span>
                    <span class="info-val">
                        23232323232323232323232323232323232323232
                        <span class="reset-pass" @click="resetPass">重置密码</span>
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">电子邮箱：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.email" />
                    </span>
                    <span class="info-val" v-else>
                        {{formData.email}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">联系人：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.contactor" />
                    </span>
                    <span class="info-val" v-else>
                        {{formData.contactor}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">所在地：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <city-plugin @select="formDataCopy.place = $event" >
                        </city-plugin>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.place}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">详细地址：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.address" />
                    </span>
                    <span class="info-val" v-else>
                        {{formData.address}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">电话：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.phone" />
                    </span>
                    <span class="info-val" v-else>
                        {{formData.phone}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">传真：</span>
                    <span class="info-val" v-if="type === 'edit'">
                        <Input v-model="formDataCopy.fax" />
                    </span>
                    <span class="info-val" v-else>
                        {{formData.fax}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">管理上级：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.superior" >
                            <Option v-for="item in superiorList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.superior}}
                    </span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">财务上级：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.fianceSuperior" >
                            <Option v-for="item in fianceSuperiorList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.fianceSuperior}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">短信余量/累计购买：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key" :class="{'fix-key' : type === 'edit'}">受理客服：</span>
                    <span class="info-val" v-if="type === 'edit'">
                          <Select v-model="formDataCopy.serviceStaff" >
                            <Option v-for="item in serviceStaffList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </span>
                    <span class="info-val" v-else>
                        {{formData.serviceStaff}}
                    </span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">创建时间：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">创建人：</span>
                    <span class="info-val">云南省曲靖市马龙县因下路464号</span>
                </div>
            </li>
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">上次修改时间：</span>
                    <span class="info-val">268326828@163.com</span>
                </div>
                <div class="info-list2">
                    <span class="info-key">上次修改人：</span>
                    <span class="info-val">云南省曲靖市马龙县因下路464号</span>
                </div>
            </li>
            <li class="btn-area" v-if="type === 'edit'">
                <Button type="primary"
                        class="ivu-btn-90px"
                        @click="saveEdit">{{$t('save')}}</Button>
                <Button type="ghost"
                        class="ivu-btn-90px"
                        @click="cancel">{{$t('cancel')}}</Button>
            </li>
        </ul>


        <!--已开通服务-->
        <opened-service :is-pack-up="true">
        </opened-service>
        <!--下属公司-->
        <sub-company>
        </sub-company>
        <!--下属景区-->
        <sub-scene>
        </sub-scene>
        <!--下属部门-->
        <sub-department>
        </sub-department>
        <!--员工-->
        <employee-table>
        </employee-table>
        <!--短信-->
        <note-table>
        </note-table>
        <!--重置密码模态框-->
        <edit-modal ref="editModal">
        </edit-modal>
    </div>
</template>

<script>
    import tableCom from '../../organization/tableCom';
    import employeeTable from './components/employeeTable';
    import noteTable from './components/noteTable';
    import openedService from './components/openedService';
    import subCompany from './components/subCompany';
    import subScene from './components/subScene';
    import subDepartment from './components/subDepartment';
    import defaultsDeep from 'lodash/defaultsDeep';
    import cityPlugin from '@/components/kCityPicker/kCityPicker.vue';
    import editModal from '@/components/editModal/index.vue';

    export default {
        components: {
            tableCom,
            employeeTable,
            noteTable,
            openedService,
            subCompany,
            subScene,
            subDepartment,
            cityPlugin,
            editModal
        },
        data() {
            return {
                tableData: [{
                    aa: '2016-05-03',
                    realName: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
                ],
                //表单数据
                formData : {
                    //公司名称
                    companyName : '广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团广州长隆旅游集团',
                    //是否开启
                    isStart : false,
                    //线下核销编码
                    cashierCode : '2323',
                    //全民分销邀请码
                    inviteCode : '2323',
                    //短信供应商
                    smsSuppiler : '1',
                    //电子邮箱
                    email : '1',
                    //联系人
                    contactor : '',
                    //详细地址
                    address : '沙发斯蒂芬',
                    //电话
                    phone : '2323',
                    //传真
                    fax : '2323',
                    //管理上级
                    superior : '上级',
                    //授理客服
                    serviceStaff : '上级',
                    //所在地
                    place : '上级',
                },
                //复制的表单数据
                formDataCopy : {},
                //当前状态
                type : 'watch',
                //短信供应商列表
                smsSuppilerList : [
                    {
                        label : '1',
                        value : '1'
                    }
                ],
                //管理上级列表
                superiorList : [
                    {
                        label : '上级',
                        value : '1'
                    }
                ],
                //财务上级列表
                fianceSuperiorList : [
                    {
                        label : '上级',
                        value : '1'
                    }
                ],
                //受理客服列表
                serviceStaffList : [
                    {
                        label : '客服',
                        value : '1'
                    }
                ]
            }
        },
        methods: {
            /**
             * 取消编辑
             */
            cancel () {
                this.type = 'watch';
            },
            /**
             * 保存编辑的信息
             */
            saveEdit () {
                this.type = 'watch';
                this.formData = defaultsDeep({} , this.formDataCopy);
            },
            /**
             * 开始编辑
             */
            edit () {
                this.type = 'edit';
                this.formDataCopy = defaultsDeep({} , this.formData);
            },
            /**
             * 重置密码
             */
            resetPass () {
                this.$refs.editModal.show({
                    title : this.$t('resetPass'),
                    confirmCallback : (pass) => {
                        this.confimChangePass(pass);
                    }
                });
            },
            /**
             * 确认重置密码
             * @param pass
             */
            confimChangePass (pass){
                alert('重置密码成功')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .company-detail {
        @include block_outline($width: unquote('calc(100% - 400px)'));
        padding: 11px 35px;
        float: right;
        overflow: auto;

        .com-name {
            @include overflow_tip(100%, 56px);
            padding: 14px 0;

            /deep/ .ivu-switch{
                margin-left: 20px;
            }

            .name {
                line-height: 28px;
                font-size: $font_size_20px;
                color: $color_000_085;
                vertical-align: middle;
                display: inline-block;
                @include overflow_tip($width: auto, $height: 100%);
                max-width: calc(100% - 127px);
            }

            .started,
            .not-started,
            .edit {
                @include block_outline(60px);
                display: inline-block;
                vertical-align: middle;
                line-height: 28px;
                font-size: $font_size_14px;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .not-started{
                padding-left: 10px;
                color: $color_yellow;
            }

            .edit {
                float: right;
                color: $color_0082D5;
                text-align: right;
                cursor: pointer;

                .iconfont{
                    vertical-align: middle;
                }
            }
        }

        .btn-area{
            @include block_outline($height : 72px);
            text-align: center;
            padding: 20px 0;

            /deep/ .ivu-btn-primary{
                margin-right: 8px;
            }
        }

        .company-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .list {
                display: flex;
                align-items: center;
                @include block_outline(auto);
                min-height: 30px;
                overflow: auto;
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(40%, auto);
                }

                .info-list2 {
                    @include block_outline(60%, auto);
                    padding-left: 15px;
                }

                .info-list1,
                .info-list2 {
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;
                    align-items: center;

                    .info-key {
                        @include block_outline(auto, 100%,false);
                        color: $color_333;

                        &.fix-key{
                            width: 120px;
                            text-align: left;
                        }
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;

                        .reset-pass{
                            color: $color_0082D5;
                            font-size: $font_size_12px;
                            margin-left: 10px;
                            display: inline-block;
                            cursor: pointer;
                        }
                    }
                }
            }
        }

        .open-service {
            @include block_outline($height: 42px);
            padding-bottom: 10px;

            /deep/ .ivu-btn-primary {
                margin-right: 7px;
            }
        }

        .employee-account {
            @include block_outline($height: 30px);
            line-height: 20px;
            padding-bottom: 10px;
            font-size: $font_size_14px;
            color: $color_606266;
        }
    }
</style>

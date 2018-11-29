<!--
    二维码新增、编辑、展示组件 null、add、edit、show三种状态
    作者：杨泽涛
-->
<template>
    <div class="code-box" >
        <!-- 无二维码信息区域 -->
        <div v-if="boxStatus === 'null'" class="null-box" @click="add">
            <span> + {{$t('addNewCode')}}</span>
        </div>

        <!-- 新增、编辑二维码区域 -->
        <transition name="fade">
            <div class="add-box" v-if="boxStatus === 'add' || boxStatus === 'edit'">
                <Form :model="formData"
                      :rules="ruleValidate"
                      :label-width="100">
                    <i-row class="box-row">
                        <i-col span="24">
                            <!-- 营销类别 -->
                            <FormItem :label="$t('colonSetting', { key : $t('marketType') })" prop="marketType">
                                <Select v-model="formData.marketType"
                                        :placeholder="$t('selectField', { msg : $t('marketType') })"
                                        show-name
                                        style="width:170px">
                                    <Option v-for="item in marketTypeList"
                                            :value="item.value"
                                            :key="item.value">{{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>

                            <!-- 路径 -->
                            <FormItem :label="$t('colonSetting', { key : $t('path') })"  prop="path">
                                <Input style="width:170px;"
                                       type="textarea"
                                       :rows="7"
                                       v-model.trim="formData.path"
                                       :placeholder="$t('inputField', { field : $t('path') })"/>
                            </FormItem>
                        </i-col>
                    </i-row>
                </Form>
            </div>
        </transition>

        <!-- 展示二维码区域 -->
        <transition name="fade">
            <div class="show-box" v-if="boxStatus === 'show'"></div>
        </transition>

        <transition name="fade">
            <div class="box-footer" v-if="boxStatus !== 'null'">
                <template v-if="boxStatus === 'show'">
                    <div class="btn"><span class="blue-btn">{{$t('edit')}}</span></div>
                    <div class="btn"><span>{{$t('del')}}</span></div>
                </template>
                <template v-if="boxStatus === 'add'">
                    <div class="btn"><span class="blue-btn">{{$t('save')}}</span></div>
                    <div class="btn"><span>{{$t('cancel')}}</span></div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>

    export default {
        components : {},
        data () {
            return {
                boxStatus : 'null',
                formData : {
                    //营销类型
                    marketType : '',
                    //路径
                    path : '',
                },
                ruleValidate : {
                    marketType : [],
                    path : [],
                },
                marketTypeList : [
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
                ],
            };
        },
        methods : {
            /**
             * 新增
             */
            add () {
                this.boxStatus = 'add';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';


    .code-box {
        width: 300px;
        height: 350px;
        border: 1px dashed #D9D9D9;
        border-radius: 8px;


        .null-box {
            width: 100%;
            height: 100%;
            cursor: pointer;
            color: $color_blue;
            font-size: 16px;
            line-height: 350px;
            text-align: center;
        }

        .show-box, .add-box {
            height: 310px;
            width: 100%;
        }

        .add-box {
            padding-top: 70px;
        }

        .box-footer {
            width: 100%;
            height: 40px;
            display: flex;
            background-color: #F7F9FA;
            .btn {
                flex: 1 0;
                height: 100%;
                width: 100%;
                line-height: 40px;
                text-align: center;

                span {
                    cursor: pointer;
                }

                .blue-btn {
                    color: $color_blue;
                }
            }

        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

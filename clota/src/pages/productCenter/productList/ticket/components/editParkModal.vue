<!--
内容：产品列表 - 编辑/新增票类 - 新增园区
作者：
日期：
-->
<template>
    <Modal
        title="Title"
        v-model="visible"
        :mask-closable="false"
        class="edit-park-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <span class="title" >
                {{title}}
            </span>
        </div>
        <div class="content-info">

            <!--一票制表单信息-->
            <Form ref="oneTicketFormValidate"
                  key="oneTicketFormValidate"
                  v-if="formData.saleType === 'one_ticket'"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('choosePark')" prop="parkId"><!--选择园区-->
                            <template v-if="type === 'modify'">
                                <Input :value="formData.parkName"
                                       disabled
                                       placeholder=""/>
                            </template>
                            <template v-else>
                                <Select v-model="formData.parkId"
                                        v-if="type !== 'check'"
                                        :disabled="type === 'check'"
                                        :placeholder="$t('selectField', {msg: ''})"
                                        @on-change="selectParkChange">
                                    <Option v-for="(item,index) in optionalParkList"
                                            :key="index"
                                            :value="item.id">
                                        {{item.orgName}}
                                    </Option>
                                </Select>
                                <Input :value="formData.parkName"
                                       v-else
                                       disabled
                                       placeholder=""/>
                            </template>
                            <span class="iconfont icon-note" v-title="$t('chooseParkNotice')"></span>
                        </FormItem>
                    </i-col>
                </i-row>
                <!--售票方式-->
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('saleType')" prop="saleType">
                            <Select v-model="formData.saleType"
                                    :disabled="type === 'check'"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeSaleType">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="notice" v-if="formData.saleType === 'one_ticket'">{{$t('oneTicketNotice')}}</span>
                            <span class="notice" v-else-if="formData.saleType === 'assort'">{{$t('moreTicketNotice')}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <!--产品有效性设置 === 自游玩之日起M天有效-->
                <i-row v-if="ticketDetail.productEffSet === 'since_the_play'">
                    <i-col span="24">
                        <Form-item prop="effTimes">
                            <span>{{$t('dayToPlay')}}</span>
                            <Input v-model.trim="formData.effDay"
                                   :disabled="type === 'check'"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('dayToEffect')}}</span>
                            <Input v-model.trim="formData.effTimes"
                                   :disabled="type === 'check'"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('times')}}</span>
                        </Form-item>
                    </i-col>
                </i-row>
                <!--产品有效性设置 === 同销售政策适用游玩期限-->
                <i-row v-if="ticketDetail.productEffSet === 'same_to_policy'">
                    <i-col span="24">
                        <Form-item prop="effTimes">
                            <span>{{$t('timesToPolicy')}}</span>
                            <Input v-model.trim="formData.effTimes"
                                   :disabled="type === 'check'"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('times')}}</span>
                        </Form-item>
                    </i-col>
                </i-row>
                <!--入园核销-->
                <title-park title="enterCheck"></title-park>
                <!--选择设备分组-->
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('selectField',{msg: $t('equipmentGroup')})" prop="gardenGroupIds">
                            <Select v-model="formData.gardenGroupIds"
                                    :disabled="type === 'check'"
                                    :multiple="true"
                                    :clearable="true"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeEquipmentGroup">
                                <Option v-for="(item,index) in enumData.group"
                                        :key="index"
                                        :value="item.id">
                                    {{item.groupName}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>
                <!-- 入园检票处 列表数据 -->
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('enterCheckPlace')"><!--入园检票处-->
                            <!--入园检票处--核销表格,区分查看与编辑-->
                            <table-com
                                v-if="type === 'check'"
                                :table-com-min-height="250"
                                :column-data="viewDistributeColumnHead"
                                :table-data="formData.checkPoint"
                                :border="false">
                                <el-table-column
                                    slot="column0"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        {{ scope.$index+1 }}
                                    </template>
                                </el-table-column>
                            </table-com>
                            <table-com
                                v-else
                                :table-com-min-height="250"
                                :column-data="distributeColumnHead"
                                :table-data="formData.checkPoint"
                                :border="false">
                                <el-table-column
                                    slot="column0"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        {{ scope.$index+1 }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column2"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.status === 'valid' ? $t('startingUse') : $t('unStarting') }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="span-yellow"
                                                v-if="scope.row.status === 'valid'"
                                                @click="disabled(scope.row,scope.$index)">{{$t('disabled')}}</li><!--禁用-->
                                            <li class="normal"
                                                v-else
                                                @click="startUse(scope.row,scope.$index)">{{$t('commissioned')}}</li><!--启用-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <!-- 入园须知 -->
                        <Form-item :label="$t('noticeInPark')" prop="admissionInstructions">
                            <template v-if="type === 'check'">
                                <div style="word-break:break-all;" v-html="formData.admissionInstructions"></div>
                            </template>
                            <template v-else>
                                <editor ref="editor" :uploadImgable="false"
                                        :value.sync="formData.admissionInstructions"></editor>
                            </template>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('otherSet')"><!--其他设置-->
                            <Checkbox v-model="formData.fingerCheck"
                                      :disabled="type === 'check'">{{$t('fingerprint')}}</Checkbox>
                        </Form-item>
                    </i-col>
                </i-row>
            </Form>

            <!--多票制表单信息-->
            <Form ref="moreTicketFormValidate"
                  key="moreTicketFormValidate"
                  v-if="formData.saleType === 'assort'"
                  :model="formData"
                  :rules="ruleValidate"
                  label-position="top">
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('choosePark')" prop="parkId"><!--选择园区-->
                            <Select v-model="formData.parkId"
                                    v-if="type !== 'check'"
                                    :disabled="type === 'check'"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="selectParkChange">
                                <Option v-for="(item,index) in optionalParkList"
                                        :key="index"
                                        :value="item.id">
                                    {{item.orgName}}
                                </Option>
                            </Select>
                            <Input :value="formData.parkName"
                                   v-else
                                   disabled
                                   placeholder=""/>
                            <span class="iconfont icon-note" v-title="$t('chooseParkNotice')"></span>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('saleType')" prop="saleType"><!--售票方式-->
                            <Select v-model="formData.saleType"
                                    :disabled="type === 'check'"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeSaleType">
                                <Option v-for="(item,index) in enumData.saleType"
                                        :key="index"
                                        :value="item.value">
                                    {{$t(item.label)}}
                                </Option>
                            </Select>
                            <span class="notice" v-if="formData.saleType === 'one_ticket'">{{$t('oneTicketNotice')}}</span>
                            <span class="notice" v-else-if="formData.saleType === 'assort'">{{$t('moreTicketNotice')}}</span>
                        </FormItem>
                    </i-col>
                </i-row>
                <!--产品有效性设置 === 自游玩之日起M天有效-->
                <i-row v-if="ticketDetail.productEffSet === 'since_the_play'">
                    <i-col span="24">
                        <Form-item prop="effTimes">
                            <span>{{$t('dayToPlay')}}</span>
                            <Input v-model.trim="formData.effDay"
                                   :disabled="type === 'check'"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('dayToEffect')}}</span>
                            <Input v-model.trim="formData.effTimes"
                                   :disabled="type === 'check'"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('times')}}</span>
                        </Form-item>
                    </i-col>
                </i-row>
                <!--产品有效性设置 === 同销售政策适用游玩期限-->
                <i-row v-if="ticketDetail.productEffSet === 'same_to_policy'">
                    <i-col span="24">
                        <Form-item prop="effTimes">
                            <span>{{$t('timesToPolicy')}}</span>
                            <Input v-model.trim="formData.effTimes"
                                   :disabled="type === 'check'"
                                   class="short-input"
                                   :placeholder="$t('inputField', {field: ''})"/>
                            <span>{{$t('times')}}</span>
                        </Form-item>
                    </i-col>
                </i-row>
                <!--入园核销-->
                <title-park title="enterCheck"></title-park>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('selectField',{msg: $t('equipmentGroup')})" prop="gardenGroupIds"><!--设备分组-->
                            <Select v-model="formData.gardenGroupIds"
                                    :disabled="type === 'check'"
                                    :multiple="true"
                                    :clearable="true"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeEquipmentGroup">
                                <Option v-for="(item,index) in enumData.group"
                                        :key="index"
                                        :value="item.id">
                                    {{item.groupName}}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('enterCheckPlace')"><!--入园检票处-->
                            <!--入园检票处--核销表格,区分查看与编辑-->
                            <table-com
                                v-if="type === 'check'"
                                auto-height
                                :table-com-min-height="250"
                                :column-data="viewDistributeColumnHead"
                                :table-data="formData.checkPoint"
                                :border="false">
                                <el-table-column
                                    slot="column0"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        {{ scope.$index+1 }}
                                    </template>
                                </el-table-column>
                            </table-com>
                            <table-com
                                v-else
                                auto-height
                                :table-com-min-height="250"
                                :column-data="distributeColumnHead"
                                :table-data="formData.checkPoint"
                                :border="false">
                                <el-table-column
                                    slot="column0"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        {{ scope.$index+1 }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column2"
                                    :label="row.title"
                                    :prop="row.field"
                                    :key="row.index"
                                    :width="row.width"
                                    :min-width="row.minWidth"
                                    show-overflow-tooltip
                                    slot-scope="row">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.status === 'valid' ? $t('startingUse') : $t('unStarting') }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    slot="column3"
                                    slot-scope="row"
                                    :label="row.title"
                                    :width="row.width"
                                    :min-width="row.minWidth">
                                    <template slot-scope="scope">
                                        <ul class="operate-list">
                                            <li class="span-yellow"
                                                v-if="scope.row.status === 'valid'"
                                                @click="disabled(scope.row, scope.$index)">{{$t('disabled')}}</li><!--禁用-->
                                            <li class="normal"
                                                v-else
                                                @click="startUse(scope.row, scope.$index)">{{$t('commissioned')}}</li><!--启用-->
                                        </ul>
                                    </template>
                                </el-table-column>
                            </table-com>
                        </FormItem>
                    </i-col>
                </i-row>

                <!--游玩项目-->
                <title-park title="playProject"></title-park>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('projectTotalTimes')" prop="itemCheckTimes"><!--项目游玩总次数-->
                            <Input v-model.trim="formData.itemCheckTimes"
                                   :disabled="type === 'check'"
                                   :placeholder="$t('inputField', {field: ''})"/>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <FormItem :label="$t('addProjectGroup')" prop="equipmentGroupIds"><!--添加项目分组-->
                            <Select v-model="formData.equipmentGroupIds"
                                    :disabled="type === 'check'"
                                    :multiple="true"
                                    :clearable="true"
                                    :placeholder="$t('selectField', {msg: ''})"
                                    @on-change="changeProjectGroup">
                                <Option v-for="(item,index) in enumData.group"
                                        :key="index"
                                        :value="item.id">
                                    {{item.groupName}}
                                    </Option>
                            </Select>
                            <!--<span class="example" @click="jumpForExample">{{$t('example')}}</span>-->
                            <!--项目分组表格-->
                        </FormItem>
                    </i-col>
                </i-row>
                <div class="table-wrap">

                    <Form-item prop="timesCheck">
                        <table-com
                            auto-height
                            :table-com-min-height="250"
                            :column-data="proGroupColumnHead"
                            :table-data="formData.playPoint"
                            :border="false">
                            <el-table-column
                                slot="column0"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                                <span v-if="scope.row.playType === 'required'"
                                                      class="must-span iconfont icon-must-play"></span>
                                    <span>{{ scope.$index+1 }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column2"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <template v-if="type === 'check'">
                                        {{scope.row.sumTimes | contentFilter}}
                                                </template>
                                    <template v-else>
                                        <InputNumber :max="formData.itemCheckTimes ? Number(formData.itemCheckTimes) : 0"
                                                     :min="0"
                                                     :precision="0"
                                                     v-model.trim="scope.row.sumTimes"
                                                     :placeholder="$t('inputField', {field: ''})">
                                        </InputNumber>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column3"
                                :label="row.title"
                                :prop="row.field"
                                :key="row.index"
                                :width="row.width"
                                :min-width="row.minWidth"
                                show-overflow-tooltip
                                slot-scope="row">
                                <template slot-scope="scope">
                                    <template v-if="type === 'check'">
                                        {{scope.row.dayTimes | contentFilter}}
                                                </template>
                                    <template v-else>
                                            <InputNumber :max="formData.itemCheckTimes ? Number(formData.itemCheckTimes) : 0"
                                                         :min="0"
                                                         :precision="0"
                                                         v-model.trim="scope.row.dayTimes"
                                                         :placeholder="$t('inputField', {field: ''})">
                                            </InputNumber>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column
                                slot="column4"
                                slot-scope="row"
                                :label="row.title"
                                :width="row.width"
                                fixed="right"
                                :min-width="row.minWidth">
                                <template slot-scope="scope">
                                    <ul class="operate-list">
                                        <template v-if="type === 'check'">
                                            <li class="normal"
                                                v-if="scope.row.playType === 'required'">{{$t('requiredPlayItem')}}</li><!--必玩项-->
                                            <li class="normal" v-else>{{$t('playableItem')}}</li><!--可玩项-->
                                        </template>
                                        <template v-else>
                                            <li class="normal"
                                                v-if="scope.row.playType === 'required'"
                                                @click="setAblePlay(scope.row, scope.$index)">{{$t('setAblePlay')}}</li><!--设为可玩-->
                                            <li class="normal"
                                                v-else
                                                @click="setMustPlay(scope.row, scope.$index)">{{$t('setMustPlay')}}</li><!--设为必玩-->
                                        </template>
                                    </ul>
                                </template>
                            </el-table-column>
                        </table-com>

                    </Form-item>
                </div>
                <i-row>
                    <i-col span="24">
                        <!-- 入园须知 -->
                        <Form-item :label="$t('noticeInPark')" prop="admissionInstructions">
                            <template v-if="type === 'check'">
                                <div style="word-break:break-all;" v-html="formData.admissionInstructions"></div>
                            </template>
                            <template v-else>
                                <editor ref="editor" :uploadImgable="false"
                                        :value.sync="formData.admissionInstructions"></editor>
                            </template>
                        </Form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col span="24">
                        <Form-item :label="$t('otherSet')"><!--其他设置-->
                            <Checkbox v-model="formData.fingerCheck"
                                      :disabled="type === 'check'">{{$t('fingerprint')}}</Checkbox>
                        </Form-item>
                    </i-col>
                </i-row>

            </Form>

        </div>
        <div slot="footer">
            <template  v-if="type !== 'check'">
                <Button type="primary" class="ivu-btn-90px" @click="confirm">{{$t('confirm')}}</Button>
                <Button type="ghost" class="ivu-btn-90px" @click="cancel">{{$t('cancel')}}</Button>
            </template>
            <template  v-else>
                <Button type="ghost" class="ivu-btn-90px" @click="cancel">{{$t('back')}}</Button>
            </template>
        </div>
    </Modal>
</template>

<script>

    import tableCom from '@/components/tableCom/tableCom.vue';
    import titlePark from '../../../components/titlePark.vue';
    import editor from '@/components/editor/editor';
    import { saleType, authenticationType } from '@/assets/js/constVariable';
    import { distributeColumnHead, proGroupColumnHead, viewDistributeColumnHead } from '../editTicket/child/parkConfig';
    import defaultsDeep from 'lodash/defaultsDeep';
    import common from '@/assets/js/common.js';
    import ajax from '@/api/index';

    export default {
        props : {
            //当前票类的详细信息
            ticketDetail : {
                type : Object,
                default () {
                    return {};
                }
            },
            //全部园区列表数据
            parkList : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom,
            titlePark,
            editor,
        },
        data () {
            let validateMethod = {
                emoji : (rule, value, callback) => {
                    if (value && value.isUtf16()) {
                        callback(new Error( this.$t('errorIrregular') )); // 输入内容不合规则
                    } else {
                        callback();
                    }
                },
                //校验正整数
                validateNumber : (rule,value,callback) => {
                    if (value) {
                        common.validateInteger(value).then(() => {
                            callback();
                        }).catch(err => {
                            if (err === 'errorMaxLength') {
                                callback(this.$t(err,{ field : this.$t(rule.field),length : 10 }));
                            } else {
                                callback(this.$t(err,{ field : this.$t(rule.field) }));
                            }
                        });
                    }
                },
                //校验次数，天数
                validateTimes : (rule,value,callback) => {
                    common.validateInteger(value).then(() => {
                        callback();
                        if (this.ticketDetail.productEffSet === 'since_the_play') {
                            common.validateInteger(this.formData.effDay).then(() => {
                                callback();
                            }).catch(err => {
                                if (err === 'errorMaxLength') {
                                    callback(this.$t(err,{ field : '', length : 10 }));
                                } else {
                                    callback(this.$t(err,{ field : '' }));
                                }
                            });
                        }
                    }).catch(err => {
                        if (err === 'errorMaxLength') {
                            callback(this.$t(err,{ field : '', length : 10 }));
                        } else {
                            callback(this.$t(err,{ field : '' }));
                        }
                    });
                },
                //校验游玩项目分组
                validateEquipmentGroup : (rule,value,callback) => {
                    if (value && value.length > 0) {
                        callback();
                    } else {
                        callback(this.$t('selectField', { msg : this.$t('addProjectGroup') }));
                    }
                },
                //校验每日可游玩次数和l累计可游玩次数
                timesCheck : (rule, value, callback) => {
                    this.formData.playPoint.forEach(item => {
                        if (item.dayTimes > item.sumTimes) {
                            callback(this.$t('sumBiggerThenDaySum'));
                        } else {
                            callback();
                        }
                    });
                },
                requiredItemCheck : (rule, value, callback) => {
                    if (this.formData.playPoint.filter(item => item.playType === 'required').length >=
                        Number(this.formData.itemCheckTimes)) {
                        callback(this.$t('requiredBiggerThanItemCheckTimes'));
                    } else {
                        callback();
                    }
                },
            };
            return {
                //记录修改的数据
                index : null,
                //类型 add/modify/check
                type : 'add',
                //标题信息
                title : this.$t('add') + this.$t('oneTicketPark'),
                //是否显示模态框
                visible : false,
                //确认执行的回调函数
                confirmCallback : null,
                //取消执行的回调函数
                cancelCallback : null,
                //表单数据
                formData : {
                    parkName : '',
                    parkId : '',//选择园区
                    saleType : 'one_ticket',//售票方式
                    //入园核销
                    checkPoint : [], //可游玩园区表格数据 核销设备点 数组
                    gardenGroupIds : [],//核销设备分组ID
                    effDay : '1',
                    effTimes : '1',
                    fingerCheck : false,//其他设置
                    //游玩项目
                    itemCheckTimes : 0,//项目游玩总次数itemCheckTimes
                    equipmentGroupIds : [],//游玩项目分组ID-多个逗号分隔
                    playPoint : [],//项目分组表格数据(核销分组下的核销设备列表数据) 游玩项目点 数组
                    admissionInstructions : '',
                },
                //枚举数据
                enumData : {
                    //售票方式
                    saleType : Array.from(saleType),
                    //设备分组
                    group : [],
                    //认证方式
                    authenticationType : authenticationType,
                },
                //入园检票处表头
                distributeColumnHead : distributeColumnHead,
                //查看表头
                viewDistributeColumnHead : viewDistributeColumnHead,
                //项目分组表头
                proGroupColumnHead : proGroupColumnHead,
                //复制数据，用于修改初次赋值
                copyData : {},
                //已选择的园区列表数据
                chosedParkList : [],
                //表单校验方法
                validateMethod : validateMethod,
            };
        },
        computed : {
            //可选园区列表数据
            optionalParkList () {
                return this.parkList.filter(park => {
                    return !this.chosedParkList.find(item => {
                        return item.parkId === park.id;
                    });
                });
            },
            ruleValidate () {
                return {
                    parkId : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('choosePark') }), trigger : 'change' }, // 不能为空
                    ],
                    saleType : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('saleType') }), trigger : 'change' },
                    ],
                    equipmentGroupIds : [
                        { validator : this.validateMethod.validateEquipmentGroup, trigger : 'change' }
                    ],
                    effTimes : [
                        { max : 10, message : this.$t('errorMaxLength', { field : '', length : 10 }), trigger : 'blur' },
                        { validator : this.validateMethod.emoji, trigger : 'blur' },
                        { validator : this.validateMethod.validateTimes, trigger : 'blur' }
                    ],
                    itemCheckTimes : [
                        { required : true, message : this.$t('errorEmpty', { msg : this.$t('projectTotalTimes') }), trigger : 'blur' },
                        { type : 'string', max : 10, message : this.$t('errorMaxLength', { field : this.$t('projectTotalTimes'), length : 10 }), trigger : 'blur' },
                        { validator : this.validateMethod.emoji, trigger : 'blur' },
                        { validator : this.validateMethod.validateNumber, trigger : 'blur' },
                    ],
                    timesCheck : [
                        { validator : this.validateMethod.timesCheck, trigger : 'change' },
                        { validator : this.validateMethod.requiredItemCheck, trigger : 'change' },
                    ],
                    admissionInstructions : []
                };
            }
        },
        methods : {
            /**
             * 显示 模态框
             * @param index 当前修改的产品序号
             * @param list  已选择的园区列表
             * @param parkList 所有园区列表
             * @param data  当前修改的产品数据
             * @param type  当前模态框的状态，新增、修改、查看
             * @param title 模态框的标签
             * @param confirmCallback 确认回调方法
             * @param cancelCallback 取消回调方法
             */
            show ({ index, chosedParkList, data, type, title, confirmCallback = null, cancelCallback }) {
                this.title = title;
                this.type = type;
                this.index = index;
                //赋值已选择的园区列表数据，更新可选择的园区列表数据
                if (chosedParkList) {
                    this.chosedParkList = chosedParkList;
                }
                if (data) {
                    //从已选择园区列表中过滤掉当前查看或修改的园区
                    this.chosedParkList = chosedParkList.filter(item => {
                        return item.parkId !== data.parkId;
                    });
                    //备份数据初始化
                    this.dataBackup(data);
                    //表单数据初始化
                    this.formData = defaultsDeep({}, this.copyData);
                    //查询景区下的核销设备组
                    this.getOrgGroupList({ id : data.parkId });
                }
                if (this.ticketDetail.productEffSet === 'same_to_policy') {
                    this.formData.effDay = '';
                }
                if (confirmCallback && typeof confirmCallback == 'function') {
                    this.confirmCallback = confirmCallback;
                }
                if (cancelCallback && typeof cancelCallback == 'function') {
                    this.cancelCallback = cancelCallback;
                }
                this.visible = true;
            },
            /**
             *  北备用数据准备
             *  @param data
             */
            dataBackup (data) {
                //准备备用数据
                this.copyData = defaultsDeep({}, data);
                //指纹验证是否开启
                if (data.fingerCheck == 'true' || data.fingerCheck === true) {
                    this.copyData.fingerCheck = true;
                } else {
                    this.copyData.fingerCheck = false;
                }
                //数字转字符串
                this.copyData.effDay = data.effDay ? String(data.effDay) : '0';
                this.copyData.effTimes = data.effTimes ? String(data.effTimes) : '0';
                //字符串转数组
                this.copyData.playPoint.forEach( item => {
                    item.sumTimes = item.sumTimes ? Number(item.sumTimes) : 0;
                    item.dayTimes = item.dayTimes ? Number(item.dayTimes) : 0;
                });
                //核销设备分组ID、游玩项目分组ID初始化
                this.copyData.gardenGroupIds = data.gardenGroupIds ? data.gardenGroupIds.split(',') : [];
                this.copyData.equipmentGroupIds = data.equipmentGroupIds ? data.equipmentGroupIds.split(',') : [];
            },
            /**
             * 查询核销设备组
             * @param data
             */
            getOrgGroupList ( data ) {
                ajax.post('getOrgGroupList', {
                    orgId : data.id,
                    groupType : 'check',
                }).then(res => {
                    if (res.success) {
                        this.enumData.group = res.data || [];
                    } else {
                        this.enumData.group = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             *  重新选择园区，联动查询设备分组
             *  @param val
             */
            selectParkChange ( val ) {
                let obj = this.optionalParkList.find( item => val === item.id );
                if (obj) {
                    this.formData.parkName = obj.orgName;
                    this.getOrgGroupList(obj);
                }
            },
            /**
             *  售票方式改变
             *  @param val 当前选择的售票方式
             */
            changeSaleType ( val ) {
                //根据选择的售票方式设置模态框的标题 -- 修改/新增，一票制/多票制
                if (val === 'one_ticket') {
                    this.title = this.$t(this.type) + this.$t('oneTicketPark');
                } else {
                    this.title = this.$t(this.type) + this.$t('moreTicketPark');
                }
                //售票方式发生变化时，重置对应的表单
                this.$nextTick(() => {
                    let fromRef = '';
                    if (this.formData.saleType === 'one_ticket') {
                        fromRef = 'oneTicketFormValidate';
                    } else if (this.formData.saleType === 'assort') {
                        fromRef = 'moreTicketFormValidate';
                    } else {
                        fromRef = '';
                    }
                    if (fromRef) {
                        this.$refs[fromRef].fields.forEach((e) => {
                            e.resetField();
                        });
                    }
                });
            },
            /**
             *  设备分组改变
             *  @param val
             */
            changeEquipmentGroup ( val ) {
                if (val && val.length > 0) {
                    val.forEach( value => {
                        let obj = this.enumData.group.find( item => value === item.id );
                        if (obj) {
                            this.getCheckItems(obj, 'checkPoint');
                        }
                    });
                } else {
                    this.formData.checkPoint = [];
                }
            },
            /**
             *  项目分组改变
             *  @param val
             */
            changeProjectGroup ( val ) {
                if (val && val.length > 0) {
                    val.forEach( value => {
                        let obj = this.enumData.group.find( item => value === item.id );
                        if (obj) {
                            this.getCheckItems(obj, 'playPoint');
                        }
                    });
                } else {
                    this.formData.playPoint = [];
                }
            },
            /**
             * 获取核销分组下的核销设备
             * @param data
             * @param type checkPoint -- 设备分组改变 playPoint -- 项目分组改变
             */
            getCheckItems ( data, type ) {
                ajax.post('getCheckItems', {
                    orgId : data.orgId,
                    groupIds : data.id,
                }).then(res => {
                    if (res.success) {
                        if (res.data && res.data.length > 0) {
                            if (type === 'playPoint') {
                                //游玩项目数据
                                this.formData.playPoint = this.formData.playPoint.concat(res.data.filter(item => {
                                    return this.formData.playPoint.findIndex(oldItem => {
                                        return oldItem.checkId === item.partnerId;
                                    }) < 0;
                                }).map(item => {
                                    return {
                                        id : '',
                                        parkId : this.formData.parkId,
                                        checkId : item.partnerId,
                                        channelName : item.channelName,
                                        checkType : "equipment",
                                        playType : "optional",//默认可玩
                                        sumTimes : 0,
                                        dayTimes : 0,
                                    }
                                }));
                            } else {
                                //入园检票处表格数据
                                this.formData.checkPoint = this.formData.checkPoint.concat(res.data.filter(item => {
                                    return this.formData.checkPoint.findIndex(oldItem => {
                                        return oldItem.checkId === item.partnerId;
                                    }) < 0;
                                }).map(item => {
                                    return {
                                        id : '',
                                        channelName : item.channelName,
                                        parkId : this.formData.parkId,
                                        checkId : item.partnerId,
                                        checkType : "garden",
                                        status : 'valid',
                                    }
                                }));
                            }
                        }
                    } else {
                        this.formData.playPoint = [];
                        this.formData.checkPoint = [];
                        this.$Message.error(res.message || this.$t('fail'));
                    }
                });
            },
            /**
             *  重置数据
             */
            resetFunc () {
                this.formData = {
                    parkName : '',
                    parkId : '',
                    saleType : 'one_ticket',
                    //入园核销
                    checkPoint : [],
                    effDay : '1',
                    effTimes : '1',
                    gardenGroupIds : [],
                    fingerCheck : true,
                    //游玩项目
                    playPoint : [],
                    itemCheckTimes : 0,
                    equipmentGroupIds : [],
                };
                this.enumData = {
                    //售票方式
                    saleType : Array.from(saleType),
                    //设备分组
                    group : [],
                    //认证方式
                    authenticationType : authenticationType,
                };
                this.formData.playPoint = [];
                this.formData.checkPoint = [];
                this.chosedParkList = [];
            },
            /**
             *  启用
             *  @param data
             *  @param index
             */
            startUse ( data, index ) {
                this.$Message.success(this.$t('commissioned') + this.$t('success'));
                this.formData.checkPoint[index].status = 'valid';
            },
            /**
             *  禁用
             *  @param data
             *  @param index
             */
            disabled ( data, index ) {
                this.$Message.success(this.$t('disabled') + this.$t('success'));
                this.formData.checkPoint[index].status = 'invalid';
            },
            /**
             *  设为可玩
             *  @param data
             *  @param index
             */
            setAblePlay ( data, index ) {
                let params = defaultsDeep({},this.formData.playPoint[index]);
                params.playType = 'optional';
                this.formData.playPoint.splice(index,1);
                this.formData.playPoint.push(params);
                this.$Message.success(this.$t('setAblePlay') + this.$t('success'));
            },
            /**
             *  设为必玩
             *  @param data
             *  @param index
             */
            setMustPlay ( data, index ) {
                let params = defaultsDeep({},this.formData.playPoint[index]);
                params.playType = 'required';
                this.formData.playPoint.splice(index,1);
                this.formData.playPoint.unshift(params);
                this.$Message.success(this.$t('setMustPlay') + this.$t('success'));
            },
            /**
             * 确认
             */
            confirm () {
                let fromRef = '';
                if (this.formData.saleType === 'one_ticket') {
                    fromRef = 'oneTicketFormValidate';
                } else if (this.formData.saleType === 'assort') {
                    fromRef = 'moreTicketFormValidate';
                }
                if (fromRef) {
                    this.$refs[fromRef].validate((valid) => {
                        if ( valid ) {
                            //校验产品有效性设置与游玩规则数据
                            if (this.ticketDetail.productEffSet === 'since_the_play' && (this.formData.effDay == '' || this.formData.effDay == 0)) {
                                this.$Message.warning(this.$t('inputField', { field : this.$t('effectiveDays') }));
                                return;
                            }
                            this.loading = true;
                            if (this.confirmCallback) {
                                let formData = defaultsDeep({},this.formData);
                                formData.gardenGroupIds = this.formData.gardenGroupIds.join(',');
                                formData.equipmentGroupIds = this.formData.equipmentGroupIds.join(',');
                                this.confirmCallback( formData, this.index );
                                this.cancel();
                            }
                        }
                    });
                }
            },
            /**
             * 取消
             */
            cancel () {
                this.visible = false;
                if (this.$refs.oneTicketFormValidate) {
                    this.$refs.oneTicketFormValidate.resetFields();
                }
                if (this.$refs.moreTicketFormValidate) {
                    this.$refs.moreTicketFormValidate.resetFields();
                }
                if (this.cancelCallback) {
                    this.cancelCallback();
                }
                this.resetFunc();
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';

    .edit-park-modal {
        & /deep/ .ivu-modal {
            width: 740px !important;
            min-height: 580px;
        }

        .target-class {
            height: 23px;
            line-height: 23px;

            .title {
                font-size: 14px;
                color: #354052;
                letter-spacing: 1px;
                text-align: left;
                display: inline-block;
                width: 100%;
                @include overflow_tip(100%);
            }
        }

        & /deep/ .ivu-modal-header {
            padding: 12px 30px;
        }

        & /deep/ .ivu-modal-close {
            top: 7px;
        }

        & /deep/ .ivu-modal-body {
            padding: 0;
            position: relative;
            @include block_outline();
        }

        /deep/ .ivu-modal-footer {
            text-align: center;
        }

        .content-info {
            @include block_outline();
            font-size: $font_size_14px;
            color: $color_333;
            padding: 25px 40px;
            text-align: left;
            overflow: auto;

            /deep/ .ivu-form {
                @include block_outline();
                margin: 0 auto;
            }

            /deep/ .ivu-form-item-content {
                line-height: 22px;

                /deep/ .quill-editor {
                    height: 300px;

                    .ql-container {
                        height: calc(100% - 70px);
                    }
                }
            }

            .edit-form-item {
                width: 100%;
                /deep/ .ivu-form-item-content {
                    height: 570px;
                    margin-left: 0 !important;
                }
            }

            /deep/ .ivu-input-wrapper{
                width: 280px;
                &.short-input{
                    width: 90px;
                    vertical-align: middle;
                }
            }

            /deep/ .ivu-input-number{
                font-size: $font_size_14px;
                width: 110px;
                color: #333333;
            }

            /deep/ .ivu-select{
                width: 280px;
            }

            /deep/ .ivu-input{
                font-size: $font_size_14px;
            }

            /deep/ .ivu-select-placeholder{
                font-size: $font_size_14px;
            }

            /deep/ .ivu-checkbox{
                margin-right: 5px;
            }

            .table-wrap{
                padding-bottom: 15px;
            }

            .iconfont{
                margin-left: 8px;
                font-size: $font_size_14px;
                color: $color_gray;
            }

            .notice{
                font-size: $font_size_12px;
                color: $color_999;
                display: inline-block;
                width: calc(100% - 300px);
                line-height: 14px;
                padding-left: 8px;
            }

            .example{
                float: right;
                color: $color_blue;
                cursor: pointer;
            }

        }

        .must-span{
            position: absolute;
            left: -6px;
            bottom: 0;

            &.iconfont{
                font-size: 22px;
                color: $color_F7981C_080;
            }
        }

    }

    .span-yellow{
        color: $color_yellow !important;
    }

</style>

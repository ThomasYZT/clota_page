<!--
内容：业主卡 - 副卡
作者：djc
日期：
-->

<template>
    <div class="">
        <h3>{{$t('副卡')}}</h3>
        <table-com
            :show-pagination="false"
            :column-data="columnData"
            :table-data="tableData"
            :table-com-min-height="250"
            :border="true">
            <el-table-column
                slot="column1"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Input v-model.trim="scope.row.name"
                           :placeholder="$t('inputField', {field: ''})"/>
                </template>
            </el-table-column>
            <el-table-column
                slot="column2"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Input v-model.trim="scope.row.mobilePhone"
                           :placeholder="$t('inputField', {field: ''})"/>
                </template>
            </el-table-column>
            <el-table-column
                slot="column3"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Select v-model="scope.row.gender" transfer
                            :placeholder="$t('selectField', {msg: ''})">
                        <Option v-for="(item,index) in genderEnum" :key="index"
                                :value="item.name">
                            {{$t(item.desc)}}
                        </Option>
                    </Select>
                </template>
            </el-table-column>
            <el-table-column
                slot="column4"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Select v-model="scope.row.credentialsType" transfer
                            :placeholder="$t('selectField', {msg: $t('credentialsType')})"><!--请选择证件类型-->
                        <Option v-for="item in idType" :key="item.id"
                                :value="item.id">
                            {{$t(item.name)}}
                        </Option>
                    </Select>
                </template>
            </el-table-column>
            <el-table-column
                slot="column5"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Input v-model.trim="scope.row.identificationNum"
                           :placeholder="$t('inputField', {field: ''})"/>
                </template>
            </el-table-column>
            <el-table-column
                slot="column6"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <Date-picker
                        type="date"
                        v-model="scope.row.birthday"
                        :options="dateOption"
                        :editable="false"
                        format="yyyy-MM-dd"
                        transfer
                        :placeholder="$t('selectField', {msg: ''})">
                    </Date-picker>
                </template>
            </el-table-column>
            <el-table-column
                slot="column7"
                slot-scope="row"
                :label="row.title"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <span>{{$t('支付密码')}}</span>
                </template>
            </el-table-column>

            <el-table-column
                slot="column8"
                slot-scope="row"
                :label="row.title"
                fixed="right"
                :width="row.width"
                :min-width="row.minWidth">
                <template slot-scope="scope">
                    <ul class="operate-list">
                        <li class="red-label"
                            @click="">{{$t('清除')}}
                        </li>
                    </ul>
                </template>
            </el-table-column>
        </table-com>
    </div>
</template>
<script type="text/ecmascript-6">
    import { secondaryCardHead } from './newCardConfig';
    import { genderEnum } from '@/assets/js/constVariable';
    import tableCom from '@/components/tableCom/tableCom.vue';

    export default {
        components: {
            tableCom
        },
        props: {
            idType: Array
        },
        data() {
            return {
                // 表头配置
                columnData: secondaryCardHead,
                // 表格数据
                tableData: [
                    {
                        index: '1',
                        name: '',
                        mobilePhone: '',
                        gender: '',
                        credentialsType: '',
                        identificationNum: '',
                        birthday: '',
                        payPwd: '',
                    }
                ],
                // 性别枚举
                genderEnum: genderEnum,
                dateOption: {
                    disabledDate: function (value) {
                        return value && ( value.format('yyyy-MM-dd') < '1900-01-01' || value.format('yyyy-MM-dd') > new Date().format('yyyy-MM-dd'));
                    }
                },
            }
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="scss">

</style>

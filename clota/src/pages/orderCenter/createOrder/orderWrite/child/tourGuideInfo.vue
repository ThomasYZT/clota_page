<!--团队导游信息-->

<template>
    <div class="guide-info">
        <div class="title">
            导游信息
            <Button type="ghost"
                    class="ivu-btn-108px"
                    :disabled="selectedTourGuideInfo.length < 1"
                    @click="delTourGuide">批量删除</Button>
            <Button type="primary"
                    class="ivu-btn-108px"
                    @click="addTourGuide">添加导游</Button>
        </div>

        <Form ref="formInline" >
            <table-com
                border
                ref="table"
                :column-data="columnData"
                :table-data="tableData"
                :auto-height="true"
                :table-com-min-height="250"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="column0"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    type="selection"
                    :selectable="selectableFunc"
                    slot-scope="row">
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    slot="column1"
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.editType === 'edit'">
                            <FormItem :prop="'name' + scope.$index" :rules="rules.name(scope.row)">
                                <Input type="text" v-model.trim="scope.row.name" />
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row[row.field]}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column2"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.editType === 'edit'">
                            <FormItem :prop="'idCard' + scope.$index" :rules="rules.idCard(scope.row)">
                                <Input type="text" v-model.trim="scope.row.idNum" />
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row[row.field]}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column3"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.editType === 'edit'">
                            <FormItem :prop="'phone' + scope.$index" :rules="rules.phone(scope.row)">
                                <Input type="text" v-model.trim="scope.row.phone" />
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row[row.field]}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    slot="column4"
                    slot-scope="row"
                    show-overflow-tooltip
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <ul class="operate-list">
                            <template v-if="scope.row.editType !== 'edit'">
                                <li @click="modifyInfo(scope.$index)" >{{$t('modify')}}</li>
                                <li class="red-label" @click="delIdInfo(scope.$index)">{{$t('del')}}</li>
                            </template>
                            <template v-else>
                                <li @click="saveCardInfo(scope.$index)">{{$t('save')}}</li>
                                <li class="cancel" @click="cancelEdit(scope.$index)">{{$t('cancel')}}</li>
                            </template>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </Form>
        <!--删除导游模态框-->
        <del-modal ref="delModal" class="del-modal-lift">
            <ul class="pro-list">
                <li class="detail">
                    <span class="content-text">
                        {{$t('isDoing')}}{{$t('delete')}}导游：
                        <span class="yellow-label">{{delingTouristInfo.data}}</span>
                        <span v-if="delingTouristInfo.showMore">等</span>
                    </span>
                </li>
                <li class="detail">
                    <span><span class="red-label">{{$t('irreversible')}}</span>，{{$t('continueYesRoNo')}}？</span>
                </li>
                <li class="hint">
                    <Icon type="help-circled"></Icon>
                </li>
            </ul>
        </del-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './tourGuideConfig';
    import ajax from '@/api/index.js';
    import {idType} from '@/assets/js/constVariable.js';
    import {validator} from 'klwk-ui';
    import delModal from '@/components/delModal/index.vue';
    export default {
        components : {
            tableCom,
            delModal
        },
        data() {
            //校验证件号码
            const validateIdCard = (rule,value,callback) => {
                if(rule.rowData.idNum){
                    if(rule.rowData.idNum.length > 100){
                        callback(this.$t('errorMaxLength', { field : this.$t('identificationNum'), length : 100}));
                    }else{
                        this.validateIdCardNumIsExist(rule.rowData).then(() => {
                            callback();
                        }).catch(() => {
                            callback('证件已存在');
                        });
                    }
                }else{
                    callback('请输入证件号');
                }
            };
            //校验导游姓名
            const validateName = (rule,value,callback) => {
                if(rule.rowData.name){
                    if(rule.rowData.name.length > 20){
                        callback(this.$t('errorMaxLength', { field : this.$t('name'), length : 20}));
                    }else{
                        callback();
                    }
                }else{
                    callback('请输入姓名');
                }
            };
            //校验手机号
            const validatePhone = (rule,value,callback) => {
                if(rule.rowData.phone){
                    if(validator.isMobile(rule.rowData.phone)){
                        callback();
                    }else {
                        callback(this.$t('errorFormat', { field : this.$t('mobilePhone')}));
                    }
                }else{
                    callback('请输入手机号');
                }
            };
            return {
                //表头配置
                columnData : columnData,
                //表格数据
                tableData : [],
                //选择的导游信息
                selectedTourGuideInfo : [],
                //校验规则
                rules : {
                    idCard (rowData) {
                        return [
                            {validator : validateIdCard,trigger: 'blur',rowData : rowData}
                        ]
                    },
                    name (rowData) {
                        return [
                            {validator : validateName,trigger : 'blur',rowData : rowData}
                        ];
                    },
                    phone (rowData) {
                        return [
                            {validator : validatePhone,trigger : 'blur',rowData : rowData}
                        ];
                    }
                },
                //修改导游信息时，保存原始数据
                originalTableData : [],
            }
        },
        methods: {
            /**
             * 选择的导游信息
             * @param val
             */
            handleSelectionChange(val) {
                this.selectedTourGuideInfo = val;
            },
            /**
             * 添加导游
             */
            addTourGuide () {
                this.tableData.push({
                    editType : 'edit',
                    name : '',
                    idNum :'',
                    phone : '',
                    modifyType : 'add'
                });
            },
            /**
             * 校验证件是否已经存在
             * @param cardInfo
             */
            validateIdCardNumIsExist (cardInfo) {
                return new Promise((resolve,reject) => {
                    for(let i = 0,j = this.tableData.length;i < j;i++){
                        if(cardInfo !== this.tableData[i] && this.tableData[i]['idNum'] === cardInfo['idNum']){
                            reject();
                        }
                    }
                    resolve();
                });
            },
            /**
             * 修改导游信息
             * @param index
             */
            modifyInfo (index) {
                this.originalTableData[index] = JSON.parse(JSON.stringify(this.tableData[index]));
                this.$set(this.tableData[index],'editType','edit');
                this.$set(this.tableData[index],'modifyType','modify');
                this.$refs.table.toggleRowSelection(this.tableData[index]);
            },
            /**
             * 删除导游信息
             * @param index
             */
            delIdInfo (index) {
                this.tableData.splice(index,1);
                this.$Message.success('导游信息已删除');
            },
            /**
             * 保存导游信息
             * @param index
             */
            saveCardInfo (index) {
                //判断证件类型和证件号是否已经填写，并且需要判断证件号和证件类型是否已经填写过
                Promise.all([new Promise((resolve,reject) => {//校验导游姓名
                    this.$refs.formInline.validateField('name' + index,valid => {
                        if(valid){
                            reject();
                        }else{
                            resolve();
                        }
                    });
                }),new Promise((resolve,reject) => {//校验证件号码
                    this.$refs.formInline.validateField('idCard' + index,valid => {
                        if(valid){
                            reject();
                        }else{
                            resolve();
                        }
                    });
                }),new Promise((resolve,reject) => {//校验手机号码
                    this.$refs.formInline.validateField('phone' + index,valid => {
                        if(valid){
                            reject();
                        }else{
                            resolve();
                        }
                    });
                })]).then(() => {
                    this.$set(this.tableData[index],'editType','');
                });
            },
            /**
             * 取消保存
             * @param index
             */
            cancelEdit (index) {
                if(this.tableData[index]['modifyType'] === 'add'){
                    this.delIdInfo(index);
                }else{
                    this.$set(this.tableData,index,this.originalTableData[index]);
                }
            },
            /**
             * 批量删除导游
             */
            delTourGuide () {
                this.$refs.delModal.show({
                    title : this.$t('删除'),
                    confirmCallback : () => {
                        this.confirmDelTouristInfo();
                    }
                })
            },
            /**
             * 判断当前导游是否可以选择
             * @param row
             * @param index
             */
            selectableFunc (row,index){
                return row['editType'] !== 'edit'
            },
            /**
             * 确认删除导游信息
             */
            confirmDelTouristInfo () {
                for(let i = this.tableData.length,j = 0; i >= j;i--){
                    if(this.selectedTourGuideInfo.includes(this.tableData[i])){
                        this.tableData.splice(i,1);
                    }
                }
                this.$Message.success('导游信息已删除');
            },
            /**
             * 获取填写的导游信息
             */
            getTourGuideInfo () {
                return new Promise((resolve,reject) => {
                    let result = [];
                    for(let i = 0,j = this.tableData.length;i < j;i++){
                        if(this.tableData[i]['editType'] === 'edit'){
                            reject('tourguideErr');
                        }
                        result.push({
                            documentInfo : JSON.stringify({
                                data : this.tableData[i].idNum,
                                type : 'identity'
                            }),
                            phoneNumber : this.tableData[i].phone,
                            visitorName : this.tableData[i].name,
                            visitorType : 'driver',
                        });
                    }
                    resolve(result);
                });
            }
        },
        computed : {
            //将要删除的导游信息
            delingTouristInfo () {
                if(this.selectedTourGuideInfo.length > 2){
                    return {
                        data : this.selectedTourGuideInfo.map(item => item.name).slice(0,2).join(','),
                        showMore : true
                    }
                }else{
                    return {
                        data : this.selectedTourGuideInfo.map(item => item.name).slice(0,2).join(','),
                        showMore : false
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .guide-info{
        .title{
            position: relative;
            padding: 18px 30px;
            @include block_outline($height : 60px);
            font-size: $font_size_16px;
            color: $color_333;

            &::before{
                content : '';
                @include block_outline(absolute,2px);
                @include block_outline(4px,16px);
                background: $color_blue;
                display: inline-block;
                margin-right: 10px;
                vertical-align: middle;
            }

            .ivu-btn{
                float: right;
                margin-left: 8px;
            }
        }

        .ivu-form-item{
            margin-bottom: 0;
        }

        .el-table th.is-leaf, /deep/ .el-table td{
            padding: 8px 0;
        }

        /deep/ .ivu-form-item-error-tip{
            position: relative;
        }

        /deep/ .el-table td .cell{
            line-height: 30px;
        }


    }

    .pro-list{
        max-width: 100%;
        position: relative;

        .detail{
            line-height: 25px;
            @include overflow_tip();
        }

        .hint{
            content : '';
            @include absolute_pos(absolute,$top : 2px,$left : -20px);

            .ivu-icon-help-circled{
                font-size: $font_size_16px;
                color: $color_red;
            }
        }

        .yellow-label{
            color: $color_yellow;
        }

        .red-label{
            color: $color_red;
        }
    }
</style>

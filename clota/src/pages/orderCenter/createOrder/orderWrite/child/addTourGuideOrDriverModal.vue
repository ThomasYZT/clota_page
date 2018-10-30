<!--添加导游或司机模态框-->

<template>
    <Modal
        title="Title"
        :mask-closable="false"
        :value="value"
        :width="860"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="add-tourist-modal"
        class-name="vertical-center-modal">
        <div slot="header" class="target-class">
            <!--添加导游 or 添加司机-->
            <span class="title">{{modalType === 'guide' ? $t('addGuides') : $t('addDrivers')}}</span>
        </div>
        <Form ref="formInline">
            <div class="add-wrap">
                <span class="add-btn" @click="addTourist">
                    <!--新增导游 or 新增司机-->
                    <Icon type="ios-plus-empty"></Icon>{{modalType === 'guide' ? $t('addNewCourier') : $t('addDriver')}}
                </span>
            </div>
            <table-com
                ref="table"
                :column-data="columnData"
                :table-data="tableData"
                :height="450"
                @selection-change="handleSelectionChange">
                <el-table-column
                    slot="column0"
                    :label="row.title"
                    :prop="row.field"
                    :key="row.index"
                    :width="row.width"
                    :min-width="row.minWidth"
                    type="selection"
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
                            <FormItem :prop="'staffName' + scope.$index" :rules="rules.staffName(scope.row)">
                                <Input type="text" v-model.trim="scope.row.staffName" />
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
                                <Input type="text" v-model.trim="scope.row.documentNo" />
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row[row.field]}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="modalType === 'guide'"
                    slot="column3"
                    show-overflow-tooltip
                    slot-scope="row"
                    :label="row.title"
                    :width="row.width"
                    :min-width="row.minWidth">
                    <template slot-scope="scope">
                        <template v-if="scope.row.editType === 'edit'">
                            <FormItem :prop="'phoneNumber' + scope.$index" :rules="rules.phoneNumber(scope.row)">
                                <Input type="text" v-model.trim="scope.row.phoneNumber" />
                            </FormItem>
                        </template>
                        <template v-else>
                            {{scope.row[row.field]}}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                    :slot="modalType === 'guide' ? 'column4' : 'column3'"
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
                                <li @click="saveTourGuideInfo(scope.$index)">{{$t('save')}}</li>
                                <li class="cancel" @click="cancelEdit(scope.$index)">{{$t('cancel')}}</li>
                            </template>
                        </ul>
                    </template>
                </el-table-column>
            </table-com>
        </Form>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">{{$t('confirm')}}</Button>
            <Button type="ghost"
                    class="ivu-btn-90px"
                    @click="cancel">{{$t('cancel')}}</Button>
        </div>
    </Modal>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {tourColumnData,driverColumnData} from './addTourGuideConfig';
    import ajax from '@/api/index';
    import {validator} from 'klwk-ui';
    export default {
        props : {
            //绑定modal的v-modal值
            value : {
                type : Boolean,
                default : false
            },
            //模态框类别
            'modal-type' : {
                type : String,
                default : ''
            },
            //默认选中的信息
            'default-info' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            tableCom
        },
        data() {
            //校验导游姓名
            const validateName = (rule,value,callback) => {
                if(rule.rowData.staffName){
                    if(rule.rowData.staffName.length > 20){
                        callback(this.$t('errorMaxLength', { field : this.$t('name'), length : 20}));
                    }else{
                        callback();
                    }
                }else{
                    callback(this.$t('inputField', {field: this.$t('name')}));      // 请输入姓名
                }
            };
            //校验手机号
            const validatePhone = (rule,value,callback) => {
                if(rule.rowData.phoneNumber){
                    if(validator.isMobile(rule.rowData.phoneNumber)){
                        callback();
                    }else {
                        callback(this.$t('errorFormat', { field : this.$t('mobilePhone')}));
                    }
                }else{
                    callback(this.$t('inputField', {field: this.$t('mobilePhone')}));  // '请输入手机号'
                }
            };
            //校验证件号码
            const validateIdCard = (rule,value,callback) => {
                if(rule.rowData.documentNo){
                    if(rule.rowData.documentNo.length > 100){
                        callback(this.$t('errorMaxLength', { field : this.$t('identificationNum'), length : 100}));
                    }else{
                        this.validateIdCardNumIsExist(rule.rowData).then(() => {
                            callback();
                        }).catch(() => {
                            callback(this.$t('existID'));   // 证件已存在
                        });
                    }
                }else{
                    callback(this.$t('inputField', {field: this.$t('IdentificationNumber')}));     // 请输入证件号
                }
            };
            return {
                //表格数据
                tableData : [],
                //选中的导游信息
                selectedTouristInfo : [],
                //校验规则
                rules : {
                    idCard (rowData) {
                        return [
                            {validator : validateIdCard,trigger: 'blur',rowData : rowData}
                        ]
                    },
                    staffName (rowData) {
                        return [
                            {validator : validateName,trigger : 'blur',rowData : rowData}
                        ];
                    },
                    phoneNumber (rowData) {
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
             * 模态框状态改变
             */
            changeValue(data) {
                this.$emit('input', data);
            },
            /**
             * 模态框显示或隐藏
             * @param type
             */
            visibleChange(type) {
                if(type === true){
                    this.queryPagedOrgStaff();
                }
            },
            /**
             * 取消新增
             */
            cancel () {
                this.$emit('input', false);
            },
            /**
             * 新增导游
             */
            addTourist () {
                this.tableData.push({
                    editType : 'edit',
                    staffName : '',
                    documentNo :'',
                    phoneNumber : '',
                    modifyType : 'add'
                });
            },
            /**
             * 获取选择的导游信息
             * @param data
             */
            handleSelectionChange (data) {
                this.selectedTouristInfo = data;
            },
            /**
             * 修改导游信息
             * @param index
             */
            modifyInfo (index) {
                this.originalTableData[index] = JSON.parse(JSON.stringify(this.tableData[index]));
                this.$set(this.tableData[index],'editType','edit');
                this.$set(this.tableData[index],'modifyType','modify');
            },
            /**
             * 删除导游信息
             * @param index
             */
            delIdInfo (index) {
                this.delOrgStaff(this.tableData[index]['id'],index);
            },
            /**
             * 保存游客信息
             * @param index
             */
            saveTourGuideInfo (index) {
                //判断证件号是否已经填写，并且需要判断证件号和证件类型是否已经填写过
                Promise.all([new Promise((resolve,reject) => {//校验导游姓名
                    this.$refs.formInline.validateField('staffName' + index,valid => {
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
                    if(this.modalType === 'guide'){
                        this.$refs.formInline.validateField('phoneNumber' + index,valid => {
                            if(valid){
                                reject();
                            }else{
                                resolve();
                            }
                        });
                    }else if(this.modalType === 'driver'){
                        resolve();
                    }
                })]).then(() => {
                    this.addOrUpdateOrgStaff({
                        id : this.tableData[index]['id'],
                        staffName : this.tableData[index]['staffName'],
                        documentNo : this.tableData[index]['documentNo'],
                        phoneNumber :this.tableData[index]['phoneNumber'],
                    }).then(res => {
                        if(res.success){
                            this.$set(this.tableData[index],'editType','');
                            this.$Message.success( this.$t('successTip', {tip: this.$t('saveGuideInfo')}) );    // 保存导游信息成功
                            this.freshData(index,'modify');
                        }else{
                            this.$Message.error( this.$t('failureTip', {tip: this.$t('saveGuideInfo')}) );    // 保存导游信息失败
                        }
                    });
                });
            },
            /**
             * 取消保存
             * @param index
             */
            cancelEdit (index) {
                if(this.tableData[index]['modifyType'] === 'add'){
                    this.tableData.splice(index,1);
                }else{
                    this.$set(this.tableData,index,this.originalTableData[index]);
                }
            },
            /**
             * 确认添加导游
             */
            confirm () {
                this.$emit('set-info',this.selectedTouristInfo);
                this.cancel();
            },
            /**
             * 查询导游或司机信息
             */
            queryPagedOrgStaff () {
                ajax.post('queryPagedOrgStaff',{
                    keyword : '',
                    staffType : this.modalType,
                    pageNo : 1,
                    pageSize : 9999
                }).then(res => {
                    if(res.success){
                        this.tableData = res.data ? res.data.data : [];
                        this.setDefaultChosed();
                    }else{
                        this.tableData = [];
                    }
                });
            },
            /**
             * 新增或 编辑导游信息
             * @param id
             * @param staffName 导游姓名
             * @param documentNo 证件号
             * @param phoneNumber 手机号
             */
            addOrUpdateOrgStaff ({id,staffName,documentNo,phoneNumber}) {
                return ajax.post('addOrUpdateOrgStaff',{
                    id : id,
                    staffName : staffName,
                    staffType : this.modalType,
                    documentType : this.documentType,
                    documentNo : documentNo,
                    phoneNumber : phoneNumber,
                });
            },
            /**
             * 校验证件是否已经存在
             * @param cardInfo
             */
            validateIdCardNumIsExist (cardInfo) {
                return new Promise((resolve,reject) => {
                    for(let i = 0,j = this.tableData.length;i < j;i++){
                        if(cardInfo !== this.tableData[i] && this.tableData[i]['documentNo'] === cardInfo['documentNo']){
                            reject();
                        }
                    }
                    resolve();
                });
            },
            /**
             * 设置默认选中
             */
            setDefaultChosed () {
                this.$nextTick(() => {
                    for(let i = 0,j = this.defaultInfo.length;i < j;i++){
                        for(let a = 0,b = this.tableData.length;a < b;a++){
                            if(this.tableData[a]['id'] === this.defaultInfo[i]['id']){
                                this.$refs.table.toggleRowSelection(this.tableData[a]);
                            }
                        }
                    }
                });
            },
            /**
             * 删除导游或司机
             * @param id
             * @param index
             */
            delOrgStaff (id,index) {
                ajax.post('batchDeleteOrgStaff',[
                    {
                        id : id
                    }
                ],
                {
                    headers : {
                        'Content-Type' : 'application/json;charset-UTF-8'
                    }
                }).then(res => {
                    if(res.success){
                        if(this.modalType === 'guide'){
                            this.$Message.success(this.$t('deletedField', {field: this.$t('courierInfo')}));      // 导游信息已删除
                        }else if(this.modalType === 'driver'){
                            this.$Message.success(this.$t('deletedField', {field: this.$t('driverInfo')}));   // 司机信息已删除
                        }
                        this.freshData(index,'del');
                        this.queryPagedOrgStaff();
                    }else{
                        this.$Message.error(this.$t('failureTip', {tip: this.$t('del')}));    // 删除失败
                    }
                });
            },
            /**
             * 根据修改的信息是否已选择判断是否传递数据给上一个组件
             * @param index 数据序号
             * @param type 操作类型
             */
            freshData (index,type) {
                this.$emit('modify-data',{
                    data :this.tableData[index],
                    type : type
                });
            },

        },
        computed : {
            //证件类型
            documentType () {
                if(this.modalType === 'guide'){
                    return 'id';
                }else if(this.modalType === 'driver'){
                    return 'license';
                }
            },
            //表头配置
            columnData () {
                if(this.modalType === 'guide'){
                    return tourColumnData;
                }else if(this.modalType === 'driver'){
                    return driverColumnData;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .add-tourist-modal{

        /deep/ .table-com{
            border-top: 1px solid #ebeef5;

            .el-table th{
                padding: 8px 0;
            }

            .ivu-form-item-content{
                line-height: 30px;
            }

            .el-table td{
                padding: 4px 0;

                .cell{
                    line-height: 31px;
                }
            }

            .ivu-form-item-error-tip{
                position: relative;
            }
        }

        .add-wrap{
            height: 50px;
            padding: 20px 0 12px;

            .add-btn{
                line-height: 18px;
                font-size: $font_size_14px;
                color: $color_blue;
                cursor: pointer;
                display: inline-flex;
                flex-direction: row;
                align-items: center;

                /deep/ .ivu-icon-ios-plus-empty{
                    margin-right: 10px;
                    font-size: $font_size_18px;
                }
            }
        }

        /deep/ .ivu-modal-body{
            padding: 0 28px;
        }

        /deep/ .ivu-form{
            height: 500px;
        }

        .ivu-form-item{
            margin-bottom: 0;
        }


    }
</style>

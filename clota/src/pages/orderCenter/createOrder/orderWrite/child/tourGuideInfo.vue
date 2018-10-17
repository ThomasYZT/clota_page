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
        <!--添加导游模态框-->
        <add-tour-guide-or-driver-modal v-model="addTourGideShow"
                                        modal-type="guide"
                                        :default-info="tableData"
                                        @set-info="getChosedInfo"
                                        @modify-data="modifyChoosedData">
        </add-tour-guide-or-driver-modal>
    </div>
</template>

<script>
    import tableCom from '@/components/tableCom/tableCom.vue';
    import {columnData} from './tourGuideConfig';
    import ajax from '@/api/index.js';
    import {idType} from '@/assets/js/constVariable.js';
    import {validator} from 'klwk-ui';
    import delModal from '@/components/delModal/index.vue';
    import {mapGetters} from 'vuex';
    import addTourGuideOrDriverModal from './addTourGuideOrDriverModal';
    export default {
        components : {
            tableCom,
            delModal,
            addTourGuideOrDriverModal
        },
        data() {
            //校验证件号码
            const validateIdCard = (rule,value,callback) => {
                if(rule.rowData.documentNo){
                    if(rule.rowData.documentNo.length > 100){
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
                if(rule.rowData.staffName){
                    if(rule.rowData.staffName.length > 20){
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
                if(rule.rowData.phoneNumber){
                    if(validator.isMobile(rule.rowData.phoneNumber)){
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
                //添加导游模态框是否显示
                addTourGideShow : false,
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
                //旅行社下单，直接从保存的导游信息中添加导游
                if(this.manageOrgs.nodeType === 'partner'){
                    this.addTourGideShow = true;
                }else if(this.manageOrgs.nodeType === 'scenic'){
                    this.tableData.push({
                        editType : 'edit',
                        staffName : '',
                        documentNo :'',
                        phoneNumber : '',
                        modifyType : 'add'
                    });
                }
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
             * 修改导游信息
             * @param index
             */
            modifyInfo (index) {
                this.originalTableData[index] = JSON.parse(JSON.stringify(this.tableData[index]));
                this.$set(this.tableData[index],'editType','edit');
                this.$set(this.tableData[index],'modifyType','modify');
                //设置已经选择的导游在模态框中默认选中
                if(this.selectedTourGuideInfo.includes(this.tableData[index])){
                    this.$refs.table.toggleRowSelection(this.tableData[index]);
                }
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
                    this.$refs.formInline.validateField('phoneNumber' + index,valid => {
                        if(valid){
                            reject();
                        }else{
                            resolve();
                        }
                    });
                })]).then(() => {
                    //景区直接保存修改结果，旅行社需要保存到数据库中
                    if(this.manageOrgs.nodeType === 'partner'){
                        this.addOrUpdateOrgStaff({
                            id : this.tableData[index]['id'],
                            staffName : this.tableData[index]['staffName'],
                            documentNo : this.tableData[index]['documentNo'],
                            phoneNumber : this.tableData[index]['phoneNumber'],
                            index : index
                        });
                    }else if(this.manageOrgs.nodeType === 'scenic'){
                        this.$set(this.tableData[index],'editType','');
                    }
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
                                data : this.tableData[i].documentNo,
                                type : 'identity'
                            }),
                            phoneNumber : this.tableData[i].phoneNumber,
                            visitorName : this.tableData[i].staffName,
                            visitorType : 'driver',
                        });
                    }
                    resolve(result);
                });
            },
            /**
             * 获取选择添加的导游信息
             * @param data
             */
            getChosedInfo (data) {
                this.tableData =  data;
            },
            /**
             * 修改导游信息
             * @param id
             * @param staffName 导游姓名
             * @param documentNo 证件号
             * @param phoneNumber 手机号
             * @param index
             */
            addOrUpdateOrgStaff ({id,staffName,documentNo,phoneNumber,index}) {
                return ajax.post('addOrUpdateOrgStaff',{
                    id : id,
                    staffName : staffName,
                    staffType : 'guide',
                    documentType : 'id',
                    documentNo : documentNo,
                    phoneNumber : phoneNumber,
                }).then(res => {
                    if(res.success){
                        this.$Message.success('修改导游信息成功');
                        this.$set(this.tableData[index],'editType','');
                    }else{
                        this.$Message.err('修改导游信息失败');
                    }
                });
            },
            /**
             * 判断模态框中修改的信息是否在当前页面已存在，如果存在要修改为修改后的信息
             * @param data
             * @param type 操作类型
             */
            modifyChoosedData({data,type}) {
                for(let i = 0,j = this.tableData.length;i < j;i++){
                    if(this.tableData[i]['id'] === data['id']){
                        if(type === 'modify'){
                            this.$set(this.tableData,i,data)
                        }else if(type === 'del'){
                            this.tableData.splice(i,1);
                        }
                        break;
                    }
                }
            }
        },
        computed : {
            //将要删除的导游信息
            delingTouristInfo () {
                if(this.selectedTourGuideInfo.length > 2){
                    return {
                        data : this.selectedTourGuideInfo.map(item => item.staffName).slice(0,2).join(','),
                        showMore : true
                    }
                }else{
                    return {
                        data : this.selectedTourGuideInfo.map(item => item.staffName).slice(0,2).join(','),
                        showMore : false
                    }
                }
            },
            ...mapGetters({
                manageOrgs : 'manageOrgs'
            }),
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

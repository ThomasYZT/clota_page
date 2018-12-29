<!--分组选择下拉-->

<template>
    <div class="group-list-main">
        <Select v-model="groupType" class="group-list" style="width:280px;z-index:2000;" @on-change="groupChange">
            <Option :value="item.id"
                    v-for="item in allGroupList"
                    :label="item.groupName"
                    :key="item.id">
                <div class="group-list" >
                    <template>
                        <span class="label-text" v-w-title="item.groupName">{{item.groupName}}</span>
                        <span class="iconfont icon-edit"
                              v-if="item.stay !== true && canModifySaleGroup"
                              @click="editOrgType($event,item)"></span>
                        <span class="iconfont icon-delete"
                              v-if="item.stay !== true && canDeleteSaleGroup"
                              @click="delGroupShowModal(item,$event)"></span>
                    </template>
                    <!--<template v-else>-->
                        <!--<Input v-model="item.groupName" style="width: 190px;"/>-->
                        <!--<span class="save">保存</span>-->
                        <!--<span class="cancel" @click="item.edit = false">取消</span>-->
                    <!--</template>-->
                </div>
            </Option>
        </Select>
        <!--删除分组-->
        <del-modal ref="delGroupModal">
            <div class="remove-group">
                <span class="red-bale">
                <Icon type="help-circled"></Icon>{{$t('isDoing')}}{{$t('delGroup')}}：
                <span style="color : #f8a334;">{{currentGroup.groupName}}</span>&nbsp;{{$t('moveToNoGroup')}}，<br>
                <span style="color:#EB6751;">{{$t('operationIrrevocable')}}</span>，{{$t('sureToDel')}}？
                </span>
            </div>
        </del-modal>
        <!--修改分组名字模态框-->
        <edit-modal ref="editModal">
            <Form ref="formData" :model="formData" :rules="ruleValidate">
                <!--修改分组名称-->
                <FormItem prop="orgName" :label="$t('modifyGroupName')">
                    <Input v-model.trim="formData.orgName" style="width: 280px"/>
                </FormItem>
            </Form>
        </edit-modal>
    </div>
</template>

<script>
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index.js';
    import editModal from '@/components/editModal/index.vue';
    import { mapGetters } from 'vuex';
    export default {
        components : {
            delModal,
            editModal
        },
        props : {
            //销售渠道分组
            'orgGroupList' : {
                type : Array,
                default () {
                    return [];
                }
            },
        },
        data() {
            return {
                //选择的分组类型
                groupType : '-1',
                //当前操作的分组信息
                currentGroup : {},
                //表单校验规则
                ruleValidate : {
                    orgName : [
                        {required : true,message : this.$t('inputField',{field : this.$t('groupName')}),trigger : 'blur'},
                        {max : 50,message : this.$t('errorMaxLength',{field : this.$t('groupName'),length : 50}),trigger : 'blur'},
                    ]
                },
                //分组信息
                formData : {
                    //分组姓名
                    orgName : '',
                    //分组id
                    orgId : ''
                },
            }
        },
        methods: {
            /**
             * 编辑分组
             * @param e
             * @param data
             */
            editOrgType (e,data) {
                if (!this.canModifySaleGroup) return;
                e.stopPropagation();
                this.$set(data,'edit',!data.edit);
                this.formData.orgName = data.groupName;
                this.formData.orgId = data.id;
                //解决select必须点击一次才能消失的问题
                document.body.click();
                this.$refs.editModal.show({
                    title : this.$t('modifyGroupName'),
                    confirmCallback : () => {
                        this.confirmChangeOrgname();
                    }
                });
            },
            /**
             * 删除销售渠道分组模态框显示
             * @param data
             * @param e
             */
            delGroupShowModal (data,e) {
                if (!this.canDeleteSaleGroup) return;
                e.stopPropagation();
                this.currentGroup = data;
                this.$refs.delGroupModal.show({
                    title : this.$t('delGroup'),
                    confirmCallback : () => {
                        this.delGroup(data);
                    }
                });
                //解决select必须点击一次才能消失的问题
                document.body.click();
            },
            /**
             * 删除销售渠道分组
             * @param data
             */
            delGroup (data) {
                ajax.post('deleteChannelGroup',{
                    groupId : data.id
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip',{msg: this.$t('delGroup')+data.groupName}));
                        if(data.id === this.groupType){
                            this.groupType = '-1';
                            this.$emit('update:groupType',this.groupType);
                        }
                        this.$emit('fresh-data');
                        this.$emit('fresh-channel');
                    }else{
                        this.$Message.error(this.$t('failureTip',{msg: this.$t('delete')}));
                    }
                });
            },
            /**
             * 分组类别修改
             */
            groupChange () {
                this.$emit('update:groupType',this.groupType);
                this.$emit('fresh-channel');
            },
            /**
             * 确定修改分组名称
             */
            confirmChangeOrgname () {
                ajax.post('addOrUpdateOrgGroup',{
                    id : this.formData.orgId,
                    groupType : 'sale',
                    groupName : this.formData.orgName
                }).then(res => {
                    if(res.success){
                        this.$Message.success(this.$t('successTip',{msg: this.$t('modify')}));
                        this.$emit('fresh-data');
                        this.$emit('fresh-channel');
                    }else{
                        this.$Message.error(this.$t('failureTip',{msg: this.$t('modify')}));
                    }
                }).finally(() => {
                    this.$refs.editModal.hide();
                });
            }
        },
        computed: {
            //包含全部和未分组的渠道分组列表
            allGroupList () {
                let orgGroupList = [];
                if(this.orgGroupList && this.orgGroupList.length > 0){
                    orgGroupList = JSON.parse(JSON.stringify(this.orgGroupList));
                    orgGroupList.push({
                        groupName : this.$t('noGroup'),
                        id : '-2',
                        stay : true
                    });
                    orgGroupList.unshift({
                        groupName : this.$t('allGroup'),
                        id : '-1',
                        stay : true
                    });
                }else{
                    orgGroupList.push({
                        groupName : this.$t('noGroup'),
                        id : '-2',
                        stay : true
                    });
                    orgGroupList.unshift({
                        groupName : this.$t('allGroup'),
                        id : '-1',
                        stay : true
                    });
                }
                return orgGroupList;
            },
            ...mapGetters([
                'permissionInfo'
            ]),
            //是否可以修改分组
            canModifySaleGroup () {
                return this.permissionInfo && this.permissionInfo['modifySaleGroup'] === 'allow';
            },
            //是否可以删除分组
            canDeleteSaleGroup () {
                return this.permissionInfo && this.permissionInfo['deleteSaleGroup'] === 'allow';
            },
        },
        created () {
            this.$emit('update:groupType',this.groupType);
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .group-list-main{
        display: inline-block;
        float: right;

        .group-list /deep/ .ivu-select-item{
            overflow-y: auto;
            overflow-x: hidden;

            &:hover{

                & .iconfont{
                    display: inline-block;
                }
            }
        }

        .label-text{
            display: inline-block;
            width: 190px;
            float: left;
            @include overflow_tip();
        }

        .group-list{
            overflow-y: auto;
            overflow-x: hidden;
        }

        .iconfont{
            display: none;
            vertical-align: middle;

            &.icon-edit{
                color: $color_blue;
            }

            &.icon-delete{
                color: $color_err;
                font-size: 14px;
                margin-left: 5px;
            }
        }

        @at-root .remove-group{
            @include block_outline();
            @include center_center();
            padding: 0 76px 0 106px;
            color: $color_333;
            font-size: $font_size_14px;

            .red-bale{
                position: relative;
                display: inline-block;
                width: 100%;

                .ivu-icon{
                    @include absolute_pos(absolute,$left : -19px,$top : 2px);
                    font-size: 15px;
                    color: #EB6751;
                }
            }

        }
    }
</style>

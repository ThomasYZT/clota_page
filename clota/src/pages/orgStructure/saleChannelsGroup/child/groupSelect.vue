<!--分组选择下拉-->

<template>
    <div class="group-list-main">
        <Select v-model="groupType" class="group-list" style="width:280px;" @on-change="groupChange">
            <Option :value="item.id"
                    v-for="item in allGroupList"
                    :label="item.groupName"
                    :key="item.id">
                <div class="group-list" >
                    <template v-if="!item.edit">
                        <span class="label-text" v-w-title="item.groupName">{{item.groupName}}</span>
                        <span class="iconfont icon-edit"
                              v-if="item.stay !== true"
                              @click="editOrgType($event,item)"></span>
                        <span class="iconfont icon-delete" v-if="item.stay !== true" @click="delGroupShowModal(item)"></span>
                    </template>
                    <template v-else>
                        <Input v-model="item.groupName" style="width: 190px;"/>
                        <span class="save">保存</span>
                        <span class="cancel" @click="item.edit = false">取消</span>
                    </template>
                </div>
            </Option>
        </Select>
        <!--删除分组-->
        <del-modal ref="delGroupModal">
            <div class="del-tips">
                <Icon type="help-circled"></Icon>
                <span class="red-bale">您正在删除分组：
                <span style="color : #f8a334;">{{currentGroup.groupName}}</span>&nbsp;本组的渠道将被全部移至‘未分组’，<br>
                <span style="color:#EB6751;">本操作不可撤销</span>，确认删除？
                </span>
            </div>
        </del-modal>
    </div>
</template>

<script>
    import delModal from '@/components/delModal/index.vue';
    import ajax from '@/api/index.js';
    export default {
        components : {
            delModal
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
            }
        },
        methods: {
            stopPro (e) {
                e.preventDefault();
                e.stopPropagation();
            },
            /**
             * 编辑分组
             * @param e
             * @param data
             */
            editOrgType (e,data) {
                // e.stopPropagation();
                this.$set(data,'edit',!data.edit);
            },
            /**
             * 删除销售渠道分组模态框显示
             * @param data
             */
            delGroupShowModal (data) {
                this.currentGroup = data;
                this.$refs.delGroupModal.show({
                    title : `删除分组`,
                    confirmCallback : () => {
                        this.delGroup(data);
                    }
                });
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
                        this.$Message.success(`删除分组:${data.groupName}成功`);
                        if(data.id === this.groupType){
                            this.groupType = '-1';
                            this.$emit('update:groupType',this.groupType);
                        }
                        this.$emit('fresh-data');
                        this.$emit('fresh-channel');
                    }else{
                        this.$Message.error('删除失败');
                    }
                });
            },
            /**
             * 分组类别修改
             */
            groupChange () {
                this.$emit('update:groupType',this.groupType);
                this.$emit('fresh-channel');
            }
        },
        computed: {
            //包含全部和未分组的渠道分组列表
            allGroupList () {
                let orgGroupList = [];
                if(this.orgGroupList && this.orgGroupList.length > 0){
                    orgGroupList = JSON.parse(JSON.stringify(this.orgGroupList));
                    orgGroupList.push({
                        groupName : '未分组',
                        id : '-2',
                        stay : true
                    });
                    orgGroupList.unshift({
                        groupName : '全部分组',
                        id : '-1',
                        stay : true
                    });
                }
                return orgGroupList;
            }
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
    }
</style>

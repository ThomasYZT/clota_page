<!--部门详情-->

<template>
    <div class="department-deail">
        <div class="com-name">
            <template v-if="type === 'edit'">
                <Input v-model="formDataCopy.depName" style="width : 280px"/>
                <i-switch v-model="formDataCopy.isStart"></i-switch>
            </template>
            <template v-if="type === 'watch'">
                <span class="name"
                      v-if="type === 'watch'"
                      v-w-title="formData.depName">
                    {{formData.depName}}
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
        <ul class="department-info">
            <li class="list">
                <div class="info-list1">
                    <span class="info-key">部门ID：</span>
                    <span class="info-val">232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323</span>
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
        <!--员工-->
        <employee-table :is-pack-up="true"
                        type="department">
        </employee-table>
    </div>
</template>

<script>
    import employeeTable from './components/employeeTable';
    import defaultsDeep from 'lodash/defaultsDeep';
    export default {
        components : {
            employeeTable
        },
        data() {
            return {
                //表单数据
                formDataCopy : {},
                //表单数据
                formData : {
                    //部门名称
                    depName : '部门ID',
                    //是否启用
                    isStart : false
                },
                type : 'watch'
            }
        },
        methods: {
            /**
             * 开始编辑
             */
            edit () {
                this.type = 'edit';
                this.formDataCopy = defaultsDeep({} , this.formData);
            },
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
                this.$Message.success('保存成功');
            },
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .department-deail{
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

            .iconfont{
                vertical-align: middle;
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

            .not-started{
                padding-left: 10px;
                color: $color_yellow;
            }

            .started {
                padding-left: 10px;
                color: $color_22BB5F;
            }

            .edit {
                float: right;
                color: $color_blue;
                text-align: right;
                cursor: pointer;
            }
        }

        .department-info {
            @include block_outline($height: auto);
            padding-bottom: 21px;
            border-bottom: 1px dashed $color_E1E1E1;

            .btn-area{
                @include block_outline($height : 72px);
                text-align: center;
                padding: 20px 0;

                /deep/ .ivu-btn-primary{
                    margin-right: 8px;
                }
            }

            .list {
                display: flex;
                align-items: center;
                @include block_outline($height: 30px);
                padding: 4px 0;
                line-height: 22px;

                .info-list1 {
                    @include block_outline(100%, auto);
                }

                .info-list1{
                    display: flex;
                    flex-direction: row;
                    float: left;
                    font-size: $font_size_14px;

                    .info-key {
                        @include block_outline(auto, 100%);
                        color: $color_333;
                    }

                    .info-val {
                        flex: 1;
                        @include overflow_tip(auto, auto);
                        color: $color_666;
                    }
                }
            }
        }


    }
</style>

<!--菜单权限选择-->

<template>
    <div class="menu-privalige">
        <div class="pri-title">
            <div class="org-title">
                <div class="scene-title">景区权限</div>
                <ul class="tap">
                    <li class="li"
                        :class="{active : tapType === 'manage'}"
                        @click="checkTap('manage')">
                        经营权限
                    </li>
                    <li class="li"
                        :class="{active : tapType === 'finance'}"
                        @click="checkTap('finance')">
                        财务权限
                    </li>
                </ul>
            </div>
            <div class="menu-title">
                <div class="scene-title">菜单权限（欢乐世界）</div>
            </div>
        </div>
        <finace-role v-show="tapType === 'finance'"
                     :default-chosed-node-init="economicDefaultChosed">
        </finace-role>
        <manage-role v-show="tapType === 'manage'"
                     :rolePrivaliges="rolePrivaligesChosed"
                     :default-chosed-node-init="manageDefaultChosed">
        </manage-role>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import finaceRole from './finaceRole';
    import manageRole from './manageRole';
    export default {
        props :{
            //选择的角色信息
            'chose-roles' : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        components : {
            noData,
            finaceRole,
            manageRole
        },
        data() {
            return {
                //当前权限种类
                tapType : 'manage',
                //经营权限默认选中的节点
                manageDefaultChosed : {},
                //财务权限默认选中节点
                economicDefaultChosed : {},
                //存储当前选择的角色id
                rolePrivaliges : {},
                //当前选择的角色下的权限信息
                rolePrivaligesChosed : {}
            }
        },
        methods: {
            /**
             * 切换tap
             * @params type
             */
            checkTap(type) {
                this.tapType = type;
            },
            /**
             * 查询角色详情
             * @params roleId
             */
            queryRoleDetail (roleId) {
                ajax.post('findById',{
                    id : roleId
                }).then(res => {
                    if(res.success){
                        this.rolePrivaliges[roleId] = res.data ? res.data.privModelList : [];
                        this.getMangePrivalige(res.data.privModelList);
                    }else{
                    }
                });
            },
            /**
             * 获取景区经营权限节点列表
             * @param data
             */
            getMangePrivalige (data) {
                this.manageDefaultChosed = {};
                this.economicDefaultChosed = {};
                for(let i = 0,j = data.length;i < j;i++){
                    if(data[i].orgType === 'manage'){
                        if(!this.manageDefaultChosed[data[i].privOrg]){
                            this.manageDefaultChosed[data[i].privOrg] = [{
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true
                            }];
                        }else{
                            this.manageDefaultChosed[data[i].privOrg].push({
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true
                            });
                        }
                    }else if(data[i].orgType === 'economic'){
                        if(!this.economicDefaultChosed[data[i].privOrg]){
                            this.economicDefaultChosed[data[i].privOrg] = [{
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true
                            }];
                        }else{
                            this.economicDefaultChosed[data[i].privOrg].push({
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true
                            });
                        }
                    }
                }
            },
            /**
             * 更新选择的叫角色
             */
            updateChosedRoles () {
                let addRoles = [];
                for(let i = 0,j = this.choseRoles.length;i < j;i++){
                    if(!(this.choseRoles[i] in this.rolePrivaliges)){
                        addRoles.push(this.choseRoles[i]);
                    }
                }
                Promise.all(addRoles.map(item =>{
                    return ajax.post('findById',{
                        id : item
                    })
                })).then(res => {
                    for(let i = 0, j = res.length;i < j;i++){
                        this.rolePrivaliges[addRoles[i]] = res[i].data ? res[i].data['privModelList'] : [];
                    }
                    let privaliges = this.getTotalPrivaliges();
                    this.getMangePrivalige(privaliges);
                });
            },
            /**
             * 获取所有权限集合
             */
            getTotalPrivaliges () {
                let result = [];
                this.rolePrivaligesChosed = {};
                for(let i = 0,j = this.choseRoles.length;i < j;i++){
                    if(this.rolePrivaliges[this.choseRoles[i]] && this.rolePrivaliges[this.choseRoles[i]].length > 0){
                        result = [...result,...this.rolePrivaliges[this.choseRoles[i]]];
                        this.rolePrivaligesChosed[this.choseRoles[i]] = this.rolePrivaliges[this.choseRoles[i]];
                    }
                }
                return result;
            }
        },
        watch :{
            choseRoles (newVal) {
                if(newVal){
                    this.updateChosedRoles();
                }
            }
        },
        computed :{
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .menu-privalige{
        position: absolute;
        left: 290px;
        top: -7px;
        width: 610px;
        height: 100%;
        background: #fcfdfe;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid $color_E1E1E1;
        cursor: default;

        .pri-title{
            @include block_outline(100%,37px);
            border-right: 1px dashed $color_E1E1E1;

            .org-title{
                float: left;
                width: 380px;

                .tap{
                    float: right;
                    line-height: 31px;

                    .li{
                        float: left;
                        margin-left: 25px;
                        cursor: pointer;

                        &.active{
                            color: $color_blue;

                            &::after{
                                content : '';
                                @include block_outline(100%,3px,false);
                                background: $color_blue;
                            }
                        }
                    }
                }
            }

            .menu-title{
                float: left;
                @include block_outline(unquote('calc(100% - 380px)'),37px);
                padding: 7px 0 7px 10px;
                line-height: 20px;
                font-size: 14px;
                color: #333333;
            }
        }

        .org-title{
            @include block_outline($height : 37px);
            padding: 0 20px;

            &:nth-of-type(1){
                border-bottom: 1px solid #EBEEF5;
            }

            .scene-title{
                padding: 7px 0 7px 0;
                line-height: 20px;
                font-size: $font_size_14px;
                color: $color_333;
                float: left;
            }
        }
    }
</style>

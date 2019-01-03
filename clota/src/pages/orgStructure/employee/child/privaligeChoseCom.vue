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
                <div class="scene-title">菜单权限（{{orgName[tapType]}}）</div>
            </div>
        </div>
        <finace-role v-show="tapType === 'finance'"
                     ref="finaceRole"
                     :extra-privalige="extraPrivaligeDeal"
                     :default-chosed-node-init="economicDefaultChosed"
                     @set-org-name="getOrgname">
        </finace-role>
        <manage-role v-show="tapType === 'manage'"
                     ref="manageRole"
                     :extra-privalige="extraPrivaligeDeal"
                     :default-chosed-node-init="manageDefaultChosed"
                     @set-org-name="getOrgname">
        </manage-role>
    </div>
</template>

<script>
    import ajax from '@/api/index.js';
    import noData from '@/components/noDataTip/noData-tip.vue';
    import finaceRole from './financeRole';
    import manageRole from './manageRole';
    export default {
        props : {
            //选择的角色信息
            'chose-roles' : {
                type : Array,
                default () {
                    return [];
                }
            },
            //手动选择的权限
            'extra-privalige' : {
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
        data () {
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
                rolePrivaligesChosed : {},
                //手动选择的权限
                handlerChosedPrivalilges : [],
                //当前选择节点名称
                orgName : {
                    manage : '',
                    finance : '',
                },
            };
        },
        methods : {
            /**
             * 切换tap
             * @params type
             */
            checkTap (type) {
                this.tapType = type;
            },
            /**
             * 获取景区权限节点列表
             * @param data
             */
            getMangePrivalige (data) {
                this.manageDefaultChosed = {};
                this.economicDefaultChosed = {};
                for (let i = 0,j = data.length; i < j; i++) {
                    if (data[i].orgType === 'manage') {
                        if (!this.manageDefaultChosed[data[i].privOrg]) {
                            this.manageDefaultChosed[data[i].privOrg] = [{
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true,
                                linkedPrivCode : data[i].linkedPrivCode,
                            }];
                        } else {
                            this.manageDefaultChosed[data[i].privOrg].push({
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true,
                                linkedPrivCode : data[i].linkedPrivCode,
                            });
                        }
                    } else if (data[i].orgType === 'economic') {
                        if (!this.economicDefaultChosed[data[i].privOrg]) {
                            this.economicDefaultChosed[data[i].privOrg] = [{
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true,
                                linkedPrivCode : data[i].linkedPrivCode,
                            }];
                        } else {
                            this.economicDefaultChosed[data[i].privOrg].push({
                                path : data[i].path,
                                privCode : data[i].privCode,
                                privType : data[i].privType,
                                ranges : data[i].ranges,
                                choseStatus : data[i].choseStatus,
                                defaultChosed : true,
                                linkedPrivCode : data[i].linkedPrivCode,
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
                for (let i = 0,j = this.choseRoles.length; i < j; i++) {
                    if (!(this.choseRoles[i] in this.rolePrivaliges)) {
                        addRoles.push(this.choseRoles[i]);
                    }
                }
                Promise.all(addRoles.map(item =>{
                    return ajax.post('findById',{
                        id : item
                    });
                })).then(res => {
                    for (let i = 0, j = res.length; i < j; i++) {
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
                for (let i = 0,j = this.choseRoles.length; i < j; i++) {
                    if (this.rolePrivaliges[this.choseRoles[i]] && this.rolePrivaliges[this.choseRoles[i]].length > 0) {
                        result = [...result,...this.rolePrivaliges[this.choseRoles[i]]];
                        this.rolePrivaligesChosed[this.choseRoles[i]] = this.rolePrivaliges[this.choseRoles[i]];
                    }
                }
                return result;
            },
            /**
             * 获取手动选择的权限信息
             */
            getHandlerChosedPrivaliges () {
                let manageRoles = this.$refs.manageRole.getHandlerChosedMenu();
                let finaceRoles = this.$refs.finaceRole.getHandlerChosedMenu();
                return [...manageRoles,...finaceRoles];
            },
            /**
             * 获取节点名称
             * @param type
             * @param data
             */
            getOrgname ({ type,data }) {
                this.orgName[type] = data;
            }
        },
        watch : {
            choseRoles (newVal) {
                if (newVal) {
                    this.updateChosedRoles();
                }
            }
        },
        computed : {
            //额外菜单权限中不包括半选的菜单
            extraPrivaligeDeal () {
                return this.extraPrivalige.filter(item => item.choseStatus !== 'half');
            }
        }
    };
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
                border-right: 1px dashed $color_E1E1E1;

                .tap{
                    float: right;
                    line-height: 31px;

                    .li{
                        float: left;
                        margin-left: 25px;
                        cursor: pointer;
                        line-height: 38px;

                        &.active{
                            color: $color_blue;

                            &::after{
                                content : '';
                                @include block_outline(100%,3px,false);
                                background: $color_blue;
                                margin-top: -4px;
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

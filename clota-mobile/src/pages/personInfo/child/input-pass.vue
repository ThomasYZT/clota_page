<!--输入密码-->

<template>
    <div class="input-pass" @click="hideKeyBoard">
        <div class="area">
            <div class="label">{{$t('tradePassRule')}}</div>
            <ul class="pass-input" @click="showKeyBoard($event,'first')">
               <li v-for="(item,i) in passData" :key="i">{{item}}</li>
            </ul>
            <div class="label label-margin">{{$t('请再次输入密码')}}</div>
            <ul class="pass-input" @click="showKeyBoard($event,'second')">
                <li v-for="(item,i) in againPassData" :key="i">{{item}}</li>
            </ul>

            <div class="btn-area">
                <x-button @click.native="submit">{{$t('提交')}}</x-button>
            </div>
        </div>
        <!--输入数字键盘-->
        <num-key-board
            ref="numKeyBoard"
            @add-word="clickBoarad"
            @del-word="delPassWord"
            @cancel="cancelInput">
        </num-key-board>
    </div>
</template>

<script>
    import numKeyBoard from '@/components/numKeyBoard/index.vue';
    import lifeCycleMixins from '@/mixins/lifeCycleMixins.js';
    import ajax from '@/api/index.js';
    import {mapGetters} from 'vuex';
    import MD5 from 'crypto-js/md5';
    export default {
        mixins : [lifeCycleMixins],
        components : {
            numKeyBoard
        },
        data() {
            return {
                //输入的密码
                inputData : [],
                //再次输入的密码
                againInputData : [],
                //手机号码
                phoneNum : '',
                //验证码
                code : '',
                //当前输入密码类型
                passType : ''
            }
        },
        methods: {
            /**
             * 获取键盘输入值
             * @param data
             */
            clickBoarad (data) {
                if(this.passType === 'first'){
                    if(this.inputData.length === 5){
                        this.inputData.push(data);
                        this.$refs.numKeyBoard.hide();
                    }else if(this.inputData.length >= 6){
                        this.$refs.numKeyBoard.hide();
                    }else{
                        this.inputData.push(data);
                    }
                }else{
                    if(this.againInputData.length === 5){
                        this.againInputData.push(data);
                        this.$refs.numKeyBoard.hide();
                    }else if(this.againInputData.length >= 6){
                        this.$refs.numKeyBoard.hide();
                    }else{
                        this.againInputData.push(data);
                    }
                }
            },
            /**
             * 显示键盘
             * @param e
             * @param type 当前输入的密码类型
             */
            showKeyBoard (e,type) {
                e.stopPropagation();
                this.$store.commit('updateKeyBoardStatus',true);
                this.passType = type;
            },
            /**
             * 删除键盘输入数字
             */
            delPassWord () {
                if(this.passType === 'first'){
                    if(this.inputData && this.inputData.length > 0){
                        this.inputData.splice(this.inputData.length - 1,1);
                    }
                }else{
                    if(this.againInputData && this.againInputData.length > 0){
                        this.againInputData.splice(this.againInputData.length - 1,1);
                    }
                }
            },
            /**
             * 取消输入
             */
            cancelInput () {
                this.$store.commit('updateKeyBoardStatus',false);
            },
            /**
             * 隐藏键盘
             */
            hideKeyBoard () {
                this.$store.commit('updateKeyBoardStatus',false);
            },
            /**
             * 修改交易密码
             */
            updateTradePassword () {
                ajax.post('updateTradePassword',{
                    cardId : this.userInfo.cardId,
                    tradePassword : MD5(this.inputData.join('')).toString(),
                    phoneNum : this.phoneNum,
                    code : this.code,
                }).then(res => {
                    if(res.success){
                        setTimeout(() =>{
                            this.$vux.toast.show({
                                text: '修改成功'
                            });
                            this.$router.push({
                                name : 'personInfo'
                            });
                        },500);
                    }else{
                        if(res.code === 'A005'){
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text: '验证码失效',
                                    type : 'text'
                                })
                            },500);
                        }else if(res.code === 'A003'){
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text: '验证码为空',
                                    type : 'text'
                                })
                            },500);
                        }else if(res.code === 'A004'){
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text: '验证码错误',
                                    type : 'text'
                                })
                            },500);
                        }else{
                            setTimeout(() =>{
                                this.$vux.toast.show({
                                    text: '修改失败',
                                    type : 'cancel'
                                })
                            },500);
                        }
                    }
                });
            },
            /**
             * 提交修改密码信息
             */
            submit () {
                this.validatePass().then(() =>{
                    this.updateTradePassword();
                });
            },
            /**
             * 获取路由参数
             * @param params
             */
            getParams(params) {
                if(params && params.mobile && params.code) {
                    this.phoneNum = params.mobile;
                    this.code = params.code;
                }else{
                    this.$router.push({
                        name : 'personInfo'
                    });
                }
            },
            /**
             * 校验输入的密码是否正确
             */
            validatePass () {
                return new Promise((resolve,reject) => {
                    if(this.inputData && this.inputData.length !== 6){
                        this.$vux.toast.show({
                            text: '请输入密码',
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else if(this.againInputData && this.againInputData.length !== 6){
                        this.$vux.toast.show({
                            text: '请再次输入密码',
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else if(this.againInputData.join('') !== this.inputData.join('')){
                        this.$vux.toast.show({
                            text: '2次密码输入不一致',
                            type: 'text',
                            width: '5rem'
                        });
                        reject();
                    }else{
                        resolve();
                    }
                });
            }
        },
        computed : {
            //输入的密码数据
            passData () {
                let result = [];
                for(let i = 0,j = 6;i < j;i++){
                    if(this.inputData[i] !== undefined){
                        result.push('*');
                    }else{
                        result.push('');
                    }
                }
                return result;
            },
            //再次输入的密码
            againPassData () {
                let result = [];
                for(let i = 0,j = 6;i < j;i++){
                    if(this.againInputData[i] !== undefined){
                        result.push('*');
                    }else{
                        result.push('');
                    }
                }
                return result;
            },
            ...mapGetters({
                userInfo : 'userInfo'
            })
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .input-pass{
        @include block_outline();
        background: rgba(242,243,244,1);

        .area{
            @include block_outline($height : 464px);
            background:$color_fff;
            padding-top: 35px;

            .label{
                @include block_outline($height : 61px);
                padding: 19px 0;
                font-size: $font_size_17px;
                color: #353B48;
                text-align: left;
                padding-left: 10px;

                &.label-margin{
                    margin-top: 20px;
                }
            }

            .pass-input{
                display: flex;
                @include block_outline(348px, 58px);
                border-left: 1px solid #BDC4C8;
                border-bottom: 1px solid #BDC4C8;
                border-top: 1px solid #BDC4C8;
                margin: 0 auto;
                box-sizing: border-box;

                li{
                    flex: 1;
                    height: 100%;
                    border-right: 1px solid #BDC4C8;
                    float: left;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: $font_size_24px;
                    color: $color_000;
                }
            }

            .btn-area{
                @include block_outline(unquote('calc(100% - 55px)'),42px);
                margin: 82px auto 0;

                /deep/ .weui-btn_default{
                    background: $color_0073EB;
                    font-size: 17px;
                    color: $color_fff;
                    border-radius: 100px;
                    letter-spacing: 5px;
                }
            }
        }
    }
</style>

<!--输入密码-->

<template>
    <div class="input-pass" @click="hideKeyBoard">
        <div class="area">
            <div class="label">请输入6位数字支付密码</div>
            <ul class="pass-input" @click="showKeyBoard($event)">
               <li v-for="(item,i) in passData" :key="i">{{item}}</li>
            </ul>

            <div class="btn-area">
                <x-button >下一步</x-button>
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
    export default {
        components : {
            numKeyBoard
        },
        data() {
            return {
                //输入的数据
                inputData : []
            }
        },
        methods: {
            /**
             * 获取键盘输入值
             * @param data
             */
            clickBoarad (data) {
                if(this.inputData.length === 5){
                    this.inputData.push(data);
                    this.$refs.numKeyBoard.hide();
                }else if(this.inputData.length >= 6){
                    this.$refs.numKeyBoard.hide();
                }else{
                    this.inputData.push(data);
                }
            },
            /**
             * 显示键盘
             */
            showKeyBoard (e) {
                e.stopPropagation();
                this.$store.commit('updateKeyBoardStatus',true);
            },
            /**
             * 删除键盘输入数字
             */
            delPassWord () {
                if(this.inputData && this.inputData.length > 0){
                    this.inputData.splice(this.inputData.length - 1,1);
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
            }
        }
    }
</script>

<style lang="scss" scoped>
	@import '~@/assets/scss/base';
    .input-pass{
        @include block_outline();
        background: rgba(242,243,244,1);

        .area{
            @include block_outline($height : 364px);
            background:$color_fff;
            padding-top: 75px;

            .label{
                @include block_outline($height : 61px);
                padding: 19px 0;
                font-size: $font_size_17px;
                color: #353B48;
                text-align: center;
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
                margin: 102px auto 0;

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

<!--模拟读卡器-->

<template>
    <div class="card-read">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="120">
            <FormItem label="开启模拟读卡器">
                <i-switch v-model="formInline.openCard" size="large" @on-change="cardStatusChange">
                    <span slot="open">On</span>
                    <span slot="close">Off</span>
                </i-switch>
            </FormItem>
            <FormItem label="物理卡号">
                <Input style="width: 240px;" v-model="formInline.physicsId" :disabled="!formInline.openCard"/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">修改</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                //表单数据
                formInline : {
                    //是否开启模拟读卡器
                    openCard : false,
                    //物理卡号
                    physicsId : ''
                },
                //校验规则
                ruleInline : {

                }
            };
        },
        methods : {
            /**
             * 确认提交
             */
            submit () {
                this.$store.commit('updateReadCardData',this.formInline.physicsId);
            },
            /**
             * 卡状态改变
             */
            cardStatusChange () {
                this.$store.commit('updateReadCardOpen',true);
                this.$store.commit('updateCardReadEnabled',true);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .card-read{
        width: 100%;
        height: 100%;
    }
</style>

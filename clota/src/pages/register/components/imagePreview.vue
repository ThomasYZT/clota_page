<!--图片预览-->

<template>
    <Modal
        :title="$t('picturePreview')"
        :value="value"
        :width="500"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        class="image-preview"
        class-name="vertical-center-modal"
        @input="changeModalStatus($event)">
        <div class="image-body">
            <img class="image-info" :src="imageSrc" alt="">
        </div>
        <div slot="footer">
            <Button type="primary"
                    class="ivu-btn-90px"
                    @click="confirm">
                {{$t('close')}}
            </Button>
        </div>
    </Modal>
</template>

<script>
	export default {
        props : {
            //是否显示模态框
            'value' : {
                type : Boolean,
                default : false
            },
            //图片路径
            'image-src' : {
                type : String,
                default : ''
            }
        },
		data () {
			return {};
		},
		methods : {
            /**
             * 模态框状态改变
             * @param{String} type 模态框状态
             */
            visibleChange (type) {

            },
            /**
             * 关闭模态框
             */
            confirm () {
                this.changeModalStatus(false);
            },
            /**
             * 更改模态框状态
             * @param{String} status 模态框状态
             */
            changeModalStatus (status) {
                this.$emit('input',status);
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .image-preview{

        .image-body{
            height: 300px;
            overflow: auto;
            display: flex;
            align-items: center;
            justify-content: center;

            .image-info{
                width: 100%;
            }
        }
    }
</style>

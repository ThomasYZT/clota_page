<!--轮询查询支付结果-->

<template>
    <Modal
        :title="$t('notice')"
        :mask-closable="false"
        :value="value"
        :width="600"
        @input="changeValue"
        @on-visible-change="visibleChange"
        class="loop-search-pay-result"
        class-name="vertical-center-modal">
        <div class="loading">支付中</div>
    </Modal>
</template>

<script>
    import ajax from '@/api/index.js';
	export default {
	    props : {
			//模态框是否显示
			value : {
                type : Boolean,
                default : false
            },
            //内部交易id
            'transaction-id' : {
			    type : String,
                default : ''
            }
        },
		data () {
			return {
			    //轮询查询时间
			    loopSearchTime : 120000,
                //定时器
                timer : null,
                //是否在查询支付结果中
                searchIng : false
            };
		},
		methods : {
            /**
             * 绑定的value值改变
             * @param{Boolean} data  当前状态
             */
            changeValue (data) {
                this.$emit('input', data);
            },
            /**
             * 模态框状态改变
             * @param{Boolean} type 当前显示的zhuagnt
             */
            visibleChange (type) {
                if (type === true) {
                    this.timer = setInterval(() => {
                        if (this.loopSearchTime <= 0) {
                            clearInterval(this.timer);
                            this.$emit('search-fail');
                        } else {
                            if (!this.searchIng) {
                                this.queryConsumeUpdateBiz();
                            }
                        }
                    },3000);
                }
            },
            /**
             * 查询支付结果
             */
            queryConsumeUpdateBiz () {
                this.searchIng = true;
                ajax.post('queryConsumeUpdateBiz',{
                    transactionId : this.transactionId
                }).then(res => {
                    if (res.success && res.data === 'success') {
                        this.$emit('search-success');
                        this.changeValue();
                        clearInterval(this.timer);
                    } else {
                        this.$emit('search-fail');
                    }
                }).finally(() => {
                    this.searchIng = false;
                    this.loopSearchTime -= 3000;
                });
            }
        }
	};
</script>
<style lang="scss" scoped>
    @import '~@/assets/scss/base';
    .loop-search-pay-result{

    }
</style>

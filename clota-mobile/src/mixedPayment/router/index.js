
//混合支付路由信息
export const paymentRoutes = [
    {
        module : 'mixedPayment',
        path : '/mixedPayment',
        name : 'mixedPayment',
        component : () => import(/* webpackChunkName: "payment" */ '../pages/index.vue'),
        meta : {
            title : '扫码付款'
        }
    }
];

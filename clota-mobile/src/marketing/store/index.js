

//全民营销state信息
export const marketingState = {
    marketing : {
        //公司名称
        companyName : '广州长隆飞鸟乐园'
    }
};
export const marketingGetters = {
    //公司名称
    companyName : state => {
        return state.marketing.companyName;
    }
};



//全民营销state信息
export const marketingState = {
    marketing : {
        //公司名称
        companyName : '广州长隆飞鸟乐园',
        //公司编码
        companyCode : '444'
    }
};
export const marketingGetters = {
    //公司名称
    companyName : state => {
        return state.marketing.companyName;
    },
    //公司编码
    marketINgCompanyCode : state => {
        return state.marketing.companyCode;
    }
};

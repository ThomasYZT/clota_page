

//全民营销state信息
export const marketingState = {
    marketing : {
        //公司名称
        companyName : '广州长隆飞鸟乐园',
        //公司编码
        companyCode : '444',
        //组织id
        orgId : '1037976274619994113',
        //营销级别id
        levelId : '1067617391137132544',
        //营销类别id
        typeId : '1067616682551414784'
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
    },
    //组织id
    marketOrgId : state => {
        return state.marketing.orgId;
    },
    //营销级别id
    marketLevelId : state => {
        return state.marketing.levelId;
    },
    //营销类别id
    marketTypeId : state => {
        return state.marketing.typeId;
    },
};

import ajax from '../api/index';
import i18n from '../../assets/lang/lang.config';
export const wxCard = {
    //wx卡包直接进入系统
    wxCardLogin : ({ cardId, openId, encryptCode, companyCode, source }) => {
        return new Promise((resolve, reject) => {
            ajax.post('queryCardInfoByDecryptCode', {
                cardId : cardId,
                openId : openId,
                encryptCode : encryptCode,
                companyCode : companyCode,
                source : source,
            }).then(res => {
                if (res.success) {
                    if (res.data) {
                        console.log("queryCardInfoByDecryptCode")
                        resolve(res.data);
                    } else {
                        reject();
                    }
                } else {
                    reject();
                }
            }).catch(() => {
                reject();
            })
        });
    },
    //校验会员卡是否存在
    validCardExist : (cardInfo) => {

    }
}

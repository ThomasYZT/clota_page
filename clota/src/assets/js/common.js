/**
 * Created by Sasha on 2018/6/10.
 * 项目内公用方法
 */

import router from '../../router';
import store from '../../store/index';
import {validator} from 'klwk-ui';
import i18n from '../lang/lang.config';

console.log(i18n.messages[i18n.locale])

export default {

    /**
     * 退出登录(清空本地记录)
     */
    loginOut() {
        sessionStorage.removeItem('userInfo');
        router.push({
            name : 'login'
        },() => {
            store.commit('updatePermissionInfo',null);
            store.commit('updateUserInfo',{});
            store.commit('updateRouteInfo',null);
        });
    },

    /**
     * 获取用户信息
     */
    getUserInfo() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let empInfo = userInfo && userInfo.empInfo ? userInfo.empInfo : {};
        let roleType = userInfo && userInfo.roleType ? userInfo.roleType : 'perf_subordinate';
        let defaultCompany = userInfo && userInfo.companys ? userInfo.companys.find(attr => {
            return attr.id == userInfo.empInfo.companyId
        }) : '';
        return {
            userInfo,
            empInfo,
            roleType,
            defaultCompany
        }
    },

    /**
     * 获取组织树列表
     */
    getOrgTree () {
        return sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).manageOrgs : [];
    },

    /**
     * 获取文件类型
     * @param fileName
     * @returns {*}
     */
    getFileType(fileName) {
        var extName = fileName.substr(fileName.lastIndexOf(".") + 1);
        switch (extName) {
            case "txt":
                return 'txt';
            case "rar":
                return 'rar';
            case "zip":
                return 'zip';
            case "doc":
            case "docx":
                return 'doc';
            case "ppt":
            case "pptx":
                return 'ppt';
            case "xls":
            case "xlsx":
                return 'xls';
            case "pdf":
                return 'pdf';
            case "gif":
            case "img":
            case "jpeg":
            case "jpg":
            case "png":
            case "svg":
                return 'img';
            default:
                return 'unKnown';
        }
    },

    /**
     * 获取文件类型对应的iconfont类名
     * @param fileName
     * @returns {*}
     */
    getFileTypeIcon(fileName) {
        var fileType = this.getFileType(fileName);
        var fileTypeIcon = {
            txt: 'icon-txt',
            rar: 'icon-rar',
            zip: 'icon-zip',
            doc: 'icon-word',
            ppt: 'icon-ppt',
            xls: 'icon-excel',
            pdf: 'icon-pdf',
            img: 'icon-pic',
            unKnown: 'icon-other-file',
        }
        return fileTypeIcon[fileType];
    },

    /**
     * 判断value是否不为空
     * @param value
     * @returns {boolean}
     */
    isNotEmpty(value){
        if(value !== '' && value !== undefined && value !== null){
            return true;
        }else{
            return false;
        }
    },

    /**
     * 校验是否是2位数的钱，默认位数为1到10位
     */
    validateMoney (value,reg = '',minLength = 1,maxLength = 10,async = false) {
        return new Promise((resolve,reject) => {
            if(this.isNotEmpty(value) && validator.isNumber(value)){
                if(value < 0){
                    reject('不能输入小数');
                }
                let  numStr = String(value);
                //有小数
                if(numStr.indexOf('.') !== -1){
                    let numSplit = numStr.split('.');
                    //小数位位数为0
                    if(numSplit[1].length === 0){
                        reject('1001');
                    }else if(numSplit[1].length > 2){//小数位数字大于2
                        reject('1002');
                    }else{
                        if(numSplit[0].length > maxLength){
                            reject('1003');
                        }else{
                            //使用自定义正则表达式，校验金额
                            if(reg){
                                if(reg.test(value)){
                                    resolve();
                                }else{
                                    reject('1006');
                                }
                            }else{
                                resolve();
                            }
                        }
                    }
                }else{
                    //校验整数是否超过范围
                    if(numStr.length > maxLength){
                        reject('1003');
                    }else if(numStr.length < minLength){
                        reject('1004');
                    }else{
                        //使用自定义正则表达式，校验金额
                        if(reg){
                            if(reg.test(value)){
                                resolve();
                            }else{
                                reject('1006');
                            }
                        }else{
                            resolve();
                        }
                    }
                }
            }else{
                reject('1005');
            }
        });
    },
    /**
     * 校验value是否为正整数
     * @param value
     * @param reg
     * @param minLength
     * @param maxLength
     */
    validateInteger (value,reg,minLength = 1,maxLength = 10){
        return new Promise((resolve,reject) => {
            if(this.isNotEmpty(value) && validator.isNumber(value)){
                let  numStr = String(value);
                if(numStr.length < minLength){
                    reject('小于最小长度');
                }else if(numStr.length > maxLength){
                    reject('大于最大长度');
                }else{
                    if(Number.parseInt(value) === Number.parseFloat(value)){
                        //使用自定义正则表达式
                        if(reg){
                            if(reg.test(value)){
                                resolve();
                            }else{
                                reject('1006');
                            }
                        }else{
                            resolve();
                        }
                    }else{
                        reject('请输入正整数');
                    }
                }
            }else{
                reject('非数字');
            }
        });
    }
}

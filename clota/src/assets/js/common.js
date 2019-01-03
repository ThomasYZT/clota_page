/**
 * Created by Sasha on 2018/6/10.
 * 项目内公用方法
 */

import router from '../../router';
import store from '../../store/index';
import { validator } from 'klwk-ui';

export default {

    /**
     * 退出登录(清空本地记录)
     */
    loginOut () {
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
    getUserInfo () {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let manageOrgs = userInfo && userInfo.manageOrgs ? userInfo.manageOrgs : [];
        return {
            userInfo,
            manageOrgs,
        };
    },

    /**
     * 获取文件类型
     * @param fileName
     * @returns {*}
     */
    getFileType (fileName) {
        let extName = fileName.substr(fileName.lastIndexOf(".") + 1);
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
    getFileTypeIcon (fileName) {
        let fileType = this.getFileType(fileName);
        let fileTypeIcon = {
            txt : 'icon-txt',
            rar : 'icon-rar',
            zip : 'icon-zip',
            doc : 'icon-word',
            ppt : 'icon-ppt',
            xls : 'icon-excel',
            pdf : 'icon-pdf',
            img : 'icon-pic',
            unKnown : 'icon-other-file',
        };
        return fileTypeIcon[fileType];
    },

    /**
     * 判断value是否不为空
     * @param value
     * @returns {boolean}
     */
    isNotEmpty (value) {
        if (value !== '' && value !== undefined && value !== null) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * 校验是否是2位数的钱，默认位数为1到10位
     */
    validateMoney (value,minLength = 0,maxLength = 10,reg = '') {
        return new Promise((resolve,reject) => {
            if (this.isNotEmpty(value)) {
                if (validator.isNumber(value)) {
                    if (value < 0) {
                        reject('moneyError');
                    }
                    let numStr = String(value);
                    //有小数
                    if (numStr.indexOf('.') !== -1) {
                        let numSplit = numStr.split('.');
                        //小数位位数为0
                        if (numSplit[1].length === 0) {
                            reject('errorFormat');
                        } else if (numSplit[1].length > 2) {//小数位数字大于2
                            reject('decimalError');
                        } else {
                            if (numSplit[0].length > maxLength) {
                                reject('errorMaxLength');
                            } else if (numStr.length < minLength) {
                                reject('errorMinLength');
                            } else {
                                //使用自定义正则表达式，校验金额
                                if (reg) {
                                    if (reg.test(value)) {
                                        resolve();
                                    } else {
                                        reject('regErr');
                                    }
                                } else {
                                    resolve();
                                }
                            }
                        }
                    } else {
                        //校验整数是否超过范围
                        if (numStr.length > maxLength) {
                            reject('errorMaxLength');
                        } else if (numStr.length < minLength) {
                            reject('errorMinLength');
                        } else {
                            //使用自定义正则表达式，校验金额
                            if (reg) {
                                if (reg.test(value)) {
                                    resolve();
                                } else {
                                    reject('regErr');
                                }
                            } else {
                                resolve();
                            }
                        }
                    }
                } else {
                    reject('numError');
                }
            } else {
                reject('inputField');
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
    validateInteger (value,reg,minLength = 0,maxLength = 10) {
        return new Promise((resolve,reject) => {
            if (this.isNotEmpty(value)) {
                if (validator.isNumber(value)) {
                    let numStr = String(value);
                    if (value < 0 || value == 0) {
                        reject('fieldTypeError');
                    }
                    if (numStr.length < minLength) {
                        reject('errorMinLength');
                    } else if (numStr.length > maxLength) {
                        reject('errorMaxLength');
                    } else {
                        if (Number.parseInt(value) === Number.parseFloat(value)) {
                            //使用自定义正则表达式
                            if (reg) {
                                if (reg.test(value)) {
                                    resolve();
                                } else {
                                    reject('regErr');
                                }
                            } else {
                                resolve();
                            }
                        } else {
                            reject('integetError');
                        }
                    }
                } else {
                    reject('integetError');
                }
            } else {
                reject('inputField');
            }
            // if(this.isNotEmpty(value) && validator.isNumber(value)){
            //
            // }else{
            //     reject('integetError');
            // }
        });
    },
    /**
     * 获取以今天为基准，前后N天的Date对象
     * @param {number} index
     */
    getDay (index) {
        let _tDay = new Date();
        let _tTime = _tDay.getTime();
        //有参数获取对应事件、否则返回当前时间
        _tDay.setTime(_tTime ? _tTime + 1000 * 60 * 60 * 24 * index : 0);
        return _tDay;
    },
    /**
     * 获取星期几
     * @param date
     * @return {*}
     */
    getWeekDay (date) {
        if (date) {
            let week;
            let index = date.getDay();
            switch (index) {
                case 0:
                    week = "Sunday";
                    break;
                case 1:
                    week = "Monday";
                    break;
                case 2:
                    week = "Tuesday";
                    break;
                case 3:
                    week = "Wednesday";
                    break;
                case 4:
                    week = "Thursday";
                    break;
                case 5:
                    week = "Friday";
                    break;
                case 6:
                    week = "Saturday";
                    break;
            }

            return week;
        } else {
            return '-';
        }
    },
    /**
     * 校验value是否为非负整数
     * @param value
     * @param reg
     * @param minLength
     * @param maxLength
     */
    validatePositiveInteger (value,reg,minLength = 0,maxLength = 10) {
        return new Promise((resolve,reject) => {
            if (this.isNotEmpty(value)) {
                if (validator.isNumber(value)) {
                    let numStr = String(value);
                    if (value < 0) {
                        reject('nagivateIntegetError');
                    }
                    if (numStr.length < minLength) {
                        reject('errorMinLength');
                    } else if (numStr.length > maxLength) {
                        reject('errorMaxLength');
                    } else {
                        if (Number.parseInt(value) === Number.parseFloat(value)) {
                            //使用自定义正则表达式
                            if (reg) {
                                if (reg.test(value)) {
                                    resolve();
                                } else {
                                    reject('regErr');
                                }
                            } else {
                                resolve();
                            }
                        } else {
                            reject('nagivateIntegetError');
                        }
                    }
                } else {
                    reject('nagivateIntegetError');
                }
            } else {
                reject('inputField');
            }
        });
    },
};


// 表单校验，正则表达式
export const verifyReg = {
    // 只能由数字+26个英文大、小写字母组成，且6-20位的密码
    password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,20}$/,
};

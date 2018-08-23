/**
 * Created by Sasha on 2018/6/10.
 * 项目内公用方法
 */

import router from '../../router';
import store from '../../store/index';

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
     * 无模块或菜单功能权限时默认跳转页面
     */
    goToDefaultPage() {


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
    }
}

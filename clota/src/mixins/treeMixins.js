
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
export default {
    methods : {
        /**
         * 递归将权限数组转为对象格式
         * @param{Object} param 权限信息
         * @return{Object} {}转换后的权限对象数据
         */
        deepToJSON (param) {
            let result = {};
            result[param.privCode] = {
                linkedPrivCode : param.linkedPrivCode,
                path : param.path,
                privAttr : param.privAttr,
                privCode : param.privCode,
                privType : param.privType,
                ranges : param.ranges,
                subNode : null,
            };
            if (isArray(param.subNode)) {
                let subNode = param.subNode;
                result[param.privCode].subNode = {};
                for (let item of subNode) {
                    Object.assign(result[param.privCode].subNode,this.deepToJSON(item));
                }
            }
            return result;
        },
        /**
         * 合并权限数据，并且将格式转换为数组格式
         * @param{Object} target 合并的权限对象数据
         * @param{Object} source 参与合并的权限对象数据
         * @return {*}
         */
        mergeTreeData (target,source) {
            let result = merge(target,source)
            for (let item in result) {
                return this.deepToArray(result[item]);
            }
        },
        /**
         * 递归将权限数据转换为数组格式
         * @param{Object} param 权限对象格式信息
         * @return {{}}
         */
        deepToArray (param) {
            let result = {};
            result = {
                linkedPrivCode : param.linkedPrivCode,
                path : param.path,
                privAttr : param.privAttr,
                privCode : param.privCode,
                privType : param.privType,
                ranges : param.ranges,
                subNode : null,
            };
            if (param.subNode !== null && Object.keys(param.subNode).length > 0) {
                result['subNode'] = [];
                for (let item in param.subNode) {
                    result['subNode'].push(this.deepToArray(param.subNode[item]));
                }
            }
            return result;
        }
    }
}

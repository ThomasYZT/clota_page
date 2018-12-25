import forEach from 'lodash/forEach';
let _routerList;

/**
 * 路由权限过滤
 * @param routerObj
 */
const permissionFilter = (routerObj, routerList) => {
    let status = false;
    forEach(routerList ? routerList : _routerList, (item) => {
        if (item.name && item.name === routerObj.name) {
            status = true;
            return false;
        } else {
            if (item.children) {
                status = permissionFilter(routerObj, item.children);
                if (status) {
                    return false;
                }
            }
        }
    });
    return status;
}
/**
 *  路由信息组装、权限判断
 *  @param {object} rowData
 */
export const routerPackage = (rowData, routerInfo) => {
    let routerObj = {};
    _routerList = routerInfo;
    switch (rowData.type) {
        //产品 上线申请、通过上线申请、驳回上线申请
        case 'apply_product_online' :
        case 'pass_product_online' :
        case 'reject_product_online' :
            routerObj = {
                name : 'ticketDetail',
                params : {
                    info : rowData.extData
                }
            }
            break;
        //销售政策 上线申请、通过上线申请、驳回上线申请
        case 'apply_policy_online' :
        case 'pass_policy_online' :
        case 'reject_policy_online' :
        case 'disable_policy' :
            routerObj = {
                name : 'salePolicyDetail',
                params : {
                    info : rowData.extData
                }
            }
            break;
        //充值 申请、通过申请、驳回申请
        case 'apply_recharge' :
            routerObj = {
                name : 'rechargeRecord' //充值记录列表
            };
            break;
        case 'pass_recharge' :
        case 'reject_recharge' :
            routerObj = {
                name : 'paymentManage' //付款账户列表
            };
            break;
        //退票 申请、审核申请
        case 'apply_ticket_refund' :
        case 'audit_ticket_refund' :
        //改签 申请、审核申请
        case 'apply_ticket_alter' :
        case 'audit_ticket_alter' :
            routerObj = {
                name : 'individualFirstLevel',
                params : {
                    orderId : rowData.extData.id ? rowData.extData.id : '',
                }
            };
            break;
        //团队订单 申请、驳回、通过
        case 'create_team_order' :
        case 'reject_team_order' :
        case 'pass_team_order' :
            routerObj = {
                name : 'teamOrderDetail',
                params : {
                    orderId : rowData.extData.id ? rowData.extData.id : '',
                }
            };
            break;
        //下单失败
        case 'order_failure' :
            break;
        default :
    }
    let hasPermission = permissionFilter(routerObj);
    if (hasPermission) {
        return routerObj;
    } else {
        return;
    }
}



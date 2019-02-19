
/*获取clota-admin的翻译excel文件*/

let getTranslate = require('./translateMethod');
let zhCnData = require('../../clota-admin/src/assets/lang/modules/zhCNExportData');
let enData = require('../../clota-admin/src/assets/lang/modules/enExportData');
getTranslate(zhCnData,enData,'clota-mobile翻译');
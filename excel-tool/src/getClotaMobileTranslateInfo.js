
/*获取clota-mobile的翻译excel文件*/

let getTranslate = require('./translateMethod');
let zhCnData = require('../../clota-mobile/src/assets/lang/modules/zhCNExportData');
let enData = require('../../clota-mobile/src/assets/lang/modules/enExportData');
getTranslate(zhCnData,enData,'clota-mobile翻译');
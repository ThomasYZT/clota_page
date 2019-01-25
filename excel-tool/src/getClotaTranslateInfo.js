
/*获取clota的翻译excel文件*/

let getTranslate = require('./translateMethod');
let zhCnData = require('../../clota/src/assets/lang/modules/zhCNExportData');
let enData = require('../../clota/src/assets/lang/modules/enExportData');
getTranslate(zhCnData,enData,'clota翻译');
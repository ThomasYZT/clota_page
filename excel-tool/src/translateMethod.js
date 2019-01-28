// 生成excel文件公共方法
let nodeExcel = require('excel-export');
let fs = require('fs');
console.log(__dirname)
/**
 * 根据中英文文件自动生成excel文件
 * @param zhCNData 中文信息
 * @param enData 英文信息
 * @param excelName 文件名
 */
module.exports = (zhCNData,enData,excelName) => {
	let conf ={};
	conf.stylesXmlFile = __dirname + "/styles.xml";
	conf.name = "mysheet";
	conf.cols = [{
		caption:'中文',
		type:'string',
		width:50
	},{
		caption:'英文',
		type:'string',
		width:50
	}];
	let excelData = [];
	for (let item in zhCNData) {
		excelData.push([
			zhCNData[item],
			enData[item]
		]);
	}
	conf.rows = excelData;
	let result = nodeExcel.execute(conf);
	fs.writeFileSync(`dist/${excelName}.csv`,result,{'flag':'w','encoding' : 'binary'});
};
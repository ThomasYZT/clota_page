/**
 * 格式化B端英文翻译，将句子的首字母大写
 */
let fs = require('fs'); //文件模块
let path = require('path'); //系统路径模块
let enData = require('../../clota/src/assets/lang/modules/enExportData');
//指定创建目录及文件名称，__dirname为执行当前js文件的目录
let file = path.join(__dirname, 'en.json');

//创建data对象
let data = {};

for (let item in enData ) {
	let str = enData[item];
	data[item] = str.substr(0,1).toUpperCase() + str.substr(1);
}


//写入文件
fs.writeFile(file, JSON.stringify(data), function(err) {
	if (err) {
		return console.log(err);
	}
	console.log('文件创建成功，地址：' + file);
});
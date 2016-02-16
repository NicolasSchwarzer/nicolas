var path = require('./nicolas_modules/path'),
	fs = require('fs'),
	name = process.argv[2], hasSrc = process.argv[3] === '-r' ? true: false;

require('./nicolas_modules/string');

name = String.standardizeName(name);
fileName = String.standardizeName('component.' + name);

if (path.isFile(path.componentHTML5Path() + fileName + '.html')) {

	console.log('组件 ' + name + ' 已存在');

	return;
}

fs.writeFileSync(path.componentHTML5Path() + fileName + '.html', '<body container=".">\n\t\n</body>\n');

fs.writeFileSync(path.componentCSS3Path() + fileName + '.scss', 'div[data-nicolas-component="' + name + '"] {\n\t\n\t\n}\n');

fs.writeFileSync(path.componentJavascriptsPath() + fileName + '.js', 'console.log(exports);\n');

if (hasSrc) {

	var srcPath = path.componentResourcesPath() + fileName;

	if (path.isDir(srcPath)) {

		path.clear(srcPath);
	}
	else {

		fs.mkdirSync(srcPath);
	}
}

console.log('组件 ' + name + ' 创建完成');

var exec = require('child_process').exec;
var ipTool = require('../tools/ipTool');
var fs = require('fs');
var cmd = require('../tools/icommand')
/*
 * GET home page.
 */


var srcFile = './cppsrc/1.cc';
var exeFile = './cppsrc/1.out';
var inFile = './cppsrc/1.in';

exports.index = function(req, res){
	//写入文件
	var src = req.body.src;
	var inData = req.body.inData;
	//处理input的内容
	console.log('inData: ' + inData);
	ipTool.logRunCode(req);
	exec('chmod 777 ./cppsrc', function(err) {
	  if (err) {
	  console.log('更改cppsrc权限失败');
	  }
    });
	exec('chmod 777 ./cppsrc/*', function(err) {
	  if (err) {
	  console.log('更改cppsrc/*权限失败');
	  }
    });
	//fs.writeFile(inFile, inData, 'utf-8', function(err) {
	fs.writeFile(inFile, inData, function(err) {
		if (!err) {
			//fs.writeFile(srcFile, src, 'utf-8', function (err) {
			fs.writeFile(srcFile, src, function (err) {
				exec(cmd.compile(srcFile, exeFile), function(error, stdout, stderr) {
					if (error) {
						res.send({result: stderr});
					} else {
						exec(cmd.exe(exeFile, inFile), function(error, stdout, stderr) {
							res.send({result: stdout});
							//exec(cmd.rm(srcFile));
							//exec(cmd.rm(exeFile));
							//exec(cmd.rm(inFile));
						});
					}
				});
			});

		} else {
		  console.log('写入文件失败!');
		}
	});

	//res.send({name: req.body.name + ' is successed!'});
};

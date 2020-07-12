var formidable = require('formidable')
var path = require('path')
module.exports = async (req, res) => {
  var form = new formidable.IncomingForm();
  // 设置图片上传的地址
  form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload')
  // 保留图片后缀名
  form.keepExtensions = true
  // 设置文件上传大小
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.parse(req, function (err, fields, files) {
    if(err){
      res.json({
        meta: {
          msg: '上传头像失败',
          status: 503
        }
      })
      return
    } 
    console.log(path.basename(files.file.path));
    console.log(files.file.name);
    var filesPath = '/public/upload/' + path.basename(files.file.path)
    res.json({
      filesPath: filesPath,
      meta: {
        msg: '上传头像成功',
        status: 200
      }
    })
  })
}
var jwt = require('jsonwebtoken');// token 生成模块
var path = require('path')
var formidable = require('formidable')
// // 指定文件上传路径
// form.uploadDir = path.join(__dirname, '../', 'public', 'upload')
// // 是否保留表单上传文件的扩展名
// form.keepExtensions = true
// 全局密钥
const SECRET = 'miyaodalfdla;fj'
module.exports = {
  // 注册
  register: async (req, res) => {
    // console.log(fields)
    // 使用bcrypt加密密码
    var bcryptPassword = require('bcrypt').hashSync(req.body.password, 10)
    req.body.password = bcryptPassword
    req.models.userModel.create(req.body, function (err) {
      if (err) {
        console.log(err);
        res.json({
          meta: {
            msg: '注册失败',
            status: 503
          }
        })
        return false
      }
      res.status(200).json({
        meta: {
          msg: '注册成功',
          status: 200
        }
      })
    });
  },
  // 用户头像上传
  avatarupload: async (req, res) => {
    var form = new formidable.IncomingForm();
    // 设置图片上传的地址
    form.uploadDir = path.join(__dirname, '../', 'public', 'upload')
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
      } else {
        // console.log(files);
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
      }
    })
  },
  // 登录
  login: async (req, res) => {
    req.models.userModel.one({ username: req.body.username }, function (err, user) {
      if (err) {
        res.json({
          meta: {
            msg: '网络繁忙,请稍后再试',
            status: 503
          }
        })
        return false
      };
      if (!user) {
        // 没有该用户，习惯性返回422状态码
        return res.json({
          meta: {
            msg: '用户不存在',
            status: 422
          }
        })
      }
      // 对用户传过来的密码与数据库存储的密码进行比较
      const isPwddValid = require('bcrypt').compareSync(req.body.password, user.password)
      if (!isPwddValid) {
        // 如果密码不正确，给出提示信息
        return res.json({
          meta: {
            msg: '密码错误',
            status: 422
          }
        })
      }
      // 生成token jsorwtbtoken
      var token = jwt.sign({ id: user.id }, SECRET);
      // 登录成功后，返回用户信息及token
      res.status(200).json({
        data: {
          id: user.id,
          username: user.username,
          token: token
        },
        meta: {
          msg: '登录成功',
          status: 200
        }
      })
    })
  },
  // 获取所有用户
  allUser: async (req, res) => {
    // console.log(req);
    // 页码
    let page = req.query.page
    // 一页显示多少条数
    var pagesize = req.query.pagesize - 0
    // 起始页
    let start = (page - 1) * pagesize
    // 获取信息总数
    function getCount () {
      return new Promise((resolve) => {
        req.models.userModel.count({}, function (err, count) { 
          resolve(count);
        })
      })
    }
    let total = await getCount();
    // 总页数需要先得到总数，然后再除以pagesize
    let totalpage = Math.ceil(total / pagesize)
    console.log('总数'+ total );
    console.log('总页数' + totalpage);
    console.log('当前页' + page);
    console.log('一页显示几条：' +  pagesize);
    console.log('start' + start);
    req.models.userModel.find({}).limit(pagesize).offset(start).run(function (err, user) {
      res.json({
        totalpage: totalpage,
        total: total,
        page: page,
        data: user,
        meta: {
          msg: '获取用户成功',
          status: 200
        }
      });
    })
  },
  // 根据id获取用户
  userById: async (req, res) => {
    console.log('-------')
    console.log(req.params.id);
    req.models.userModel.one({ id: req.params.id }, function (err, user) {
      if (err) {
        res.json({
          meta: {
            msg: '网络错误',
            status: 503
          }
        })
        return false
      }
      console.log(user);
      res.json({
        data: user,
        meta: {
          msg: '获取用户成功',
          status: 200
        }
      });
    }); 
  },
  // 修改用户
  editUserById: (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => { 
      console.log('-----7777777777----------------------------------------------------777-')
      console.log(fields.avatarUrl);
      req.models.userModel.one({ id: req.params.id }, function (err, user) {
        // 用户名
        user.username = fields.username
        // 用户头像
        user.avatarUrl = fields.avatarUrl
        // 所在省份 
        user.country = fields.country
        // 出生时间
        user.birth = fields.birth
        // 是否立即启用
        user.state = fields.state
        // 爱好
        user.hobby = fields.hobby
        // 性别
        user.sex = fields.sex
        // 简介
        user.desc = fields.desc
        user.save(function (err) {
          if (err) {
            res.header("Access-Control-Allow-Origin","*");
            res.json({
              meta: {
                msg: '修改失败',
                status: 503
              }
            });
          } else {
            res.header("Access-Control-Allow-Origin","*");
            res.json({
              meta: {
                msg: '修改成功',
                status: 200
              }
            });
          }
        });
      })
    })
    // form.parse(req, (err, fields, files) => {
    // req.models.userModel.find({ id: req.params.id }).each(function (user) {
    //   console.log('-----7777777777777-')
    //   // console.log(fields);
    //     // 用户名
    //     user.username = fields.username
    //     // 所在省份 
    //     user.country = fields.country
    //     // 出生时间
    //     user.birth = fields.birth
    //     // 是否立即启用
    //     user.state = fields.state
    //     // 爱好
    //     user.hobby = fields.hobby
    //     // 性别
    //     user.sex = fields.sex
    //     // 简介
    //     user.desc = fields.desc

    //   }).save(function (err) {
    //     if (err) {
    //       res.json({
    //         meta: {
    //           msg: '修改失败',
    //           status: 503
    //         }
    //       });
    //     } else {
    //       res.json({
    //         meta: {
    //           msg: '修改成功',
    //           status: 200
    //         }
    //       });
    //     }
    //   });
    // })
  },
  // 删除用户
  deleteUserById: (req, res) => {
    console.log('-------+++++++pppp')
    console.log(req.params.id);
    req.models.userModel.one({ id: req.params.id }, function (err, user) {
      if (err) {
        res.json({
          meta: {
            msg: '获取用户失败',
            status: 503
          }
        })
        return false
      }
      user.remove(function (err) {
        if (err) {
          res.json({
            meta: {
              msg: '删除失败',
              status: 503
            }
          });
        } else {
          res.json({
            meta: {
              msg: '删除成功',
              status: 200
            }
          });
        }
      })
    }); 
  }
}
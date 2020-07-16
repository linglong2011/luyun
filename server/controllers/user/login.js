// 引入 token 生成模块
var jwt = require('jsonwebtoken')
// 导入config模块
const config = require('config');
// 获取全局密钥
const SECRET = config.get('SECRET')

module.exports = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  req.models.userModel.one({ username:username }, function (err, user) {
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
    const isPwddValid = require('bcrypt').compareSync(password, user.password)
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
        avatarUrl: user.avatarUrl,
        token: token
      },
      meta: {
        msg: '登录成功',
        status: 200
      }
    })
  })
}
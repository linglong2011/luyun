module.exports = (req, res) => {
  var { username, password, avatarUrl, country, sex, birth, state, hobby, desc } = req.body;
  if (avatarUrl == '') {
    avatarUrl = '/public/upload/defaultavatar.jpg'
  }
	// 使用bcrypt加密密码
  var bcryptPassword = require('bcrypt').hashSync(password, 10)
  req.body.password = bcryptPassword
  req.models.userModel.create({
    username,
    password,
    avatarUrl,
    country,
    sex,
    birth,
    state,
    hobby,
    desc
  }, function (err) {
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
}
module.exports = (req, res) => {
  // 解构出用户信息
  var { username, password, avatarUrl, country, sex, birth, state, hobby, desc } = req.body;
  req.models.userModel.one({ id: req.params.id }, function (err, user) {
    // 用户名
    user.username = username
    // 用户头像
    user.avatarUrl = avatarUrl
    // 所在省份 
    user.country = country
    // 出生时间
    user.birth = birth
    // 是否立即启用
    user.state = state
    // 爱好
    user.hobby = hobby
    // 性别
    user.sex = sex
    // 简介
    user.desc = desc
    // 保存用户信息
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
}
module.exports = async (req, res) => {
  console.log('用户id：' + req.params.id);
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
}
module.exports = (req, res) => {
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
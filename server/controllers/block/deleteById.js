module.exports = (req, res) => {
  console.log(req.params.id);
  req.models.blockModel.one({ id: req.params.id }, function (err, block) {
    if (err) {
      res.json({
        meta: {
          msg: '获取栏目失败',
          status: 503
        }
      })
      return false
    }
    block.remove(function (err) {
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
module.exports = async (req, res) => {
  console.log('栏目id：' + req.params.id);
  req.models.blockModel.one({ id: req.params.id }, function (err, block) {
    if (err) {
      res.json({
        meta: {
          msg: '网络错误',
          status: 503
        }
      })
      return false
    }
    console.log(block);
    res.json({
      data: block,
      meta: {
        msg: '获取栏目成功',
        status: 200
      }
    });
  }); 
}
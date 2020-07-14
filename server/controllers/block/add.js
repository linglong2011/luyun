module.exports = (req, res) => {
  var { block_name, block_desc } = req.body;
  console.log('================================');
  console.log(req.body);
  req.models.blockModel.create({
    block_name,
    block_desc
  }, function (err) {
    if (err) {
      console.log(err);
      res.json({
        meta: {
          msg: '添加栏目失败',
          status: 503
        }
      })
      return false
    }
    res.status(200).json({
      meta: {
        msg: '添加栏目成功',
        status: 200
      }
    })
  });
}
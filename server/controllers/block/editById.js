module.exports = (req, res) => {
  // 解构出栏目信息
  var { block_name, block_desc } = req.body;
  req.models.blockModel.one({ id: req.params.id }, function (err, block) {
    // 栏目名称
    block.block_name = block_name
    // 栏目描述
    block.block_desc = block_desc
    // 保存栏目信息
    block.save(function (err) {
      if (err) {
        // res.header("Access-Control-Allow-Origin","*");
        res.json({
          meta: {
            msg: '修改失败',
            status: 503
          }
        });
      } else {
        // res.header("Access-Control-Allow-Origin","*");
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
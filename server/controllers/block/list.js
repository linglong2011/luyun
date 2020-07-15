module.exports = async (req, res) => {
  // 关键字
  let query = req.query.query
  // 页码
  let page = req.query.page
  // 一页显示多少条数
  var pagesize = req.query.pagesize - 0
  // 起始页
  let start = (page - 1) * pagesize
  // 获取信息总数
  function getCount () {
    return new Promise((resolve) => {
      if (query) {
        // req.models.blockModel.count({ block_name : query }, function (err, count) { 
        //   resolve(count);
        // })
        req.models.blockModel.find({}).where("block_name LIKE ?", ['%' + query + '%']).run(function (err, list) {
          console.log(list.length);
          resolve(list.length);
        })
      } else {
        req.models.blockModel.count({ }, function (err, count) { 
          resolve(count);
        })
      }
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
  
  if (query) {
    req.models.blockModel.find({}).where("block_name LIKE ?", ['%'+query+'%']).limit(pagesize).offset(start).run(function (err, list) {
      console.log(list);
      res.json({
        totalpage: totalpage,
        total: total,
        page: page,
        data: list,
        meta: {
          msg: '获取栏目成功',
          status: 200
        }
      });
    })
  } else {
    req.models.blockModel.find({ }).limit(pagesize).offset(start).run(function (err, list) {
      console.log(list);
      res.json({
        totalpage: totalpage,
        total: total,
        page: page,
        data: list,
        meta: {
          msg: '获取栏目成功',
          status: 200
        }
      });
    })
  }
}
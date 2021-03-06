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
        req.models.userModel.find({}).where("username LIKE ?", ['%' + query + '%']).run(function (err, user) {
          resolve(user.length);
        })
       } else {
        req.models.userModel.count({}, function (err, count) { 
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
    req.models.userModel.find({}).where("username LIKE ?", ['%'+query+'%']).limit(pagesize).offset(start).run(function (err, user) {
      res.json({
        totalpage: totalpage,
        total: total,
        page: page,
        data: user,
        meta: {
          msg: '获取用户成功',
          status: 200
        }
      });
    })
   } else {
    req.models.userModel.find({}).limit(pagesize).offset(start).run(function (err, user) {
      res.json({
        totalpage: totalpage,
        total: total,
        page: page,
        data: user,
        meta: {
          msg: '获取用户成功',
          status: 200
        }
      });
    })
  }
  
}
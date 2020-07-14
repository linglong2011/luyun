// 定义 module 模块
module.exports = function (db, models) {
  models.blockModel = db.define("block", {
    id: { type: 'serial', key: true },
    block_name: String,
    block_desc: String
  })
};

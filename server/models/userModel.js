// 将路由对象做为模块成员进行导出
module.exports = function (db, models) {
  models.userModel = db.define("user", {
    id: { type: 'serial', key: true },
    username: String,
    password: String,
    avatarUrl: String,
    country: ["China", "USA", "Canada"],
    sex: String,
    birth: String,
    state: Boolean,
    hobby: String,
    desc: String
  })
  
};

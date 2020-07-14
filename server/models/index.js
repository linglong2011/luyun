module.exports = function (db, models, next) {
  // 加载用户模型 userModel
  require('./userModel')(db, models)
  // 加载 block 模型
  require('./blockModel')(db, models)
  next();
}
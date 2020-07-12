module.exports = function (db, models, next) {
  // 加载用户模型 userModel
  require('./userModel')(db, models)
  // 加载article模型
  // require('./models/articleModel')(db, models)
  next();
}
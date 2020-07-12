var person_controllers = require('../modules/person_controllers')
var user_controllers = require('../modules/user_controllers')
var article_controllers = require('../modules/article_controllers')

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// token 生成模块
var jwt = require('jsonwebtoken');
// 全局密钥
const SECRET = 'miyaodalfdla;fj'
// auth验证
const auth = async (req, res, next) => {
  // 取得token
  const raw = String(req.headers.authorization).split(' ').pop()
  // 解密token中的id
  const { id } = jwt.verify(raw, SECRET)
  // 根据id查找用户
  req.models.userModel.find({ id: id }, function (err, user) {
    if (err) throw err;
    // 返回用户信息
    req.user = user
    next()
  });
}
// 导出所有路由
module.exports = function (app) {
  // 首页
  app.get('/', async (req, res) => { res.send('ok') })
  // 人员列表
  app.get("/personlist", person_controllers.allPerson)
  // 根据id显示人员
  app.get("/personlist/:id", person_controllers.personById)
  // 根据id显示人员
  app.get("/personlistadd", person_controllers.addPerson)
  // 注册
  app.post("/register", jsonParser, user_controllers.register);
  // 文件上传
  app.post("/avatarupload", user_controllers.avatarupload);
  // 登录
  app.post("/login", jsonParser, user_controllers.login);
  // 获取所有用户
  app.get("/alluser", user_controllers.allUser);
  // 获取指定id的用户
  app.get("/users/:id", user_controllers.userById);
  // 根据id修改用户
  app.put("/editusers/:id", user_controllers.editUserById);
  // 根据用户id修改
  app.delete("/deleteusers/:id", user_controllers.deleteUserById);
  // 添加文章
  app.post("/addarticle", article_controllers.addArticle);
  // 所有需要用户登录的页面，都需要加上auth公共方法
  app.get("/profile", auth, async (req, res) => {
    res.send(req.user)
  });
};
// 引用expess框架
const express = require('express');

// 引入 body-parser 中单件 对需要使用 body-parser 的路由进行单独设置
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

// 创建博客展示页面路由
const admin = express.Router();

// 注册
admin.post('/register', jsonParser, require('../controllers/user/register'));

// 登录
admin.post('/login', jsonParser, require('../controllers/user/login'));

// 获取所有用户
admin.get('/alluser', require('../controllers/user/allUser'));

// 获取指定id的用户
admin.get("/users/:id", require('../controllers/user/userById'));

// 获取指定id的用户
admin.put("/editusers/:id", jsonParser, require('../controllers/user/editUserById'));

// 获取指定id的用户
admin.delete("/deleteusers/:id", require('../controllers/user/deleteUserById'));

// 头像上传
admin.post("/avatarupload", require('../controllers/user/avatarupload'));

// 添加栏目
admin.post("/block/add", jsonParser, require('../controllers/block/add'));

// 栏目列表
admin.get("/block/list", require('../controllers/block/list'));

// 将路由对象做为模块成员进行导出
module.exports = admin;
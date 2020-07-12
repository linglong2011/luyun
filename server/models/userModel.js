
module.exports = function (db, models) {
  //define方法的第一个参数为表名
  models.userModel = db.define("user", {
    id        : { type: 'serial', key: true },
    username  : String,
    password  : String,
    avatarUrl : String,
    country   : [ "China", "USA", "Canada" ],
    sex       : String,
    birth     : String,
    state     : Boolean,
    hobby     : String,
    desc      : String
  });
}; 

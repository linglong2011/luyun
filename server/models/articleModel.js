
module.exports = function (db, models) {
  //define方法的第一个参数为表名
  models.articleModel = db.define("article", {
    newsid      : { type: 'serial', key: true },
    title       : String,
    desc        : String,
    creationtime: String,
    auth        : String,
    cover       : String,
    content     : String,
    desc        : String,
    source      : String
  });
}; 

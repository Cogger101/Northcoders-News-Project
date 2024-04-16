const db = require("../db/connection")


exports.selectTopics = () =>{
 return db.query('SELECT * FROM topics;').then((results)=>{
    return results.rows
 })
}

exports.selectArticleId = (article_id) =>{
   return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then((result)=>{
      if (result.rows.length === 0){
         return Promise.reject({status:404, msg: 'article does not exist'})
      }
      else if (!result){
         return Promise.reject({status:400, msg: 'Bad request'})
      }
      return result.rows[0]
   })
}
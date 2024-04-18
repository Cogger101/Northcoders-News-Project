const db = require("../db/connection")


exports.selectTopics = () =>{
 return db.query('SELECT * FROM topics;').then((results)=>{
    return results.rows
 })
}

exports.selectArticleId = (article_id) =>{
   return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id]).then((result)=>{
      if (result.rows.length === 0){
         return Promise.reject({status:404, msg: 'article does not exist'})
      }
      return result.rows[0]
   })
}

exports.selectAllArticles = ()=>{
   return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url,
   COUNT (comments.article_id) AS comment_count
   FROM articles
   LEFT JOIN comments ON comments.article_id = articles.article_id
   GROUP BY articles.article_id
   ORDER BY created_at DESC;`).then((results)=>{
      return results.rows
   })
}

exports.selectAllCommentsPerId = (article_id)=>{
   return db.query(`SELECT *
   FROM comments
   WHERE comments.article_id = $1
   ORDER BY created_at DESC;`,[article_id]).then((results=>{
      if (results.rows.length === 0){
         return Promise.reject({status:404, msg: 'article does not exist'})
      }
      return results.rows
   }))
}

exports.insertComment = ( newComment, article_id)=>{
   const {username, body} = newComment
   return db.query(`INSERT INTO comments (author, body, article_id) 
   VALUES ($1, $2, $3)
   RETURNING *;`,[username,body,article_id]).then((results)=>{
      if (results.rows.length === 0){
         return Promise.reject({status:404, msg: 'article does not exist'})
      }
      return results.rows[0]
   })
}
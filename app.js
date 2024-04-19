const express = require("express")
const app = express()
const {getTopics, getAPI, getArticle, getArticles, getComments, postComment, patchArticle, deleteCommentById, getUsers} = require('./controllers/controllers')
const {handleCustomErrors, handleBadRequestErrors, handleNotFoundErrors, handleSeverErrors} = require('./error-handling/index')


app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getAPI)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getComments)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.get('/api/users', getUsers)

// Error handling starts here


app.use(handleCustomErrors)

app.use(handleBadRequestErrors)

app.use(handleNotFoundErrors)

app.use(handleSeverErrors)

module.exports = app
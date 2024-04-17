const express = require("express")
const app = express()
const {getTopics, getAPI, getArticle, getArticles, getComments} = require('./controllers/controllers')
const {handleCustomErrors, handleBadRequestErrors, handleNotFoundErrors, handleSeverErrors} = require('./error-handling/index')



app.get('/api/topics', getTopics)

app.get('/api', getAPI)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getComments)

// Error handling starts here

app.use(handleCustomErrors)

app.use(handleBadRequestErrors)

app.use(handleNotFoundErrors)

app.use(handleSeverErrors)

module.exports = app
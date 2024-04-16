const express = require("express")
const app = express()
const {getTopics, getAPI, getArticle} = require('./controllers/controllers')
const {handleCustomErrors, handleBadRequestErrors, handleNotFoundErrors} = require('./error-handling/index')



app.get('/api/topics', getTopics)

app.get('/api', getAPI)

app.get('/api/articles/:article_id', getArticle)

// Error handling starts here

app.use(handleCustomErrors)

app.use(handleBadRequestErrors)

app.use(handleNotFoundErrors)


module.exports = app
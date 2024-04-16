const {selectTopics, selectArticleId} = require('../models/models.js')
const endpoints = require('../endpoints.json')

exports.getTopics = (req, res, next)=>{
    selectTopics().then((topics)=> {
        res.status(200).send({topics})
    })
}

exports.getAPI = (req, res, next)=>{
    res.status(200).send({endpoints})
    }

exports.getArticle = (req, res, next)=>{
    const {article_id} = req.params
    selectArticleId(article_id).then((article)=>{
        res.status(200).send({ article })
    })
    .catch((err)=>{
        next(err)})
}
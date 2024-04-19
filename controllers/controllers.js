const {selectTopics, selectArticleId, selectAllArticles, selectAllCommentsPerId, insertComment, updateArticle, removeCommentById} = require('../models/models.js')
const endpoints = require('../endpoints.json')
const comments = require('../db/data/test-data/comments.js')

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

exports.getArticles = (req, res, next)=>{
    selectAllArticles().then((articles)=>{
        res.status(200).send({articles})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.getComments = (req, res, next)=>{
    const {article_id} = req.params
    selectAllCommentsPerId(article_id).then((comments)=>{
        res.status(200).send({comments})
    })
    .catch((err)=>{
        next(err)
    })
}

exports.postComment =(req, res, next)=>{
    const {article_id} = req.params
    const newComment = req.body
    insertComment(newComment, article_id).then((comment)=>{
        res.status(201).send(comment)
    })
    .catch((err)=>{
        next(err)
    })
}

exports.patchArticle = (req, res, next)=>{
    const {article_id} = req.params
    const updatedVotes = req.body.inc_votes
    updateArticle(updatedVotes, article_id).then((article)=>{
        res.status(200).send(article)
    })
    .catch((err)=>{
        next(err)
    })
}

exports.deleteCommentById = (req, res, next)=>{
    const {comment_id} = req.params
    removeCommentById(comment_id).then(()=>{
        res.status(204).send()
    })
    .catch((err)=>{
        next(err)
    })
}
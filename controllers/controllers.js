const {selectTopics} = require('../models/models.js')
const endpoints = require('../endpoints.json')

exports.getTopics = (req, res, next)=>{
    selectTopics().then((topics)=> {
        res.status(200).send({topics})
    })
}

exports.getAPI = (req, res, next)=>{
    res.status(200).send({endpoints})
    }

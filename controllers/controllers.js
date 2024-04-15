const {selectTopics} = require('../models/models.js')

exports.getTopics = (req, res, next)=>{
    selectTopics().then((topics)=> {
        res.status(200).send({topics})
    })
}


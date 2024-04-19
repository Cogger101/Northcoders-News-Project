// Error handling 

exports.handleCustomErrors = ((err, req, res, next)=>{
    if (err.status){
        res.status(err.status).send({msg: err.msg})
    }
    else next(err)
})

exports.handleNotFoundErrors = ((err, req, res, next)=>{
    if (err.code === '23502'){
        res.status(404).send({msg:'article does not exist'})
    }
    else next(err)
})

exports.handleBadRequestErrors = ((err, req, res, next)=>{
    if (err.code === '22P02'){
        res.status(400).send({msg: 'Bad request'})
    }
    else next(err)
})

exports.handleSeverErrors = ((err, req, res, next)=>{
    console.log(err)
    res.status(500).send({msg: 'Internal Sever Error'})
})
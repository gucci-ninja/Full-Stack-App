var express = require('express')
var router = express.Router()
var ZoneController = require('../controllers/ZoneController')

// where controllers will be found, index.js is default
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){
    var resource = req.params.resource     // get resource from client
    // find out which controller you need by resource name, both have the same functions
    var controller = controllers[resource]
    // if you type zone or comment wrong or requet a random api
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: '+resource
        })
        return
    }

    controller.find(req.query, function(err, results){
        if (err){
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }

        res.json({
            confirmation: 'success',
            results: results // payload
        })
    })
}) 

router.get('/:resource/:id', function(req, res, next){

    var resource = req.params.resource
    var id = req.params.id
    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: '+resource
        })
        return
    }

    controller.findById(id, function(err, result){
        if (err){
            res.json({
                confirmation: 'fail',
                message: 'Not Found' // Can also put err but mongoose error msgs are kind of confusing
            })
            return
        }
        res.json({
            confirmation: 'success',
            result: result
        })
    })
})

router.post('/:resource', function(req, res, next){

    var resource = req.params.resource
    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: '+resource
        })
        return
    }

    controller.create(req.body, function(err, result){
        if (err){
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }
        res.json({
            confirmation: 'success',
            result: result
        })
    })
})

router.put('/:resource/:id', function(req, res, next){
    var resource = req.params.resource
    var id = req.params.id
    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: '+resource
        })
        return
    }

    controller.update(id, req.body, function(err, result){
        if (err){
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    
})

router.delete('/:resource/:id', function(req, res, next){
    var resource = req.params.resource
    var id = req.params.id
    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid resource request: '+resource
        })
        return
    }

    controller.delete(id, function(err){
        if (err){
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }
        res.json({
            confirmation: 'success',
            // result: null
        })
    })
})

module.exports = router


var Zone = require('../models/Zone') 

module.exports = {
    
    find: function(params, callback){
        Zone.find(params, function(err, zones){
            if (err){
                callback(err, null)
                return
            }
            callback(null, zones)
        })
    },

    findById: function(id, callback){
        Zone.findById(id, function(err, zone){
            if (err){
                callback(err, null)
                return
            }
            callback(null, zone)            
        })
    },

    // To test this we actually need a view with a form where you input stuff
    create: function(params, callback){
        // take the string input and split it by commas
        var zips = params['zipCodes']
        var zip = zips.split(',')
        var newZips = []
        zip.forEach(function(zipCode){
            newZips.push(zipCode.trim())
        })

        params['zipCodes'] = newZips

        Zone.create(params, function(err, zone){
            if (err){
                callback(err, null)
                return
            }
            callback(null, zone)
        })
    },

    update: function(id, params, callback){
        Zone.findByIdAndUpdate(id, params, {new:true}, function(err, zone){
            if (err){
                callback(err, null)
                return
            }
            callback(null, zone)
        })
        
    },

    // 1:25:12 about to make delete functiom
    delete: function(id, callback){
        Zone.findByIdAndRemove(id, function(err){
            if (err){
                callback(err, null)
                return
            }
            callback(null, null)
        })   
    }
}

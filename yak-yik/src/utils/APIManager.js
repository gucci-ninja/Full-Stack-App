import superagent from 'superagent'

export default {

    get: (url, params, callback) => {
        superagent
        .get(url)
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {

            // check the err first
            if (err){
                callback(err, null)
                alert('ERROR: '+err)
                return
            }
            // if this is successful then we can move on
            const confirmation = responsebody.confirmation

            if (confirmation != 'success'){
                // in case of failure, run the callback with error msg
                callback({message: response.body.message}, null)
                return
            }
            callback(null, response.body)
        })
    },

    post: () => {

    },

    put: () => {

    },

    delete: () => {

    }

}
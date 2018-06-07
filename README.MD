# Instructions

## Introduction
So I started working on this project last summer because I wanted to become more familiar with react and node js and stop resorting to copy pasting boilerplate code. I kind of slowed down because of my summer job and then school started but I'm back now and I hope I'll finish it before I start working in August. I basically followed along a tutorial by Velocity 360 so if you want to get used to making fullstack apps check his stuff out, he's really good!

<br>

Update: I kind of forgot to explain what this web app is, basically it's a clone of the popular app Yik-Yak that was popular a while back!

## REST API
This was very new to me because I've only ever used REST APIs but this time I got to make my own!??

1. Create an express project and install dependencies

```
express yak-yik --hogan

```

2. Go into your routes directory to create some endpoints (URI's). There's already an index.js and user.js, go ahead and create api.js. Don't forget to import express and router! Oh and you probably won't be needing users.

3. Start by defining your homepage route. This requires [middleware](https://expressjs.com/en/guide/using-middleware.html) functions that let us use request/response objects and then call the next middleware function.

```
// homepage route
router.get('/:resource', function(req, res, next){
})
```

If you're still having trouble, routing is explained really well [here](https://expressjs.com/en/guide/routing.html)

4. In app.js, import your api so you can actually use it.

5. Create some models/resources for your REST API. Create a models directory and add your 2 models: Zone.js and Comment.js

6. We're going to be using mongoose for this since we will be saving things in a database. SO if you haven't already

```
npm i -S mongoose
```

7. Import it in both models and create a mongoose schema for each one. Each schema maps to a MongoDB collection and defines the type for each db attribute. For zones we decided to have name, zipcodes and timestamp for the Zone and username, body, timestamp for Comment!

```
var ZoneSchema = new mongoose.Schema({

    zipCodes: {type:, default:}
})

```

8. Convert schema to model because that's what we work with by adding this line.

```
module.exports = mongoose.model('ZoneSchema', Zoneschema)
```

9. Now we neesd to make CRUD operations for the resources we defined in our database. CRUD stands for create, read, update and delete. Looking at this from a MVC perspective, CRUD operations would go under controllers, so the next step is to create a ```controllers``` directory. Add ```ZoneController.js```, ```CommentController.js``` and may as well get your ```index.js``` set up in there.

**SideNote:** It's important to create a RESTful API so other people can easily use it/make changes to it instead of spending a week to learn how the backend works. [This](https://www.mulesoft.com/resources/api/what-is-rest-api-design) article explains what makes a RESTful API really well, it needs to have CRUD operations, use HTTP with URI resources - all of which we are doing here.

10. In ```ZoneController.js```, we are going to start by importing the models we just made and set up our CRUD ops. For each of the CRUD ops we set up, we need to define arguments that they will take. I only did ```find``` here.

```
var Zone = require('../models/Zone') // import

// constructor for controller
module.exports = {
    
    find: function(params, callback){

        // mongoose functions
        Zone.find(params, function(err, zones){
            if (err){
                callback(err, null) // err first, payload second
                return
            }
            callback(null, zones)
        })
    },

    findById: function(){
    },

    update: function(){
    },

    create: function(){
    },

    destroy: function(){
    }
}
```

11. In order to test if our find operation is working, we need to run the code. But before doing that we need to set up our database and tell our api what to do when someone wants to 'find'. 

#### Database
We're using mongodb locally at first but later on there will be a live url. This code goes into  ```app.js```

```
var dbUrl = 'mongodb://localhost/yak-yik'
mongoose.connect(dbUrl, function(err, res){
    if (err) {
        console.log('DB connection failed: '+err)
    }
    else {
        console.log('db connection successful: '+dbUrl)
    }
})

```

#### API
In api.js we are gonna import the ZoneController and add some if statements for what our ```req.params.resource`` is or, what resource the user has requested.

```
if (resource == 'zone') {
    ZoneController.find(req.query, function(err, results)) { // not req.body, that is for post/put
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            })
        }
    }

}
```

**Note: the functiont that we defined above for error handling is the callback function**
12. Import controller in ```api.js```. 

13. To run the app, run the ```mongod``` command on a separate terminal and then run your app with ```nodemon``` or ```npm start    ```

14. After coding find and findById (both are basically the same), do the create operation. To test this we will need to create a view with a form so in views make createzone.hjs, a temporary page for testing and add it to our routes under ```index.js```

```
<form action="/api/zone" method="post">

the url/endpoint is /api/zone because that is our resource name and http method is post, which dictates what happens
```
 

15. Create api route post. Remember, get is find/findById and post is create, and put is update (by convenction). And for find, you look at the req.query and for post you look at req.body. And resource is always req.params.resource.

16. Make the update function using findByIdAndUpdate and also the put route in api.js.

17. For the CommentController, you can literally copy paste ZoneController, change up the name and change the create operation because that one is going to be different, the rest are pretty standard.

18. Set up the index.js in controllers by importing your controllers and creating a json for zone and comment. Now in the api.js you should be able to address both Comment and Zone as one general controller because they both have the same functions. 

```
var controllers = require('../controllers) // default is index.js

var controller = controllers[resource] // points to either zone or comment
```

You will have to change ZoneController.find/other mongoose methods to controller.mongoose methods.

**Quick note: to purge the mongodb of your data run mongo repo-name and show collections, then db.getCollection("schemaname").drop()**

### React
1:43:00

- a component based system, like lego pieces
- you put together components to create a UI
- these components are reused throughout the website, making it modular
- each component is basically a custom html tag (vaguely)

#### First React Component

1. We need to install dependencies for react
    - there's a lot of them
- facebook's thing create-react-app does all of them for you but we won't be using it this time
- our react code gets translated into a bundle and the bundle is executed by bundlers

```
npm i -S react
npm i -S react-dom // takes your react code and binds it to html dom

// bundlers, task runner that runs our babel tasks
npm i -D webpack // locally
sudo npm i -g webpack // globally, you need to have both

// transpilers, since not every browser will read es6, they read es5 (conventional javascript)
npm i -D babel-core
npm i -D babel-loader
npm i -D babel-preset-react
npm i -D babel-preset-es2015
```

2. Set up webpack with touch webpack.config.js
- this is where we tell webpack what to tell babel what to do or 'how to bundle the code
- it's just a simple json file for now
- this is essentially boilerplate code, only need to change a few things for each project like the entry points and maybe the directory for output

```
import webpack and path

module.exports = {
    entry: {
        app: where to find our react code // important line
    },
    output: {
        // another important line
    },
    devtool: '#source-map',
    modules: {}
}

```
3. Actually create the entry/output directories and files. We will now make our first react component in src/app.js which will get compiled and rendered in the browser.
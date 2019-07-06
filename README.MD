# Instructions

## Introduction
An app that uses react and node, a re-make of the popular app yik-yak.

## REST API
1. Create an express project and install dependencies

```
express yak-yik --hogan
```

2. Go into routes directory to create some endpoints (URI's). There's already an index.js and user.js, go ahead and create api.js. Don't forget to import express and router. Oh and you probably won't be needing users.

3. Start by defining your homepage route. This requires [middleware](https://expressjs.com/en/guide/using-middleware.html) functions that let us use request/response objects and then call the next middleware function.

```
// homepage route
router.get('/:resource', function(req, res, next){
})
```

Some info on [routing](https://expressjs.com/en/guide/routing.html)

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

4. To compile our react code we run the bundle, so let's make that now by running webpack (I had to change the config file a lot because the code I had was for an old version of webpack)

**Note: my webpack creates a dist directory even though it should go in public so I made a smol bash script as a temporary fix**

5. We're going to run our react code in the index.hjs so we are gonna open that up and import the bundle and add the root div tag.

6. Next step is to create a components directory in our src/ and then create a file for rendering zones. This one won't use react-dom, instead, it'll get exported into our app.js React code (the entry point, where everything gets rendered by react-dom)

Import Zones in app.js

Also get rid of stylesheet in index.hjs.

**Note: we will be writing jsx which is basically html**

7. Setting properties for components - so everything isn't hardcoded - this.props

8. How data is stored in react:
- prop - things you don't get to pick, they're assigned to you
- state - things that can be controlled (usually visual?)
- we wanna set up an object that holds the state of zones
- whenever you're inserting an object in react you need curly braces around it
- if you wanna change css styles you use 2 curly braces: style={{textDecoration:'none'}}


9. Components store layouts for each page. Create a Home.js in the components directory. We're going to swap Zone with Home in app.js. The layout acts as a container for other components. There are 3 types - container, presentational(view) and layout, each ideally with their own directory in the components dir.

```
import React, { Component } from 'react'

class Home extends Component {
    render(){
        return (
            <div>
                This is the Home Component!
            </div>
        )
    }
}

export default Home
```

10. Splitting view in half so the right side shows the Zone contents - using bootstrap cdn.

11. Make comments and comment on the right side. Just get something showing up. For now it's just hardcoded because we haven't integrated the API yet. Still use the same signature as our comment model so have a body and username.

**Note:** The constructor is an already made function that runs every time no matter what. But if we do implement it (like we do in Zones and Comments) we need to call super() so the previous implementation does not change and that we're only adding to the constructor (not replacing it - which would ruin everything). This is also where you would use override if you wanna change a pre-existing thing in the constructor.

12. Use the hr tag for line separation. CLose the tage because every tag must be closed in jsx.

### User Interaction

1. Adding a comment. Ned to capture typed values and trigger an action when the submit button is clicked. Add ```onClick={this.submitComment.bind(this)}```

2. Define submitComment in Comments.js. Javascript has a defalt event argument.

3. Save what the user types for comment and username as a state. Add an attribute to state called comment to do this. One of the rules of react is that you never mutate state so we're going to be creating a copy, update the copy and reset the state.

4. setState allows you to change a react component and have it reload that component. React reacts to the changes of state.

#### Adding a New Zone

1. Work on the Zones.js container. Add 2 input forms, name and zipcode and then a submit button.

2. Add functionality for updating the list of zones. Add an id to each input to differentiate them.

3. Remember that when you are updating to never mutate the state, always create a copy and then change that.

#### Remove dummy data and pull from database using our api

1. Clear out the lists and start with empty arrays so that when you reload the pages there are no zones and comments and you should be able to create zones and comments.

2. Make sure there is some data already in the database by going to api/zone or api/comment. If not, create some data through the createcommenIt or createzone views.
I
3. Start usiIng the API by installing the superagent. This will allow us to make API Irequests for our component.

```
npm i -S superagent
```

4. Inside Zones.js, import superagent from the module

```
import superagent from 'superagent'
```

5. We're going to override a function called componentDidMount. The get request is at /api/zone. There are no parameters like city= so the query is null. Set tells superagent what kind of data we're getting back (json). At the end is the callback function with err, response. In this we will show the err msg or the response.

```
 superagent
        .get('api/comment')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if(err){
                alert('ERROR: '+err)
                return
            }

            let results = response.body.results

            this.setState({
                list: results
            })
        })
```

6. Fix issue with array of zips vs zip (temporarily) by taking the first zipcode of the array.

### API Manager

1. Create a manifest file, .env (I forgot to do this in the beginning)

2. Superagent is used a lot to make API requests so instead of having a long query such as the one above each time, people usually create a utils directory inside the src folder.

3. Create APIManager.js inside utils. This class will make API requests for us. Generally for modules that are used a lot, it is good practice to make a utility helper class.

4. Inside APIManager, import superagent and since we'll be using this class everywhere, export default {}

5. Since this is a wrapper class, we're going to write a series of functions that will make http requests - get, post, put, delete.

```
get: (url, params, callback) = {

}
```

6. Inside get, just copy and paste the above query and make changes where they are needed.


## Docker!

I needed to dockerize this application because I no longer have the dependencies on my Arch linux.
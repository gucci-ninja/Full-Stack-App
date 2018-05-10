# Instructions

## Introduction
So I started working on this project last summer because I wanted to become more familiar with react and node js and stop resorting to copy pasting boilerplate code! I kind of slowed down because of my summer job and then school started. But I'm back now and I hope I'll finish it before I begin my internship in August! I basically followed along a tutorial by Velocity 360 so if you want to code smarter check his stuff out, he's really good!

<br>

Update: I kind of forgot to explain what this web app is, basically it's a clone of the popular app Yik-Yak that was popular a while back!

## REST API
This was very new to me because I've only ever used REST API's but this time I got to make my own!

1. Create express project and install dependencies

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

9. Now we need to make CRUD operations for the resources we defined in our database. CRUD stands for create, read, update and delete. Looking at this from a MVC perspective, CRUD operations would go under controllers, so the next step is to create a ```controllers``` directory. Add ```ZoneController.js```, ```CommentController.js``` and may as well get your ```index.js``` set up in there.

**SideNote:** It's important to create a RESTful API so other people can easily use it/make changes to it instead of spending a week to learn how the backend works. [This](https://www.mulesoft.com/resources/api/what-is-rest-api-design) article explains what makes a RESTful API really well, it needs to have CRUS operations, use HTTP with URI resources - all of which we are doing here.




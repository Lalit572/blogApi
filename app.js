
// "start":"nodemon --experimental-modules --es-module-specifier-resolution=node app.js", while using es6

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/userroutes');
const blogRouter = require('./routes/blogroutes');
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());

app.use('/api/user',router);
app.use('/api/blog',blogRouter);

mongoose.connect('mongodb+srv://<yourusername>:<yourpassword>@cluster0.jcj1g0c.mongodb.net/socialDB', { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to the database");
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    })
    .catch((e) => {
        console.log("Error connecting to the database:", e);
    });




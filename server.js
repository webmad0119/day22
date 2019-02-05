const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const handlebars = require("express-handlebars")

mongoose.Promise = Promise;
mongoose
    .connect('mongodb://localhost/airports', { useMongoClient: true })
    .then(() => {
        console.log('Connected to Mongo!')
    }).catch(err => {
        console.error('Error connecting to mongo', err)
    });

//here we set the templating default engine
app.set('view engine', 'hbs');

//todo: indicate origin URL
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: __dirname + '/views'
}));

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: String,
    location: Object
});

const Location = mongoose.model("Location", locationSchema);

app.get("/map", (req, res, next) => {
    res.render("index2")
})

app.get("/waypoints", (req, res, next) => {
    res.render("waypoints")
})

app.get("/airports/:limit", (req, res, next) => {
    console.log(req.params.limit)
    Location.find({}, { _id: 0, name: 1, coords: 1 }).limit(+req.params.limit)
        .then((locations) => {
            res.json(locations)
        })

})

app.get('/giveMeSomeText', (req, res) => {
    res.json({"text": "en un lugar de la Mancha"})
})

app.listen(3000)


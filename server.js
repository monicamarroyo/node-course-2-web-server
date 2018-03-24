const express = require('express');
var hbs = require('hbs');
const fs = require('fs');

var app = express(); // making a new express app
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use((req,res, next) => { // next servers when middlewear is done its needed
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err) {
            console.log('unable to append to server.log');
        }
    });
    next();

});// how u register middlewear
/*
app.use((req,res,next) => {
    res.render('main.hbs');
});
*/

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear(); // uses inside mustache html
});// takes two arguments name and function to run

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});


// http route handler, 1 arugment is the url, next is function of what to run


app.get('/',(req,res) => { // two arguments, request response 
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage: 'Welcome to my website',
        
    });
});

app.get('/about', (req,res) => {
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page',
        
    });
});
//bad- send back json with Error message
app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('server is up');
}); // to bind the http request
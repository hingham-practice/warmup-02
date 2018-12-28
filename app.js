'use strict';

const express = require('express');
const app = express();

//EJS Template Setup
app.set('views', `${__dirname}/views`); //global name you get with node
app.set('view engine', 'ejs');

// Static routes
app.use( express.static(`${__dirname}/public`) );

//App Middleware 
app.use(express.json() );//this can an object sent in a post

//Routes
app.get('/', (req, res)=>{
    res.send('<h1>Hello from route</h1>');
});

app.post('/save', (req, res)=>{
    res.json(req.body);
});

app.get('/err', (req, res, next)=>{
    next('this is a catastrophic error'); // if you call next with anything it is an error
});

app.get('*', (req, res)=>{
    res.status(404);
    res.statusMessage = 'Not found';
    res.render('not-found', {requrest: req});
});

app.use( (err, req, res, next) => {
    res.status(500);
    res.statusMessage = 'Server Error';
    res.render('error', {requrest: req, error: err});
});


module.exports = {
    server: app,
    start: (port) =>{
        app.listen(port, () => console.log('Server up on port', port));
    }
}
// app.listen(8080, () =>{ console.log('server is up on 8080')});


'use strict';

const express = require('express');
const app = express();

app.set('views', `${_dirname}/views`);
app.set('view engine', 'ejs');

app.use( express.static(`${_dirname}/public`));

app.use(express.json() );

app.get('/', (req,res)=>{
    res.send('<h1>Hello from route</h1>');
});

app.post('/save', (req, res)=>{
    res.json(req.body);
});

app.get('/err', (req, res, next)=>{
    next('this is a catastrophic error');
});

app.get('*', (req, res)=>{
    res.status(404);
    res.statusMessage = 'Not found';
    res.render('not-found', {request: req});
});

app.use( (err, req, res, next)=>{
    res.status(500);
    res.statusMessage = 'Server Error';
    res.render('error', {request: req, error: err});
});

app.listen(8090, () => {console.log('server is up on 8080')});

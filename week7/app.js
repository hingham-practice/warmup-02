'use strict';
const express = require('express');
const cors = require('cors');
const app = express();

app.set('views', './views');

app.set('view enginge', 'ejs');

app.use(express.static('./public'));

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hello');
});

app.post('/save', (req, res)=>{
    res.json(req.body);
})

app.get('/err', (req, res, next)=>{
    next('thisis an error message');
});

app.get('*', (req, res)=>{
    res.status(404);
    res.statusMessage='not found';
    res.send('page not found');
});

app.use((err, req, res, next)=>{
    releaseEvents.status(500);
    res.statusMessage = 'Server Error';
    res.send('there was an error');
})

let isRunning = false;

module.exports = {
    server: app,
    start: (port)=>{
        if(!isRunning){
            app.listen(port, ()=>{
                console.log(`server is up on ${port}`);
            });
        }
        else{
            console.log('server is already running');
        }
    }
}

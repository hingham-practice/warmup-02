'use strict'
const express = require('express');
const cors = require('cors');
const app = express();

//ejs
app.set('views', `./views`);
app.set('view enginge', 'ejs');

//static
app.use( express.static('./public') );

app.use(express.json() );

app.get('/', (req, res)=>{
    res.send('<h1> hello world </h1> <p> this is your website :) </p>');
});

app.post('/save', (req, res)=>{
    res.json(req.body);
});


app.get('/err', (req, res, next)=>{
    next('this is an error message');
})

app.get('*', (req, res)=>{
    res.status(404);
    res.statusMessage= 'not found';
    res.send('page not found');
})

app.use( (err, req, res, next)=>{
    releaseEvents.status(500);
    res.statusMessage = 'Server Error';
    res.send('there was a server error');
});

let isRunning = false;
module.exports = {
    server: app,
    start: (port)=>{
       if(! isRunning){
          app.listen(port, () =>{
              console.log(`server is up on ${port}`);
          });
       }
       else{
           console.log('server is already up');
       } 
    }
}
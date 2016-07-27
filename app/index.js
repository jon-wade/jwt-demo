var unirest = require('unirest');
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));

app.post('/login', jsonParser, function(req, res) {
    //mock db access against username and if correct, send back JWT

    if(req.body.username === 'testuser') {
        //JWT code in here
        var token = jwt.sign({username: 'testuser'}, 'secretkey');
        res.status(200).send({message: 'username verified, token attached', token: token});
    }
    else {
        res.status(404).send({message: 'incorrect username'});
    }
});

app.post('/verify', jsonParser, function(req, res) {

    if (req.body.token !== '') {
        var payload = jwt.verify(req.body.token, 'secretkey');
        if (payload.username === 'testuser') {
            res.status(200).send({message: 'verified user'});
        }
    }
    else {
        res.status(404).send({message: 'user not verified'});
    }


});

//this sends request for endpoints that don't exist back to angular for routing (as well as dealing with error pages)
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: __dirname + '/public/'});
});

if(!module.parent) {
    app.listen(8080);
    console.log("App is listening on port 8080");
}

exports.app = app;


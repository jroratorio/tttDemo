var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);

app.get('/api', function(req, res, next){
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        res.send({ status: 404, data: "Resource not found" });
    } else {
        res.render('error', { status: 404, data: "Resource not found" });
    }
});

app.get('/api/:num', function(req, res, next){
    var request = require('request');
    var url = "http://terriblytinytales.com/test.txt";
    
    var num = req.params.num;
    if(num > 0) {
        request.get(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var finalArray = require('./lib/helper').getWordCountArray(body, req.params.num);
                res.send({ status: 200, data: finalArray });            
            }
        });
    }    
    else{
        res.send({ status: 500, error: "QueryString parameter can not be zero or negative" });
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page or send json error response
    res.status(err.status || 500);
    if (req.xhr) {
        res.send({ status: err.status, error: res.locals.message });
    } else {
        res.render('error', { status: 404, data: "Resource not found" });
    }    
});

module.exports = app;

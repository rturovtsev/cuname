'use strict';


//тут подключаем модули
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const session = require('express-session');
const HttpError = require('./error').HttpError;


//подключаем роуты
const router = require('./routes/index');
const login = require('./routes/login');
const register = require('./routes/register');


//инициализируем приложение
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            express.errorHandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});


//сессии
const sessionStore = require('./lib/sessionStore');
app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    resave: true,
    saveUninitialized: true,
    cookie: config.get('session:cookie'),
    store: sessionStore
}));


app.use(require('./middleware/sendHttpError'));


//определяем роуты
app.use('/', router);
app.use('/login', login);
app.use('/register', register);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Страница не найдена');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
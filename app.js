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


//инициализируем приложение
const app = express();


//подключаем роуты
const site = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const imgs = require('./routes/imgs');


// настройка шаблонизатора для views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//раскоментить, когда будет favicon в /public
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

//проверяем сессию и если есть юзер патчим запрос
app.use(require('./middleware/loadUser'));



//определяем роуты
app.get('/', site.index); //главная

app.get('/login', auth.loginGet); //логин
app.post('/login', auth.loginPost); //логин

app.post('/logout', auth.logout); //выход

app.get('/register', auth.registerGet); //регистрация
app.post('/register', auth.registerPost); //регистрация

app.get('/users', users.list); //список пользователей

app.post('/imgs', imgs.getImgPost); //получение картинок
app.post('/uploads', imgs.addImgPost); //добавление картинки
app.post('/removeimg', imgs.removeImgPost); //удаление картинки


// если ни один роут не подошел, ставим 404 и перенаправляем в обработчик ошибок
app.use(function (req, res, next) {
    let err = new Error('Страница не найдена');
    err.status = 404;
    next(err);
});


// обработчики ошибок

// разработческий обработчик ошибок с выводом stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// обработчик ошибок для продакшена без stacktraces
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
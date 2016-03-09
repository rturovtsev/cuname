'use strict';

var User = require('../model/user').User;
var AuthError = require('../model/user').AuthError;


/* Страница логина */

exports.loginGet = function(req, res, next) {
    res.render('login', {title: "Авторизация", user: ""});
};

exports.loginPost = function(req, res, next) {
    let email = req.body.email,
        pass = req.body.password;

    User.findOne({username: email}, function(err, user) {
        if (err) next(err);

        if (user) {
            if (user.checkPassword(pass)) {
                req.session.user = user._id;

                res.redirect('/');
            } else {
                next(new AuthError("Пароль неверен"));
            }
        } else {
            let err = new Error("Пользователь не найден");
            err.status = 404;

            next(err);
        }
    });
};


/* Страница регистрации */

exports.registerGet = function(req, res, next) {
    res.render('register', {title: "Регистрация"});
};

exports.registerPost = function(req, res, next) {
    res.render('register', {title: "Регистрация"});
};
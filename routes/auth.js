var User = require('../model/user').User;


/* Страница логина */

exports.login = function(req, res, next) {
    res.render('login', {title: "Авторизация", user: ""});
};
//req.session.user = user._id;



/* Страница регистрации */

exports.register = function(req, res, next) {
    res.render('register', {title: "Регистрация"});
};
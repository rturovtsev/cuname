/* Страница логина */

exports.login = function(req, res, next) {
    res.render('login', {title: "Авторизация", user: ""});
};
//req.session.user = user._id;

/* Страница регистрации */

exports.register = function(req, res, next) {
    res.render('register', {title: "Регистрация"});
};

/*
var User = require('../model/user');

var user = new User({
    username: "Tester",
    password: "secret"
});

user.save(function(err, user, affected) {
    if (err) throw err;

    User.findOne({username: "Tester"}, function(err, tester) {
        console.log(tester);
    })
});*/

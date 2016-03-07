/* Страница логина */

exports.login = function(req, res) {
    res.render('login', {title: "Авторизация", user: ""});
};


/* Страница регистрации */

exports.register = function(req, res) {
    res.render('register', {title: "Регистрация"});
};
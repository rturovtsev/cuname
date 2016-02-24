/* Страница логина */

module.exports = function (req, res) {
    res.render('login', {title: "Авторизация", user: ""});
};
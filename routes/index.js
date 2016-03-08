/* Главная */

exports.index = function(req, res, next) {
    res.render('index', {title: "Главная", user: ""});
};
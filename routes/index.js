/* Главная */

exports.index = function(req, res) {
    res.render('index', {title: "Главная", user: ""});
};
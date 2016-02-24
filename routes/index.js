var express = require('express');
var router = express.Router();

/* Главная страница */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Главная'});
});

module.exports = router;

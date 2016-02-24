const express = require('express');
const router = express.Router();

/* Главная страница */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Главная', user: ""});
});

module.exports = router;
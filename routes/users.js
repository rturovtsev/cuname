'use strict';

/* Список пользователей */


exports.list = function(req, res, next) {
    var User = require('../model/user').User;


    User.find({}, function(err, users) {
        if (err) next(err);

        if (!users) {
            let err = new Error('Пользователи не найдены');
            err.status = 404;
            next(err);
        }

        res.json(users);
    });
};
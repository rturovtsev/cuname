'use strict';

const User = require('../model/user').User;


/* Главная */

exports.index = function(req, res, next) {
    let imgs = [];

    if (req.session.user) {
        User.findById(req.session.user, function(err, user) {
            if (err) next(err);

            //если залогинен, то берем массив с картинками
            if (user) {
                imgs = user.images;

                res.render('index', {title: "Главная", imgs: imgs, imgs_count: imgs.length});
            }
        });
    } else {
        res.render('index', {title: "Главная"});
    }
};
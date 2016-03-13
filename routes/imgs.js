'use strict';

const multer = require('multer');
const path = require('path');

//настройка загружаемых файлов
const upload = multer({
    dest: path.join(__dirname, '../public/users_img'),
    limits: {
        fileSize: 10000000 //10mb
    }
}).single('img_file');

exports.imgsPost = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) return next(err);

        res.redirect('/');
    });
};

/*
{ fieldname: 'img_file',
    originalname: 'cvety.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'D:\\work\\cuname\\public\\users_img',
    filename: 'd719235783118b40d9158b52d588ea0a',
    path: 'D:\\work\\cuname\\public\\users_img\\d719235783118b40d9158b52d588ea0a',
    size: 113150
}
*/
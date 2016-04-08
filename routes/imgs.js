'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../model/user').User;


exports.getImgPost = (req, res, next) => {
    //Ищем юзера по id из сессии
    User.findById(req.session.user, function(err, user) {
        if (err) next(err);

        //если нашли, то удаляем картинку по номеру в массиве
        if (user) {
             res.json(user.images);
        } else {
            res.sendStatus(404);
        }
    });
};


//настройка загружаемых файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/i'));
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.').pop(),
            name = (Math.random() * 100000000000).toFixed();

        ext = ext ? ext : 'jpg';

        cb(null, name + '.' + ext);
    }
});


const fileFilter = (req, file, cb) => {
    const mimeTypes = ["image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/svg+xml", "image/tiff", "image/vnd.microsoft.icon", "image/vnd.wap.wbmp"];

    if ( mimeTypes.indexOf(file.mimetype) != -1 ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const limits =  {
    files: 1,
    fileSize: 10000000 //10mb
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits}).single('img_file');

exports.addImgPost = (req, res, next) => {
    upload(req, res, (err) => { //TODO сначала сохраняет, потом проверяет залогинен или нет
        if (err) return next(err);

        //если не пропустило или отсутствует файл
        if (!req.file) {
            res.sendStatus(403);
            return;
        }

        //Ищем юзера по id из сессии
        User.findById(req.session.user, function(err, user) {
            if (err) next(err);

            //если нашли, то сохраняем имя картинки
            if (user) {
                user.images.push(req.file.filename);

                user.save(function(err) {
                    if (err) return next(err);

                    res.send(req.file.filename);
                });
            }
        });
    });
};


exports.removeImgPost = (req, res, next) => {
    let num = req.body.imgNum;

    //Ищем юзера по id из сессии
    User.findById(req.session.user, function(err, user) {
        if (err) next(err);

        //если нашли, то удаляем картинку по номеру в массиве
        if (user) {
            let fileName = user.images[num];

            //удаляем в базе
            user.images.splice(num, 1);

            user.save(function(err) {
                if (err) return next(err);
            });

            //удаляем в файловой системе
            let pathFile = path.join(__dirname, '../public/i/' + fileName);

            fs.exists(pathFile, function(exists) {
                if (exists) {
                    fs.unlink(pathFile, function(err) {
                        if (err) {
                            console.log("Файл не удалился");
                            console.dir(err);
                        }
                    });
                } else {
                    console.log("Файл для удаления не найден!");
                }
            })
        }
    });

    res.sendStatus(200);
};
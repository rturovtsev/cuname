'use strict';

const multer = require('multer');
const path = require('path');

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

exports.imgsPost = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) return next(err);
        res.send(req.file.filename);
    });
};
'use strict';


//подключаемся к базе и определяем схему
const crypto = require('crypto');
const util = require('util');

const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;


//задаем поля
const schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    images: {
        type: Array
    }
});


//шифруем пароль
schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};


//виртуальное поле пароля для задания соли и шифрованного пароля для базы
schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


//проверка пароля
schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};


//проверка авторизации (нового пользователя сразу регистрирует)
schema.statics.authorize = function(username, password, callback) {
    let User = this;

    async.waterfall([
        function(callback) {
            User.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Пароль неверен"));
                }
            } else {
                let user = new User({username: username, password: password});
                user.save(function(err) {
                    if (err) return callback(err);
                    callback(null, user);
                });
            }
        }
    ], callback);
};


var User = mongoose.model('User', schema);
exports.User = User;


//тестовый пользователь
User.findOne({username: "test@test.ru"}, function(err, user) {
    if (err) next(err);

    if (!user) {
        var testUser = new User({
                username: "test@test.ru",
                password: "123456"
            });

        testUser.save(function(err) {
            if (err) next(err);
            console.log("Создан тестовый пользователь");
        });
    }
});



//создаем ошибку авторизации
function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}
util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';


exports.AuthError = AuthError;
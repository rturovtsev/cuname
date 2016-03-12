'use strict';

var _logout = require('./logout/logout');

var _auth = require('./auth/auth');

//Валидация формы авторизации/регистрации
_auth.cAuth.init();

//Post запрос на выход
_logout.cLogout.init();
//# sourceMappingURL=main.js.map

import {cLogout} from './logout/logout';
import {cAuth} from './auth/auth';


//Валидация формы авторизации/регистрации
cAuth.init();


//Post запрос на выход
cLogout.init();
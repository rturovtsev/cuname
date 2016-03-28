import {cAuth} from './auth/auth'
import {cImgs} from './imgs/form'

//Валидация формы авторизации/регистрации
cAuth.init();


cImgs.init();



//=================================================//



import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import confugureStore from './store/configureStore'


const store = confugureStore();


render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root')
);

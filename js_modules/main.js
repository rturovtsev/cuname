import {cAuth} from './auth/auth';
import {cImgs} from './imgs/form';


//React core
import React, { Component, PropTypes } from 'react'; //
import { render } from 'react-dom';

//React components
import NavbarBrand from './components/NavbarBrand'
import UserPanel from './components/UserPanel'

export default class App extends Component {
    constructor() {
        super();

        this.onClickLogoutBtn = this.onClickLogoutBtn.bind(this);

        this.state = {
            user: user,
            logined: user.username ? true : false
        }
    }
    onClickLogoutBtn(e) {
        e.preventDefault();

        let self = this,
            xhr = new XMLHttpRequest(),
            url = '/logout';

        xhr.open('POST', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status !=200 ) {
                alert('Ошибка!');
            } else {
                self.setState({
                    logined: false
                });
            }
        };
        xhr.send();
    }
    render() {
        return <header>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='navbar navbar-default'>
                        <div className='container-fluid'>
                            <NavbarBrand />

                            <div
                                id='bs-example-navbar-collapse-1'
                                className='collapse navbar-collapse'>
                                <UserPanel data={this.state} onClickLogoutBtn={this.onClickLogoutBtn} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    }
}

render(
    <App />,
    document.getElementById('root')
);

//Валидация формы авторизации/регистрации
cAuth.init();


cImgs.init();
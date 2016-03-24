import React, { Component, PropTypes } from 'react';

export default class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.onClickLogoutBtn = this.onClickLogoutBtn.bind(this);
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
                self.props.setLogined(false);
                console.log("GoodBy!");
            }
        };
        xhr.send();
    }
    render() {
        const logined = this.props.logined,
            name = this.props.name;

        if (logined) {
            return <p
                className='navbar-text navbar-right'>
                <a  href='#'
                    className='navbar-link'>
                    {name}
                </a>
                <a  href='#'
                    id='logout'
                    onClick={this.onClickLogoutBtn}
                    className='navbar-link'>
                    Выйти
                </a>
            </p>
        } else {
            return <p
                className='navbar-text navbar-right'>
                <a  href='/login'
                    className='navbar-link'>
                    Войти
                </a>
                <a  href='/register'
                    className='navbar-link'>
                    Зарегистрироваться
                </a>
            </p>
        }
    }
}

UserPanel.PropTypes = {
    logined: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setLogined: PropTypes.func.isRequired
};
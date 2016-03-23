import React, { Component, PropTypes } from 'react';

export default class UserPanel extends Component {
    render() {
        const data = this.props.data,
            onClickLogoutBtn = this.props.onClickLogoutBtn;

        if (data.logined) {
            return <p
                className='navbar-text navbar-right'>
                Вы вошли как
                <a
                    href='#'
                    className='navbar-link'>
                    {data.user.username}
                </a>
                <a
                    href='#'
                    id='logout'
                    onClick={onClickLogoutBtn}
                    className='navbar-link'>
                    Выйти
                </a>
            </p>
        } else {
            return <p
                className='navbar-text navbar-right'>
                <a
                    href='/login'
                    className='navbar-link'>
                    Войти
                </a>
                <a
                    href='/register'
                    className='navbar-link'>
                    Зарегистрироваться
                </a>
            </p>
        }
    }
}

UserPanel.PropTypes = {
    data: PropTypes.object.isRequired,
    onClickLogoutBtn: PropTypes.func.isRequired
};
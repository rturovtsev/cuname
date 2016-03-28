import React, { Component, PropTypes } from 'react'


export default class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.onClickLogoutBtn = this.onClickLogoutBtn.bind(this);
    }
    onClickLogoutBtn(e) {
        e.preventDefault();
        this.props.setLogined(false);
        window.ee.emit('changeFetchState', 'start');
    }
    render() {
        const logined = this.props.logined,
            name = this.props.name;

        return (
            <nav className='mdl-navigation'>
                {logined ?
                    <a href='#' className='mdl-navigation__link'> {name} </a>
                    :
                    <a href='/login' className='mdl-navigation__link'>Войти</a>
                }
                {logined ?
                    <a href='#' id='logout' onClick= {this.onClickLogoutBtn} className='mdl-navigation__link'>Выйти</a>
                    :
                    <a href='/register' className='mdl-navigation__link'>Зарегистрироваться</a>
                }
            </nav>
        );
    }
}

UserPanel.PropTypes = {
    logined: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setLogined: PropTypes.func.isRequired,
    setFetchingBarState: PropTypes.func.isRequired
};
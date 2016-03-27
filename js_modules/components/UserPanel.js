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
            <p className='navbar-text navbar-right'>
                {logined ?
                    <span>
                        <a href='#' className='navbar-link'> {name} </a>
                        <a href='#' id='logout' onClick= {this.onClickLogoutBtn} className='navbar-link'>Выйти</a>
                    </span>
                    :
                    <span>
                        <a href='/login' className='navbar-link'>Войти</a>
                        <a href='/register' className='navbar-link'>Зарегистрироваться</a>
                    </span>
                }
            </p>
        );
    }
}

UserPanel.PropTypes = {
    logined: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setLogined: PropTypes.func.isRequired,
    setFetchingBarState: PropTypes.func.isRequired
};
import React, { Component, PropTypes } from 'react'
import { Navigation } from 'react-mdl'


export default class UserPanel extends Component {
    onClickLogoutBtn(e) {
        e.preventDefault();
        this.props.setLogined(false);
    }
    openModal(e) {
        e.preventDefault();
        this.props.setModalState(true);
    }
    render() {
        const logined = this.props.logined;
        const name = this.props.name;

        return (
            <nav className='mdl-navigation'>
                {logined ?
                    <a href='#' className='mdl-navigation__link'> {name} </a>
                    :
                    <a href="/login" onClick={this.openModal.bind(this)} className='mdl-navigation__link'>Войти или зарегистрироваться</a>
                }
                {logined ?
                    <a href='#' id='logout' onClick= {this.onClickLogoutBtn.bind(this)} className='mdl-navigation__link'>Выйти</a>
                    :
                    ''
                }
            </nav>
        );
    }
}

UserPanel.PropTypes = {
    logined: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setLogined: PropTypes.func.isRequired,
    setModalState: PropTypes.func.isRequired
};
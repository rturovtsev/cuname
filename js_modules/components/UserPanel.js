import React, { Component, PropTypes } from 'react'


export default class UserPanel extends Component {
    onClickLogoutBtn(e) {
        e.preventDefault();
        this.props.setLogined(false);
        this.props.clearImgs();
    }
    openModal(e) {
        e.preventDefault();
        this.props.setModalState(true);
    }
    render() {
        const logined = this.props.logined;
        const name = this.props.name;

        if (logined) {
            return (
                <nav className='mdl-navigation'>
                    <a href='#' className='mdl-navigation__link'> {name} </a>
                    <a href='#' id='logout' onClick= {this.onClickLogoutBtn.bind(this)} className='mdl-navigation__link'>Выйти</a>
                </nav>
            );
        } else {
            return (
                <nav className='mdl-navigation'>
                    <a href="/login" onClick={this.openModal.bind(this)} className='mdl-navigation__link'>Войти или зарегистрироваться</a>
                </nav>
            );
        }
    }
}

UserPanel.PropTypes = {
    logined: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setLogined: PropTypes.func.isRequired,
    setModalState: PropTypes.func.isRequired,
    clearImgs: PropTypes.func.isRequired
};
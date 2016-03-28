import React, { Component, PropTypes } from 'react'
import Modal from 'react-modal'
import { Textfield, Button } from 'react-mdl'


export default class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.onClickLogoutBtn = this.onClickLogoutBtn.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    onClickLogoutBtn(e) {
        e.preventDefault();
        this.props.setLogined(false);
        window.ee.emit('changeFetchState', 'start');
    }
    openModal(e) {
        e.preventDefault();
        this.props.setModalState(true);
    }
    closeModal() {
        this.props.setModalState(false);
    }
    render() {
        const logined = this.props.logined;
        const name = this.props.name;
        const modalIsOpen = this.props.modalIsOpen;

        return (
            <nav className='mdl-navigation'>
                {logined ?
                    <a href='#' className='mdl-navigation__link'> {name} </a>
                    :
                    <a href="/login" onClick={this.openModal} className='mdl-navigation__link'>Войти или зарегистрироваться</a>
                }
                {logined ?
                    <a href='#' id='logout' onClick= {this.onClickLogoutBtn} className='mdl-navigation__link'>Выйти</a>
                    :
                    ''
                }

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    >
                    <form id="auth-form" method="POST" action="/login">
                        <h3 className="mdl-dialog__title">Авторизация</h3>
                        <div className="mdl-dialog__content">
                            <p>
                                Войдите либо введите свои данные, учетная запись будте создана автоматически
                            </p>
                            <Textfield
                                onChange={() => {}}
                                id="email"
                                type="email"
                                name="email"
                                label="Email адресс"
                                required
                                floatingLabel
                                style={{width: '100%'}}
                            />
                            <Textfield
                                onChange={() => {}}
                                id="password"
                                type="password"
                                name="password"
                                label="Пароль"
                                required
                                floatingLabel
                                style={{width: '100%'}}
                            />
                        </div>
                        <div className="mdl-dialog__actions">
                            <Button raised ripple colored type="button" onClick={this.closeModal}>Отмена</Button>
                            <Button raised ripple colored type="submit">Войти</Button>
                        </div>
                    </form>
                </Modal>
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
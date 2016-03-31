import React, { Component, PropTypes } from 'react'
import { Textfield, Button } from 'react-mdl'
import Modal from 'react-modal'


export default class PopUp extends Component {
    closeModal() {
        this.props.setModalState(false);
    }
    render() {
        const modalIsOpen = this.props.modalIsOpen;

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.closeModal.bind(this)}
                closeTimeoutMS={100}
            >
                <form id="auth-form" method="POST" action="/login">
                    <h3 className="mdl-dialog__title">Авторизация</h3>
                    <div className="mdl-dialog__content">
                        <p>
                            Войдите либо введите свои данные и учетная запись будет создана автоматически.
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
                        <Button raised ripple colored type="button" onClick={this.closeModal.bind(this)}>Отмена</Button>
                        <Button raised ripple colored type="submit">Войти</Button>
                    </div>
                </form>
            </Modal>
        );
    }
}

PopUp.PropTypes = {
    setModalState: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
};
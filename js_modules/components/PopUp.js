import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Textfield, Button } from 'react-mdl'
import Modal from 'react-modal'


export default class PopUp extends Component {
    closeModal() {
        this.props.setModalState(false);
    }
    login(e) {
        e.preventDefault();

        let email = ReactDOM.findDOMNode(this.refs.email).getElementsByTagName('input')[0].value;
        let pass = ReactDOM.findDOMNode(this.refs.pass).getElementsByTagName('input')[0].value;
        let auth = {
            email: email,
            pass: pass
        };

        const elErrorTxt = ReactDOM.findDOMNode(this.refs.authError);
        const xhr = new XMLHttpRequest();
        const url = '/login';

        elErrorTxt.innerHTML = '';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status == 200) {
                this.props.setModalState(false);
                console.log("Login!"); //TODO make login
            } else {
                elErrorTxt.innerHTML = xhr.responseText;
            }
        };
        xhr.send(JSON.stringify(auth));
    }
    render() {
        const modalIsOpen = this.props.modalIsOpen;

        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.closeModal.bind(this)}
                closeTimeoutMS={100}
            >
                <h3 className="mdl-dialog__title">Авторизация</h3>
                <div className="mdl-dialog__content">
                    <p>
                        Войдите либо введите свои данные и учетная запись будет создана автоматически.
                    </p>
                    <div ref="authError" className="error" />
                    <Textfield
                        ref="email"
                        onChange={() => {}}
                        id="email"
                        type="email"
                        name="email"
                        label="Email адресс"
                        required
                        floatingLabel
                        pattern=".+@.+\..+"
                        error="Не верный формат Email!"
                        style={{width: '100%'}}
                    />
                    <Textfield
                        ref="pass"
                        onChange={() => {}}
                        id="password"
                        type="password"
                        name="password"
                        label="Пароль, минимум 6 символов"
                        required
                        floatingLabel
                        pattern="^[a-zA-Z0-9_-]{6,18}$"
                        error="Не верный формат для поля пароль!"
                        style={{width: '100%'}}
                    />
                </div>
                <div className="mdl-dialog__actions">
                    <Button raised ripple colored type="button" onClick={this.closeModal.bind(this)}>Отмена</Button>
                    <Button raised ripple colored type="submit" onClick={this.login.bind(this)}>Войти</Button>
                </div>
            </Modal>
        );
    }
}

PopUp.PropTypes = {
    setModalState: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
};
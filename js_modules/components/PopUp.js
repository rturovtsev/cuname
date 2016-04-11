import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Dialog, FlatButton, TextField } from 'material-ui'


export default class PopUp extends Component {
    closeModal() {
        this.props.setModalState(false);
    }
    login(e) {
        e.preventDefault();

        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
        let auth = {
            email: email,
            pass: pass
        };

        const elErrorTxt = document.getElementById('authError');
        const xhr = new XMLHttpRequest();
        const url = '/login';

        elErrorTxt.innerHTML = '';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status == 200) {
                this.props.setLogined(true);
                this.props.setName( JSON.parse(xhr.responseText).username );
                this.props.setModalState(false);
                this.props.getImgs('get');
                console.log("Login!");
            } else {
                elErrorTxt.innerHTML = xhr.responseText;
            }
        };
        xhr.send(JSON.stringify(auth));
    }
    render() {
        const errE = "Не верный формат Email!"; //TODO сделать валидацию
        const errP = "Не верный формат для поля пароль!";
        const modalIsOpen = this.props.modalIsOpen;
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={this.closeModal.bind(this)}
            />,
            <FlatButton
                label="Войти"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.login.bind(this)}
            />
        ];

        return (
            <Dialog
                title="Авторизация"
                actions={actions}
                modal={false}
                open={modalIsOpen}
                onRequestClose={this.closeModal.bind(this)}
            >
                <p>
                    Войдите либо введите свои данные и учетная запись будет создана автоматически.
                </p>
                <div id="authError" className="error" />
                <TextField
                    ref="email"
                    id="email"
                    type="email"
                    name="email"
                    required
                    pattern=".+@.+\..+"
                    fullWidth={true}
                    hintText="Ваш email"
                    errorText={null}
                    floatingLabelText="Email адресс"
                />
                <TextField
                    id="password"
                    type="password"
                    name="password"
                    required
                    pattern="^[a-zA-Z0-9_-]{6,18}$"
                    fullWidth={true}
                    floatingLabelText="Пароль, минимум 6 символов"
                    hintText="Ваш пароль"
                    errorText={null}
                />
            </Dialog>
        );
    }
}

PopUp.PropTypes = {
    setModalState: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    setLogined: PropTypes.func.isRequired,
    setName: PropTypes.func.isRequired
};
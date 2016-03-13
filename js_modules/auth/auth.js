export const cAuth = (() => {
    const email = document.getElementById('email'),
        password = document.getElementById('password'),
        password2 = document.getElementById('repeat_password'),
        form = document.getElementById('auth-form');

    return {
        testHtml(s) {
            return s.search(/[<>&"']/ig) == -1;
        },
        checkLength(el, length) {
            return el.value.length > length;
        },
        checkEmail() {
            if (!this.checkLength(email, 5) || !this.testHtml(email.value)) {
                email.parentElement.classList.add('has-error');
                return false;
            }

            email.parentElement.classList.remove('has-error');
            return true;
        },
        checkPassword() {
            if (password2) {
                if (!this.checkLength(password, 5) || password.value !== password2.value || !this.testHtml(password2.value)) {
                    password.parentElement.classList.add('has-error');
                    password2.parentElement.classList.add('has-error');
                    return false;
                }

                password.parentElement.classList.remove('has-error');
                password2.parentElement.classList.remove('has-error');
                return true;
            } else {
                if (!this.checkLength(password, 5) || !this.testHtml(password.value)) {
                    password.parentElement.classList.add('has-error');
                    return false
                }
            }

            password.parentElement.classList.remove('has-error');
            return true;
        },
        event() {
            form.onsubmit = () => this.checkEmail() && this.checkPassword();
        },
        init() {
            form && this.event();
        }
    };
})();
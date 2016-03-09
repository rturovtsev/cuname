var myAuth = {
    checkLength: function(el, length) {
        return el.value.length > length;
    },
    checkEmail: function() {
        var email = document.getElementById('email');

        if (!this.checkLength(email, 5)) {
            email.parentElement.classList.add('has-error');
            return false;
        }

        email.parentElement.classList.remove('has-error');
        return true;
    },
    checkPassword: function() {
        var password = document.getElementById('password'),
            password2 = document.getElementById('repeat_password');

        if (password2) {
            if (!this.checkLength(password, 5) || password.value !== password2.value) {
                password.parentElement.classList.add('has-error');
                password2.parentElement.classList.add('has-error');
                return false;
            }

            password.parentElement.classList.remove('has-error');
            password2.parentElement.classList.remove('has-error');
            return true;
        } else {
            if (!this.checkLength(password, 5)) {
                password.parentElement.classList.add('has-error');
                return false
            }
        }

        password.parentElement.classList.remove('has-error');
        return true;
    },
    event: function() {
        var form = document.getElementById('auth-form'),
            that = this;

        form.onsubmit = function() {
            return (that.checkEmail() && that.checkPassword());
        };
    },
    init: function() {
        document.getElementById('auth-form') && this.event();
    }
};




/* =========== INIT FUNCTION =========== */
myAuth.init();
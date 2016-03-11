var cAuth = (function(){
    var email = document.getElementById('email'),
        password = document.getElementById('password'),
        password2 = document.getElementById('repeat_password'),
        form = document.getElementById('auth-form'),
        that = this;

    return {
        checkLength: function(el, length) {
            return el.value.length > length;
        },
        checkEmail: function() {
            if (!this.checkLength(email, 5)) {
                email.parentElement.classList.add('has-error');
                return false;
            }

            email.parentElement.classList.remove('has-error');
            return true;
        },
        checkPassword: function() {
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
            form.onsubmit = function() {
                return (that.checkEmail() && that.checkPassword());
            };
        },
        init: function() {
            form && this.event();
        }
    };
})();


var cLogout = (function() {
    var logout = document.getElementById('logout');

    return {
        xhrLogout: function() {
            var xhr = new XMLHttpRequest(),
                url = '/logout';

            xhr.open('POST', url, true);
            xhr.send();
        },
        event: function() {
            logout.addEventListener('click', this.xhrLogout);
        },
        init: function() {
            logout && this.event();
        }
    };
})();




/* =========== INIT FUNCTION =========== */
cAuth.init();
cLogout.init();
export const cLogout = (function() {
    var logout = document.getElementById('logout');

    return {
        xhrLogout: function(e) {
            e.preventDefault();

            let xhr = new XMLHttpRequest(),
                url = '/logout';

            xhr.open('POST', url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;
                if (xhr.status !=200 ) {
                    alert("Ошибка!");
                } else {
                    location.href= "/";
                }
            };
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
export const cLogout = (() => {
    const logout = document.getElementById('logout');

    return {
        xhrLogout(e) {
            e.preventDefault();

            let xhr = new XMLHttpRequest(),
                url = '/logout';

            xhr.open('POST', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status !=200 ) {
                    alert("Ошибка!");
                } else {
                    location.href= "/";
                }
            };
            xhr.send();
        },
        event() {
            logout.addEventListener('click', this.xhrLogout);
        },
        init() {
            logout && this.event();
        }
    };
})();
export const cImgs = ( () => {

	const imgsPanel = document.getElementById('imgs-panel');

	return {
        xhr(button) {
            let xhr = new XMLHttpRequest(),
                url = '/uploads',
                form = button.parentNode,
                input = form.elements.img_file,
                data = new FormData(form);

            if(input.value == '') return;

            data.append('img_file', input.name);

            xhr.open('POST', url, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200){
                    alert("Ошибка, попробуйте позже!");
                } else {
                    let url = "/i/" + xhr.responseText;
                    form.parentNode.parentNode.innerHTML = "<a class='thumbnail' href='#'><img src='" + url + "'</a>";
                }
            };

            xhr.send(data);

        },
		events() {
			imgsPanel.onclick = (e) => {
				let target = e.target;

                if (target.tagName != 'BUTTON') return;

                e.preventDefault();
                this.xhr(target);
			}
		},
		init() {
			imgsPanel && this.events();
		}
	};
} )();
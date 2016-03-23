export const cImgs = ( () => {

	const imgsPanel = document.getElementById('imgs-panel');

	return {
        xhrAdd(button) {
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
                    alert('Ошибка, попробуйте позже!');
                } else {
                    let url = '/i/' + xhr.responseText;
                    form.parentNode.parentNode.innerHTML = '<a class="thumbnail" href="#"><img src="' + url + '"</a>';
                }
            };

            xhr.send(data);

        },
        xhrRemove(button) {
            let xhr = new XMLHttpRequest(),
                url = '/removeimg',
                imgNum = button.parentNode.parentNode.dataset.imgform,
                data = JSON.stringify({imgNum: imgNum});

            xhr.open('POST', url, true);

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    alert('Попробуйте позже')
                } else {
                    location.reload();
                }
            };

            xhr.send(data);
        },
		events() {
			imgsPanel.onclick = (e) => {
				let target = e.target;

                if (target.type == 'submit') {
                    e.preventDefault();
                    this.xhrAdd(target);
                } else if (target.className == 'remove_img') {
                    this.xhrRemove(target);
                } else {
                    return;
                }
			}
		},
		init() {
			imgsPanel && this.events();
		}
	};
} )();
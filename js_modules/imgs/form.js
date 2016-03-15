export const cImgs = ( () => {

	const imgsPanel = document.getElementById('imgs-panel');

	return {
		events() {
			imgsPanel.onclick = (e) => {
				let target = e.target;
				
				console.dir(target);
			}
		},
		init() {
			imgsPanel && this.events();
		}
	};
} )();
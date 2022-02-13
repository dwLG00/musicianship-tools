function open_modal() {
	var modal = document.getElementById("play-game-modal");
	modal.classList.add('open');
	var exits = modal.querySelectorAll('.modal-exit');
	exits.forEach((exit) => {
		console.log(exit);
		exit.addEventListener('click', (event) => {
			event.preventDefault();
			modal.classList.remove('open');
		});
	});
}

window.onload = () => {open_modal();};

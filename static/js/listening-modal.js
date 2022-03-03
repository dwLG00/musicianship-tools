
const modal = document.querySelectorAll('.modal')[0];

function close_modal() {
	modal.classList.remove('is--visible');
}

function close_modal_and_start_game() {
	modal.classList.remove('is--visible');
	setTimeout(() => {setup_game();}, 1000);
}
window.onload = () => {
	modal.classList.add('is--visible');
}


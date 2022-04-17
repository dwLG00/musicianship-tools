
const modal = document.querySelectorAll('.modal')[0];

function close_modal() {
	modal.classList.add('hidden');
}

function close_modal_and_start_game() {
	modal.classList.add('hidden');
	setTimeout(() => {setup_game();}, 1000);
}

window.onload = () => {
	modal.classList.remove('hidden');
}


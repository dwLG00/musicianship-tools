

function close_modal() {
	let modal = document.getElementById('help-modal');
	modal.classList.add('hidden');
}

function display_help_modal() {
	let modal = document.getElementById('help-modal');
	modal.classList.remove('hidden');
}

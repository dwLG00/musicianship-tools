

function close_help_modal() {
	let modal = document.getElementById('help-modal');
	modal.classList.add('hidden');
}

function close_faq_modal() {
	let modal = document.getElementById('faq-model');
	modal.classList.add('hidden');
}

function display_help_modal() {
	let modal = document.getElementById('help-modal');
	modal.classList.remove('hidden');
}

function display_faq_modal() {
	let modal = document.getElementById('faq-modal');
	modal.classList.remove('hidden');
}

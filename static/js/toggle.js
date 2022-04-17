

function toggle(a_id, b_id) {
	document.getElementById(a_id).classList.remove('bg-gray-300');
	document.getElementById(a_id).classList.add('bg-gray-100');
	document.getElementById(a_id).classList.remove('hover:bg-gray-400');
	document.getElementById(a_id).classList.remove('text-gray-800');
	document.getElementById(a_id).classList.add('text-gray-300');


	document.getElementById(b_id).classList.remove('bg-gray-100');
	document.getElementById(b_id).classList.add('bg-gray-300');
	document.getElementById(b_id).classList.add('hover:bg-gray-400');
	document.getElementById(b_id).classList.remove('text-gray-300');
	document.getElementById(b_id).classList.add('text-gray-800');
}

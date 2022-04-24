
let getSelectValue = (select) => {return select.options[select.selectedIndex].value;};


// Watch the game select for changes in order to decide what div to show

document.getElementById('game-select').onchange = () => {
	[...document.getElementsByClassName('additional-options')].forEach((element) => {
		element.classList.add('invisible');
	});
	if (getSelectValue(document.getElementById('game-select')) == 'listening') {
		document.getElementsByClassName('listening-options')[0].classList.remove('invisible');
	}
};

[...document.getElementsByClassName('difficulty')].forEach((element) => {
	if (element.classList.contains('listening-option')) {
		element.onclick = () => {
			[...document.getElementsByClassName('listening-option')].forEach((listening_option) => {
				listening_option.classList.remove('selected');
			});
			element.classList.add('selected');
		};
	}
});

// Launch the game

document.getElementById('play-button').onclick = () => {
	if (getSelectValue(document.getElementById('game-select')) == 'listening') {
		let difficulty = document.getElementsByClassName('listening-option selected')[0].innerHTML;
		let url = '/game/listening?difficulty=' + difficulty.toLowerCase();
		window.location.href = url;
	}
};


function goto(url) {
	location.href = url;
}

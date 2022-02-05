// Create new PIXI instance

let width = 1280;
let height = 300;

let playback_mode = 'chord';

const app = new PIXI.Application({
	width: width, height: height, backgroundColor: 0xffffff,
});

document.getElementById('game-container').appendChild(app.view);


// Declare assets we use for our listening game
let frame = new PIXI.Texture.from('/static/game-resources/textures/piano-frame.png');

let l_key = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-L.png');
let l_key_selected = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-L-selected.png');
let l_key_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-L-correct.png');
let l_key_incorrect = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-L-incorrect.png');
let l_key_act_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-L-act-correct.png');

let t_key = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-T.png');
let t_key_selected = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-T-selected.png');
let t_key_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-T-correct.png');
let t_key_incorrect = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-T-incorrect.png');
let t_key_act_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-T-act-correct.png');

let j_key = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-J.png');
let j_key_selected = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-J-selected.png');
let j_key_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-J-correct.png');
let j_key_incorrect = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-J-incorrect.png');
let j_key_act_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-J-act-correct.png');

let b_key = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-black.png');
let b_key_selected = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-black-selected.png');
let b_key_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-black-correct.png');
let b_key_incorrect = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-black-incorrect.png');
let b_key_act_correct = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-black-act-correct.png');

let edge_key = new PIXI.Texture.from('/static/game-resources/textures/piano-keys-edge.png');


// Debug
//app.stage.addChild(new PIXI.Sprite(frame));


// Create containers
let keyboard_lower = new PIXI.Container();
let keyboard_higher = new PIXI.Container();
app.stage.addChild(keyboard_lower);
app.stage.addChild(keyboard_higher);

// Generate keyboard

let keyboard_x = 100;
let keyboard_y = 100;

let keyboard_frame = new PIXI.Sprite(frame);
keyboard_frame.anchor.set(0);
keyboard_frame.position.x = keyboard_x;
keyboard_frame.position.y = keyboard_y;
keyboard_lower.addChild(keyboard_frame);

function draw_key(keytype, position) {
	let sprite = null;
	if (keytype == 'l') {
		sprite = new PIXI.Sprite(l_key);
		sprite.anchor.set(0);
	} else if (keytype == 't') {
		sprite = new PIXI.Sprite(t_key);
		sprite.anchor.set(0);
	} else if (keytype == 'j') {
		sprite = new PIXI.Sprite(j_key);
		sprite.anchor.set(0);
	} else if (keytype == 'b') {
		sprite = new PIXI.Sprite(b_key);
		sprite.anchor.set(0.5, 0);
	}
	sprite.position.set(keyboard_x + position, keyboard_y + 5);
	sprite.interactive = true;
	return sprite;
}


// Draw the individual keys
// See keyboard-alignment.txt for the actual values of placement
let all_keys = [
	draw_key('t', 5),
	draw_key('b', 47),
	draw_key('t', 50),
	draw_key('b', 92),
	draw_key('j', 95),
	draw_key('l', 140),
	draw_key('b', 182),
	draw_key('t', 185),
	draw_key('b', 227),
	draw_key('j', 230),
	draw_key('l', 275),
	draw_key('b', 317),
	draw_key('t', 320),
	draw_key('b', 362),
	draw_key('t', 365),
	draw_key('b', 407),
	draw_key('j', 410),
	draw_key('l', 455),
	draw_key('b', 497),
	draw_key('t', 500),
	draw_key('b', 542),
	draw_key('j', 545),
	draw_key('l', 590),
	draw_key('b', 632),
	draw_key('t', 635),
	draw_key('b', 677),
	draw_key('t', 680),
	draw_key('b', 722),
	draw_key('j', 725),
	draw_key('l', 770)
];

// Draw edge keys
let edge_left = new PIXI.Sprite(edge_key);
edge_left.anchor.set(0);
edge_left.position.set(keyboard_x, keyboard_y + 5);

let edge_right = new PIXI.Sprite(edge_key);
edge_right.anchor.set(1, 0);
edge_right.position.set(keyboard_x + 770 + 45, keyboard_y + 5);

keyboard_higher.addChild(edge_left);
keyboard_higher.addChild(edge_right);

// Onclick logic
function toggle_key(key) {
	if (key.texture == l_key) {
		key.texture = l_key_selected;
	} else if (key.texture == l_key_selected) {
		key.texture = l_key;
	} else if (key.texture == t_key) {
		key.texture = t_key_selected;
	} else if (key.texture == t_key_selected) {
		key.texture = t_key;
	} else if (key.texture == j_key) {
		key.texture = j_key_selected;
	} else if (key.texture == j_key_selected) {
		key.texture = j_key;
	} else if (key.texture == b_key) {
		key.texture = b_key_selected;
	} else if (key.texture == b_key_selected) {
		key.texture = b_key;
	}
	if (!key.is_selected) {
		key.is_selected = true;
	} else {
		key.is_selected = false;
	}
}

all_keys.forEach((key, idx) => {
	//Set variables
	key.is_root = false;
	key.is_selected = false;
	key.keycode = idx;
	//Set onclick function
	key.on('click', (event) => {
		if (!key.is_root) {
			toggle_key(key);
		}
	});
	//Render
	if (key.texture == b_key) {
		keyboard_higher.addChild(key);
	} else {
		keyboard_lower.addChild(key);
	}
});



// Game logic

// Audio setup

MIDI.loadPlugin({
	soundfontUrl: "/static/game-resources/soundfont/",
	instrument: "acoustic_grand_piano",
	onprogress: function(state, progress) {
		console.log(state, progress);
	}
});

function play_chord(notes) {
	let midi_map = notes.map(note => note + 55);
	MIDI.setVolume(0, 127);
	MIDI.chordOn(0, midi_map, 127, 0);
	MIDI.chordOff(0, midi_map, 2);
}

function arpeggiate_chord(notes) {
	let midi_map = notes.map(note => note + 55);
	MIDI.setVolume(0, 127);
	midi_map.forEach((note, index) => {
		MIDI.noteOn(0, note, 127, index);
		MIDI.noteOff(0, note, index + 1);
	});
}

// Get the game difficulty and set parameters accordingly
const query_string = window.location.search;
const url_params = new URLSearchParams(query_string);

let difficulty = url_params.get('difficulty');
let n_notes, range = 0;

if (difficulty == 'beginner') {
	n_notes = 2;
	range = 12;
} else if (difficulty == 'easy') {
	n_notes = 3;
	range = 12;
} else if (difficulty == 'intermediate') {
	n_notes = 4;
	range = 18;
} else if (difficulty == 'hard') {
	n_notes = 5;
	range = 18;
} else if (difficulty == 'expert') {
	n_notes = 6;
	range = 24;
}

// Create random note values based on this data

function rand_range(low, high) {
	let range = high - low;
	return Math.floor(Math.random() * (range + 1) + low);
}

function generate_random_note_set() {
	let notes = [0];
	let maxrange = range;
	for (let i = 0; i < (n_notes - 1); i++) {
		let left = n_notes - i - 2;
		let crange = maxrange - notes[notes.length - 1] - left;
		let randrange = Math.min(crange, 12); // Cap the random range at 12 (i.e. octave)
		let rand_interval = rand_range(1, randrange);
		notes.push(notes[notes.length - 1] + rand_interval);
	}
	return notes;
}

function place_note(notes) {
	let note_range = notes[notes.length - 1];
	let root_note = rand_range(0, 29 - note_range);
	let new_notes = notes.map(note => note + root_note);
	return new_notes;
}

function generate_chord() {
	return place_note(generate_random_note_set());
}

// Game Logic

// Constants
let croot_note = 0;
let cnotes_abs = [];

let cquestion_no = 0;
let question_count = 5;
let score = 0;



function load_question() {
	// Generate new set of random notes
	cnotes_abs = generate_chord();
	croot_note = cnotes_abs[0];

	// Lock the root note
	all_keys[croot_note].is_root = true;
	toggle_key(all_keys[croot_note]);

	// Play the chord
	play();
}

function play() {
	if (playback_mode == 'chord') {
		play_chord(cnotes_abs);
	} else {
		arpeggiate_chord(cnotes_abs);
	}
}

function playback_set(playback) {
	playback_mode = playback;
}


function get_selected_notes() {
	let notes = []
	all_keys.forEach((key) => {
		if (key.is_selected) {
			notes.push(key);
		}
	});
	return notes;
}

function evaluate(selected_notes) {
	let n_correct = 0;
	let correct = [];
	let incorrect = [];
	let true_correct = [];

	all_keys.forEach((key) => {
		if (selected_notes.includes(key) && cnotes_abs.includes(key.keycode)) { //Selected correct note
			correct.push(key);
			n_correct = n_correct + 1;
		} else if (selected_notes.includes(key) && !cnotes_abs.includes(key.keycode)) { //Selected but not correct
			incorrect.push(key);
		} else if (cnotes_abs.includes(key.keycode)) { //Not selected but correct
			true_correct.push(key);
		}
	});

	return {
		n_correct: n_correct,
		correct: correct,
		incorrect: incorrect,
		true_correct: true_correct
	};
}

function update_score(new_score) {
	let old_score_sum = score * (cquestion_no);
	let new_score_sum = old_score_sum + new_score;
	score = new_score_sum / (cquestion_no + 1);
}

function submit() {
	// Get all selected keys
	let selected_notes = get_selected_notes();
	console.log(selected_notes);
	// Check for correct, incorrect, and true correct notes
	let evaluation = evaluate(selected_notes);
	console.log(evaluation);

	// Change the textures
	evaluation.correct.forEach((key) => {
		if (key.texture == l_key_selected) {
			key.texture = l_key_correct;
		} else if (key.texture == t_key_selected) {
			key.texture = t_key_correct;
		} else if (key.texture == j_key_selected) {
			key.texture = j_key_correct;
		} else if (key.texture == b_key_selected) {
			key.texture = b_key_correct;
		}
	});
	evaluation.incorrect.forEach((key) => {
		if (key.texture == l_key_selected) {
			key.texture = l_key_incorrect;
		} else if (key.texture == t_key_selected) {
			key.texture = t_key_incorrect;
		} else if (key.texture == j_key_selected) {
			key.texture = j_key_incorrect;
		} else if (key.texture == b_key_selected) {
			key.texture = b_key_incorrect;
		}
	});

	// Update the score
	let cquestion_score = (evaluation.n_correct - 1) / (n_notes - 1);
	update_score(evaluation.n_correct);
	document.getElementById('score').innerText = 'Score: ' + (cquestion_score * 100).toFixed(2) + '%';
	all_keys.forEach((key) => {key.is_root = true;});
	setTimeout(() => {
		reset();
		cquestion_no += 1;
		if (cquestion_no < question_count) {
			load_question();
		} else {
			//End the game
			end_game();
		}
	}, 3000);
}

function reset() {
	all_keys.forEach((key) => {
		key.is_root = false;
		key.is_selected = false;
		if (key.texture == l_key_correct || key.texture == l_key_incorrect || key.texture == l_key_selected) {
			key.texture = l_key;
		} else if (key.texture == t_key_correct || key.texture == t_key_incorrect || key.texture == t_key_selected) {
			key.texture = t_key;
		} else if (key.texture == j_key_correct || key.texture == j_key_incorrect || key.texture == j_key_selected) {
			key.texture = j_key;
		} else if (key.texture == b_key_correct || key.texture == b_key_incorrect || key.texture == b_key_selected) {
			key.texture = b_key;
		}
	});
}


function end_game() {
}

load_question();

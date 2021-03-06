
// Audio/Sounds

var track_a_hit = new Howl({
	src: []
});
var track_b_hit = new Howl({
	src: []
});
var track_miss = new Howl({
	src: []
});

var audio_status = "off";


function element_clear(elem) { // Clears a tag of its children
	var child = elem.lastElementChild;
	while (child) {
		elem.removeChild(child);
		child = elem.lastElementChild;
	}
}

function speed_update() { // Updates the speed label
	let speed = document.getElementById('speed-control').value;
	document.getElementById('speed-value').textContent = speed;
}

function polyrhythm(a, b) { // Generates a list of polyrhythms
	let total_subdivisions = a*b;

	let a_track_counts = [];
	let b_track_counts = [];
	for (let i = 0; i < total_subdivisions; i++) {
		a_track_counts.push((i % b) + 1);
		b_track_counts.push((i % a) + 1);
	}

	console.log(a_track_counts);
	console.log(b_track_counts);

	return {
		a_track_counts: a_track_counts,
		b_track_counts: b_track_counts
	}
}

function newtag_a() {
	const new_onbeat_a = document.createElement("div");
	new_onbeat_a.dataset.subdivno = "1";
	new_onbeat_a.textContent = "1";
	new_onbeat_a.className = "m-px border border-sky-500 bg-sky-400 grow rounded flex justify-center onbeat";
	return new_onbeat_a;
}

var newtag_onbeat = newtag_a; //Legacy

function newtag_b(num) {
	const new_onbeat_b = document.createElement("div");
	new_onbeat.dataset.subdivno = num.toString();
	new_onbeat.textContent = num.toString();
}

function newtag_offbeat(num) {
	const new_offbeat = document.createElement("div");
	new_offbeat.dataset.subdivno = num.toString();
	new_offbeat.textContent = num.toString();
	new_offbeat.className = "m-px border border-slate-800 grow rounded flex justify-center offbeat";
	return new_offbeat;
}

function polyrhythm_update() { // Updates the polyrhythm display
	let a = parseInt(document.getElementById('polyrhythm-control-a').value);
	let b = parseInt(document.getElementById('polyrhythm-control-b').value);

	let polyrhythm_divisions = polyrhythm(a, b);

	let a_track = document.getElementById('polyrhythm-track-a');
	let b_track = document.getElementById('polyrhythm-track-b');

	element_clear(a_track);
	element_clear(b_track);

	console.log(polyrhythm_divisions.a_track_counts);
	console.log(polyrhythm_divisions.b_track_counts);

	for (const i of polyrhythm_divisions.a_track_counts) {
		if (i == 1) {
			let tag = newtag_onbeat();
			a_track.appendChild(tag);
		} else {
			let tag = newtag_offbeat(i);
			a_track.appendChild(tag);
		}
	}

	for (const i of polyrhythm_divisions.b_track_counts) {
		if (i == 1) {
			let tag = newtag_onbeat();
			b_track.appendChild(tag);
		} else {
			let tag = newtag_offbeat(i);
			b_track.appendChild(tag);
		}
	}

	document.getElementById('ratio-a').textContent = a;
	document.getElementById('ratio-b').textContent = b;
}

/*
function play_polyrhythm() { // Plays the polythythm
	// We will loooooop

	let a_track = document.getElementById('polyrhythm-track-a');
	let b_track = document.getElementById('polyrhythm-track-b');
	let speed_control = document.getElementById('speed-control');

	let total_length = a_track.children.length;
	let b_length = parseInt(document.getElementById('polyrhythm-control-b').value); // "Measures" per cycle
	let a_length = (total_length / b_length).toFixed();

	let control_speed = parseInt(speed_control.value); // bpm
	let actual_speed = 1000/60*(control_speed * a_length); //miliseconds per subdivision

	audio_status = "on";
	player(0, total_length, actual_speed, a_track, b_track, player);

}

function player(i, length, delay, a_track, b_track, callback) {
	let a_child = a_track.children[i];
	let b_child = b_track.children[i];

	if (audio_status == "off") {
		return null;
	}

	if (a_child.dataset.subdivno == "1" && b_child.dataset.subdivno == "1") {
		track_a_hit.play();
		track_b_hit.play();
	} else if (a_child.dataset.subdivno == "1") {
		track_a_hit.play();
	} else if (b_child.dataset.subdivno == "1") {
		track_b_hit.play();
	} else {
		track_miss.play();
	}

	setTimeout(() => {
		callback((i + 1) % length, length, delay, a_track, b_track, callback);
	}, delay);
}
*/

//function play_increment(i, length, 

function stop_audio() {
	audio_status = "off";
}

window.onload = () => {
	polyrhythm_update();
}



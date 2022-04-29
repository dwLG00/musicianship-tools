// Audio/Sounds

var track_a_hit = new Howl({
	src: ['/musicianship-tools/static/game-resources/audio/drum-samples-resources/snare.wav'],
	volume: 0.5
});
var track_b_hit = new Howl({
	src: ['/musicianship-tools/static/game-resources/audio/drum-samples-resources/kick.wav'],
	volume: 1.0
});
var track_miss = new Howl({
	src: ['/musicianship-tools/static/game-resources/audio/drum-samples-resources/hihat.wav'],
	volume: 0.2
});

// Global constants

var audio_status = "off";

function remove_class(elem, classname) {
	elem.classList.remove(classname);
}

function add_class(elem, classname) {
	elem.classList.add(classname);
}

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

function newtag_a(num) {
	const new_onbeat_a = document.createElement("div");
	new_onbeat_a.dataset.subdivno = num.toString();
	new_onbeat_a.textContent = num.toString();
	new_onbeat_a.className = "border border-neutral grow flex justify-center onbeat-a bg-rose-300";
	return new_onbeat_a;
}

var newtag_onbeat = newtag_a; //Legacy

function newtag_b() {
	const new_onbeat_b = document.createElement("div");
	new_onbeat_b.dataset.subdivno = "1";
	new_onbeat_b.textContent = "1";
	new_onbeat_b.className = "border border-neutral grow flex justify-center onbeat-b bg-blue-300";
	return new_onbeat_b;
}

function newtag_ab() {
	const new_onbeat_ab = document.createElement("div");
	new_onbeat_ab.subdivno = "1";
	new_onbeat_ab.textContent = "1";
	new_onbeat_ab.className = "border border-neutral grow flex justify-center onbeat-ab bg-violet-300";
	return new_onbeat_ab;
}

function newtag_offbeat(num) {
	const new_offbeat = document.createElement("div");
	new_offbeat.dataset.subdivno = num.toString();
	new_offbeat.textContent = num.toString();
	new_offbeat.className = "border border-neutral grow flex justify-center offbeat";
	return new_offbeat;
}

function newtag_empty(num) {
	const new_empty = document.createElement("div");
	new_empty.dataset.subdivno = num.toString();
	new_empty.className = "border border-neutral grow flex justify-center offbeat";
	return new_empty;
}

function polyrhythm_update() { // Updates the polyrhythm display
	let a = parseInt(document.getElementById('polyrhythm-control-a').value);
	let b = parseInt(document.getElementById('polyrhythm-control-b').value);

	let polyrhythm_divisions = polyrhythm(a, b);

	let track = document.getElementById('polyrhythm-track');

	element_clear(track);


	// Dealing with grid
	for (const classname of track.classList) {
		if (classname.includes('grid-cols-')) {
			track.classList.remove(classname);
		}
	}

	let new_grid_class = "grid-cols-" + a;
	track.classList.add(new_grid_class);

	//element_clear(a_track);
	//element_clear(b_track);

	let tracklist = [];
	for (let i = 0; i < a*b; i++) {
		let poly_a = polyrhythm_divisions.a_track_counts[i];
		let poly_b = polyrhythm_divisions.b_track_counts[i];
		if (poly_a == 1 && poly_b == 1) {
			tracklist.push(newtag_ab());
		} else if (poly_a == 1) {
			tracklist.push(newtag_a(poly_b));
		} else if (poly_b == 1) {
			tracklist.push(newtag_b());
		} else {
			tracklist.push(newtag_offbeat(poly_b));
		}
	}

	for (const tag of tracklist) {
		track.appendChild(tag);
	}

	document.getElementById('ratio-a').textContent = a;
	document.getElementById('ratio-b').textContent = b;
	return tracklist;
}

function play_polyrhythm() {
	let track = document.getElementById('polyrhythm-track');
	let track_length = track.children.length;

	audio_status = "on";
	play_increment(0, track, play_increment);
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

function play_increment(i, track, callback) {
	//console.log('Cell number #' + i);
	let length = track.children.length;
	let idx = i % length
	let speed_control = document.getElementById('speed-control');
	let control_speed = parseInt(speed_control.value); // bpm

	let a = parseInt(document.getElementById('polyrhythm-control-a').value);
	let spd = 60 / control_speed; // Seconds per beat
	//let delay = 1000/(60*(control_speed * length)); //miliseconds per subdivision
	let delay = 1000 * 60 / (control_speed * a);

	if (audio_status == "off") { // Quitting
		return;
	}

	// Play Sound
	let playing_tag = track.children[idx];

	// Set cell as active
	remove_class(playing_tag, "border-neutral");
	remove_class(playing_tag, "border");
	add_class(playing_tag, "border-yellow-300");
	add_class(playing_tag, "border-2");
	//add_class(playing_tag, "outline-2");
	//add_class(playing_tag, "outline-yellow-300");

	if (playing_tag.classList.contains("onbeat-a")) {
		track_a_hit.play();
		//console.log('Played A');
	} else if (playing_tag.classList.contains("onbeat-b")) {
		track_b_hit.play();
		//console.log('Played B');
	} else if (playing_tag.classList.contains("onbeat-ab")) {
		track_a_hit.play();
		track_b_hit.play();
		//console.log('Played AB');
	}
	track_miss.play();
	//console.log('Played Miss');

	setTimeout(() => {
		remove_class(playing_tag, "border-yellow-300"); // Do something to deselect the tag
		remove_class(playing_tag, "border-2");
		add_class(playing_tag, "border-neutral");
		add_class(playing_tag, "border");
		//remove_class(playing_tag, "outline-2");
		//remove_class(playing_tag, "outline-yellow-300");

		play_increment((idx + 1) % length, track, play_increment);
	}, delay);
}

function stop_audio() {
	audio_status = "off";
}

window.onload = () => {
	polyrhythm_update();
}



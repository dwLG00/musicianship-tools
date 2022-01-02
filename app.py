from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/game')
def game_select():
	return render_template('game.html')

@app.route('/game/listening')
def listening_game():
	return render_template('listening.html')

@app.route('/game/listening/results')
def listening_results():
	return render_template('listening-results.html')

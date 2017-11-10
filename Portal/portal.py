from flask import Flask,render_template,flash,redirect,request,abort,send_from_directory

app = Flask(__name__)

answer = { 	'1':'answer1',
			'2':'answer2',
			'3':'answer3',
			'4':'answer4'}

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/download', methods=['GET', 'POST'])
def download(): 
    return send_from_directory(directory='static/download', filename="Questions.zip")

@app.route('/<int:question>', methods=['GET', 'POST'])
def check_answer(question):
	if str(question) in answer:
		if request.method == "POST":
			if request.form.get("answer").lower() == answer[str(question)].lower():
				return render_template("success.html", question=question)
			else:
				return render_template("error.html", question=question)
	else:
		abort(404)
	return render_template("check_answer.html",question=question)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ =="__main__":
	app.run(debug=True, host="0.0.0.0", port=80)
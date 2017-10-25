from flask import Flask,render_template,flash,redirect,request

app = Flask(__name__)
app.secret_key="asdfghjkl"



answer = { 	'1':'answer1',
			'2':'answer2',
			'3':'answer3',
			'4':'answer4'}

@app.route('/')
def index():
	return "Please Go to '(website address)/(question_number)\'"

@app.route('/<question>', methods=['GET', 'POST'])
def check_answer(question):
	if request.method == "POST":
		if request.form.get("answer") == answer[question]:
			return"Shout for the Volunteer"
				
	return render_template("check_answer.html",question=question)

if __name__ =="__main__":
	app.run(debug=True)
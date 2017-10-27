var bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = 10;
const answerOnePassword = 'phishing';
const answerTwoPassword = 'AIzaSyD1hqg93PixOlMrWQbEltSl4o8aP2K3ris' ;

var sendData = (data)=>{
	// console.log("DATA : " + data.answer1 + " : " + data.answer2);
	// var hash1 = bcrypt.hashSync(data.answer1, salt);
	// count = 0;
	// console.log("HASH 1 : " + hash1);
	// if(hash1 == answerOnePassword){
	// 	console.log("Answer 1 Matches");
	// 	count++;
	// }
	// var hash2 = bcrypt.hashSync(data.answer2, salt);
	// console.log("HASH 2 : " + hash2);
	// if(hash2 == answerTwoPassword){
	// 	console.log("Answer 2 Matches");
	// 	count++;
	// }
	count =0;
	if(data.answer1 == answerOnePassword){
		count++;
	}
	if(data.answer2 == answerTwoPassword.toLowerCase()){
		count++;
	}
	return count;
}

var insert = (data, callback) => {
    callback(sendData(data));
}

module.exports = insert;

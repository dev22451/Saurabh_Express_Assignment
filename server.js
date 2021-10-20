const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoClient = require('mongoose');


mongoClient.connect('mongodb://localhost:27017/Serverdb',{
	useNewUrlParser:'true',
})
mongoClient.connection.on("error", err => {
    console.log("err", err)
})
mongoClient.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})


const userSchema = new mongoClient.Schema({
	firstname: String,
	lastname : String,
	username : String, 
	email    : String, 
	password : String, 
	confirmpassword :String, 
});
const textUser = mongoClient.model('user',userSchema)
module.exports = {textUser}
console.log(typeof(textUser))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=>{
	res.send('home page')
})

app.get('/user/register', (req, res)=>{
	res.sendFile(__dirname + '/ServerIndex.html')
});
app.post('/registration', (req, res) =>{
	console.log(req.body,"all at once")
	console.log ("Username-",req.body.username)
	console.log("Password-",req.body.password)
	console.log("confirmpassword-",req.body.confirmpassword)
	const a = [];
	const b = [];
	a.push(req.body.password)
	b.push(req.body.confirmpassword)
	
	const add = () => {
		if ( a[0] === b[0]){
			console.log("done")
			textUser.insertMany(req.body)
		}	else {
			console.log('Req pww error')
		}
	}
	add();	
	res.sendFile(__dirname + '/registration.html')
});

app.listen(3001,()=>{
	console.log('listened')
})

// to be continued ....
const express = require("express");
const bodyParser = require("body-parser");

let app = express();

//DATABASE
let database = [];
let id = 100;

//USER DATABASES

let registeredUsers = [];
let loggedSessions = [];

enableCors = (req,res,next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-type, token');
	
	return next();
}

app.use(enableCors);

app.options("*",function(req,res) {
	return res.status(204).send();
})

//MIDDLEWARE

createToken = () => {
	let token = "";
	const letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<256;i++) {
		let temp = Math.floor(Math.random()*30)
		token = token + letters[temp];
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(token) {
		for(let i=0;i<loggedSessions.length;i++) {
			if(loggedSessions[i].token === token) {
				req.session = {};
				req.session.user = loggedSessions[i].user;
				return next();
			}
		}
	}
	return res.status(403).json({message:"forbidden"});
}

app.use(bodyParser.json());
app.use("/api",isUserLogged);

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(409).json({message:"conflict"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({message:"conflict"})
	}
	if(req.body.username.length === 0 || req.body.password.length === 0) {
		return res.status(409).json({message:"conflict"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"username already in use"})
		}
	}
	registeredUsers.push({
		username:req.body.username,
		password:req.body.password
	})
	return res.status(200).json({message:"success"})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(409).json({message:"conflict"})
	}
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({message:"conflict"})
	}
	if(req.body.username.length === 0 || req.body.password.length === 0) {
		return res.status(409).json({message:"conflict"})
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			if(req.body.password === registeredUsers[i].password) {
				let token = createToken();
				loggedSessions.push({
					user:req.body.username,
					token:token
				})
				return res.status(200).json({token:token})
			}
		}
	}

	return res.status(403).json({message:"forbidden"})
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(token) {
		for(let i=0;i<loggedSessions.length;i++) {
			if(token === loggedSessions[i].token) {
				loggedSessions.splice(i,1);
				return res.status(200).json({message:"success"})
			}
		}
	}
	return res.status(404).json({message:"not found"})
})
// REST API

app.get("/api/shopping", function(req,res) {
	let tempDatabase = database.filter(item => item.user === req.session.user)
	res.status(200).json(tempDatabase);
});

app.post("/api/shopping", function(req,res) {
	let item = {
		user:req.session.user,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:id
	}
	id++;
	database.push(item);
	res.status(200).json({"message":"success"});
});

app.delete("/api/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1);
			return res.status(200).json({"message":"success"});
		}
	}
	res.status(404).json({"message":"not found"});
});

app.put("/api/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
			user:req.session.user,
			type:req.body.type,
			price:req.body.price,
			count:req.body.count,
			id:tempId
	}	
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,item);
			return res.status(200).json({"message":"success"});
		}
	}
	res.status(404).json({"message":"not found"});
})

app.listen(process.env.PORT);

console.log("Running in port ", process.env.PORT);





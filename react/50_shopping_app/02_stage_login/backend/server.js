const express = require("express");
const apiroute = require("./routes/apiroute")
const bcrypt = require("bcrypt");
const crypto = require("crypto");

let app = express();

app.use(express.json());

//LOGIN DATABASES

const registeredUsers = [];
const loggedSessions = [];

const time_to_live_diff = 3600000;

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"})
		}
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({message:"Internal server error"})
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		registeredUsers.push(user);
		console.log(user);
		return res.status(201).json({message:"Register success"});
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad Request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
				if(err) {
					return res.status(500).json({message:"Internal server error"})
				}
				if(!success) {
					return res.status(401).json({message:"Unauthorized"})
				}
				let token = createToken();
				let now = Date.now();
				let session = {
					user:req.body.username,
					token:token,
					ttl:now+time_to_live_diff
				}
				loggedSessions.push(session);
				return res.status(200).json({token:token})
			})
		}
		return;
	}
	return res.status(401).json({message:"Unauthorized"});
})

let port = process.env.PORT || 3001;

app.use("/api",apiroute);

app.listen(port);

console.log("Running in port",port);
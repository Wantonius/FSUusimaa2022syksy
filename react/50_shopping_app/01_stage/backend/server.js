const express = require("express");

let app = express();

app.use(express.json());

app.use(function(req,res,next) {
	console.log("Hi, I am a filter!");
	return next();
});

let port = process.env.PORT || 3001;

//DATABASE

let database = [];
let id = 100;

//REST API

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
});

app.post("/api/shopping",function(req,res) {
	let item = {
		...req.body
	}
	database.push(item);
	return res.status(201).json(item);
});

app.listen(port);

console.log("Running in port",port);
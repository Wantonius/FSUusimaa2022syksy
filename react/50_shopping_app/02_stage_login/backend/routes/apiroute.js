const express = require("express");

const router = express.Router();

//DATABASE

let database = [];
let id = 100;

//REST API

router.get("/shopping",function(req,res) {
	return res.status(200).json(database);
});

router.post("/shopping",function(req,res) {
	let item = {
		...req.body,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
});

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id)
	let tempDatabase = database.filter(item => item.id !== tempId);
	database = tempDatabase;
	return res.status(200).json({message:"Succees"});
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let item = {
		...req.body,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,item);
			return res.status(200).json({message:"Success"});
		}
	}
	return res.status(404).json({message:"Not found"});
})

module.exports = router;
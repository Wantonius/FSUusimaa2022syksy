const express = require("express");
const itemModel = require("../models/item");

const router = express.Router();

//DATABASE

let database = [];
let id = 100;

//REST API

router.get("/shopping",function(req,res) {
	let tempDatabase = database.filter(item => item.user === req.session.user)
	return res.status(200).json(tempDatabase);
});

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad Request"});
	}
	let item = new itemModel({
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	})
	item.save(function(err) {
		if(err) {
			console.log("Failed to save new item. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(201).json({message:"Created"});
	})
});

router.delete("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id)
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(404).json({message:"Not found"})
			}
			database.splice(i,1);
			return res.status(200).json({message:"Success"})
		}
	}
	return res.status(404).json({message:"Not found"});
})

router.put("/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let item = {
		...req.body,
		id:tempId,
		user:req.session.user
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			if(database[i].user !== req.session.user) {
				return res.status(404).json({message:"Not found"})
			}
			database.splice(i,1,item);
			return res.status(200).json({message:"Success"});
		}
	}
	return res.status(404).json({message:"Not found"});
})

module.exports = router;
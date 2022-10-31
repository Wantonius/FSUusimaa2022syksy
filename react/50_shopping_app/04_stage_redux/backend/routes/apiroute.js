const express = require("express");
const itemModel = require("../models/item");

const router = express.Router();

//REST API

router.get("/shopping",function(req,res) {
	let query = {"user":req.session.user};
	if(req.query.type) {
		query["type"] = req.query.type.toLowerCase();
	}
	itemModel.find(query, function(err,items) {
		if(err) {
			console.log("Failed to query items. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json(items);
	})
});

router.post("/shopping",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad Request"});
	}
	let item = new itemModel({
		type:req.body.type.toLowerCase(),
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
	itemModel.deleteOne({"_id":req.params.id,"user":req.session.user},function(err) {
		if(err) {
			console.log("Failed to remove item. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"Success"});
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad Request"})
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad Request"})
	}
	let item = {
		type:req.body.type.toLowerCase(),
		count:req.body.count,
		price:req.body.price,
		user:req.session.user
	}
	itemModel.replaceOne({"_id":req.params.id,"user":req.session.user},item,function(err) {
		if(err) {
			console.log("Failed to update item. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json({message:"Success"});
	})
})

module.exports = router;
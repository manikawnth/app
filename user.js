var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	console.log(req.session);
	console.log(req.user);
	res.send("Inside the user router");
})








module.exports = router;
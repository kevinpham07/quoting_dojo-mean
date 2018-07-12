const mongoose = require("mongoose");
Mongoose = mongoose.model("User")

module.exports = function(app){

	app.get("/", function(req, res){
		res.render("index");
	})

	app.post("/process", function(req, res){
		var user = new User({ name: req.body.name, quote: req.body.quote });
		user.save(function(err){
			if(err){
				console.log("We have an error!", err);
				for(var key in err.errors){
					req.flash("quotes", err.errors[key].message);
				}
				res.redirect("/");
			}
			else {
				res.redirect("quotes");
			}
		})
	})

	app.get("/quotes", function(req, res){
		User.find({}, function(err, users){
			console.log(users)
			res.render("quotes", {users: users});
		})
	})

	app.listen(1337);
}
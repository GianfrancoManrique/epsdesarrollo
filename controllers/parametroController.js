let model = require("../models/parametro");

let controller = ()=>{};

controller.list = (req, res, next)=>{
	model.list((err, registros)=>{
		if(!err) {
            var data = {registros: registros.rows};
            //console.log(data);
			res.render("index", data);
		} else {
			var data = {error: err};
			res.render("error", data);
		}
	});	
}

module.exports = controller;
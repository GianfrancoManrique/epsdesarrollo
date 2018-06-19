
const client2 = require("../connections/conPostgreSQL");

let model = ()=>{};

model.list = (cb)=>{
	client2.query("select code,value from nasca.parameter where variable='CATEGORIA'", cb)	
}

module.exports = model;
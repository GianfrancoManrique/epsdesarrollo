const cliente = require("../connections/conPostgreSQL");

let modelo =()=>{};

modelo.regFoto=(idficha,url)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='insert into nasca.foto(idficha,url) values(';
			comando=comando.concat(idficha,',\'');
			comando=comando.concat(url,'\')');
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
module.exports = modelo;
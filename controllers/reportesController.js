let model = require("../models/ficha");

let controlador = ()=>{};

controlador.reportes=async (req, res, next)=>{
	res.render("reportes");
}
controlador.reporteAvanceMapa = async (req, res, next)=>{
	try {
		let puntos=await model.consultarPuntos();
		let usuario=req.user;
		//console.log(puntos,usuario);

		res.render("reporteAvanceMapa",{puntos,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.reporteResumenPorEncuestador = async (req, res, next)=>{
	try {
		let resumenPorEncuestador=await model.consultarResumenPorEncuestador();
		let usuario=req.user;
		//console.log(resumenPorEncuestador,usuario);

		res.render("reporteResumenPorEncuestador",{resumenPorEncuestador,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.reporteResumenFinal=async (req,res,next)=>{
	try {
		let resumenFinal=await model.consultarResumenFinal();
		let usuario=req.user;
		//console.log(resumenFinal,usuario);

		res.render("reporteResumenFinal",{resumenFinal,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.reporteDiario=async (req,res,next)=>{
	try {
		let resumenDiario=await model.consultarResumenDiario(req.params.fecha);
		res.send(resumenDiario);
	} catch (error) {
		console.log(error);
	}
}
controlador.reporteDetallePorEncuestador=async (req,res,next)=>{
	try {
		let reporteDetallePorEncuestador=await model.consultarFichasPorEncuestador(req.params.codencuestador,req.body.fecha);
		res.send(reporteDetallePorEncuestador);
	} catch (error) {
		console.log(error);
	}
}
controlador.imprimirFicha=async(req,res,next)=>{
	try {
		let fichaImpresion=await model.consultarFichaImpresion(req.params.id);
		let unidadesUsoImpresion=await model.consultarUnidadesUsoFicha(req.params.id);
		let usuario=req.user;
		//console.log(fichaImpresion,unidadesUsoImpresion,usuario);

		res.render("imprimirFicha",{fichaImpresion,unidadesUsoImpresion,usuario});
	} catch (error) {
		console.log(error);
	}
}
module.exports = controlador;
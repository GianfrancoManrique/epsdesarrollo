let path = require('path');
let model = require("../models/ficha");
let foto = require("../models/foto");
let S3Service = require("../services/S3Service");

let AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
let S3 = new AWS.S3({apiVersion: '2006-03-01'});

let controlador = ()=>{};

controlador.index=async (req, res, next)=>{
	res.render("index");
}
controlador.principal=async (req, res, next)=>{
	res.render("principal");
}
controlador.explorar=async (req, res, next)=>{
	res.render("explorar");
}
controlador.buscarFichas=async (req, res, next)=>{
	try {
		let fichas=await model.buscarFichas(req.body.palabras);
		res.send(fichas);
	} catch (error) {
		console.log(error);
	}
}
controlador.crearIdentificador = async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let distritos=await parametros.filter(parametro=>parametro.variable=='CENTRO_PROBLADO_DISTRITO');
		let estados_conexion=await parametros.filter(parametro=>parametro.variable=='ESTADO_CONEXION');
		let departamento=await parametros.filter(parametro=>parametro.variable=='DEPARTAMENTO')[0];
		let provincia=await parametros.filter(parametro=>parametro.variable=='PROVINCIA')[0];
		let distrito=await parametros.filter(parametro=>parametro.variable=='DISTRITO')[0];
		let sectores=await parametros.filter(parametro=>parametro.variable=='SECTOR');
		let manzanas=await parametros.filter(parametro=>parametro.variable=='MANZANA');
		let ciclo_facturacion=await parametros.filter(parametro=>parametro.variable=='CICLO_FACTURACION')[0];
		let usuario=req.user;
		res.render("crearIdentificador",{distritos,estados_conexion,departamento,provincia,distrito,sectores,manzanas,ciclo_facturacion,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.editarIdentificador = async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let distritos=await parametros.filter(parametro=>parametro.variable=='CENTRO_PROBLADO_DISTRITO');
		let estados_conexion=await parametros.filter(parametro=>parametro.variable=='ESTADO_CONEXION');
		let departamento=await parametros.filter(parametro=>parametro.variable=='DEPARTAMENTO')[0];
		let provincia=await parametros.filter(parametro=>parametro.variable=='PROVINCIA')[0];
		let distrito=await parametros.filter(parametro=>parametro.variable=='DISTRITO')[0];
		let sectores=await parametros.filter(parametro=>parametro.variable=='SECTOR');
		let manzanas=await parametros.filter(parametro=>parametro.variable=='MANZANA');
		let ciclo_facturacion=await parametros.filter(parametro=>parametro.variable=='CICLO_FACTURACION')[0];
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;

		res.render("editarIdentificador",{distritos,estados_conexion,departamento,provincia,
					distrito,sectores,manzanas,ciclo_facturacion,ficha,usuario});

	} catch (error) {
		console.log(error);
	}
}
controlador.registrarIdentificador=async (req, res, next)=>{
	try {
		let ficha={sucursal:req.body.sucursal,estado_conexion:req.body.estado_conexion,
			distrito:req.body.distrito,sector:req.body.sector,manzana:req.body.manzana,codsuministro:null,
			lote:req.body.lote,conexion:req.body.conexion,subsector:req.body.subsector,sector_opera:req.body.sector_opera,codencuestador:req.body.codencuestador}
		
		let idregistrado=await model.regIdentificador(ficha);
		res.send(idregistrado);
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarIdentificador=async (req,res,next)=>{
	try {
		let ficha={id:req.params.id,sucursal:req.body.sucursal,estado_conexion:req.body.estado_conexion,
			distrito:req.body.distrito,sector:req.body.sector,manzana:req.body.manzana,
			lote:req.body.lote,conexion:req.body.conexion,subsector:req.body.subsector,sector_opera:req.body.sector_opera,codencuestador:req.body.codencuestador}
		
		let idactualizado=await model.guardarIdentificador(ficha);
		res.send(idactualizado);

	} catch (error) {
	  console.log(error);
	}
}
controlador.editarResponsable = async (req, res, next)=>{
	try {
		let tipos_documento=await model.listarparametros('TIPO_DOCUMENTO');
		let ficha_responsables=await model.consultarResponsables(req.params.id);
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(tipos_documento,ficha_responsables,ficha,usuario);
		res.render("editarResponsable",{tipos_documento,ficha_responsables,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarResponsable=async (req, res, next)=>{
	try {

		let idficha=req.params.id;

		let responsable={tipo_doc:req.body.tipo_doc,
			             num_doc:req.body.num_doc,
						 nombres_resp:req.body.nombres_resp,
						 apellido_pat_resp:req.body.apellido_pat_resp,
						 apellido_mat_resp:req.body.apellido_mat_resp}
		
		let propietario={nombres_prop:req.body.nombres_prop,
						 apellido_pat_prop:req.body.apellido_pat_prop,
						 apellido_mat_prop:req.body.apellido_mat_prop}

		let ficha_responsables=await model.consultarResponsables(idficha);

		if(ficha_responsables.length>0){
			await model.guardarResponsable(idficha,responsable,propietario);
		}else{
			await model.regResponsable(idficha,responsable,propietario);
		}

		let ficha={id:idficha};

		res.send(ficha);

	} catch (error) {
		console.log(error);
	}
}
controlador.editarUbicacionGeografica=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let pais=await parametros.filter(parametro=>parametro.variable=='PAIS')[0];
		let departamento=await parametros.filter(parametro=>parametro.variable=='DEPARTAMENTO')[0];
		let provincia=await parametros.filter(parametro=>parametro.variable=='PROVINCIA')[0];
		let distritos=await parametros.filter(parametro=>parametro.variable=='CENTRO_PROBLADO_DISTRITO');
		let zonas=await parametros.filter(parametro=>parametro.variable=='CENTRO_PROBLADO_DISTRITO');
		let tipos_habilitacion=await parametros.filter(parametro=>parametro.variable=='TIPO_HABILITACION');
		let nombres_habilitacion=await parametros.filter(parametro=>parametro.variable=='NOMBRE_HABILITACION');
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(ficha,usuario);
		res.render("editarUbicaGeografica",{pais,departamento,provincia,distritos,zonas,tipos_habilitacion,nombres_habilitacion,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarUbicacionGeografica=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   tipo_habilitacion:req.body.tipo_habilitacion,
				   nombre_habilitacion:req.body.nombre_habilitacion,
				   manzana_mun:req.body.manzana_mun,
				   lote_mun:req.body.lote_mun,
				   sublote_mun:req.body.sublote_mun,
				   tipo_poblacion:req.body.tipo_poblacion,
				   coordenada_x:req.body.coordenada_x,
				   coordenada_y:req.body.coordenada_y,
				   coordenada_z:req.body.coordenada_z}
		
		await model.guardarUbicaGeografica(ficha);

		res.send(ficha.id);

	} catch (error) {
		console.log(error);
	}
}
controlador.editarUbicacion=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let tipos_via=await parametros.filter(parametro=>parametro.variable=='TIPO_VIA');
		let estados_servicio=await parametros.filter(parametro=>parametro.variable=='ESTADO_SERVICIO');
		let tipos_servicio=await parametros.filter(parametro=>parametro.variable=='TIPO_SERVICIO');
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(ficha,usuario);
		res.render("editarUbicacion",{tipos_via,estados_servicio,tipos_servicio,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarUbicacion=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   tipo_via:req.body.tipo_via,
				   nombre_via:req.body.nombre_via,
				   telefono:req.body.telefono,
				   estado_servicio:req.body.estado_servicio,
				   tipo_servicio:req.body.tipo_servicio,
				   referencias:req.body.referencias,
				   num_municipal:req.body.num_municipal}
 
			await model.guardarUbicacion(ficha);

			res.send(ficha.id);
			
	} catch (error) {
		console.log(error);
	}
}
controlador.editarClasificacion=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let tipos_construccion=await parametros.filter(parametro=>parametro.variable=='TIPO_CONSTRUCCION');
		let estados_construccion=await parametros.filter(parametro=>parametro.variable=='ESTADO_CONSTRUCCION');
		let ciius=await parametros.filter(parametro=>parametro.variable=='CIIU');
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(ficha,usuario);
		res.render("editarClasificacion",{tipos_construccion,estados_construccion,ciius,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarClasificacion=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   ruta_distribucion:req.body.ruta_distribucion,
				   secuencia:req.body.secuencia,
				   tipo_construccion:req.body.tipo_construccion,
				   estado_construccion:req.body.estado_construccion,
				   grupo_caracteristico:req.body.grupo_caracteristico,
				   ciiu:req.body.ciiu,
				   quien_habita:req.body.quien_habita,
				   num_familias:req.body.num_familias,
				   num_habitantes:req.body.num_habitantes}
 
			await model.guardarClasificacion(ficha);

			res.send(ficha.id);
			
	} catch (error) {
		console.log(error);
	}
}
controlador.editarSeccionAgua=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let estados_agua=await parametros.filter(parametro=>parametro.variable=='ESTADO_AGUA');
		let categorias_agua=await parametros.filter(parametro=>parametro.variable=='CATEGORIA_AGUA');
		let tipos_cobranza_medicion=await parametros.filter(parametro=>parametro.variable=='TIPO_COBRANZA_MEDICION');
		let macrosectores=await parametros.filter(parametro=>parametro.variable=='MACROSECTOR_AGUA');
		let sectores=await parametros.filter(parametro=>parametro.variable=='SECTOR_AGUA');
		let tipos_consumidor=await parametros.filter(parametro=>parametro.variable=='TIPO_CONSUMIDOR');
		let cajas_registro=await parametros.filter(parametro=>parametro.variable=='CAJA_REGISTRO');
		let estados_caja_agua=await parametros.filter(parametro=>parametro.variable=='ESTADO_CAJA_AGUA');
		let acometidas_tuberia=await parametros.filter(parametro=>parametro.variable=='ACOMETIDA_TUBERIA');
		let diametros_acometida=await parametros.filter(parametro=>parametro.variable=='DIAMETRO_ACOMETIDA');
		let tapas=await parametros.filter(parametro=>parametro.variable=='TAPA');
		let pavimentos=await parametros.filter(parametro=>parametro.variable=='PAVIMENTO');
		let localizaciones_conexion=await parametros.filter(parametro=>parametro.variable=='LOCALIZACION_CONEXION');
		let estados_tapa=await parametros.filter(parametro=>parametro.variable=='ESTADO_TAPA');
		//let tarifas=await parametros.filter(parametro=>parametro.variable=='TARIFA');
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(ficha,usuario);
		res.render("editarSeccionAgua",{estados_agua,categorias_agua,tipos_cobranza_medicion,macrosectores,sectores,
		tipos_consumidor,cajas_registro,estados_caja_agua,acometidas_tuberia,diametros_acometida,tapas,
		pavimentos,localizaciones_conexion,estados_tapa,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarSeccionAgua=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   estado_agua:req.body.estado_agua,
				   categoria_agua:req.body.categoria_agua,
				   tipo_cobranza_medicion:req.body.tipo_cobranza_medicion,
				   macrosector_agua:req.body.macrosector_agua,
				   sector_agua:req.body.sector_agua,
				   multiusuario_agua:req.body.multiusuario_agua,
				   cantidad_predios:req.body.cantidad_predios,
				   tipo_consumidor:req.body.tipo_consumidor,
				   caja_registro:req.body.caja_registro,
				   estado_caja_agua:req.body.estado_caja_agua,
				   acometida_tuberia:req.body.acometida_tuberia,
				   diametro_acometida:req.body.diametro_acometida,
				   tapa:req.body.tapa,
				   pavimento:req.body.pavimento,
				   localizacion_conexion:req.body.localizacion_conexion,
				   ubicacion_metros:req.body.ubicacion_metros,
				   fuga:req.body.tiene_fuga,
				   estado_tapa:req.body.estado_tapa
				}

		await model.guardarSeccionAgua(ficha);

		res.send(ficha.id);

	} catch (error) {
		console.log(error);
	}
}
controlador.editarUnidadesUso=async (req,res,next)=>{
	try {
		let parametros=await model.listarparametros('');
		let responsables_unidad_uso=await parametros.filter(parametro=>parametro.variable=='RESPONSABLE_UNIDAD_USO');
		let unidades_uso_ficha=await model.consultarUnidadesUsoFicha(req.params.id);
		let categorias_uso=await parametros.filter(parametro=>parametro.variable=='CATEGORIA_USO');
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(responsables_unidad_uso,unidades_uso_ficha,categorias_uso,ficha,usuario);
		res.render("editarUnidadesUso",{responsables_unidad_uso,unidades_uso_ficha,categorias_uso,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.registrarUnidadUso=async (req,res,next)=>{
	try {

		let unidad_uso={responsable:req.body.responsable,
						tipo_uso:req.body.tipo_uso,
						categoria:req.body.categoria,
						tarifa:req.body.tarifa,
						complemento:req.body.complemento,
						idficha:req.params.idficha}

		await model.registrarUnidadUso(unidad_uso);

		res.send(unidad_uso.idficha);

	} catch (error) {
		console.log(error);
	}
}
controlador.eliminarUnidadUso=async (req,res,next)=>{
	try {

		let unidad_uso={id:req.params.id}

		await model.eliminarUnidadUso(unidad_uso);

		res.send(unidad_uso.id);

	} catch (error) {
		console.log(error);
	}
}
controlador.editarSeccionDesague=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let estados_conexion_desague=await parametros.filter(parametro=>parametro.variable=='ESTADO_CONEXION_DESAGUE');
		let categorias_desague=await parametros.filter(parametro=>parametro.variable=='CATEGORIA_DESAGUE');
		let macrosectores_desague=await parametros.filter(parametro=>parametro.variable=='MACROSECTOR_DESAGUE');
		let sectores_desague=await parametros.filter(parametro=>parametro.variable=='SECTOR_DESAGUE');
		let redes_distribucion_desague=await parametros.filter(parametro=>parametro.variable=='RED_DISTRIBUCION_DESAGUE');
		let tipos_material_tuberia=await parametros.filter(parametro=>parametro.variable=='TIPO_MATERIAL_TUBERIA');
		let diametros_tubo=await parametros.filter(parametro=>parametro.variable=='DIAMETRO_TUBO');
		let tipos_caja=await parametros.filter(parametro=>parametro.variable=='TIPO_CAJA_DESAGUE');
		let estados_caja=await parametros.filter(parametro=>parametro.variable=='ESTADO_CAJA_DESAGUE');
		let localizaciones_caja=await parametros.filter(parametro=>parametro.variable=='LOCALIZACION_CAJA_DESAGUE');
		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(ficha,usuario);
		res.render("editarSeccionDesague",{estados_conexion_desague,categorias_desague,macrosectores_desague,sectores_desague,redes_distribucion_desague,
		tipos_material_tuberia,diametros_tubo,tipos_caja,estados_caja,localizaciones_caja,ficha,usuario});
	} catch (error) {
		console.log(error);
	}
}
controlador.guardarSeccionDesague=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   estado_desague:req.body.estado_desague,
				   categoria_desague:req.body.categoria_desague,
				   macrosector_desague:req.body.macrosector_desague,
				   sector_desague:req.body.sector_desague,
				   red_distribucion_desague:req.body.red_distribucion_desague,
				   tipo_material_tuberia:req.body.tipo_material_tuberia,
				   diametro_tubo:req.body.diametro_tubo,
				   tipo_caja:req.body.tipo_caja,
				   estado_caja:req.body.estado_caja,
				   localizacion_caja:req.body.localizacion_caja,
				   estado_obstruido:req.body.obstruido,
				   ubicacion_metros_desague:req.body.ubicacion_metros_desague}

		await model.guardarSeccionDesague(ficha);

		res.send(ficha.id);

	} catch (error) {
		console.log(error);
	}
}
controlador.editarDatosMedidor=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let diametros_medidor=await parametros.filter(parametro=>parametro.variable=='DIAMETRO_MEDIDOR');
		let estados_medidor=await parametros.filter(parametro=>parametro.variable=='ESTADO_MEDIDOR');
		let posiciones_medidor=await parametros.filter(parametro=>parametro.variable=='POSICION_MEDIDOR');
		let valvulas=await parametros.filter(parametro=>parametro.variable=='VALVULA');
		let tipos_medidor=await parametros.filter(parametro=>parametro.variable=='TIPO_MEDIDOR');
		let seguridades_medidor=await parametros.filter(parametro=>parametro.variable=='SEGURIDAD_MEDIDOR');

		let ficha=await model.consultarFicha(req.params.id);
		let usuario=req.user;
		//console.log(ficha,usuario);
		res.render("editarDatosMedidor",{ficha,diametros_medidor,estados_medidor,posiciones_medidor,
			valvulas,tipos_medidor,seguridades_medidor,usuario});

	} catch (error) {
		console.log(error);
	}
}
controlador.guardarDatosMedidor=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   marca_medidor:req.body.marca_medidor,
				   num_medidor:req.body.num_medidor,
				   lectura:req.body.lectura,
				   diametro_medidor:req.body.diametro_medidor,
				   estado_medidor:req.body.estado_medidor,
				   posicion_medidor:req.body.posicion_medidor,
				   valvula:req.body.valvula,
				   tipo_medidor:req.body.tipo_medidor,
				   seguridad_medidor:req.body.seguridad_medidor}

 		 await model.guardarDatosMedidor(ficha);

		 res.send(ficha.id);
		 
	} catch (error) {
		console.log(error);
	}
}
controlador.editarDatosGenerales=async (req, res, next)=>{
	try {
		let parametros=await model.listarparametros('');
		let veredas=await parametros.filter(parametro=>parametro.variable=='VEREDA');
		let pistas=await parametros.filter(parametro=>parametro.variable=='PISTA');
		let pozos_artesanal=await parametros.filter(parametro=>parametro.variable=='POZO_ARTESANAL');
		let tipos_almacenamiento=await parametros.filter(parametro=>parametro.variable=='TIPO_ALMACENAMIENTO');

		let ficha=await model.consultarFicha(req.params.id);

		let encuestadores=await model.consultarEncuestadores();
		let usuario=req.user;
		//console.log(ficha,veredas,pistas,pozos_artesanal,tipos_almacenamiento,encuestadores,usuario);
		res.render("editarDatosGenerales",{ficha,veredas,pistas,pozos_artesanal,tipos_almacenamiento,encuestadores,usuario});

	} catch (error) {
		console.log(error);
	}
}
controlador.guardarDatosGenerales=async (req, res, next)=>{
	try {
		let ficha={id:req.params.id,
				   vereda:req.body.vereda,
				   pista:req.body.pista,
				   pozo_artesanal:req.body.pozo_artesanal,
				   tipo_almacenamiento:req.body.tipo_almacenamiento,
				   num_pisos:req.body.num_pisos,
				   frec_horas_abastecimiento:req.body.frec_horas_abastecimiento,
				   frec_dias_abastecimiento:req.body.frec_dias_abastecimiento,
				   medidas_fachada:req.body.medidas_fachada,
				   presion_agua:req.body.presion_agua,
				   observaciones:req.body.observaciones,
				   ubicacion_conexion_fila:req.body.ubicacion_conexion_fila,
				   ubicacion_conexion_columna:req.body.ubicacion_conexion_columna,
				   codencuestador:req.body.codencuestador
				}

 		 await model.guardarDatosGenerales(ficha);

		 res.send(ficha.id);
		 
	} catch (error) {
		console.log(error);
	}
}
controlador.editarFotos=async(req,res,next)=>{
	let ficha=await model.consultarFicha(req.params.id);
	let fotos=await model.consultarFotos(req.params.id);
	let usuario=req.user;
	console.log(ficha,fotos,usuario);
	res.render("editarFotos",{ficha,fotos,usuario});
}
controlador.subirFotos=async(req,res,next)=>{
	try {
		req.files.forEach(async(file)=>{
			let foto=await model.regFoto(req.params.id,file.location);
		});
		res.status(200).send((req.params.id).toString());
	} catch (error) {
		console.log(error);
	}
}
controlador.eliminarFoto=async(req,res,next)=>{
	try {
		let foto=await model.consultarFoto(req.params.id);

		if(foto){
			let eliminadoS3=S3Service.eliminar_foto(path.basename(foto.url));
			let eliminadoBD=await model.delFoto(req.params.id)?true:false;
			if (eliminadoS3 && eliminadoBD) {
				res.status(200).send((foto.id).toString());
			}
		} else{
			res.status(200).send('0');
		}
	} catch (error) {
		console.log(error);
	}
}
module.exports = controlador;
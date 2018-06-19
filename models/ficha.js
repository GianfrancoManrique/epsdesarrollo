const cliente = require("../connections/conPostgreSQL");

let modelo =()=>{};

modelo.listarparametros=(variable)=>{
		return new Promise(async (resolve,reject)=>{
			try {
				let comando='select variable,codigo,valor from nasca.usp_selparametrosxvariable (\'';
				comando=comando.concat(variable,'\')');
				let resultado=await cliente.query(comando)	
				resolve(resultado.rows);
			} catch (error) {
				reject(error);
			}
			/*
			} finally{
				cliente.end();
			}
			*/
		})
}
modelo.consultarFicha=(id)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select id,sucursal,estado_conexion,distrito,sector,manzana,'
			comando=comando.concat('codsuministro,lote,conexion,subsector,sector_opera,tipo_habilitacion,nombre_habilitacion,');
			comando=comando.concat('comuna,manzana_mun,lote_mun,sublote_mun,tipo_poblacion,geocodigo,');
			comando=comando.concat('coordenada_x,coordenada_y,coordenada_z,');
			comando=comando.concat('tipo_via,nombre_via,telefono,estado_servicio,tipo_servicio,referencias,num_municipal,');
			comando=comando.concat('ruta_distribucion,secuencia,tipo_construccion,estado_construccion,grupo_caracteristico,ciiu,quien_habita,num_familias,num_habitantes,');
			comando=comando.concat('estado_agua,categoria_agua,tipo_cobranza_medicion,macrosector_agua,sector_agua,multiusuario_agua,cantidad_predios,');
			comando=comando.concat('tipo_consumidor,caja_registro,estado_caja_agua,acometida_tuberia,diametro_acometida,tapa,pavimento,localizacion_conexion,ubicacion_metros,tiene_fuga,estado_tapa,');
			comando=comando.concat('estado_desague,categoria_desague,macrosector_desague,sector_desague,red_distribucion_desague,');
			comando=comando.concat('tipo_material_tuberia,diametro_tubo,tipo_caja,estado_caja,localizacion_caja,estado_obstruido,ubicacion_metros_desague,');
			comando=comando.concat('marca_medidor,num_medidor,lectura,diametro_medidor,estado_medidor,posicion_medidor,valvula,tipo_medidor,seguridad_medidor,');
			comando=comando.concat('vereda,pista,pozo_artesanal,tipo_almacenamiento,num_pisos,frec_horas_abastecimiento,frec_dias_abastecimiento,medidas_fachada,presion_agua,observaciones,ubicacion_conexion_fila,ubicacion_conexion_columna,codencuestador ');
			comando=comando.concat('from nasca.usp_selficha(');
			comando=comando.concat(id,')');

			let resultado=await cliente.query(comando);
			resolve(resultado.rows[0]);
		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarFichaImpresion=(id)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select ficha_numero,sucursal,estado_de_conexion,suministro,dept,'
			comando=comando.concat('prov,dist,sect,manzana,lote,conex,ciclo_de_facturacion,');
			comando=comando.concat('sector,sub_sector,apellido_paterno_del_propietario,');
			comando=comando.concat('apellido_materno_del_propietario,nombres_del_propietario,');
			comando=comando.concat('apellido_paterno_del_responsable,apellido_materno_del_responsable,');
			comando=comando.concat('nombres_del_responsable,numero,tipo_doc,pais,departamento,');
			comando=comando.concat('provincia,distrito_centro_poblado,zona,tipo_de_habilitacion,');
			comando=comando.concat('nombre_de_habilitacion,comuna,sector_ubica,manzana_ubica,');
			comando=comando.concat('lote_ubica,sublote,tipo_de_poblacion,geocodigo,coordenada_x,');
			comando=comando.concat('coordenada_y,coordenada_z,tipo_de_via,nombre_de_via,');
			comando=comando.concat('n_municipal,telefono,estado,tipo_de_servicio,referencias,');
			comando=comando.concat('ruta_de_distribucion,secuencia,tipo_de_construccion,estado_de_construccion,');
			comando=comando.concat('grupo_caracteristicos,codigo_ciiu,quien_habita,n_de_familias,n_habitantes,codigo_catastral,');
			comando=comando.concat('estado_agua,categoria_agua,tipo_de_cobranza_medicion,macrosector_agua,sector_agua,multiusuario,');
			comando=comando.concat('cantidad_de_predios,caja_de_registro,estado_de_caja,acometida_tuberia,diametro_acometida,tapa,');
			comando=comando.concat('tipo_de_consumidor,pavimento,localizacion_de_conexion,ubicacion_mts,fugas,estado_tapa,estado_desague,');
			comando=comando.concat('categoria_desague,macrosector_desague,sector_desague,red_distribucion_desague,tipo_material_tuberia,diametro_tubo,');

			comando=comando.concat('tipo_caja_desague,estado_caja_desague,localizacion_caja_desague,obstruido,ubicacion_mts_desague,');
			comando=comando.concat('marca_medidor,num_medidor,lectura,diametro_medidor,estado_medidor,');
			comando=comando.concat('posicion_medidor,valvulas,tipo_medidor,seguridad_medidor,vereda,');
			comando=comando.concat('pista,pozo_artesanal,tipo_almacenamiento,num_pisos,medidas_fachada,');
			comando=comando.concat('presion_agua,frec_dias_abastecimiento,frec_horas_abastecimiento,observaciones,encuestador,');
			comando=comando.concat('fecha_encuestador,supervisor,fecha_supervisor ');
			comando=comando.concat('from nasca.usp_selfichaimpresion(');
			comando=comando.concat(id,')');

			let resultado=await cliente.query(comando);
			resolve(resultado.rows[0]);
		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarEncuestadores=()=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select codigo from nasca.usp_selencuestadores()';
			let resultado=await cliente.query(comando);
			resolve(resultado.rows);
		} catch (error) {
			reject(error);
		}
	})
}
modelo.buscarFichas=(palabras)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select id,codsuministro,nombre_completo,direccion '
			comando=comando.concat('from nasca.usp_selbuscarfichas(\'');
			comando=comando.concat(palabras,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado.rows);
		} catch (error) {
			reject(error);
		}
	})
}
modelo.regIdentificador=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='insert into nasca.ficha(sucursal,estado_conexion,distrito,sector,manzana,codsuministro,lote,conexion,subsector,sector_opera,codencuestador,fectrabajada) values(\'';
			comando=comando.concat(ficha.sucursal,'\',\'',ficha.estado_conexion,'\',\'',ficha.distrito,'\',\'',ficha.sector,'\',\'',ficha.manzana,'\',\'',
			ficha.codsuministro,'\',\'',ficha.lote,'\',\'',ficha.conexion,'\',\'',ficha.subsector,'\',\'',ficha.sector_opera,'\',\'',ficha.codencuestador,'\',transaction_timestamp()) returning id');
			let resultado=await cliente.query(comando);
			resolve(resultado.rows);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarIdentificador=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updidentificador(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.sucursal,'\',');
			comando=comando.concat('\'',ficha.estado_conexion,'\',');
			comando=comando.concat('\'',ficha.distrito,'\',');
			comando=comando.concat('\'',ficha.sector,'\',');
			comando=comando.concat('\'',ficha.manzana,'\',');
			//comando=comando.concat('\'',ficha.codsuministro,'\',');
			comando=comando.concat('\'',ficha.lote,'\',');
			comando=comando.concat('\'',ficha.conexion,'\',');
			comando=comando.concat('\'',ficha.subsector,'\',');
			comando=comando.concat('\'',ficha.sector_opera,'\',');
			comando=comando.concat('\'',ficha.codencuestador,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.regResponsable=(idficha,responsable,propietario)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_insresponsable(';
			comando=comando.concat('\'',responsable.tipo_doc,'\',');
			comando=comando.concat('\'',responsable.num_doc,'\',');
			comando=comando.concat('\'',responsable.nombres_resp,'\',');
			comando=comando.concat('\'',responsable.apellido_pat_resp,'\',');
			comando=comando.concat('\'',responsable.apellido_mat_resp,'\',');
			comando=comando.concat('\'',propietario.nombres_prop,'\',');
			comando=comando.concat('\'',propietario.apellido_pat_prop,'\',');
			comando=comando.concat('\'',propietario.apellido_mat_prop,'\',');
			comando=comando.concat(idficha,')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarResponsable=(idficha,responsable,propietario)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updresponsable(';
			comando=comando.concat(idficha,',');
			comando=comando.concat('\'',responsable.tipo_doc,'\',');
			comando=comando.concat('\'',responsable.num_doc,'\',');
			comando=comando.concat('\'',responsable.nombres_resp,'\',');
			comando=comando.concat('\'',responsable.apellido_pat_resp,'\',');
			comando=comando.concat('\'',responsable.apellido_mat_resp,'\',');
			comando=comando.concat('\'',propietario.nombres_prop,'\',');
			comando=comando.concat('\'',propietario.apellido_pat_prop,'\',');
			comando=comando.concat('\'',propietario.apellido_mat_prop,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.consultarResponsables=(idficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select tipo_resp,tipo_doc,num_doc,nombres,apellido_pat,apellido_mat from ';
			comando=comando.concat('nasca.usp_selresponsables(',idficha,')')

			let resultado=await cliente.query(comando);
			resolve(resultado.rows);
		} catch (error) {
			reject(error);
		}
	})
}
modelo.guardarUbicaGeografica=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updubicageografica(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.tipo_habilitacion,'\',');
			comando=comando.concat('\'',ficha.nombre_habilitacion,'\',');
			comando=comando.concat('\'',ficha.manzana_mun,'\',');
			comando=comando.concat('\'',ficha.lote_mun,'\',');
			comando=comando.concat('\'',ficha.sublote_mun,'\',');
			comando=comando.concat('\'',ficha.tipo_poblacion,'\',');
			comando=comando.concat('\'',ficha.coordenada_x,'\',');
			comando=comando.concat('\'',ficha.coordenada_y,'\',');
			comando=comando.concat('\'',ficha.coordenada_z,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarUbicacion=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updubicacion(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.tipo_via,'\',');
			comando=comando.concat('\'',ficha.nombre_via,'\',');
			comando=comando.concat('\'',ficha.telefono,'\',');
			comando=comando.concat('\'',ficha.estado_servicio,'\',');
			comando=comando.concat('\'',ficha.tipo_servicio,'\',');
			comando=comando.concat('\'',ficha.referencias,'\',');
			comando=comando.concat('\'',ficha.num_municipal,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarClasificacion=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updclasificacion(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.ruta_distribucion,'\',');
			comando=comando.concat('\'',ficha.secuencia,'\',');
			comando=comando.concat('\'',ficha.tipo_construccion,'\',');
			comando=comando.concat('\'',ficha.estado_construccion,'\',');
			comando=comando.concat('\'',ficha.grupo_caracteristico,'\',');
			comando=comando.concat('\'',ficha.ciiu,'\',');
			comando=comando.concat('\'',ficha.quien_habita,'\',');
			comando=comando.concat(ficha.num_familias,',');
			comando=comando.concat(ficha.num_habitantes,')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarSeccionAgua=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updseccionagua(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.estado_agua,'\',');
			comando=comando.concat('\'',ficha.categoria_agua,'\',');
			comando=comando.concat('\'',ficha.tipo_cobranza_medicion,'\',');
			comando=comando.concat('\'',ficha.macrosector_agua,'\',');
			comando=comando.concat('\'',ficha.sector_agua,'\',');
			comando=comando.concat(ficha.multiusuario_agua,',');
			comando=comando.concat(ficha.cantidad_predios,',');
			comando=comando.concat('\'',ficha.tipo_consumidor,'\',');
			comando=comando.concat('\'',ficha.caja_registro,'\',');
			comando=comando.concat('\'',ficha.estado_caja_agua,'\',');
			comando=comando.concat('\'',ficha.acometida_tuberia,'\',');
			comando=comando.concat('\'',ficha.diametro_acometida,'\',');
			comando=comando.concat('\'',ficha.tapa,'\',');
			comando=comando.concat('\'',ficha.pavimento,'\',');
			comando=comando.concat('\'',ficha.localizacion_conexion,'\',');
			comando=comando.concat(ficha.ubicacion_metros,',');
			comando=comando.concat('\'',ficha.fuga,'\',');
			comando=comando.concat('\'',ficha.estado_tapa,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.registrarUnidadUso=(unidad_uso)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_insunidaduso(';
			comando=comando.concat('\'',unidad_uso.responsable,'\',');
			comando=comando.concat('\'',unidad_uso.tipo_uso,'\',');
			comando=comando.concat('\'',unidad_uso.categoria,'\',');
			comando=comando.concat('\'',unidad_uso.tarifa,'\',');
			comando=comando.concat('\'',unidad_uso.complemento,'\',');
			comando=comando.concat(unidad_uso.idficha,')');
		
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.eliminarUnidadUso=(unidad_uso)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_delunidaduso(';
			comando=comando.concat(unidad_uso.id,')');
		
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarSeccionDesague=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_updsecciondesague(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.estado_desague,'\',');
			comando=comando.concat('\'',ficha.categoria_desague,'\',');
			comando=comando.concat('\'',ficha.macrosector_desague,'\',');
			comando=comando.concat('\'',ficha.sector_desague,'\',');
			comando=comando.concat('\'',ficha.red_distribucion_desague,'\',');
			comando=comando.concat('\'',ficha.tipo_material_tuberia,'\',');
			comando=comando.concat('\'',ficha.diametro_tubo,'\',');
			comando=comando.concat('\'',ficha.tipo_caja,'\',');
			comando=comando.concat('\'',ficha.estado_caja,'\',');
			comando=comando.concat('\'',ficha.localizacion_caja,'\',');
			comando=comando.concat('\'',ficha.estado_obstruido,'\',');
			comando=comando.concat(ficha.ubicacion_metros_desague,')');
		
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarDatosMedidor=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_upddatosmedidor(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.marca_medidor,'\',');
			comando=comando.concat('\'',ficha.num_medidor,'\',');
			comando=comando.concat('\'',ficha.lectura,'\',');
			comando=comando.concat('\'',ficha.diametro_medidor,'\',');
			comando=comando.concat('\'',ficha.estado_medidor,'\',');
			comando=comando.concat('\'',ficha.posicion_medidor,'\',');
			comando=comando.concat('\'',ficha.valvula,'\',');
			comando=comando.concat('\'',ficha.tipo_medidor,'\',');
			comando=comando.concat('\'',ficha.seguridad_medidor,'\')');
		
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.guardarDatosGenerales=(ficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select nasca.usp_upddatosgenerales(';
			comando=comando.concat(ficha.id,',');
			comando=comando.concat('\'',ficha.vereda,'\',');
			comando=comando.concat('\'',ficha.pista,'\',');
			comando=comando.concat('\'',ficha.pozo_artesanal,'\',');
			comando=comando.concat('\'',ficha.tipo_almacenamiento,'\',');
			comando=comando.concat(ficha.num_pisos,',');
			comando=comando.concat(ficha.frec_horas_abastecimiento,',');
			comando=comando.concat(ficha.frec_dias_abastecimiento,',');
			comando=comando.concat('\'',ficha.medidas_fachada,'\',');
			comando=comando.concat('\'',ficha.presion_agua,'\',');
			comando=comando.concat('\'',ficha.observaciones,'\',')
			comando=comando.concat(ficha.ubicacion_conexion_fila,',')
			comando=comando.concat(ficha.ubicacion_conexion_columna,',')
			comando=comando.concat('\'',ficha.codencuestador,'\')')
		
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.consultarUnidadesUsoFicha=(idficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select id,responsable,tipo_uso,categoria,tarifa,complemento from ';
			comando=comando.concat('nasca.usp_selunidadesusoficha(',idficha,')')

			let resultado=await cliente.query(comando);
			resolve(resultado.rows);
		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarPuntos=()=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select coordenada_x,coordenada_y,codencuestador,color from nasca.usp_selpuntos()';
			let resultado=await cliente.query(comando);
			resolve(resultado.rows);

		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarResumenPorEncuestador=()=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select codencuestador,nombrecompleto,totalfichas from nasca.usp_selresumenporencuestador()';
			let resultado=await cliente.query(comando);
			resolve(resultado.rows);

		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarResumenDiario=(fecha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select codencuestador,nombrecompleto,totalfichas from ';
			comando=comando.concat('nasca.usp_selresumendiarioporencuestador(\'',fecha,'\')')

			let resultado=await cliente.query(comando);
			resolve(resultado.rows);

		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarFichasPorEncuestador=(codencuestador,fecha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select id,codsuministro,estado_conexion,fechora from nasca.usp_selfichasporencuestador(';
			comando=comando.concat('\'',codencuestador,'\',');
			comando=comando.concat('\'',fecha,'\')');

			let resultado=await cliente.query(comando);
			resolve(resultado.rows);

		} catch (error) {
			reject(error);
		}
	})
}
modelo.consultarResumenFinal=()=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select total_predios,total_avance,porc_avance from nasca.usp_selresumenfinal()';
			let resultado=await cliente.query(comando);
			resolve(resultado.rows);

		} catch (error) {
			reject(error);
		}
	})
}
modelo.regFoto=(idficha,url)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='insert into nasca.foto(idficha,url) values(';
			comando=comando.concat(idficha,',\'',url,'\')');
			let resultado=await cliente.query(comando);
			resolve(resultado);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.delFoto=(id)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='delete from nasca.foto where id='+id;
			let resultado=await cliente.query(comando);
			resolve(true);
		} catch (error) {
			reject(false);
		}
	});
}
modelo.consultarFoto=(id)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select id,url,idficha from nasca.foto where id='+id;
			let resultado=await cliente.query(comando);
			resolve(resultado.rows[0]);
		} catch (error) {
			reject(error);
		}
	});
}
modelo.consultarFotos=(idficha)=>{
	return new Promise(async (resolve,reject)=>{
		try {
			let comando='select id,url,idficha from nasca.foto where idficha='+idficha;
			let resultado=await cliente.query(comando);
			resolve(resultado.rows);
		} catch (error) {
			reject(error);
		}
	});
}
module.exports = modelo;
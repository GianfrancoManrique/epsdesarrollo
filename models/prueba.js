var pmunicipio=req.params.municipio;
    	var comando='select id,titulo,habilitado,feccreado,fecmodificado from public.sp_consultarnoticiasxmunicipio (';
		comando=comando.concat(pmunicipio,')');

    	Noticia.query(comando,function(error,resultado){

			if(error){ res.negotiate(error)};	
			let noticias=resultado?resultado.rows:null;
			res.view('Noticias/NoticiaListar',{layout:'../views/Layouts/Layout-4',municipio:pmunicipio,noticias:noticias})
		})
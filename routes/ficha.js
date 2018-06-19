var express = require('express');
var router = express.Router();
var controlador = require("../controllers/fichaController");
var bodyParser = require('body-parser');
var multer  = require('multer');
var multerS3 = require('multer-s3');
let AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
let S3 = new AWS.S3({apiVersion: '2006-03-01'});
let path = require('path')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let upload =  multer({
  storage: multerS3({
    s3: S3,
    bucket: 'emapavigsprod',
    key:(req, file, cb)=> {
      let extension=path.extname(file.originalname);
      cb(null,Date.now()+extension)
    },
    metadata: (req, file, cb)=>{
      cb(null, {fieldName: file.originalname});
    }
  })
})

let estaAutenticado = (req, res, next)=>{
  if (req.isAuthenticated()) return next();
   res.redirect('/');
}

router.get('/principal', estaAutenticado,(req, res, next)=>{
  res.render('principal', req.user);
});
router.get("/explorar",estaAutenticado,controlador.explorar);
router.post("/buscar-fichas",estaAutenticado,controlador.buscarFichas);

router.get("/crear-identificacion",estaAutenticado,controlador.crearIdentificador);
router.post("/registrar-identificacion",estaAutenticado,controlador.registrarIdentificador);
router.get("/editar-identificacion/:id",estaAutenticado,controlador.editarIdentificador);
router.post("/guardar-identificacion/:id",estaAutenticado,controlador.guardarIdentificador)

router.get("/editar-responsable/:id",estaAutenticado,controlador.editarResponsable);
router.post("/guardar-responsable/:id",estaAutenticado,controlador.guardarResponsable)

router.get("/editar-ubica-geografica/:id",estaAutenticado,controlador.editarUbicacionGeografica);
router.post("/guardar-ubica-geografica/:id",estaAutenticado,controlador.guardarUbicacionGeografica);

router.get("/editar-ubicacion/:id",estaAutenticado,controlador.editarUbicacion);
router.post("/guardar-ubicacion/:id",estaAutenticado,controlador.guardarUbicacion);

router.get("/editar-clasificacion/:id",estaAutenticado,controlador.editarClasificacion);
router.post("/guardar-clasificacion/:id", controlador.guardarClasificacion);

router.get("/editar-seccion-agua/:id",estaAutenticado,controlador.editarSeccionAgua);
router.post("/guardar-seccion-agua/:id",estaAutenticado,controlador.guardarSeccionAgua);

router.get("/editar-unidades-uso/:id",estaAutenticado,controlador.editarUnidadesUso);
router.post("/registrar-unidad-uso/:idficha",estaAutenticado,controlador.registrarUnidadUso);
router.post("/eliminar-unidad-uso/:id",estaAutenticado,controlador.eliminarUnidadUso);

router.get("/editar-seccion-desague/:id",estaAutenticado,controlador.editarSeccionDesague);
router.post("/guardar-seccion-desague/:id",estaAutenticado,controlador.guardarSeccionDesague);

router.get("/editar-datos-medidor/:id",estaAutenticado,controlador.editarDatosMedidor);
router.post("/guardar-datos-medidor/:id",estaAutenticado,controlador.guardarDatosMedidor);

router.get("/editar-datos-generales/:id",estaAutenticado,controlador.editarDatosGenerales);
router.post("/guardar-datos-generales/:id",estaAutenticado,controlador.guardarDatosGenerales);

router.get("/editar-fotos/:id",estaAutenticado,controlador.editarFotos);
router.post("/subir-fotos/:id",estaAutenticado,upload.array('fotos',3),controlador.subirFotos);
router.post("/eliminar-foto/:id",controlador.eliminarFoto);
//router.post()
module.exports = router;
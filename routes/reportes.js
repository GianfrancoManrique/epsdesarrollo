var express = require('express');
var router = express.Router();
var controlador = require("../controllers/reportesController");
var bodyParser = require('body-parser');

var estaAutenticado = (req, res, next)=>{
    if (req.isAuthenticated()) return next();
     res.redirect('/');
}

router.get("/reportes",estaAutenticado,controlador.reportes);
router.get("/reporte-avance-mapa",estaAutenticado,controlador.reporteAvanceMapa);
router.get("/reporte-resumen-encuestador",estaAutenticado,controlador.reporteResumenPorEncuestador);
router.post("/reporte-detalle-encuestador/:codencuestador",estaAutenticado,controlador.reporteDetallePorEncuestador);
router.get("/reporte-resumen-diario/:fecha",estaAutenticado,controlador.reporteDiario);
router.get("/reporte-resumen-final",estaAutenticado,controlador.reporteResumenFinal);
router.get("/imprimir-ficha/:id",estaAutenticado,controlador.imprimirFicha);
module.exports = router;
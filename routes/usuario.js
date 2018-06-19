var express = require('express');
var router = express.Router();
var controlador = require("../controllers/usuarioController");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router.post("/principal", controlador.principal);

module.exports = router;
var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession=require("cookie-session");
var bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
var modelo = require("./models/usuario");

//Passport Local
var passport = require("passport");
var passportLocal = require("passport-local").Strategy;

passport.serializeUser(function(usuario, done) {
  done(null, usuario);
});
 
passport.deserializeUser(function(usuario, done) {
  done(null, usuario);
});

passport.use(new passportLocal(
  {
    usernameField: "codigo",
    passwordField: "contrasena"
  },
  (username, password, done)=>{
    console.log("Codigo: "+username);
    console.log("Contraseña: "+password);
    
    modelo.validar(username, password, async (err, datos)=>{

      if(err) {
        return done(false, null)
      };

      if(datos.rows[0]) {
        console.log(datos.rows[0]);

        let logeado=await bcrypt.compare(password,datos.rows[0].contraseña);
        
        if (logeado){
          return done(null, datos.rows[0]);
        }else{
          return done(false, null)
        }
       
      } else {
        return done(false, null);
      }

    })

  }
));
//Rutas
var ficha = require('./routes/ficha');
var reportes=require('./routes/reportes');
var index=require('./routes/index');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({secret: "12345abcD@"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/', ficha);
app.use('/', reportes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

module.exports = app;

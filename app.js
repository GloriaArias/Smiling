//Preámbulo
// Ayuda a manejar errores HTTP
var createError = require('http-errors');
//Ayuda a crear servidores web
var express = require('express');
//Nucleo de node, ayuda al manejo de las rutas
var path = require('path');
//Ayuda al manejo de las cookies
var cookieParser = require('cookie-parser');
//Maneja el log de peticiones http
var logger = require('morgan');

// Las rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');

//Aquí se crea la instancia de Express (req,res,next)=>{...}
var app = express();

//Configuración del motor de plantillas (Template engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Todos los middlewares globales van primero que cualquier otro middleware de la aplicación
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Middleware de archivos estaticos
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Registrando las rutas en la APP
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app; 
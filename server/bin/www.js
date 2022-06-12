#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '@s/app';
import Debug from 'debug';
import http from 'http';

// Importando nuestro logger
import winston from '../config/winston';
// Importando el objeto de las llaves de configuracion
import configKeys from '../config/configKeys';

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Creando instancia del debugger
const debug = Debug('smiling:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(configKeys.port || '5000');
// app es una instnacia de ExpressJs[ ] [ NODE ]
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app); // (req, res, next, err)=> {}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.error(`Port: ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.error(`Port: ${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  winston.info(`Servidor escuchando 🤖🦻...en ${app.get('port')}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port); // Pone al server a escuchar
// Se registran eventos
server.on('error', onError); // En caso de error
server.on('listening', onListening); // Cuando esta escuchando

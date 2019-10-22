
/* eslint consistent-return:0 import/order:0 */
import '@babel/polyfill/noConflict';
import { resolve, join } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import chalk from 'chalk';
import mongoose from 'mongoose';
import http from 'http';
import './env';
import Logger from './logger';
import argv from './argv';
import port from './port';
import passport from './passport';
import SocketIOServer from './socketio';
import {
  authenticateApi,
  authenticateSocketIO,
} from './middlewares/authenticateMiddlewares';
import setup from './middlewares/frontendMiddleware';
import registerRouters from './modules/routers';
import startUpTask from './startup';

const app = express();
const server = http.createServer(app);

/* socket IO */
Logger.info('[Socket.io]: Openning the tournament...');
const socketIOServer = new SocketIOServer(authenticateSocketIO);
socketIOServer.connect(server);
global.socketIOServer = socketIOServer;

// setup asset folder (public folder)
app.use('/assets', express.static(join(__dirname, './../app/assets/')));

const getStatusColor = (status) => {
  switch (Number(status) / 100) {
    case 2:
      return chalk.green;
    case 4:
      return chalk.yellow;
    case 5:
      return chalk.red;
    default:
      return chalk.white;
  }
};

const getTimeColor = (time) => {
  if (+time > 5000) return chalk.red;
  if (+time > 1000) return chalk.yellow;
  return chalk.white;
};

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan((tokens, req, res) => { // eslint-disable-line
  let status = tokens.status(req, res);
  let responseTime = tokens['response-time'](req, res);

  const statusColor = getStatusColor(status);
  const timecolor = getTimeColor(responseTime);
  const method = chalk.cyan(`[${tokens.method(req, res)}]`);
  const url = chalk.bold(tokens.url(req, res));
  const contentLength = `${chalk.bold(tokens.res(req, res, 'content-length') || 'Unknown')} bytes`;
  const remoteAddr = tokens['remote-addr'](req, res);
  const remoteUser = tokens['remote-user'](req, res) || 'N/A';
  const httpVersion = `HTTP:/${tokens['http-version'](req, res)}`;
  const date = `${tokens.date(req, res)}`;
  const methodUrl = `${method} ${url} ${httpVersion}`;

  status = statusColor(status);
  responseTime = `${timecolor(chalk.bold(responseTime))} ms`;

  if (url.match(/(\.js|\.ico|\.png|\.jpg)/)) {
    return null;
  }

  return [
    remoteAddr,
    remoteUser,
    date,
    methodUrl,
    status,
    responseTime,
    contentLength,
  ].join(' | ');
}));
const router = registerRouters();
const middlewares = [authenticateApi];
app.use('/api', middlewares, router);


// In production we need to pass these values in instead of relying on webpack
const client = setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

client.listen(process.env.PORT);


// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// SETUP MONGOOSE
const db = mongoose.connection;
const { MONGO_URL, MONGO_USER, MONGO_PASSWORD } = process.env;
db.once('open', () => {
  Logger.info('[DB]: Established connection to database server.');
  Logger.info('[STARTUP]: Running startup task');
  startUpTask();
  Logger.info('[APP]: Starting server...');


  // Start your app.
  server.listen(port, host, async (err) => {
    if (err) {
      return Logger.error(err.message);
    }

    Logger.appStarted(port, prettyHost);
  });
});

// prevent server from starting if db is not connected
db.on('error', (err) => {
  Logger.error('[DB]: Unable to connect to database server');
  Logger.error(`${err.message}`);
  Logger.error('[APP]: Server has been stopped!');
});

Logger.info('[APP]: Connecting to database');
mongoose.connect(MONGO_URL, {
  user: MONGO_USER,
  pass: MONGO_PASSWORD,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
});
// END SETUP MONGOOSE

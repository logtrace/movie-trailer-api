import express from 'express';
import apicache from 'apicache';

import routes from './api/routes';
import {Logger} from './BunyanLogger';
import config from './config';

Logger.log('Initializing cache middleware');

let cache = apicache.middleware;

Logger.log('Initializing express app');

const app = express();
const port = process.env.PORT || 3000;

Logger.log('Initializing invalid route validation');
// Handle invalid routes
app.use((req, res, next) => {
  if (!req.originalUrl.includes('/trailer')) {
    res.status(404).json({status: 404, message: `${req.originalUrl} not found`});
  } else {
    next();
  }
});

Logger.log('Adding cache to the app');
// Add caching
app.use(cache(config.cacheTimeout));

Logger.log('Adding routes to the app');
// Add routes to the application
routes(app);

app.listen(port);

// console.log(`movie-trailer-api started on: ${port}`);
Logger.log(`movie-trailer-api started on: ${port}`);

import express from 'express';
import apicache from 'apicache';

import routes from './api/routes';

let cache = apicache.middleware;
const app = express();
const port = process.env.PORT || 3000;

// Handle invalid routes
app.use((req, res, next) => {
  if (!req.originalUrl.includes('/trailer')) {
    res.status(404).json({status: 404, message: `${req.originalUrl} not found`});
  } else {
    next();
  }
});

// Add caching
app.use(cache('1 day'));

// Add routes to the application
routes(app);

app.listen(port);

console.log(`movie-trailer-api started on: ${port}`);

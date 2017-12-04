import express from 'express';
import apicache from 'apicache';

import routes from './api/routes';

let cache = apicache.middleware;
const app = express();
const port = process.env.PORT || 3000;

//Add routes to the application
routes(app);

app.listen(port);

console.log(`movie-trailer-api started on: ${port}`);

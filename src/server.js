import express from 'express';
import apicache from 'apicache';

let cache = apicache.middleware;
const app = express();
const port = process.env.PORT || 3000;

app.listen(port);

console.log(`movie-trailer-api started on: ${port}`);

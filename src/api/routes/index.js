import { getTrailerContentForSingleMovie } from '../controllers/trailerController';

const routes = app => {
  app.route('/trailer')
    .get((req, res) => {
      getTrailerContentForSingleMovie(req.query.resourceLink)
        .then(response => {
          res.json(response);
        })
        .catch(error => {
          res.json(error.status, error);
        })
    });
}

export default routes;

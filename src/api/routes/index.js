import { getTrailerContentForSingleMovie } from '../controllers/trailerController';

/**
 * Validate the parameter {required, valid url}
 * @param {string} param - parameter name
 */
const paramValidator = param => {
  return (req, res, next) => {
    const resourceLink = req.query[param];

    if (resourceLink) {
      const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

      if (expression.test(resourceLink)) {
        next();
      } else {
        res.status(400).json({status: 400, message: 'Invalid value provided for query param :resourceLink'});
      }
    } else {
      res.status(400).json({status: 400, message: 'Missing required query param :resourceLink'});
    }
  }
}

const getTrailerData = (req, res) => {
  getTrailerContentForSingleMovie(req.query.resourceLink)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      res.status(error.status).json(error);
    });
}

const routes = app => {
  app.route('/trailer')
    .get(paramValidator('resourceLink'), getTrailerData);
}

export default routes;

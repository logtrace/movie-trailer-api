import * as MovieContentController from './movieContentController';
import * as TMDBContentController from './tmdbContentController';

export const getTrailerContentForSingleMovie = resourceLink => {
  return MovieContentController
    .getMovieIdFromResource(resourceLink)
    .then(TMDBContentController.getTrailerUrlsFromMovieId)
    .then(trailers => mapTrailersToResource(resourceLink, trailers));
};

const mapTrailersToResource = (resourceLink, trailerContent) => {
  return {
    resource: resourceLink,
    trailers: trailerContent
  };
};

import axios from 'axios';

/**
 * Do API call to get movie content from viaplay
 *
 * @param {string} resourceLink - viaplay movie url
 */
export const getMovieContentFromResource = resourceLink => {
  return axios
    .get(`${resourceLink}`)
    .then(res => {
      if (res && res.data) {
        return res.data;
      } else {
        return {status: res.data.status, message: res.data.statusText};
      }
    })
    .catch(error => {
      return {status: error.response.status, message: error.message}
    });
};

/**
 * Get IMDB id from the movie content
 *
 * @param {json} content
 */
const getMovieIdFromContent = content => {
  return content._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;
}

/**
 * Get IMDB id from viaplay resource link
 * @param {string} resourceLink
 */
export const getMovieIdFromResource = resourceLink =>  {
  return getMovieContentFromResource(resourceLink)
    .then(getMovieIdFromContent);
};

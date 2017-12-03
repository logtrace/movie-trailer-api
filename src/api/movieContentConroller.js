import Promise from 'bluebird';
import axios from 'axios';

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

const getMovieId = content => {
  return content._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;
}

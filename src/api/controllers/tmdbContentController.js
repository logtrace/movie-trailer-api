import axios from 'axios';

import config from '../../config';

/**
 * Do api call with IMDB movie id to get video content from TMDB
 * @param {string} movieId
 */
export const getTrailerContentFromMovieId = movieId => {
  const {url, queryParams} = config.tmdb;

  return axios
    .get(`${url}/${movieId}`, {params: queryParams})
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
 * Get trailer video from TMDB content
 * @param {json} content
 */
export const getTrailerContent = content => {
  if (content && content.videos && content.videos.results) {
    return content.videos.results;
  } else {
    return [];
  }
};

/**
 * Filter out trailer videos from video content
 * @param {Array} videoContentList
 */
export const getTrailerUrlMappedContent = videoContentList => {
  if (videoContentList) {
    return videoContentList.map(videoContent => {
      if('Teaser'.toLowerCase() === videoContent.type.toLowerCase() || 'Trailer'.toLowerCase() === videoContent.type.toLowerCase()) {
        if ('YouTube'.toLowerCase() === videoContent.site.toLowerCase()) {
          delete videoContent.id;

          videoContent.url = `${config.trailer.youtubeBase}${videoContent.key}`;
          return videoContent;
        }
      }
    });
  } else {
    return [];
  }
};

/**
 * Get trailer videos list from IMDB movie id
 * @param {string} movieId
 */
export const getTrailerUrlsFromMovieId = movieId => {
  return getTrailerContentFromMovieId(movieId)
    .then(getTrailerContent)
    .then(getTrailerUrlMappedContent)
};


import axios from 'axios';

import config from '../config';

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

export const getTrailerContent = content => {
  if (content && content.videos && content.videos.results) {
    return content.videos.results;
  } else {
    return [];
  }
};

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

export const getTrailerUrlsFromMovieId = movieId => {
  return getTrailerContentFromMovieId(movieId)
    .then(getTrailerContent)
    .then(getTrailerUrlMappedContent)
};


export default {
  cacheTimeout: '1 day',
  tmdb: {
    url: 'https://api.themoviedb.org/3/movie',
    queryParams: {
      'api_key': 'ef4fd5bf3f45892db28c103c5836395a',
      'append_to_response': 'videos'
    }
  },
  trailer: {
    youtubeBase: 'https://www.youtube.com/watch?v='
  }
}

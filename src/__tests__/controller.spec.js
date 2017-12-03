import chai, {expect} from 'chai';
import promised from 'chai-as-promised';
import nock from 'nock';

import testConfig from './testConfig';
import {viaplayJson, viaplay404Json, tmdbJson, tmdb404Json} from './fixtures';

import {getMovieContentFromResource, getMovieIdFromResource} from '../api/movieContentController';
import { getTrailerContent, getTrailerContentFromMovieId, getTrailerUrlMappedContent, getTrailerUrlsFromMovieId } from '../api/tmdbContentController';

chai.use(promised);

describe('Get content from ViaPlay', () => {
  const {url, path, invalidPath} = testConfig.viaplay;

  it('should return a valid JSON response with correct api invocation', async () => {
    // Simulate the valid request to viaplay
    nock(`${url}`).get(path).reply(200, viaplayJson);

    const value = getMovieContentFromResource(`${url}${path}`)
      .then(response => response._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id);

      return expect(value).eventually.to.equal('tt2543164');
  });

  it('should return status 404 with error JSON when the resource id is invalid', async () => {
    // Simulate the invalid request to viaplay
    nock(`${url}`).get(invalidPath).reply(404, viaplay404Json);

    const err = getMovieContentFromResource(`${url}${invalidPath}`)
      .catch(error => error);

    return expect(err).eventually.to.become({status: 404, message: 'Request failed with status code 404'});
  });

  it('should return movie id from the content with the correct resource link', async () => {
    // Simulate the valid request to viaplay
    nock(`${url}`).get(path).reply(200, viaplayJson);

    expect(getMovieIdFromResource(`${url}${path}`)).to.eventually.equal('tt2543164');
  });
});

describe('Get content from TMDB', () => {
  const {url, path, invalidPath, movieId, invalidId} = testConfig.tmdb;


  it('should return a valid JSON response with correct api invocation', async () => {
    // Simulate the TMDB request and response for test
    nock(`${url}`).get(path).reply(200, tmdbJson);

    const value = getTrailerContentFromMovieId(movieId)
      .then(response => response.videos.results[0].key);

    expect(value).to.eventually.equal('gwqSi_ToNPs');
  });

  it('should return status 404 with error JSON when the movie id is invalid', async () => {
    // Simulate the TMDB request and response for test
    nock(`${url}`).get(invalidPath).reply(404, tmdb404Json);

    const err = getTrailerContentFromMovieId(invalidId)
      .catch(error => error);

    return expect(err).eventually.to.become({status: 404, message: 'Request failed with status code 404'});
  });

  it('should return valid list of video content when valid response is provided', () => {
    const videoContentList = getTrailerContent(tmdbJson);

    expect(videoContentList).to.have.length(3);
  });

  it('should return an empty list of video content when invalid response is provided', () => {
    const videoContentList = getTrailerContent(undefined);

    expect(videoContentList).to.have.length(0);
  });

  it('should return valid list of mapped video content with trailer url when valid response is provided', () => {
    const videoContentList = getTrailerContent(tmdbJson);
    const mappedContent = getTrailerUrlMappedContent(videoContentList);

    expect(mappedContent).to.have.length(3);
    expect(mappedContent[0].url).to.be.equal('https://www.youtube.com/watch?v=gwqSi_ToNPs')
  });

  it('should return an empty list of video content when invalid response is provided', () => {
    const mappedContent = getTrailerUrlMappedContent(undefined);

    expect(mappedContent).to.have.length(0);
  });

  it('should return valid list of content with trailer url when valid movie id is provided', async () => {
    // Simulate the TMDB request and response for test
    nock(`${url}`).get(path).reply(200, tmdbJson);

    expect(getTrailerUrlsFromMovieId(movieId)).to.eventually.have.length(3);
  })
});

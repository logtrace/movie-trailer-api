import chai, {expect} from 'chai';
import promised from 'chai-as-promised';
import nock from 'nock';

import testConfig from './testConfig';
import {viaplayJson, viaplay404Json} from './fixtures';

import {getMovieContentFromResource, getMovieIdFromResource} from '../api/movieContentConroller';

chai.use(promised);

describe('Get content from ViaPlay', () => {
  const {url, path, invalidPath} = testConfig.viaplay;

  it('should return a valid JSON response with correct api invocation', async () => {
    nock(`${url}`).get(path).reply(200, viaplayJson);

    const value = getMovieContentFromResource(`${url}${path}`)
      .then(response => response._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id);

      return expect(value).eventually.to.equal('tt2543164');
  });

  it('should return status 404 with error JSON when the resource id is invalid', async () => {
    nock(`${url}`).get(invalidPath).reply(404, viaplay404Json);

    const err = getMovieContentFromResource(`${url}${invalidPath}`)
      .catch(error => error);

    return expect(err).eventually.to.become({status: 404, message: 'Request failed with status code 404'});
  });

  it('should return movie id from the content with the correct resource link', async () => {
    nock(`${url}`).get(path).reply(200, viaplayJson);

    expect(getMovieIdFromResource(`${url}${path}`)).to.eventually.equal('tt2543164');
  });
});

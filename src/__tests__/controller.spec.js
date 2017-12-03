import Promise from 'bluebird';
import chai, {expect} from 'chai';
import promised from 'chai-as-promised';
import nock from 'nock';

import testConfig from './testConfig';
import {viaplayJson, viaplay404Json} from './fixtures';

import {getMovieContentFromResource} from '../api/movieContentConroller';

chai.use(promised);

describe('Get content from ViaPlay', () => {
  const {url, path, invalidPath} = testConfig.viaplay;

  nock(`${url}`).get(path).reply(200, viaplayJson);
  nock(`${url}`).get(invalidPath).reply(404, viaplay404Json);

  it('should return a valid JSON response with correct api invocation', () => {
    getMovieContentFromResource(`${url}${path}`)
      .then(response => {
        expect(typeof response).to.equal('object');

        expect(typeof response._embedded).to.equal('object');

        const viaplayBlock0 =  response._embedded['viaplay:blocks'][0];
        const viaplayProductContent = viaplayBlock0._embedded['viaplay:product'].content;

        expect(typeof viaplayBlock0).to.equal('object');
        expect(typeof viaplayBlock0._embedded).to.equal('object');
        expect(typeof viaplayProductContent).to.equal('object');
        expect(typeof viaplayProductContent.imdb).to.equal('object');
        expect(viaplayProductContent.imdb.id).to.equal('tt2543164');
      });
  });

  it('should return status 404 with error JSON when the resource id is invalid', () => {
    getMovieContentFromResource(`${url}${invalidPath}`)
      .catch(error => {
        expect(typeof error).eventually.to.equal('object');

        expect(error.status).eventually.to.equal(404);
        expect(error.message).eventually.to.equal('Request failed with status code 404');
      });
  });
});

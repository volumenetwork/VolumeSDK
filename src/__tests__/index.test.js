import clients from 'restify-clients';
import VolumeSDK from '../index';

jest.mock('restify-clients');

/* global test, expect, jest */

test('Authentication Method', (done) => {
  const vsdk = new VolumeSDK({
    url: 'https://foo.bar/',
  });

  clients.createJsonClient.mockImplementation(() => ({
    get: (url, data, cb) => {
      cb(null, { foo: 'bar' });
    },
    post: (url, data, cb) => {
      cb(null, { foo: 'bar' });
    },
  }));

  const email = 'foo@bin.baz';
  const password = 'bar';

  vsdk.authenticate(email, password)
    .then((result) => {
      expect(vsdk.get).toHaveBeenCalled();

      done();
    });
});
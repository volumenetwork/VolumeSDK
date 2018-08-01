import clients from 'restify-clients';
import lodashReject from 'lodash/reject';
import reduce from 'lodash/reduce';
import isNull from 'lodash/isNull';

const defaultLogger = () => {};

/**
 * Method to check that the url given is the baseurl only. I.e. will return true for "http://google.com"
 * but false for "http://google.com/foo/bar"
 *
 * @method isBaseUrlOnly
 *
 * @param {string} baseUrl
 *
 * @return {boolean}
 *
 * @private
 */
function isBaseUrlOnly(baseUrl) {
  const urlWithoutProtocol = baseUrl.replace(/.*?:\/\//g, '');
  let splt = urlWithoutProtocol.split('/');

  splt = lodashReject(splt, item => item === '');

  return splt.length === 1;
}

/**
 * Check that the url has the required subdirectory on it. i.e. if baseurl is "http://google.com and url for the api"
 * is "http://google.com/foo/bar/", this returns "/foo/bar/"
 *
 * @method getRequiredSubDir
 *
 * @param {string} baseUrl
 *
 * @return {string}
 *
 * @private
 */
function getRequiredSubDir(baseUrl) {
  const urlWithoutProtocol = baseUrl.replace(/.*?:\/\//g, '');
  const splt = urlWithoutProtocol.split('/');

  splt.shift();

  return `/${splt.join('/')}`;
}

/**
 * Check that the url has the required subdirectory on it. i.e. if baseurl is http://google.com and url for the api
 * is http://google.com/foo/bar/, this returns true if the url starts with /foo/bar/
 *
 * Reason that this is required, is because restify strips it out of the baseurl and rewrites aren't
 *  in place on the production server. It is what it is!
 *
 * @method hasRequiredSubDir
 *
 * @param {String} url
 * @param {String} baseUrl
 *
 * @return {boolean}
 *
 * @private
 */
function hasRequiredSubDir(url, baseUrl) {
  return (url.substring(0, getRequiredSubDir(baseUrl).length) === getRequiredSubDir(baseUrl));
}

/**
 * this turns an object or array into a query string
 *
 * @method toQueryString
 *
 * @param {Object|Array} obj
 *
 * @return {string}
 *
 * @private
 */
function toQueryString(obj) {
  return reduce(obj, (result, value, key) => {
    result.push(`${key}=${value}`);
    return result;
  }, []).join('&');
}

/**
 * Method that indicates if a response has an authentication error
 *
 * @method isUnauthenticated
 *
 * @param {Object} res
 *
 * @return {boolean}
 *
 * @private
 */
function isUnauthenticated(res) {
  const unauthenticatedHttpCodes = [401, 403];

  return (res.statusCode && unauthenticatedHttpCodes.indexOf(res.statusCode) > -1);
}

/**
 * @class VolumeSDK
 */
export default class VolumeSDK {
  constructor(opts) {
    this.apiKey = null;
    this.baseUrl = opts.url;
    this.client = clients.createJsonClient({
      url: this.baseUrl,
      followRedirects: true,
      version: '*',
      requestTimeout: opts.requestTimeout || 10000,
      connectTimeout: opts.connectTimeout || 10000,
    });

    this.log = opts.log || defaultLogger;
  }

  /**
   * Setter for API Key
   *
   * @param apikey
   *
   * @returns {VolumeSDK}
   */
  setApiKey(apikey) {
    this.apiKey = apikey;

    return this;
  }

  /**
   * Method that does the api call to the API to login and get the apiKey
   *
   * @method authenticate
   *
   * @return {Promise}
   *
   * @public
   *
   * @async
   */
  authenticate(email, password) {
    return new Promise((resolve, reject) => {
      this.client.post(`${this.baseUrl}/login`, {
        email,
        password,
      }, (err, req, res, obj) => {
        if (err) {
          return reject(err);
        }

        this.apiKey = obj.result.token;
        return resolve(obj.result);
      });
    });
  }


  /**
   *
   * @method call
   *
   * @param {string} httpMethod
   * @param {string} url
   * @param {object} data
   *
   * @return {Promise}
   */
  call(httpMethod, url, data) {
    const method = httpMethod.toLowerCase();
    const formattedUrl = this.formatUrl(url, method === 'get' ? data : {});

    return new Promise((resolve, reject) => {
      const cb = (err, req, res, obj) => {
        if (!res) {
          return reject(new Error('No response! it is likely that there is no connection to cms!'));
        }

        if (isUnauthenticated(res)) {
          return reject(new Error('Not Authenticated'));
        }

        return resolve(obj || {});
      };

      this.log(`${method}:${formattedUrl}`);
      if (method === 'get') {
        return this.client.get(formattedUrl, cb);
      }

      return this.client[method](formattedUrl, data, cb);
    });
  }

  /**
   *
   * @method get
   *
   * @param {String} url
   * @param {Object} args
   *
   * @return {*}
   */
  get(url, args) {
    return this.call('get', url, args);
  }

  /**
   * Method to make a post call (includes auth)
   *
   * @method post
   *
   * @param {String} url
   * @param {Object} data
   *
   * @return {Promise}
   */
  post(url, data) {
    return this.call('post', url, data);
  }

  /**
   * Method to make a put call (includes auth)
   *
   * @method put
   *
   * @param {String} url
   * @param {Object} data
   *
   * @return {Promise}
   */
  put(url, data) {
    return this.call('put', url, data);
  }


  /**
   * @method addApiKeyToArgs
   *
   * @param {object|array} args
   *
   * @return {object|array}
   *
   * @public
   */
  addApiKeyToArgs(args) {
    const a = args || {};

    if (!isNull(this.apiKey)) {
      a.apikey = this.apiKey;
    }

    return a;
  }

  /**
   * Method to format the url so that it contains the apiKey on the end if required
   *
   * @method formatUrl
   *
   * @param {String} url
   * @param {Object} args
   *
   * @return {String}
   *
   * @public
   */
  formatUrl(url, args) {
    const a = this.addApiKeyToArgs(args);
    let myUrl = url;

    if (!isBaseUrlOnly(this.baseUrl) && !hasRequiredSubDir(url, this.baseUrl)) {
      myUrl = getRequiredSubDir(this.baseUrl) + url;
    }

    return `${myUrl.split('?').shift()}?${toQueryString(a)}`;
  }

  fetchChannels() {
    return this.get('/UHDPro/channel', {});
  }
}

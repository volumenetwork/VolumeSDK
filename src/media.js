import {
  GET_MEDIA,
} from './urls';
import VolumeSDK from './index';

export default class Media extends VolumeSDK {
  /**
   *
   * @returns {*}
   */
  fetchAll() {
    return this.get(GET_MEDIA)
      .then(response => response.result);
  }
}

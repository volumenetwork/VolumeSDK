import {
  GET_CHANNELS,
} from './urls';
import VolumeSDK from './index';

export default class Channel extends VolumeSDK {
  /**
   *
   * @returns {*}
   */
  fetchAll() {
    return this.get(GET_CHANNELS);
  }
}

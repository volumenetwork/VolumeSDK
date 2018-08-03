import { addParams } from './helpers/url';
import {
  GET_STORYBOARDS,
  GET_STORYBOARD,
  ADD_STORYBOARD,
  EDIT_STORYBOARD,
} from './urls';
import VolumeSDK from './index';

export default class Storyboard extends VolumeSDK {
  /**
   *
   * @param {Object} opts
   * @param {Number} [opts.id] (If none is set, will assume new storyboard)
   * @param {Object} opts.storyboard
   * @returns {Promise}
   */
  save(opts) {
    const body = {
      data: opts.storyboard,
    };

    if (opts.id) {
      return this.put(
        addParams(EDIT_STORYBOARD, { id: opts.id }),
        body,
      );
    }

    return this.post(ADD_STORYBOARD, body);
  }

  /**
   *
   * @returns {*}
   */
  fetchAll() {
    return this.get(GET_STORYBOARDS);
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  fetch(id) {
    return this.get(addParams(GET_STORYBOARD, { id }));
  }
}

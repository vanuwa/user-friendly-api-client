/**
 * Created by vanuwa on 8/15/16.
 */

class Model {
  constructor(options) {
    this._applyDefaults();

    if (options) {
      Object.assign(this, options);
    }
  }

  /**
   * Default model definition
   * @returns {Object} default values
   * */
  _defaultModel () {
    return {};
  }

  /**
   * Init with default model
   * @returns {object} this
   * */
  _applyDefaults () {
    Object.assign(this, this._defaultModel());

    return this;
  }

  /**
   * JSON representation of instance (this) based on _defaultModel
   * @returns {object} json object
   * */
  toJSON () {
    const json = {};

    Object.getOwnPropertyNames(this._defaultModel()).forEach((name) => {
      json[name] = this[name];
    });

    return json;
  }

  extractModel (obj) {
    const model = {};

    Object.getOwnPropertyNames(this._defaultModel()).forEach((name) => {
      if (obj[name]) {
        model[name] = obj[name];
      }
    });

    return model;
  }
}

module.exports = Model;

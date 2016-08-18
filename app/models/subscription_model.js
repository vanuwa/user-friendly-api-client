/**
 * Created by vanuwa on 8/15/16.
 */

const config = require('config').api;
const ApplicationModel = require('./application_model');
const request = require('request');

const api_url = `${config.protocol}://${config.host}:${config.port}`;

class SubscriptionModel extends ApplicationModel {

  _defaultModel () {
    return {
      event_types: [],
      target_url: ''     /* POST to that url when events occurs */
    };
  }

  save () {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  remove () {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  static remove (id) {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  static create (obj) {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  static get (id) {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  static all () {
    return new Promise((resolve) => {
      request({
        method: 'GET',
        uri: `${api_url}/subscriptions`
      }, (error, response, body) => {

        /* console.log('Error', error); */

        const json = JSON.parse(body);
        const extracted_docs = SubscriptionModel.extractDocs(json.subscriptions);

        resolve(extracted_docs);
      });
    });
  }

  static extractDocs (collection) {
    return collection.filter((item) => item._id.indexOf('_design') < 0);
  }
}

module.exports = SubscriptionModel;

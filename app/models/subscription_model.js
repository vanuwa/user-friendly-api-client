/**
 * Created by vanuwa on 8/15/16.
 */

const config = require('config').api;
const ApplicationModel = require('./application_model');
const request = require('request');
const util = require('util');

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
      const options = {
        method: 'POST',
        uri: `${api_url}/subscriptions`,
        json: true,
        body: {
          subscription: this.toJSON()
        }
      };

      request(options, (error, response, body) => {
        console.log(`[ user-friendly-api-client ][ Subscription::save ][ ERROR ] ${util.inspect(error)}\r\n`);
        console.log(`[ user-friendly-api-client ][ Subscription::save ][ RESPONSE ] ${util.inspect(response)}\r\n`);
        console.log(`[ user-friendly-api-client ][ Subscription::save ][ RESPONSE ] ${util.inspect(body)}\r\n`);

        resolve(body);
      });
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

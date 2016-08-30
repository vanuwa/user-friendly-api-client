/**
 * Created by vanuwa on 8/15/16.
 */

const config = require('config').api;
const ApplicationModel = require('./application_model');
const request = require('request');
const util = require('util');
const auth_token = 'Bearer Dh12WipmTDZCXrk5wTuSRPzCYUoUcmXY';

const api_url = `${config.protocol}://${config.host}:${config.port}`;

class SubscriptionModel extends ApplicationModel {

  _defaultModel () {
    return {
      created_by: {},
      organization_id: null,
      event_types: [],
      target_url: ''     /* POST to that url when events occurs */
    };
  }

  save () {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        uri: `${api_url}/subscriptions`,
        json: true,
        headers: {
          authorization: auth_token
        },
        body: {
          subscription: this.toJSON()
        }
      };

      request(options, (error, response, body) => {
        console.log(`[ user-friendly-api-client ][ Subscription::save ][ ERROR ] ${util.inspect(error)}\r\n`);
        console.log(`[ user-friendly-api-client ][ Subscription::save ][ RESPONSE ] ${util.inspect(response)}\r\n`);
        console.log(`[ user-friendly-api-client ][ Subscription::save ][ RESPONSE ] ${util.inspect(body)}\r\n`);

        if (response && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error || body);
        }
      });
    });
  }

  remove () {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  static remove (id) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'DELETE',
        uri: `${api_url}/subscriptions/${id}`,
        json: true,
        headers: {
          authorization: auth_token
        }
      };

      console.log(`[ DELETE ] ${options.uri}`);

      request(options, (error, response, body) => {
        console.log(`[ remove ][ Status Code ] ${response && response.statusCode}\r\n`);
        console.log(`[ remove ][ ERROR ] ${util.inspect(error)}\r\n`);
        console.log(`[ remove ][ BODY ] ${util.inspect(body)}\r\n`);

        if (response && response.statusCode === 200) {
          resolve(body);
        } else {
          reject(error || body);
        }
      });
    });
  }

  static create (obj) {
    return new Promise((resolve) => {
      resolve({});
    });
  }

  static get (id) {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        uri: `${api_url}/subscriptions/${id}`,
        json: true,
        headers: {
          authorization: auth_token
        }
      };

      request(options, (error, response, body) => {
        console.log(`[ get ][ ERROR ] ${util.inspect(error)}\r\n`);
        console.log(`[ get ][ BODY ] ${util.inspect(body)}\r\n`);

        if (response && response.statusCode === 200) {
          resolve(body.subscription);
        } else {
          reject(error || body);
        }
      });
    });
  }

  static all () {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        uri: `${api_url}/subscriptions`,
        json: true,
        headers: {
          authorization: auth_token
        }
      };

      request(options, (error, response, body) => {
        console.log(`[ all ][ ERROR ] ${util.inspect(error)}\r\n`);
        console.log(`[ all ][ BODY ] ${util.inspect(body)}\r\n`);

        if (response && response.statusCode === 200) {
          const extracted_docs = SubscriptionModel.extractDocs(body.subscriptions);

          resolve(extracted_docs);
        } else {
          reject(error || body);
        }
      });
    });
  }

  static extractDocs (collection) {
    return collection.filter((item) => item._id.indexOf('_design') < 0);
  }
}

module.exports = SubscriptionModel;

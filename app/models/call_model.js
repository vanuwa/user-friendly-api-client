/**
 * Created by ikebal on 29.08.16.
 */
const config = require('config').api;
const ApplicationModel = require('./application_model');
const request = require('request');
const util = require('util');
const auth_token = 'Bearer CUSkhgf7Mxlj1rmqk5kpwy0O2mNEls14';

const api_url = `${config.protocol}://${config.host}:${config.port}`;

class CallModel extends ApplicationModel {
  _defaultModel () {
    return {
      organization_id: null,
      from: {
        key: '',
        value: ''
      },
      to: {
        key: '',
        value: ''
      }
    };
  }

  static create (document) {
    return new Promise((resolve, reject) => {
      const uri = `${api_url}/calls`;
      const options = {
        method: 'POST',
        uri,
        json: true,
        body: {
          call: document
        },
        headers: {
          authorization: auth_token
        }
      };

      console.log(`[ POST ] ${options.uri}`);

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
}

module.exports = CallModel;

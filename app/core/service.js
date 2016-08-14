/**
 * Created by vanuwa on 8/14/16.
 */
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');
const Vision = require('vision');
const pug = require('pug');

class Service {
  constructor (options) {
    this._server = new Hapi.Server({
      connections: {
        routes: {
          files: {
            relativeTo: Path.join(__dirname, './')
          }
        }
      }
    });

    this.log = this._server.log.bind(this._server);
    this.configured = this._configure(options);
  }

  /*
   * Configure current instance
   * */
  _configure (options) {
    const server = this._server;

    return new Promise((resolve, reject) => {
      server.connection({
        host: options.host,
        port: options.port
      });

      if (options.routes) {
        server.route(options.routes);
      } else {
        server.route([{
          method: 'GET',
          path: '/',
          handler: (request, reply) => {
            reply.view('index');
          }
        }]);
      }

      server.register([
        Inert, Vision, {
          register: Good,
          options: {
            reporters: {
              console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                  response: '*',
                  log: '*'
                }]
              }, {
                module: 'good-console'
              }, 'stdout']
            }
          }
        }
      ]).then(() => {
        server.views({
          engines: {
            pug
          },
          defaultExtension: 'pug',
          relativeTo: Path.join(__dirname, '../'),
          path: 'views'
        });

        resolve(true);
      }, (error) => {
        reject(error);
      }).catch((exception) => {
        reject(exception);
      });
    });
  }

  get server () {
    return this._server;
  }

  /*
   * Start service
   * */
  start () {
    return this._server.start();
  }

  /*
   * Stop service
   * */
  stop () {
    return this._server.stop();
  }
}

module.exports = Service;

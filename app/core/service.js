/**
 * Created by vanuwa on 8/14/16.
 */
const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Good = require('good');
const Vision = require('vision');

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

    server.connection({
      host: options.host,
      port: options.port
    });

    if (options.routes) {
      server.route(options.routes);
    }

    return server.register([
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
    ]);
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

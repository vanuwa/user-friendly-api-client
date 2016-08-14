/**
 * Created by vanuwa on 8/14/16.
 */
const config = require('config');
const Service = require('./app/service');
const util = require('util');

const options = {
  host: config.service.host,
  port: config.service.port,
  is_view_cached: config.template_engine.is_cached
};
const service = new Service(options);

service.configured.then(configured, failed).catch((exception) => {
  throw exception;
});

function configured () {
  service.start().then(() => {
    const server = service.server;

    server.log('info', `[ ${config.service.name} ] Configuration is\n${util.inspect(options)}`);
    server.log('info', `[ ${config.service.name} ] Server running at ${server.info.uri}`);
  }, failed).catch(failed);
}

function failed (error) {
  throw error;
}

/**
 * Created by vanuwa on 8/16/16.
 */
const util = require('util');

class EventsController {
  create (request, reply) {
    if (request.payload && request.payload.event) {
      console.log(`[ user-friendly-api-client ] Event is\r\n${util.inspect(request.payload.event)}\r\n\r\n`);
      reply({ 'ok': true }).code(200);
    } else {
      reply({ msg: 'Bad request payload', code: 400 }).code(400);
    }
  }
}

module.exports = EventsController;

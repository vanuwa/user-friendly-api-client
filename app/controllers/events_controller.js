/**
 * Created by vanuwa on 8/16/16.
 */
class EventsController {
  create (request, reply) {
    if (request.payload && request.payload.event) {
      console.log(`[ EventsController ][ POST /events ] payload is ${request.payload.event}`);
      reply({ 'ok': true }).code(200);
    } else {
      reply({ msg: 'Bad request payload', code: 400 }).code(400);
    }
  }
}

module.exports = EventsController;

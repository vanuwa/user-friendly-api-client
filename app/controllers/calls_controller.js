/**
 * Created by ikebal on 29.08.16.
 */

class CallsController {
  index (request, reply) {
    reply.view('calls/index', { calls: [] }).code(200);
  }

  new (request, reply) {
    const call = {
      from: {
        key: '',
        value: ''
      },
      to: {
        key: '',
        value: ''
      }
    };

    return reply.view('calls/new', { call }).code(200);
  }

  create (request, reply) {
    reply('create a call').code(200);
  }
}

module.exports = CallsController;

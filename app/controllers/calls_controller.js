/**
 * Created by ikebal on 29.08.16.
 */
const util = require('util');
const Call = require('../models/call_model');
const Boom = require('boom');

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
    if (request.payload) {
      const call = buildCallModel(request.payload);
      console.log(`[ call ][ create ] ${util.inspect(call)}`);

      Call.create(call).then(() => reply.redirect('/calls'), (error) => reply(Boom.badImplementation(error)))
        .catch((error) => reply(Boom.badImplementation(error)));
    } else {
      reply(Boom.badRequest('Bad payload'));
    }

    reply('create a call').code(200);
  }
}

function buildCallModel (payload) {
  return {
    from: {
      key: payload.call_from_key,
      value: payload.call_from_value
    },
    to: {
      key: payload.call_to_key,
      value: payload.call_to_value
    }
  };
}

module.exports = CallsController;

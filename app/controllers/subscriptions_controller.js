/**
 * Created by ikebal on 15.08.16.
 */
const Subscription = require('../models/subscription_model');

class SubscriptionsController {
  index (request, reply) {
    Subscription.all().then((subscriptions) => {
      reply.view('subscriptions/index', { subscriptions }).code(200);
    });
  }

  show (request, reply) {
    const subscription = {
      _id: '22651433750a3aad708d6e2afe8fe1c5',
      _rev: '2-e3f76d012077787c8b3f963ea3022282',
      event_types: [
        'ringing',
        'answered'
      ],
      target_url: 'http://localhost:3000/events'
    };

    if (request.params.id) {
      subscription._id = request.params.id;

      reply.view('subscriptions/show', { subscription }).code(200);
    } else {
      reply({ msg: 'Bad request params', code: 400 }).code(400);
    }
  }

  new (request, reply) {
    const subscription = {
      event_types: [],
      target_url: ''
    };

    return reply.view('subscriptions/new', { subscription }).code(200);
  }

  create (request, reply) {
    const properties = request.payload;

    properties.event_types = [properties.event_types];

    const subscription = new Subscription(properties);

    subscription.save().then(() => reply.redirect('/subscriptions')).catch((exception) => {
      reply.view('subscriptions/new', { subscription: subscription.toJSON(), errors: { exception } });
    });
  }
}

module.exports = SubscriptionsController;

/**
 * Created by ikebal on 15.08.16.
 */
const Subscription = require('../models/subscription_model');

class SubscriptionsController {
  index (request, reply) {
    Subscription.all().then((subscriptions) => {
      reply.view('subscriptions/index', { subscriptions }).code(200);
    }, (error) => reply({ subscriptions: null, error: { msg: error } }).code(500));
  }

  show (request, reply) {
    if (request.params.id) {
      Subscription.get(request.params.id).then((subscription) => {
        reply.view('subscriptions/show', { subscription }).code(200);
      }, (error) => reply({ subscriptions: null, error: { msg: error } }).code(500)).catch((exception) => {
        reply.view('subscriptions/show', { subscription: null, error: exception }).code(500);
      });
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

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

  destroy (request, reply) {
    if (request.params.id) {
      Subscription.remove(request.params.id).then(() => {
        reply.redirect('/subscriptions');
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
    const event_types = [
      'start', 'trying', 'ringing', 'answered', 'hangup', 'hold', 'resume', 'transfer'
    ];

    return reply.view('subscriptions/new', { subscription, event_types }).code(200);
  }

  create (request, reply) {
    const subscription = new Subscription(request.payload);

    subscription.save().then(() => reply.redirect('/subscriptions')).catch((exception) => {
      reply.view('subscriptions/new', { subscription: subscription.toJSON(), errors: { exception } });
    });
  }
}

module.exports = SubscriptionsController;

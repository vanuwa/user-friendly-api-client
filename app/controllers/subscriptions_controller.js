/**
 * Created by ikebal on 15.08.16.
 */
class SubscriptionsController {
  index (request, reply) {
    const subscriptions = [];

    return reply.view('subscriptions/index', { subscriptions }).code(200);
  }

  show (request, reply) {
    const subscription = {};

    if (request.params.id) {
      subscription._id = request.params.id;

      return reply.view('subscriptions/show', { subscription }).code(200);
    } else {
      reply({ msg: 'Bad request params', code: 400 }).code(400);
    }
  }
}

module.exports = SubscriptionsController;

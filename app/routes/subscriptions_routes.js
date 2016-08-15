/**
 * Created by ikebal on 15.08.16.
 */
const Controller = require('../controllers/subscriptions_controller');
const controller = new Controller();

module.exports = [{
  method: 'GET',
  path: '/subscriptions',
  handler: controller.index
}, {
  method: 'GET',
  path: '/subscriptions/{id}',
  handler: controller.show
}];

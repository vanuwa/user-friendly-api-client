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
  method: 'POST',
  path: '/subscriptions/{id}/destroy',
  handler: controller.destroy
}, {
  method: 'GET',
  path: '/subscriptions/{id}',
  handler: controller.show
}, {
  method: 'GET',
  path: '/subscriptions/new',
  handler: controller.new
}, {
  method: 'POST',
  path: '/subscriptions/create',
  handler: controller.create
}];

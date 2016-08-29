/**
 * Created by ikebal on 29.08.16.
 */
const Controller = require('../controllers/calls_controller');
const controller = new Controller();

module.exports = [{
  method: 'GET',
  path: '/calls',
  handler: controller.index
}, {
  method: 'GET',
  path: '/calls/new',
  handler: controller.new
}, {
  method: 'POST',
  path: '/calls/create',
  handler: controller.create
}];

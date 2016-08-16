/**
 * Created by vanuwa on 8/16/16.
 */
const Controller = require('../controllers/events_controller');
const controller = new Controller();

module.exports = [{
  method: 'POST',
  path: '/events',
  handler: controller.create
}];

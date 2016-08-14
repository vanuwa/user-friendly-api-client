/**
 * Created by vanuwa on 8/14/16.
 */
const Controller = require('../controllers/application_controller');

module.exports = [{

  /* method: '*',
   path: '{/p*}',
   handler: Controller.notFound
   }, {*/
  method: 'GET',
  path: '/',
  handler: Controller.index
}, {
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: '.'
    }
  }
}];

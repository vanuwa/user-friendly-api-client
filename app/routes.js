/**
 * Created by vanuwa on 8/14/16.
 */
let routes = require('./routes/application_routes');

routes = routes.concat(require('./routes/subscriptions_routes'));

module.exports = routes;

/**
 * Created by vanuwa on 8/14/16.
 */
class ApplicationController {
  static index (request, reply) {
    return reply.view('index').code(200);
  }

/*  static example (request, reply) {
    return reply(`Example: Hello, ${encodeURIComponent(request.params.name)}!`);
  }

  static notFound (request, reply) {
    return reply({
      status_code: 404,
      error: 'Not Found'
    }).code(404);
  }*/
}

module.exports = ApplicationController;

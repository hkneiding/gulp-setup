var url = require('url');
var fs = require('fs');

function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
  handleRequest: function(request, response) {

      /*if (request.url == '/main.css') {
        var path = url.parse(request.url).pathname;

        console.log(request.url)
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.renderHTML(path, response);
        //response.end();
      } else {*/
    response.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            renderHTML('./html/index.html', response);
            break;
        case '/login':
            renderHTML('./html/login.html', response);
            break;
        default:
            response.writeHead(404);
            response.write('Route not defined');
            response.end();
        }
  }
};
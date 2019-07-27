const fs = require('fs');
const RequestHandler = require('./helpers/RequestHandler');
const controllers = [];
fs.readdirSync('api/controllers').forEach(file => {
    controllers.push(file.split(".js")[0]);
});

module.exports = function router(request, response) {
    if (request.url === '/') {
        let page = fs.readFileSync('api/views/index.html');
        response.writeHeader(200, {'Content-Type':'text/html'});
        response.write(page);
        response.end();
    } else {
        if (request.url.split('/')[1] === 'Api') {
            let controllerRequest = request.url.split('/')[2]; // es el indice 2 debido a que los links estan definidos como http://ip:puerto/api/CONTROLADOR/action
            if (controllers.includes(controllerRequest)) {
                let controller = require(`./api/controllers/${controllerRequest}`);
                controller.resolve(request, response);
            } else {
                response.writeHeader(405, {'Content-Type':'application/json'});
                response.end(JSON.stringify({'status':'405', 'message': 'Metodo no permitido'}));
            } 
        } else {
            response.writeHeader(404, {'Content-Type':'application/json'});
            response.end(JSON.stringify({'status':'404', 'message': 'No se encontro el recurso'}));
        }
    }
}
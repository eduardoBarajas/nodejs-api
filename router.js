const fs = require('fs');
const RequestHandler = require('./helpers/RequestHandler');
// se declara una lista de controladores donde se almacenaran todos los que se encuentren en la carpeta de api/controllers.
const controllers = [];
// se lee en el directorio de controllers todos los archivos js.
fs.readdirSync('api/controllers').forEach(file => {
    controllers.push(file.split(".js")[0]);
});

module.exports = function router(request, response) {
    // si la url de la peticion es "/" entonces se envia el recurso html para mostrar en el navegador.
    if (request.url === '/') {
        let page = fs.readFileSync('api/views/index.html');
        response.writeHeader(200, {'Content-Type':'text/html'});
        response.write(page);
        response.end();
    } else {
        // si la url tiene la palabra Api inmediatamente despues de "/" entra.
        if (request.url.split('/')[1] === 'Api') {
            let controllerRequest = request.url.split('/')[2]; // es el indice 2 debido a que los links estan definidos como http://ip:puerto/Api/CONTROLADOR/action
            // entonces se revisa si el url contiene un controlador definido dentro de la lista.
            if (controllers.includes(controllerRequest)) {
                // si existen entonces se carga el controlador y se pasa la request.
                let controller = require(`./api/controllers/${controllerRequest}`);
                controller.resolve(request, response);
            } else {
                // si no se encuentra el controlador se regresa error de metodo no permitido.
                response.writeHeader(405, {'Content-Type':'application/json'});
                response.end(JSON.stringify({'status':'405', 'message': 'Metodo no permitido'}));
            } 
        } else {
            // si no contiene la palabra Api en la posicion definida entonces se regresa un error 404.
            response.writeHeader(404, {'Content-Type':'application/json'});
            response.end(JSON.stringify({'status':'404', 'message': 'No se encontro el recurso'}));
        }
    }
}
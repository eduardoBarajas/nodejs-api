const RequestHandler = require('../../helpers/RequestHandler');
const RequestValidator = require('../../helpers/RequestValidator');
const ClientesService = require('../services/ClientesService');
const events = require('events');
// se crea un emisor de eventos para detectar cuando se termino de obtener la informacion de las peticiones.
const eventEmitter = new events.EventEmitter();

class NutriNetController {

    resolve(request, response) {
        // se define que cada vez que pase el evento se ejecute la accion del controlador.
        eventEmitter.once('RequestFinished', (req) => {
            // se imprime la info de la peticion
            console.info(req);
            // debido a que en este punto pueden pasar acciones del controlador que no estan definidas se utiliza un try para atrapar esos errores y regresar
            // un error 405 de metodo no permitido.
            try {
                this[req['action']](req, response);
            } catch(error) {
                console.log(error);
                response.writeHeader(405, {'Content-Type':'application/json'});
                response.end(JSON.stringify({'status':'405', 'message': 'Metodo no permitido'}));
            }
        });
        // se trata la la peticion para obtener los datos de esta.
        RequestHandler(request, eventEmitter);
    }

    // http://ip:port/Api/NutriNet/Cliente
    Cliente(req, response) {
        // se revisa el tipo de peticion.
        // en las peticiones POST y PUT se validan los campos, si se detecta un error se regresa un error 400 de bad request y la lista de errores que se encontraron.
        switch(req['type']) {
            case 'POST': {
                let validRequest = RequestValidator(req['body']);
                if (validRequest.success) {
                    ClientesService.add(req['body']).then( result => {
                        response.writeHeader(200, {'Content-Type':'application/json'});
                        response.end(JSON.stringify(result));
                    }).catch(error => {
                        response.writeHeader(500, {'Content-Type':'application/json'});
                        response.end(JSON.stringify({'status':'500', 'message': error}));
                    });
                } else {
                    response.writeHeader(400, {'Content-Type':'application/json'});
                    response.end(JSON.stringify({'status':'400', 'message': 'Bad Request', 'errors': validRequest.errors}));
                }
                break;
            }
            case 'PUT': {
                let validRequest = RequestValidator(req['body']);
                if (validRequest.success) {
                    ClientesService.update(req['params']['id'], req['body']).then( result => {
                        response.writeHeader(200, {'Content-Type':'text/plain'});
                        response.end(JSON.stringify(result));
                    }).catch(error => {
                        response.writeHeader(500, {'Content-Type':'application/json'});
                        response.end(JSON.stringify({'status':'500', 'message': error}));
                    });
                } else {
                    response.writeHeader(400, {'Content-Type':'application/json'});
                    response.end(JSON.stringify({'status':'400', 'message': 'Bad Request', 'errors': validRequest.errors}));
                }
                break;
            }
            case 'GET': {
                ClientesService.findAll().then(result => {
                    response.writeHeader(200, {'Content-Type':'text/plain'});
                    response.end(JSON.stringify(result));
                }).catch(error => {
                    response.writeHeader(500, {'Content-Type':'application/json'});
                    response.end(JSON.stringify({'status':'500', 'message': error}));
                });
                break;
            }
            default: throw new Error('Metodo no permitido');
        }
    }
 }

 // se exporta el controlador utilizando Object.create para que cree una instancia y pueda importarse en otras clases.
 module.exports = Object.create(new NutriNetController);
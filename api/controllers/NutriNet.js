const RequestHandler = require('../../helpers/RequestHandler');
const RequestValidator = require('../../helpers/RequestValidator');
const ClientesService = require('../services/ClientesService');
const events = require('events');
const eventEmitter = new events.EventEmitter();
class NutriNetController {

    resolve(request, response) {
        eventEmitter.once('RequestFinished', (req) => {
            console.log(req);
            try {
                this[req['action']](req, response);
            } catch(error) {
                console.log(error);
                response.writeHeader(405, {'Content-Type':'application/json'});
                response.end(JSON.stringify({'status':'405', 'message': 'Metodo no permitido'}));
            }
        });
        RequestHandler(request, eventEmitter);
    }

    Cliente(req, response) {
        switch(req['type']) {
            case 'POST': {
                let isValid = RequestValidator(req['body'], req['type']);
                console.log(isValid);
                if (isValid['valid'] !== false) {
                    ClientesService.add(req['body']).then( result => {
                        response.writeHeader(200, {'Content-Type':'application/json'});
                        response.end(JSON.stringify(result));
                    }).catch(error => {
                        response.writeHeader(500, {'Content-Type':'application/json'});
                        response.end(JSON.stringify({'status':'500', 'message': error}));
                    });
                } else {
                    isValid['valid'] = undefined;
                    response.writeHeader(400, {'Content-Type':'application/json'});
                    response.end(JSON.stringify({'status':'400', 'message': 'Bad Request', 'errors': isValid}));
                }
                break;
            }
            case 'PUT': {
                let isValid = RequestValidator(req['body'], req['type'],  req['params']);
                if (isValid['valid'] !== false) {
                    ClientesService.update(req['params']['id'], req['body']).then( result => {
                        response.writeHeader(200, {'Content-Type':'text/plain'});
                        response.end(JSON.stringify(result));
                    }).catch(error => {
                        response.writeHeader(500, {'Content-Type':'application/json'});
                        response.end(JSON.stringify({'status':'500', 'message': error}));
                    });
                } else {
                    isValid['valid'] = undefined;
                    response.writeHeader(400, {'Content-Type':'application/json'});
                    response.end(JSON.stringify({'status':'400', 'message': 'Bad Request', 'errors': isValid}));
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
 
 module.exports = Object.create(new NutriNetController);
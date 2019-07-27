module.exports = function RequestHandler(request, eventEmitter) {
    // esta funcion regresara un diccionario con los datos necesarios para ejecutar una accion de la api.
    var req = {'action': '', 'params': {}, 'body': '', 'type': ''};
    // primero se rompe el url para obtener la accion que va despues del nombre del controllador.
    let action = request.url.split('/')[3];
    if (typeof action === 'undefined' )
        action = 'home';
    // se revisa si la cadena tiene parametros.
    if (action.includes('?')) {
        req['action'] = action.split('?')[0];
        action.split('?')[1].split('&').forEach( param => {
            req['params'].push(param);
        });
    } else {
        req['action'] = action;
    }
    // se obtiene el tipo de metodo que se utilizo en la peticion.
    req['type'] = request.method;
    if (request.method === 'POST' || request.method === 'PUT') {
        if (request.url.split('/')[4] != null) {
            req['params']['id'] = request.url.split('/')[4];
        }
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            // llegado aqui se tiene todo el contenido del body y 
            // se procede a concaternarlo en una cadena.
            req['body'] = JSON.parse(Buffer.concat(body).toString());
            eventEmitter.emit('RequestFinished', req);
        });
    } else {
        eventEmitter.emit('RequestFinished', req);
    }
}


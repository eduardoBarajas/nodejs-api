module.exports = function RequestHandler(request, eventEmitter) {
    // esta funcion regresara un diccionario con los datos necesarios para ejecutar una accion de la api.
    var req = {'action': '', 'params': {}, 'body': '', 'type': ''};
    // primero se rompe el url para obtener la accion que va despues del nombre del controllador. ej. NutriNet/"Cliente"
    let action = request.url.split('/')[3];
    // si la accion es indefinida es  es por que es la raiz del controlador.
    if (typeof action === 'undefined' )
        action = 'home';
    // se revisa si la cadena tiene parametros.
    if (action.includes('?')) {
        // si se tienen entonces se obtiene toda la cadena restante.
        req['action'] = action.split('?')[0];
        // en la parte de la cadena con los parametros se busca el separador "&" y si hay se almacenan en el diccionario de la peticion.
        action.split('?')[1].split('&').forEach( param => {
            req['params'].push(param);
        });
    } else {
        // si no incluye parametros solo se agrega la accion.
        req['action'] = action;
    }
    // se obtiene el tipo de metodo que se utilizo en la peticion.
    req['type'] = request.method;
    if (request.method === 'POST' || request.method === 'PUT') {
        // si la url de la peticion tiene un cuarto parametro se entiende que es el id NutriNet/Cliente/"ID"
        if (request.url.split('/')[4] != null) {
            // se almacena en el diccionario
            req['params']['id'] = request.url.split('/')[4];
        }
        // a continuacion se lee el contenido del body en la peticion
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


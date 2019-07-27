const RequestHandler = require('../../helpers/RequestHandler');
const events = require('events');
const eventEmitter = new events.EventEmitter();
class ClientsController {
   resolve(request, response) {
		RequestHandler(request, eventEmitter);
		eventEmitter.once('RequestFinished', (req) => {
			try {
					this[req['action']](req, response);
			} catch(error) {
					response.writeHeader(405, {'Content-Type':'text/plain'});
					response.end('405: Metodo no permitido');
			}
		});
	}
	
	home() {
		console.log('let me go homeeee');
	}
}

module.exports = Object.create(new ClientsController);
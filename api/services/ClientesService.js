const ClienteModel = require('../models/ClienteModel');
class ClientesService {
    async add(cliente) {
        return new ClienteModel(cliente).save();
    }
    async findAll() {
        return ClienteModel.find();
    }
    async update(id, cliente) {
        return ClienteModel.findByIdAndUpdate(id, cliente);
    }
    delete() {
        throw new Error('No Implementado');
    }
}

module.exports = Object.create(new ClientesService);
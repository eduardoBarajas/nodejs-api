const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    Nombre: String,
    Apellidos: String,
    Nombre_Usuario: String,
    Correo_Electronico: String,
    Contrasena: String,
    Edad: Number,
    Estatura: Number,
    Peso: Number,
    GEB: Number
});

module.exports = mongoose.model('clientes', ClienteSchema);
const Http = require('http');
const router = require('./router');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// se carga el lector de archivos env.
dotenv.config();
// se construye el URI para la conexion a la db y se trata de conectar.
var mongo_uri = `mongodb+srv://${process.env.DB_USER}:`+encodeURIComponent(process.env.DB_PASS)+process.env.DB;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
// se define el puerto que se utilizara para la conexion.
const PORT = process.env.PORT || 8091;
// se crea el servidor, como metodo callback se uso la funcion de router definida que se encargara de manejar las peticiones.
Http.createServer(router).listen(PORT, (err, success ) => {
    console.log(`Conexion iniciada en el puerto: ${PORT}`);
});



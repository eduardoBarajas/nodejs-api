const PORT = 8091;
const IP = '192.168.0.1';
const Http = require('http');
const router = require('./router');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// env file reader init
dotenv.config();
var mongo_uri = `mongodb+srv://${process.env.DB_USER}:`+encodeURIComponent(process.env.DB_PASS)+process.env.DB;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
Http.createServer(router).listen(8091, (err, success ) => {
    console.log(`Conexion iniciada en el puerto: ${PORT} y el ip: ${IP}`);
});


const Http = require('http');
const router = require('./router');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// env file reader init
dotenv.config();
var mongo_uri = `mongodb+srv://${process.env.DB_USER}:`+encodeURIComponent(process.env.DB_PASS)+process.env.DB;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});
const PORT = process.env.PORT || 8091;
Http.createServer(router).listen(PORT, (err, success ) => {
    console.log(`Conexion iniciada en el puerto: ${PORT}`);
});



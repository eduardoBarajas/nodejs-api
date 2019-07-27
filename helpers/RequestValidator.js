const mongodb = require("mongodb");

module.exports = function RequestValidator(body, method, params) {
    let isValid = {};
    if (!validate(body['Nombre'], 0, 50, false)) {
        isValid['Nombre'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Apellidos'], 0, 50, false)) {
        isValid['Apellidos'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Nombre_Usuario'], 0, 50, false)) {
        isValid['Nombre_Usuario'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Correo_Electronico'], 0, 50, false)) {
        isValid['Correo_Electronico'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Contrasena'], 0, 50, false)) {
        isValid['Contrasena'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Edad'], 0, 120, true)) { 
        isValid['Edad'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Peso'], 0, 500, true)) {
        isValid['Peso'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['Estatura'], 0, 3, true)) {
        isValid['Estatura'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (!validate(body['GEB'], 0, 10000, true)) {
        isValid['GEB'] = 'Invalido';
        isValid['valid'] = false;
    }
    if (method === 'PUT')
        if (!mongodb.ObjectID.isValid(params['id'])) {
            isValid['id'] = 'Invalido';
            isValid['valid'] = false;
        }
    return isValid;

}

function validate(data, limInferior, limSuperior, isNum) {
    if (!isNum) {
        if (data == null || data.length <= limInferior || data.length >= limSuperior || !isNaN(data))
            return false;
    } else {
        if (data == null || data <= limInferior || data >= limSuperior || isNaN(data))
            return false;
    }
    return true;
}
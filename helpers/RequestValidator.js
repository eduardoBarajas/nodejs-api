module.exports = function RequestValidator(body) {
    // se crea un diccionario y cada que se encuentra un error se adjunta.
    let result = {};
    if (!validate(body['Nombre'], 2, 50, false))
        result['Nombre'] = 'Ingresa un nombre valido con al menos 2 letras y maximo 50.';
    if (!validate(body['Apellidos'], 2, 50, false))
        result['Apellidos'] = 'Ingresa un apellido valido con al menos 2 letras y maximo 50.';
    if (!validate(body['Nombre_Usuario'], 2, 50, false))
        result['Nombre_Usuario'] = 'Ingresa un usuario valido con al menos 2 letras y maximo 50.';
    if (!validate(body['Correo_Electronico'], 2, 50, false))
        result['Correo_Electronico'] = 'Ingresa un email valido con al menos 2 letras y maximo 50.';
    if (!validate(body['Contrasena'], 4, 50, false))
        result['Contrasena'] = 'Ingresa una contrasena valido con al menos 4 letras y maximo 50.';
    if (!validate(+body['Edad'], 1, 120, true))
        result['Edad'] = 'Ingresa una edad valida mayor a 1 y menor a 120.';
    if (!validate(+body['Estatura'], 0.5, 3, true))
        result['Estatura'] = 'Ingresa una estatura valida mayor a 0.5 y menor a 3.';
    if (!validate(+body['Peso'], 10, 500, true))
        result['Peso'] = 'Ingresa un peso valida mayor a 10 y menor a 500.';
    if (!validate(+body['GEB'], 1, 10000, true))
        result['GEB'] = 'Ingresa un GEB valido mayor a 1 y menor a 10000.';
    // si el diccionario no tiene ningun elemento es que no se encontraron errores.
    if (Object.keys(result).length === 0) {
        return {success: true};
    } else {
        return {success: false, errors: result};
    }
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
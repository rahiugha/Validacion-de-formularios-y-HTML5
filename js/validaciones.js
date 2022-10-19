export function valida(input){
    const tipoDeInput = input.dataset.tipo
    if(validadore[tipoDeInput]){
        validadore[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo de nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo de correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo de contraseña no puede estar vacio",
        patternMismatch: "Debe tener un minimo de 6 caracteres y un maximo de 12, debe contener una letra minuscula, una letra mayuscula, un número y no debe tener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Formato incorrecto. Ej: 09XXXXXXX"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Requiere un minimo de 10 caracteres y un maximo de 40"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Requiere un minimo de 4 caracteres y un maximo de 30"
    },
    departamento: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Requiere un minimo de 4 caracteres y un maximo de 30"
    },
}

const validadore = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
           mensaje = mensajesDeError[tipoDeInput][error]; 
        }
    })
    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    mayorDeEdad(fechaCliente);
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}
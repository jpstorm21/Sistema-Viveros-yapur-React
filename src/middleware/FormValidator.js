import empty from 'is-empty';
import { isEmail, isInt } from 'validator';
import Rut from 'rutjs';
const validationFunctions = {};

export const validateUserForm = validationFunctions.userForm = (payload, method) => {
  let errors = {};
  let isValid = true;
  let message = '';

  if (payload) {
    if (method == 'POST') {
      let rut = new Rut(payload.rut);
      if (empty(payload.rut) || !rut.isValid) {
        isValid = false;
        errors.rut = 'Debe ingresar un rut válido';
      }
  
      if (empty(payload.password)) {
        isValid = false;
        errors.password = 'Debe ingresar una contraseña';
      }

      if (empty(payload.confirmPassword)) {
        isValid = false;
        errors.confirmPassword = 'Debe ingresar la confirmación de la contraseña';
      } else if (!empty(payload.password) && payload.password != payload.confirmPassword) {
        isValid = false;
        errors.password = 'Contraseñas no coinciden';
        errors.confirmPassword = 'Contraseñas no coinciden';
      }
    }

    if (empty(payload.name)) {
      isValid = false;
      errors.name = 'Debe ingresar un nombre de usuario';
    }

    if (empty(payload.email) || !isEmail(payload.email)) {
      isValid = false;
      errors.email = 'Debe ingresar un email válido';
    }

    if (empty(payload.phone) || !isInt(payload.phone)) {
      isValid = false;
      errors.phone = 'Debe ingresar un telefono válido';
    }

    if (empty(payload.userType)) {
      isValid=false;
      errors.userType = 'Debe seleccionar un tipo de usuario';
    }

    if (!isValid)
      message = 'Verifique los errores del formulario.';
  } else {
    isValid = false;
    message = 'Error al recibir los datos del formulario.';
  }

  return { isValid, message, errors };
};

export const validateCheckForm = validationFunctions.checkForm = (payload, method) => {
  let errors = {};
  let isValid = true;
  let message = '';
  console.log(payload)
  if (payload) {

    if (empty(payload.amount) || !isInt((payload.amount).toString())) {
      isValid = false;
      errors.amount = 'Debe ingresar un monto';
    }

    if (empty(payload.number) || !isInt((payload.number).toString())) {
      isValid = false;
      errors.number = 'Debe ingresar un numero';
    }

    if (empty(payload.names)) {
      isValid = false;
      errors.names = 'Debe ingresar nombres';
    }

    if (empty(payload.bank)) {
      isValid = false;
      errors.bank = 'Debe ingresar un banco';
    }

    if (empty(payload.lastName)) {
      isValid = false;
      errors.lastName = 'Debe ingresar apellidos validos';
    }

    if (empty(payload.numberAccount) || !isInt((payload.numberAccount).toString())) {
      isValid = false;
      errors.numberAccount = 'Debe ingresar un numero de cuenta válido';
    }

    if (empty(payload.beginDate)) {
      isValid=false;
      errors.beginDate = 'Debe seleccionar una fecha de emision';
    }

    if (empty(payload.endDate)) {
      isValid=false;
      errors.endDate = 'Debe seleccionar una fecha de vencimiento';
    }

    if (empty(payload.description)) {
      isValid=false;
      errors.description = 'Debe ingresar una descripcion';
    }

    if(payload.beginDate > payload.endDate){
      isValid = false;
      errors.beginDate = 'La fecha de emision debe ser menor a la de vencimiento';
      errors.endDate = 'La fecha de emision debe ser menor a la de vencimiento';
    }

    if (!isValid)
      message = 'Verifique los errores del formulario.';
  } else {
    isValid = false;
    message = 'Error al recibir los datos del formulario.';
  }

  return { isValid, message, errors };
};

export const validateProviderForm = validationFunctions.providerForm = (payload, method) => {
  let errors = {};
  let isValid = true;
  let message = '';

  if (payload) {

    if (empty(payload.contact) || !isInt((payload.contact).toString())) {
      isValid = false;
      errors.contact = 'Debe ingresar un contacto';
    }

    if (empty(payload.names)) {
      isValid = false;
      errors.names = 'Debe ingresar nombres';
    }

    if (empty(payload.lastnames)) {
      isValid = false;
      errors.lastnames = 'Debe ingresar sus apellidos';
    }

    if (empty(payload.email)) {
      isValid = false;
      errors.email = 'Debe ingresar un email';
    }

    if (empty(payload.description)) {
      isValid=false;
      errors.description = 'Debe ingresar una descripcion';
    }
    
    if (!isValid)
      message = 'Verifique los errores del formulario.';
  } else {
    isValid = false;
    message = 'Error al recibir los datos del formulario.';
  }

  return { isValid, message, errors };
};

export default validationFunctions;